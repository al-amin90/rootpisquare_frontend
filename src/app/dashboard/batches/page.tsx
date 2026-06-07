"use client";
import { useState } from "react";

const WHATSAPP = "8801758055533";
type Batch = {
  title: string;
  className: string;
  price: string;
  description: string;
  slots: string;
};

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [form, setForm] = useState<Batch>({
    title: "",
    className: "",
    price: "",
    description: "",
    slots: "",
  });

  const update = (k: keyof Batch, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.title || !form.className) return;
    setBatches((prev) => [...prev, form]);
    setForm({
      title: "",
      className: "",
      price: "",
      description: "",
      slots: "",
    });
  };

  const joinWhatsApp = (batch: Batch) => {
    const msg = encodeURIComponent(
      `Hi! I want to join "${batch.title}" (${batch.className}). Please share details.`,
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">Batches</h1>
      <p className="text-[#A8C5A8] text-sm mb-8">
        Create batch courses. Students join via WhatsApp.
      </p>

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 mb-6 max-w-2xl">
        <h2 className="font-bold text-[#E8F5E8] mb-5">Create Batch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            {
              key: "title",
              label: "Batch Title",
              placeholder: "e.g. SSC Math Batch",
            },
            {
              key: "className",
              label: "Class",
              placeholder: "e.g. Class 9-10",
            },
            { key: "price", label: "Price", placeholder: "e.g. ৳299/month" },
            { key: "slots", label: "Available Slots", placeholder: "e.g. 30" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                {f.label}
              </label>
              <input
                value={form[f.key as keyof Batch]}
                onChange={(e) => update(f.key as keyof Batch, e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-[#A8C5A8] text-sm mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            placeholder="What will students learn?"
            className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none resize-none"
          />
        </div>
        <button
          onClick={submit}
          className="w-full py-2.5 bg-[#228B22] text-white font-semibold rounded-lg hover:bg-[#3DAA3D] transition-colors"
        >
          Create Batch
        </button>
      </div>

      {batches.length > 0 && (
        <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
          <h2 className="font-bold text-[#E8F5E8] mb-4">
            Active Batches ({batches.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {batches.map((b, i) => (
              <div
                key={i}
                className="bg-[#131A13] border border-[#1F3521] rounded-xl p-4 flex flex-col"
              >
                <h3 className="font-bold text-[#E8F5E8] mb-1">{b.title}</h3>
                <span className="text-[#3DAA3D] text-xs mb-2">
                  {b.className}
                </span>
                <p className="text-[#A8C5A8] text-sm flex-1 mb-3">
                  {b.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#228B22] font-bold">{b.price}</span>
                  <span className="text-[#7A9A7A] text-xs">
                    {b.slots} slots
                  </span>
                </div>
                <button
                  onClick={() => joinWhatsApp(b)}
                  className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-500 transition-colors"
                >
                  💬 Join via WhatsApp
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
