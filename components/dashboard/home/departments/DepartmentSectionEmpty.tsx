"use client";


import {
  Building2,
  Plus,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";



export default function DepartmentSectionEmpty() {


  const router = useRouter();




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
        border-white/10

        bg-[#080d20]

        px-5
        py-12

        text-center

        shadow-xl

        sm:px-8
      "

    >





      {/* =========================================
          ICON
      ========================================= */}


      <div

        className="
          flex
          h-16
          w-16

          items-center
          justify-center

          rounded-2xl

          border
          border-cyan-400/20

          bg-cyan-400/10

          text-cyan-400
        "

      >

        <Building2 size={32}/>


      </div>








      {/* =========================================
          TITLE
      ========================================= */}



      <h2

        className="
          mt-6

          text-xl
          font-bold

          text-white

          sm:text-2xl
        "

      >

        Department Section Not Found


      </h2>








      {/* =========================================
          DESCRIPTION
      ========================================= */}



      <p

        className="
          mt-3

          max-w-md

          text-sm
          leading-6

          text-slate-400

          sm:text-base
        "

      >

        Create the Find Your Department section
        to configure its content, images and
        search information.


      </p>









      {/* =========================================
          CREATE BUTTON
      ========================================= */}



      <button

        type="button"

        onClick={()=>

          router.push(
            "/dashboard/home/departments/section/new"
          )

        }


        className="
          mt-7

          inline-flex

          min-h-11

          items-center
          justify-center

          gap-2

          rounded-xl

          bg-cyan-500

          px-5
          py-3

          text-sm

          font-semibold

          text-white

          shadow-lg

          transition

          hover:bg-cyan-600

          hover:shadow-cyan-500/20
        "

      >

        <Plus size={18}/>


        Create Section


      </button>





    </div>

  );

}