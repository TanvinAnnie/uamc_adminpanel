"use client";

import { motion } from "framer-motion";

import SearchBox from "./SearchBox";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenuButton from "./MobileMenuButton";
import Breadcrumb from "./Breadcrumb";

export default function Navbar() {
  return (
    <header
      className="
        fixed
        top-0
        right-0
        left-0
        z-30
        h-20
        lg:left-72

        border-b
        border-slate-800

        bg-slate-950/85
        backdrop-blur-2xl

        shadow-[0_8px_30px_rgba(0,0,0,0.35)]
      "
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-24 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}

        <div className="flex min-w-0 items-center gap-4">
          <MobileMenuButton />

          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="min-w-0"
          >
            <Breadcrumb />
          </motion.div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Search */}

          <div className="hidden lg:block">
            <SearchBox />
          </div>

          <NotificationButton />

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}