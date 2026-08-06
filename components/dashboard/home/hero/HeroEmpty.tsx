import { ImageOff } from "lucide-react";

interface HeroEmptyProps {
  title?: string;
  description?: string;
}

export default function HeroEmpty({
  title = "No Hero Slides Found",
  description = "There are no hero slides available yet. Create your first hero section to showcase your website beautifully.",
}: HeroEmptyProps) {
  return (
    <div
      className="
        flex
        min-h-[500px]
        w-full
        items-center
        justify-center

        rounded-3xl

        border
        border-slate-800

        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950

        p-6
        sm:p-8
        lg:p-12

        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      "
    >
      <div className="mx-auto max-w-lg text-center">

        {/* Icon */}

        <div className="relative mx-auto flex h-28 w-28 items-center justify-center">

          {/* Glow */}

          <div
            className="
              absolute
              inset-0

              animate-pulse

              rounded-full

              bg-cyan-500/20

              blur-2xl
            "
          />

          {/* Circle */}

          <div
            className="
              relative

              flex
              h-24
              w-24
              items-center
              justify-center

              rounded-full

              border
              border-cyan-500/30

              bg-gradient-to-br
              from-cyan-500/20
              to-blue-600/20

              backdrop-blur-xl
            "
          >
            <ImageOff
              size={46}
              className="text-cyan-400"
            />
          </div>
        </div>

        {/* Title */}

        <h2
          className="
            mt-8

            text-3xl
            font-bold

            tracking-tight

            text-white

            sm:text-4xl
          "
        >
          {title}
        </h2>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-5
            max-w-md

            text-sm
            leading-8

            text-slate-400

            sm:text-base
          "
        >
          {description}
        </p>

        {/* Bottom Card */}

        <div
          className="
            mt-10

            rounded-2xl

            border
            border-cyan-500/20

            bg-cyan-500/10

            px-6
            py-5

            backdrop-blur-xl
          "
        >
          <p
            className="
              text-sm
              font-medium

              text-cyan-300
            "
          >
            💡 Tip
          </p>

          <p
            className="
              mt-2

              text-sm

              leading-7

              text-slate-300
            "
          >
            Click the{" "}
            <span className="font-semibold text-white">
              Add Hero
            </span>{" "}
            button to create your first homepage hero slider.
          </p>
        </div>
      </div>
    </div>
  );
}