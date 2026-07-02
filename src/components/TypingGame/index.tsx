import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ENGLISH, KOREAN } from "./sentences";
import * as S from "./styled";

type Language = "en" | "ko";

const SENTENCE_MAP: Record<Language, string[]> = {
  en: ENGLISH,
  ko: KOREAN,
};

function pickSentence(lang: Language, used: Set<string>): string {
  const pool = SENTENCE_MAP[lang].filter((s) => !used.has(s));
  if (pool.length === 0) used.clear();
  const available = pool.length > 0 ? pool : SENTENCE_MAP[lang];
  return available[Math.floor(Math.random() * available.length)];
}

type CharState = "pending" | "correct" | "incorrect" | "current";

export default function TypingGame() {
  const [language, setLanguage] = useState<Language>("ko");
  const [sentence, setSentence] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const usedRef = useRef(new Set<string>());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const [startedAt, setStartedAt] = useState<number | null>(null);
  const localKeystrokesRef = useRef(0);
  const [localKeystrokes, setLocalKeystrokes] = useState(0);

  const sessionCorrectRef = useRef(0);
  const sessionKeystrokesRef = useRef(0);
  const sessionElapsedRef = useRef(0);
  const sessionCharsRef = useRef(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [lastCpm, setLastCpm] = useState(0);

  const finishSentence = useCallback(
    (correctCount: number) => {
      const now = Date.now();
      const sElapsed = startedAt ? (now - startedAt) / 1000 : 0;
      setElapsed(sElapsed);
      setLastCpm(sElapsed < 1 ? 0 : Math.round(correctCount / (sElapsed / 60)));
      sessionCorrectRef.current += correctCount;
      sessionKeystrokesRef.current += localKeystrokesRef.current;
      sessionElapsedRef.current += sElapsed;
      sessionCharsRef.current += sentence.length;
      setTotalCorrect(sessionCorrectRef.current);
      setTotalKeystrokes(sessionKeystrokesRef.current);
      setTotalElapsed(sessionElapsedRef.current);
      setTotalChars(sessionCharsRef.current);
    },
    [sentence, startedAt],
  );

  const initSentence = useCallback(() => {
    const s = pickSentence(language, usedRef.current);
    usedRef.current.add(s);
    setSentence(s);
    setUserInput("");
    setIsComplete(false);
    setLocalKeystrokes(0);
    setStartedAt(null);
    localKeystrokesRef.current = 0;
  }, [language]);

  useEffect(() => {
    initSentence();
  }, [initSentence]);

  useEffect(() => {
    if (isComplete || !startedAt) return;
    const timer = setInterval(() => {
      setElapsed((Date.now() - startedAt) / 1000);
    }, 200);
    return () => clearInterval(timer);
  }, [isComplete, startedAt]);

  const charStates = useMemo<CharState[]>(() => {
    if (!sentence) return [];
    return sentence.split("").map((char, i) => {
      if (i >= userInput.length) {
        return i === userInput.length ? "current" : "pending";
      }
      return userInput[i] === char ? "correct" : "incorrect";
    });
  }, [sentence, userInput]);

  const correctCount = useMemo(
    () => charStates.filter((s) => s === "correct").length,
    [charStates],
  );

  const progress = useMemo(() => {
    if (!sentence) return 0;
    return Math.round((correctCount / sentence.length) * 100);
  }, [correctCount, sentence]);

  const displayCorrect = totalCorrect + (isComplete ? 0 : correctCount);
  const displayKeystrokes =
    totalKeystrokes + (isComplete ? 0 : localKeystrokes);
  const displayElapsed = totalElapsed + (isComplete ? 0 : elapsed);

  const cumulativeCpm = useMemo(() => {
    if (displayElapsed < 1) return 0;
    return Math.round(displayCorrect / (displayElapsed / 60));
  }, [displayCorrect, displayElapsed]);

  const currentCpm = useMemo(() => {
    if (isComplete) return lastCpm;
    if (!startedAt) return lastCpm;
    return Math.round(correctCount / (elapsed / 60)) || 0;
  }, [correctCount, elapsed, isComplete, lastCpm, startedAt]);

  const accuracy = useMemo(() => {
    const denominator = totalChars + (isComplete ? 0 : sentence.length);
    if (denominator === 0) return 100;
    return Math.round((displayCorrect / denominator) * 100);
  }, [displayCorrect, totalChars, isComplete, sentence]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (isComplete) return;
      const value = e.target.value;
      if (!startedAt && value.length > 0) {
        setStartedAt(Date.now());
        setLastCpm(0);
      }
      setUserInput(value);
    },
    [isComplete, startedAt],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (isComplete) {
        if (e.key === "Enter") {
          e.preventDefault();
          initSentence();
        }
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const correct = sentence
          .split("")
          .filter((ch, i) => userInput[i] === ch).length;
        finishSentence(correct);
        setIsComplete(true);
        return;
      }
      if (e.key.length !== 1) return;
      localKeystrokesRef.current += 1;
      setLocalKeystrokes(localKeystrokesRef.current);
    },
    [isComplete, initSentence, finishSentence, sentence, userInput],
  );

  const handleNext = useCallback(() => {
    if (!isComplete) return;
    initSentence();
  }, [isComplete, initSentence]);

  const switchLanguage = useCallback((lang: Language) => {
    usedRef.current.clear();
    sessionCorrectRef.current = 0;
    sessionKeystrokesRef.current = 0;
    sessionElapsedRef.current = 0;
    sessionCharsRef.current = 0;
    setTotalCorrect(0);
    setTotalKeystrokes(0);
    setTotalElapsed(0);
    setTotalChars(0);
    setLanguage(lang);
  }, []);

  useEffect(() => {
    if (isComplete) {
      nextBtnRef.current?.focus();
    } else {
      textareaRef.current?.focus();
    }
  }, [sentence, isComplete]);

  return (
    <S.TypingPage>
      <Head>
        <title>손은 눈보다 빠르다 - Everything AI Have</title>
      </Head>
      <S.Header>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <S.HeaderAccent>손</S.HeaderAccent>은{" "}
          <S.HeaderAccent>눈</S.HeaderAccent>보다 빠르다
        </Link>
      </S.Header>
      <S.StatsBar>
        <S.StatItem>
          <S.StatValue>{currentCpm}</S.StatValue>
          <S.StatLabel>문장 CPM</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{cumulativeCpm}</S.StatValue>
          <S.StatLabel>누적 CPM</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{accuracy}%</S.StatValue>
          <S.StatLabel>정확도</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{displayElapsed.toFixed(1)}s</S.StatValue>
          <S.StatLabel>경과 시간</S.StatLabel>
        </S.StatItem>
      </S.StatsBar>

      <S.LangToggle>
        <S.LangBtn
          $active={language === "ko"}
          onClick={() => switchLanguage("ko")}
        >
          한글
        </S.LangBtn>
        <S.LangBtn
          $active={language === "en"}
          onClick={() => switchLanguage("en")}
        >
          English
        </S.LangBtn>
      </S.LangToggle>

      <S.ProgressBar $progress={progress} />
      <div>
        <S.SentenceDisplay>
          {sentence.split("").map((char, i) => (
            <S.Char key={i} $state={charStates[i] || "pending"}>
              {char === " " ? "\u00A0" : char}
            </S.Char>
          ))}
        </S.SentenceDisplay>
        <S.TextInput
          ref={textareaRef}
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="여기에 문장을 입력하세요..."
          autoFocus
          spellCheck={false}
        />
        {isComplete && (
          <S.ResultOverlay>
            <S.NextButton ref={nextBtnRef} onClick={handleNext}>
              다음 문장
            </S.NextButton>
          </S.ResultOverlay>
        )}
      </div>

      <S.HelpText>{isComplete ? "" : "위 문장을 그대로 입력하세요"}</S.HelpText>
    </S.TypingPage>
  );
}
