import { Person } from '@/types/person';
import { MemberFormValues } from '@/utils/memberForm';

export function isPersonEnabled(person: Person): boolean {
  return person.enabled !== false;
}

export function formValuesToPersonPayload(values: MemberFormValues): Omit<Person, 'id'> {
  return {
    name: values.name.trim(),
    jobTitle: values.jobTitle.trim(),
    country: values.country.trim(),
    salary: Math.round(Number.parseFloat(values.salary) * 100),
    currency: values.currency,
    employment: values.employment,
    status: values.status,
    photo: null,
    enabled: true,
  };
}

export function formValuesToUpdatePayload(
  values: MemberFormValues,
  existing: Person
): Partial<Person> {
  return {
    ...formValuesToPersonPayload(values),
    photo: existing.photo,
    enabled: isPersonEnabled(existing),
  };
}
