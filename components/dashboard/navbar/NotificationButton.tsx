"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  CheckCheck,
  Circle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationButton() {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Notification Button */}

      <motion.button
        whileHover={{
          scale: 1.08,
          rotate: 8,
        }}
        whileTap={{
          scale: 0.95,
        }}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
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
        "
      >
        {/* Glow */}

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

        <Bell
          size={20}
          className="relative z-10 transition-transform duration-300 group-hover:rotate-12"
        />

        {/* Badge */}

        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/40" />

          <span className="relative flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-slate-900" />
        </span>
      </motion.button>

      {/* Dropdown */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 12,
              scale: 0.98,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              absolute
              right-0
              mt-4
              w-[340px]
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

            <div
              className="
                flex
                items-center
                justify-between

                border-b
                border-slate-800

                px-6
                py-5
              "
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Notifications
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Stay updated with recent activities
                </p>
              </div>

              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-2

                  rounded-xl

                  bg-cyan-500/10

                  px-3
                  py-2

                  text-xs
                  font-medium

                  text-cyan-400

                  transition

                  hover:bg-cyan-500/20
                "
              >
                <CheckCheck size={15} />

                Mark Read
              </button>
            </div>

            {/* Body */}

            <div className="max-h-96 overflow-y-auto">
              <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
                <div
                  className="
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center

                    rounded-full

                    bg-slate-800
                  "
                >
                  <Bell
                    size={28}
                    className="text-slate-500"
                  />
                </div>

                <h4 className="text-base font-semibold text-white">
                  You are all caught up!
                </h4>

                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
                  No new notifications at the
                  moment. We will notify you when
                  something important happens.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                  <Circle
                    size={8}
                    className="fill-green-500 text-green-500"
                  />

                  System running normally
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}