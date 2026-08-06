"use client";

import { sidebarMenu } from "@/lib/constants/sidebar-menu";

import SidebarHeader from "./SidebarHeader";
import SidebarGroup from "./SidebarGroup";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar() {
  return (
    <aside
      className="
        hidden
        lg:flex
        fixed
        left-0
        top-0
        z-40
        h-screen
        w-72
        flex-col
        overflow-hidden
        border-r
        border-slate-800
        bg-gradient-to-b
        from-slate-950
        via-slate-900
        to-slate-950
        shadow-[0_0_40px_rgba(0,0,0,0.45)]
      "
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <SidebarHeader />
      </div>

      {/* Navigation */}
      <div
        className="
          relative
          z-10
          flex-1
          overflow-y-auto
          px-4
          py-6

          scrollbar-thin
          scrollbar-thumb-slate-700
          scrollbar-track-transparent
        "
      >
        <nav className="space-y-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 backdrop-blur-xl">
          {sidebarMenu.map((item) => {
            if ("items" in item) {
              return (
                <SidebarGroup
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  items={item.items}
                  defaultOpen={item.title === "Home"}
                />
              );
            }

            return (
              <SidebarItem
                key={item.title}
                title={item.title}
                href={item.href}
                icon={item.icon}
              />
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <SidebarFooter />
      </div>
    </aside>
  );
}