"use client";

import {
  MessageSquareQuote,
} from "lucide-react";


export default function PrincipalMessageEmpty() {
  return (
    <div
      className="
        flex
        min-h-[420px]
        w-full
        items-center
        justify-center
        bg-[#F8FAF9]
        px-4
        py-10
        sm:px-6
      "
    >

      <div
        className="
          flex
          w-full
          max-w-[650px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-slate-200
          bg-white
          px-6
          py-12
          text-center
          shadow-sm
          sm:px-10
          sm:py-14
        "
      >


        {/* =================================================
            ICON
        ================================================= */}


        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-emerald-50
          "
        >

          <MessageSquareQuote
            size={32}
            strokeWidth={1.8}
            className="
              text-[#008B45]
            "
          />

        </div>



        {/* =================================================
            TITLE
        ================================================= */}


        <h2
          className="
            mt-6
            text-xl
            font-bold
            text-slate-800
            sm:text-2xl
          "
        >
          No Principal Message Found
        </h2>



        {/* =================================================
            DESCRIPTION
        ================================================= */}


        <p
          className="
            mt-3
            max-w-[500px]
            text-sm
            leading-6
            text-slate-500
            sm:text-base
          "
        >
          No Principal Message section has been
          created yet. Create the section to
          display the principal&apos;s message
          on the website.
        </p>



      </div>

    </div>
  );
}