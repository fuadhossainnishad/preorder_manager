'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Input } from './Input';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="flex items-start space-x-2">
                <div className="flex items-center h-5">
                    <Input
                        ref={ref}
                        id={checkboxId}
                        type="checkbox"
                        className={cn(
                            'h-4 w-4 rounded border-gray-300 text-blue-600',
                            'focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            error && 'border-red-500',
                            className
                        )}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${checkboxId}-error` : undefined}
                        {...props}
                    />
                </div>
                {label && (
                    <div className="text-sm">
                        <label htmlFor={checkboxId} className="font-medium text-gray-700">
                            {label}
                        </label>
                        {error && (
                            <p id={`${checkboxId}-error`} className="text-red-600 text-sm mt-1">
                                {error}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';