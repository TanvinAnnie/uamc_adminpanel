"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import { useDashboard } from "@/context/DashboardContext";

export default function MobileMenuButton() {
  const { openSidebar } = useDashboard();

  return (
    <motion.button
      type="button"
      onClick={openSidebar}
      aria-label="Open sidebar"
      whileHover={{
        scale: 1.08,
        rotate: 5,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
        group
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        overflow-hidden
        rounded-2xl

        border
        border-slate-700

        bg-gradient-to-br
        from-slate-900
        via-slate-800
        to-slate-900

        text-slate-300

        shadow-[0_8px_25px_rgba(0,0,0,0.35)]

        transition-all
        duration-300

        hover:border-cyan-400/50
        hover:text-cyan-400
        hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]

        active:scale-95

        lg:hidden
      "
    >
      {/* Hover Glow */}

      <div
        className="
          absolute
          inset-0
          rounded-2xl

          bg-gradient-to-r
          from-cyan-500/0
          via-cyan-500/10
          to-indigo-500/0

          opacity-0
          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      {/* Icon */}

      <Menu
        size={22}
        className="
          relative
          z-10
          transition-transform
          duration-300

          group-hover:rotate-90
        "
      />
    </motion.button>
  );
}