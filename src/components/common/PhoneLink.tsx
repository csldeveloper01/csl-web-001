import React from 'react';
import { Phone } from 'lucide-react';

/**
 * PhoneLink component renders a telephone link with consistent formatting.
 * It expects the raw number in E.164 format (e.g., "+918056052806").
 * The display format will be "+91 80560 52806" (country code, then a space,
 * then two groups of 5 digits separated by a space).
 */
export const PhoneLink: React.FC<{ number: string }> = ({ number }) => {
  // Ensure the number starts with +91 and has 12 digits after country code
  const formatted = React.useMemo(() => {
    const match = number.match(/^\+(\d{2})(\d{5})(\d{5})$/);
    if (match) {
      const [, country, part1, part2] = match;
      return `+${country} ${part1} ${part2}`;
    }
    // Fallback: return the original number
    return number;
  }, [number]);

  return (
    <a
      href={`https://wa.me/${number.replace('+', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 hover:text-csl-blue transition-colors group"
    >
      <Phone className="w-3.5 h-3.5 text-csl-gold group-hover:scale-110 transition-transform" />
      <span>{formatted}</span>
    </a>
  );
};