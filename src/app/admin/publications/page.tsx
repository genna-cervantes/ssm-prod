"use client";

import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../_components/Sidebar";
import { PublicationCard } from "../_components/PublicationCard";
import { EditPublicationPanel } from "../_components/EditPublicationPanel";
import { NewPublicationPanel } from "../_components/NewPublicationPanel";
import { DeletePublicationBox } from "../_components/DeletePublicationBox";
import type { Publication } from "@/src/services/publications.service";
import { getActivePublicationsAction } from "@/src/actions/publications.actions";

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

  return (
    <div className="flex w-full m-auto max-w-[1440px] bg-[#FFF4E0] justify-center items-center">
      <Sidebar />
      <div className="flex flex-col items-start w-full h-[1080px] overflow-auto">
        <div className='w-full h-[109px] border-b-2 border-[#A2A2A299]/60'></div>
        <div className='w-[1074px] flex flex-col flex-1 pl-6 pr-12 py-9'>
          {/* Header */}
          <div className='flex flex-col gap-0.5 mb-8'>
            <div className='flex justify-between items-center'>
              <div className='font-bold text-4xl'>Publications</div>
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
            <div>
              <p className='font-medium text-lg text-black/60 text-balance'>
                Manage conservation reports and updates
              </p>
            </div>
          </div>

          {loading ? (
            <div className="bg-white/50 border border-gray-200 rounded-xl p-12 text-center">
              <p className="text-black/60">Loading publications...</p>
            </div>
          ) : (
            <div className="w-full py-2 px-1 flex flex-col gap-4">
              {creating && (
                <NewPublicationPanel
                  onCancel={() => setCreating(false)}
                  onSuccess={handleSuccess}
                />
              )}

              {publications.length === 0 && !creating && (
                <div className="bg-white/50 border border-gray-200 rounded-xl p-12 text-center">
                  <p className="text-black/60 mb-4">No publications yet</p>
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
            </div>
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
      </div>
    </div>
  );
}
