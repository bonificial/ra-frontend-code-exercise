import { fetchPeople } from '@/api/people';
import { Person } from '@/types/person';
import { useCallback, useEffect, useState } from 'react';

type UsePeopleOptions = {
  search: string;
  statuses: Person['status'][];
  page: number;
  limit: number;
};

type UsePeopleResult = {
  people: Person[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export function usePeople(options: UsePeopleOptions): UsePeopleResult {
  const { search, statuses, page, limit } = options;
  const [people, setPeople] = useState<Person[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const refetch = useCallback(() => {
    setRefreshToken((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchPeople({
          search,
          statuses,
          page,
          limit,
          signal: controller.signal,
        });
        setPeople(result.data);
        setTotalCount(result.totalCount);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => controller.abort();
  }, [search, statuses, page, limit, refreshToken]);

  return { people, totalCount, isLoading, error, refetch };
}
