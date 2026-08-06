"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";
import { motion } from "framer-motion";

interface Hero {
  _id: string;
  tagline: string;
  title: string;
  highlightText: string;
  lastTitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  rightTitle: string;
  courseOneTitle: string;
  courseOneDescription: string;
  courseTwoTitle: string;
  courseTwoDescription: string;
  slideNumber: number;
  isActive: boolean;
  createdAt: string;
}

interface HeroTableRowProps {
  hero: Hero;
  onDelete: (id: string) => void;
}

export default function HeroTableRow({
  hero,
  onDelete,
}: HeroTableRowProps) {
  return (
    <motion.tr
      layout
      whileHover={{
        backgroundColor: "rgba(15,23,42,0.55)",
      }}
      className="
        border-b
        border-slate-800
        transition-all
      "
    >
      {/* Image */}

      <td className="px-6 py-5">
        <div className="relative group">

          <div
            className="
              relative
              h-20
              w-36
              overflow-hidden
              rounded-2xl

              border
              border-slate-700

              bg-slate-900
            "
          >
            <Image
              src={hero.backgroundImage}
              alt={hero.title}
              fill
              className="
                object-cover
                transition
                duration-500
                group-hover:scale-110
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div
            className="
              absolute
              left-3
              top-3

              rounded-full

              bg-cyan-500

              px-2.5
              py-1

              text-[10px]
              font-bold

              text-white
            "
          >
            #{hero.slideNumber}
          </div>

        </div>
      </td>

      {/* Title */}

      <td className="px-6 py-5">

        <div className="space-y-2">

          <h3 className="text-base font-bold text-white">
            {hero.title}
          </h3>

          <p className="line-clamp-2 max-w-sm text-sm text-slate-400">
            {hero.tagline}
          </p>

        </div>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        {hero.isActive ? (
          <span
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-emerald-500/20

              bg-emerald-500/10

              px-4
              py-2

              text-xs
              font-semibold

              text-emerald-400
            "
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Active
          </span>
        ) : (
          <span
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-red-500/20

              bg-red-500/10

              px-4
              py-2

              text-xs
              font-semibold

              text-red-400
            "
          >
            <span className="h-2 w-2 rounded-full bg-red-400" />
            Inactive
          </span>
        )}

      </td>

      {/* Created */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2 text-slate-400">

          <CalendarDays size={16} />

          <span className="text-sm">
            {new Date(hero.createdAt).toLocaleDateString()}
          </span>

        </div>

      </td>

      {/* Actions */}

      <td className="px-6 py-5">

        <div className="flex items-center justify-center gap-3">

          <Link href={`/dashboard/home/hero/edit/${hero._id}`}>

            <motion.div
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-xl

                border
                border-cyan-500/20

                bg-cyan-500/10

                text-cyan-400

                transition

                hover:bg-cyan-500
                hover:text-white
              "
            >
              <Pencil size={18} />
            </motion.div>

          </Link>

          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => onDelete(hero._id)}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-xl

              border
              border-red-500/20

              bg-red-500/10

              text-red-400

              transition

              hover:bg-red-500
              hover:text-white
            "
          >
            <Trash2 size={18} />
          </motion.button>

        </div>

      </td>

    </motion.tr>
  );
}