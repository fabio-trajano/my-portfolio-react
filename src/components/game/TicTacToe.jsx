import React, { useState } from "react";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const getWinner = (b) => {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { player: b[a], line: [a, c, d] };
  }
  if (b.every(Boolean)) return { player: "draw", line: [] };
  return null;
};

// Minimax — AI plays "O" and is unbeatable.
const minimax = (b, isMax) => {
  const result = getWinner(b);
  if (result) {
    if (result.player === "O") return 1;
    if (result.player === "X") return -1;
    return 0;
  }
  let best = isMax ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = isMax ? "O" : "X";
      const score = minimax(b, !isMax);
      b[i] = null;
      best = isMax ? Math.max(best, score) : Math.min(best, score);
    }
  }
  return best;
};

const bestMove = (b) => {
  let move = -1;
  let bestScore = -Infinity;
  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = "O";
      const score = minimax(b, false);
      b[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const result = getWinner(board);

  const play = (i) => {
    if (board[i] || result) return;
    const next = board.slice();
    next[i] = "X";
    if (!getWinner(next)) {
      const m = bestMove(next);
      if (m !== -1) next[m] = "O";
    }
    setBoard(next);
  };

  const reset = () => setBoard(Array(9).fill(null));

  const status =
    result?.player === "X"
      ? "You win! 🎉"
      : result?.player === "O"
      ? "I win 😏 — try again"
      : result?.player === "draw"
      ? "Draw 🤝 — nobody blinks"
      : "Your move — you're ✕";

  return (
    <>
      <p className="ttt-status">{status}</p>

      <div className="ttt-board">
        {board.map((cell, i) => {
          const win = result?.line.includes(i);
          return (
            <button
              key={i}
              className={`ttt-cell${win ? " ttt-cell-win" : ""}`}
              onClick={() => play(i)}
              disabled={!!cell || !!result}
              aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ", empty"}`}
            >
              {cell === "X" ? (
                <span className="ttt-x">✕</span>
              ) : cell === "O" ? (
                <span className="ttt-o">◯</span>
              ) : (
                ""
              )}
            </button>
          );
        })}
      </div>

      <button className="game-btn" onClick={reset}>
        New game
      </button>

      <p className="snake-hint">
        You're ✕ and you move first. Fair warning: the AI plays perfectly, so
        the best you'll get is a draw. 😉
      </p>
    </>
  );
};

export default TicTacToe;
