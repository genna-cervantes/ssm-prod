"use client";

import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { PublicationCard } from "../_components/PublicationCard";
import { EditPublicationPanel } from "../_components/EditPublicationPanel";
import { NewPublicationPanel } from "../_components/NewPublicationPanel";
import { DeletePublicationBox } from "../_components/DeletePublicationBox";
import type { Publication } from "@/db/services/publications.service";
import { getActivePublicationsAction } from "@/actions/publications.actions";

export default function PublicationsPage() {
  const router = useRouter();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [deletingPublication, setDeletingPublication] =
    useState<Publication | null>(null);

  const fetchPublications = async () => {
    const result = await getActivePublicationsAction(true);
    if (result.success && result.data) {
      setPublications(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleSuccess = () => {
    setEditingId(null);
    setCreating(false);
    setDeletingPublication(null);
    fetchPublications();
    router.refresh();
  };

  const editingPublication = editingId
    ? publications.find((p) => p.id === editingId)
    : null;

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Publications</h1>
            <p className="text-gray-600 mt-1">
              Manage conservation reports and updates
            </p>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-600">Loading publications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Publications</h1>
          <p className="text-gray-600 mt-1">
            Manage conservation reports and updates
          </p>
        </div>

        <button
          className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-lg font-medium hover:bg-gray-800"
          onClick={() => {
            setEditingId(null);
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
          onSuccess={handleSuccess}
        />
      )}

      {publications.length === 0 && !creating && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-600 mb-4">No publications yet</p>
          <button
            onClick={() => setCreating(true)}
            className="text-black underline hover:no-underline font-medium"
          >
            Create your first publication
          </button>
        </div>
      )}

      {publications.map((publication) =>
        editingId === publication.id && editingPublication ? (
          <EditPublicationPanel
            key={publication.id}
            publication={editingPublication}
            onClose={() => setEditingId(null)}
            onSuccess={handleSuccess}
          />
        ) : (
          <PublicationCard
            key={publication.id}
            publication={publication}
            onEdit={() => {
              setCreating(false);
              setEditingId(publication.id);
            }}
            onDelete={() => setDeletingPublication(publication)}
          />
        )
      )}

      {deletingPublication && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div className="relative">
            <DeletePublicationBox
              id={deletingPublication.id}
              title={deletingPublication.title}
              onCancel={() => setDeletingPublication(null)}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}
