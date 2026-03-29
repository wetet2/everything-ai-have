declare module "*.md" {
  const value: string;
  export default value;
}
declare module "*.txt" {
  const value: string;
  export default value;
}

interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

// speech.d.ts
interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}
