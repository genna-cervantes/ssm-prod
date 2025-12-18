"use client";

import { X, Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { WysiwygEditor } from "./WysiwygEditor";
import {
  updatePublicationAction,
  togglePublishAction,
} from "@/actions/publications.actions";
import type { Publication } from "@/db/services/publications.service";

type EditPanelProps = {
  publication: Publication;
  onClose: () => void;
  onSuccess: () => void;
};

export function EditPublicationPanel({
  publication,
  onClose,
  onSuccess,
}: EditPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [form, setForm] = useState({
    title: publication.title,
    description: publication.description,
    content: publication.content,
    author: publication.author,
    heroImage: publication.heroImage || "",
    isDraft: publication.isDraft,
  });

  useEffect(() => {
    setForm({
      title: publication.title,
      description: publication.description,
      content: publication.content,
      author: publication.author,
      heroImage: publication.heroImage || "",
      isDraft: publication.isDraft,
    });
  }, [publication]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleContentChange = (content: string) => {
    setForm((prev) => ({ ...prev, content }));
  };

  const handleSubmit = (e: React.FormEvent, asDraft: boolean) => {
    e.preventDefault();
    setErrors({});

    startTransition(async () => {
      const result = await updatePublicationAction(publication.id, {
        ...form,
        isDraft: asDraft,
        heroImage: form.heroImage || null,
      });

      if (result.success) {
        onSuccess();
      } else if (result.error) {
        setErrors(result.error as Record<string, string[]>);
      }
    });
  };

  const handleTogglePublish = () => {
    startTransition(async () => {
      const result = await togglePublishAction(publication.id, !publication.isDraft);

      if (result.success) {
        onSuccess();
      }
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Edit Publication</h2>
          <p className="text-gray-600 mt-1">Update publication details</p>
        </div>
        <div className="flex items-center gap-3">
          {!publication.isDraft && (
            <button
              type="button"
              onClick={handleTogglePublish}
              disabled={isPending}
              className="px-3 py-1.5 text-sm rounded-lg border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 disabled:opacity-50"
            >
              Unpublish
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            disabled={isPending}
          >
            <X size={22} />
          </button>
        </div>
      </div>

      <form className="space-y-6">
        {errors._form && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors._form.join(", ")}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            disabled={isPending}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.join(", ")}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            disabled={isPending}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.join(", ")}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Image URL (optional)
          </label>
          <input
            id="heroImage"
            value={form.heroImage}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            placeholder="https://example.com/image.jpg"
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <WysiwygEditor
            content={form.content}
            onChange={handleContentChange}
            placeholder="Write your publication content here..."
          />
          {errors.content && (
            <p className="text-red-600 text-sm mt-1">{errors.content.join(", ")}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            id="author"
            value={form.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            disabled={isPending}
          />
          {errors.author && (
            <p className="text-red-600 text-sm mt-1">{errors.author.join(", ")}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          {publication.isDraft && (
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isPending}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              Save Draft
            </button>
          )}

          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={isPending}
            className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {publication.isDraft ? "Publish" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
