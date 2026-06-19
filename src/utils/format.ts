import { Person } from '@/types/person';

const currencySymbols: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

export function formatSalary(salary: number, currency: string): string {
  const amount = salary / 100;
  const formatted = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  const symbol = currencySymbols[currency] ?? currency;
  return `${currency} ${formatted} ${symbol}`;
}

export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatEmployment(employment: string): string {
  return capitalize(employment);
}

export function formatStatus(status: Person['status']): string {
  if (status === 'offboarded') return 'Offboarding';
  return capitalize(status);
}
