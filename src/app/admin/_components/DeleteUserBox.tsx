"use client";

import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { deleteUserAction } from "@/src/actions/users.actions";

type DeleteUserBoxProps = {
  id: string;
  name: string;
  onCancel: () => void;
  onSuccess: () => void;
};

export function DeleteUserBox({
  id,
  name,
  onCancel,
  onSuccess,
}: DeleteUserBoxProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteUserAction(id);
      if (result.success) {
        onSuccess();
      }
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-[450px]">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Delete User
      </h2>

      <p className="text-gray-700 text-sm mb-6">
        Are you sure you want to delete &ldquo;{name}&rdquo;?
        <br />
        This will also remove all associated accounts and sessions.
        <br />
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          disabled={isPending}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          Delete
        </button>
      </div>
    </div>
  );
}

