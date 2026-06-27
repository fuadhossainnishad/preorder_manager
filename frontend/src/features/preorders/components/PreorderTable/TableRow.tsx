'use client';

import Link from 'next/link';
import { Preorder } from '@/shared/types';
import { StatusToggle } from '../StatusToggle';
import { formatDateTime, formatPreorderWhen } from '@/shared/lib/date-utils';
import { Checkbox } from '@/shared/components/ui/Checkbox';

interface TableRowProps {
  preorder: Preorder;
  isSelected: boolean;
  onToggleSelect: (checked: boolean) => void;
  onToggleStatus: () => Promise<void>;
  onDelete: () => void;
  isDeleting?: boolean;
}

export const TableRow = ({
  preorder,
  isSelected,
  onToggleSelect,
  onToggleStatus,
  onDelete,
  isDeleting = false,
}: TableRowProps) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 w-10">
        <Checkbox
          checked={isSelected}
          onChange={(e) => onToggleSelect(e.target.checked)}
          aria-label={`Select ${preorder.name}`}
        />
      </td>
      <td className="px-4 py-3 font-medium text-gray-900">
        {preorder.name}
      </td>
      <td className="px-4 py-3 text-center text-gray-600">
        {preorder.products}
      </td>
      <td className="px-4 py-3 text-gray-600">
        {formatPreorderWhen(preorder.preorderWhen)}
      </td>
      <td className="px-4 py-3 text-gray-600">
        {formatDateTime(preorder.startsAt)}
      </td>
      <td className="px-4 py-3 text-gray-600">
        {formatDateTime(preorder.endsAt)}
      </td>
      <td className="px-4 py-3">
        <StatusToggle active={preorder.status} onToggle={onToggleStatus} />
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-3 ">
          <Link
            href={`/preorders/${preorder.id}/edit`}
            className="action-btn action-btn-edit shadow shadow-black/50 px-4 rounded-lg "
            aria-label={`Edit ${preorder.name}`}
            
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </Link>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="action-btn action-btn-delete shadow shadow-black/50 px-4 rounded-lg bg-black"
            aria-label={`Delete ${preorder.name}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};