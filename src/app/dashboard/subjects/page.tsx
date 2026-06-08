"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import {
  useDeleteDynamicMutation,
  useGetDynamicQuery,
  usePatchDynamicMutation,
  usePostDynamicMutation,
} from "@/src/redux/features/dynamic/dynamicApi";

import { showApiError } from "@/src/utils/showApiError";

type TSubject = {
  _id: string;
  name: string;
};

export default function SubjectsPage() {
  const [name, setName] = useState("");

  const [editing, setEditing] = useState<TSubject | null>(null);
  const [editName, setEditName] = useState("");

  const { data, isLoading } = useGetDynamicQuery({
    url: "/subject",
  });

  const [createSubject, { isLoading: creating }] = usePostDynamicMutation();

  const [updateSubject, { isLoading: updating }] = usePatchDynamicMutation();

  const [deleteSubject] = useDeleteDynamicMutation();

  const subjects: TSubject[] = data?.data || [];

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      await createSubject({
        url: "/subject",
        data: {
          name: name.trim(),
        },
        invalidatesTags: ["subject"],
      }).unwrap();

      toast.success("Subject created successfully");

      setName("");
    } catch (error) {
      toast.error(showApiError(error));
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;

    try {
      await updateSubject({
        url: `/subject/${editing._id}`,
        data: {
          name: editName,
        },
        invalidatesTags: ["subject"],
      }).unwrap();

      toast.success("Subject updated successfully");

      setEditing(null);
      setEditName("");
    } catch (error) {
      toast.error(showApiError(error));
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this subject?");

    if (!confirmed) return;

    try {
      await deleteSubject({
        url: `/subject/${id}`,
        invalidatesTags: ["subject"],
      }).unwrap();

      toast.success("Subject deleted successfully");
    } catch (error) {
      toast.error(showApiError(error));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-black text-[#E8F5E8]">Subjects</h1>

        <p className="text-[#8DAA8D] mt-1">Add and manage academic subjects</p>
      </div>

      {/* Create */}

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-5">Add New Subject</h2>

        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="e.g. Bangla"
            className="flex-1 px-4 py-3 rounded-xl bg-[#131A13] border border-[#1F3521] text-white focus:outline-none focus:border-[#3DAA3D]"
          />

          <button
            onClick={handleCreate}
            disabled={creating}
            className="px-6 py-3 bg-[#228B22] hover:bg-[#3DAA3D] text-white rounded-xl font-semibold transition"
          >
            {creating ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* List */}

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white text-lg">All Subjects</h2>

          <span className="text-sm text-[#7FA67F]">
            {subjects.length} Total
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-[#8DAA8D]">Loading...</div>
        ) : subjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">📚</div>

            <p className="text-[#8DAA8D]">No subjects found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className="group bg-[#131A13] border border-[#1F3521] rounded-xl p-4 hover:border-[#2E8B57] transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-2xl mb-2">📚</div>

                    <h3 className="text-white font-semibold">{subject.name}</h3>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => {
                        setEditing(subject);
                        setEditName(subject.name);
                      }}
                      className="px-3 py-1 text-xs rounded-lg bg-blue-500/20 text-blue-400"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(subject._id)}
                      className="px-3 py-1 text-xs rounded-lg bg-red-500/20 text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="w-full max-w-md bg-[#101710] border border-[#1F3521] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-5">Edit Subject</h2>

            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#131A13] border border-[#1F3521] text-white focus:outline-none focus:border-[#3DAA3D]"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2 rounded-xl bg-gray-700 text-white"
              >
                Cancel
              </button>

              <button
                disabled={updating}
                onClick={handleUpdate}
                className="px-5 py-2 rounded-xl bg-[#228B22] text-white"
              >
                {updating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
