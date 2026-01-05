"use client";

import { useId } from "react";
import styled from "styled-components";

export type CandyShape = "circle" | "square" | "diamond" | "heart";

export type CandyTone = {
  base: string;
  highlight: string;
  shadow: string;
  sheen: string;
};

type CandyPieceProps = {
  shape: CandyShape;
  tone: CandyTone;
  className?: string;
};

export default function CandyPiece({ shape, tone, className }: CandyPieceProps) {
  const id = useId().replace(/:/g, "");
  const gradientId = `candy-grad-${id}`;
  const glossId = `candy-gloss-${id}`;

  const shapeElement = (() => {
    switch (shape) {
      case "square":
        return <rect x="18" y="18" width="64" height="64" rx="14" />;
      case "diamond":
        return <polygon points="50 8 92 50 50 92 8 50" />;
      case "heart":
        return (
          <path d="M50 84C26 66 18 52 18 39C18 26 28 18 39 18C45 18 50 21 54 26C58 21 64 18 71 18C82 18 92 26 92 39C92 52 84 66 50 84Z" />
        );
      case "circle":
      default:
        return <circle cx="50" cy="50" r="38" />;
    }
  })();

  return (
    <CandySvg
      className={className}
      viewBox="0 0 100 100"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradientId} cx="30%" cy="20%" r="70%">
          <stop offset="0%" stopColor={tone.highlight} />
          <stop offset="55%" stopColor={tone.base} />
          <stop offset="100%" stopColor={tone.shadow} />
        </radialGradient>
        <linearGradient id={glossId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tone.sheen} stopOpacity="0.65" />
          <stop offset="40%" stopColor={tone.sheen} stopOpacity="0.1" />
          <stop offset="100%" stopColor={tone.sheen} stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId})`}>{shapeElement}</g>
      <path
        d="M24 26C38 18 60 18 76 28C70 30 58 40 44 48C32 54 24 44 24 26Z"
        fill={`url(#${glossId})`}
      />
      <circle cx="36" cy="34" r="7" fill="rgba(255,255,255,0.35)" />
    </CandySvg>
  );
}

const CandySvg = styled.svg`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.45));
`;
