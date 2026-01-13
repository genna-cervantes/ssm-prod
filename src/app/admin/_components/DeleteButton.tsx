"use client"

import { useActionState, useEffect } from "react";
import { deleteNoteAction } from "@/src/actions/notes.actions";

interface DeleteButtonProps {
  id: number;
  children: React.ReactNode;
  className?: string;
}

export default function DeleteButton({
  id,
  children,
  className = "",
}: DeleteButtonProps) {
  const [state, formAction, isPending] = useActionState(deleteNoteAction, null);

  useEffect(() => {
    if (state === null) return;

    if (state.ok) {
      alert("Note deleted successfully");
    } else {
      alert(state.error ?? "Failed to delete note");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={isPending}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors duration-200 bg-red-600 hover:bg-red-700 text-white ${className} ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isPending ? "Deleting..." : children}
      </button>
    </form>
  );
}