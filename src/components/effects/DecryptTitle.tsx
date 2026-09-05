import { useState, useEffect } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}';

interface DecryptTextProps {
  text: string;
  isActive: boolean;
  className?: string;
  speed?: number;
}

export function DecryptText({ text, isActive, className = '', speed = 22 }: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const step = Math.max(1, Math.floor(text.length / 14));
    const totalIterations = Math.floor(text.length / step) + 6;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n' || char === '.') return char;
            if (index < iteration * step) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration >= totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, isActive, speed]);

  return <span className={className}>{displayText}</span>;
}

export const DecryptTitle = DecryptText;
