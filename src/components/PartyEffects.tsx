"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useReducedMotion } from "framer-motion";
import styled from "styled-components";

type PartyEffectsProps = {
  celebrateSignal: number;
  eatAllSignal: number;
};

const COLORS = ["#7df9ff", "#ff4fd8", "#b84bff", "#f4c95d"];

export default function PartyEffects({
  celebrateSignal,
  eatAllSignal,
}: PartyEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiRef = useRef<ReturnType<typeof confetti.create> | null>(null);
  const reducedMotion = useReducedMotion();
  const didInitial = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    confettiRef.current = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    return () => {
      confettiRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!confettiRef.current || didInitial.current) return;
    didInitial.current = true;

    const intensity = reducedMotion ? 0.35 : 1;
    const fire = (options: Record<string, unknown>) => {
      confettiRef.current?.({
        colors: COLORS,
        ...options,
      });
    };

    const timeouts: number[] = [];
    timeouts.push(
      window.setTimeout(() => {
        fire({
          particleCount: Math.floor(70 * intensity),
          spread: 80,
          startVelocity: 24,
          gravity: 1.15,
          origin: { x: 0.3, y: 0.28 },
          ticks: 200,
          scalar: 0.9,
        });
      }, 0)
    );

    timeouts.push(
      window.setTimeout(() => {
        fire({
          particleCount: Math.floor(200 * intensity),
          spread: 140,
          startVelocity: 48,
          gravity: 1.1,
          origin: { x: 0.55, y: 0.2 },
          ticks: 300,
          scalar: 1.1,
        });
      }, 320)
    );

    const trailing = reducedMotion ? 2 : 4;
    for (let i = 0; i < trailing; i += 1) {
      timeouts.push(
        window.setTimeout(() => {
          fire({
            particleCount: Math.floor(50 * intensity),
            spread: 100,
            startVelocity: 32,
            gravity: 1.2,
            origin: {
              x: 0.2 + Math.random() * 0.6,
              y: 0.15 + Math.random() * 0.25,
            },
            ticks: 220,
            scalar: 0.95,
          });
        }, 820 + i * 220)
      );
    }

    return () => {
      timeouts.forEach(window.clearTimeout);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!confettiRef.current || eatAllSignal === 0) return;
    const intensity = reducedMotion ? 0.45 : 0.9;
    confettiRef.current({
      particleCount: Math.floor(140 * intensity),
      spread: 120,
      startVelocity: 42,
      gravity: 1.15,
      colors: COLORS,
      ticks: 240,
      origin: { x: 0.5, y: 0.2 },
    });
  }, [eatAllSignal, reducedMotion]);

  useEffect(() => {
    if (!confettiRef.current || celebrateSignal === 0) return;
    const intensity = reducedMotion ? 0.55 : 1.15;
    confettiRef.current({
      particleCount: Math.floor(260 * intensity),
      spread: 150,
      startVelocity: 55,
      gravity: 1.08,
      colors: COLORS,
      ticks: 320,
      origin: { x: 0.5, y: 0.18 },
    });
  }, [celebrateSignal, reducedMotion]);

  useEffect(() => {
    if (!confettiRef.current) return;
    const interval = window.setInterval(() => {
      if (document.hidden) return;
      const intensity = reducedMotion ? 0.22 : 0.5;
      confettiRef.current?.({
        particleCount: Math.floor(32 * intensity) + 8,
        spread: 80,
        startVelocity: 26,
        gravity: 1.35,
        colors: COLORS,
        ticks: 220,
        origin: {
          x: Math.random() * 0.7 + 0.15,
          y: Math.random() * 0.35 + 0.05,
        },
      });
    }, reducedMotion ? 15000 : 7000);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return <EffectsCanvas ref={canvasRef} aria-hidden="true" />;
}

const EffectsCanvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;
