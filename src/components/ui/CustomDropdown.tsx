import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, LucideIcon } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  badge?: string;
}

export interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: (DropdownOption | string)[];
  placeholder?: string;
  icon?: LucideIcon;
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  name?: string;
  id?: string;
  'aria-label'?: string;
  rounded?: string;
}

export function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = 'Select Option',
  icon: Icon,
  error,
  disabled = false,
  className = '',
  triggerClassName = '',
  menuClassName = '',
  name,
  id,
  'aria-label': ariaLabel,
  rounded = 'rounded-xl',
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);

  // Normalize options to DropdownOption objects
  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : '';

  // Center selected option in the scrollable menu when opened
  useEffect(() => {
    if (isOpen && menuListRef.current) {
      const selectedEl = menuListRef.current.querySelector<HTMLElement>('[data-selected="true"]');
      if (selectedEl) {
        const container = menuListRef.current;
        const targetScrollTop = selectedEl.offsetTop - (container.clientHeight / 2) + (selectedEl.clientHeight / 2);
        container.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth'
        });
      }
    }
  }, [isOpen, value]);

  // Determine opening direction based on viewport space
  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // If space below is less than 260px and there's more space above, open upward
      if (spaceBelow < 260 && spaceAbove > spaceBelow) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
    setIsOpen((prev) => !prev);
  };

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const hasError = Boolean(error);

  return (
    <div
      ref={dropdownRef}
      className={`relative w-full ${isOpen ? 'z-50' : 'z-10'} ${className}`}
      data-csl-dropdown
    >
      {/* Hidden input for standard form submission compatibility */}
      {name && <input type="hidden" name={name} value={value} id={id} />}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
        className={`relative w-full flex items-center text-left bg-white/90 backdrop-blur-md border ${
          hasError
            ? 'border-red-400 focus:ring-1 focus:ring-red-400'
            : isOpen
            ? 'border-csl-blue ring-1 ring-csl-blue/20'
            : 'border-csl-gold/30 hover:border-csl-gold/60'
        } ${rounded} py-3.5 ${
          Icon ? 'pl-11' : 'pl-4'
        } pr-11 text-xs md:text-sm font-medium text-csl-text shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${triggerClassName}`}
      >
        {/* Leading Icon */}
        {Icon && (
          <Icon
            className={`w-4 h-4 absolute left-4 transition-colors duration-200 ${
              isOpen ? 'text-csl-blue' : 'text-csl-muted'
            }`}
          />
        )}

        {/* Selected Label or Placeholder */}
        <span
          className={`truncate block select-none ${
            value ? 'text-csl-text font-medium' : 'text-csl-muted/80'
          }`}
        >
          {displayLabel || placeholder}
        </span>

        {/* Dropdown Chevron */}
        <ChevronDown
          className={`w-4 h-4 absolute right-4 text-csl-blue transition-transform duration-300 pointer-events-none ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: openUpward ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: openUpward ? -4 : 4, scale: 1 }}
            exit={{ opacity: 0, y: openUpward ? 6 : -6, scale: 0.98 }}
            transition={{
              duration: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`absolute z-50 left-0 right-0 ${
              openUpward ? 'bottom-full mb-1' : 'top-full mt-1'
            } overflow-hidden rounded-xl border border-white/70 bg-white/95 backdrop-blur-xl shadow-[0_15px_40px_rgba(20,85,184,0.14)] ${menuClassName}`}
          >
            {/* Subtle CSL Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-csl-blue/5 via-transparent to-csl-gold/10 pointer-events-none" />

            <div ref={menuListRef} className="relative p-1.5 max-h-64 overflow-y-auto scrollbar-thin">
              {normalizedOptions.map((option) => {
                const isSelected = value === option.value;

                return (
                  <motion.button
                    key={option.value}
                    type="button"
                    data-selected={isSelected}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between rounded-lg px-4 py-2.5 text-xs md:text-sm font-medium text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-csl-blue text-white shadow-xs'
                        : 'text-csl-text hover:bg-csl-gold/10 hover:text-csl-deep-blue'
                    }`}
                  >
                    <span className="truncate pr-3 select-none">
                      {option.label}
                    </span>

                    {isSelected && (
                      <Check className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
