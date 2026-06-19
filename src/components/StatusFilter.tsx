import { Person } from '@/types/person';
import { ReactElement } from 'react';

type StatusOption = {
  value: Person['status'];
  label: string;
};

const statusOptions: StatusOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'offboarded', label: 'Offboarding' },
];

type StatusFilterProps = {
  selected: Person['status'][];
  onChange: (statuses: Person['status'][]) => void;
};

const FilterCheck = (): ReactElement => (
  <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
    <path
      d="M1 4.5L4 7.5L10 1"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StatusFilter = ({ selected, onChange }: StatusFilterProps): ReactElement => {
  const toggle = (status: Person['status']) => {
    if (selected.includes(status)) {
      onChange(selected.filter((s) => s !== status));
    } else {
      onChange([...selected, status]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {statusOptions.map(({ value, label }) => {
        const isSelected = selected.includes(value);

        return (
          <button
            key={value}
            type="button"
            onClick={() => toggle(value)}
            className={`group mx-0.5 inline-flex h-[34px] items-center gap-2 rounded-full border px-3 py-1.5 text-[1.4rem] text-[var(--colors-gray-700)] transition-all duration-150 focus:outline-none focus:ring-[3px] focus:ring-[#7F5AF8] focus:ring-offset-2 focus:ring-offset-white ${
              isSelected
                ? 'border-[#7F5AF8] bg-[#F5F3FF] focus:border-[#7F5AF8]'
                : 'border-[var(--colors-gray-300)] bg-white hover:border-[#7F5AF8] focus:border-[#7F5AF8]'
            }`}
          >
            <span
              className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[4px] transition-colors ${
                isSelected
                  ? 'bg-[#7F5AF8]'
                  : 'border-2 border-[var(--colors-gray-400)] bg-white group-hover:border-[#7F5AF8]'
              }`}
            >
              {isSelected && <FilterCheck />}
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
};
