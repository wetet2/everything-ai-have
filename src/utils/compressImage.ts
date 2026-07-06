// 이미지 압축 유틸
// - HEIC/HEIF → JPEG 변환 (heic2any 동적 import, SSR 회피)
// - 차원·품질 단계적 축소로 1MB 이하 달성
// - PNG(투명도)는 먼저 PNG로 시도, 실패 시 JPEG 폴백

type OutputMime = "image/jpeg" | "image/png"

const MAX_BYTES = 1 * 1024 * 1024 // 1MB
const DIMENSION_STEPS = [1920, 1600, 1280, 1024, 800]
const QUALITY_STEPS = [0.9, 0.85, 0.8, 0.7, 0.6, 0.5]

export type CompressedImage = {
  dataUrl: string
  base64: string
  mimeType: string
}

export const isHeic = (file: File): boolean => {
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return (
    type === "image/heic" ||
    type === "image/heif" ||
    type === "image/heic-sequence" ||
    type === "image/heif-sequence" ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  )
}

// HEIC → JPEG 변환
const convertHeicToJpeg = async (file: File): Promise<Blob> => {
  const heic2any = (await import("heic2any")).default
  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.9,
  })
  return Array.isArray(result) ? result[0] : result
}

// canvas로 리사이즈 + 품질 인코딩
const renderToBlob = (
  bitmap: ImageBitmap,
  maxDim: number,
  mime: OutputMime,
  quality: number,
): Promise<{ blob: Blob; dataUrl: string }> =>
  new Promise((resolve, reject) => {
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height))
    const w = Math.round(bitmap.width * scale)
    const h = Math.round(bitmap.height * scale)
    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      reject(new Error("canvas 2d 컨텍스트를 얻을 수 없습니다."))
      return
    }
    ctx.drawImage(bitmap, 0, 0, w, h)
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("이미지 인코딩에 실패했습니다."))
          return
        }
        const reader = new FileReader()
        reader.onload = () =>
          resolve({ blob, dataUrl: reader.result as string })
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(blob)
      },
      mime,
      quality,
    )
  })

const toResult = (
  dataUrl: string,
  mime: OutputMime,
): CompressedImage => ({
  dataUrl,
  base64: dataUrl.split(",")[1] ?? "",
  mimeType: mime,
})

// 메인: HEIC 변환 → 차원·품질 단계 축소 루프로 1MB 이하 달성
export const compressImage = async (file: File): Promise<CompressedImage> => {
  // 1. HEIC → JPEG 변환
  let source: Blob = file
  let heicConverted = false
  if (isHeic(file)) {
    source = await convertHeicToJpeg(file)
    heicConverted = true
  }

  // 2. 디코딩
  const bitmap = await createImageBitmap(source)
  let last:
    | { blob: Blob; dataUrl: string; mime: OutputMime }
    | null = null

  // 3. 출력 포맷 후보
  //    - HEIC 변환됨 / PNG가 아님 → JPEG만
  //    - PNG → PNG 먼저, 실패 시 JPEG 폴백
  const tryMimes: OutputMime[] =
    heicConverted || file.type !== "image/png"
      ? ["image/jpeg"]
      : ["image/png", "image/jpeg"]

  // 4. 차원 × 품질 단계적 축소
  for (const mime of tryMimes) {
    for (const maxDim of DIMENSION_STEPS) {
      for (const quality of QUALITY_STEPS) {
        const { blob, dataUrl } = await renderToBlob(
          bitmap,
          maxDim,
          mime,
          quality,
        )
        last = { blob, dataUrl, mime }
        if (blob.size <= MAX_BYTES) {
          bitmap.close?.()
          return toResult(dataUrl, mime)
        }
      }
    }
  }

  // 5. 1MB 미달 실패 시 가장 작았던 마지막 세팅 반환
  bitmap.close?.()
  if (last) return toResult(last.dataUrl, last.mime)
  throw new Error("이미지 압축에 실패했습니다.")
}
