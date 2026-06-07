"use client";
import { useState } from "react";

export default function SubjectsPage() {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState<{ name: string }[]>([]);

  const add = () => {
    if (!name.trim()) return;
    setSubjects((prev) => [...prev, { name: name.trim() }]);
    setName("");
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">Subjects</h1>
      <p className="text-[#A8C5A8] text-sm mb-8">
        Add subjects like Bangla, Math, Physics
      </p>

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 mb-6 max-w-md">
        <h2 className="font-bold text-[#E8F5E8] mb-4">Add New Subject</h2>
        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="e.g. Bangla"
            className="flex-1 px-4 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
          />
          <button
            onClick={add}
            className="px-5 py-2.5 bg-[#228B22] text-white rounded-lg font-semibold text-sm hover:bg-[#3DAA3D] transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
        <h2 className="font-bold text-[#E8F5E8] mb-4">
          All Subjects ({subjects.length})
        </h2>
        {subjects.length === 0 ? (
          <p className="text-[#7A9A7A] text-sm">No subjects yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {subjects.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-[#131A13] border border-[#1F3521] rounded-lg"
              >
                <span className="text-[#E8F5E8] text-sm font-medium">
                  📚 {s.name}
                </span>
                <button
                  onClick={() =>
                    setSubjects((prev) => prev.filter((_, j) => j !== i))
                  }
                  className="text-[#7A9A7A] hover:text-red-400 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
