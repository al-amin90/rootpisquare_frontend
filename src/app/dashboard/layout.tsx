import ProtectedRoute from "@/src/provider/ProtectedRoute";
import Sidebar from "../../components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0A0F0A]">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
        {/* <ProtectedRoute>{children}</ProtectedRoute> */}
      </main>
    </div>
  );
}
