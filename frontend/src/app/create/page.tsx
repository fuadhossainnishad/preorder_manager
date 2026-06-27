'use client';

import { useRouter } from 'next/navigation';
import { PreorderForm } from '@/features/preorders/components/PreorderForm/PreorderForm';
import { useCreatePreorder } from '@/features/preorders/hooks/usePreorderMutations';
import { Container } from '@/shared/components/layout/Container';

export default function CreatePreorderPage() {
  const router = useRouter();
  const createMutation = useCreatePreorder();

  const handleCreate = async (data: any) => {
    await createMutation.mutateAsync(data);
  };

  return (
    <Container className="py-8 max-w-4xl">
      {/* Back Button - Matches UI-3 */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-black font-semibold hover:text-blue-800 flex items-center gap-1 shadow px-3 py-2 rounded-lg"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <PreorderForm
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
          submitLabel="Save changes"
        />
      </div>
    </Container>
  );
}