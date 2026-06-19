import { updatePersonEnabled } from '@/api/people';
import { Button } from '@/components/Button';
import AddMemberIcon from '@/icons/add-member.svg?react';
import { SearchField } from '@/components/SearchField';
import { StatusFilter } from '@/components/StatusFilter';
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';
import { usePeople } from '@/hooks/usePeople';
import { Person } from '@/types/person';
import { isPersonEnabled } from '@/utils/person';
import { ReactElement, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';

const PAGE_SIZE = 25;

const contentWidth = 'mx-auto w-full max-w-[var(--layout-width)]';

export const PeoplePage = (): ReactElement => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilters, setStatusFilters] = useState<Person['status'][]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const { people, totalCount, isLoading, error, refetch } = usePeople({
    search: debouncedSearch,
    statuses: statusFilters,
    page,
    limit,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (statuses: Person['status'][]) => {
    setStatusFilters(statuses);
    setPage(1);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleEdit = useCallback(
    (person: Person) => {
      navigate(`/people/edit/${person.id}`);
    },
    [navigate]
  );

  const handleToggleEnabled = useCallback(
    async (person: Person) => {
      const nextEnabled = !isPersonEnabled(person);
      setTogglingId(person.id);

      try {
        await updatePersonEnabled(person.id, nextEnabled);
        refetch();
        showToast(
          nextEnabled ? `${person.name} has been enabled` : `${person.name} has been disabled`
        );
      } catch {
        showToast(`Unable to update ${person.name}. Please try again.`);
      } finally {
        setTogglingId(null);
      }
    },
    [refetch, showToast]
  );

  return (
    <main className="flex w-full flex-col gap-4 py-8">
      <section className="w-full">
        <div className={`${contentWidth} bg-[var(--colors-blank)] px-8 py-4`}>
          <div className="flex justify-end">
            <div className="text-right">
              <div className="text-[1.4rem] font-medium text-[var(--colors-darkBlue)]">
                Julie Howard
              </div>
              <div className="text-[1.2rem] text-[var(--colors-gray-500)]">Admin</div>
            </div>
          </div>
        </div>
      </section>

      <div className={`${contentWidth} flex flex-col gap-4 px-[25px]`}>
        <div className="bg-[var(--colors-bgBase)] py-4 pr-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="m-0 text-[2.4rem] font-semibold text-[var(--colors-gray-600)]">
              People
              {!isLoading && (
                <span className="ml-2 text-[1.6rem] font-normal text-[var(--colors-gray-500)]">
                  ({totalCount} members)
                </span>
              )}
            </h1>
            <Button onClick={() => navigate('/people/new')}>
              <AddMemberIcon className="h-6 w-6" />
              Add member
            </Button>
          </div>
        </div>

        <div>
          <div className="rounded-t-2xl bg-[var(--colors-blank)] px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SearchField value={search} onChange={handleSearchChange} />
              <StatusFilter selected={statusFilters} onChange={handleStatusChange} />
            </div>
          </div>

          <div className="overflow-hidden rounded-b-2xl">
            <PeopleTable
              people={people}
              totalCount={totalCount}
              isLoading={isLoading}
              error={error}
              page={page}
              limit={limit}
              togglingId={togglingId}
              onPageChange={setPage}
              onLimitChange={handleLimitChange}
              onEdit={handleEdit}
              onToggleEnabled={handleToggleEnabled}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
