import React, { useEffect, useRef, useState, useCallback } from "react";
import "./easteregg.css";

const PHOTO_EMOJIS = ["👋", "😄", "✨", "🎉", "😜", "👀", "💛"];
const SHAKE_EMOJIS = ["🤪", "💫", "😵‍💫", "🎲", "🙃", "⭐", "🌀"];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const EasterEggs = () => {
  const [particles, setParticles] = useState([]);
  const [toast, setToast] = useState(null);
  const [bubble, setBubble] = useState(null);
  const idRef = useRef(0);

  // Spawn a short-lived emoji burst centered on (x, y).
  const burst = useCallback((x, y, emojis) => {
    const batch = Array.from({ length: 14 }, () => {
      const id = idRef.current++;
      return {
        id,
        x,
        y,
        emoji: pick(emojis),
        dx: Math.round((Math.random() - 0.5) * 180),
        dy: -40 - Math.round(Math.random() * 110),
        rot: Math.round((Math.random() - 0.5) * 90),
      };
    });
    setParticles((prev) => [...prev, ...batch]);
    const ids = new Set(batch.map((p) => p.id));
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !ids.has(p.id)));
    }, 1100);
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1900);
  }, []);

  // ----- Long-press on the profile photo -----
  useEffect(() => {
    const photo = document.querySelector(".home__img");
    if (!photo) return;

    let timer = null;
    let startX = 0;
    let startY = 0;

    const fire = () => {
      const rect = photo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      burst(cx, cy, PHOTO_EMOJIS);
      setBubble({ x: cx, y: rect.top, text: "Hey! 👋 that tickles" });
      setTimeout(() => setBubble(null), 1700);
      photo.classList.remove("egg-wiggle");
      // reflow so the animation can retrigger on rapid presses
      void photo.offsetWidth;
      photo.classList.add("egg-wiggle");
    };

    const start = (e) => {
      const p = e.touches ? e.touches[0] : e;
      startX = p.clientX;
      startY = p.clientY;
      timer = setTimeout(fire, 500);
    };
    const move = (e) => {
      const p = e.touches ? e.touches[0] : e;
      if (Math.abs(p.clientX - startX) > 12 || Math.abs(p.clientY - startY) > 12) {
        clearTimeout(timer);
      }
    };
    const cancel = () => clearTimeout(timer);

    photo.addEventListener("pointerdown", start);
    photo.addEventListener("pointermove", move);
    photo.addEventListener("pointerup", cancel);
    photo.addEventListener("pointerleave", cancel);
    photo.addEventListener("animationend", () =>
      photo.classList.remove("egg-wiggle")
    );

    return () => {
      clearTimeout(timer);
      photo.removeEventListener("pointerdown", start);
      photo.removeEventListener("pointermove", move);
      photo.removeEventListener("pointerup", cancel);
      photo.removeEventListener("pointerleave", cancel);
    };
  }, [burst]);

  // ----- Shake the phone -----
  useEffect(() => {
    let last = { x: 0, y: 0, z: 0 };
    let lastTime = 0;
    let cooldown = 0;

    const onMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const now = Date.now();
      if (now - lastTime < 90) return;
      lastTime = now;
      const delta =
        Math.abs((acc.x || 0) - last.x) +
        Math.abs((acc.y || 0) - last.y) +
        Math.abs((acc.z || 0) - last.z);
      last = { x: acc.x || 0, y: acc.y || 0, z: acc.z || 0 };
      if (delta > 45 && now - cooldown > 1500) {
        cooldown = now;
        burst(window.innerWidth / 2, window.innerHeight / 2, SHAKE_EMOJIS);
        showToast("Whoa, easy! 🥴");
      }
    };

    let enabled = false;
    const enable = () => {
      if (enabled) return;
      enabled = true;
      window.addEventListener("devicemotion", onMotion);
    };

    const DME = window.DeviceMotionEvent;
    if (DME && typeof DME.requestPermission === "function") {
      // iOS 13+: needs a user gesture to grant motion access.
      const askOnce = () => {
        DME.requestPermission()
          .then((state) => {
            if (state === "granted") enable();
          })
          .catch(() => {});
        window.removeEventListener("touchend", askOnce);
      };
      window.addEventListener("touchend", askOnce, { once: true });
      return () => {
        window.removeEventListener("touchend", askOnce);
        window.removeEventListener("devicemotion", onMotion);
      };
    }

    // Everything else: just listen.
    enable();
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [burst, showToast]);

  return (
    <div className="egg-layer" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="egg-particle"
          style={{
            left: p.x,
            top: p.y,
            "--dx": `${p.dx}px`,
            "--dy": `${p.dy}px`,
            "--rot": `${p.rot}deg`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {bubble && (
        <span className="egg-bubble" style={{ left: bubble.x, top: bubble.y }}>
          {bubble.text}
        </span>
      )}

      {toast && <span className="egg-toast">{toast}</span>}
    </div>
  );
};

export default EasterEggs;
