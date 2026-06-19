import { ReactElement } from 'react';

const columnWidths = [
  'w-[22%]',
  'w-[14%]',
  'w-[10%]',
  'w-[12%]',
  'w-[12%]',
  'w-[12%]',
  'w-[18%]',
];

export const TableSkeleton = (): ReactElement => {
  return (
    <tbody className="bg-[var(--colors-blank)]">
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-[var(--colors-gray-200)]">
          {columnWidths.map((width, colIndex) => (
            <td
              key={colIndex}
              className={`py-4 pr-4 ${colIndex === 0 ? 'pl-8' : ''} ${colIndex === columnWidths.length - 1 ? 'pr-8' : ''}`}
            >
              <div
                className={`h-4 animate-pulse rounded bg-[var(--colors-gray-200)] ${colIndex === 0 ? 'w-3/4' : width}`}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
