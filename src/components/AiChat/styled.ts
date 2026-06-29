import SpinnerIconBase from "../../../resources/icons/SpinnerIcon";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const scanlineMove = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(1px, -1px); }
  60% { transform: translate(-1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); }
`;

const neonPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

export const Page = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  inset: 0;

  padding: 60px 24px 24px;
  background: #050508;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;

  &::before {
    position: fixed;
    inset: 0;
    z-index: 999;
    width: 100%;
    height: 4px;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 255, 0.03) 2px,
      rgba(0, 255, 255, 0.03) 4px
    );
    content: "";
    pointer-events: none;
    animation: ${scanlineMove} 8s linear infinite;
  }

  @media screen and (max-width: 720px) {
    padding: 16px;
  }
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 0;

  width: min(1000px, 100%);
  background: #0a0a14;
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 4px;
  overflow: hidden;
  box-shadow:
    0 0 20px rgba(0, 255, 255, 0.05),
    inset 0 0 60px rgba(0, 255, 255, 0.02);
`;

export const SessionSelectWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const SessionSelect = styled.select`
  width: 100%;
  height: 36px;
  padding: 0 36px 0 10px;
  color: #00ffff;
  background: #0d0d1a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5.5 7.5L10 12L14.5 7.5' stroke='%2300ffff' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 18px 18px;
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 4px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;

  &:focus {
    border-color: rgba(0, 255, 255, 0.5);
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.1);
  }
`;

export const MessagesArea = styled.div`
  flex: 1;
  padding: 18px 16px;
  background: #0a0a14;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 255, 0.2);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 255, 255, 0.4);
  }

  @media screen and (max-width: 720px) {
    padding: 12px;
  }
`;

export const EmptyMessage = styled.div`
  margin-top: 24px;
  color: rgba(0, 255, 255, 0.3);
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const MessageList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const MessageItem = styled.li<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  margin-bottom: 14px;
  margin-left: ${({ $isUser }) => ($isUser ? "25%" : "0")};
  margin-right: ${({ $isUser }) => ($isUser ? "0" : "25%")};
`;

export const ChatBody = styled.div<{ $isUser: boolean }>`
  max-width: none;
  width: ${({ $isUser }) => ($isUser ? "" : "100%")};
`;

export const MarkdownContainer = styled.div`
  max-width: 100%;
  padding: 10px 14px;
  line-height: 1.5;
  font-size: 14px;
  color: #c0c0e0;
  line-height: 1.7;
  border-radius: 4px;
  border: 1px solid rgba(0, 255, 255, 0.08);

  h1,
  h2,
  h3 {
    margin: 12px 0 0 0;
    color: #00ffff;
  }

  h4,
  h5,
  h6 {
    margin: 8px 0 0 0;
    color: rgba(0, 255, 255, 0.7);
  }

  ul,
  ol {
    margin: 4px 0;
    padding-left: 22px;
  }

  hr {
    margin: 8px 0;
    border-color: rgba(0, 255, 255, 0.1);
  }

  pre {
    margin: 8px 0;
    padding: 10px 12px;
    background: #050510;
    border-radius: 4px;
    border: 1px solid rgba(0, 255, 255, 0.08);
    overflow-x: auto;
  }

  code {
    font-family:
      "Fira Code", "Consolas", "Menlo", "Monaco", "Courier New", "Pretendard",
      monospace;
    font-size: 13px;
  }

  pre code {
    color: #c0c0e0;
    line-height: 1.55;
  }

  :not(pre) > code {
    padding: 2px 6px;
    color: #00ffff;
    word-break: break-word;
    background: rgba(0, 255, 255, 0.1);
    border-radius: 4px;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal {
    color: #ff00ff;
  }

  .hljs-title,
  .hljs-section,
  .hljs-name,
  .hljs-function .hljs-title {
    color: #00ffff;
  }

  .hljs-string,
  .hljs-attr,
  .hljs-template-tag,
  .hljs-template-variable {
    color: #00ff88;
  }

  .hljs-number,
  .hljs-symbol,
  .hljs-bullet {
    color: #ff4444;
  }

  .hljs-comment,
  .hljs-quote {
    color: rgba(0, 255, 255, 0.3);
    font-style: italic;
  }

  strong {
    color: #ffff00;
  }

  a {
    color: #00ffff;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: #ff00ff;
    }
  }
`;

export const ChatBubble = styled(MarkdownContainer)<{ $isUser: boolean }>`
  color: ${({ $isUser }) => ($isUser ? "#e0e0ff" : "#c0c0e0")};
  background: ${({ $isUser }) =>
    $isUser
      ? "linear-gradient(135deg, rgba(255, 0, 255, 0.15), rgba(255, 0, 255, 0.05))"
      : "linear-gradient(135deg, rgba(0, 255, 255, 0.08), rgba(0, 255, 255, 0.02))"};
  border-color: ${({ $isUser }) =>
    $isUser
      ? "rgba(255, 0, 255, 0.2)"
      : "rgba(0, 255, 255, 0.12)"};
  border-radius: ${({ $isUser }) =>
    $isUser ? "4px 4px 2px 4px" : "4px 4px 4px 2px"};
  white-space: ${({ $isUser }) => ($isUser ? "pre-wrap" : "")};
  box-shadow: ${({ $isUser }) =>
    $isUser
      ? "0 0 12px rgba(255, 0, 255, 0.08)"
      : "0 0 12px rgba(0, 255, 255, 0.05)"};
`;

export const CodeBlockWrap = styled.div`
  position: relative;
`;

export const CodePre = styled.pre`
  & > code {
    display: inline-block;
    min-width: 100%;
    padding-right: 56px;
  }
`;

export const CopyButton = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 1;
  padding: 2px 8px;
  color: #00ffff;
  font-size: 12px;
  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.12s ease;

  &:hover {
    background: rgba(0, 255, 255, 0.12);
    border-color: rgba(0, 255, 255, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const StatusText = styled.div`
  margin-bottom: 4px;
  font-size: 12px;
  color: rgba(0, 255, 255, 0.5);
  animation: ${neonPulse} 1.5s ease-in-out infinite;
`;

export const InputArea = styled.div`
  padding: 10px 12px;
  background: #0a0a14;
  border-top: 1px solid rgba(0, 255, 255, 0.1);
`;

export const InputRow = styled.div`
  align-items: center;
  display: flex;
`;

export const TextInput = styled.textarea`
  flex: 1;
  min-height: 42px;
  max-height: 180px;
  padding: 10px 14px;
  font-size: 14px;
  line-height: 1.5;
  color: #c0c0e0;
  background: rgba(0, 255, 255, 0.03);
  resize: none;
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 4px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.06);
  }

  &::placeholder {
    color: rgba(0, 255, 255, 0.2);
  }

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
  font-size: 16px;
  color: #00ffff;
  background: rgba(0, 255, 255, 0.06);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(0, 255, 255, 0.12);
    border-color: rgba(0, 255, 255, 0.5);
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const SpinnerIcon = styled(SpinnerIconBase)`
  color: #00ffff;
  animation: ${spin} 0.8s linear infinite;
`;

export const ModelSelectWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  white-space: nowrap;
`;

export const DeleteSessionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  color: #ff4444;
  background: rgba(255, 0, 0, 0.04);
  border: 1px solid rgba(255, 0, 0, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(255, 0, 0, 0.1);
    border-color: rgba(255, 0, 0, 0.4);
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.08);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const ProviderToggleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
  padding: 2px;

  background: rgba(0, 255, 255, 0.06);
  border: 1px solid rgba(0, 255, 255, 0.12);
  border-radius: 4px;
`;

export const ProviderToggleButton = styled.button<{ $active: boolean }>`
  padding: 5px 18px;
  font-size: 13px;
  color: ${({ $active }) => ($active ? "#00ffff" : "rgba(0, 255, 255, 0.3)")};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  background: ${({ $active }) =>
    $active ? "rgba(0, 255, 255, 0.12)" : "transparent"};
  border-radius: 2px;
  border: none;
  box-shadow: ${({ $active }) =>
    $active ? "0 0 8px rgba(0, 255, 255, 0.08)" : "none"};
  cursor: pointer;
  transition: all 0.18s;

  &:hover:not(:disabled) {
    color: #00ffff;
    background: rgba(0, 255, 255, 0.08);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media screen and (max-width: 720px) {
    padding: 5px 8px;
    font-size: 12px;
  }
`;

export const DeleteAllSessionsButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  color: #ff4444;
  background: rgba(255, 0, 0, 0.03);
  border: 1px solid rgba(255, 0, 0, 0.15);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(255, 0, 0, 0.08);
    border-color: rgba(255, 0, 0, 0.3);
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.06);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const AttachButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  color: rgba(0, 255, 255, 0.5);
  background: rgba(0, 255, 255, 0.03);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    color: #00ffff;
    background: rgba(0, 255, 255, 0.08);
    border-color: rgba(0, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const AttachmentPreviewWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
  padding: 8px;
  background: rgba(0, 255, 255, 0.03);
  border: 1px solid rgba(0, 255, 255, 0.08);
  border-radius: 4px;
`;

export const AttachmentPreview = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  background: #050508;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 255, 0.15);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const LightboxOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  z-index: 9999;
  padding: 24px;
  background: rgba(0, 0, 0, 0.9);
  cursor: zoom-out;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 4px;
    user-select: none;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.08);
  }
`;

export const AttachmentRemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  padding: 0;
  color: #ff4444;
  font-size: 14px;
  line-height: 1;
  background: rgba(255, 0, 0, 0.2);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.18s;

  &:hover:not(:disabled) {
    background: rgba(255, 0, 0, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SetupModalOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  z-index: 1000;
  padding: 24px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

export const SetupCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: 40px 32px;
  background: #0a0a14;
  border: 1px solid rgba(0, 255, 255, 0.12);
  border-radius: 4px;
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.1);
`;

export const SetupTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #e0e0ff;
  text-align: center;
  letter-spacing: 4px;
  text-transform: uppercase;

  span {
    background: linear-gradient(135deg, #00ffff, #ff00ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const SetupField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const SetupLabel = styled.label`
  font-size: 11px;
  font-weight: 600;
  color: rgba(0, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const SetupInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  color: #c0c0e0;
  font-size: 14px;
  font-family: monospace;
  background: rgba(0, 255, 255, 0.03);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: rgba(0, 255, 255, 0.5);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.15);
  }
`;

export const SetupButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  width: 100%;
  padding: 12px;
  color: ${({ $variant }) =>
    $variant === "secondary" ? "rgba(255, 255, 255, 0.5)" : "#00ffff"};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  background: ${({ $variant }) =>
    $variant === "secondary"
      ? "rgba(255, 255, 255, 0.03)"
      : "rgba(0, 255, 255, 0.08)"};
  border: 1px solid
    ${({ $variant }) =>
      $variant === "secondary"
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(0, 255, 255, 0.3)"};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $variant }) =>
      $variant === "secondary" ? "rgba(255, 255, 255, 0.8)" : "#00ffff"};
    background: ${({ $variant }) =>
      $variant === "secondary"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(0, 255, 255, 0.15)"};
    border-color: ${({ $variant }) =>
      $variant === "secondary"
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(0, 255, 255, 0.5)"};
    box-shadow: ${({ $variant }) =>
      $variant === "secondary" ? "none" : "0 0 20px rgba(0, 255, 255, 0.12)"};
  }
`;

export const SetupButtonRow = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  ${SetupButton} {
    flex: 1;
    width: auto;
  }
`;

export const SetupHint = styled.p`
  margin: 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.2);
  text-align: center;
  line-height: 1.5;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 48px;
  padding: 0 24px;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  box-sizing: border-box;
`;

export const BrandTitle = styled.div`
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #e0e0ff;

  span {
    background: linear-gradient(135deg, #00ffff, #ff00ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const SettingsButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  color: rgba(0, 255, 255, 0.5);
  background: rgba(0, 255, 255, 0.03);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    color: #00ffff;
    background: rgba(0, 255, 255, 0.08);
    border-color: rgba(0, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
