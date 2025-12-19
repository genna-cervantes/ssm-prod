import { db } from "@/db";
import { user, account, rolesTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

/*
 * User type for frontend use (includes role info)
 */
export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWithRole = User & {
  role: {
    id: number;
    role: string;
    permissions: string[];
  } | null;
};

/*
 * CreateUserInput type
 * Fields required for user creation
 */
export type CreateUserInput = {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string | null;
  roleId: number;
};

/*
 * UpdateUserInput type
 * All fields are optional for partial updates
 */
export type UpdateUserInput = Partial<{
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  roleId: number;
}>;

/*
 * Create a new user
 * Returns the created user
 */
export async function createUser(data: CreateUserInput) {
  const [newUser] = await db
    .insert(user)
    .values({
      ...data,
      emailVerified: data.emailVerified ?? false,
    })
    .returning();

  return newUser;
}

/*
 * Get all users with their role information
 * Returns all users ordered by creation date (newest first)
 */
export async function getUsers(): Promise<UserWithRole[]> {
  const results = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: {
        id: rolesTable.id,
        role: rolesTable.role,
        permissions: rolesTable.permissions,
      },
    })
    .from(user)
    .leftJoin(rolesTable, eq(user.roleId, rolesTable.id))
    .orderBy(desc(user.createdAt));

  return results;
}

/*
 * Get a single user by ID with role information
 * Returns the user or null if not found
 */
export async function getUserById(id: string): Promise<UserWithRole | null> {
  const [result] = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: {
        id: rolesTable.id,
        role: rolesTable.role,
        permissions: rolesTable.permissions,
      },
    })
    .from(user)
    .leftJoin(rolesTable, eq(user.roleId, rolesTable.id))
    .where(eq(user.id, id));

  return result ?? null;
}

/*
 * Get a single user by email
 * Returns the user or null if not found
 */
export async function getUserByEmail(email: string): Promise<UserWithRole | null> {
  const [result] = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: {
        id: rolesTable.id,
        role: rolesTable.role,
        permissions: rolesTable.permissions,
      },
    })
    .from(user)
    .leftJoin(rolesTable, eq(user.roleId, rolesTable.id))
    .where(eq(user.email, email));

  return result ?? null;
}

/*
 * Update an existing user by ID
 * Returns the updated user
 * Supports partial updates
 */
export async function updateUser(id: string, data: UpdateUserInput) {
  const [updatedUser] = await db
    .update(user)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(user.id, id))
    .returning();

  return updatedUser;
}

/*
 * Delete a user by ID (hard delete)
 * This will cascade delete associated accounts and sessions
 */
export async function deleteUser(id: string) {
  await db.delete(user).where(eq(user.id, id));
}

/*
 * Get all accounts for a user
 * Returns array of accounts
 */
export async function getUserAccounts(userId: string) {
  return db
    .select()
    .from(account)
    .where(eq(account.userId, userId));
}

/*
 * Get all available roles
 * Returns array of roles
 */
export async function getRoles() {
  return db
    .select()
    .from(rolesTable)
    .orderBy(rolesTable.id);
}

/*
 * Check if email is already in use by another user
 */
export async function isEmailTaken(email: string, excludeUserId?: string): Promise<boolean> {
  const [existing] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email));

  if (!existing) return false;
  if (excludeUserId && existing.id === excludeUserId) return false;
  return true;
}

