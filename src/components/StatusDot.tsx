import { Person } from '@/types/person';
import { ReactElement } from 'react';

type StatusDotColors = {
  left: string;
  right: string;
};

const statusDotColors: Record<Person['status'], StatusDotColors> = {
  active: { left: '#8DE13A', right: '#58A30D' },
  onboarding: { left: '#FBBF24', right: '#D97706' },
  offboarded: { left: '#CDD6DF', right: '#4B5865' },
};

type StatusDotProps = {
  status: Person['status'];
  disabled?: boolean;
};

const disabledDotColors: StatusDotColors = { left: '#CDD6DF', right: '#9AA6B2' };

export const StatusDot = ({ status, disabled = false }: StatusDotProps): ReactElement => {
  const { left, right } = disabled ? disabledDotColors : statusDotColors[status];

  return (
    <span
      className="h-[12.44px] w-[12.44px] flex-shrink-0 rounded-full"
      style={{ background: `linear-gradient(90deg, ${left} 50%, ${right} 50%)` }}
      aria-hidden="true"
    />
  );
};
