"use client";
import { useState } from "react";

export default function ClassesPage() {
  const [classes, setClasses] = useState<string[]>([]);
  const [name, setName] = useState("");

  const add = () => {
    if (!name.trim()) return;
    setClasses((prev) => [...prev, name.trim()]);
    setName("");
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">Classes</h1>
      <p className="text-[#A8C5A8] text-sm mb-8">
        Add and manage classes (e.g. Class 7)
      </p>

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 mb-6 max-w-md">
        <h2 className="font-bold text-[#E8F5E8] mb-4">Add New Class</h2>
        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="e.g. Class 7"
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
          All Classes ({classes.length})
        </h2>
        {classes.length === 0 ? (
          <p className="text-[#7A9A7A] text-sm">No classes added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {classes.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-[#131A13] border border-[#1F3521] rounded-lg"
              >
                <span className="text-[#3DAA3D] text-sm font-semibold">
                  🎓 {c}
                </span>
                <button
                  onClick={() =>
                    setClasses((prev) => prev.filter((_, j) => j !== i))
                  }
                  className="text-[#7A9A7A] hover:text-red-400 transition-colors text-xs"
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
