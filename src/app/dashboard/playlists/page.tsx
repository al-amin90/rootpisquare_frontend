"use client";
import { useState } from "react";

const mockClasses = [
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
];
const mockSubjects = [
  "Bangla",
  "Math",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
];

type SubjectEntry = {
  subjectName: string;
  image: File | null;
  description: string;
};
type Playlist = { className: string; subjects: SubjectEntry[] };

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [form, setForm] = useState<Playlist>({
    className: "",
    subjects: [{ subjectName: "", image: null, description: "" }],
  });

  const addSubjectRow = () =>
    setForm((f) => ({
      ...f,
      subjects: [
        ...f.subjects,
        { subjectName: "", image: null, description: "" },
      ],
    }));

  const updateSubject = (
    i: number,
    key: keyof SubjectEntry,
    value: string | File | null,
  ) => {
    setForm((f) => {
      const subjects = [...f.subjects];
      subjects[i] = { ...subjects[i], [key]: value };
      return { ...f, subjects };
    });
  };

  const submit = () => {
    if (!form.className) return;
    setPlaylists((prev) => [...prev, form]);
    setForm({
      className: "",
      subjects: [{ subjectName: "", image: null, description: "" }],
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">
        Make Playlist
      </h1>
      <p className="text-[#A8C5A8] text-sm mb-8">
        Create playlists by class & subject
      </p>

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 mb-6">
        <h2 className="font-bold text-[#E8F5E8] mb-5">New Playlist</h2>

        <div className="mb-4">
          <label className="block text-[#A8C5A8] text-sm mb-1.5">Class</label>
          <select
            value={form.className}
            onChange={(e) =>
              setForm((f) => ({ ...f, className: e.target.value }))
            }
            className="w-full max-w-xs px-4 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
          >
            <option value="">Select Class</option>
            {mockClasses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4 mb-5">
          {form.subjects.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-[#131A13] rounded-lg border border-[#1F3521]"
            >
              <select
                value={s.subjectName}
                onChange={(e) =>
                  updateSubject(i, "subjectName", e.target.value)
                }
                className="px-3 py-2 bg-[#051005] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              >
                <option value="">Subject</option>
                {mockSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  updateSubject(i, "image", e.target.files?.[0] || null)
                }
                className="px-3 py-2 bg-[#051005] border border-[#1F3521] text-[#A8C5A8] rounded-lg text-xs focus:border-[#228B22] focus:outline-none file:mr-2 file:bg-[#228B22] file:text-white file:border-0 file:rounded file:px-2 file:py-1 file:text-xs"
              />
              <input
                value={s.description}
                onChange={(e) =>
                  updateSubject(i, "description", e.target.value)
                }
                placeholder="Description"
                className="px-3 py-2 bg-[#051005] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={addSubjectRow}
            className="px-4 py-2 border border-[#1F551F] text-[#A8C5A8] rounded-lg text-sm hover:border-[#228B22] hover:text-[#E8F5E8] transition-all"
          >
            + Add Subject Row
          </button>
          <button
            onClick={submit}
            className="px-6 py-2 bg-[#228B22] text-white rounded-lg font-semibold text-sm hover:bg-[#3DAA3D] transition-colors"
          >
            Create Playlist
          </button>
        </div>
      </div>

      {playlists.length > 0 && (
        <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
          <h2 className="font-bold text-[#E8F5E8] mb-4">
            Playlists ({playlists.length})
          </h2>
          <div className="space-y-4">
            {playlists.map((p, i) => (
              <div
                key={i}
                className="p-4 bg-[#131A13] rounded-lg border border-[#1F3521]"
              >
                <h3 className="font-bold text-[#3DAA3D] mb-2">
                  🎬 {p.className}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {p.subjects.map((s, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-[#0F170F] border border-[#1F3521] rounded text-[#A8C5A8] text-xs"
                    >
                      {s.subjectName}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
