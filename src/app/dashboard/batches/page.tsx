/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useDeleteDynamicMutation,
  useGetDynamicQuery,
  usePatchDynamicMutation,
  usePostDynamicMutation,
} from "@/src/redux/features/dynamic/dynamicApi";
import { TBatch, TClass } from "@/src/types";
import { showApiError } from "@/src/utils/showApiError";
import { useState } from "react";
import toast from "react-hot-toast";

const WHATSAPP = "8801758055533";

export default function BatchesPage() {
  const emptyForm = {
    title: "",
    className: "",
    price: "",
    discountPersent: "",
    description: "",
    slots: "",
    icon: null as File | null,
  };

  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<TBatch | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    className: "",
    price: "",
    discountPersent: "",
    description: "",
    slots: "",
    icon: null as File | null,
  });

  const { data: batchData, isLoading } = useGetDynamicQuery({
    url: "/batch",
  });

  const { data: classData } = useGetDynamicQuery({
    url: "/class",
  });

  const batches: TBatch[] = batchData?.data || [];
  const classes: TClass[] = classData?.data || [];

  const [createBatch, { isLoading: creating }] = usePostDynamicMutation();
  const [updateBatch, { isLoading: updating }] = usePatchDynamicMutation();
  const [deleteBatch] = useDeleteDynamicMutation();

  const updateForm = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateEditForm = (key: keyof typeof editForm, value: any) => {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("className", form.className);
      formData.append("price", form.price);
      formData.append("discountPersent", form.discountPersent || "0");
      formData.append("description", form.description);
      formData.append("slots", form.slots);

      if (form.icon) {
        formData.append("icon", form.icon);
      }

      await createBatch({
        url: "/batch",
        data: formData,
        invalidatesTags: ["batch"],
      }).unwrap();

      toast.success("Batch created successfully");
      setForm(emptyForm);
    } catch (error) {
      showApiError(error);
    }
  };

  const openEdit = (batch: TBatch) => {
    setEditing(batch);
    setEditForm({
      title: batch.title,
      className: batch.className._id,
      price: String(batch.price),
      discountPersent: String(batch.discountPersent),
      description: batch.description,
      slots: batch.slots,
      icon: null,
    });
  };

  const handleUpdate = async () => {
    if (!editing) return;

    try {
      const formData = new FormData();

      formData.append("title", editForm.title);
      formData.append("className", editForm.className);
      formData.append("price", editForm.price);
      formData.append("discountPersent", editForm.discountPersent);
      formData.append("description", editForm.description);
      formData.append("slots", editForm.slots);

      if (editForm.icon) {
        formData.append("icon", editForm.icon);
      }

      await updateBatch({
        url: `/batch/${editing._id}`,
        data: formData,
        invalidatesTags: ["batch"],
      }).unwrap();

      toast.success("Batch updated successfully");
      setEditing(null);
    } catch (error) {
      showApiError(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this batch?");
    if (!confirmed) return;

    try {
      await deleteBatch({
        url: `/batch/${id}`,
        invalidatesTags: ["batch"],
      }).unwrap();
      toast.success("Batch deleted successfully");
    } catch (error) {
      showApiError(error);
    }
  };

  const discountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const joinWhatsApp = (batch: TBatch) => {
    const msg = encodeURIComponent(
      `Hi! I want to join "${batch.title}" (${batch.className.name}). Please share details.`,
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

  return (
    <div className="p-6 bg-[#0A0F0A] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">Batches</h1>
        <p className="text-[#A8C5A8] text-sm mb-8">
          Create batch courses. Students join via WhatsApp.
        </p>

        {/* Create Form */}
        <div className="bg-[#0F170F] border border-[#1F3521] w-full rounded-xl p-6 mb-6">
          <h2 className="font-bold text-[#E8F5E8] mb-5">Create Batch</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Batch Title
              </label>
              <input
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="e.g. SSC Math Batch"
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Class
              </label>
              <select
                value={form.className}
                onChange={(e) => updateForm("className", e.target.value)}
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Price (৳)
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => updateForm("price", e.target.value)}
                placeholder="e.g. 299"
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Discount (%)
              </label>
              <input
                type="number"
                value={form.discountPersent}
                onChange={(e) => updateForm("discountPersent", e.target.value)}
                placeholder="10"
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Available Slots
              </label>
              <input
                type="number"
                value={form.slots}
                onChange={(e) => updateForm("slots", e.target.value)}
                placeholder="e.g. 30"
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Icon (Image)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  updateForm("icon", e.target.files?.[0] || null)
                }
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[#A8C5A8] text-sm mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              rows={3}
              placeholder="What will students learn?"
              className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none resize-none"
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full py-2.5 bg-[#228B22] text-white font-semibold rounded-lg hover:bg-[#3DAA3D] transition-colors disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Batch"}
          </button>
        </div>

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="font-bold text-[#E8F5E8] mb-5">Edit Batch</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#A8C5A8] text-sm mb-1.5">
                    Batch Title
                  </label>
                  <input
                    value={editForm.title}
                    onChange={(e) => updateEditForm("title", e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#A8C5A8] text-sm mb-1.5">
                    Class
                  </label>
                  <select
                    value={editForm.className}
                    onChange={(e) =>
                      updateEditForm("className", e.target.value)
                    }
                    className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm"
                  >
                    {classes.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#A8C5A8] text-sm mb-1.5">
                    Price (৳)
                  </label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => updateEditForm("price", e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#A8C5A8] text-sm mb-1.5">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={editForm.discountPersent}
                    onChange={(e) =>
                      updateEditForm("discountPersent", e.target.value)
                    }
                    className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#A8C5A8] text-sm mb-1.5">
                    Available Slots
                  </label>
                  <input
                    type="number"
                    value={editForm.slots}
                    onChange={(e) => updateEditForm("slots", e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#A8C5A8] text-sm mb-1.5">
                    New Icon (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updateEditForm("icon", e.target.files?.[0] || null)
                    }
                    className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[#A8C5A8] text-sm mb-1.5">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    updateEditForm("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="flex-1 py-2.5 bg-[#228B22] text-white font-semibold rounded-lg hover:bg-[#3DAA3D] transition-colors disabled:opacity-50"
                >
                  {updating ? "Updating..." : "Update Batch"}
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="flex-1 py-2.5 bg-[#2A2A2A] text-[#E8F5E8] font-semibold rounded-lg hover:bg-[#3A3A3A] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Batches Grid */}
        {batches.length > 0 && (
          <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
            <h2 className="font-bold text-[#E8F5E8] mb-4">
              Active Batches ({batches.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {batches.map((b) => (
                <div
                  key={b._id}
                  className="bg-[#131A13] border border-[#1F3521] rounded-xl overflow-hidden hover:border-[#2E8B57] transition-all"
                >
                  {/* Image */}
                  <img
                    src={b.icon}
                    alt={b.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4 flex flex-col h-full">
                    {/* Class Badge & Slots */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-3 py-1 rounded-full text-xs bg-[#228B22]/20 text-[#3DAA3D]">
                        {b.className.name}
                      </span>

                      <span className="text-[#7A9A7A] text-xs">
                        {b.slots} Slots
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="font-bold text-[#E8F5E8] text-lg mb-2">
                      {b.title}
                    </h3>
                    {/* Description */}
                    <p className="text-[#A8C5A8] text-sm mb-4 ">
                      {b.description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[#3DAA3D] font-bold text-xl">
                        ৳{discountedPrice(b.price, b.discountPersent)}
                      </span>

                      {b.discountPersent > 0 && (
                        <>
                          <span className="text-gray-500 line-through text-sm">
                            ৳{b.price}
                          </span>

                          <span className="text-red-400 text-xs font-semibold">
                            {b.discountPersent}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    {/* Actions */}
                    <div className="flex gap-2 mb-3">
                      <button
                        className="flex-1 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition"
                        onClick={() => openEdit(b)}
                      >
                        Edit
                      </button>

                      <button
                        className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition"
                        onClick={() => handleDelete(b._id)}
                      >
                        Delete
                      </button>
                    </div>
                    {/* WhatsApp Button */}
                    <button
                      onClick={() => joinWhatsApp(b)}
                      className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-500 transition-colors"
                    >
                      💬 Join via WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {batches.length === 0 && !isLoading && (
          <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-12 text-center">
            <p className="text-[#A8C5A8]">
              No batches found. Create your first batch!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
