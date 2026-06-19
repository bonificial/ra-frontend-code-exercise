import { updatePersonEnabled } from '@/api/people';
import { Button } from '@/components/Button';
import AddMemberIcon from '@/icons/add-member.svg?react';
import { SearchField } from '@/components/SearchField';
import { StatusFilter } from '@/components/StatusFilter';
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';
import { usePeopleList } from '@/hooks/usePeopleList';
import { peopleKeys } from '@/lib/queryKeys';
import { Person } from '@/types/person';
import { isPersonEnabled } from '@/utils/person';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReactElement, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';

const PAGE_SIZE = 25;

const contentWidth = 'mx-auto w-full max-w-[var(--layout-width)]';

export const PeoplePage = (): ReactElement => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilters, setStatusFilters] = useState<Person['status'][]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isFetching, error } = usePeopleList({
    search: debouncedSearch,
    statuses: statusFilters,
    page,
    limit,
  });

  const toggleEnabledMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: number; enabled: boolean; name: string }) =>
      updatePersonEnabled(id, enabled),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.lists() });
      showToast(
        variables.enabled
          ? `${variables.name} has been enabled`
          : `${variables.name} has been disabled`
      );
    },
    onError: (_error, variables) => {
      showToast(`Unable to update ${variables.name}. Please try again.`);
    },
  });

  const people = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;
  const errorMessage = error instanceof Error ? error.message : null;
  const showInitialLoading = isLoading && !data;
  const { mutate: toggleEnabled, isPending, variables } = toggleEnabledMutation;
  const togglingId = isPending && variables ? variables.id : null;

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
    (person: Person) => {
      toggleEnabled({
        id: person.id,
        enabled: !isPersonEnabled(person),
        name: person.name,
      });
    },
    [toggleEnabled]
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
              {!showInitialLoading && (
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
              isLoading={showInitialLoading}
              isFetching={isFetching && !showInitialLoading}
              error={errorMessage}
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
