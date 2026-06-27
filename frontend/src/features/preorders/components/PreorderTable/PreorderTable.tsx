'use client';

import { Preorder } from '@/shared/types';
import { TableRow } from './TableRow';
import { Checkbox } from '@/shared/components/ui/Checkbox';

interface PreorderTableProps {
  preorders: Preorder[];
  selectedIds: Set<string>;
  onToggleSelectAll: (checked: boolean) => void;
  onToggleRow: (id: string, checked: boolean) => void;
  onToggleStatus: (id: string) => Promise<void>;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isLoading: boolean;
}

export const PreorderTable = ({
  preorders,
  selectedIds,
  onToggleSelectAll,
  onToggleRow,
  onToggleStatus,
  onDelete,
  isDeleting,
  isLoading,
}: PreorderTableProps) => {
  const allSelected = preorders.length > 0 && preorders.every((p) => selectedIds.has(p.id));
  const someSelected = preorders.some((p) => selectedIds.has(p.id));

  return (
    <div className="overflow-x-auto">
      <table className="w-full table">
        <thead>
          <tr>
            {/* Header Checkbox - Select All */}
            <th className="w-10 px-4 py-3 text-center">
              <Checkbox
                checked={allSelected}
                onChange={(e) => onToggleSelectAll(e.target.checked)}
                aria-label="Select all preorders"
                indeterminate={someSelected && !allSelected}
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Products
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preorder when
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Starts at
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ends at
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Loading skeleton rows
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={`skeleton-${index}`} className="animate-pulse">
                <td className="px-4 py-3 text-center">
                  <div className="h-4 w-4 bg-gray-200 rounded mx-auto"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="h-4 w-8 bg-gray-200 rounded mx-auto"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="h-4 w-6 bg-gray-200 rounded mx-auto"></div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="h-8 w-8 bg-gray-200 rounded mx-auto"></div>
                </td>
              </tr>
            ))
          ) : preorders.length === 0 ? (
            // Empty state
            <tr>
              <td colSpan={8} className="px-4 py-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-300 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium">No preorders found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Create your first preorder to get started.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            // Data rows with checkboxes
            preorders.map((preorder) => (
              <TableRow
                key={preorder.id}
                preorder={preorder}
                isSelected={selectedIds.has(preorder.id)}
                onToggleSelect={(checked) => onToggleRow(preorder.id, checked)}
                onToggleStatus={() => onToggleStatus(preorder.id)}
                onDelete={() => onDelete(preorder.id)}
                isDeleting={isDeleting}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};