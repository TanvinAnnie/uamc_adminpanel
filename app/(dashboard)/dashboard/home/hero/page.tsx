import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Sparkles,
  LayoutPanelTop,
} from "lucide-react";

import HeroTable from "@/components/dashboard/home/hero/HeroTable";

export default function HeroPage() {
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
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        "
      >
        <div className="p-8">

          <div
            className="
              flex
              flex-col
              gap-8

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

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

                Homepage Management
              </div>

              <h1 className="mt-5 flex items-center gap-3 text-4xl font-bold text-white">

                <LayoutPanelTop className="text-cyan-400" />

                Hero Management

              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                Manage homepage hero banners, promotional
                slides, and featured content displayed on the
                landing page.
              </p>

            </div>

            {/* Right */}

            <div
              className="
                flex
                flex-col
                gap-4

                sm:flex-row
              "
            >

              <Link
                href="/dashboard/home"
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

                Back
              </Link>

              <Link
                href="/dashboard/home/hero/new"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2

                  rounded-2xl

                  bg-gradient-to-r
                  from-cyan-500
                  via-sky-500
                  to-blue-600

                  px-6
                  py-4

                  font-bold
                  text-white

                  shadow-lg
                  shadow-cyan-500/25

                  transition-all
                  duration-300

                  hover:scale-105
                  hover:shadow-cyan-500/40
                "
              >
                <Plus size={20} />

                Add Hero
              </Link>

            </div>

          </div>

          {/* Statistics */}

          <div
            className="
              mt-10

              grid

              gap-5

              sm:grid-cols-2
              xl:grid-cols-4
            "
          >

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Hero Slides
              </p>

              <h2 className="mt-3 text-4xl font-bold text-white">
                Manage
              </h2>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Status
              </p>

              <h2 className="mt-3 text-4xl font-bold text-emerald-400">
                Active
              </h2>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Layout
              </p>

              <h2 className="mt-3 text-4xl font-bold text-cyan-400">
                Responsive
              </h2>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Preview
              </p>

              <h2 className="mt-3 text-4xl font-bold text-violet-400">
                Live
              </h2>

            </div>

          </div>

        </div>
      </div>

      {/* Table */}

      <HeroTable />

    </div>
  );
}