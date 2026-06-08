"use client";

import { useState } from "react";
import {
  useDeleteDynamicMutation,
  useGetDynamicQuery,
  usePatchDynamicMutation,
  usePostDynamicMutation,
} from "@/src/redux/features/dynamic/dynamicApi";
import { showApiError } from "@/src/utils/showApiError";

export default function ClassesPage() {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<TClass | null>(null);
  const [editName, setEditName] = useState("");

  const { data, isLoading } = useGetDynamicQuery({
    url: "/class",
  });

  const [createClass, { isLoading: creating }] = usePostDynamicMutation();

  const [updateClass, { isLoading: updating }] = usePatchDynamicMutation();

  const [deleteClass] = useDeleteDynamicMutation();

  const classes: TClass[] = data?.data || [];

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      await createClass({
        url: "/class",
        data: {
          name,
        },
        invalidatesTags: ["class"],
      }).unwrap();

      setName("");
    } catch (error) {
      console.log(error);
      showApiError(error);
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;

    try {
      await updateClass({
        url: `/class/${editing._id}`,
        data: {
          name: editName,
        },
      }).unwrap();

      setEditing(null);
      setEditName("");
    } catch (error) {
      console.log(error);
      showApiError(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this class?",
    );

    if (!confirmDelete) return;

    try {
      await deleteClass({
        url: `/class/${id}`,
      }).unwrap();
    } catch (error) {
      console.log(error);
      showApiError(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-black text-[#E8F5E8]">Classes</h1>

        <p className="text-[#8DAA8D] mt-1">
          Create and manage academic classes
        </p>
      </div>

      {/* Add Card */}

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-5">Add New Class</h2>

        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter class name"
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
          <h2 className="font-bold text-white text-lg">All Classes</h2>

          <span className="text-sm text-[#7FA67F]">{classes.length} Total</span>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-[#8DAA8D]">Loading...</div>
        ) : classes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">🎓</div>
            <p className="text-[#8DAA8D]">No classes found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {classes.map((item) => (
              <div
                key={item._id}
                className="group bg-[#131A13] border border-[#1F3521] rounded-xl p-5 hover:border-[#2E8B57] transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#3DAA3D] text-2xl mb-2">🎓</div>

                    <h3 className="text-white font-semibold">{item.name}</h3>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => {
                        setEditing(item);
                        setEditName(item.name);
                      }}
                      className="px-3 py-1 text-xs rounded-lg bg-blue-500/20 text-blue-400"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-full max-w-md bg-[#101710] border border-[#1F3521] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-5">Edit Class</h2>

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

type TClass = {
  _id: string;
  name: string;
};
