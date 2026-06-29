import styled from "styled-components";

export const TypingPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  font-family:
    "Fira Code", "Cascadia Code", "JetBrains Mono", "Consolas", monospace;
  background: #0a0a0f;

  background-image:
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  padding: 0 24px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
`;

export const HeaderAccent = styled.span`
  color: #00ffff;
  text-shadow:
    0 0 8px rgba(0, 255, 255, 0.5),
    0 0 20px rgba(0, 255, 255, 0.2);
`;

export const StatsBar = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 32px;
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
`;

export const StatLabel = styled.div`
  margin-top: 4px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const SentenceDisplay = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0px;
  max-width: 800px;
  height: 80px;

  padding: 16px 40px;
  margin-bottom: 16px;

  font-size: 28px;
  line-height: 1.6;
  text-align: center;
  background: #1a1a1a;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 600px) {
    font-size: 20px;
    padding: 24px 20px;
    margin: 0 16px 32px;
  }
`;

export const Char = styled.span<{
  $state: "pending" | "correct" | "incorrect" | "current";
}>`
  color: ${({ $state }) =>
    $state === "correct"
      ? "rgba(34, 197, 94, 0.9)"
      : $state === "incorrect"
        ? "rgba(239, 68, 68, 0.9)"
        : $state === "current"
          ? "#ffffff"
          : "rgba(255, 255, 255, 0.25)"};
  white-space: pre;
  background: ${({ $state }) =>
    $state === "current" ? "rgba(0, 255, 255, 0.12)" : "transparent"};
  border-bottom: ${({ $state }) =>
    $state === "current" ? "2px solid #00ffff" : "2px solid transparent"};
  transition:
    color 0.1s,
    background 0.1s;
`;

export const TextInput = styled.textarea`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  height: 80px;
  padding: 20px 40px 16px 40px;

  font-family: inherit;
  font-size: 28px;
  color: #ffffff;
  font-family: "Pretendard", sans-serif;
  white-space: nowrap;
  background: #1a1a1a;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  outline: none;
  resize: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: rgba(0, 255, 255, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 600px) {
    width: calc(100% - 32px);
    margin: 0 16px;
    font-size: 20px;
    padding: 24px 20px;
  }
`;

export const LangToggle = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const LangBtn = styled.button<{ $active: boolean }>`
  padding: 6px 20px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;

  color: ${({ $active }) => ($active ? "#0a0a0f" : "rgba(255, 255, 255, 0.4)")};
  background: ${({ $active }) =>
    $active ? "#00ffff" : "rgba(255, 255, 255, 0.04)"};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid
    ${({ $active }) => ($active ? "#00ffff" : "rgba(255, 255, 255, 0.08)")};

  &:hover {
    color: ${({ $active }) => ($active ? "#0a0a0f" : "#00ffff")};
    background: ${({ $active }) =>
      $active ? "#00ffff" : "rgba(0, 255, 255, 0.08)"};
    border-color: rgba(0, 255, 255, 0.3);
  }
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  width: 80%;
  max-width: 600px;
  height: 3px;
  margin-bottom: 48px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;

  &::after {
    display: block;
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background: linear-gradient(90deg, #00ffff, #0088ff);
    content: "";
    border-radius: 2px;
    transition: width 0.15s ease;
  }
`;

export const NextButton = styled.button`
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  color: #00ffff;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.25);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: rgba(0, 255, 255, 0.2);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.15);
  }
`;

export const ResultOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
`;

export const HelpText = styled.div`
  margin-top: 24px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.2);
`;
