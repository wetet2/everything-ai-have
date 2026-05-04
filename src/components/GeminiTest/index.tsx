import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import Select from "react-select";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import CopyablePre from "./CopyablePre";

import * as S from "./styled";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

type StreamStatus = "idle" | "requesting" | "thinking" | "streaming" | "error";

type ChatSession = {
  id: string;
  startedAt: string;
  messages: ChatMessage[];
};

type ChatStorage = {
  sessions: ChatSession[];
};

type SessionOption = {
  value: string;
  label: string;
};

type AiProvider = "gemini" | "claude";

const CHAT_STORAGE_KEY = "wetet-chat-messages";
const ACTIVE_SESSION_KEY = "wetet-chat-active-session-id";
const CREATE_SESSION_OPTION_VALUE = "__create_session__";

const GEMINI_MODEL_OPTIONS = [
  { value: "gemini-3.1-flash-lite-preview", label: "Gemini 3.1 Flash Lite" },
  { value: "gemini-3.1-pro-preview", label: "Gemini 3.1 Pro" },
];

const CLAUDE_MODEL_OPTIONS = [
  { value: "claude-sonnet-4-5", label: "Sonnet 4.5" },
  { value: "claude-opus-4-5", label: "Opus 4.5" },
];

const GeminiTestComponent = () => {
  const router = useRouter();
  const gkey = router.query.gkey as string | undefined;
  const ckey = router.query.ckey as string | undefined;

  const [provider, setProvider] = useState<AiProvider>("gemini");

  const ai = useMemo(() => new GoogleGenAI({ apiKey: gkey ?? "" }), [gkey]);

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isMessagesHydrated, setIsMessagesHydrated] = useState(false);
  const [streamStatus, setStreamStatus] = useState<StreamStatus>("idle");
  const [activeAssistantId, setActiveAssistantId] = useState<number | null>(
    null,
  );
  const [selectedModel, setSelectedModel] = useState(
    GEMINI_MODEL_OPTIONS[0].value,
  );
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionOptions, setSessionOptions] = useState<any>(null);
  const [selectedSessionOption, setSelectedSessionOption] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesAreaRef = useRef<HTMLDivElement | null>(null);
  const isUserScrolledUpRef = useRef(false);
  const textAreaRef = useRef<any>(null);

  const modelOptions =
    provider === "gemini" ? GEMINI_MODEL_OPTIONS : CLAUDE_MODEL_OPTIONS;

  const handleProviderChange = (next: AiProvider) => {
    if (isLoading) return;
    setProvider(next);
    setSelectedModel(
      next === "gemini"
        ? GEMINI_MODEL_OPTIONS[0].value
        : CLAUDE_MODEL_OPTIONS[0].value,
    );
  };

  const handleMessagesAreaScroll = () => {
    const el = messagesAreaRef.current;
    if (!el) return;
    const threshold = 50;
    const isAtBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    isUserScrolledUpRef.current = !isAtBottom;
  };

  const handleAutoResizeTextarea = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const getSessionOptionLabel = (session: ChatSession) => {
    const firstQuestion = session.messages.find(
      (message) => message.role === "user" && message.text.trim().length > 0,
    );
    if (firstQuestion) return firstQuestion.text.trim().slice(0, 60);
    return `새 세션 (${new Date(session.startedAt).toLocaleString()})`;
  };

  const handleSelectSession = (nextSessionId: string) => {
    if (isLoading) return;
    if (nextSessionId === CREATE_SESSION_OPTION_VALUE) {
      const newSessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const newSession: ChatSession = {
        id: newSessionId,
        startedAt: new Date().toISOString(),
        messages: [],
      };
      const nextSessions = [...sessions, newSession];

      setSessions(nextSessions);
      setSessionId(newSessionId);
      setMessages([]);

      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(ACTIVE_SESSION_KEY, newSessionId);
        window.localStorage.setItem(
          CHAT_STORAGE_KEY,
          JSON.stringify({ sessions: nextSessions }),
        );
      }
      return;
    }

    const targetSession = sessions.find(
      (session) => session.id === nextSessionId,
    );
    if (!targetSession) return;

    setSessionId(targetSession.id);
    setMessages(
      Array.isArray(targetSession.messages) ? targetSession.messages : [],
    );
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(ACTIVE_SESSION_KEY, targetSession.id);
    }
  };

  const handleDeleteSession = () => {
    if (!sessionId || isLoading) return;

    const ok = window.confirm(
      "이 대화 세션을 삭제하시겠습니까? 삭제된 대화는 복구할 수 없습니다.",
    );
    if (!ok) return;

    try {
      const nextSessions = sessions.filter((s) => s.id !== sessionId);

      window.localStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify({ sessions: nextSessions }),
      );

      setSessions(nextSessions);

      if (nextSessions.length > 0) {
        const mostRecent = [...nextSessions].sort(
          (a, b) =>
            new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
        )[0];
        handleSelectSession(mostRecent.id);
      } else {
        handleSelectSession(CREATE_SESSION_OPTION_VALUE);
      }
    } catch (error) {
      console.error("failed to delete session", error);
      alert("세션 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteAllSessions = () => {
    if (isLoading) return;

    const ok = window.confirm(
      "모든 대화 세션을 삭제하시겠습니까? 삭제된 대화는 복구할 수 없습니다.",
    );
    if (!ok) return;

    try {
      window.localStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify({ sessions: [] }),
      );
      window.sessionStorage.removeItem(ACTIVE_SESSION_KEY);

      setSessions([]);
      handleSelectSession(CREATE_SESSION_OPTION_VALUE);
    } catch (error) {
      console.error("failed to delete all sessions", error);
      alert("전체 세션 삭제 중 오류가 발생했습니다.");
    }
  };

  const getStatusLabel = () => {
    if (streamStatus === "requesting") return "요청 전송 중...";
    if (streamStatus === "thinking") return "생각하는 중...";
    if (streamStatus === "streaming") return "답변 생성 중...";
    if (streamStatus === "error") return "오류 발생";
    return "";
  };

  const handleRequestGemini = async (
    input: string,
    assistantMessageId: number,
  ) => {
    const history = messages.slice(-10).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const responseStream = await ai.models.generateContentStream({
      model: selectedModel,
      contents: [...history, { role: "user", parts: [{ text: input }] }],
      config: {},
    });
    setStreamStatus("thinking");
    let hasReceivedTextChunk = false;

    for await (const chunk of responseStream) {
      if (!hasReceivedTextChunk) {
        hasReceivedTextChunk = true;
        setStreamStatus("streaming");
      }

      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                text: message.text + (chunk.text?.replace(/~/g, "\\~") ?? ""),
              }
            : message,
        ),
      );
    }
  };

  const handleRequestClaude = async (
    input: string,
    assistantMessageId: number,
  ) => {
    const claudeClient = new Anthropic({
      apiKey: ckey ?? "",
      dangerouslyAllowBrowser: true,
    });

    const history = messages.slice(-10).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.text,
    }));

    const claudeMessages = [
      ...history,
      { role: "user" as const, content: input },
    ];

    const stream = claudeClient.messages.stream({
      model: selectedModel,
      max_tokens: 8096,
      messages: claudeMessages,
    });

    setStreamStatus("thinking");
    let hasReceivedTextChunk = false;

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        const textDelta = chunk.delta as { type: "text_delta"; text: string };
        if (!hasReceivedTextChunk) {
          hasReceivedTextChunk = true;
          setStreamStatus("streaming");
        }
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  text:
                    message.text + (textDelta.text?.replace(/~/g, "\\~") ?? ""),
                }
              : message,
          ),
        );
      }
    }
  };

  const handleRequestAi = async (rawInput: string) => {
    const input = rawInput.trim();
    if (!input || isLoading) return;
    let hasError = false;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: input,
    };
    const assistantMessageId = Date.now() + 1;

    isUserScrolledUpRef.current = false;
    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantMessageId, role: "assistant", text: "" },
    ]);
    setInputValue("");
    setTimeout(() => {
      handleAutoResizeTextarea();
    }, 0);
    setIsLoading(true);
    setStreamStatus("requesting");
    setActiveAssistantId(assistantMessageId);

    try {
      if (provider === "gemini") {
        await handleRequestGemini(input, assistantMessageId);
      } else {
        await handleRequestClaude(input, assistantMessageId);
      }
    } catch (error) {
      hasError = true;
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                text: "응답을 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
              }
            : message,
        ),
      );
      setStreamStatus("error");
      console.error(error);
    } finally {
      setIsLoading(false);
      setActiveAssistantId(null);
      if (!hasError) {
        setStreamStatus("idle");
      }
    }
  };

  useEffect(() => {
    setSessionOptions([
      { value: CREATE_SESSION_OPTION_VALUE, label: "+ 새로운 대화 생성" },
      ...[...sessions]
        .sort(
          (a, b) =>
            new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
        )
        .map((session) => ({
          value: session.id,
          label: getSessionOptionLabel(session),
        })),
    ]);
  }, [sessions]);

  useEffect(() => {
    if (sessionOptions) {
      setSelectedSessionOption(
        sessionOptions.find((option: any) => option.value === sessionId) ??
          null,
      );
    }
  }, [sessionOptions, sessionId]);

  useEffect(() => {
    if (!isUserScrolledUpRef.current) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    try {
      const rawStorage = window.localStorage.getItem(CHAT_STORAGE_KEY);
      const parsedStorage: ChatStorage = rawStorage
        ? JSON.parse(rawStorage)
        : { sessions: [] };
      const sessions = Array.isArray(parsedStorage?.sessions)
        ? parsedStorage.sessions
        : [];

      let currentSessionId = window.sessionStorage.getItem(ACTIVE_SESSION_KEY);
      let currentSession = currentSessionId
        ? sessions.find((session) => session.id === currentSessionId)
        : undefined;

      if (!currentSession) {
        currentSessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        currentSession = {
          id: currentSessionId,
          startedAt: new Date().toISOString(),
          messages: [],
        };
        sessions.push(currentSession);

        const nextStorage: ChatStorage = { sessions };
        window.localStorage.setItem(
          CHAT_STORAGE_KEY,
          JSON.stringify(nextStorage),
        );
      }

      if (!currentSessionId || !currentSession) return;

      window.sessionStorage.setItem(ACTIVE_SESSION_KEY, currentSessionId);

      setSessionId(currentSessionId);
      setSessions(sessions);
      setMessages(
        Array.isArray(currentSession.messages)
          ? currentSession.messages.map((e) => {
              if (e.role === "assistant") {
                return { ...e, text: e.text.replace(/~/g, "\\~") };
              } else {
                return e;
              }
            })
          : [],
      );
    } catch (error) {
      console.error("failed to read chat history", error);
    } finally {
      setIsMessagesHydrated(true);
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isMessagesHydrated || !sessionId)
      return;

    try {
      const rawStorage = window.localStorage.getItem(CHAT_STORAGE_KEY);
      const parsedStorage: ChatStorage = rawStorage
        ? JSON.parse(rawStorage)
        : { sessions: [] };
      let sessions = Array.isArray(parsedStorage?.sessions)
        ? parsedStorage.sessions
        : [];
      const targetIndex = sessions.findIndex(
        (session) => session.id === sessionId,
      );

      if (messages.length === 0) {
        if (targetIndex >= 0) {
          sessions = sessions.filter((session) => session.id !== sessionId);
          const nextStorage: ChatStorage = { sessions };
          window.localStorage.setItem(
            CHAT_STORAGE_KEY,
            JSON.stringify(nextStorage),
          );
          setSessions(sessions);
        }
        return;
      }

      if (targetIndex >= 0) {
        sessions[targetIndex] = {
          ...sessions[targetIndex],
          messages,
        };
      } else {
        sessions.push({
          id: sessionId,
          startedAt: new Date().toISOString(),
          messages,
        });
      }

      const nextStorage: ChatStorage = { sessions };
      window.localStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify(nextStorage),
      );
      setSessions(sessions);
    } catch (error) {
      console.error("failed to save chat history", error);
    }
  }, [messages, isMessagesHydrated, sessionId]);

  if (!isMounted) return null;

  return (
    <S.Page>
      <S.SessionSelectWrap>
        <div style={{ flex: 1 }}>
          <Select<SessionOption, false>
            options={sessionOptions}
            value={selectedSessionOption}
            onChange={(option) => {
              if (!option) return;
              handleSelectSession(option.value);
            }}
            isSearchable={false}
            placeholder="세션 선택"
            isDisabled={isLoading}
            styles={{
              control: (base, state) => ({
                ...base,
                minHeight: 36,
                borderRadius: 8,
                fontSize: 14,
                borderColor: state.isFocused ? "#94a3b8" : "#d1d5db",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#94a3b8",
                },
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 10px",
              }),
              indicatorsContainer: (base) => ({
                ...base,
                paddingRight: 6,
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 10,
              }),
              option: (base, state) => {
                const isCreateOption =
                  state.data.value === CREATE_SESSION_OPTION_VALUE;
                return {
                  ...base,
                  fontSize: 13,
                  backgroundColor: state.isFocused
                    ? isCreateOption
                      ? "#ecfeff"
                      : "#f3f4f6"
                    : "#fff",
                  color: isCreateOption ? "#0f766e" : "#111827",
                  fontWeight: isCreateOption ? 700 : 500,
                  cursor: "pointer",
                  borderBottom: isCreateOption ? "1px solid #cffafe" : "none",
                };
              },
              singleValue: (base, state) => ({
                ...base,
                color:
                  state.data.value === CREATE_SESSION_OPTION_VALUE
                    ? "#0f766e"
                    : "#111827",
                fontWeight:
                  state.data.value === CREATE_SESSION_OPTION_VALUE ? 700 : 400,
              }),
            }}
          />
        </div>
        <S.DeleteSessionButton
          title="현재 대화 삭제"
          onClick={handleDeleteSession}
          disabled={isLoading}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 3 21 3 19 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </S.DeleteSessionButton>
        <S.DeleteAllSessionsButton
          title="전체 대화 삭제"
          onClick={handleDeleteAllSessions}
          disabled={isLoading}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 3 21 3 19 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
            <line x1="4" y1="4" x2="20" y2="20"></line>
          </svg>
        </S.DeleteAllSessionsButton>
      </S.SessionSelectWrap>

      <S.ChatContainer>
        <S.MessagesArea
          ref={messagesAreaRef}
          onScroll={handleMessagesAreaScroll}
        >
          {messages.length === 0 ? (
            <S.EmptyMessage>
              질문을 입력하면 AI와 대화를 시작할 수 있습니다.
            </S.EmptyMessage>
          ) : (
            <S.MessageList>
              {messages.map((message) => (
                <S.MessageItem
                  key={message.id}
                  $isUser={message.role === "user"}
                >
                  <S.ChatBody>
                    {isLoading &&
                      message.role === "assistant" &&
                      message.id === activeAssistantId && (
                        <S.StatusText>{getStatusLabel()}</S.StatusText>
                      )}
                    <S.ChatBubble $isUser={message.role === "user"}>
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          pre: ({ children }) => (
                            <CopyablePre>{children}</CopyablePre>
                          ),
                        }}
                      >
                        {message.text}
                      </Markdown>
                    </S.ChatBubble>
                  </S.ChatBody>
                </S.MessageItem>
              ))}
            </S.MessageList>
          )}
          <div ref={messagesEndRef} />
        </S.MessagesArea>

        <S.InputArea>
          <S.ModelSelectWrap>
            {modelOptions.map((opt) => (
              <S.ModelChip
                key={opt.value}
                $active={selectedModel === opt.value}
                onClick={() => !isLoading && setSelectedModel(opt.value)}
                disabled={isLoading}
              >
                {opt.label}
              </S.ModelChip>
            ))}
          </S.ModelSelectWrap>
          <S.InputRow>
            <S.TextInput
              ref={textAreaRef}
              value={inputValue}
              onInput={handleAutoResizeTextarea}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleRequestAi(inputValue);
                }
              }}
              disabled={isLoading}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="AI에게 물어보세요"
              rows={1}
            />
            <S.InputSpacer />
            <S.SendButton
              disabled={isLoading || !inputValue.trim()}
              onClick={() => handleRequestAi(inputValue)}
            >
              {isLoading ? (
                <S.SpinnerIcon
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
                  <path d="M12 3a9 9 0 0 1 9 9" />
                </S.SpinnerIcon>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              )}
            </S.SendButton>
          </S.InputRow>
        </S.InputArea>
      </S.ChatContainer>

      <S.ProviderToggleWrap>
        <S.ProviderToggleButton
          $active={provider === "gemini"}
          onClick={() => handleProviderChange("gemini")}
          disabled={isLoading}
        >
          Gemini
        </S.ProviderToggleButton>
        <S.ProviderToggleButton
          $active={provider === "claude"}
          onClick={() => handleProviderChange("claude")}
          disabled={isLoading}
        >
          Claude
        </S.ProviderToggleButton>
      </S.ProviderToggleWrap>
    </S.Page>
  );
};

export default GeminiTestComponent;
