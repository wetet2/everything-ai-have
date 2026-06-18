#!/bin/bash

# 커밋 메시지가 파라미터로 전달되지 않았으면 사용법을 출력하고 종료
if [ -z "$1" ]; then
  echo "사용법: $0 <commit 메시지>"
  exit 1
fi

COMMIT_MESSAGE="$1"

# 원래 위치를 저장해 둠
ORIGINAL_DIR=$(pwd)

# 원본 및 대상 폴터 경로
SOURCE_DIR="/e/node/nextjs/out"
TARGET_DIR="/e/node/wetet2.github.io"

# 원본 폴터 존재 여부 확인
if [ ! -d "$SOURCE_DIR" ]; then
  echo "오류: 원본 폴터가 존재하지 않습니다: $SOURCE_DIR"
  exit 1
fi

# 대상 폴터가 없으면 생성
if [ ! -d "$TARGET_DIR" ]; then
  mkdir -p "$TARGET_DIR"
fi

echo "파일 및 폴터 복사 중... ($SOURCE_DIR -> $TARGET_DIR, index.html 제외)"

# 원본 폴터로 이동
cd "$SOURCE_DIR" || exit 1

# 1. 모든 폴터 구조를 먼저 복사 (빈 폴터 포함)
echo "폴터 구조 복사 중..."
find . -type d -exec mkdir -p "$TARGET_DIR/{}" \;

# 2. index.html을 제외한 모든 파일을 폴터 구조를 유지하며 복사
echo "파일 복사 중..."
find . -type f ! -name 'index.html' -exec cp --parents -f {} "$TARGET_DIR/" \;

# 대상 폴터로 이동하여 git add, commit 수행
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
