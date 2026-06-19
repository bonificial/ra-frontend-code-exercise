import { createPerson, fetchPersonById, updatePerson } from '@/api/people';
import { MemberForm } from '@/components/MemberForm';
import { SuccessModal } from '@/components/SuccessModal';
import { MemberFormValues, personToFormValues } from '@/utils/memberForm';
import { Person } from '@/types/person';
import { ReactElement, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Container = ({ children }: { children: React.ReactNode }) => (
  <main className="mx-auto w-full max-w-[var(--layout-width)] px-[25px] py-8">
    <div className="rounded-2xl bg-white p-8 shadow-sm">{children}</div>
  </main>
);

export const AddEditPeoplePage = (): ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    fetchPersonById(Number(id), controller.signal)
      .then((data) => {
        setPerson(data);
        setLoadError(null);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setLoadError('Unable to load this member.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  const handleSubmit = async (values: MemberFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (isEditing && id && person) {
        await updatePerson(Number(id), values, person);
      } else {
        await createPerson(values);
      }

      setShowSuccess(true);
    } catch {
      setSubmitError('Unable to save this member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

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

        {!isLoading && loadError && (
          <p className="mt-8 text-[1.4rem] text-[var(--colors-redPink)]">{loadError}</p>
        )}

        {!isLoading && !loadError && (!isEditing || person) && (
          <>
            {submitError && (
              <p className="mt-6 text-[1.4rem] text-[var(--colors-redPink)]">{submitError}</p>
            )}
            <MemberForm
              initialValues={person ? personToFormValues(person) : undefined}
              submitLabel={isEditing ? 'Save changes' : 'Add member'}
              isSubmitting={isSubmitting}
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
