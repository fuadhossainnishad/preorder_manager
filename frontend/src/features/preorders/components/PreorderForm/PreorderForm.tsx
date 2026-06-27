'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Preorder, CreatePreorderPayload } from '@/shared/types';
import { preorderSchema, PreorderFormData } from '../../schemas/preorderSchema';
import { PREORDER_WHEN_OPTIONS } from '@/shared/constants';
import { formatDateForInput, formatDateForAPI } from '@/shared/lib/date-utils';

interface PreorderFormProps {
  initialData?: Preorder | null;
  onSubmit: (data: CreatePreorderPayload) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export const PreorderForm = ({
  initialData,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Save changes',
}: PreorderFormProps) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<PreorderFormData>({
    resolver: zodResolver(preorderSchema),
    mode: 'onChange',
    defaultValues: initialData
      ? {
          name: initialData.name,
          products: initialData.products,
          preorderWhen: initialData.preorderWhen,
          startsAt: formatDateForInput(initialData.startsAt),
          endsAt: initialData.endsAt ? formatDateForInput(initialData.endsAt) : null,
          status: initialData.status,
        }
      : {
          name: '',
          products: 0,
          preorderWhen: 'regardless_of_stock',
          startsAt: '',
          endsAt: null,
          status: true,
        },
  });

  const statusValue = watch('status');

  const handleFormSubmit = async (data: PreorderFormData) => {
    try {
      const payload: CreatePreorderPayload = {
        name: data.name,
        products: data.products,
        preorderWhen: data.preorderWhen,
        startsAt: formatDateForAPI(data.startsAt),
        endsAt: data.endsAt ? formatDateForAPI(data.endsAt) : null,
        status: data.status,
      };

      await onSubmit(payload);
      router.push('/');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  // Helper to render field with label on left, input on right
  const renderField = (
    label: string,
    field: React.ReactNode,
    description?: string,
    required?: boolean,
    error?: string
  ) => (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex">
        {/* Label Column - Left side with fixed width */}
        <div className="w-40 flex-shrink-0">
          <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {description && (
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>

        {/* Field Column - Right side with consistent alignment */}
        <div className="flex-1 pl-4">
          {field}
          {error && (
            <p className="text-xs text-red-600 mt-1">{error}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-4xl">
      {/* Header */}
      <div className="pb-4 mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Preorder details</h2>
        <p className="text-sm text-gray-500">
          These values appear in the preorders list.
        </p>
      </div>

      {/* Name Field */}
      {renderField(
        'Name',
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="A label to recognize this preorder by."
              className={`
                w-full rounded-md border border-gray-300 shadow-sm
                px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              `}
              disabled={isSubmitting}
            />
          )}
        />,
        undefined,
        true,
        errors.name?.message
      )}

      {/* Products Field */}
      {renderField(
        'Products',
        <Controller
          name="products"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              min={0}
              onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
              className={`
                w-full rounded-md border border-gray-300 shadow-sm
                px-3 py-1.5 text-sm text-gray-900
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                ${errors.products ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              `}
              disabled={isSubmitting}
            />
          )}
        />,
        'Number of products covered by this preorder.',
        false,
        errors.products?.message
      )}

      {/* Preorder When Field */}
      {renderField(
        'Preorder when',
        <Controller
          name="preorderWhen"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className={`
                w-full rounded-md border border-gray-300 shadow-sm
                px-3 py-1.5 text-sm text-gray-900 bg-white
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                ${errors.preorderWhen ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              `}
              disabled={isSubmitting}
            >
              {PREORDER_WHEN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />,
        'When customers are allowed to preorder.',
        false,
        errors.preorderWhen?.message
      )}

      {/* Starts At Field */}
      {renderField(
        'Starts at',
        <Controller
          name="startsAt"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="datetime-local"
              placeholder="mm/dd/yyyy --:-- --"
              className={`
                w-full rounded-md border border-gray-300 shadow-sm
                px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                ${errors.startsAt ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              `}
              disabled={isSubmitting}
            />
          )}
        />,
        'When the preorder window opens.',
        false,
        errors.startsAt?.message
      )}

      {/* Ends At Field */}
      {renderField(
        'Ends at',
        <Controller
          name="endsAt"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="datetime-local"
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value || null)}
              placeholder="mm/dd/yyyy --:-- --"
              className={`
                w-full rounded-md border border-gray-300 shadow-sm
                px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                ${errors.endsAt ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              `}
              disabled={isSubmitting}
            />
          )}
        />,
        'Leave empty for no end date.',
        false,
        errors.endsAt?.message
      )}

      {/* Status Field - Toggle Switch */}
      <div className="py-4 border-b border-gray-200">
        <div className="flex">
          {/* Label Column - Left side */}
          <div className="w-40 flex-shrink-0">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
              Active preorders are visible to customers.
            </p>
          </div>

          {/* Toggle - Right side */}
          <div className="flex-1 pl-4">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={field.value}
                    onClick={() => field.onChange(!field.value)}
                    className={`
                      relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                      transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      ${field.value ? 'bg-blue-600' : 'bg-gray-200'}
                    `}
                    disabled={isSubmitting}
                  >
                    <span
                      className={`
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0
                        transition duration-200 ease-in-out
                        ${field.value ? 'translate-x-5' : 'translate-x-0'}
                      `}
                    />
                  </button>
                  <span className="text-sm text-gray-600">
                    {field.value ? 'Active' : 'Inactive'}
                  </span>
                </div>
              )}
            />
            {errors.status && (
              <p className="text-xs text-red-600 mt-1">{errors.status.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Form Actions - Right aligned like UI-3 */}
      <div className="flex justify-end gap-3 pt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`
            px-4 py-2 text-sm font-medium text-white rounded-md
            bg-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors
          `}
        >
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </form>
  );
};