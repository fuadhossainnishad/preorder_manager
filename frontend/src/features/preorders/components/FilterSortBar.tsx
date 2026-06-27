'use client';

import { PreorderFilter, SortField, SortOrder } from '@/shared/types';
import { FILTER_OPTIONS, SORT_FIELD_OPTIONS } from '@/shared/constants';
import { Button } from '@/shared/components/ui/Button';

interface FilterSortBarProps {
  filter: PreorderFilter;
  onFilterChange: (filter: PreorderFilter) => void;
  sortBy: SortField;
  onSortByChange: (field: SortField) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  disabled?: boolean;
}

export const FilterSortBar = ({
  filter,
  onFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  disabled = false,
}: FilterSortBarProps) => {
  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    console.log('🔄 Toggle sort order to:', newOrder);
    onSortOrderChange(newOrder);
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as SortField;
    console.log('🔄 Sort by changed to:', newSortBy);
    onSortByChange(newSortBy);
  };

  const handleFilterChange = (value: PreorderFilter) => {
    console.log('🔄 Filter changed to:', value);
    onFilterChange(value);
  };

  console.log('🎯 FilterSortBar State:', { filter, sortBy, sortOrder });

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Filter Toggle Group - Matches UI-1 */}
      <div className="filter-group">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleFilterChange(option.value)}
            disabled={disabled}
            className={`filter-btn ${filter === option.value ? 'filter-btn-active' : ''}`}
            aria-pressed={filter === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Sort Controls - Matches UI-2 */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 font-medium">Sort by</span>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          disabled={disabled}
          className="select min-w-[130px] py-1.5 text-sm"
        >
          {SORT_FIELD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          onClick={toggleSortOrder}
          disabled={disabled}
          className="btn btn-secondary btn-sm min-w-[100px]"
        >
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
    </div>
  );
};