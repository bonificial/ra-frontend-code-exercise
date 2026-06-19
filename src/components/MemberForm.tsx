import { Button } from '@/components/Button';
import { Person } from '@/types/person';
import {
  defaultMemberFormValues,
  MemberFormValues,
} from '@/utils/memberForm';
import { FormEvent, ReactElement } from 'react';

type Props = {
  initialValues?: Partial<MemberFormValues>;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (values: MemberFormValues) => void;
  onCancel: () => void;
};

const inputClass =
  'w-full rounded-lg border border-[var(--colors-gray-300)] bg-white px-4 py-2.5 text-[1.4rem] text-[var(--colors-darkBlue)] focus:border-[var(--colors-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--colors-brand)]/20';

const labelClass = 'mb-1.5 block text-[1.3rem] font-medium text-[var(--colors-gray-600)]';

export const MemberForm = ({
  initialValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: Props): ReactElement => {
  const values = { ...defaultMemberFormValues, ...initialValues };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSubmit({
      name: String(formData.get('name') ?? ''),
      jobTitle: String(formData.get('jobTitle') ?? ''),
      country: String(formData.get('country') ?? ''),
      salary: String(formData.get('salary') ?? ''),
      currency: String(formData.get('currency') ?? 'EUR'),
      employment: String(formData.get('employment') ?? 'employee'),
      status: String(formData.get('status') ?? 'active') as Person['status'],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={values.name}
            className={inputClass}
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className={labelClass}>
            Role
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            required
            defaultValue={values.jobTitle}
            className={inputClass}
            placeholder="Product Manager"
          />
        </div>

        <div>
          <label htmlFor="country" className={labelClass}>
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            required
            defaultValue={values.country}
            className={inputClass}
            placeholder="Netherlands"
          />
        </div>

        <div>
          <label htmlFor="employment" className={labelClass}>
            Employment type
          </label>
          <select
            id="employment"
            name="employment"
            defaultValue={values.employment}
            className={inputClass}
          >
            <option value="employee">Employee</option>
            <option value="contractor">Contractor</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select id="status" name="status" defaultValue={values.status} className={inputClass}>
            <option value="active">Active</option>
            <option value="onboarding">Onboarding</option>
            <option value="offboarded">Offboarded</option>
          </select>
        </div>

        <div>
          <label htmlFor="currency" className={labelClass}>
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            defaultValue={values.currency}
            className={inputClass}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div>
          <label htmlFor="salary" className={labelClass}>
            Salary
          </label>
          <input
            id="salary"
            name="salary"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={values.salary}
            className={inputClass}
            placeholder="75000"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-[var(--colors-gray-200)] pt-6">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
