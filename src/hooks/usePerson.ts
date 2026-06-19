import { fetchPersonById } from '@/api/people';
import { peopleKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function usePerson(id: number | undefined) {
  return useQuery({
    queryKey: peopleKeys.detail(id ?? 0),
    queryFn: ({ signal }) => fetchPersonById(id!, signal),
    enabled: id !== undefined,
  });
}
