import { ReactElement, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
  isLoading?: boolean;
};

export const Button = ({
  variant = 'primary',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps): ReactElement => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[1.4rem] font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-brand)] focus-visible:ring-offset-2 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-[var(--colors-brand)] text-white hover:bg-[var(--colors-brand-hover)] disabled:bg-[var(--colors-gray-300)] disabled:text-[var(--colors-gray-500)]',
    ghost:
      'border border-[var(--colors-gray-300)] bg-white text-[var(--colors-gray-700)] hover:border-[var(--colors-brand)] hover:text-[var(--colors-brand)] disabled:opacity-40',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${isLoading ? 'bg-[#ebe8fc] text-transparent' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--colors-brand)] border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
};
