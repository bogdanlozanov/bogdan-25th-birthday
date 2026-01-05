"use client";

import { useCallback, useRef, useState } from "react";

const BITE_DURATION = 0.18;

export function useBiteSound() {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  const ensureContext = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new AudioContext();
    }
    return audioRef.current;
  }, []);

  const unlock = useCallback(() => {
    const ctx = ensureContext();
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
  }, [ensureContext]);

  const play = useCallback(() => {
    if (muted) return;
    const ctx = ensureContext();
    const now = ctx.currentTime;

    if (ctx.state === "suspended") {
      void ctx.resume().then(() => {
        const resumeNow = ctx.currentTime;
        triggerBite(ctx, resumeNow);
      });
      return;
    }

    triggerBite(ctx, now);
  }, [ensureContext, muted]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  return { play, muted, toggleMute, unlock };
}

function triggerBite(ctx: AudioContext, now: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(420, now);
  osc.frequency.exponentialRampToValueAtTime(140, now + BITE_DURATION);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1200, now);
  filter.frequency.exponentialRampToValueAtTime(600, now + BITE_DURATION);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.3, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + BITE_DURATION);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + BITE_DURATION + 0.02);
}
