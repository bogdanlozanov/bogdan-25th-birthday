"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --night: #070913;
    --night-deep: #03040b;
    --neon-cyan: #7df9ff;
    --neon-pink: #ff4fd8;
    --electric-purple: #b84bff;
    --warm-gold: #f4c95d;
    --card: rgba(10, 14, 28, 0.68);
    --card-border: rgba(255, 255, 255, 0.08);
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    min-height: 100%;
  }

  body {
    font-family: var(--font-party), "Space Grotesk", system-ui, -apple-system,
      sans-serif;
    background: var(--night);
    color: #f9f7ff;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  button {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::selection {
    background: rgba(125, 249, 255, 0.35);
  }
`;

export default GlobalStyle;
