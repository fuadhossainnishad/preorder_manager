import { useQuery } from '@tanstack/react-query';
import { preorderApi } from '../services/preorderApi';
import { QUERY_KEYS } from '@/shared/constants';

/**
 * Custom hook for fetching a single preorder by ID
 */
export const usePreorder = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.preorder, id],
        queryFn: () => preorderApi.getPreorder(id),
        enabled: !!id && id !== 'undefined',
        staleTime: 1000 * 60 * 5,
    });
};