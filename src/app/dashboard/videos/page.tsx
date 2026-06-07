"use client";
import { useState } from "react";

const mockClasses = [
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "HSC 1st Year",
  "HSC 2nd Year",
];
const mockSubjects = [
  "Bangla",
  "English",
  "Math",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Higher Math",
];

type Video = {
  className: string;
  subjectName: string;
  youtubeURL: string;
  name: string;
};

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [form, setForm] = useState<Video>({
    className: "",
    subjectName: "",
    youtubeURL: "",
    name: "",
  });

  const update = (key: keyof Video, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const submit = () => {
    if (!form.className || !form.subjectName || !form.youtubeURL || !form.name)
      return;
    setVideos((prev) => [...prev, form]);
    setForm({ className: "", subjectName: "", youtubeURL: "", name: "" });
  };

  const getThumb = (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/)([^&?]+)/);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`
      : null;
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">
        Post Video
      </h1>
      <p className="text-[#A8C5A8] text-sm mb-8">
        Add YouTube videos to your classes
      </p>

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-[#E8F5E8] mb-5">Add Video</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Class
              </label>
              <select
                value={form.className}
                onChange={(e) => update("className", e.target.value)}
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              >
                <option value="">Select</option>
                {mockClasses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Subject
              </label>
              <select
                value={form.subjectName}
                onChange={(e) => update("subjectName", e.target.value)}
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              >
                <option value="">Select</option>
                {mockSubjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[#A8C5A8] text-sm mb-1.5">
              Video Name
            </label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Chapter 1 - Introduction"
              className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#A8C5A8] text-sm mb-1.5">
              YouTube URL
            </label>
            <input
              value={form.youtubeURL}
              onChange={(e) => update("youtubeURL", e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
            />
          </div>
          {form.youtubeURL && getThumb(form.youtubeURL) && (
            <img
              src={getThumb(form.youtubeURL)!}
              alt="thumb"
              className="w-full rounded-lg"
            />
          )}
          <button
            onClick={submit}
            className="w-full py-2.5 bg-[#228B22] text-white font-semibold rounded-lg hover:bg-[#3DAA3D] transition-colors"
          >
            Post Video
          </button>
        </div>
      </div>

      {videos.length > 0 && (
        <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
          <h2 className="font-bold text-[#E8F5E8] mb-4">
            Posted Videos ({videos.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map((v, i) => (
              <div
                key={i}
                className="bg-[#131A13] border border-[#1F3521] rounded-xl overflow-hidden"
              >
                {getThumb(v.youtubeURL) && (
                  <img
                    src={getThumb(v.youtubeURL)!}
                    alt={v.name}
                    className="w-full"
                  />
                )}
                <div className="p-3">
                  <h3 className="font-bold text-[#E8F5E8] text-sm mb-1">
                    {v.name}
                  </h3>
                  <div className="flex gap-2 text-xs text-[#7A9A7A]">
                    <span>🎓 {v.className}</span>
                    <span>📚 {v.subjectName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
