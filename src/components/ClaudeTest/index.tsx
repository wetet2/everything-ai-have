import Anthropic from "@anthropic-ai/sdk";
import { useState } from "react";
import { CLAUDE_API_KEY } from "../constants";

import instruction from "@/instruction.md";
import MicBrowserSpeech from "../MicBrowserSpeech";

const anthropic = new Anthropic({
  apiKey: CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ClaudeTestComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [resultList, setResultList] = useState<{ q: string; a: string }[]>([]);

  const handleRequestAi = async (input: string) => {
    setIsLoading(true);
    const result = await anthropic.messages.create({
      // model: "claude-opus-4-6",
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      system: instruction,
      messages: [{ role: "user", content: input }],
    });
    console.log(222, result);
    if (result) {
      const block = result.content[0];
      if (block.type === "text") {
        const text = block.text.replace(/```(json)?/g, ""); // ✅ 이제 string으로 인식
        setResultList((prev) => [...prev, { q: input, a: text || "" }]);
      }
    }
    setIsLoading(false);
  };

  const handleSpeechEnd = (text: string) => {
    setInputValue(text);
    handleRequestAi(text);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <MicBrowserSpeech onInputEnd={handleSpeechEnd} />
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRequestAi(inputValue);
          }}
          disabled={isLoading}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: 300, height: 40, fontSize: 14, padding: "0 8px" }}
        />
        <div style={{ width: 8 }}></div>
        <button
          style={{ width: 120, height: 40 }}
          onClick={() => handleRequestAi(inputValue)}
        >
          {isLoading ? "로딩중..." : "실행"}
        </button>
      </div>

      <div style={{ marginTop: 24 }}>
        <ul>
          {resultList.map((result, index) => (
            <li key={index} style={{ maxWidth: 1000, lineHeight: 1.5 }}>
              <strong>질문:</strong> {result.q}
              <br />
              <strong>답변:</strong> {result.a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClaudeTestComponent;
