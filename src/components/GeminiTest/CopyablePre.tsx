import React, { isValidElement, type ReactNode } from "react"; // React 객체와 필요한 타입을 한 번에 임포트합니다.

// 필요한 모든 Hook을 여기서 임포트하여 타입스크립트 오류를 방지합니다.
import { useCallback, useMemo, useState } from "react";

import * as S from "./styled";

/**
 * React 노드 구조에서 텍스트 콘텐츠만 재귀적으로 추출하는 유틸리티 함수입니다.
 */
const getNodeText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");

  // React 객체가 사용 가능하므로, React.isValidElement를 사용하여 안전하게 검사합니다.
  if (React.isValidElement(node) && (node.props as any)?.children) {
    return getNodeText((node.props as any).children);
  }
  return "";
};

interface CopyablePreProps {
  children: ReactNode;
}

const CopyablePre = ({ children }: CopyablePreProps) => {
  // 💡 Tip: 'copied' 상태는 'status'에 통합되어 사용되므로, 초기화 시 하나의 useState만 사용하는 것이 깔끔합니다.
  // 하지만 로직의 가독성을 위해 그대로 유지하되 타입을 명확히 합니다.
  const [isCopied, setIsCopied] = useState<boolean>(false); // 변수명 변경
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // Memoize the extracted text to avoid recalculating on render
  const codeText = useMemo(() => {
    return getNodeText(children).replace(/\n$/, "");
  }, [children]);

  const handleCopy = useCallback(async () => {
    if (!codeText) return;

    // 상태 초기화 및 복사 시도
    setStatus("idle");
    setIsCopied(false); // 명시적으로 복사 취소

    try {
      await navigator.clipboard.writeText(codeText);
      setIsCopied(true); // 성공 플래그 설정
      setStatus("success");

      // 상태 타이머 설정 및 클린업 함수 반환 (useCallback의 효과)
      const timer1 = setTimeout(() => setIsCopied(false), 1200);
      const timer2 = setTimeout(() => setStatus("idle"), 1300);

      return () => {
        // 정리 함수 (Cleanup function)
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } catch (error) {
      console.error("Copy failed:", error);
      setStatus("error"); // 실패 상태 설정
      setIsCopied(false);
    }
  }, [codeText]);

  const copyStatusMessage = useMemo(() => {
    if (status === "success") return "복사됨";
    if (status === "error") return "오류";
    return "복사";
  }, [status]);

  // isCopied 상태를 사용하여 버튼에 대한 추가적인 로직이 필요하면 이 부분에서 처리 가능합니다.
  // 현재는 status만 사용하므로, 원본 구조를 유지했습니다.

  return (
    <S.CodeBlockWrap>
      {/* aria-label의 텍스트가 동적으로 변하도록 개선 */}
      <S.CopyButton
        type="button"
        onClick={handleCopy}
        aria-live="polite" // 스크린 리더에게 상태 변경을 알림
        aria-label={`복사하기, 현재 상태: ${copyStatusMessage}`}
      >
        {copyStatusMessage}
      </S.CopyButton>
      <S.CodePre>{children}</S.CodePre>
    </S.CodeBlockWrap>
  );
};

export default CopyablePre;
