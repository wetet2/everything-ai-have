import { isValidElement, type ReactNode, useState } from "react";

import * as S from "./styled";

const getNodeText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }
  return "";
};

const CopyablePre = ({ children }: { children: ReactNode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeText = getNodeText(children).replace(/\n$/, "");
    if (!codeText) return;

    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error("copy failed", error);
    }
  };

  return (
    <S.CodeBlockWrap>
      <S.CopyButton type="button" onClick={handleCopy}>
        {copied ? "복사됨" : "복사"}
      </S.CopyButton>
      <S.CodePre>{children}</S.CodePre>
    </S.CodeBlockWrap>
  );
};

export default CopyablePre;
