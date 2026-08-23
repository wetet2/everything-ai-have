import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Header,
  Title,
  ScoreArea,
  ScoreBox,
  ScoreLabel,
  ScoreValue,
  ButtonRow,
  NewGameButton,
  UndoButton,
  Board,
  Grid,
  EmptyCell,
  Tile,
  Overlay,
  OverlayText,
  OverlayButton,
  Instruction,
} from "./styled";

// ─── 타입 ───
type GameStatus = "playing" | "won" | "lost";

type TileData = {
  id: number;
  value: number;
  row: number;
  col: number;
  isNew: boolean;
  isMerged: boolean;
};

type Snapshot = {
  grid: number[][];
  score: number;
};

const SIZE = 4;

// ─── 유틸 함수 ───

let tileIdCounter = 0;
function nextTileId() {
  return ++tileIdCounter;
}

/** 빈 4×4 그리드 생성 */
function createEmptyGrid(): number[][] {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

/** 빈 칸 목록 반환 */
function getEmptyCells(grid: number[][]): [number, number][] {
  const cells: [number, number][] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === 0) cells.push([r, c]);
    }
  }
  return cells;
}

/** 랜덤 위치에 새 타일(2 또는 4) 추가 */
function addRandomTile(grid: number[][]): [number, number] | null {
  const empties = getEmptyCells(grid);
  if (empties.length === 0) return null;
  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  return [r, c];
}

/** 한 줄을 왼쪽으로 슬라이드 & 병합 */
function slideRow(row: number[]): { result: number[]; score: number; merged: Set<number> } {
  // 0 제거
  const filtered = row.filter((v) => v !== 0);
  const result: number[] = [];
  const merged = new Set<number>();
  let score = 0;

  let i = 0;
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const val = filtered[i] * 2;
      result.push(val);
      score += val;
      merged.add(result.length - 1);
      i += 2;
    } else {
      result.push(filtered[i]);
      i++;
    }
  }

  // 나머지 0으로 채우기
  while (result.length < SIZE) result.push(0);
  return { result, score, merged };
}

/** 그리드 깊은 복사 */
function cloneGrid(grid: number[][]): number[][] {
  return grid.map((row) => [...row]);
}

/** 그리드 비교 */
function gridsEqual(a: number[][], b: number[][]): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

/** 전체 그리드를 특정 방향으로 이동 */
function moveGrid(
  grid: number[][],
  direction: "left" | "right" | "up" | "down"
): { newGrid: number[][]; score: number; mergedPositions: Set<string> } {
  const newGrid = cloneGrid(grid);
  let totalScore = 0;
  const mergedPositions = new Set<string>();

  if (direction === "left") {
    for (let r = 0; r < SIZE; r++) {
      const { result, score, merged } = slideRow(newGrid[r]);
      newGrid[r] = result;
      totalScore += score;
      merged.forEach((c) => mergedPositions.add(`${r}-${c}`));
    }
  } else if (direction === "right") {
    for (let r = 0; r < SIZE; r++) {
      const reversed = [...newGrid[r]].reverse();
      const { result, score, merged } = slideRow(reversed);
      newGrid[r] = result.reverse();
      totalScore += score;
      merged.forEach((c) => mergedPositions.add(`${r}-${SIZE - 1 - c}`));
    }
  } else if (direction === "up") {
    for (let c = 0; c < SIZE; c++) {
      const col = Array.from({ length: SIZE }, (_, r) => newGrid[r][c]);
      const { result, score, merged } = slideRow(col);
      for (let r = 0; r < SIZE; r++) newGrid[r][c] = result[r];
      totalScore += score;
      merged.forEach((r) => mergedPositions.add(`${r}-${c}`));
    }
  } else {
    // down
    for (let c = 0; c < SIZE; c++) {
      const col = Array.from({ length: SIZE }, (_, r) => newGrid[r][c]).reverse();
      const { result, score, merged } = slideRow(col);
      const final = result.reverse();
      for (let r = 0; r < SIZE; r++) newGrid[r][c] = final[r];
      totalScore += score;
      merged.forEach((r) => mergedPositions.add(`${SIZE - 1 - r}-${c}`));
    }
  }

  return { newGrid, score: totalScore, mergedPositions };
}

/** 가능한 이동이 있는지 확인 */
function canMove(grid: number[][]): boolean {
  // 빈 칸이 있으면 이동 가능
  if (getEmptyCells(grid).length > 0) return true;

  // 인접한 같은 숫자가 있으면 이동 가능
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (c + 1 < SIZE && grid[r][c] === grid[r][c + 1]) return true;
      if (r + 1 < SIZE && grid[r][c] === grid[r + 1][c]) return true;
    }
  }
  return false;
}

/** 2048 달성 여부 확인 */
function hasWon(grid: number[][]): boolean {
  return grid.some((row) => row.some((v) => v >= 2048));
}

// ─── 컴포넌트 ───

export default function Game2048() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [wonAcknowledged, setWonAcknowledged] = useState(false);

  // 터치 스와이프 관련
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // 셀 크기 (CSS clamp 동기화용)
  const [cellSize, setCellSize] = useState(85);

  // 셀 크기 측정
  useEffect(() => {
    function measure() {
      const vw18 = window.innerWidth * 0.18;
      setCellSize(Math.max(60, Math.min(vw18, 85)));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 최고 점수 로컬스토리지 로드
  useEffect(() => {
    const saved = localStorage.getItem("game2048_best");
    if (saved) setBestScore(Number(saved));
  }, []);

  // 최고 점수 저장
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("game2048_best", String(score));
    }
  }, [score, bestScore]);

  // 그리드 → 타일 데이터 변환
  const buildTiles = useCallback(
    (
      g: number[][],
      newPos: [number, number] | null,
      mergedPositions: Set<string>
    ): TileData[] => {
      const result: TileData[] = [];
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          if (g[r][c] !== 0) {
            result.push({
              id: nextTileId(),
              value: g[r][c],
              row: r,
              col: c,
              isNew: newPos ? newPos[0] === r && newPos[1] === c : false,
              isMerged: mergedPositions.has(`${r}-${c}`),
            });
          }
        }
      }
      return result;
    },
    []
  );

  // 새 게임 초기화
  const initGame = useCallback(() => {
    tileIdCounter = 0;
    const g = createEmptyGrid();
    addRandomTile(g);
    const pos = addRandomTile(g);
    setGrid(g);
    setScore(0);
    setStatus("playing");
    setWonAcknowledged(false);
    setHistory([]);
    setTiles(buildTiles(g, null, new Set()));
  }, [buildTiles]);

  // 최초 마운트 시 게임 시작
  useEffect(() => {
    initGame();
  }, [initGame]);

  // 이동 처리
  const handleMove = useCallback(
    (direction: "left" | "right" | "up" | "down") => {
      if (status === "lost") return;
      if (status === "won" && !wonAcknowledged) return;

      const { newGrid, score: gained, mergedPositions } = moveGrid(grid, direction);

      // 변화 없으면 무시
      if (gridsEqual(grid, newGrid)) return;

      // 이동 전 상태 저장 (되돌리기용)
      setHistory((prev) => [...prev.slice(-20), { grid: cloneGrid(grid), score }]);

      const newPos = addRandomTile(newGrid);
      const newScore = score + gained;

      setGrid(newGrid);
      setScore(newScore);
      setTiles(buildTiles(newGrid, newPos, mergedPositions));

      // 승리/패배 판정
      if (!wonAcknowledged && hasWon(newGrid)) {
        setStatus("won");
      } else if (!canMove(newGrid)) {
        setStatus("lost");
      }
    },
    [grid, score, status, wonAcknowledged, buildTiles]
  );

  // 되돌리기
  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setGrid(prev.grid);
    setScore(prev.score);
    setHistory((h) => h.slice(0, -1));
    setTiles(buildTiles(prev.grid, null, new Set()));
    if (status === "lost") setStatus("playing");
  }, [history, buildTiles, status]);

  // 키보드 입력
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const map: Record<string, "left" | "right" | "up" | "down"> = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        handleMove(dir);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleMove]);

  // 터치 스와이프
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // 최소 스와이프 거리 30px
      if (Math.max(absDx, absDy) < 30) return;

      if (absDx > absDy) {
        handleMove(dx > 0 ? "right" : "left");
      } else {
        handleMove(dy > 0 ? "down" : "up");
      }
      touchStartRef.current = null;
    },
    [handleMove]
  );

  // 승리 후 계속하기
  const handleContinue = useCallback(() => {
    setWonAcknowledged(true);
    setStatus("playing");
  }, []);

  // 타일 위치 계산 (px)
  const gap = 8;
  const padding = 8;

  return (
    <>
      <Head>
        <title>2048 게임</title>
        <meta name="description" content="2048 퍼즐 게임 - 타일을 밀어서 2048을 만들어보세요!" />
      </Head>

      <Container>
        <Header>
          <Title>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              2048
            </Link>
          </Title>
          <ScoreArea>
            <ScoreBox>
              <ScoreLabel>점수</ScoreLabel>
              <ScoreValue>{score.toLocaleString()}</ScoreValue>
            </ScoreBox>
            <ScoreBox>
              <ScoreLabel>최고</ScoreLabel>
              <ScoreValue>{bestScore.toLocaleString()}</ScoreValue>
            </ScoreBox>
          </ScoreArea>
        </Header>

        <ButtonRow>
          <NewGameButton onClick={initGame}>새 게임</NewGameButton>
          <UndoButton onClick={handleUndo} disabled={history.length === 0}>
            ↩ 되돌리기
          </UndoButton>
        </ButtonRow>

        <Board
          ref={boardRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 배경 빈 셀 그리드 */}
          <Grid $size={SIZE}>
            {Array.from({ length: SIZE * SIZE }).map((_, i) => (
              <EmptyCell key={i} />
            ))}
          </Grid>

          {/* 타일 레이어 */}
          {tiles.map((tile) => (
            <div
              key={tile.id}
              style={{
                position: "absolute",
                top: padding + tile.row * (cellSize + gap),
                left: padding + tile.col * (cellSize + gap),
                width: cellSize,
                height: cellSize,
                transition: "top 0.12s ease, left 0.12s ease",
                zIndex: tile.isMerged ? 2 : 1,
              }}
            >
              <Tile
                $value={tile.value}
                $isNew={tile.isNew}
                $isMerged={tile.isMerged}
              >
                {tile.value}
              </Tile>
            </div>
          ))}

          {/* 게임 오버 오버레이 */}
          {status === "lost" && (
            <Overlay>
              <OverlayText>게임 오버!</OverlayText>
              <OverlayButton onClick={initGame}>다시 시작</OverlayButton>
              {history.length > 0 && (
                <OverlayButton onClick={handleUndo}>되돌리기</OverlayButton>
              )}
            </Overlay>
          )}

          {/* 승리 오버레이 */}
          {status === "won" && !wonAcknowledged && (
            <Overlay $won>
              <OverlayText $won>🎉 2048 달성!</OverlayText>
              <OverlayButton onClick={handleContinue}>계속하기</OverlayButton>
              <OverlayButton onClick={initGame}>새 게임</OverlayButton>
            </Overlay>
          )}
        </Board>

        <Instruction>
          방향키 또는 스와이프로 타일을 이동하세요.
          같은 숫자의 타일이 만나면 합쳐집니다!
        </Instruction>
      </Container>
    </>
  );
}
