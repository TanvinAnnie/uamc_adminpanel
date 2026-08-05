import type { ReactNode } from "react";

import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Navbar from "@/components/dashboard/navbar/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-72 min-h-screen">
        <Navbar />

        <main className="px-8 pb-8 pt-24">
          {children}
        </main>
      </div>
    </div>
  );
}