"use client";

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

type ToastProps = {
  message: string | null;
};

export default function Toast({ message }: ToastProps) {
  return (
    <ToastWrapper aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {message ? (
          <ToastCard
            key={message}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {message}
          </ToastCard>
        ) : null}
      </AnimatePresence>
    </ToastWrapper>
  );
}

const ToastWrapper = styled.div`
  position: fixed;
  inset: auto 0 24px;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 5;
`;

const ToastCard = styled(motion.div)`
  padding: 12px 18px;
  border-radius: 999px;
  background: rgba(12, 16, 28, 0.9);
  border: 1px solid rgba(125, 249, 255, 0.3);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  color: #f8f6ff;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
`;
