"use client";

import { X, Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { updateUserAction } from "@/src/actions/users.actions";
import type { UserWithRole } from "@/src/services/users.service";

type Role = {
  id: number;
  role: string;
  permissions: string[];
};

type EditUserPanelProps = {
  user: UserWithRole;
  roles: Role[];
  onClose: () => void;
  onSuccess: () => void;
};

export function EditUserPanel({
  user,
  roles,
  onClose,
  onSuccess,
}: EditUserPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    image: user.image || "",
    emailVerified: user.emailVerified,
  });

  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      image: user.image || "",
      emailVerified: user.emailVerified,
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [id]: checked }));
    } else {
      setForm((prev) => ({
        ...prev,
        [id]: id === "roleId" ? parseInt(value, 10) : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    startTransition(async () => {
      const result = await updateUserAction(user.id, {
        ...form,
        image: form.image || null,
      });

      if (result.success) {
        onSuccess();
      } else if (result.error) {
        setErrors(result.error as Record<string, string[]>);
      }
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Edit User</h2>
          <p className="text-gray-600 mt-1">Update user details</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
          disabled={isPending}
        >
          <X size={22} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors._form && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors._form.join(", ")}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            disabled={isPending}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.join(", ")}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.join(", ")}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="roleId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <select
            id="roleId"
            value={form.roleId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black bg-white"
            disabled={isPending}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.role}
              </option>
            ))}
          </select>
          {errors.roleId && (
            <p className="text-red-600 text-sm mt-1">{errors.roleId.join(", ")}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Image URL (optional)
          </label>
          <input
            id="image"
            value={form.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            placeholder="https://example.com/avatar.jpg"
            disabled={isPending}
          />
          {errors.image && (
            <p className="text-red-600 text-sm mt-1">{errors.image.join(", ")}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            id="emailVerified"
            type="checkbox"
            checked={form.emailVerified}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
            disabled={isPending}
          />
          <label
            htmlFor="emailVerified"
            className="text-sm font-medium text-gray-700"
          >
            Email Verified
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

