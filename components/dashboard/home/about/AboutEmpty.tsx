"use client";


import Link from "next/link";

import {
  ArrowRight,
  Building2,
  Plus,
} from "lucide-react";





export default function AboutEmpty() {


  return (

    <div
      className="
        flex

        min-h-[420px]

        w-full

        items-center

        justify-center


        rounded-3xl


        border


        border-white/10


        bg-slate-900/70


        px-5


        py-10


        shadow-[0_25px_80px_rgba(0,0,0,0.35)]


        backdrop-blur-xl


        sm:px-8
      "
    >





      <div
        className="
          mx-auto

          max-w-md

          text-center
        "
      >






        {/* ICON */}



        <div
          className="
            mx-auto

            flex

            h-20

            w-20

            items-center

            justify-center


            rounded-3xl


            border


            border-emerald-400/20


            bg-emerald-400/10


            text-emerald-400
          "
        >

          <Building2

            size={38}

            strokeWidth={1.5}

          />


        </div>









        {/* TITLE */}



        <h2
          className="
            mt-6

            text-2xl

            font-bold

            text-white


            sm:text-3xl
          "
        >

          About Section Not Found

        </h2>









        {/* DESCRIPTION */}



        <p
          className="
            mt-4

            text-sm

            leading-7

            text-slate-400
          "
        >

          No About UAMC content has been created yet.
          Create the About section to display it on
          the homepage.

        </p>









        {/* BUTTON */}




        <Link

          href="/dashboard/home/about/new"


          className="
            group

            mt-7

            inline-flex


            items-center


            gap-3


            rounded-xl


            bg-gradient-to-r


            from-emerald-500


            to-cyan-500


            px-6


            py-3.5


            text-sm


            font-semibold


            text-white


            shadow-lg


            shadow-emerald-500/20


            transition


            hover:scale-[1.03]
          "

        >


          <Plus
            size={18}
          />


          Create About Section



          <ArrowRight

            size={17}

            className="
              transition

              group-hover:translate-x-1
            "

          />


        </Link>






      </div>





    </div>

  );

}