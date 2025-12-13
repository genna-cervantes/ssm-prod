"use client";

import { X } from "lucide-react";
import { useState } from "react";

type Publication = {
  title: string;
  description: string;
  content: string;
  author: string;
  status: "published" | "draft";
};

type NewPanelProps = {
  onCancel: () => void;
  onCreate: (pub: Publication) => void;
};

export function NewPublicationPanel({ onCancel, onCreate }: NewPanelProps) {
  const [form, setForm] = useState<Publication>({
    title: "",
    description: "",
    content: "",
    author: "Admin",
    status: "draft",
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
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
        >
          <X size={22} />
        </button>
      </div>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          onCreate(form);
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Publication title"
          />
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Brief description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={form.content}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Publication content"
          />
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              id="author"
              value={form.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Save Publication
          </button>
        </div>
      </form>
    </div>
  );
}