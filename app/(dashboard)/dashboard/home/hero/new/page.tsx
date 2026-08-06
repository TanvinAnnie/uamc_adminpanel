import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import HeroForm from "@/components/dashboard/home/hero/HeroForm";

export default function NewHeroPage() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div
        className="
          overflow-hidden
          rounded-[30px]
          border
          border-slate-800
          bg-gradient-to-br
          from-slate-950
          via-slate-900
          to-slate-950
          p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        "
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-500/30
                bg-cyan-500/10
                px-4
                py-2
                text-sm
                font-semibold
                text-cyan-300
              "
            >
              <Sparkles size={16} />

              Hero Management
            </div>

            <h1 className="mt-5 text-4xl font-bold text-white">
              Create Hero Slide
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Create a beautiful homepage hero section with
              live preview, responsive layout and modern
              design.
            </p>
          </div>

          {/* Right */}

          <Link
            href="/dashboard/home/hero"
            className="
              inline-flex
              items-center
              justify-center
              gap-2

              rounded-2xl

              border
              border-slate-700

              bg-slate-900

              px-6
              py-4

              font-semibold
              text-slate-300

              transition-all
              duration-300

              hover:border-cyan-500
              hover:bg-cyan-500/10
              hover:text-cyan-300
            "
          >
            <ArrowLeft size={18} />

            Back to Hero List
          </Link>

        </div>
      </div>

      {/* Form */}

      <div
        className="
          rounded-[30px]
          border
          border-slate-800
          bg-gradient-to-br
          from-slate-950
          via-slate-900
          to-slate-950
          p-6
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        "
      >
        <HeroForm />
      </div>
    </div>
  );
}