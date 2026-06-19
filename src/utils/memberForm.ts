import { Person } from '@/types/person';

export type MemberFormValues = {
  name: string;
  jobTitle: string;
  country: string;
  salary: string;
  currency: string;
  employment: string;
  status: Person['status'];
};

export const defaultMemberFormValues: MemberFormValues = {
  name: '',
  jobTitle: '',
  country: '',
  salary: '',
  currency: 'EUR',
  employment: 'employee',
  status: 'active',
};

export function personToFormValues(person: Person): MemberFormValues {
  return {
    name: person.name,
    jobTitle: person.jobTitle,
    country: person.country,
    salary: String(person.salary / 100),
    currency: person.currency,
    employment: person.employment,
    status: person.status,
  };
}
