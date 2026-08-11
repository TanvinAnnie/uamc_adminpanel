"use client";


import {
  BarChart3,
  Plus,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";





export default function StatisticsEmpty() {


  const router = useRouter();




  return (

    <div
      className="
        flex
        min-h-[430px]
        w-full
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-white/10
        bg-slate-900/70
        px-6
        py-12
        text-center
        shadow-xl
        backdrop-blur-xl
      "
    >



      {/* ================================
          ICON
      ================================= */}


      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-2xl
          bg-emerald-500/10
          text-emerald-400
          shadow-inner
        "
      >

        <BarChart3
          size={38}
          strokeWidth={1.8}
        />

      </div>






      {/* ================================
          TITLE
      ================================= */}


      <h2
        className="
          mt-7
          text-2xl
          font-bold
          text-white
          sm:text-3xl
        "
      >

        No Statistics Found

      </h2>







      {/* ================================
          DESCRIPTION
      ================================= */}


      <p
        className="
          mt-3
          max-w-md
          text-sm
          leading-7
          text-slate-400
          sm:text-base
        "
      >

        No statistics data has been created yet.
        Create the Statistics section to display
        achievements, numbers, and important
        information on the homepage.

      </p>







      {/* ================================
          BUTTON
      ================================= */}



      <button
        type="button"
        onClick={() =>
          router.push(
            "/dashboard/home/statistics/new"
          )
        }
        className="
          mt-8
          inline-flex
          min-h-11
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-emerald-500
          to-cyan-500
          px-6
          py-3
          text-sm
          font-bold
          text-white
          shadow-lg
          transition
          hover:scale-[1.02]
          hover:shadow-emerald-500/20
        "
      >

        <Plus size={18}/>

        Create Statistics


      </button>




    </div>

  );


}