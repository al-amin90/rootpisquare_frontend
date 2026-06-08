"use client";
import {
  useDeleteDynamicMutation,
  useGetDynamicQuery,
  usePatchDynamicMutation,
  usePostDynamicMutation,
} from "@/src/redux/features/dynamic/dynamicApi";
import { TNote } from "@/src/types";
import { showApiError } from "@/src/utils/showApiError";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NotesPage() {
  const emptyForm = {
    name: "",
    image: null as File | null,
    driveLink: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<TNote | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    image: null as File | null,
    driveLink: "",
    existingImage: "",
  });

  const {
    data: noteData,
    isLoading,
    refetch,
  } = useGetDynamicQuery({
    url: "/note",
  });

  const [createNote, { isLoading: creating }] = usePostDynamicMutation();
  const [updateNote, { isLoading: updating }] = usePatchDynamicMutation();
  const [deleteNote] = useDeleteDynamicMutation();

  const notes: TNote[] = noteData?.data || [];

  const updateForm = (key: keyof typeof form, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateEditForm = (
    key: keyof typeof editForm,
    value: string | File | null,
  ) => {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = async () => {
    if (!form.name || !form.driveLink) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("driveLink", form.driveLink);
      if (form.image) {
        formData.append("image", form.image);
      }

      await createNote({
        url: "/note",
        data: formData,
        invalidatesTags: ["note"],
      }).unwrap();

      toast.success("Note created successfully");
      setForm(emptyForm);
      refetch();
    } catch (error) {
      showApiError(error);
    }
  };

  const openEdit = (note: TNote) => {
    setEditing(note);
    setEditForm({
      name: note.name,
      image: null,
      driveLink: note.driveLink,
      existingImage: note.image,
    });
  };

  const handleUpdate = async () => {
    if (!editing) return;

    if (!editForm.name || !editForm.driveLink) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("driveLink", editForm.driveLink);
      if (editForm.image) {
        formData.append("image", editForm.image);
      }
      if (editForm.existingImage) {
        formData.append("existingImage", editForm.existingImage);
      }

      await updateNote({
        url: `/note/${editing._id}`,
        data: formData,
        invalidatesTags: ["note"],
      }).unwrap();

      toast.success("Note updated successfully");
      setEditing(null);
      refetch();
    } catch (error) {
      showApiError(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    try {
      await deleteNote({
        url: `/note/${id}`,
        invalidatesTags: ["note"],
      }).unwrap();
      toast.success("Note deleted successfully");
      refetch();
    } catch (error) {
      showApiError(error);
    }
  };

  return (
    <div className="p-6 bg-[#0A0F0A] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">Notes</h1>
        <p className="text-[#A8C5A8] text-sm mb-8">
          Add study notes. Clicking opens Google Drive link.
        </p>

        {/* Create Form */}
        <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 mb-6 max-w-lg">
          <h2 className="font-bold text-[#E8F5E8] mb-5">Add New Note</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Note Name
              </label>
              <input
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                placeholder="e.g. Bangla Grammar Notes"
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  updateForm("image", e.target.files?.[0] || null)
                }
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#A8C5A8] rounded-lg text-xs file:mr-2 file:bg-[#228B22] file:text-white file:border-0 file:rounded file:px-2 file:py-1 file:text-xs file:cursor-pointer"
              />
              {form.image && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(form.image)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Google Drive Link
              </label>
              <input
                value={form.driveLink}
                onChange={(e) => updateForm("driveLink", e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              />
            </div>

            <button
              onClick={handleCreate}
              disabled={creating}
              className="w-full py-2.5 bg-[#228B22] text-white font-semibold rounded-lg hover:bg-[#3DAA3D] transition-colors disabled:opacity-50"
            >
              {creating ? "Creating..." : "Add Note"}
            </button>
          </div>
        </div>

        {/* Notes Grid */}
        {notes.length > 0 && (
          <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[#E8F5E8]">
                Notes ({notes.length})
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {notes.map((note) => (
                <div key={note._id} className="group relative">
                  <a
                    href={note.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-[#131A13] border-2 border-[#1F3521] rounded-xl hover:border-[#228B22] hover:scale-105 transition-all cursor-pointer"
                  >
                    {note.image ? (
                      <img
                        src={note.image}
                        alt={note.name}
                        className="w-20 h-20 object-cover rounded-lg mb-2"
                      />
                    ) : (
                      <span className="text-4xl mb-2">📝</span>
                    )}
                    <span className="font-semibold text-[#E8F5E8] text-xs text-center line-clamp-2">
                      {note.name}
                    </span>
                  </a>

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(note)}
                      className="p-1 bg-blue-500/80 hover:bg-blue-600 rounded text-white text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="p-1 bg-red-500/80 hover:bg-red-600 rounded text-white text-xs"
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {notes.length === 0 && !isLoading && (
          <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-12 text-center">
            <p className="text-[#A8C5A8]">
              No notes found. Add your first note!
            </p>
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-[#0F170F] to-[#0A0F0A] border border-[#1F3521] rounded-2xl shadow-2xl max-w-lg w-full">
              {/* Header */}
              <div className="border-b border-[#1F3521] px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-[#E8F5E8]">
                      Edit Note
                    </h2>
                    <p className="text-sm text-[#A8C5A8] mt-1">
                      Update note information
                    </p>
                  </div>
                  <button
                    onClick={() => setEditing(null)}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#A8C5A8] text-sm mb-1.5">
                      Note Name
                    </label>
                    <input
                      value={editForm.name}
                      onChange={(e) => updateEditForm("name", e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A8C5A8] text-sm mb-1.5">
                      Cover Image
                    </label>
                    {editForm.existingImage && !editForm.image && (
                      <div className="mb-2">
                        <img
                          src={editForm.existingImage}
                          alt="Current"
                          className="w-20 h-20 object-cover rounded-lg mb-2"
                        />
                        <p className="text-xs text-green-500">Current image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        updateEditForm("image", e.target.files?.[0] || null)
                      }
                      className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#A8C5A8] rounded-lg text-xs file:mr-2 file:bg-[#228B22] file:text-white file:border-0 file:rounded file:px-2 file:py-1 file:text-xs file:cursor-pointer"
                    />
                    {editForm.image && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(editForm.image)}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <p className="text-xs text-blue-500 mt-1">
                          New image (will replace old)
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#A8C5A8] text-sm mb-1.5">
                      Google Drive Link
                    </label>
                    <input
                      value={editForm.driveLink}
                      onChange={(e) =>
                        updateEditForm("driveLink", e.target.value)
                      }
                      className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleUpdate}
                      disabled={updating}
                      className="flex-1 py-2.5 bg-gradient-to-r from-[#228B22] to-[#2E8B57] text-white rounded-lg font-semibold hover:from-[#2E8B57] hover:to-[#3DAA3D] transition-all disabled:opacity-50"
                    >
                      {updating ? "Updating..." : "Update Note"}
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="px-6 py-2.5 bg-[#1A1A1A] text-[#A8C5A8] rounded-lg font-semibold hover:bg-[#252525] hover:text-[#E8F5E8] transition-all border border-[#1F3521]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
