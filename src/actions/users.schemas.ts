"use server";

import { z } from "zod";

/*
 * Zod schema for creating a new user
 */
export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  roleId: z.number().int().positive("Role is required"),
  image: z.string().url("Invalid image URL").optional().nullable(),
});

/*
 * Zod schema for updating an existing user
 * All fields are optional for partial updates
 */
export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  roleId: z.number().int().positive("Role is required").optional(),
  image: z.string().url("Invalid image URL").optional().nullable(),
  emailVerified: z.boolean().optional(),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;


