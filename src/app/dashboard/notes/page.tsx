"use client";
import { useState } from "react";

type Note = {
  name: string;
  image: File | null;
  driveLink: string;
  preview?: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [form, setForm] = useState<Note>({
    name: "",
    image: null,
    driveLink: "",
  });

  const update = (k: keyof Note, v: string | File | null) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name || !form.driveLink) return;
    const preview = form.image ? URL.createObjectURL(form.image) : undefined;
    setNotes((prev) => [...prev, { ...form, preview }]);
    setForm({ name: "", image: null, driveLink: "" });
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">Notes</h1>
      <p className="text-[#A8C5A8] text-sm mb-8">
        Add study notes. Clicking opens Google Drive link.
      </p>

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 mb-6 max-w-lg">
        <h2 className="font-bold text-[#E8F5E8] mb-5">Add Note</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[#A8C5A8] text-sm mb-1.5">
              Note Name
            </label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
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
              onChange={(e) => update("image", e.target.files?.[0] || null)}
              className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#A8C5A8] rounded-lg text-xs file:mr-2 file:bg-[#228B22] file:text-white file:border-0 file:rounded file:px-2 file:py-1 file:text-xs file:cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-[#A8C5A8] text-sm mb-1.5">
              Google Drive Link
            </label>
            <input
              value={form.driveLink}
              onChange={(e) => update("driveLink", e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
            />
          </div>
          <button
            onClick={submit}
            className="w-full py-2.5 bg-[#228B22] text-white font-semibold rounded-lg hover:bg-[#3DAA3D] transition-colors"
          >
            Add Note
          </button>
        </div>
      </div>

      {notes.length > 0 && (
        <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
          <h2 className="font-bold text-[#E8F5E8] mb-4">
            Notes ({notes.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {notes.map((note, i) => (
              <a
                key={i}
                href={note.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-[#131A13] border-2 border-[#1F3521] rounded-xl hover:border-[#228B22] hover:scale-105 transition-all cursor-pointer"
              >
                {note.preview ? (
                  <img
                    src={note.preview}
                    alt={note.name}
                    className="w-16 h-16 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <span className="text-4xl mb-2">📝</span>
                )}
                <span className="font-semibold text-[#E8F5E8] text-xs text-center">
                  {note.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
