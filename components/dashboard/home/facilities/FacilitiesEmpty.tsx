"use client";


import {
  Building2,
  Plus,
  ArrowRight,
} from "lucide-react";


import Link from "next/link";



export default function FacilitiesEmpty() {


  return (


    <div

      className="
        flex
        min-h-[420px]
        w-full
        items-center
        justify-center

        px-4
        py-10

        sm:px-6
      "

    >






      <div


        className="
          flex

          w-full

          max-w-[700px]

          flex-col

          items-center

          justify-center


          rounded-3xl


          border

          border-slate-800


          bg-[#080d20]


          px-6

          py-12


          text-center


          shadow-xl


          sm:px-10

          sm:py-14
        "

      >







        {/* =====================================
            ICON
        ===================================== */}



        <div


          className="
            flex

            h-16

            w-16

            items-center

            justify-center


            rounded-2xl


            border

            border-emerald-400/20


            bg-emerald-400/10
          "

        >




          <Building2


            size={32}


            strokeWidth={1.6}



            className="
              text-emerald-400
            "

          />



        </div>









        {/* =====================================
            TITLE
        ===================================== */}




        <h2


          className="
            mt-6

            text-xl

            font-bold

            text-white


            sm:text-2xl
          "

        >


          Facilities Section Not Found


        </h2>









        {/* =====================================
            DESCRIPTION
        ===================================== */}




        <p


          className="
            mt-3

            max-w-[500px]

            text-sm

            leading-6

            text-slate-400


            sm:text-base
          "

        >


          No Facilities section has been
          created yet. Create the Facilities
          section to display it on the homepage.


        </p>









        {/* =====================================
            CREATE BUTTON
        ===================================== */}





        <Link


          href="/dashboard/home/facilities/new"


          className="
            mt-7

            inline-flex

            min-h-11

            items-center

            justify-center

            gap-2


            rounded-xl


            bg-[#008B45]


            px-5

            py-3


            text-sm


            font-semibold


            text-white


            transition


            hover:bg-[#00763B]


            hover:shadow-lg
          "


        >



          <Plus size={18}/>



          Create Facilities Section




          <ArrowRight size={17}/>




        </Link>







      </div>







    </div>


  );


}