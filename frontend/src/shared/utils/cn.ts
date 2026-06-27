import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for merging Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class management
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};