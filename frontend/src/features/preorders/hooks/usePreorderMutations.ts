import { useMutation, useQueryClient } from '@tanstack/react-query';
import { preorderApi } from '../services/preorderApi';
import { CreatePreorderPayload, UpdatePreorderPayload } from '@/shared/types';
import { QUERY_KEYS } from '@/shared/constants';

/**
 * Preorder Mutations with Optimistic Updates
 */
export const useCreatePreorder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePreorderPayload) => preorderApi.createPreorder(data),
        onSuccess: () => {
            // Invalidate and refetch preorders list
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.preorders] });
        },
    });
};

export const useUpdatePreorder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdatePreorderPayload) => preorderApi.updatePreorder(data),
        onSuccess: (data) => {
            // Update both the list and individual preorder caches
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.preorders] });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.preorder, data.id]
            });
        },
    });
};

export const useDeletePreorder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => preorderApi.deletePreorder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.preorders] });
        },
    });
};

export const useToggleStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => preorderApi.toggleStatus(id),
        onSuccess: () => {
            // Invalidate both list and individual queries
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.preorders] });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.preorder]
            });
        },
    });
};