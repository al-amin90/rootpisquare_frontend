"use client";
import { getToken } from "@/src/utils/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "🏠" },
  { href: "/dashboard/classes", label: "Classes", icon: "🎓" },
  { href: "/dashboard/subjects", label: "Subjects", icon: "📚" },
  { href: "/dashboard/playlists", label: "Playlists", icon: "🎬" },
  { href: "/dashboard/videos", label: "Post Video", icon: "▶" },
  { href: "/dashboard/batches", label: "Batches", icon: "👥" },
  { href: "/dashboard/notes", label: "Notes", icon: "📝" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const token = getToken();
  if (pathname.startsWith("/dashboard") && !token) {
    return router.push("/lg");
  }

  console.log("token", token);

  return (
    <aside className="w-64 min-h-screen bg-[#051005] border-r border-[#1F3521] flex flex-col">
      <div className="p-5 border-b border-[#1F3521]">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#228B22]">√π²</span>
          <span className="font-bold text-[#E8F5E8] text-sm">
            Root Pi Square
          </span>
        </Link>
        <p className="text-[#7A9A7A] text-xs mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                active
                  ? "bg-[#228B22] text-white"
                  : "text-[#A8C5A8] hover:bg-[#131A13] hover:text-[#E8F5E8]"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1F3521]">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#7A9A7A] hover:text-[#3DAA3D] text-xs transition-colors"
        >
          ← Back to Site
        </Link>
      </div>
    </aside>
  );
}
