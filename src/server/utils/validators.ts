// Vyxlo Input Validators
// Zod schemas for API request validation

import { z } from 'zod';

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  orgName: z.string().min(1, 'Organization name is required').max(100, 'Organization name too long'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const refreshSchema = z.object({
  refreshToken: z.string().optional(),
});

// Organization schemas
export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
});

// Project schemas
export const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  organizationId: z.string(),
});

// Usage schemas
export const createUsageSchema = z.object({
  feature: z.string().min(1).max(50),
  qty: z.number().positive().default(1),
  projectId: z.string().optional(),
});

// Validation helper
export async function validateBody<T>(
  schema: z.ZodSchema<T>,
  body: unknown
): Promise<T> {
  return schema.parseAsync(body);
}
