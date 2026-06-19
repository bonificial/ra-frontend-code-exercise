import { ToastContext } from '@/hooks/useToast';
import {
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export const ToastProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div
          aria-live="polite"
          className="pointer-events-none fixed bottom-8 right-8 z-50 flex flex-col gap-3"
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="pointer-events-auto flex items-center gap-3 rounded-xl border border-[var(--colors-gray-200)] bg-white px-5 py-4 shadow-lg"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--colors-brand)]">
                <svg width="14" height="14" viewBox="0 0 13 13" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.937 2.90495C11.0999 3.05422 11.1109 3.30725 10.9616 3.4701L5.09493 9.8701C5.0212 9.95052 4.91783 9.99734 4.80875 9.99971C4.69968 10.0021 4.59437 9.9598 4.51722 9.88265L1.85056 7.21598C1.69435 7.05977 1.69435 6.80651 1.85056 6.6503C2.00677 6.49409 2.26003 6.49409 2.41624 6.6503L4.7875 9.02156L10.3719 2.92952C10.5211 2.76667 10.7742 2.75567 10.937 2.90495Z"
                    fill="white"
                  />
                </svg>
              </span>
              <p className="text-[1.4rem] font-medium text-[var(--colors-darkBlue)]">
                {toast.message}
              </p>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
