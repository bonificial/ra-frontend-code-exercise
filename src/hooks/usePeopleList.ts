import { fetchPeople } from '@/api/people';
import { peopleKeys, PeopleListFilters } from '@/lib/queryKeys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function usePeopleList(filters: PeopleListFilters) {
  return useQuery({
    queryKey: peopleKeys.list(filters),
    queryFn: ({ signal }) =>
      fetchPeople({
        ...filters,
        signal,
      }),
    placeholderData: keepPreviousData,
  });
}
