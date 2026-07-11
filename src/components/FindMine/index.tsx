import { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Heading,
  DifficultyRow,
  DiffButton,
  Panel,
  Hud,
  Counter,
  FaceButton,
  FaceGraphic,
  Field,
  Cell,
  MineMark,
  WrongX,
  Status,
  Hint,
  LedRow,
  FlagMark,
  FlagBase,
} from "./styled";

type Difficulty = "beginner" | "intermediate" | "expert";

type GameState = "ready" | "playing" | "won" | "lost";

type MineCell = {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
  exploded: boolean;
  wrong: boolean;
};

const LEVELS: Record<
  Difficulty,
  { rows: number; cols: number; mines: number; label: string }
> = {
  beginner: { rows: 9, cols: 9, mines: 10, label: "초급" },
  intermediate: { rows: 16, cols: 16, mines: 40, label: "중급" },
  expert: { rows: 16, cols: 30, mines: 99, label: "상급" },
};

const DIRS: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function createEmptyBoard(rows: number, cols: number): MineCell[][] {
  return Array.from({ length: rows }, () =>
    Array.from(
      { length: cols },
      (): MineCell => ({
        mine: false,
        revealed: false,
        flagged: false,
        adjacent: 0,
        exploded: false,
        wrong: false,
      }),
    ),
  );
}

function inBounds(rows: number, cols: number, r: number, c: number) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

function getNeighbors(
  rows: number,
  cols: number,
  r: number,
  c: number,
): [number, number][] {
  const res: [number, number][] = [];
  for (const [dr, dc] of DIRS) {
    const nr = r + dr;
    const nc = c + dc;
    if (inBounds(rows, cols, nr, nc)) res.push([nr, nc]);
  }
  return res;
}

function placeMines(
  board: MineCell[][],
  rows: number,
  cols: number,
  mines: number,
  safeR: number,
  safeC: number,
): MineCell[][] {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));

  const forbidden = new Set<string>();
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      forbidden.add(`${safeR + dr},${safeC + dc}`);
    }
  }

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (next[r][c].mine) continue;
    if (forbidden.has(`${r},${c}`)) continue;
    next[r][c].mine = true;
    placed++;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (next[r][c].mine) continue;
      let count = 0;
      for (const [nr, nc] of getNeighbors(rows, cols, r, c)) {
        if (next[nr][nc].mine) count++;
      }
      next[r][c].adjacent = count;
    }
  }

  return next;
}

function revealRecursive(
  board: MineCell[][],
  rows: number,
  cols: number,
  r: number,
  c: number,
) {
  const stack: [number, number][] = [[r, c]];
  while (stack.length > 0) {
    const [cr, cc] = stack.pop()!;
    const cell = board[cr][cc];
    if (cell.revealed || cell.flagged || cell.mine) continue;
    cell.revealed = true;
    if (cell.adjacent === 0) {
      for (const [nr, nc] of getNeighbors(rows, cols, cr, cc)) {
        if (!board[nr][nc].revealed) stack.push([nr, nc]);
      }
    }
  }
}

function checkWin(board: MineCell[][], rows: number, cols: number, mines: number) {
  let revealedSafe = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].mine && board[r][c].revealed) revealedSafe++;
    }
  }
  return revealedSafe === rows * cols - mines;
}

function countFlags(board: MineCell[][]) {
  let flags = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell.flagged) flags++;
    }
  }
  return flags;
}

// 7세그먼트 디스플레이 세그맵 (a,b,c,d,e,f,g 순)
const SEG_MAP: Record<string, boolean[]> = {
  "0": [true, true, true, true, true, true, false],
  "1": [false, true, true, false, false, false, false],
  "2": [true, true, false, true, true, false, true],
  "3": [true, true, true, true, false, false, true],
  "4": [false, true, true, false, false, true, true],
  "5": [true, false, true, true, false, true, true],
  "6": [true, false, true, true, true, true, true],
  "7": [true, true, true, false, false, false, false],
  "8": [true, true, true, true, true, true, true],
  "9": [true, true, true, true, false, true, true],
  "-": [false, false, false, false, false, false, true],
};

// 육각형(베벨) 세그먼트 좌표 생성
const K = 6;
const H = 6;

const hSeg = (xL: number, xR: number, yc: number) =>
  [
    [xL + K, yc - H],
    [xR - K, yc - H],
    [xR, yc],
    [xR - K, yc + H],
    [xL + K, yc + H],
    [xL, yc],
  ]
    .map((p) => p.join(","))
    .join(" ");

const vSeg = (xc: number, yT: number, yB: number) =>
  [
    [xc - H, yT + K],
    [xc, yT],
    [xc + H, yT + K],
    [xc + H, yB - K],
    [xc, yB],
    [xc - H, yB - K],
  ]
    .map((p) => p.join(","))
    .join(" ");

// a,g,d: 가로 / b,c,e,f: 세로
const SEG_POINTS: Record<string, string> = {
  a: hSeg(13, 51, 9),
  b: vSeg(51, 13, 58),
  c: vSeg(51, 58, 103),
  d: hSeg(13, 51, 107),
  e: vSeg(13, 58, 103),
  f: vSeg(13, 13, 58),
  g: hSeg(13, 51, 58),
};

const SEG_ORDER = ["a", "b", "c", "d", "e", "f", "g"] as const;

function Digit({ value }: { value: string }) {
  const seg = SEG_MAP[value] ?? SEG_MAP["0"];
  return (
    <svg
      viewBox="0 0 64 116"
      width="18"
      height="33"
      style={{ display: "block" }}
      shapeRendering="crispEdges"
    >
      {SEG_ORDER.map((s, i) => (
        <polygon
          key={s}
          points={SEG_POINTS[s]}
          fill={seg[i] ? "#ff2b2b" : "#330000"}
          style={
            seg[i]
              ? { filter: "drop-shadow(0 0 2px rgba(255, 43, 43, 0.85))" }
              : undefined
          }
        />
      ))}
    </svg>
  );
}

function LedDisplay({ value }: { value: string }) {
  return (
    <LedRow>
      {value.split("").map((ch, i) => (
        <Digit key={i} value={ch} />
      ))}
    </LedRow>
  );
}

export default function FindMine() {
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const { rows, cols, mines } = LEVELS[difficulty];

  const [board, setBoard] = useState<MineCell[][]>(() =>
    createEmptyBoard(rows, cols),
  );
  const [gameState, setGameState] = useState<GameState>("ready");
  const [time, setTime] = useState(0);
  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [holding, setHolding] = useState<Set<string>>(new Set());
  const pressOrigin = useRef<{ r: number; c: number } | null>(null);
  const suppressClick = useRef(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 난이도 변경: 보드·상태 초기화
  const changeDifficulty = useCallback((key: Difficulty) => {
    const lvl = LEVELS[key];
    setDifficulty(key);
    setBoard(createEmptyBoard(lvl.rows, lvl.cols));
    setGameState("ready");
    setTime(0);
    setPressed(new Set());
    setHolding(new Set());
  }, []);

  // 타이머
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTime((t) => (t >= 999 ? 999 : t + 1));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const minesLeft = mines - countFlags(board);

  // 마우스/터치 다운 시점에 눌림 효과가 보이도록 할 셀 집합 계산
  const pressSetFor = useCallback(
    (r: number, c: number): Set<string> => {
      const cell = board[r][c];
      if (cell.revealed && cell.adjacent > 0) {
        const neighbors = getNeighbors(rows, cols, r, c);
        const flaggedCount = neighbors.filter(
          ([nr, nc]) => board[nr][nc].flagged,
        ).length;
        // 깃발이 숫자만큼 다 찼으면 누름 효과 없이 바로 벗겨짐
        if (flaggedCount === cell.adjacent) return new Set();
        // 깃발(폭탄 설정) 타일은 누름 효과에서 제외
        const pressNeighbors = neighbors.filter(
          ([nr, nc]) => !board[nr][nc].flagged,
        );
        return new Set(pressNeighbors.map(([nr, nc]) => `${nr},${nc}`));
      }
      return new Set([`${r},${c}`]);
    },
    [board, rows, cols],
  );

  const startHold = useCallback(
    (r: number, c: number) => {
      if (gameState === "won" || gameState === "lost") return;
      pressOrigin.current = { r, c };
      setHolding(pressSetFor(r, c));
    },
    [gameState, pressSetFor],
  );

  // 그리드 밖에서 버튼을 떼면 누름 취소 (윈도우 지뢰찾기 동작)
  useEffect(() => {
    const clear = () => {
      setHolding(new Set());
      pressOrigin.current = null;
    };
    window.addEventListener("mouseup", clear);
    window.addEventListener("touchend", clear);
    return () => {
      window.removeEventListener("mouseup", clear);
      window.removeEventListener("touchend", clear);
    };
  }, []);

  // 누름 해제와 액션(열기/코드)을 같은 핸들러에서 처리해 중간 프레임 없이 즉시 반영
  const release = (r: number, c: number) => {
    const origin = pressOrigin.current;
    setHolding(new Set());
    pressOrigin.current = null;
    if (origin && origin.r === r && origin.c === c) {
      suppressClick.current = true;
      handleReveal(r, c);
    }
  };

  // 숫자 위 코드(chord): 주변 깃발 수가 숫자와 같으면 나머지 타일 열기
  const chord = useCallback(
    (r: number, c: number) => {
      const center = board[r][c];
      const neighbors = getNeighbors(rows, cols, r, c);
      const flaggedCount = neighbors.filter(
        ([nr, nc]) => board[nr][nc].flagged,
      ).length;

      if (flaggedCount === center.adjacent) {
        // 조건 충족: 깃발 아닌 이웃 타일 열기 (지뢰 밟으면 패배)
        setBoard((prev) => {
          const next = prev.map((row) => row.map((cell) => ({ ...cell })));
          let hitMine = false;
          for (const [nr, nc] of neighbors) {
            const cell = next[nr][nc];
            if (cell.flagged || cell.revealed) continue;
            if (cell.mine) {
              cell.revealed = true;
              cell.exploded = true;
              hitMine = true;
              continue;
            }
            revealRecursive(next, rows, cols, nr, nc);
          }
          if (hitMine) {
            for (const row of next) {
              for (const cell of row) {
                if (cell.mine) cell.revealed = true;
                if (cell.flagged && !cell.mine) cell.wrong = true;
              }
            }
            setGameState("lost");
            return next;
          }
          if (checkWin(next, rows, cols, mines)) {
            for (const row of next) {
              for (const cell of row) {
                if (cell.mine) cell.flagged = true;
              }
            }
            setGameState("won");
          }
          return next;
        });
      } else {
        // 조건 미충족: 주변 8칸만 눌리는 애니메이션, 실제로는 열리지 않음
        // (깃발(폭탄 설정) 타일은 제외)
        const pressNeighbors = neighbors.filter(
          ([nr, nc]) => !board[nr][nc].flagged,
        );
        setPressed(new Set(pressNeighbors.map(([nr, nc]) => `${nr},${nc}`)));
        window.setTimeout(() => setPressed(new Set()), 150);
      }
    },
    [board, rows, cols, mines],
  );

  const handleReveal = useCallback(
    (r: number, c: number) => {
      if (gameState === "won" || gameState === "lost") return;
      const current = board[r][c];
      if (current.flagged) return;

      // 이미 열린 숫자 칸 → 코드 동작
      if (current.revealed) {
        if (current.adjacent > 0) chord(r, c);
        return;
      }

      setBoard((prev) => {
        let next: MineCell[][];
        if (gameState === "ready") {
          next = placeMines(prev, rows, cols, mines, r, c);
          setGameState("playing");
        } else {
          next = prev.map((row) => row.map((cell) => ({ ...cell })));
        }

        const target = next[r][c];
        if (target.mine) {
          for (const row of next) {
            for (const cell of row) {
              if (cell.mine) cell.revealed = true;
              if (cell.flagged && !cell.mine) cell.wrong = true;
            }
          }
          target.exploded = true;
          setGameState("lost");
          return next;
        }

        revealRecursive(next, rows, cols, r, c);

        if (checkWin(next, rows, cols, mines)) {
          for (const row of next) {
            for (const cell of row) {
              if (cell.mine) cell.flagged = true;
            }
          }
          setGameState("won");
        }
        return next;
      });
    },
    [board, gameState, chord, rows, cols, mines],
  );

  const handleFlag = useCallback(
    (r: number, c: number) => {
      if (gameState === "won" || gameState === "lost") return;
      if (gameState === "ready") setGameState("playing");
      setBoard((prev) => {
        const next = prev.map((row) => row.map((cell) => ({ ...cell })));
        const cell = next[r][c];
        if (cell.revealed) return next;
        cell.flagged = !cell.flagged;
        return next;
      });
    },
    [gameState],
  );

  const reset = useCallback(() => {
    setBoard(createEmptyBoard(rows, cols));
    setGameState("ready");
    setTime(0);
    setPressed(new Set());
    setHolding(new Set());
  }, [rows, cols]);

  const renderCellContent = (cell: MineCell) => {
    if (cell.revealed) {
      if (cell.mine) {
        return (
          <MineMark>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              style={{ display: "block" }}
            >
              <g stroke="#111111" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="12" y1="3" x2="12" y2="21" />
                <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
                <line x1="5.6" y1="18.4" x2="18.4" y2="5.6" />
              </g>
              <circle cx="12" cy="12" r="5" fill="#111111" />
              <circle cx="9.8" cy="9.8" r="1.6" fill="#ffffff" />
            </svg>
            {cell.wrong && <WrongX />}
          </MineMark>
        );
      }
      return cell.adjacent > 0 ? cell.adjacent : "";
    }
    if (cell.flagged)
      return (
        <FlagMark>
          <FlagBase />
        </FlagMark>
      );
    return "";
  };

  return (
    <Container>
      <Heading>지뢰찾기 — MINESWEEPER</Heading>

      <DifficultyRow>
        {(Object.keys(LEVELS) as Difficulty[]).map((key) => (
          <DiffButton
            key={key}
            $active={difficulty === key}
            onClick={() => changeDifficulty(key)}
          >
            {LEVELS[key].label}
          </DiffButton>
        ))}
      </DifficultyRow>

      <Panel>
        <Hud>
          <Counter>
            <LedDisplay
              value={
                minesLeft >= 0
                  ? String(minesLeft).padStart(3, "0")
                  : "-" + String(Math.min(99, -minesLeft)).padStart(2, "0")
              }
            />
          </Counter>
          <FaceButton $state={gameState} onClick={reset} title="새 게임">
            <FaceGraphic $state={gameState}>
              <span className="eye left" />
              <span className="eye right" />
              <span className="mouth" />
            </FaceGraphic>
          </FaceButton>
          <Counter>
            <LedDisplay value={String(Math.min(999, time)).padStart(3, "0")} />
          </Counter>
        </Hud>

        <Field $cols={cols}>
          {board.map((row, r) =>
            row.map((cell, c) => {
              const key = `${r},${c}`;
              const isPressed = pressed.has(key) || holding.has(key);
              return (
                <Cell
                  key={key}
                  $revealed={cell.revealed}
                  $n={cell.adjacent}
                  $mine={cell.mine}
                  $lost={gameState === "lost"}
                  $pressed={isPressed}
                  onMouseDown={(e) => {
                    if (e.button === 0) startHold(r, c);
                  }}
                  onMouseUp={() => release(r, c)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startHold(r, c);
                  }}
                  onTouchEnd={() => release(r, c)}
                  onClick={() => {
                    if (suppressClick.current) {
                      suppressClick.current = false;
                      return;
                    }
                    handleReveal(r, c);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleFlag(r, c);
                  }}
                >
                  {renderCellContent(cell)}
                </Cell>
              );
            }),
          )}
        </Field>
      </Panel>

      <Status>
        {gameState === "won" && "🎉 클리어!"}
        {gameState === "lost" && "💥 게임 오버"}
        {gameState === "ready" && "좌클릭으로 시작 · 첫 클릭은 항상 안전"}
        {gameState === "playing" && "진행 중…"}
      </Status>
      <Hint>좌클릭: 열기 · 우클릭: 깃발 · 숫자 클릭: 주변 자동 열기</Hint>
    </Container>
  );
}
