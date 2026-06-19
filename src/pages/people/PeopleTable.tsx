import { Avatar } from '@/components/Avatar';
import { ActionsMenu } from '@/components/ActionsMenu';
import { Pagination } from '@/components/Pagination';
import { StatusDot } from '@/components/StatusDot';
import { TableSkeleton } from '@/components/TableSkeleton';
import { Person } from '@/types/person';
import {
  formatEmployment,
  formatSalary,
  formatStatus,
} from '@/utils/format';
import { isPersonEnabled } from '@/utils/person';
import { ReactElement } from 'react';

const columns = ['Name', 'Role', 'Type', 'Status', 'Country', 'Salary', 'Actions'] as const;

type Props = {
  people: Person[];
  totalCount: number;
  isLoading: boolean;
  isFetching?: boolean;
  error: string | null;
  page: number;
  limit: number;
  togglingId: number | null;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onEdit: (person: Person) => void;
  onToggleEnabled: (person: Person) => void;
};

export const PeopleTable = ({
  people,
  totalCount,
  isLoading,
  isFetching = false,
  error,
  page,
  limit,
  togglingId,
  onPageChange,
  onLimitChange,
  onEdit,
  onToggleEnabled,
}: Props): ReactElement => {
  const showPagination = !isLoading && !error && totalCount > 0;

  return (
    <div className="w-full">
      <div className={`overflow-x-auto transition-opacity ${isFetching ? 'opacity-60' : ''}`}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--colors-bgBase)]">
              {columns.map((col) => (
                <th
                  key={col}
                  className="py-3 pr-4 text-left text-[1.1rem] font-semibold uppercase tracking-wider text-[var(--colors-gray-500)] first:pl-8 last:pr-8"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {isLoading && <TableSkeleton />}

          {!isLoading && error && (
            <tbody className="bg-[var(--colors-blank)]">
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <p className="text-[1.4rem] text-[var(--colors-redPink)]">{error}</p>
                </td>
              </tr>
            </tbody>
          )}

          {!isLoading && !error && people.length === 0 && (
            <tbody className="bg-[var(--colors-blank)]">
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <p className="text-[1.6rem] font-medium text-[var(--colors-darkBlue)]">
                    No people found
                  </p>
                  <p className="mt-1 text-[1.3rem] text-[var(--colors-gray-500)]">
                    Try adjusting your search or filters
                  </p>
                </td>
              </tr>
            </tbody>
          )}

          {!isLoading && !error && people.length > 0 && (
            <tbody className="bg-[var(--colors-blank)]">
              {people.map((person) => {
                const isDisabled = !isPersonEnabled(person);
                const isToggling = togglingId === person.id;

                return (
                  <tr
                    key={person.id}
                    className="border-b border-[var(--colors-gray-200)] transition-colors hover:bg-[var(--colors-gray-50)]"
                  >
                    <td className="py-3 pl-8 pr-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={person.name} />
                        <span className="text-[1.4rem] font-medium text-[var(--colors-darkBlue)]">
                          {person.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-[1.4rem] text-[var(--colors-gray-700)]">
                      {person.jobTitle}
                    </td>
                    <td className="py-3 pr-4 text-[1.4rem] text-[var(--colors-gray-700)]">
                      {formatEmployment(person.employment)}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center gap-2 text-[1.4rem] text-[var(--colors-gray-700)]">
                        <StatusDot status={person.status} disabled={isDisabled} />
                        {isDisabled ? 'Disabled' : formatStatus(person.status)}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-[1.4rem] text-[var(--colors-gray-700)]">
                      {person.country}
                    </td>
                    <td className="py-3 pr-4 text-[1.4rem] text-[var(--colors-gray-700)]">
                      {formatSalary(person.salary, person.currency)}
                    </td>
                    <td className="py-3 pr-8">
                      <ActionsMenu
                        ariaLabel={`Actions for ${person.name}`}
                        disabled={isToggling}
                        items={[
                          {
                            label: 'Edit',
                            onClick: () => onEdit(person),
                          },
                          {
                            label: isDisabled ? 'Enable' : 'Disable',
                            onClick: () => onToggleEnabled(person),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>

      {showPagination && (
        <div className="rounded-b-2xl border-t border-[var(--colors-gray-200)] bg-[var(--colors-blank)] py-4">
          <Pagination
            page={page}
            limit={limit}
            totalCount={totalCount}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
          />
        </div>
      )}
    </div>
  );
};
