"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type User = {
  name: string;
  email: string;
  role: string;
  status: string;
  created: string;
};

export default function UsersPage() {
  const [users] = useState<User[]>([
    {
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      created: "1/1/2024",
    },
  ]);

  return (
    <div className="flex flex-col gap-6 relative">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600 mt-1">Manage admin users and permissions</p>
        </div>

        <button className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-lg font-medium hover:bg-gray-800">
          <Plus size={18} />
          Add User
        </button>
      </div>


      {users.map((user, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
        >

          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>

            <div className="flex gap-2">
              <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                {user.role}
              </span>
              <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                {user.status}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-4">Created {user.created}</p>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100">
              <Pencil size={16} />
              Edit
            </button>

            <button className="flex items-center gap-2 text-sm font-medium text-white bg-red-600 rounded-lg px-3 py-2 hover:bg-red-700">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
