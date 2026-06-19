import { createPerson, updatePerson } from '@/api/people';
import { MemberForm } from '@/components/MemberForm';
import { SuccessModal } from '@/components/SuccessModal';
import { usePerson } from '@/hooks/usePerson';
import { peopleKeys } from '@/lib/queryKeys';
import { MemberFormValues, personToFormValues } from '@/utils/memberForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReactElement, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Container = ({ children }: { children: React.ReactNode }) => (
  <main className="mx-auto w-full max-w-[var(--layout-width)] px-[25px] py-8">
    <div className="rounded-2xl bg-white p-8 shadow-sm">{children}</div>
  </main>
);

export const AddEditPeoplePage = (): ReactElement => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const personId = id ? Number(id) : undefined;
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    data: person,
    isLoading,
    error: loadError,
  } = usePerson(isEditing ? personId : undefined);

  const saveMutation = useMutation({
    mutationFn: (values: MemberFormValues) => {
      if (isEditing && personId && person) {
        return updatePerson(personId, values, person);
      }
      return createPerson(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.lists() });
      if (personId) {
        queryClient.invalidateQueries({ queryKey: peopleKeys.detail(personId) });
      }
      setShowSuccess(true);
    },
  });

  const handleSubmit = (values: MemberFormValues) => {
    saveMutation.mutate(values);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const loadErrorMessage =
    loadError instanceof Error ? loadError.message : loadError ? 'Unable to load this member.' : null;

  const submitErrorMessage =
    saveMutation.error instanceof Error
      ? saveMutation.error.message
      : saveMutation.error
        ? 'Unable to save this member. Please try again.'
        : null;

  return (
    <>
      <Container>
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1 text-[1.4rem] text-[var(--colors-brand)] hover:underline"
        >
          ← Back to People
        </Link>

        <h1 className="text-[2.4rem] font-semibold text-[var(--colors-darkBlue)]">
          {isEditing ? 'Edit member' : 'Add a member'}
        </h1>

        <p className="mt-2 text-[1.4rem] text-[var(--colors-gray-600)]">
          {isEditing
            ? 'Update member details below.'
            : 'Fill in the details below to add a new team member.'}
        </p>

        {isLoading && (
          <p className="mt-8 text-[1.4rem] text-[var(--colors-gray-500)]">Loading member…</p>
        )}

        {!isLoading && loadErrorMessage && (
          <p className="mt-8 text-[1.4rem] text-[var(--colors-redPink)]">{loadErrorMessage}</p>
        )}

        {!isLoading && !loadErrorMessage && (!isEditing || person) && (
          <>
            {submitErrorMessage && (
              <p className="mt-6 text-[1.4rem] text-[var(--colors-redPink)]">{submitErrorMessage}</p>
            )}
            <MemberForm
              initialValues={person ? personToFormValues(person) : undefined}
              submitLabel={isEditing ? 'Save changes' : 'Add member'}
              isSubmitting={saveMutation.isPending}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </>
        )}
      </Container>

      <SuccessModal
        isOpen={showSuccess}
        title={isEditing ? 'Member updated' : 'Member added'}
        message={
          isEditing
            ? 'The member details were saved successfully.'
            : 'The new team member was added successfully.'
        }
        onClose={handleSuccessClose}
      />
    </>
  );
};
