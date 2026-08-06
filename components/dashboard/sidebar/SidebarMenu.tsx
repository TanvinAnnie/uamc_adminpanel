"use client";

import { sidebarMenu } from "@/lib/constants/sidebar-menu";

import SidebarGroup from "./SidebarGroup";
import SidebarItem from "./SidebarItem";

interface SidebarMenuProps {
  onItemClick?: () => void;
}

export default function SidebarMenu({
  onItemClick,
}: SidebarMenuProps) {
  return (
    <nav
      className="
        space-y-3
        rounded-2xl
        border
        border-white/5
        bg-white/[0.03]
        p-3
        backdrop-blur-xl
      "
    >
      {sidebarMenu.map((item) => {
        if ("items" in item) {
          return (
            <SidebarGroup
  key={item.title}
  title={item.title}
  icon={item.icon}
  items={item.items}
  onItemClick={onItemClick}
/>
          );
        }

        return (
          <div
            key={item.title}
            onClick={onItemClick}
          >
            <SidebarItem
              title={item.title}
              href={item.href}
              icon={item.icon}
            />
          </div>
        );
      })}
    </nav>
  );
}