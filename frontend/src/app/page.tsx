'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePreorders } from '@/features/preorders/hooks/usePreorders';
import { useDeletePreorder, useToggleStatus } from '@/features/preorders/hooks/usePreorderMutations';
import { FilterSortBar } from '@/features/preorders/components/FilterSortBar';
import { Button } from '@/shared/components/ui/Button';
import { Container } from '@/shared/components/layout/Container';
import { Spinner } from '@/shared/components/ui/Spinner';
import { PreorderFilter, SortField, SortOrder } from '@/shared/types';
import { PreorderTable } from '@/features/preorders/components/PreorderTable/PreorderTable';
import { Pagination } from '@/features/preorders/components/PreorderTable/Pagination';

export default function PreorderListPage() {
  // State management
  const [filter, setFilter] = useState<PreorderFilter>('all');
  const [sortBy, setSortBy] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Log state changes
  useEffect(() => {
    console.log('📊 State changed:', { filter, sortBy, sortOrder, page });
  }, [filter, sortBy, sortOrder, page]);

  // Queries and mutations
  const { data, isLoading, error, refetch } = usePreorders({
    filter,
    sortBy,
    sortOrder,
    page,
    limit: 8,
  });

  const deleteMutation = useDeletePreorder();
  const toggleStatus = useToggleStatus();

  // Checkbox handlers
  const handleToggleSelectAll = useCallback((checked: boolean) => {
    if (checked && data?.items) {
      setSelectedIds(new Set(data.items.map(p => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  }, [data?.items]);

  const handleToggleRow = useCallback((id: string, checked: boolean) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (checked) newSet.add(id);
      else newSet.delete(id);
      return newSet;
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this preorder?')) {
      deleteMutation.mutate(id);
    }
  }, [deleteMutation]);

  const handleToggleStatus = useCallback(async (id: string) => {
    try {
      await toggleStatus.mutateAsync(id);
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  }, [toggleStatus]);

  // Loading state
  if (isLoading) {
    return (
      <Container className="py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto text-blue-600" />
            <p className="mt-4 text-gray-500">Loading preorders...</p>
          </div>
        </div>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Failed to load preorders</p>
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
          <Button onClick={() => refetch()} className="mt-4">
            Retry
          </Button>
        </div>
      </Container>
    );
  }

  const preorders = data?.items || [];
  const totalPages = data?.totalPages || 0;
  const totalItems = data?.total || 0;

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Preorders</h1>
        <Link href="/create" prefetch>
          <Button size="md" className="min-w-40">
            Create Preorder
          </Button>
        </Link>
      </div>

      {/* Filters and Sorting */}
      <FilterSortBar
        filter={filter}
        onFilterChange={(newFilter) => {
          console.log('🔄 Setting filter to:', newFilter);
          setFilter(newFilter);
          setPage(1); // Reset to first page when filter changes
        }}
        sortBy={sortBy}
        onSortByChange={(newSortBy) => {
          console.log('🔄 Setting sortBy to:', newSortBy);
          setSortBy(newSortBy);
        }}
        sortOrder={sortOrder}
        onSortOrderChange={(newSortOrder) => {
          console.log('🔄 Setting sortOrder to:', newSortOrder);
          setSortOrder(newSortOrder);
        }}
        disabled={isLoading}
      />

      {/* Table with Checkboxes */}
      <div className="table-container mt-4">
        <PreorderTable
          preorders={preorders}
          selectedIds={selectedIds}
          onToggleSelectAll={handleToggleSelectAll}
          onToggleRow={handleToggleRow}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
          isLoading={isLoading}
        />
      </div>

      {/* Pagination */}
      {preorders.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            console.log('🔄 Setting page to:', newPage);
            setPage(newPage);
          }}
          totalItems={totalItems}
          showing={preorders.length}
          isDisabled={isLoading}
        />
      )}
    </Container>
  );
}