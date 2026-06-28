import styled from "styled-components";

export const Page = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0a0a0f;
  font-family: "Fira Code", "Cascadia Code", "JetBrains Mono", "Consolas",
    monospace;
`;

export const StatsBar = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 48px;
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
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 4px;
`;

export const SentenceDisplay = styled.div`
  font-size: 28px;
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
  padding: 32px 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 32px;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;

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
  background: ${({ $state }) =>
    $state === "current" ? "rgba(0, 255, 255, 0.12)" : "transparent"};
  border-bottom: ${({ $state }) =>
    $state === "current" ? "2px solid #00ffff" : "2px solid transparent"};
  transition: color 0.1s, background 0.1s;
  white-space: pre;
`;

export const TextInput = styled.textarea`
  width: 80%;
  max-width: 600px;
  height: 100px;
  padding: 16px 20px;
  font-size: 20px;
  font-family: inherit;
  line-height: 1.5;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
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
    font-size: 16px;
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
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;

  color: ${({ $active }) =>
    $active ? "#0a0a0f" : "rgba(255, 255, 255, 0.4)"};
  background: ${({ $active }) =>
    $active ? "#00ffff" : "rgba(255, 255, 255, 0.04)"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "#00ffff" : "rgba(255, 255, 255, 0.08)"};

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
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  margin-bottom: 48px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background: linear-gradient(90deg, #00ffff, #0088ff);
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
`;

export const ResultTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
`;

export const HelpText = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.2);
  margin-top: 24px;
`;
