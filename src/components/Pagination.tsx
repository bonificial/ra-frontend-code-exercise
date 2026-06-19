import ChevronDownIcon from '@/icons/chevron-down.svg?react';
import ChevronLeftIcon from '@/icons/chevron-left.svg?react';
import ChevronRightIcon from '@/icons/chevron-right.svg?react';
import ChevronsLeftIcon from '@/icons/chevrons-left.svg?react';
import ChevronsRightIcon from '@/icons/chevrons-right.svg?react';
import { ChangeEvent, ReactElement } from 'react';

type PaginationProps = {
  page: number;
  limit: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

const pageSizeOptions = [10, 25, 50];

const navButtonClass =
  'flex h-9 w-9 items-center justify-center rounded-md border border-[var(--colors-gray-300)] bg-white text-[var(--colors-gray-700)] transition-colors hover:border-[var(--colors-brand)] hover:text-[var(--colors-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--colors-brand)]/20 disabled:cursor-not-allowed disabled:text-[var(--colors-gray-400)] disabled:hover:border-[var(--colors-gray-300)] disabled:hover:text-[var(--colors-gray-400)]';

const selectClass =
  'h-9 appearance-none rounded-md border border-[var(--colors-gray-300)] bg-white text-[1.3rem] text-[var(--colors-gray-700)] focus:border-[var(--colors-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--colors-brand)]/20';

export const Pagination = ({
  page,
  limit,
  totalCount,
  onPageChange,
  onLimitChange,
}: PaginationProps): ReactElement => {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const start = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalCount);

  const handlePageSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onPageChange(Number(e.target.value));
  };

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-8">
      <p className="text-[1.3rem] text-[var(--colors-gray-600)]">
        {start}-{end} of {totalCount} records
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={page <= 1}
          aria-label="First page"
          className={navButtonClass}
        >
          <ChevronsLeftIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className={navButtonClass}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <span className="relative">
          <select
            value={page}
            onChange={handlePageSelect}
            aria-label="Select page"
            className={`${selectClass} min-w-[52px] pl-3 pr-8`}
          >
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <option key={pageNumber} value={pageNumber}>
                {pageNumber}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--colors-gray-500)]" />
        </span>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className={navButtonClass}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={page >= totalPages}
          aria-label="Last page"
          className={navButtonClass}
        >
          <ChevronsRightIcon className="h-5 w-5" />
        </button>

        <span className="relative ml-2">
          <select
            value={limit}
            onChange={handleLimitChange}
            aria-label="Rows per page"
            className={`${selectClass} pl-3 pr-8`}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                Rows {size}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--colors-gray-500)]" />
        </span>
      </div>
    </div>
  );
};
