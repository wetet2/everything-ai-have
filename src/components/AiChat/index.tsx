import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI, Modality } from "@google/genai";
import OpenAI from "openai";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import Select from "react-select";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import ImageIcon from "../../../resources/icons/ImageIcon";
import SendIcon from "../../../resources/icons/SendIcon";
import TrashIcon from "../../../resources/icons/TrashIcon";
import TrashXIcon from "../../../resources/icons/TrashXIcon";
import CopyablePre from "./CopyablePre";

import * as S from "./styled";
import { isEmpty } from "lodash-es";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
  images?: string[]; // base64 또는 URL
};

type AttachedImage = {
  dataUrl: string; // 미리보기/메시지 표시용 (data:image/png;base64,...)
  base64: string; // API 호출용 (접두사 제거된 순수 base64)
  mimeType: string;
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

type AiProvider = "gemini" | "claude" | "chatgpt";

const AI_MAX_CONTEXT = 5;
const CHAT_STORAGE_KEY = "wetet-chat-messages";
const ACTIVE_SESSION_KEY = "wetet-chat-active-session-id";
const SETTINGS_STORAGE_KEY = "wetet-settings";
const CREATE_SESSION_OPTION_VALUE = "__create_session__";

const FAVORITE_MODELS_GEMINI = [
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite-preview",
  "gemini-3.1-pro-preview",
  "imagen-4.0-ultra-generate-001",
  "imagen-4.0-generate-001",
  "imagen-4.0-fast-generate-001",
  "gemini-2.5-flash-image",
  "gemini-3-pro-image-preview",
  "gemini-3.1-flash-image-preview",
];

const FAVORITE_MODELS_CLAUDE = [
  "claude-haiku-4-5-20251001",
  "claude-sonnet-4-5-20250929",
  "claude-sonnet-4-6",
  "claude-opus-4-6",
  "claude-opus-4-7",
  "claude-opus-4-8",
];

const FAVORITE_MODELS_CHATGPT = [
  "gpt-5.5",
  "gpt-5.3-codex",
  "gpt-5",
  "gpt-5-mini",
  "gpt-5-nano",
  "gpt-image-2-2026-04-21",
  "gpt-image-1.5",
];

const AiChatComponent = () => {
  const router = useRouter();
  const gkey = router.query.gkey as string | undefined;
  const ckey = router.query.ckey as string | undefined;
  const tkey = router.query.tkey as string | undefined;

  const hasGemini = router.isReady && !!gkey;
  const hasClaude = router.isReady && !!ckey;
  const hasChatGPT = router.isReady && !!tkey;
  const needsSetup = router.isReady && !gkey && !ckey && !tkey;

  const [setupGKey, setSetupGKey] = useState("");
  const [setupCKey, setSetupCKey] = useState("");
  const [setupTKey, setSetupTKey] = useState("");

  const [provider, setProvider] = useState<AiProvider>("gemini");

  const geminiAi = useMemo(
    () => new GoogleGenAI({ apiKey: gkey ?? "" }),
    [gkey],
  );
  const claudeAi = useMemo(
    () =>
      new Anthropic({
        apiKey: ckey ?? "",
        dangerouslyAllowBrowser: true,
      }),
    [ckey],
  );
  const openaiAi = useMemo(
    () =>
      tkey
        ? new OpenAI({
            apiKey: tkey ?? "",
            dangerouslyAllowBrowser: true,
          })
        : (null as any),
    [tkey],
  );

  // 모델 리스트 출력
  // if (ai) ai.models.list().then((e) => console.log(e));

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isMessagesHydrated, setIsMessagesHydrated] = useState(false);
  const [streamStatus, setStreamStatus] = useState<StreamStatus>("idle");
  const [activeAssistantId, setActiveAssistantId] = useState<number | null>(
    null,
  );
  const [selectedModel, setSelectedModel] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionOptions, setSessionOptions] = useState<any>(null);
  const [selectedSessionOption, setSelectedSessionOption] = useState<any>(null);
  //
  const [modelsOfGemini, setModelsOfGemini] = useState<any[]>([]);
  const [modelsOfAnthropic, setModelsOfAnthropic] = useState<any[]>([]);
  const [modelsOfOpenAI, setModelsOfOpenAI] = useState<any[]>([]);
  //
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesAreaRef = useRef<HTMLDivElement | null>(null);
  const isUserScrolledUpRef = useRef(false);
  const textAreaRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const settingsLoadedRef = useRef(false);

  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // 입력 history (직전 전송 순, 최신이 index 0)
  const inputHistory = useMemo(
    () =>
      messages
        .filter((m) => m.role === "user" && m.text.trim().length > 0)
        .map((m) => m.text)
        .reverse(),
    [messages],
  );
  const historyIndexRef = useRef<number | null>(null);

  const modelOptions = useMemo(() => {
    const _gemini1 = modelsOfGemini
      ?.filter((e) => FAVORITE_MODELS_GEMINI.includes(e.value))
      .map((e) => ({ ...e, isFavorite: true }));
    const _gemini2 = modelsOfGemini?.filter(
      (e) => !FAVORITE_MODELS_GEMINI.includes(e.value),
    );
    const _claude1 = modelsOfAnthropic
      ?.filter((e) => FAVORITE_MODELS_CLAUDE.includes(e.value))
      .map((e) => ({ ...e, isFavorite: true }));
    const _claude2 = modelsOfAnthropic?.filter(
      (e) => !FAVORITE_MODELS_CLAUDE.includes(e.value),
    );
    const _chatgpt1 = modelsOfOpenAI
      ?.filter((e) => FAVORITE_MODELS_CHATGPT.includes(e.value))
      .map((e) => ({ ...e, isFavorite: true }));
    const _chatgpt2 = modelsOfOpenAI?.filter(
      (e) => !FAVORITE_MODELS_CHATGPT.includes(e.value),
    );
    const _models =
      provider === "gemini"
        ? [..._gemini1, ..._gemini2]
        : provider === "claude"
          ? [..._claude1, ..._claude2]
          : [..._chatgpt1, ..._chatgpt2];

    return _models;
  }, [provider, modelsOfGemini, modelsOfAnthropic, modelsOfOpenAI]);

  useEffect(() => {
    if (modelOptions?.length > 0) {
      setSelectedModel(modelOptions[0].value);
    }
  }, [modelOptions]);

  const saveSettings = (nextProvider: AiProvider, nextModel: string) => {
    try {
      window.localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({ provider: nextProvider, model: nextModel }),
      );
    } catch {}
  };

  const handleProviderChange = (next: AiProvider) => {
    if (isLoading) return;
    const nextModel =
      next === "gemini"
        ? modelsOfGemini[0].value
        : next === "claude"
          ? modelsOfAnthropic[0].value
          : modelsOfOpenAI[0].value;
    setProvider(next);
    setSelectedModel(nextModel);
    saveSettings(next, nextModel);
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

  const downloadDataUrl = (dataUrl: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `ai-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleTextInput = () => {
    handleAutoResizeTextarea();
    // 사용자가 직접 타이핑하면 history 탐색 위치 초기화
    historyIndexRef.current = null;
  };

  const setTextareaValue = (value: string) => {
    const textarea = textAreaRef.current;
    textarea.value = value;
    handleAutoResizeTextarea();
    requestAnimationFrame(() => {
      const len = textarea.value.length;
      textarea.setSelectionRange(len, len);
    });
  };

  const handleHistoryNavigation = (e: React.KeyboardEvent) => {
    if (e.shiftKey) return;
    const textarea = textAreaRef.current;

    if (e.key === "ArrowUp") {
      // 커서가 맨 앞이거나 입력이 비어있을 때만 history 동작
      const atTop =
        textarea.selectionStart === 0 && textarea.selectionEnd === 0;
      if (!atTop) return;
      if (inputHistory.length === 0) return;
      e.preventDefault();
      const next =
        historyIndexRef.current === null
          ? 0
          : Math.min(historyIndexRef.current + 1, inputHistory.length - 1);
      historyIndexRef.current = next;
      setTextareaValue(inputHistory[next]);
      return;
    }

    if (e.key === "ArrowDown") {
      // 커서가 맨 끝일 때만 history 동작
      const len = textarea.value.length;
      const atBottom =
        textarea.selectionStart === len && textarea.selectionEnd === len;
      if (!atBottom) return;
      if (historyIndexRef.current === null) return;
      e.preventDefault();
      const next = historyIndexRef.current - 1;
      if (next < 0) {
        historyIndexRef.current = null;
        setTextareaValue("");
      } else {
        historyIndexRef.current = next;
        setTextareaValue(inputHistory[next]);
      }
      return;
    }
  };

  const handleAddImageFiles = (files: File[]) => {
    files.forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(",")[1] ?? "";
        if (!base64) return;
        setAttachedImages((prev) => [
          ...prev,
          { dataUrl, base64, mimeType: file.type },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    handleAddImageFiles(Array.from(files));
    e.target.value = "";
  };

  const handlePasteImage = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    const imageFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) imageFiles.push(file);
      }
    }
    if (imageFiles.length > 0) {
      e.preventDefault();
      handleAddImageFiles(imageFiles);
    }
  };

  const handleRemoveAttachedImage = (index: number) => {
    setAttachedImages((prev) => prev.filter((_, i) => i !== index));
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
      window.localStorage.removeItem(CHAT_STORAGE_KEY);
      window.sessionStorage.removeItem(ACTIVE_SESSION_KEY);

      setSessions([]);
      setSessionId(null);
      setMessages([]);
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
    images: AttachedImage[],
  ) => {
    // 이미지 생성 모델인 경우
    if (selectedModel?.startsWith("imagen-")) {
      setStreamStatus("thinking");
      try {
        const response = await geminiAi.models.generateImages({
          model: selectedModel,
          prompt: input,
          config: {
            numberOfImages: 1,
            outputMimeType: "image/png",
          },
        });

        const base64Image = response.generatedImages?.[0]?.image?.imageBytes;

        if (base64Image) {
          const imageUrl = `data:image/png;base64,${base64Image}`;
          downloadDataUrl(imageUrl);
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    text: "이미지가 생성되었습니다.",
                    images: [imageUrl],
                  }
                : message,
            ),
          );
        } else {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    text: "이미지 생성에 실패했습니다. (응답 데이터 없음)",
                  }
                : message,
            ),
          );
        }
      } catch (e: any) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  text: `이미지 생성 중 오류가 발생했습니다: ${e.message}`,
                }
              : message,
          ),
        );
      }
      setStreamStatus("idle");
      return;
    }

    // Gemini 메시지 parts 변환 (이미지 + 텍스트)
    const toGeminiParts = (m: ChatMessage): any[] => {
      const parts: any[] = [];
      if (m.images && m.images.length > 0) {
        m.images.forEach((url) => {
          const isDataUrl = url.startsWith("data:");
          const b64 = isDataUrl ? (url.split(",")[1] ?? "") : "";
          const mime = isDataUrl
            ? (url.match(/data:(.*?);/)?.[1] ?? "image/png")
            : "image/png";
          if (b64) parts.push({ inlineData: { data: b64, mimeType: mime } });
        });
      }
      if (m.text) parts.push({ text: m.text });
      return parts;
    };

    // 이미지 출력 지원 모델은 responseModalities 명시 필요
    const isImageOutputModel = /image/i.test(selectedModel ?? "");

    // 이미지 출력 모델은 history를 컨텍스트에서 제외
    const history = isImageOutputModel
      ? []
      : messages.slice(-1 * AI_MAX_CONTEXT).map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: toGeminiParts(m),
        }));

    const currentParts: any[] = [];
    images.forEach((img) => {
      currentParts.push({
        inlineData: { data: img.base64, mimeType: img.mimeType },
      });
    });
    if (input) currentParts.push({ text: input });

    const config = isImageOutputModel
      ? { responseModalities: [Modality.TEXT, Modality.IMAGE] }
      : {};

    const responseStream = await geminiAi.models.generateContentStream({
      model: selectedModel,
      contents: [...history, { role: "user", parts: currentParts }],
      config,
    });

    setStreamStatus("thinking");
    let hasReceivedChunk = false;

    for await (const chunk of responseStream) {
      if (!hasReceivedChunk) {
        hasReceivedChunk = true;
        setStreamStatus("streaming");
      }

      // chunk.text는 text 파트만 읽고 inlineData(이미지)는 무시하므로
      // parts에서 inlineData를 직접 추출
      const parts = chunk.candidates?.[0]?.content?.parts ?? [];
      const chunkImages: string[] = [];
      for (const part of parts) {
        const inline = (part as any).inlineData;
        if (inline?.data) {
          const mimeType = inline.mimeType ?? "image/png";
          const dataUrl = `data:${mimeType};base64,${inline.data}`;
          chunkImages.push(dataUrl);
          downloadDataUrl(dataUrl);
        }
      }

      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                text: message.text + (chunk.text ?? ""),
                images:
                  chunkImages.length > 0
                    ? [...(message.images ?? []), ...chunkImages]
                    : message.images,
              }
            : message,
        ),
      );
    }
  };

  const handleRequestClaude = async (
    input: string,
    assistantMessageId: number,
    images: AttachedImage[],
  ) => {
    // Claude 메시지 content 변환 (이미지 + 텍스트 블록 배열)
    const toClaudeContent = (m: ChatMessage): any[] => {
      const content: any[] = [];
      if (m.images && m.images.length > 0) {
        m.images.forEach((url) => {
          if (!url.startsWith("data:")) return;
          const b64 = url.split(",")[1] ?? "";
          const mediaType = url.match(/data:(.*?);/)?.[1] ?? "image/png";
          if (!b64) return;
          content.push({
            type: "image",
            source: { type: "base64", media_type: mediaType, data: b64 },
          });
        });
      }
      if (m.text) content.push({ type: "text", text: m.text });
      return content;
    };

    const history = messages.slice(-1 * AI_MAX_CONTEXT).map((m) => ({
      role: m.role as "user" | "assistant",
      content: toClaudeContent(m),
    }));

    const currentContent: any[] = [];
    images.forEach((img) => {
      currentContent.push({
        type: "image",
        source: { type: "base64", media_type: img.mimeType, data: img.base64 },
      });
    });
    if (input) currentContent.push({ type: "text", text: input });

    const claudeMessages = [
      ...history,
      { role: "user" as const, content: currentContent },
    ];

    const stream = claudeAi.messages.stream({
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
                  text: message.text + (textDelta.text ?? ""),
                }
              : message,
          ),
        );
      }
    }
  };

  const handleRequestOpenAI = async (
    input: string,
    assistantMessageId: number,
    images: AttachedImage[],
  ) => {
    // 이미지 생성 모델인 경우 (모델명에 image 포함)
    if (/image/i.test(selectedModel ?? "")) {
      setStreamStatus("thinking");

      // 첨부 이미지가 있으면 편집(edit) API 사용, 없으면 생성(generate) API 사용
      // multipart 업로드를 위해 Blob 대신 File(name 포함) 사용
      const dataUrlToFile = (dataUrl: string, index: number): File => {
        const [meta, b64] = dataUrl.split(",");
        const mime = meta.match(/data:(.*?);/)?.[1] ?? "image/png";
        const ext = mime.split("/")[1]?.split("+")[0] ?? "png";
        const binary = atob(b64 ?? "");
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return new File([bytes], `image-${index}.${ext}`, { type: mime });
      };

      try {
        const response =
          images.length > 0
            ? await openaiAi.images.edit({
                model: selectedModel,
                prompt: input,
                image: images.map((img, i) => dataUrlToFile(img.dataUrl, i)),
                n: 1,
              })
            : await openaiAi.images.generate({
                model: selectedModel,
                prompt: input,
                n: 1,
              });

        // gpt-image-* 는 b64_json 로 응답, dall-e-* 는 url 또는 b64_json
        const item = response.data?.[0] as any;
        const b64 = item?.b64_json;
        const url = item?.url;
        const revisedPrompt = item?.revised_prompt;
        const successText = revisedPrompt
          ? `이미지가 생성되었습니다.\n\n${revisedPrompt}`
          : "이미지가 생성되었습니다.";

        if (b64) {
          const imageUrl = `data:image/png;base64,${b64}`;
          downloadDataUrl(imageUrl);
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMessageId
                ? { ...message, text: successText, images: [imageUrl] }
                : message,
            ),
          );
        } else if (url) {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMessageId
                ? { ...message, text: successText, images: [url] }
                : message,
            ),
          );
        } else {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    text: "이미지 생성에 실패했습니다. (응답 데이터 없음)",
                  }
                : message,
            ),
          );
        }
      } catch (e: any) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  text: `이미지 생성 중 오류가 발생했습니다: ${e.message}`,
                }
              : message,
          ),
        );
      }
      setStreamStatus("idle");
      return;
    }

    // OpenAI 메시지 content 변환 (이미지 + 텍스트)
    const toOpenAIContent = (m: ChatMessage): any[] => {
      const content: any[] = [];
      if (m.images && m.images.length > 0) {
        m.images.forEach((url) => {
          if (!url.startsWith("data:")) return;
          content.push({
            type: "image_url",
            image_url: { url },
          });
        });
      }
      if (m.text) content.push({ type: "text", text: m.text });
      return content;
    };

    const hasImage = images.length > 0;

    const history = messages.slice(-1 * AI_MAX_CONTEXT).map((m) => {
      const hasMessageImage = !!(m.images && m.images.length > 0);
      // 이미지가 포함된 메시지거나 현재 요청에 이미지가 있으면 멀티모달 content 배열 사용
      if (hasMessageImage || hasImage) {
        return {
          role: m.role as "user" | "assistant",
          content: toOpenAIContent(m),
        };
      }
      return { role: m.role as "user" | "assistant", content: m.text };
    });

    const currentContent: any[] = [];
    images.forEach((img) => {
      currentContent.push({
        type: "image_url",
        image_url: { url: img.dataUrl },
      });
    });
    if (input) currentContent.push({ type: "text", text: input });

    const openaiMessages: any[] = [
      ...history,
      {
        role: "user" as const,
        content: hasImage ? currentContent : input,
      },
    ];

    const stream = await openaiAi.chat.completions.create({
      model: selectedModel,
      stream: true,
      messages: openaiMessages,
    });

    setStreamStatus("thinking");
    let hasReceivedTextChunk = false;

    for await (const chunk of stream) {
      const textDelta = chunk.choices?.[0]?.delta?.content ?? "";
      if (!textDelta) continue;
      if (!hasReceivedTextChunk) {
        hasReceivedTextChunk = true;
        setStreamStatus("streaming");
      }
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                text: message.text + textDelta,
              }
            : message,
        ),
      );
    }
  };

  const handleRequestAi = async (rawInput: string) => {
    const input = rawInput.trim();
    if (isLoading) return;
    if (!input && attachedImages.length === 0) return;
    let hasError = false;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: input,
      images:
        attachedImages.length > 0
          ? attachedImages.map((img) => img.dataUrl)
          : undefined,
    };
    const assistantMessageId = Date.now() + 1;

    isUserScrolledUpRef.current = false;
    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantMessageId, role: "assistant", text: "" },
    ]);
    textAreaRef.current.value = "";
    setTimeout(() => {
      handleAutoResizeTextarea();
    }, 0);
    setIsLoading(true);
    setStreamStatus("requesting");
    setActiveAssistantId(assistantMessageId);

    // 전송할 이미지 스냅샷 (비동기 중 attachedImages 변경 영향 방지)
    const imagesToSend = attachedImages;
    setAttachedImages([]);

    try {
      if (provider === "gemini") {
        await handleRequestGemini(input, assistantMessageId, imagesToSend);
      } else if (provider === "claude") {
        await handleRequestClaude(input, assistantMessageId, imagesToSend);
      } else {
        await handleRequestOpenAI(input, assistantMessageId, imagesToSend);
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
    historyIndexRef.current = null;
  }, [sessionId]);

  useEffect(() => {
    if (!isLoading) {
      textAreaRef.current?.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    if (lightboxImage === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxImage]);

  useEffect(() => {
    if (!isUserScrolledUpRef.current) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (hasGemini && isEmpty(modelsOfGemini)) return;
    if (hasClaude && isEmpty(modelsOfAnthropic)) return;
    if (hasChatGPT && isEmpty(modelsOfOpenAI)) return;

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
        Array.isArray(currentSession.messages) ? currentSession.messages : [],
      );
    } catch (error) {
      console.error("failed to read chat history", error);
    } finally {
      setIsMessagesHydrated(true);
    }

    // settings 로드 (최초 1회만)
    if (!settingsLoadedRef.current) {
      try {
        const rawSettings = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (rawSettings) {
          const parsed = JSON.parse(rawSettings) as {
            provider?: AiProvider;
            model?: string;
          };
          const savedProvider = parsed.provider;
          const savedModel = parsed.model;
          const allModels = [
            ...modelsOfGemini,
            ...modelsOfAnthropic,
            ...modelsOfOpenAI,
          ];
          if (
            savedProvider &&
            (savedProvider === "gemini" ||
              savedProvider === "claude" ||
              savedProvider === "chatgpt")
          ) {
            setProvider(savedProvider);
            if (savedModel && allModels.some((m) => m.value === savedModel)) {
              setSelectedModel(savedModel);
            } else if (modelOptions.length > 0) {
              setSelectedModel(modelOptions[0].value);
            }
          }
        }
      } catch {}
      settingsLoadedRef.current = true;
    }

    setIsMounted(true);
  }, [modelOptions]);

  useEffect(() => {
    if (!router.isReady) return;
    let nextProvider: AiProvider | null = null;
    if (provider === "gemini" && !hasGemini) {
      nextProvider = hasClaude ? "claude" : hasChatGPT ? "chatgpt" : "gemini";
    } else if (provider === "claude" && !hasClaude) {
      nextProvider = hasGemini ? "gemini" : hasChatGPT ? "chatgpt" : "claude";
    } else if (provider === "chatgpt" && !hasChatGPT) {
      nextProvider = hasGemini ? "gemini" : hasClaude ? "claude" : "chatgpt";
    }
    if (nextProvider && nextProvider !== provider) {
      const nextModel =
        nextProvider === "gemini"
          ? (modelsOfGemini[0]?.value ?? "")
          : nextProvider === "claude"
            ? (modelsOfAnthropic[0]?.value ?? "")
            : (modelsOfOpenAI[0]?.value ?? "");
      setProvider(nextProvider);
      setSelectedModel(nextModel);
      saveSettings(nextProvider, nextModel);
    }
  }, [router.isReady, provider, hasGemini, hasClaude, hasChatGPT]);

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

      const messagesToSave = messages.map((msg) => {
        if (msg.images && msg.images.length > 0) {
          return {
            ...msg,
            images: [],
            text: msg.text + (msg.text ? "\n\n[이미지]" : "[이미지]"),
          };
        }
        return msg;
      });

      if (targetIndex >= 0) {
        sessions[targetIndex] = {
          ...sessions[targetIndex],
          messages: messagesToSave,
        };
      } else {
        sessions.push({
          id: sessionId,
          startedAt: new Date().toISOString(),
          messages: messagesToSave,
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

  useEffect(() => {
    (async () => {
      /** 모델 목록 조회 */
      if (gkey && geminiAi) {
        console.log();
        console.log("==============================================");
        console.log("============ Gemini 모델 목록 =================");
        console.log("==============================================");
        const modelList = (await geminiAi.models.list()) as any;
        const models: string[] = [];
        modelList?.pageInternal?.forEach((model: any) =>
          models.push(model.name + ` (${model.displayName})`),
        );
        console.log("Gemini 모델 목록:", models);
        setModelsOfGemini(
          modelList?.pageInternal?.map((model: any) => ({
            value: model.name.replace("models/", ""),
            label:
              model.displayName + ` (${model.name.replace("models/", "")})`,
          })) ?? [],
        );
      }

      if (ckey && claudeAi) {
        console.log();
        console.log("==============================================");
        console.log("============ Claude 모델 목록 =================");
        console.log("==============================================");
        const response = await claudeAi.models.list();
        const models: string[] = [];
        response.data.forEach((model: any) => {
          models.push(model.id);
        });
        console.log(`Claude 모델 ID:`, models);
        setModelsOfAnthropic(
          response.data.map((model: any) => ({
            value: model.id,
            label: model.id,
          })) ?? [],
        );
      }

      if (tkey && openaiAi) {
        console.log();
        console.log("==============================================");
        console.log("============ ChatGPT 모델 목록 ===============");
        console.log("==============================================");
        const response = await openaiAi.models.list();
        const models: string[] = [];
        response.data.forEach((model: any) => {
          models.push(model.id);
        });
        console.log("ChatGPT 모델 ID: ", models);
        setModelsOfOpenAI(
          response.data.map((model: any) => ({
            value: model.id,
            label: model.id,
          })) ?? [],
        );
      }
    })();
  }, [geminiAi, claudeAi, openaiAi, ckey, gkey, tkey]);

  if (!isMounted) return null;

  if (needsSetup) {
    return (
      <S.SetupPage>
        <S.SetupGrid />
        <S.SetupCard>
          <S.SetupTitle>
            AI <span>Chat</span>
          </S.SetupTitle>
          <S.SetupField>
            <S.SetupLabel>Gemini API Key (gkey)</S.SetupLabel>
            <S.SetupInput
              type="password"
              placeholder="AIza..."
              value={setupGKey}
              onChange={(e) => setSetupGKey(e.target.value)}
            />
          </S.SetupField>
          <S.SetupField>
            <S.SetupLabel>Claude API Key (ckey)</S.SetupLabel>
            <S.SetupInput
              type="password"
              placeholder="sk-ant-..."
              value={setupCKey}
              onChange={(e) => setSetupCKey(e.target.value)}
            />
          </S.SetupField>
          <S.SetupField>
            <S.SetupLabel>ChatGPT API Key (tkey)</S.SetupLabel>
            <S.SetupInput
              type="password"
              placeholder="sk-proj-..."
              value={setupTKey}
              onChange={(e) => setSetupTKey(e.target.value)}
            />
          </S.SetupField>
          <S.SetupButton
            onClick={() => {
              const params = new URLSearchParams();
              if (setupGKey) params.set("gkey", setupGKey);
              if (setupCKey) params.set("ckey", setupCKey);
              if (setupTKey) params.set("tkey", setupTKey);
              router.push(`/g?${params.toString()}`);
            }}
          >
            들어가기
          </S.SetupButton>
          <S.SetupHint>
            API 키는 URL 쿼리로 전달되며 서버에 저장되지 않습니다.
          </S.SetupHint>
        </S.SetupCard>
      </S.SetupPage>
    );
  }

  return (
    <S.Page>
      <Head>
        <title>AI Chat — Everything AI Have</title>
      </Head>
      <S.Header>
        <S.BrandTitle>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            AI <span>Chat</span>
          </Link>
        </S.BrandTitle>
        <S.SessionSelectWrap>
          <div style={{ flex: 1, minWidth: 0, maxWidth: 340 }}>
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
                  minHeight: 32,
                  borderRadius: 4,
                  fontSize: 13,
                  borderColor: state.isFocused
                    ? "rgba(0, 255, 255, 0.5)"
                    : "rgba(0, 255, 255, 0.15)",
                  boxShadow: state.isFocused
                    ? "0 0 8px rgba(0, 255, 255, 0.08)"
                    : "none",
                  background: "rgba(0, 255, 255, 0.03)",
                  "&:hover": {
                    borderColor: "rgba(0, 255, 255, 0.3)",
                  },
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: "0 8px",
                }),
                indicatorsContainer: (base) => ({
                  ...base,
                  paddingRight: 4,
                }),
                indicatorSeparator: () => ({
                  display: "none",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 10,
                  background: "#0d0d1a",
                  border: "1px solid rgba(0, 255, 255, 0.15)",
                  borderRadius: 4,
                }),
                option: (base, state) => {
                  const isCreateOption =
                    state.data.value === CREATE_SESSION_OPTION_VALUE;
                  return {
                    ...base,
                    fontSize: 13,
                    backgroundColor: state.isFocused
                      ? "rgba(0, 255, 255, 0.1)"
                      : "transparent",
                    color: isCreateOption
                      ? "#00ffff"
                      : "#c0c0e0",
                    fontWeight: isCreateOption ? 700 : 400,
                    cursor: "pointer",
                    borderBottom: isCreateOption
                      ? "1px solid rgba(0, 255, 255, 0.1)"
                      : "none",
                  };
                },
                singleValue: (base, state) => ({
                  ...base,
                  color:
                    state.data.value === CREATE_SESSION_OPTION_VALUE
                      ? "#00ffff"
                      : "#c0c0e0",
                  fontWeight:
                    state.data.value === CREATE_SESSION_OPTION_VALUE ? 700 : 400,
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "rgba(0, 255, 255, 0.3)",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "rgba(0, 255, 255, 0.2)",
                }),
              }}
            />
          </div>
          <S.DeleteSessionButton
            title="현재 대화 삭제"
            onClick={handleDeleteSession}
            disabled={isLoading}
          >
            <TrashIcon />
          </S.DeleteSessionButton>
          <S.DeleteAllSessionsButton
            title="전체 대화 삭제"
            onClick={handleDeleteAllSessions}
            disabled={isLoading}
          >
            <TrashXIcon />
          </S.DeleteAllSessionsButton>
        </S.SessionSelectWrap>
      </S.Header>

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
                  <S.ChatBody $isUser={message.role === "user"}>
                    {isLoading &&
                      message.role === "assistant" &&
                      message.id === activeAssistantId && (
                        <S.StatusText>{getStatusLabel()}</S.StatusText>
                      )}

                    {message.text && (
                      <S.ChatBubble $isUser={message.role === "user"}>
                        <Markdown
                          remarkPlugins={[[remarkGfm]]}
                          rehypePlugins={[rehypeHighlight]}
                          components={{
                            pre: ({ children }) => (
                              <CopyablePre>{children}</CopyablePre>
                            ),
                          }}
                        >
                          {message.text.replace(
                            /(['|"|)|`])\*\*(.)/g,
                            "$1** $2",
                          )}
                        </Markdown>
                      </S.ChatBubble>
                    )}

                    {message.images && message.images.length > 0 && (
                      <S.ChatBubble
                        $isUser={message.role === "user"}
                        style={{
                          marginTop: "8px",
                          padding: 0,
                          overflow: "hidden",
                          background: "none",
                          border: 0,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                          justifyContent:
                            message.role === "user" ? "flex-end" : "flex-start",
                        }}
                      >
                        {message.images.map((imgUrl, i) => (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            key={i}
                            src={imgUrl}
                            alt="Generated content"
                            onClick={() => setLightboxImage(imgUrl)}
                            style={{
                              display: "block",
                              maxWidth: "100%",
                              maxHeight:
                                message.role === "user" ? "200px" : "none",
                              borderRadius: "8px",
                              cursor: "zoom-in",
                            }}
                          />
                        ))}
                      </S.ChatBubble>
                    )}
                  </S.ChatBody>
                </S.MessageItem>
              ))}
            </S.MessageList>
          )}
          <div ref={messagesEndRef} />
        </S.MessagesArea>

        <S.InputArea>
          <S.ModelSelectWrap>
            <S.ProviderToggleWrap>
              {hasGemini && (
                <S.ProviderToggleButton
                  $active={provider === "gemini"}
                  onClick={() => handleProviderChange("gemini")}
                  disabled={isLoading}
                >
                  Gemini
                </S.ProviderToggleButton>
              )}
              {hasClaude && (
                <S.ProviderToggleButton
                  $active={provider === "claude"}
                  onClick={() => handleProviderChange("claude")}
                  disabled={isLoading}
                >
                  Claude
                </S.ProviderToggleButton>
              )}
              {hasChatGPT && (
                <S.ProviderToggleButton
                  $active={provider === "chatgpt"}
                  onClick={() => handleProviderChange("chatgpt")}
                  disabled={isLoading}
                >
                  ChatGPT
                </S.ProviderToggleButton>
              )}
            </S.ProviderToggleWrap>
            <Select
              options={modelOptions}
              value={
                modelOptions.find((opt) => opt.value === selectedModel) ?? null
              }
              onChange={(opt) => {
                if (!opt || isLoading) return;
                setSelectedModel(opt.value);
                saveSettings(provider, opt.value);
              }}
              isSearchable={false}
              isDisabled={isLoading}
              menuPlacement="top"
              styles={{
                container: (base) => ({
                  ...base,
                  flex: 1,
                  minWidth: 0,
                }),
                control: (base, state) => ({
                  ...base,
                  minHeight: 32,
                  height: 32,
                  borderRadius: 4,
                  fontSize: 13,
                  borderColor: state.isFocused
                    ? "rgba(0, 255, 255, 0.5)"
                    : "rgba(0, 255, 255, 0.12)",
                  boxShadow: state.isFocused
                    ? "0 0 6px rgba(0, 255, 255, 0.06)"
                    : "none",
                  background: "rgba(0, 255, 255, 0.03)",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "rgba(0, 255, 255, 0.3)",
                  },
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: "0 8px",
                }),
                indicatorsContainer: (base) => ({
                  ...base,
                  height: 32,
                  paddingRight: 4,
                }),
                indicatorSeparator: () => ({
                  display: "none",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 10,
                  minWidth: 160,
                  right: 0,
                  background: "#0d0d1a",
                  border: "1px solid rgba(0, 255, 255, 0.15)",
                  borderRadius: 4,
                }),
                option: (base, state) => {
                  return {
                    ...base,
                    fontSize: 13,
                    backgroundColor: state.isFocused
                      ? "rgba(0, 255, 255, 0.1)"
                      : "transparent",
                    fontWeight: state.data.isFavorite ? "700" : "400",
                    color: state.isFocused ? "#00ffff" : "#c0c0e0",
                    cursor: "pointer",
                  };
                },
                singleValue: (base) => ({
                  ...base,
                  color: "#c0c0e0",
                  fontSize: 13,
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "rgba(0, 255, 255, 0.3)",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "rgba(0, 255, 255, 0.2)",
                }),
              }}
            />
          </S.ModelSelectWrap>
          {attachedImages.length > 0 && (
            <S.AttachmentPreviewWrap>
              {attachedImages.map((img, i) => (
                <S.AttachmentPreview key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.dataUrl} alt="첨부 이미지" />
                  <S.AttachmentRemoveButton
                    type="button"
                    title="첨부 삭제"
                    onClick={() => handleRemoveAttachedImage(i)}
                    disabled={isLoading}
                  >
                    ×
                  </S.AttachmentRemoveButton>
                </S.AttachmentPreview>
              ))}
            </S.AttachmentPreviewWrap>
          )}
          <S.InputRow>
            <S.TextInput
              ref={textAreaRef}
              onInput={handleTextInput}
              onPaste={handlePasteImage}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleRequestAi(textAreaRef.current.value);
                  return;
                }
                handleHistoryNavigation(e);
              }}
              disabled={isLoading}
              placeholder="AI에게 물어보세요"
              rows={1}
            />
            <S.InputSpacer />
            <S.AttachButton
              type="button"
              title="이미지 첨부"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <ImageIcon />
            </S.AttachButton>
            <S.InputSpacer />
            <S.SendButton
              disabled={isLoading}
              onClick={() => handleRequestAi(textAreaRef.current.value)}
            >
              {isLoading ? <S.SpinnerIcon /> : <SendIcon />}
            </S.SendButton>
          </S.InputRow>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </S.InputArea>
      </S.ChatContainer>

      {lightboxImage && (
        <S.LightboxOverlay onClick={() => setLightboxImage(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxImage} alt="확대 이미지" />
        </S.LightboxOverlay>
      )}
    </S.Page>
  );
};

export default AiChatComponent;
