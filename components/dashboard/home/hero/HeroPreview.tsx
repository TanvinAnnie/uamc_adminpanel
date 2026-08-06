

"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface HeroPreviewProps {
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
}

export default function HeroPreview({
  tagline,
  title,
  highlightText,
  lastTitle,
  buttonText,
  backgroundImage,
  rightTitle,
  courseOneTitle,
  courseOneDescription,
  courseTwoTitle,
  courseTwoDescription,
}: HeroPreviewProps) {
  return (
    <div
      className="
        overflow-hidden

        rounded-[32px]

        border
        border-slate-800

        bg-slate-950

        shadow-[0_25px_70px_rgba(0,0,0,0.45)]
      "
    >
      {/* Header */}

      <div
        className="
          border-b
          border-slate-800

          bg-gradient-to-r
          from-slate-900
          via-slate-900
          to-slate-800

          px-6
          py-5
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-2xl

              bg-cyan-500/10

              text-cyan-400
            "
          >
            <Sparkles size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Live Preview
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Preview your hero section before publishing.
            </p>
          </div>
        </div>
      </div>

      {/* Hero */}

      <div className="relative overflow-hidden">

        {/* Background */}

        <div className="absolute inset-0">

          <Image
           src={
  backgroundImage ||
  "/images/hero-placeholder.jpg"
}
            alt="Hero Preview"
            fill
            className="object-cover"
          />

          <div
            className="
              absolute
              inset-0

              bg-gradient-to-r

              from-slate-950/90
              via-slate-900/70
              to-slate-950/60
            "
          />

          <div
            className="
              absolute
              inset-0

              bg-gradient-to-t

              from-black/80
              via-transparent
              to-black/20
            "
          />
        </div>

        {/* Content */}

        <div
          className="
            relative
            z-10

            mx-auto

            grid

            min-h-[760px]

            max-w-7xl

            gap-16

            px-6

            py-16

            lg:grid-cols-2

            lg:items-center
          "
        >

            {/* Left */}

            {/* Left */}

<motion.div
  initial={{
    opacity: 0,
    x: -40,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    duration: 0.7,
  }}
  className="flex flex-col justify-center"
>
  {/* Badge */}

  <div
    className="
      inline-flex
      w-fit
      items-center
      gap-2

      rounded-full

      border
      border-cyan-500/20

      bg-cyan-500/10

      px-5
      py-2.5

      backdrop-blur-xl
    "
  >
    <Sparkles
      size={16}
      className="text-cyan-400"
    />

    <span className="text-sm font-semibold text-cyan-300">
      {tagline || "Medical Education"}
    </span>
  </div>

  {/* Heading */}

  <h1
    className="
      mt-8

      text-4xl
      font-black
      leading-tight

      text-white

      sm:text-5xl

      lg:text-6xl
    "
  >
    {title || "Build Your"}

    <span
      className="
        block

        bg-gradient-to-r

        from-cyan-400
        via-sky-300
        to-indigo-400

        bg-clip-text

        text-transparent
      "
    >
      {highlightText || "Future"}
    </span>

    <span className="block">
      {lastTitle || "With Us"}
    </span>
  </h1>

  {/* Description */}

  <p
    className="
      mt-8

      max-w-xl

      text-base

      leading-8

      text-slate-300
    "
  >
    Experience world-class medical education with
    experienced faculty, advanced laboratories,
    innovative learning methods, and a modern
    healthcare environment.
  </p>

  {/* Buttons */}

  <div className="mt-10 flex flex-wrap gap-4">
    <button
      className="
        rounded-2xl

        bg-gradient-to-r
        from-cyan-500
        to-blue-600

        px-8
        py-4

        font-semibold
        text-white

        shadow-lg
        shadow-cyan-500/30

        transition-all
        duration-300

        hover:scale-105
      "
    >
      {buttonText || "Explore More"}
    </button>

    <button
      className="
        rounded-2xl

        border
        border-white/15

        bg-white/5

        px-8
        py-4

        font-semibold

        text-white

        backdrop-blur-xl

        transition-all

        hover:bg-white/10
      "
    >
      Learn More
    </button>
  </div>

  {/* Statistics */}

  <div className="mt-16 grid grid-cols-3 gap-4">

    <div
      className="
        rounded-2xl

        border
        border-white/10

        bg-white/5

        p-5

        backdrop-blur-xl
      "
    >
      <h3 className="text-3xl font-bold text-cyan-400">
        20+
      </h3>

      <p className="mt-2 text-sm text-slate-300">
        Departments
      </p>
    </div>

    <div
      className="
        rounded-2xl

        border
        border-white/10

        bg-white/5

        p-5

        backdrop-blur-xl
      "
    >
      <h3 className="text-3xl font-bold text-cyan-400">
        10K+
      </h3>

      <p className="mt-2 text-sm text-slate-300">
        Students
      </p>
    </div>

    <div
      className="
        rounded-2xl

        border
        border-white/10

        bg-white/5

        p-5

        backdrop-blur-xl
      "
    >
      <h3 className="text-3xl font-bold text-cyan-400">
        98%
      </h3>

      <p className="mt-2 text-sm text-slate-300">
        Success
      </p>
    </div>

  </div>
</motion.div>

            {/* Right */}

            {/* Right */}

<motion.div
  initial={{
    opacity: 0,
    x: 40,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    duration: 0.8,
    delay: 0.2,
  }}
  className="flex items-center justify-center"
>
  <div
    className="
      w-full
      max-w-lg

      rounded-[32px]

      border
      border-white/10

      bg-white/10

      p-8

      backdrop-blur-2xl

      shadow-[0_20px_60px_rgba(0,0,0,0.45)]
    "
  >
    {/* Header */}

    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-cyan-300">
          Featured Programs
        </p>

        <h3 className="mt-2 text-3xl font-bold text-white">
          {rightTitle || "Our Courses"}
        </h3>
      </div>

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center

          rounded-2xl

          bg-cyan-500/15

          text-cyan-400
        "
      >
        📚
      </div>
    </div>

    {/* Course One */}

    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
        mt-8

        rounded-3xl

        border
        border-white/10

        bg-slate-900/70

        p-6

        transition-all

        hover:border-cyan-400/30
      "
    >
      <div className="flex items-start gap-4">

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            bg-cyan-500/15

            text-2xl
          "
        >
          🩺
        </div>

        <div className="flex-1">

          <h4 className="text-xl font-bold text-white">
            {courseOneTitle || "MBBS Program"}
          </h4>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            {courseOneDescription ||
              "Professional medical education with advanced laboratories, modern teaching methods and experienced faculty members."}
          </p>

        </div>

      </div>
    </motion.div>

    {/* Course Two */}

    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
        mt-6

        rounded-3xl

        border
        border-white/10

        bg-slate-900/70

        p-6

        transition-all

        hover:border-cyan-400/30
      "
    >
      <div className="flex items-start gap-4">

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            bg-cyan-500/15

            text-2xl
          "
        >
          🏥
        </div>

        <div className="flex-1">

          <h4 className="text-xl font-bold text-white">
            {courseTwoTitle || "Nursing Program"}
          </h4>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            {courseTwoDescription ||
              "Build a successful healthcare career with practical training, hospital experience and expert guidance."}
          </p>

        </div>

      </div>
    </motion.div>

    {/* Bottom Info */}

    <div
      className="
        mt-8

        rounded-2xl

        bg-gradient-to-r
        from-cyan-500
        to-blue-600

        p-6

        text-white
      "
    >
      <p className="text-sm uppercase tracking-widest">
        Admission Open
      </p>

      <h4 className="mt-2 text-2xl font-bold">
        Join Our Medical Campus
      </h4>

      <p className="mt-3 text-sm leading-7 text-cyan-100">
        Start your journey with one of the most
        trusted medical institutions and shape
        your future today.
      </p>
    </div>
  </div>
</motion.div>

      </div>
    </div>
  </div>
);
}