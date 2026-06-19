import { Button } from '@/components/Button';
import { ReactElement, useEffect } from 'react';

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export const SuccessModal = ({ isOpen, title, message, onClose }: Props): ReactElement | null => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--colors-gray-900)]/40 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-[420px] rounded-2xl bg-white p-8 text-center shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F3FF]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--colors-brand)]">
            <svg width="18" height="18" viewBox="0 0 13 13" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.937 2.90495C11.0999 3.05422 11.1109 3.30725 10.9616 3.4701L5.09493 9.8701C5.0212 9.95052 4.91783 9.99734 4.80875 9.99971C4.69968 10.0021 4.59437 9.9598 4.51722 9.88265L1.85056 7.21598C1.69435 7.05977 1.69435 6.80651 1.85056 6.6503C2.00677 6.49409 2.26003 6.49409 2.41624 6.6503L4.7875 9.02156L10.3719 2.92952C10.5211 2.76667 10.7742 2.75567 10.937 2.90495Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <h2
          id="success-modal-title"
          className="text-[2rem] font-semibold text-[var(--colors-darkBlue)]"
        >
          {title}
        </h2>
        <p className="mt-2 text-[1.4rem] text-[var(--colors-gray-600)]">{message}</p>

        <div className="mt-8">
          <Button type="button" onClick={onClose} className="min-w-[160px]">
            Back to People
          </Button>
        </div>
      </div>
    </div>
  );
};
