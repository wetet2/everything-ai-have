#!/bin/bash

# 커밋 메시지가 파라미터로 전달되지 않았으면 사용법을 출력하고 종료
if [ -z "$1" ]; then
  echo "사용법: $0 <commit 메시지>"
  exit 1
fi

COMMIT_MESSAGE="$1"

# 원래 위치를 저장해 둠
ORIGINAL_DIR=$(pwd)

# 원본 및 대상 폴더 경로
SOURCE_DIR="/Users/hoyoonlee/node/everything-ai-have/out"
TARGET_DIR="/Users/hoyoonlee/node/wetet2.github.io"

# 원본 폴더 존재 여부 확인
if [ ! -d "$SOURCE_DIR" ]; then
  echo "오류: 원본 폴더가 존재하지 않습니다: $SOURCE_DIR"
  exit 1
fi

# 대상 폴더가 없으면 생성
if [ ! -d "$TARGET_DIR" ]; then
  mkdir -p "$TARGET_DIR"
fi

# _next 폴더 삭제 (빌드 결과가 바뀌어 남은 stale 파일이 없도록)
NEXT_DIR="$TARGET_DIR/_next"
if [ -d "$NEXT_DIR" ]; then
  echo "_next 폴더 삭제 중... ($NEXT_DIR)"
  rm -rf "$NEXT_DIR"
fi

echo "파일 및 폴더 복사 중... ($SOURCE_DIR -> $TARGET_DIR)"

# rsync로 소스 폴더 내용을 대상 폴더로 복사 (.git 보존)
rsync -a --exclude='.git' "$SOURCE_DIR/" "$TARGET_DIR/"

# 대상 폴더로 이동하여 git add, commit 수행
cd "$TARGET_DIR" || exit 1

echo "git add 실행 중..."
git add .

echo "git commit 실행 중..."
git commit -m "$COMMIT_MESSAGE"

echo "git push 실행 중..."
git push

# 원래 위치로 복귀
cd "$ORIGINAL_DIR" || exit 1

echo "완료: $TARGET_DIR 에 커밋되었습니다."
