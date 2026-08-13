"use client";


import {
  Loader2,
} from "lucide-react";



// =========================================================
// COMPONENT
// =========================================================


export default function CampusLifeLoading() {


  return (

    <div

      className="
        flex
        min-h-[420px]
        w-full
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

        <Loader2

          size={32}

          strokeWidth={2}

          className="
            animate-spin
            text-[#008B45]
          "

        />

      </div>





      {/* =================================================
          TITLE
      ================================================= */}


      <h2

        className="
          mt-5
          text-xl
          font-bold
          text-slate-800
          sm:text-2xl
        "

      >

        Loading Campus Life

      </h2>






      {/* =================================================
          DESCRIPTION
      ================================================= */}


      <p

        className="
          mt-3
          max-w-[480px]
          text-sm
          leading-6
          text-slate-500
        "

      >

        Please wait while we load
        the Campus Life section data.

      </p>






      {/* =================================================
          DOT ANIMATION
      ================================================= */}


      <div

        className="
          mt-6
          flex
          items-center
          gap-1.5
        "

      >


        <span

          className="
            h-2
            w-2
            animate-pulse
            rounded-full
            bg-[#008B45]
          "

        />



        <span

          className="
            h-2
            w-2
            animate-pulse
            rounded-full
            bg-[#008B45]
            [animation-delay:150ms]
          "

        />



        <span

          className="
            h-2
            w-2
            animate-pulse
            rounded-full
            bg-[#008B45]
            [animation-delay:300ms]
          "

        />


      </div>



    </div>

  );


}