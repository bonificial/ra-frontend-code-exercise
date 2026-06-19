import { Person } from '@/types/person';

export type PeopleListFilters = {
  search: string;
  statuses: Person['status'][];
  page: number;
  limit: number;
};

export const peopleKeys = {
  all: ['people'] as const,
  lists: () => [...peopleKeys.all, 'list'] as const,
  list: (filters: PeopleListFilters) => [...peopleKeys.lists(), filters] as const,
  details: () => [...peopleKeys.all, 'detail'] as const,
  detail: (id: number) => [...peopleKeys.details(), id] as const,
};
