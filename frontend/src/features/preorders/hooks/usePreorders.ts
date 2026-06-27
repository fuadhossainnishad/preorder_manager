import { useQuery } from '@tanstack/react-query';
import { preorderApi } from '../services/preorderApi';
import { PreorderFilters } from '@/shared/types';
import { QUERY_KEYS } from '@/shared/constants';

/**
 * Custom hook for fetching paginated preorders with filters
 */
export const usePreorders = (filters: Partial<PreorderFilters> = {}) => {
  const mergedFilters = {
    filter: 'all' as const,
    sortBy: 'createdAt' as const,
    sortOrder: 'desc' as const,
    page: 1,
    limit: 8,
    ...filters,
  };

  console.log('🔍 usePreorders fetching with:', mergedFilters);

  return useQuery({
    queryKey: [QUERY_KEYS.preorders, mergedFilters],
    queryFn: () => {
      console.log('📡 API Request:', mergedFilters);
      return preorderApi.getPreorders(mergedFilters as PreorderFilters);
    },
    staleTime: 1000 * 60 * 2,
    placeholderData: (previousData) => previousData,
  });
};