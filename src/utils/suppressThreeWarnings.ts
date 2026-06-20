// three.js 0.184+ 에서 나오는 deprecation 경고를 숨깁니다.
// 의존성 낮추기보다 경고 필터링이 더 간단합니다.
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const first = args[0];
    if (
      typeof first === "string" &&
      (first.includes("THREE.Clock") || first.includes("THREE.WebGLShadowMap"))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}
