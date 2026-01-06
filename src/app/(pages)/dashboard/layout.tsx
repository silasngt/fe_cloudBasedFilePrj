import Sidebar from '@/app/components/sidebar/SideBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#020617] via-[#1e3a8a] to-[#0ea5e9]">
        <Sidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-10">{children}</div>
        </main>
      </div>
    </>
  );
}
