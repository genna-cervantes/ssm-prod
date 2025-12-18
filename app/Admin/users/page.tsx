"use client";

import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NewUserPanel } from "../_components/NewUserPanel";
import { EditUserPanel } from "../_components/EditUserPanel";
import { DeleteUserBox } from "../_components/DeleteUserBox";
import { getUsersAction, getRolesAction } from "@/actions/users.actions";
import type { UserWithRole } from "@/db/services/users.service";

type Role = {
  id: number;
  role: string;
  permissions: string[];
};

type PanelState =
  | { type: "none" }
  | { type: "new" }
  | { type: "edit"; user: UserWithRole }
  | { type: "delete"; user: UserWithRole };

export default function UsersPage() {
  const router = useRouter();
  const [panel, setPanel] = useState<PanelState>({ type: "none" });
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const [usersResult, rolesResult] = await Promise.all([
      getUsersAction(),
      getRolesAction(),
    ]);

    if (usersResult.success && usersResult.data) {
      setUsers(usersResult.data);
    }
    if (rolesResult.success && rolesResult.data) {
      setRoles(rolesResult.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSuccess = () => {
    setPanel({ type: "none" });
    fetchData();
    router.refresh();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage admin users and permissions
          </p>
        </div>

        <button
          onClick={() => setPanel({ type: "new" })}
          className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-lg font-medium hover:bg-gray-800"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* New User Panel */}
      {panel.type === "new" && (
        <NewUserPanel
          roles={roles}
          onCancel={() => setPanel({ type: "none" })}
          onSuccess={handleSuccess}
        />
      )}

      {/* Edit User Panel */}
      {panel.type === "edit" && (
        <EditUserPanel
          user={panel.user}
          roles={roles}
          onClose={() => setPanel({ type: "none" })}
          onSuccess={handleSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {panel.type === "delete" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <DeleteUserBox
            id={panel.user.id}
            name={panel.user.name}
            onCancel={() => setPanel({ type: "none" })}
            onSuccess={handleSuccess}
          />
        </div>
      )}

      {/* Users List */}
      {users.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-500">No users found</p>
          <p className="text-gray-400 text-sm mt-1">
            Click &quot;Add User&quot; to create your first user
          </p>
        </div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-4">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                  {user.role?.role ?? "Unknown"}
                </span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    user.emailVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.emailVerified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Created {formatDate(user.createdAt)}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPanel({ type: "edit", user })}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => setPanel({ type: "delete", user })}
                className="flex items-center gap-2 text-sm font-medium text-white bg-red-600 rounded-lg px-3 py-2 hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
