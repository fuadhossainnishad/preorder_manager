import { apiClient } from '@/shared/lib/api-client';
import {
    Preorder,
    PaginatedResponse,
    PreorderFilters,
    CreatePreorderPayload,
    UpdatePreorderPayload
} from '@/shared/types';

/**
 * Preorder API Service - Responsible for all preorder-related API calls
 * Implements Repository pattern for clean separation
 */
class PreorderApiService {
    private readonly basePath = '/preorders';

    async getPreorders(filters: PreorderFilters): Promise<PaginatedResponse<Preorder>> {
        const params = new URLSearchParams({
            filter: filters.filter,
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
            page: String(filters.page),
            limit: String(filters.limit),
        });

        return apiClient.get<PaginatedResponse<Preorder>>(
            `${this.basePath}?${params.toString()}`
        );
    }

    async getPreorder(id: string): Promise<Preorder> {
        return apiClient.get<Preorder>(`${this.basePath}/${id}`);
    }

    async createPreorder(data: CreatePreorderPayload): Promise<Preorder> {
        return apiClient.post<Preorder>(this.basePath, data);
    }

    async updatePreorder({ id, ...data }: UpdatePreorderPayload): Promise<Preorder> {
        return apiClient.put<Preorder>(`${this.basePath}/${id}`, data);
    }

    async deletePreorder(id: string): Promise<void> {
        return apiClient.delete<void>(`${this.basePath}/${id}`);
    }

    async toggleStatus(id: string): Promise<Preorder> {
        return apiClient.patch<Preorder>(`${this.basePath}/${id}/toggle-status`);
    }
}

// Singleton instance
export const preorderApi = new PreorderApiService();