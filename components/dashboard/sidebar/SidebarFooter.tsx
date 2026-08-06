"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Settings,
  Loader2,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function SidebarFooter() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-slate-800 bg-slate-950/90 p-4 backdrop-blur-xl">
      {/* Profile */}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        className="
          group
          relative
          flex
          w-full
          items-center
          gap-3
          overflow-hidden
          rounded-2xl
          border
          border-slate-700
          bg-gradient-to-r
          from-slate-900
          via-slate-800
          to-slate-900
          p-3
          transition-all
          duration-300
          hover:border-cyan-400/40
          hover:shadow-[0_0_25px_rgba(6,182,212,0.20)]
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Avatar */}

        <div className="relative z-10">
          <Image
            src="/avatar.png"
            alt="Admin"
            width={50}
            height={50}
            className="rounded-full border-2 border-cyan-400 object-cover"
          />

          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-green-500" />
        </div>

        {/* Info */}

        <div className="relative z-10 flex-1 overflow-hidden text-left">
          <h3 className="truncate text-sm font-semibold text-white">
            Administrator
          </h3>

          <p className="truncate text-xs text-slate-400">
            admin@uamc.edu.bd
          </p>
        </div>

        {/* Arrow */}

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="relative z-10 text-slate-400"
        >
          <ChevronUp size={18} />
        </motion.div>
      </motion.button>

      {/* Dropdown */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mt-3 space-y-2"
          >
            {/* Settings */}

            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                border
                border-slate-700
                bg-slate-900/60
                px-4
                py-3
                text-sm
                font-medium
                text-slate-300
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:bg-slate-800
                hover:text-cyan-400
              "
            >
              <Settings size={18} />

              Settings
            </motion.button>

            {/* Logout */}

            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              disabled={loading}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                border
                border-red-500/20
                bg-red-500/5
                px-4
                py-3
                text-sm
                font-medium
                text-red-400
                transition-all
                duration-300
                hover:bg-red-500/10
                hover:text-red-300
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <LogOut size={18} />
              )}

              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}