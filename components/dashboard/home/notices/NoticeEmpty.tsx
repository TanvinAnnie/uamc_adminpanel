import { FileText } from "lucide-react";


interface NoticeEmptyProps {
  title?: string;
  description?: string;
}


export default function NoticeEmpty({
  title = "No Notices Available",
  description = "There are no notices available. Click the 'Add Notice' button to create your first notice.",
}: NoticeEmptyProps) {
  return (
    <div
      className="
        flex
        min-h-[420px]
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          relative
          flex
          w-full
          max-w-md
          flex-col
          items-center
          overflow-hidden
          rounded-3xl

          border
          border-white/10

          bg-slate-900/70

          p-10

          text-center

          shadow-[0_25px_80px_rgba(0,0,0,0.35)]

          backdrop-blur-xl
        "
      >

        {/* Glow Effect */}

        <div
          className="
            absolute
            -top-20
            h-40
            w-40
            rounded-full
            bg-cyan-400/20
            blur-3xl
          "
        />



        {/* Icon */}

        <div
          className="
            relative
            flex
            h-24
            w-24
            items-center
            justify-center

            rounded-3xl

            border
            border-cyan-400/20

            bg-cyan-400/10

            shadow-lg
          "
        >
          <FileText
            size={42}
            strokeWidth={1.8}
            className="
              text-cyan-400
            "
          />
        </div>



        {/* Title */}

        <h2
          className="
            mt-7

            text-2xl
            font-bold

            text-white
          "
        >
          {title}
        </h2>



        {/* Description */}

        <p
          className="
            mt-4

            max-w-sm

            text-sm
            leading-7

            text-slate-400
          "
        >
          {description}
        </p>



        {/* Bottom Accent */}

        <div
          className="
            mt-8

            h-1
            w-20

            rounded-full

            bg-gradient-to-r

            from-cyan-400
            to-blue-500
          "
        />

      </div>
    </div>
  );
}