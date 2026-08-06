import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  PencilLine,
} from "lucide-react";

import { connectToDB } from "@/lib/connectToDB";
import { HeroModel } from "@/lib/models/HeroModel";

import HeroForm from "@/components/dashboard/home/hero/HeroForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditHeroPage({
  params,
}: Props) {
  const { id } = await params;

  await connectToDB();

  const hero = await HeroModel.findById(id).lean();

  if (!hero) {
    notFound();
  }

  const heroData = {
    _id: hero._id.toString(),
    tagline: hero.tagline,
    title: hero.title,
    highlightText: hero.highlightText,
    lastTitle: hero.lastTitle,
    buttonText: hero.buttonText,
    buttonLink: hero.buttonLink,
    backgroundImage: hero.backgroundImage,
    rightTitle: hero.rightTitle,
    courseOneTitle: hero.courseOneTitle,
    courseOneDescription: hero.courseOneDescription,
    courseTwoTitle: hero.courseTwoTitle,
    courseTwoDescription: hero.courseTwoDescription,
    slideNumber: hero.slideNumber,
    isActive: hero.isActive,
  };

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

                Hero Management
              </div>

              <h1 className="mt-5 flex items-center gap-3 text-4xl font-bold text-white">

                <PencilLine className="text-cyan-400" />

                Edit Hero Slide

              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                Update your homepage hero banner, edit text,
                image, courses, and live preview before saving.
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

          {/* Stats */}

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
                Editing
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                Hero Slide
              </h2>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Status
              </p>

              <h2
                className={`mt-3 text-3xl font-bold ${
                  heroData.isActive
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {heroData.isActive
                  ? "Active"
                  : "Inactive"}
              </h2>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Slide
              </p>

              <h2 className="mt-3 text-3xl font-bold text-cyan-400">
                #{heroData.slideNumber}
              </h2>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Mode
              </p>

              <h2 className="mt-3 text-3xl font-bold text-violet-400">
                Editing
              </h2>

            </div>

          </div>

        </div>
      </div>

      {/* Hero Form */}

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
        <HeroForm initialData={heroData} />
      </div>

    </div>
  );
}