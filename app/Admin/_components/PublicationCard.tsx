"use client";

import { Pencil, Trash2, Eye, Calendar } from "lucide-react";
import type { Publication } from "@/db/services/publications.service";

type PublicationCardProps = {
  publication: Publication;
  onEdit: () => void;
  onDelete: () => void;
};

export function PublicationCard({
  publication,
  onEdit,
  onDelete,
}: PublicationCardProps) {
  const { title, description, author, isDraft, updatedAt, datePublished } =
    publication;

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {title}
          </h2>
          <p className="text-gray-600 mt-1 line-clamp-2">{description}</p>
        </div>

        <span
          className={`shrink-0 text-xs font-medium px-3 py-1 rounded-full ${
            isDraft
              ? "bg-amber-100 text-amber-800 border border-amber-200"
              : "bg-black text-white"
          }`}
        >
          {isDraft ? "draft" : "published"}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>By {author}</span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {isDraft ? `Updated ${formatDate(updatedAt)}` : formatDate(datePublished)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isDraft && (
            <a
              href={`/publications/${publication.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <Eye size={16} />
              View
            </a>
          )}
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
