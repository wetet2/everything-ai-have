import SpinnerIconBase from "../../../resources/icons/SpinnerIcon";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
  padding: 24px;
  background: #d9dde6;
`;

export const ChatContainer = styled.div`
  flex: 1;
  min-height: 0;

  width: min(1000px, 95vw);
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.12);
`;

export const SessionSelectWrap = styled.div`
  width: min(1000px, 95vw);
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
`;

export const SessionSelect = styled.select`
  width: 100%;
  height: 36px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  padding: 0 36px 0 10px;
  color: #111827;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5.5 7.5L10 12L14.5 7.5' stroke='%2364748b' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 18px 18px;
`;

export const MessagesArea = styled.div`
  flex: 1;
  padding: 18px 16px;
  overflow-y: auto;
  background: #f9fafb;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #d1d5db;
  }
`;

export const EmptyMessage = styled.div`
  color: #666;
  text-align: center;
  margin-top: 24px;
`;

export const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MessageItem = styled.li<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  margin-bottom: 14px;
`;

export const ChatBody = styled.div`
  max-width: min(90%, 880px);
`;

export const MarkdownContainer = styled.div`
  max-width: 100%;
  border-radius: 18px;
  padding: 10px 14px;
  line-height: 1.5;
  border: 1px solid #e6e8ee;
  font-size: 14px;
  color: #1f2937;
  line-height: 1.7;

  h1,
  h2,
  h3 {
    margin: 12px 0 0 0;
  }

  h4,
  h5,
  h6 {
    margin: 8px 0 0 0;
  }

  ul,
  ol {
    margin: 4px 0;
    padding-left: 22px;
  }

  hr {
    margin: 8px 0;
  }

  pre {
    margin: 8px 0;
    padding: 10px 12px;
    border-radius: 8px;
    background: #0f172a;
    overflow-x: auto;
  }

  code {
    font-family:
      "Fira Code", "Consolas", "Menlo", "Monaco", "Courier New", "Pretendard",
      monospace;
    font-size: 13px;
  }

  pre code {
    color: #e2e8f0;
    display: block;
    line-height: 1.55;
  }

  :not(pre) > code {
    padding: 2px 6px;
    border-radius: 6px;
    background: #c7e1ff;
    color: #1f2937;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal {
    color: #c4b5fd;
  }

  .hljs-title,
  .hljs-section,
  .hljs-name,
  .hljs-function .hljs-title {
    color: #93c5fd;
  }

  .hljs-string,
  .hljs-attr,
  .hljs-template-tag,
  .hljs-template-variable {
    color: #86efac;
  }

  .hljs-number,
  .hljs-symbol,
  .hljs-bullet {
    color: #fca5a5;
  }

  .hljs-comment,
  .hljs-quote {
    color: #94a3b8;
    font-style: italic;
  }
`;

export const ChatBubble = styled(MarkdownContainer)<{ $isUser: boolean }>`
  color: ${({ $isUser }) => ($isUser ? "#ffffff" : "#1f2937")};
  background: ${({ $isUser }) => ($isUser ? "#6f54ff" : "#eff2f6")};
  border-color: ${({ $isUser }) => ($isUser ? "#6f54ff" : "#e6e8ee")};
  border-radius: ${({ $isUser }) =>
    $isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px"};
  white-space: ${({ $isUser }) => ($isUser ? "pre-wrap" : "")};
`;

export const CodeBlockWrap = styled.div`
  position: relative;
`;

export const CopyButton = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 1;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 12px;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.12s ease;

  &:hover {
    background: #334155;
    border-color: #475569;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const StatusText = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
`;

export const InputArea = styled.div`
  border-top: 1px solid #e5e7eb;
  padding: 10px 12px;
  background: #f9fafb;
`;

export const InputRow = styled.div`
  align-items: center;
  display: flex;
`;

export const TextInput = styled.textarea`
  flex: 1;
  min-height: 42px;
  max-height: 180px;
  resize: none;
  overflow-y: auto;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px 14px;
  border: 1px solid #e4e7ec;
  border-radius: 20px;
  background: #f1f3f6;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InputSpacer = styled.div`
  width: 8px;
`;

export const SendButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  color: #fff;
  background: #6f54ff;
  cursor: pointer;
`;

export const SpinnerIcon = styled(SpinnerIconBase)`
  animation: ${spin} 0.8s linear infinite;
`;

export const ModelSelectWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
`;

export const ModelChipGroup = styled.div`
  display: flex;
  gap: 6px;
`;

export const ModelChip = styled.button<{ $active: boolean }>`
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid ${({ $active }) => ($active ? "#6f54ff" : "#d1d5db")};
  background: ${({ $active }) => ($active ? "#ede9ff" : "#fff")};
  color: ${({ $active }) => ($active ? "#6f54ff" : "#6b7280")};
  text-shadow: ${({ $active }) =>
    $active ? "0 0 0.5px #6f54ff, 0 0 0.5px #6f54ff" : "none"};
  cursor: pointer;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    border-color: #6f54ff;
    color: #6f54ff;
    text-shadow:
      0 0 0.5px #6f54ff,
      0 0 0.5px #6f54ff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DeleteSessionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: 1px solid #fee2e2;
  border-radius: 8px;
  background: #fff;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #fef2f2;
    border-color: #fca5a5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ProviderToggleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0;

  width: 161px;

  background: #e5e7eb;
  border-radius: 20px;
  padding: 3px;
  flex-shrink: 0;
`;

export const ProviderToggleButton = styled.button<{ $active: boolean }>`
  padding: 5px 18px;
  border-radius: 16px;
  font-size: 13px;
  /* font-weight: ${({ $active }) => ($active ? 600 : 400)}; */
  border: none;
  background: ${({ $active }) => ($active ? "#fff" : "transparent")};
  color: ${({ $active }) => ($active ? "#111827" : "#6b7280")};
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 4px rgba(0,0,0,0.10)" : "none"};
  cursor: pointer;
  transition: all 0.18s;

  text-shadow: ${({ $active }) =>
    $active ? "0 0 0.5px #111827, 0 0 0.5px #111827" : "none"};

  &:hover:not(:disabled) {
    color: #111827;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DeleteAllSessionsButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background: #fff1f2;
  color: #dc2626;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #fee2e2;
    border-color: #f87171;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
