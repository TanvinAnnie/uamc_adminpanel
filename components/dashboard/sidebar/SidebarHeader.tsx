"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SidebarHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 -left-10 h-32 w-32 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Link href="/dashboard" className="block">
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            duration: 0.25,
          }}
          className="relative flex items-center gap-4 px-6 py-5"
        >
          {/* Logo */}
          <div
            className="
              relative
              flex
              h-16
              w-16
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              bg-gradient-to-br
              from-cyan-500
              via-sky-500
              to-indigo-600
              shadow-[0_12px_30px_rgba(6,182,212,0.35)]
            "
          >
            <div className="absolute inset-0 rounded-2xl border border-white/10" />

            <Image
              src="/logo.png"
              alt="UAMC Logo"
              width={40}
              height={40}
              priority
              className="relative z-10 object-contain"
            />
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold tracking-wide text-white">
              UAMC
            </h1>

            <p className="mt-1 truncate text-sm text-slate-400">
              Admin Dashboard
            </p>
          </div>
        </motion.div>
      </Link>
    </header>
  );
}