"use client";

import { useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import SidebarItem from "./SidebarItem";

interface SidebarGroupItem {
  title: string;
  href: string;
}

interface SidebarGroupProps {
  title: string;
  icon: LucideIcon;
  items: SidebarGroupItem[];
  defaultOpen?: boolean;
  onItemClick?: () => void;
}

export default function SidebarGroup({
  title,
  icon: Icon,
  items,
  defaultOpen = false,
  onItemClick,
}: SidebarGroupProps) {
  const pathname = usePathname();

  const hasActiveChild = items.some(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
  );

  const [manualOpen, setManualOpen] =
    useState(defaultOpen);

  const open = hasActiveChild || manualOpen;

  return (
    <div className="mb-2">
      {/* Group Header */}

      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() =>
          setManualOpen((prev) => !prev)
        }
        className={`
          relative
          flex
          w-full
          items-center
          justify-between
          overflow-hidden
          rounded-2xl
          border
          px-4
          py-3.5
          transition-all
          duration-300

          ${
            open
              ? `
                border-cyan-500/30
                bg-gradient-to-r
                from-cyan-500/20
                via-sky-500/15
                to-indigo-500/20
                shadow-[0_10px_30px_rgba(6,182,212,0.18)]
              `
              : `
                border-transparent
                hover:border-slate-700
                hover:bg-slate-800/60
              `
          }
        `}
      >
        {/* Glow */}

        {open && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-sky-500/5 to-indigo-500/5" />
        )}

        {/* Left */}

        <div className="relative flex min-w-0 items-center gap-3">
          <div
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              transition-all
              duration-300

              ${
                open
                  ? "bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/30"
                  : "bg-slate-800 group-hover:bg-slate-700"
              }
            `}
          >
            <Icon
              size={18}
              className={
                open
                  ? "text-white"
                  : "text-slate-400 group-hover:text-cyan-400"
              }
            />
          </div>

          <div className="min-w-0">
            <h3
              className={`
                truncate
                text-sm
                font-semibold
                tracking-wide

                ${
                  open
                    ? "text-white"
                    : "text-slate-300"
                }
              `}
            >
              {title}
            </h3>

            <p className="text-xs text-slate-500">
              {items.length} Sections
            </p>
          </div>
        </div>

        {/* Arrow */}

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className={`
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg

            ${
              open
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-slate-500"
            }
          `}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>

      {/* Children */}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="overflow-hidden"
          >
            <div className="relative ml-6 mt-3 space-y-2 pl-6">
              {/* Timeline */}

              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-500 via-sky-500 to-transparent" />

              {items.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onClick={onItemClick}
                >
                  {/* Dot */}

                  <div className="absolute -left-[27px] top-5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-cyan-400" />

                  <SidebarItem
                    title={item.title}
                    href={item.href}
                    isChild
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}