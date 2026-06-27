'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    error?: string;
    label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, options, error, label, id, ...props }, ref) => {
        const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="space-y-1 w-full">
                {label && (
                    <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={selectId}
                    className={cn(
                        'block w-full rounded-md border border-gray-300 shadow-sm',
                        'px-3 py-2 text-gray-900 bg-white',
                        'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                        'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                        className
                    )}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${selectId}-error` : undefined}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p id={`${selectId}-error`} className="text-sm text-red-600 mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';