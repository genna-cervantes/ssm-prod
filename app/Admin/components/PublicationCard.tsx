import { Pencil, Trash2 } from "lucide-react";

type PublicationCardProps = {
  title: string;
  description: string;
  author: string;
  updated: string;
  status: "published" | "draft";
  onEdit: () => void;
  onDelete: () => void;
};

export function PublicationCard({
  title,
  description,
  author,
  updated,
  status,
  onEdit,
  onDelete,       
}: PublicationCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>

        {status === "published" && (
          <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
            published
          </span>
        )}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          By {author} • Updated {updated}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 text-sm font-medium text-white bg-red-600 rounded-lg px-3 py-2 hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
