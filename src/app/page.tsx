"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import PartyEffects from "@/components/PartyEffects";
import CandyBox from "@/components/CandyBox";
import Toast from "@/components/Toast";
import { useBiteSound } from "@/components/Sound";
import SocialFollow from "@/components/SocialFollow";

const TOTAL_CANDIES = 25;
const STORAGE_KEY = "bogdan_bday_candies_v1";

export default function Home() {
  const [candies, setCandies] = useState<boolean[]>(() =>
    Array.from({ length: TOTAL_CANDIES }, () => false)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [celebrateSignal, setCelebrateSignal] = useState(0);
  const [eatAllSignal, setEatAllSignal] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const timeoutsRef = useRef<number[]>([]);
  const prevAllEatenRef = useRef(false);

  const { play, muted, toggleMute, unlock } = useBiteSound();

  const eatenCount = useMemo(
    () => candies.filter(Boolean).length,
    [candies]
  );
  const allEaten = eatenCount === TOTAL_CANDIES;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === TOTAL_CANDIES) {
          setCandies(parsed.map((value) => Boolean(value)));
        }
      } catch {
        // ignore malformed storage
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candies));
  }, [candies, hydrated]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (allEaten && !prevAllEatenRef.current) {
      setCelebrateSignal((value) => value + 1);
      setToastMessage("Окей, изяде ги всичките 😄");
    }
    prevAllEatenRef.current = allEaten;
  }, [allEaten]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(window.clearTimeout);
    };
  }, []);

  const clearEatTimeouts = () => {
    timeoutsRef.current.forEach(window.clearTimeout);
    timeoutsRef.current = [];
  };

  const eatCandy = (index: number) => {
    unlock();
    if (candies[index]) return;

    setCandies((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
    play();
  };

  const handleReset = () => {
    clearEatTimeouts();
    setCandies(Array.from({ length: TOTAL_CANDIES }, () => false));
    localStorage.removeItem(STORAGE_KEY);
    setToastMessage("Нулирано.");
  };

  const handleEatAll = () => {
    unlock();
    setIsOpen(true);
    clearEatTimeouts();

    const delay = 70;
    const pending = candies
      .map((isEaten, index) => ({ isEaten, index }))
      .filter(({ isEaten }) => !isEaten);

    pending.forEach(({ index }, step) => {
      const timeout = window.setTimeout(() => {
        setCandies((prev) => {
          if (prev[index]) return prev;
          const next = [...prev];
          next[index] = true;
          return next;
        });
        play();
      }, step * delay);
      timeoutsRef.current.push(timeout);
    });

    const timeout = window.setTimeout(() => {
      setEatAllSignal((value) => value + 1);
    }, pending.length > 0 ? pending.length * delay + 160 : 0);
    timeoutsRef.current.push(timeout);
  };

  const handleShare = async () => {
    unlock();
    const url = window.location.href;
    const shareData = {
      title: "Party Night — Bogdan Lozanov",
      text: "Вземи си бонбон!",
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setToastMessage("Споделено!");
        return;
      } catch {
        // fall back to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setToastMessage("Линкът е копиран.");
    } catch {
      setToastMessage("Копирай линка ръчно.");
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !muted;
    toggleMute();
    setToastMessage(nextMuted ? "Звукът е изключен." : "Звукът е включен.");
  };

  return (
    <PageWrap>
      <Background aria-hidden="true">
        <StageGlow />
        <Aurora />
        <Spotlight
          style={
            {
              "--beam-color": "rgba(125, 249, 255, 0.55)",
              animationDuration: "12s",
              animationDelay: "-2s",
            } as CSSProperties
          }
        />
        <Spotlight
          style={
            {
              "--beam-color": "rgba(255, 79, 216, 0.5)",
              animationDuration: "10s",
              animationDelay: "-5s",
            } as CSSProperties
          }
        />
        <Spotlight
          style={
            {
              "--beam-color": "rgba(184, 75, 255, 0.5)",
              animationDuration: "14s",
              animationDelay: "-8s",
            } as CSSProperties
          }
        />
        <Spotlight
          style={
            {
              "--beam-color": "rgba(244, 201, 93, 0.45)",
              animationDuration: "11s",
              animationDelay: "-4s",
            } as CSSProperties
          }
        />
        <Spotlight
          style={
            {
              "--beam-color": "rgba(125, 249, 255, 0.35)",
              animationDuration: "9s",
              animationDelay: "-6s",
            } as CSSProperties
          }
        />
        <Haze />
        <LightBlob
          style={{
            top: "6%",
            left: "6%",
            width: 280,
            height: 280,
            background: "rgba(125, 249, 255, 0.18)",
            animationDelay: "0s",
          }}
        />
        <LightBlob
          style={{
            top: "12%",
            right: "8%",
            width: 340,
            height: 340,
            background: "rgba(255, 79, 216, 0.2)",
            animationDelay: "-4s",
          }}
        />
        <LightBlob
          style={{
            bottom: "10%",
            left: "14%",
            width: 300,
            height: 300,
            background: "rgba(184, 75, 255, 0.18)",
            animationDelay: "-9s",
          }}
        />
        <LightBlob
          style={{
            bottom: "4%",
            right: "10%",
            width: 240,
            height: 240,
            background: "rgba(244, 201, 93, 0.2)",
            animationDelay: "-12s",
          }}
        />
      </Background>
      <PartyEffects
        celebrateSignal={celebrateSignal}
        eatAllSignal={eatAllSignal}
      />
      <MainCard
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Header>
          <Eyebrow>Party Night</Eyebrow>
          <Title>Честит рожден ден на Богдан Лозанов 🎉</Title>
          <Subtitle>
            Да, това е мини сайт за рождения ми ден. Да, направен е за кеф.
          </Subtitle>
          <Subtitle>
            И да, целта е проста: почерпи се с шоколадови бонбони.
          </Subtitle>
        </Header>

        <SocialFollow />

        <StatsRow>
          <CounterBadge>Изядени: {eatenCount} / 25</CounterBadge>
          <HintText>
            Кликни бонбон, за да го „изядеш“.
          </HintText>
        </StatsRow>

        <ControlsRow>
          <PrimaryButton
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              unlock();
              setIsOpen((prev) => !prev);
            }}
          >
            {isOpen ? "Затвори капака" : "Отвори капака"}
          </PrimaryButton>
          <GhostButton
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEatAll}
          >
            Изяж всички
          </GhostButton>
          <GhostButton
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
          >
            Нулирай
          </GhostButton>
          <GhostButton
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
          >
            Сподели
          </GhostButton>
          <IconButton
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleMute}
            aria-label={muted ? "Включи звук" : "Изключи звук"}
            title={muted ? "Включи звук" : "Изключи звук"}
          >
            <SoundIcon muted={muted} />
          </IconButton>
        </ControlsRow>

        <CandyArea aria-label="Кутия с бонбони">
          <CandyBox
            candies={candies}
            onCandyClick={eatCandy}
            isOpen={isOpen}
            onToggleOpen={() => setIsOpen((prev) => !prev)}
          />
        </CandyArea>

        {allEaten ? (
          <AllEatenMessage>
            Окей, изяде ги всичките 😄 Благодаря, че се отби! 🎂
          </AllEatenMessage>
        ) : null}

        <FooterInfo>
          <InfoGrid>
            <InfoCard>
              <InfoTitle>Защо го има това?</InfoTitle>
              <InfoText>
                Защото мога. И защото е забавно да експериментираш с Next.js +
                анимации.
              </InfoText>
              <InfoText>Малък side-project, направен просто за кеф.</InfoText>
            </InfoCard>
            <InfoCard>
              <InfoTitle>Кой стои зад това?</InfoTitle>
              <InfoText>
                Аз съм Богдан — софтуерен инженер, който обича да си играе с AI и
                фронтенд експерименти.
              </InfoText>
              <InfoText>Почерпи се и ако ти харесва — сподели.</InfoText>
            </InfoCard>
          </InfoGrid>
        </FooterInfo>
      </MainCard>
      <Toast message={toastMessage} />
    </PageWrap>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      {muted ? (
        <>
          <line x1="16" y1="8" x2="22" y2="16" />
          <line x1="22" y1="8" x2="16" y2="16" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5C17 10 17 14 15.5 15.5" />
          <path d="M18.5 5.5C21 8 21 16 18.5 18.5" />
        </>
      )}
    </svg>
  );
}

const float = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(14px, -18px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const drift = keyframes`
  0% {
    transform: translate3d(-4%, -2%, 0);
  }
  50% {
    transform: translate3d(3%, 2%, 0);
  }
  100% {
    transform: translate3d(-4%, -2%, 0);
  }
`;

const sweep = keyframes`
  0% {
    transform: translateX(-12%) rotate(-10deg);
    opacity: 0.35;
  }
  50% {
    transform: translateX(8%) rotate(14deg);
    opacity: 0.7;
  }
  100% {
    transform: translateX(-12%) rotate(-10deg);
    opacity: 0.35;
  }
`;

const PageWrap = styled.main`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px 64px;
  overflow: hidden;
  isolation: isolate;
`;

const Background = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  background: radial-gradient(
      1200px 700px at 10% 10%,
      rgba(125, 249, 255, 0.12),
      transparent 65%
    ),
    radial-gradient(
      900px 700px at 90% 16%,
      rgba(255, 79, 216, 0.18),
      transparent 60%
    ),
    radial-gradient(
      900px 800px at 50% 100%,
      rgba(184, 75, 255, 0.18),
      transparent 65%
    ),
    linear-gradient(180deg, #05060d 0%, #04040c 45%, #070615 100%);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -10%;
    background: radial-gradient(
        circle at 20% 20%,
        rgba(255, 255, 255, 0.06),
        transparent 40%
      ),
      radial-gradient(
        circle at 80% 30%,
        rgba(255, 255, 255, 0.04),
        transparent 45%
      );
    opacity: 0.5;
    animation: ${drift} 28s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -20%;
    background: linear-gradient(
      130deg,
      rgba(10, 16, 30, 0.65),
      rgba(6, 10, 22, 0.7)
    );
    filter: blur(80px);
    opacity: 0.5;
    animation: ${float} 20s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
    }
  }
`;

const Aurora = styled.div`
  position: absolute;
  inset: -30%;
  background: conic-gradient(
    from 120deg,
    rgba(125, 249, 255, 0.18),
    rgba(184, 75, 255, 0.18),
    rgba(255, 79, 216, 0.12),
    rgba(244, 201, 93, 0.1),
    rgba(125, 249, 255, 0.18)
  );
  filter: blur(120px);
  opacity: 0.25;
  animation: ${spin} 40s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const StageGlow = styled.div`
  position: absolute;
  inset: auto -20% -40% -20%;
  height: 70%;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(244, 201, 93, 0.18),
    transparent 60%
  );
  opacity: 0.6;
  filter: blur(40px);
`;

const Spotlight = styled.div`
  position: absolute;
  inset: -40% -30% 0 -30%;
  background: conic-gradient(
    from 180deg at 50% 0%,
    transparent 0deg,
    var(--beam-color, rgba(125, 249, 255, 0.4)) 18deg,
    transparent 42deg
  );
  mix-blend-mode: screen;
  filter: blur(18px);
  opacity: 0.65;
  transform-origin: 50% 0%;
  animation: ${sweep} 12s ease-in-out infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.3;
  }
`;

const Haze = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.06),
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 20%,
      rgba(255, 255, 255, 0.04),
      transparent 45%
    );
  opacity: 0.35;
  mix-blend-mode: screen;
  filter: blur(22px);
  animation: ${drift} 32s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const LightBlob = styled.div`
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  animation: ${float} 18s ease-in-out infinite;
  opacity: 0.7;
  filter: blur(6px);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const MainCard = styled(motion.section)`
  position: relative;
  z-index: 2;
  width: min(100%, 1200px);
  background: linear-gradient(
    160deg,
    rgba(14, 18, 34, 0.82),
    rgba(7, 9, 20, 0.92)
  );
  border-radius: 28px;
  padding: clamp(24px, 4vw, 40px);
  border: 1px solid var(--card-border);
  box-shadow: 0 0 0 1px rgba(125, 249, 255, 0.06),
    0 30px 80px rgba(0, 0, 0, 0.45),
    0 0 60px rgba(125, 249, 255, 0.08);
  backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Eyebrow = styled.span`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.32em;
  color: rgba(125, 249, 255, 0.75);
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.1;
  background: linear-gradient(90deg, #fef1ff, #7df9ff, #f4c95d);
  -webkit-background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(248, 246, 255, 0.82);
`;

const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`;

const CounterBadge = styled.div`
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(125, 249, 255, 0.12);
  border: 1px solid rgba(125, 249, 255, 0.4);
  font-weight: 600;
  color: #e7fbff;
`;

const HintText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: rgba(248, 246, 255, 0.7);
  text-align: right;

  @media (max-width: 640px) {
    text-align: left;
  }
`;

const FooterInfo = styled.div`
  margin-top: 4px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const InfoCard = styled.div`
  padding: 16px 18px;
  border-radius: 20px;
  background: rgba(9, 12, 22, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: rgba(125, 249, 255, 0.85);
`;

const InfoText = styled.p`
  margin: 0;
  color: rgba(248, 246, 255, 0.78);
  font-size: 0.95rem;
`;

const ControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

const PrimaryButton = styled(motion.button)`
  flex: 1 1 200px;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid rgba(125, 249, 255, 0.6);
  background: linear-gradient(
    135deg,
    rgba(125, 249, 255, 0.2),
    rgba(184, 75, 255, 0.2)
  );
  color: #fdfbff;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(125, 249, 255, 0.15);
`;

const GhostButton = styled(motion.button)`
  flex: 1 1 140px;
  padding: 12px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(10, 14, 24, 0.55);
  color: #e6e2ff;
  font-weight: 500;
  cursor: pointer;
`;

const IconButton = styled(motion.button)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(10, 14, 24, 0.55);
  color: #f3f0ff;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const CandyArea = styled.div`
  padding: 16px;
  border-radius: 24px;
  background: rgba(6, 8, 18, 0.6);
  border: 1px solid rgba(125, 249, 255, 0.15);
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.35);
`;

const AllEatenMessage = styled.div`
  padding: 16px 20px;
  border-radius: 18px;
  background: rgba(244, 201, 93, 0.12);
  border: 1px solid rgba(244, 201, 93, 0.5);
  color: #f4c95d;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 12px 28px rgba(244, 201, 93, 0.2);
`;
