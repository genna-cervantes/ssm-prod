"use client";

import { X, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { WysiwygEditor } from "./WysiwygEditor";
import { createPublicationAction } from "@/db/actions/publications.actions";

type NewPanelProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export function NewPublicationPanel({ onCancel, onSuccess }: NewPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    author: "Admin",
    heroImage: "",
    isDraft: true,
  });

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
      const result = await createPublicationAction({
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

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">New Publication</h2>
          <p className="text-gray-600 mt-1">Create a new publication</p>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-800"
          disabled={isPending}
        >
          <X size={22} />
        </button>
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
            placeholder="Publication title"
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
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            placeholder="Brief description of the publication"
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
            onClick={onCancel}
            disabled={isPending}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isPending}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            Save as Draft
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={isPending}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
