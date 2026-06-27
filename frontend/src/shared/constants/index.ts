import { PreorderFilter, SortField, SortOrder } from '../types';

export const FILTER_OPTIONS: Array<{
  value: PreorderFilter;
  label: string;
}> = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

export const SORT_FIELD_OPTIONS: Array<{
  value: SortField;
  label: string;
}> = [
    { value: 'name', label: 'Name' },
    { value: 'createdAt', label: 'Created At' },
    { value: 'startsAt', label: 'Starts At' },
    { value: 'endsAt', label: 'Ends At' },
  ];

export const PREORDER_WHEN_OPTIONS = [
  { value: 'out_of_stock', label: 'out-of-stock' },
  { value: 'regardless_of_stock', label: 'regardless-of-stock' },
];

export const STATUS_OPTIONS = [
  { value: true, label: 'Active' },
  { value: false, label: 'Inactive' },
];

export const DEFAULT_FILTERS = {
  filter: 'all' as PreorderFilter,
  sortBy: 'createdAt' as SortField,
  sortOrder: 'desc' as SortOrder,
  page: 1,
  limit: 8,
};


export const QUERY_KEYS = {
  preorders: 'preorders',
  preorder: 'preorder',
} as const;

export const DEFAULT_PAGE_SIZE = 8;
export const DEFAULT_FILTER = 'all';
export const DEFAULT_SORT_BY = 'createdAt';
export const DEFAULT_SORT_ORDER = 'desc';

export const API_ENDPOINTS = {
  preorders: '/preorders',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
