import { MouseEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type MenuItem = {
  label: string;
  onClick: () => void;
};

type Props = {
  items: MenuItem[];
  ariaLabel?: string;
  disabled?: boolean;
};

export const ActionsMenu = ({
  items,
  ariaLabel = 'Open actions menu',
  disabled = false,
}: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;

      if (containerRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }

      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (disabled) return;

    if (isOpen) {
      setIsOpen(false);
      return;
    }

    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const menuWidth = 152;

    setMenuStyle({
      top: rect.bottom + 6,
      left: Math.max(8, rect.right - menuWidth),
    });
    setIsOpen(true);
  };

  const handleItemClick = (event: MouseEvent<HTMLButtonElement>, onClick: () => void) => {
    event.stopPropagation();
    setIsOpen(false);
    onClick();
  };

  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        disabled={disabled}
        onClick={openMenu}
        className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--colors-gray-500)] transition-colors hover:bg-[var(--colors-gray-100)] hover:text-[var(--colors-gray-700)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-brand)]/20 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg width="4" height="16" viewBox="0 0 4 16" aria-hidden="true">
          <circle cx="2" cy="2" r="2" fill="currentColor" />
          <circle cx="2" cy="8" r="2" fill="currentColor" />
          <circle cx="2" cy="14" r="2" fill="currentColor" />
        </svg>
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-50 min-w-[152px] overflow-hidden rounded-lg border border-[var(--colors-gray-200)] bg-white py-1 shadow-lg"
            style={{ top: menuStyle.top, left: menuStyle.left }}
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                onClick={(event) => handleItemClick(event, item.onClick)}
                className="block w-full px-4 py-2.5 text-left text-[1.3rem] text-[var(--colors-gray-700)] transition-colors hover:bg-[var(--colors-gray-50)] focus:bg-[var(--colors-gray-50)] focus:outline-none"
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};
