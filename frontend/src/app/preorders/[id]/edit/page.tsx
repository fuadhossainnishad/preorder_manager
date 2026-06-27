'use client';

import { useParams, useRouter } from 'next/navigation';
import { PreorderForm } from '@/features/preorders/components/PreorderForm/PreorderForm';
import { usePreorder } from '@/features/preorders/hooks/usePreorder';
import { useUpdatePreorder } from '@/features/preorders/hooks/usePreorderMutations';
import { Container } from '@/shared/components/layout/Container';
import { Spinner } from '@/shared/components/ui/Spinner';

export default function UpdatePreorderPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const preorderId = params.id;

  const { data: preorder, isLoading, error } = usePreorder(preorderId);
  const updateMutation = useUpdatePreorder();

  const handleUpdate = async (data: any) => {
    await updateMutation.mutateAsync({ id: preorderId, ...data });
  };

  if (isLoading) {
    return (
      <Container className="py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto text-blue-600" />
            <p className="mt-4 text-gray-500">Loading preorder...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (error || !preorder) {
    return (
      <Container className="py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Preorder not found</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Return to List
          </button>
        </div>
      </Container>
    );
  }

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
          initialData={preorder}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
          submitLabel="Save changes"
        />
      </div>
    </Container>
  );
}