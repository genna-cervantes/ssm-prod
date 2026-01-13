"use server";

import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  getRoles,
  isEmailTaken,
} from "@/src/services/users.service";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  roleId: z.number().int().positive("Role is required"),
  image: z.string().url("Invalid image URL").optional().nullable(),
});

/*
 * Zod schema for updating an existing user
 * All fields are optional for partial updates
 */
const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  roleId: z.number().int().positive("Role is required").optional(),
  image: z.string().url("Invalid image URL").optional().nullable(),
  emailVerified: z.boolean().optional(),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;
type UpdateUserFormData = z.infer<typeof updateUserSchema>;

/*
 * Server action to create a new user
 *
 * Validates input using Zod schema
 * Checks for duplicate email
 * Generates unique ID using nanoid
 * Revalidates paths upon success
 * Returns the created user or error
 */
export async function createUserAction(data: CreateUserFormData) {
  const parsed = createUserSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // Check if email is already taken
    const emailTaken = await isEmailTaken(parsed.data.email);
    if (emailTaken) {
      return {
        success: false,
        error: { email: ["Email is already in use"] },
      };
    }

    const newUser = await createUser({
      id: nanoid(),
      name: parsed.data.name,
      email: parsed.data.email,
      roleId: parsed.data.roleId,
      image: parsed.data.image ?? null,
      emailVerified: false,
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      data: newUser,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: { _form: ["Failed to create user"] },
    };
  }
}

/*
 * Server action to update an existing user by ID
 *
 * Supports partial updates
 * Checks for duplicate email if email is being changed
 * Revalidates paths upon success
 * Returns the updated user or error
 */
export async function updateUserAction(id: string, data: UpdateUserFormData) {
  const parsed = updateUserSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  if (Object.keys(parsed.data).length === 0) {
    return {
      success: false,
      error: { _form: ["No fields to update"] },
    };
  }

  try {
    // Check if email is already taken by another user
    if (parsed.data.email) {
      const emailTaken = await isEmailTaken(parsed.data.email, id);
      if (emailTaken) {
        return {
          success: false,
          error: { email: ["Email is already in use"] },
        };
      }
    }

    const updatedUser = await updateUser(id, parsed.data);

    revalidatePath("/admin/users");

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      error: { _form: ["Failed to update user"] },
    };
  }
}

/*
 * Server action to delete a user by ID
 *
 * Hard deletes the user (cascades to accounts/sessions)
 * Revalidates paths upon success
 * Returns success status
 */
export async function deleteUserAction(id: string) {
  try {
    await deleteUser(id);

    revalidatePath("/admin/users");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error: "Failed to delete user",
    };
  }
}

/*
 * Server action to get all users
 *
 * Returns all users with their role information
 */
export async function getUsersAction() {
  try {
    const users = await getUsers();

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      error: "Failed to fetch users",
    };
  }
}

/*
 * Server action to get a single user by ID
 *
 * Returns the user or error if not found
 */
export async function getUserAction(id: string) {
  try {
    const user = await getUserById(id);

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      success: false,
      error: "Failed to fetch user",
    };
  }
}

/*
 * Server action to get all available roles
 *
 * Returns all roles for dropdown selection
 */
export async function getRolesAction() {
  try {
    const roles = await getRoles();

    return {
      success: true,
      data: roles,
    };
  } catch (error) {
    console.error("Error fetching roles:", error);
    return {
      success: false,
      error: "Failed to fetch roles",
    };
  }
}

/*
 * Server action to update user role
 *
 * Convenience action for changing just the role
 * Revalidates paths upon success
 */
export async function updateUserRoleAction(id: string, roleId: number) {
  try {
    const updatedUser = await updateUser(id, { roleId });

    revalidatePath("/admin/users");

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      error: "Failed to update user role",
    };
  }
}

