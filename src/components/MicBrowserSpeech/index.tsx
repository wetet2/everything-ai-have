import { use, useEffect, useRef, useState } from "react";

import * as S from "./styled";

const MicBrowserSpeech = ({
  onInputEnd,
}: {
  onInputEnd: (text: string) => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<string>("");
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // 1. 브라우저 지원 여부 확인 (Chrome 등 webkit 기반 지원)
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!window.SpeechRecognition) {
      alert(
        "이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.",
      );
    } else {
      // 2. 음성 인식 객체 생성 및 설정
      const recognition = new window.SpeechRecognition();
      recognition.interimResults = true; // 말하는 동안 실시간으로 결과를 보여줄지 여부
      recognition.lang = "ko-KR"; // 한국어 설정 (영어는 'en-US')
      recognition.continuous = false; // 말이 끝나면 자동으로 종료할지 여부

      // 3. 버튼 클릭 시 인식 시작
      buttonRef.current?.addEventListener("click", () => {
        recognition.start();
        if (buttonRef.current) {
          buttonRef.current.textContent = "준비하는 중...";
        }
      });

      // 1. STT 서비스가 시작되었을 때 (서버 연결 등)
      recognition.onstart = () => {
        console.log("서비스 시작됨");
      };

      // 2. 실제로 마이크에서 오디오 캡처를 시작했을 때 (가장 중요)
      recognition.onaudiostart = () => {
        console.log("마이크 활성화 완료");
        if (buttonRef.current)
          buttonRef.current.textContent = "지금 말씀하세요! 🔴"; // 이때 말하라고 안내해야 짤리지 않음
      };

      // 3. 실제 사람의 목소리(Speech)가 감지되었을 때
      recognition.onspeechstart = () => {
        console.log("목소리 감지됨");
      };

      // 4. 음성 인식 결과 처리
      recognition.onresult = (event: any) => {
        let text = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setInputText(text);
        textRef.current = text;
      };

      // 5. 음성 인식이 끝났을 때 처리
      recognition.onspeechend = () => {
        recognition.stop();
        console.log("음성 인식 종료");
        onInputEnd(textRef.current);
        if (buttonRef.current)
          buttonRef.current.textContent = "🎙️ 음성 인식 시작";
      };

      // 6. 에러 처리
      recognition.onerror = (event: any) => {
        console.error("음성 인식 에러 발생:", event.error);
        if (buttonRef.current)
          buttonRef.current.textContent = "🎙️ 음성 인식 시작";
      };
    }
  }, []);

  return (
    <S.MicTestContainer>
      <h2>MicTest</h2>
      <button ref={buttonRef}>🎙️ 음성 인식 시작</button>
      {/* <div id="result" style={{ marginTop: 24, fontSize: 18 }}>
        {inputText}
      </div> */}
    </S.MicTestContainer>
  );
};

export default MicBrowserSpeech;
