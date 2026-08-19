import React, { useState, useRef, useEffect, useCallback } from "react";

const GRID = 19; // cells per side
const CELL = 20; // px per cell (canvas logical size)
const SIZE = GRID * CELL; // 380

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const KEY_DIRS = {
  ArrowUp: DIRS.up,
  ArrowDown: DIRS.down,
  ArrowLeft: DIRS.left,
  ArrowRight: DIRS.right,
  w: DIRS.up,
  s: DIRS.down,
  a: DIRS.left,
  d: DIRS.right,
};

const randFood = (snake) => {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`));
  let cell;
  do {
    cell = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };
  } while (occupied.has(`${cell.x},${cell.y}`));
  return cell;
};

const Snake = () => {
  const [status, setStatus] = useState("idle"); // idle | playing | over
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(
    () => Number(localStorage.getItem("snake-best")) || 0
  );

  const canvasRef = useRef(null);
  const snakeRef = useRef([]);
  const dirRef = useRef(DIRS.right);
  const queueRef = useRef([]);
  const foodRef = useRef(null);
  const speedRef = useRef(130);
  const scoreRef = useRef(0);
  const touchRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const styles = getComputedStyle(document.body);
    const bg = (styles.getPropertyValue("--container-color") || "#fff").trim();
    const snakeColor = (styles.getPropertyValue("--title-color") || "#111").trim();

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, SIZE, SIZE);

    // grid lines — semi-transparent so they read in both light and dark
    ctx.strokeStyle = "hsla(0, 0%, 50%, 0.18)";
    ctx.lineWidth = 1;
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, SIZE);
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(SIZE, i * CELL);
      ctx.stroke();
    }

    // food
    const f = foodRef.current;
    if (f) {
      ctx.fillStyle = "#e74c3c";
      ctx.beginPath();
      ctx.arc(f.x * CELL + CELL / 2, f.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // snake
    snakeRef.current.forEach((s, i) => {
      ctx.fillStyle = snakeColor;
      ctx.globalAlpha = i === 0 ? 1 : 0.8;
      ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
    });
    ctx.globalAlpha = 1;
  }, []);

  const startGame = useCallback(() => {
    snakeRef.current = [
      { x: 8, y: 9 },
      { x: 7, y: 9 },
      { x: 6, y: 9 },
    ];
    dirRef.current = DIRS.right;
    queueRef.current = [];
    speedRef.current = 130;
    scoreRef.current = 0;
    foodRef.current = randFood(snakeRef.current);
    setScore(0);
    setStatus("playing");
  }, []);

  // Game loop — runs only while playing.
  useEffect(() => {
    if (status !== "playing") return;
    let interval;

    const endGame = () => {
      clearInterval(interval);
      const sc = scoreRef.current;
      setBest((b) => {
        const nb = Math.max(b, sc);
        localStorage.setItem("snake-best", String(nb));
        return nb;
      });
      setStatus("over");
    };

    const reschedule = () => {
      clearInterval(interval);
      interval = setInterval(step, speedRef.current);
    };

    const step = () => {
      if (queueRef.current.length) {
        const next = queueRef.current.shift();
        if (next.x !== -dirRef.current.x || next.y !== -dirRef.current.y) {
          dirRef.current = next;
        }
      }
      const dir = dirRef.current;
      const head = snakeRef.current[0];
      const nx = head.x + dir.x;
      const ny = head.y + dir.y;

      if (nx < 0 || ny < 0 || nx >= GRID || ny >= GRID) return endGame();
      if (snakeRef.current.some((s) => s.x === nx && s.y === ny)) return endGame();

      const newSnake = [{ x: nx, y: ny }, ...snakeRef.current];
      const ate = foodRef.current && nx === foodRef.current.x && ny === foodRef.current.y;
      if (ate) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        foodRef.current = randFood(newSnake);
        if (speedRef.current > 75) {
          speedRef.current -= 4;
          snakeRef.current = newSnake;
          draw();
          reschedule();
          return;
        }
      } else {
        newSnake.pop();
      }
      snakeRef.current = newSnake;
      draw();
    };

    draw();
    interval = setInterval(step, speedRef.current);
    return () => clearInterval(interval);
  }, [status, draw]);

  // Keyboard controls (active while mounted).
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === " " || e.key === "Enter") && status !== "playing") {
        e.preventDefault();
        startGame();
        return;
      }
      const dir = KEY_DIRS[e.key];
      if (dir) {
        e.preventDefault();
        if (queueRef.current.length < 2) queueRef.current.push(dir);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, startGame]);

  // Draw the idle preview board on mount.
  useEffect(() => {
    if (status !== "playing") {
      snakeRef.current = [{ x: 9, y: 9 }];
      foodRef.current = { x: 13, y: 9 };
      draw();
    }
  }, [status, draw]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touchRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
    const dir =
      Math.abs(dx) > Math.abs(dy)
        ? dx > 0
          ? DIRS.right
          : DIRS.left
        : dy > 0
        ? DIRS.down
        : DIRS.up;
    if (status !== "playing") startGame();
    else if (queueRef.current.length < 2) queueRef.current.push(dir);
  };

  return (
    <>
      <div className="snake-scores">
        <span>Score: {score}</span>
        <span>Best: {best}</span>
      </div>

      <div className="snake-board">
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        ></canvas>

        {status !== "playing" && (
          <div className="snake-splash">
            {status === "over" ? (
              <>
                <p className="snake-splash-title">Game over</p>
                <p className="snake-splash-sub">You scored {score}</p>
              </>
            ) : (
              <p className="snake-splash-title">Snake</p>
            )}
            <button className="game-btn" onClick={startGame}>
              {status === "over" ? "Play again" : "Start"}
            </button>
          </div>
        )}
      </div>

      <p className="snake-hint">
        Arrow keys / WASD to move — or swipe on the board. Eat the dots, don't
        bite yourself.
      </p>
    </>
  );
};

export default Snake;
