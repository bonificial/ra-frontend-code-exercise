import { Person } from '@/types/person';
import { MemberFormValues } from '@/utils/memberForm';
import {
  formValuesToPersonPayload,
  formValuesToUpdatePayload,
} from '@/utils/person';

const API_BASE = 'http://localhost:4002/people';

export type PeopleQuery = {
  page: number;
  limit: number;
  search: string;
  statuses: Person['status'][];
  signal?: AbortSignal;
};

export type PeopleResponse = {
  data: Person[];
  totalCount: number;
};

async function parseJsonResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  if (!response.ok) {
    throw new Error(fallbackMessage);
  }

  return response.json();
}

export async function fetchPeople(query: PeopleQuery): Promise<PeopleResponse> {
  const params = new URLSearchParams();
  params.set('_page', String(query.page));
  params.set('_limit', String(query.limit));

  if (query.search) {
    params.set('name_like', query.search);
  }

  query.statuses.forEach((status) => {
    params.append('status', status);
  });

  const response = await fetch(`${API_BASE}?${params}`, {
    signal: query.signal,
  });

  if (!response.ok) {
    throw new Error('Failed to load people');
  }

  const totalCount = Number(response.headers.get('X-Total-Count') ?? 0);
  const data: Person[] = await response.json();

  return { data, totalCount };
}

export async function fetchPersonById(id: number, signal?: AbortSignal): Promise<Person> {
  const response = await fetch(`${API_BASE}/${id}`, { signal });

  return parseJsonResponse<Person>(response, 'Failed to load member');
}

export async function createPerson(values: MemberFormValues): Promise<Person> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formValuesToPersonPayload(values)),
  });

  return parseJsonResponse<Person>(response, 'Failed to create member');
}

export async function updatePerson(
  id: number,
  values: MemberFormValues,
  existing: Person
): Promise<Person> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formValuesToUpdatePayload(values, existing)),
  });

  return parseJsonResponse<Person>(response, 'Failed to update member');
}

export async function updatePersonEnabled(id: number, enabled: boolean): Promise<Person> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled }),
  });

  return parseJsonResponse<Person>(response, 'Failed to update member status');
}
