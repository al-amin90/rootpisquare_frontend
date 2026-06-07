const stats = [
  { label: "Classes", value: "0", icon: "🎓" },
  { label: "Subjects", value: "0", icon: "📚" },
  { label: "Playlists", value: "0", icon: "🎬" },
  { label: "Videos", value: "0", icon: "▶" },
  { label: "Batches", value: "0", icon: "👥" },
  { label: "Notes", value: "0", icon: "📝" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">
        Dashboard Overview
      </h1>
      <p className="text-[#A8C5A8] text-sm mb-8">
        Manage your educational content
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-5 hover:border-[#228B22] transition-all"
          >
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-2xl font-extrabold text-[#228B22] mb-1">
              {s.value}
            </div>
            <div className="text-[#A8C5A8] text-sm font-semibold">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
        <h2 className="font-bold text-[#E8F5E8] mb-2">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/dashboard/classes", label: "+ Add Class" },
            { href: "/dashboard/subjects", label: "+ Add Subject" },
            { href: "/dashboard/videos", label: "+ Post Video" },
            { href: "/dashboard/notes", label: "+ Add Note" },
          ].map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="px-4 py-2 bg-[#228B22] text-white rounded-lg text-sm font-semibold hover:bg-[#3DAA3D] transition-colors"
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
