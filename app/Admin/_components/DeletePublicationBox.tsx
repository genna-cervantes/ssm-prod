"use client";

type DeletePublicationBoxProps = {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeletePublicationBox({
  title,
  onCancel,
  onConfirm,
}: DeletePublicationBoxProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-[450px]">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Delete Publication
      </h2>

      <p className="text-gray-700 text-sm mb-6">
        Are you sure you want to delete "{title}"?
        <br />
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
