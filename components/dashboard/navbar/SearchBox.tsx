"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBox() {
  return (
    <>
      {/* Desktop Search */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative hidden xl:block"
      >
        <Search
          size={18}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            z-10
            -translate-y-1/2
            text-slate-500
          "
        />

        <input
          type="text"
          placeholder="Search pages, notices, careers..."
          className="
            h-12
            w-80
            rounded-2xl

            border
            border-slate-700

            bg-slate-900/70

            pl-12
            pr-4

            text-sm
            text-white

            placeholder:text-slate-500

            backdrop-blur-xl

            outline-none

            transition-all
            duration-300

            hover:border-slate-600

            focus:border-cyan-400
            focus:bg-slate-900
            focus:ring-4
            focus:ring-cyan-500/20
          "
        />

        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-indigo-500/0 opacity-0 transition-opacity duration-300 focus-within:opacity-100" />
      </motion.div>

      {/* Tablet Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative hidden md:block xl:hidden"
      >
        <Search
          size={18}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            z-10
            -translate-y-1/2
            text-slate-500
          "
        />

        <input
          type="text"
          placeholder="Search..."
          className="
            h-12
            w-56
            rounded-2xl

            border
            border-slate-700

            bg-slate-900/70

            pl-12
            pr-4

            text-sm
            text-white

            placeholder:text-slate-500

            backdrop-blur-xl

            outline-none

            transition-all
            duration-300

            hover:border-slate-600

            focus:border-cyan-400
            focus:bg-slate-900
            focus:ring-4
            focus:ring-cyan-500/20
          "
        />

        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-indigo-500/0 opacity-0 transition-opacity duration-300 focus-within:opacity-100" />
      </motion.div>

      {/* Mobile Search */}
      <motion.button
        whileHover={{
          scale: 1.08,
          rotate: 5,
        }}
        whileTap={{
          scale: 0.95,
        }}
        type="button"
        aria-label="Search"
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

          md:hidden
        "
      >
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

        <Search
          size={20}
          className="relative z-10 transition-transform duration-300 group-hover:rotate-12"
        />
      </motion.button>
    </>
  );
}