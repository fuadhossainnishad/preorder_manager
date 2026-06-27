'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, label, id, type = 'text', required, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
        const hasError = !!error;

        return (
            <div className="space-y-1 w-full">
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    type={type}
                    required={required}
                    {...props}
                    aria-invalid={hasError || undefined}
                    aria-required={required || undefined}
                    aria-describedby={hasError ? `${inputId}-error` : undefined}
                    className={cn(
                        'block w-full rounded-md border border-gray-300 shadow-sm',
                        'px-3 py-2 text-gray-900 placeholder-gray-400',
                        'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                        'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                        hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                        className
                    )}

                />
                {hasError && (
                    <p id={`${inputId}-error`} className="text-sm text-red-600 mt-1" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';