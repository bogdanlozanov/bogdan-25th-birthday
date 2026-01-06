"use client";

import { AnimatePresence, motion } from "framer-motion";
import styled, { css } from "styled-components";
import CandyPiece, { CandyShape, CandyTone } from "./CandyPiece";

type CandyBoxProps = {
  candies: boolean[];
  onCandyClick: (index: number) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
};

const shapes: CandyShape[] = ["circle", "square", "diamond", "heart"];

const tones: CandyTone[] = [
  {
    base: "#56301b",
    highlight: "#7a4628",
    shadow: "#2e160b",
    sheen: "#a3704a",
  },
  {
    base: "#4c2a17",
    highlight: "#6b3a22",
    shadow: "#29120a",
    sheen: "#8f5e3d",
  },
  {
    base: "#5d321a",
    highlight: "#814725",
    shadow: "#31170b",
    sheen: "#b07a4f",
  },
  {
    base: "#473321",
    highlight: "#6c4a2f",
    shadow: "#28160c",
    sheen: "#956b46",
  },
];

export default function CandyBox({
  candies,
  onCandyClick,
  isOpen,
  onToggleOpen,
}: CandyBoxProps) {
  return (
    <BoxScene>
      <BoxWrapper>
        <LidButton
          type="button"
          aria-pressed={isOpen}
          aria-label={isOpen ? "Затвори капака" : "Отвори капака"}
          onClick={onToggleOpen}
          animate={{
            rotateX: isOpen ? -105 : 0,
            translateY: isOpen ? -6 : 0,
          }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
        >
          <LidBadge>25</LidBadge>
          <LidShine />
        </LidButton>

        <BoxBase>
          <BoxInner>
            <CandyGrid role="grid" aria-label="Кутия с бонбони">
              {candies.map((eaten, index) => {
                const shape = shapes[index % shapes.length];
                const tone = tones[index % tones.length];
                return (
                  <CandySlot
                    key={index}
                    type="button"
                    $eaten={eaten}
                    aria-pressed={eaten}
                    aria-label={
                      eaten
                        ? `Опаковка от бонбон ${index + 1}`
                        : `Бонбон ${index + 1}`
                    }
                    onClick={() => onCandyClick(index)}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {eaten ? (
                        <Wrapper
                          as={motion.div}
                          key="wrapper"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      ) : (
                        <CandyMotion
                          key="candy"
                          initial={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.1, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        >
                          <CandyPiece shape={shape} tone={tone} />
                        </CandyMotion>
                      )}
                    </AnimatePresence>
                  </CandySlot>
                );
              })}
            </CandyGrid>
          </BoxInner>
        </BoxBase>
      </BoxWrapper>
    </BoxScene>
  );
}

const BoxScene = styled.div`
  width: min(100%, 420px);
  margin: 0 auto;
  padding-top: 12px;
  padding-bottom: 12px;
  perspective: 1200px;
  transform-style: preserve-3d;
`;

const BoxWrapper = styled.div`
  position: relative;
  transform-style: preserve-3d;
  width: 100%;
  --lid-height: calc(100% + 6px);
  --lid-overlap: var(--lid-height);
`;

const LidButton = styled(motion.button)`
  position: absolute;
  inset: 0 0 auto 0;
  width: 100%;
  height: var(--lid-height);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: linear-gradient(
    140deg,
    rgba(98, 38, 132, 0.95),
    rgba(28, 14, 44, 0.98)
  );
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.45);
  transform-origin: 50% 0%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  box-sizing: border-box;
  will-change: transform;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: clamp(14px, 3vw, 22px);
  color: #fef6ff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.7rem;
  z-index: 2;
`;

const LidBadge = styled.span`
  background: rgba(255, 200, 90, 0.18);
  border: 1px solid rgba(255, 200, 90, 0.6);
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 600;
  color: #f4c95d;
  text-shadow: 0 0 8px rgba(244, 201, 93, 0.6);
  backface-visibility: hidden;
`;

const LidShine = styled.span`
  position: absolute;
  inset: 8px;
  border-radius: 14px;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.2), transparent 60%);
  pointer-events: none;
  backface-visibility: hidden;
`;

const BoxBase = styled.div`
  position: relative;
  margin-top: calc(var(--lid-height) - var(--lid-overlap));
  padding: 22px 18px 24px;
  border-radius: 22px;
  background: linear-gradient(
    180deg,
    rgba(40, 18, 52, 0.98) 0%,
    rgba(18, 10, 30, 0.98) 55%,
    rgba(10, 8, 20, 0.98) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 30px 70px rgba(0, 0, 0, 0.55);
  overflow: visible;
  backface-visibility: hidden;
  transform-style: preserve-3d;

  &::before {
    content: "";
    position: absolute;
    inset: 10px;
    border-radius: 16px;
    background: radial-gradient(
      circle at 20% 20%,
      rgba(125, 249, 255, 0.12),
      transparent 45%
    );
    opacity: 0.6;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: -6px;
    height: 6px;
    border-radius: 0 0 14px 14px;
    background: rgba(6, 4, 14, 0.9);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.35);
  }
`;

const BoxInner = styled.div`
  position: relative;
  z-index: 1;
`;

const CandyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const CandySlot = styled.button<{ $eaten: boolean }>`
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 6px;
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  position: relative;
  cursor: pointer;
  transition: border 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(125, 249, 255, 0.4);
  }

  &:focus-visible {
    outline: 2px solid rgba(125, 249, 255, 0.8);
    outline-offset: 2px;
  }

  ${({ $eaten }) =>
    $eaten &&
    css`
      background: rgba(255, 255, 255, 0.03);
      border-color: rgba(255, 255, 255, 0.08);
    `}
`;

const CandyMotion = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    145deg,
    rgba(210, 210, 210, 0.9),
    rgba(130, 130, 130, 0.6)
  );
  clip-path: polygon(
    6% 0%,
    92% 4%,
    100% 30%,
    92% 56%,
    100% 84%,
    70% 100%,
    40% 92%,
    12% 100%,
    0% 70%,
    6% 30%
  );
  position: relative;
  box-shadow: inset 0 1px 6px rgba(255, 255, 255, 0.4),
    0 10px 18px rgba(0, 0, 0, 0.35);
  transform: rotate(-4deg);

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 18% 22%;
    border-radius: 999px;
    border: 1px dashed rgba(255, 255, 255, 0.45);
    opacity: 0.6;
  }

  &::after {
    inset: 30% 34%;
    opacity: 0.4;
  }
`;
