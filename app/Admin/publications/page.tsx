"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { PublicationCard } from "../_components/PublicationCard";
import { EditPublicationPanel } from "../_components/EditPublicationPanel";
import { NewPublicationPanel } from "../_components/NewPublicationPanel";
import { DeletePublicationBox } from "../_components/DeletePublicationBox";

type Publication = {
  title: string;
  description: string;
  content: string;
  author: string;
  status: "published" | "draft";
};

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([
    {
      title: "Sierra Madre Conservation Report",
      description: "Latest findings on conservation efforts",
      content: "Detailed report on conservation...",
      author: "Admin",
      status: "published",
    },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const handleSaveExisting = (updated: Publication) => {
    if (editingIndex === null) return;
    const copy = [...publications];
    copy[editingIndex] = updated;
    setPublications(copy);
    setEditingIndex(null);
  };

  const handleCreate = (newPub: Publication) => {
    setPublications([newPub, ...publications]);
    setCreating(false);
  };

  const confirmDelete = (indexToDelete: number) => {
    const updated = publications.filter((_, i) => i !== indexToDelete);
    setPublications(updated);
    setDeletingIndex(null);
  };

  return (
    <div className="flex flex-col gap-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Publications</h1>
          <p className="text-gray-600 mt-1">Manage conservation reports and updates</p>
        </div>

        <button
          className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-lg font-medium hover:bg-gray-800"
          onClick={() => {
            setEditingIndex(null);
            setCreating(true);
          }}
        >
          <Plus size={18} />
          New Publication
        </button>
      </div>
    
      {creating && (
        <NewPublicationPanel
          onCancel={() => setCreating(false)}
          onCreate={handleCreate}
        />
      )}

      {publications.map((pub, index) =>
        editingIndex === index ? (
          <EditPublicationPanel
            key={index}
            publication={pub}
            onClose={() => setEditingIndex(null)}
            onSave={handleSaveExisting}
          />
        ) : (
          <div key={index} className="flex flex-col gap-3">
            <PublicationCard
              title={pub.title}
              description={pub.description}
              author={pub.author}
              updated="1/20/2024"
              status={pub.status}
              onEdit={() => {
                setCreating(false);
                setEditingIndex(index);
              }}
              onDelete={() => setDeletingIndex(index)} 
            />

{deletingIndex !== null && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
    <div className="relative">
      <DeletePublicationBox
        title={publications[deletingIndex].title}
        onCancel={() => setDeletingIndex(null)}
        onConfirm={() => confirmDelete(deletingIndex)}
      />
    </div>
  </div>
)}
          </div>
        )
      )}
    </div>
  );
}
