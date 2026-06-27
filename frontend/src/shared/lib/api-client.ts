import { ApiError } from '@/shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Enterprise-grade API client with error handling and request/response interceptors
 */
class ApiClient {
    private baseUrl: string;
    private headers: HeadersInit;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-Type': 'application/json',
        };
        console.log('🔌 API Client initialized with base URL:', this.baseUrl);
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        console.log(`📡 Response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error Response:', errorText);

            try {
                const error: ApiError = JSON.parse(errorText);
                throw new Error(
                    Array.isArray(error.message)
                        ? error.message.join(', ')
                        : error.message || 'An unexpected error occurred'
                );
            } catch {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        }

        // Handle 204 No Content
        if (response.status === 204) {
            return {} as T;
        }

        const data = await response.json();
        console.log(`✅ API Response:`, data);
        return data;
    }

    private getFullUrl(endpoint: string): string {
        // Remove leading slash if present to avoid double slashes
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        return `${this.baseUrl}${cleanEndpoint}`;
    }

    /**
     * GET request
     */
    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = this.getFullUrl(endpoint);
        console.log(`🌐 GET Request: ${url}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: this.headers,
            ...options,
        });
        return this.handleResponse<T>(response);
    }

    /**
     * POST request
     */
    async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        const url = this.getFullUrl(endpoint);
        console.log(`🌐 POST Request: ${url}`, data);

        const response = await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        });
        return this.handleResponse<T>(response);
    }

    /**
     * PUT request
     */
    async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        const url = this.getFullUrl(endpoint);
        console.log(`🌐 PUT Request: ${url}`, data);

        const response = await fetch(url, {
            method: 'PUT',
            headers: this.headers,
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        });
        return this.handleResponse<T>(response);
    }

    /**
     * PATCH request
     */
    async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        const url = this.getFullUrl(endpoint);
        console.log(`🌐 PATCH Request: ${url}`, data);

        const response = await fetch(url, {
            method: 'PATCH',
            headers: this.headers,
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        });
        return this.handleResponse<T>(response);
    }

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = this.getFullUrl(endpoint);
        console.log(`🌐 DELETE Request: ${url}`);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: this.headers,
            ...options,
        });
        return this.handleResponse<T>(response);
    }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE);