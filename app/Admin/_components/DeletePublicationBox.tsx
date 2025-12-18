"use client";

import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { deletePublicationAction } from "@/db/actions/publications.actions";

type DeletePublicationBoxProps = {
  id: number;
  title: string;
  onCancel: () => void;
  onSuccess: () => void;
};

export function DeletePublicationBox({
  id,
  title,
  onCancel,
  onSuccess,
}: DeletePublicationBoxProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePublicationAction(id);
      if (result.success) {
        onSuccess();
      }
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-[450px]">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Delete Publication
      </h2>

      <p className="text-gray-700 text-sm mb-6">
        Are you sure you want to delete &ldquo;{title}&rdquo;?
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
