// Core domain types - shared across the entire application
export enum PreorderWhen {
  OUT_OF_STOCK = 'out_of_stock',
  REGARDLESS_OF_STOCK = 'regardless_of_stock',
}

export interface Preorder {
  id: string;
  name: string;
  products: number;
  preorderWhen: PreorderWhen;
  startsAt: string;
  endsAt: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter & Sort Types
export type PreorderFilter = 'all' | 'active' | 'inactive';
export type SortField = 'name' | 'createdAt' | 'startsAt' | 'endsAt';
export type SortOrder = 'asc' | 'desc';

// Request/Response DTOs
export interface PreorderFilters {
  filter: PreorderFilter;
  sortBy: SortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

export interface CreatePreorderPayload {
  name: string;
  products: number;
  preorderWhen: PreorderWhen;
  startsAt: string;
  endsAt?: string | null;
  status?: boolean;
}

export type UpdatePreorderPayload = Partial<CreatePreorderPayload> & { id: string };

// API Error Response
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}