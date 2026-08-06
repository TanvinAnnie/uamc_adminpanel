"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfileDropdown() {
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

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
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Profile Button */}

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          group
          flex
          items-center
          gap-3

          rounded-2xl

          border
          border-slate-700

          bg-gradient-to-r
          from-slate-900
          via-slate-800
          to-slate-900

          px-3
          py-2

          shadow-[0_8px_25px_rgba(0,0,0,0.35)]

          transition-all
          duration-300

          hover:border-cyan-400/50
          hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]
        "
      >
        {/* Avatar */}

        <div className="relative">
          <Image
            src="/avatar.png"
            alt="Administrator"
            width={44}
            height={44}
            className="rounded-full border-2 border-cyan-400 object-cover"
          />

          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-green-500" />
        </div>

        {/* Info */}

        <div className="hidden text-left lg:block">
          <h3 className="text-sm font-semibold text-white">
            Administrator
          </h3>

          <p className="text-xs text-slate-400">
            admin@uamc.edu.bd
          </p>
        </div>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronDown
            size={18}
            className="hidden text-slate-400 lg:block"
          />
        </motion.div>
      </motion.button>

      {/* Dropdown */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              absolute
              right-0
              mt-4

              w-72

              overflow-hidden

              rounded-3xl

              border
              border-slate-700

              bg-slate-900/95

              backdrop-blur-2xl

              shadow-[0_20px_50px_rgba(0,0,0,0.45)]

              max-sm:w-[300px]
            "
          >
            {/* Header */}

            <div className="border-b border-slate-800 p-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/avatar.png"
                  alt="Administrator"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-cyan-400"
                />

                <div>
                  <h3 className="font-semibold text-white">
                    Administrator
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    admin@uamc.edu.bd
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}

            <div className="p-3 space-y-2">
              <Link
                href="/dashboard/profile"
                className="
                  flex
                  items-center
                  gap-3

                  rounded-xl

                  px-4
                  py-3

                  text-sm
                  text-slate-300

                  transition-all

                  hover:bg-slate-800
                  hover:text-cyan-400
                "
              >
                <User size={18} />

                My Profile
              </Link>

              <Link
                href="/dashboard/settings"
                className="
                  flex
                  items-center
                  gap-3

                  rounded-xl

                  px-4
                  py-3

                  text-sm
                  text-slate-300

                  transition-all

                  hover:bg-slate-800
                  hover:text-cyan-400
                "
              >
                <Settings size={18} />

                Settings
              </Link>

              <button
                type="button"
                disabled={loading}
                onClick={handleLogout}
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
                  text-red-400

                  transition-all

                  hover:bg-red-500/10
                  hover:text-red-300

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

                {loading
                  ? "Logging out..."
                  : "Logout"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}