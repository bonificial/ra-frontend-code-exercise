import SearchIcon from '@/icons/search.svg?react';
import { ChangeEvent, ReactElement } from 'react';

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchField = ({
  value,
  onChange,
  placeholder = 'Search people',
}: SearchFieldProps): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full max-w-[400px]">
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--colors-gray-400)]" />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-full border border-[var(--colors-gray-300)] bg-white py-2.5 pl-11 pr-10 text-[1.4rem] text-[var(--colors-darkBlue)] placeholder:text-[var(--colors-gray-400)] transition-colors duration-150 hover:border-[#7F5AF8] focus:border-[#7F5AF8] focus:outline-none focus:ring-4 focus:ring-[#7F5AF8]/15"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--colors-gray-500)] transition-colors hover:bg-[var(--colors-gray-100)] hover:text-[var(--colors-gray-700)]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
