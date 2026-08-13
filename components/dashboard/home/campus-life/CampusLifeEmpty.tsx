"use client";


import {
  Images,
} from "lucide-react";



// =========================================================
// COMPONENT
// =========================================================


export default function CampusLifeEmpty() {


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
        border-dashed
        border-slate-300
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

        <Images

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
          mt-5
          text-xl
          font-bold
          text-slate-800
          sm:text-2xl
        "

      >

        No Campus Life Added

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

        Create Campus Life sections to
        showcase student activities,
        arts & culture, and recreation
        experiences on the website.

      </p>



    </div>

  );


}