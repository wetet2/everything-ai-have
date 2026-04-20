import { useEffect, useRef } from "react";
import { STT_API_KEY } from "../constants";

const API_KEY = STT_API_KEY || "";

let mediaRecorder: any;
let audioChunks: any = [];

const MicGoogleCloudStt = () => {
  useEffect(() => {
    // 녹음 시작
    const startBtn = document.getElementById("startBtn") as any;
    const stopBtn = document.getElementById("stopBtn") as any;
    const resultArea = document.getElementById("result") as any;

    async function sendToGoogleSTT(base64Audio: string) {
      console.log(1000, base64Audio);
      const url = `https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`;

      const requestBody = {
        config: {
          // 브라우저 MediaRecorder의 기본 포맷인 WEBM_OPUS 사용
          encoding: "WEBM_OPUS",
          sampleRateHertz: 48000,
          languageCode: "ko-KR", // 한국어 설정
        },
        audio: {
          content: base64Audio,
        },
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        console.log(1111, data);

        // 결과 처리
        if (data.results && data.results.length > 0) {
          const transcript = data.results[0].alternatives[0].transcript;
          resultArea.value = transcript;
        } else if (data.error) {
          resultArea.value = "에러 발생: " + data.error.message;
        } else {
          resultArea.value = "인식된 음성이 없습니다.";
        }
      } catch (error) {
        console.error("API 호출 에러:", error);
        resultArea.value = "API 호출 중 에러가 발생했습니다.";
      }
    }

    startBtn.onclick = async () => {
      try {
        // 마이크 권한 요청 및 스트림 가져오기
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event: any) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          resultArea.value = "음성 인식 중...";

          // 녹음된 데이터를 WebM Blob 객체로 변환
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          audioChunks = []; // 다음 녹음을 위해 초기화

          // Blob을 Base64 문자열로 변환
          const reader = new FileReader() as any;
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            // 결과물(data:audio/webm;base64,....)에서 실제 base64 데이터만 추출
            const base64Audio = reader.result.split(",")[1];
            sendToGoogleSTT(base64Audio);
          };
        };

        mediaRecorder.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resultArea.value = "녹음 중입니다. 말씀해주세요...";
      } catch (err) {
        console.error("마이크 접근 에러:", err);
        alert("마이크 권한을 허용해주세요.");
      }
    };

    // 녹음 중지
    stopBtn.onclick = () => {
      mediaRecorder.stop();
      startBtn.disabled = false;
      stopBtn.disabled = true;
    };
  }, []);

  return (
    <div>
      <span>Google Cloud STT 테스트</span>

      <button id="startBtn">🔴 녹음 시작</button>
      <button id="stopBtn" disabled>
        ⏹️ 녹음 중지 및 인식 요청
      </button>

      <br />
      <textarea
        id="result"
        rows={5}
        placeholder="인식된 결과가 여기에 표시됩니다..."
        readOnly
      ></textarea>
    </div>
  );
};

export default MicGoogleCloudStt;
