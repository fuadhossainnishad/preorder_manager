import { z } from 'zod';

/**
 * Preorder validation schema
 * Uses Zod for type-safe validation
 */
export const preorderSchema = z.object({
    name: z.string()
        .min(1, 'Name is required')
        .max(100, 'Name must be less than 100 characters')
        .trim(),

    products: z.number()
        .int('Must be a whole number')
        .min(0, 'Must be at least 0')
        .max(999999, 'Products must be less than 1,000,000')
        .default(0),

    preorderWhen: z.enum(['out_of_stock', 'regardless_of_stock'], {
        message: 'Please select a preorder condition',
    }),

    startsAt: z.string()
        .min(1, 'Start date is required')
        .refine((val) => {
            if (!val) return false;
            const parsed = Date.parse(val);
            return !isNaN(parsed);
        }, {
            message: 'Please enter a valid date and time',
        }),

    endsAt: z.string()
        .nullable()
        .optional()
        .refine((val) => {
            if (!val) return true; // null/undefined is allowed
            return !isNaN(Date.parse(val));
        }, {
            message: 'Please enter a valid date and time or leave empty',
        }),

    status: z.boolean().default(true),
});

// Infer TypeScript type from schema
export type PreorderFormData = z.infer<typeof preorderSchema>;

// Partial schema for updates (all fields optional)
export const updatePreorderSchema = preorderSchema.partial();

// Creation schema with explicit required fields
export const createPreorderSchema = preorderSchema.required({
    name: true,
    preorderWhen: true,
    startsAt: true,
});

// Schema for validation on the API side (can be shared with backend if needed)
export type CreatePreorderInput = z.infer<typeof createPreorderSchema>;
export type UpdatePreorderInput = z.infer<typeof updatePreorderSchema>;