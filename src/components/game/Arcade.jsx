import React, { useState, useEffect } from "react";
import "./game.css";
import Snake from "./Snake";
import TicTacToe from "./TicTacToe";

const GAMES = [
  { id: "snake", label: "Snake", icon: "🐍", tag: "Don't bite yourself." },
  { id: "ttt", label: "Tic-Tac-Toe", icon: "⭕", tag: "Beat my unbeatable AI." },
];

const Arcade = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("menu"); // menu | snake | ttt

  // Lock page scroll while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc: back to menu from a game, otherwise close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (view !== "menu") setView("menu");
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, view]);

  const close = () => {
    setOpen(false);
    setView("menu");
  };

  const current = GAMES.find((g) => g.id === view);

  return (
    <>
      <button
        className="arcade-launch home__social-icon"
        onClick={() => setOpen(true)}
        title="Psst… fancy a game?"
        aria-label="Open the mini arcade"
      >
        <i className="bx bx-joystick"></i>
      </button>

      {open && (
        <div className="game-overlay" onClick={close}>
          <div className="game-modal" onClick={(e) => e.stopPropagation()}>
            <div className="game-header">
              {view !== "menu" ? (
                <button
                  className="game-icon-btn"
                  onClick={() => setView("menu")}
                  aria-label="Back to menu"
                >
                  <i className="uil uil-arrow-left"></i>
                </button>
              ) : (
                <span className="game-icon-btn game-icon-spacer" />
              )}

              <h3 className="game-title">
                {view === "menu" ? "🕹️ Arcade" : `${current.icon} ${current.label}`}
              </h3>

              <button
                className="game-icon-btn"
                onClick={close}
                aria-label="Close arcade"
              >
                <i className="uil uil-times"></i>
              </button>
            </div>

            {view === "menu" && (
              <div className="arcade-menu">
                {GAMES.map((g) => (
                  <button
                    key={g.id}
                    className="arcade-card"
                    onClick={() => setView(g.id)}
                  >
                    <span className="arcade-card-icon">{g.icon}</span>
                    <span className="arcade-card-label">{g.label}</span>
                    <span className="arcade-card-tag">{g.tag}</span>
                  </button>
                ))}
              </div>
            )}

            {view === "snake" && <Snake />}
            {view === "ttt" && <TicTacToe />}
          </div>
        </div>
      )}
    </>
  );
};

export default Arcade;
