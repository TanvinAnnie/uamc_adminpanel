"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarItemProps {
  title: string;
  href: string;
  icon?: LucideIcon;
  isChild?: boolean;
}

export default function SidebarItem({
  title,
  href,
  icon: Icon,
  isChild = false,
}: SidebarItemProps) {
  const pathname = usePathname();

  const isActive =
    pathname === href ||
    pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
    >
      <motion.div
        whileHover={{
          x: 6,
          scale: 1.01,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration: 0.2,
        }}
        className={`
          group
          relative
          flex
          items-center
          gap-3
          overflow-hidden
          rounded-2xl
          transition-all
          duration-300

          ${
            isChild
              ? "ml-6 px-4 py-2.5"
              : "px-4 py-3.5"
          }

          ${
            isActive
              ? `
                bg-gradient-to-r
                from-cyan-500
                via-sky-500
                to-indigo-600
                text-white
                shadow-[0_10px_30px_rgba(6,182,212,0.35)]
              `
              : `
                text-slate-300
                hover:bg-slate-800/70
                hover:text-white
              `
          }
        `}
      >
        {/* Active Glow */}
        {isActive && (
          <div className="absolute inset-0 rounded-2xl border border-cyan-300/30" />
        )}

        {/* Left Active Indicator */}
        {isActive && (
          <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
        )}

        {/* Icon */}
        {Icon && (
          <div
            className={`
              flex
              h-10
              w-10
              flex-shrink-0
              items-center
              justify-center
              rounded-xl
              transition-all
              duration-300

              ${
                isActive
                  ? "bg-white/20"
                  : "bg-slate-800 group-hover:bg-slate-700"
              }
            `}
          >
            <Icon
              size={18}
              className={
                isActive
                  ? "text-white"
                  : "text-slate-400 group-hover:text-cyan-400"
              }
            />
          </div>
        )}

        {/* Title */}
        <span
          className="
            flex-1
            truncate
            text-sm
            font-medium
            tracking-wide
          "
        >
          {title}
        </span>

        {/* Hover Glow */}
        {!isActive && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}
      </motion.div>
    </Link>
  );
}