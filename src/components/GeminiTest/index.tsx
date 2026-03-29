import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import { GEMINI_API_KEY } from "../constants";

import instruction from "./instruction.md";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const GeminiTestComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [resultList, setResultList] = useState<{ q: string; a: string }[]>([]);

  const handleClick = async () => {
    setIsLoading(true);
    const response = await ai.models.generateContent({
      model: `gemini-3.1-flash-lite-preview`,
      contents: inputValue,
      config: { systemInstruction: instruction },
    });
    const text = response?.text;
    if (text) {
      setResultList((prev) => [...prev, { q: inputValue, a: text }]);
    }
    setIsLoading(false);
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
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
          disabled={isLoading}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: 300, height: 40, fontSize: 14, padding: "0 8px" }}
        />
        <div style={{ width: 8 }}></div>
        <button style={{ width: 120, height: 40 }} onClick={handleClick}>
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

export default GeminiTestComponent;
