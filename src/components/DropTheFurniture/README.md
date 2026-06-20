# Drop the Furniture

3D 공간에서 방과 가구를 배치하고 편집할 수 있는 Next.js 기반 웹 앱 컴포넌트입니다.

## 기술 스택

- **Next.js 16** (Pages Router)
- **React 19**
- **TypeScript**
- **styled-components**
- **Three.js + @react-three/fiber + @react-three/drei**

## 설치된 의존성

```bash
yarn add three @react-three/fiber @react-three/drei
yarn add -D @types/three
```

## 파일 구조

```
src/components/DropTheFurniture/
├── index.tsx        # 메인 컴포넌트 (상태, UI, 목록)
├── Scene.tsx        # 3D Canvas, 조명, 그리드, 아이템 렌더링
├── RoomObject.tsx   # 배치된 방 메시 + TransformControls
├── RoomMesh.tsx     # 방의 바닥/벽 지오메트리
├── Furniture.tsx    # 배치된 가구 메시 + TransformControls
├── styled.ts        # styled-components 스타일
└── types.ts         # TypeScript 타입 정의
```

## 주요 기능

### 1. 방 & 가구 추가

- **왼쪽 패널**에서 "방 추가" 및 가구(침대, 의자, 테이블, 소파)를 추가할 수 있습니다.
- 가구를 추가할 때는 현재 선택된 방(또는 첫 번째 방)에 자동으로 배치됩니다.

### 2. 목록에서 선택

- **오른쪽 패널**에 추가된 방과 가구가 목록으로 표시됩니다.
- 방은 별도 배경색(병아색)으로, 가구는 회색 배경으로 구분됩니다.
- **방은 3D 공간에서 직접 클릭할 수 없고**, 목록에서만 선택할 수 있습니다.
  - 3D에서 방을 클릭하면 현재 선택이 해제됩니다.
- 가구는 목록 클릭뿐 아니라 3D에서 직접 클릭으로도 선택할 수 있습니다.

### 3. 편집 도구

- 선택된 항목의 **이름**을 자유롭게 변경할 수 있습니다.
- **색상**을 변경할 수 있습니다.
- 방은 **가로/세로/높이** 크기를 조절할 수 있습니다.

### 4. 이동/회전/크기 조절

- `TransformControls`를 사용해 3D에서 직접 조작합니다.
- 방: 이동, 회전만 가능 (크기 조절 비활성화)
- 가구: 이동, 회전, 크기 조절 모두 가능

### 5. 단축키 스냅

- **회전 모드**에서 키를 누른 채 조작하면 다음 간격으로 회전됩니다.
  - `Shift`: 15도 단위
  - `Ctrl`: 90도 단위

### 6. 가구 이동 제약

- 가구를 이동하면 **바닥에 붙습니다**.
- 가구는 소속된 **방의 벽을 넘어갈 수 없습니다**.
- 소속 방이 없는 경우는 전체 그리드(40×40) 안에서만 움직입니다.

### 7. 환경 설정

- 씬 배경색은 **흰색**입니다.
- 바닥에 1m 단위 그리드가 표시됩니다.
- `OrbitControls`로 침라를 회전/줌/이동할 수 있습니다.

## 실행 방법

```bash
yarn dev
```

브라우저에서 `http://localhost:8080/c`로 접속하면 됩니다.

## 정적 빌드

```bash
yarn build
yarn serve
```

## 확장 아이디어

- GLB/GLTF 실제 가구 모델 불러오기 (`useGLTF`)
- 가구 저장/불러오기 (JSON)
- 여러 층(층별 배치) 지원
- 가구 간 충돌 감지
- 방 회전 시에도 정확한 벽 충돌 처리
