"use client";


import {
  Loader2,
  Building2,
} from "lucide-react";





export default function FacilitiesLoading() {


  return (


    <div

      className="
        flex
        min-h-[520px]
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




          <Loader2


            size={32}


            strokeWidth={2}


            className="
              animate-spin

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


          Loading Facilities


        </h2>









        {/* =====================================
            DESCRIPTION
        ===================================== */}



        <p


          className="
            mt-3

            max-w-[480px]

            text-sm

            leading-6

            text-slate-400


            sm:text-base
          "

        >


          Please wait while we load
          the Facilities section data.



        </p>









        {/* =====================================
            LOADING ANIMATION
        ===================================== */}



        <div


          className="
            mt-6

            flex

            items-center

            gap-2

          "

        >



          <span

            className="
              h-2.5

              w-2.5

              animate-pulse

              rounded-full

              bg-emerald-400
            "

          />





          <span

            className="
              h-2.5

              w-2.5

              animate-pulse

              rounded-full

              bg-emerald-400

              [animation-delay:150ms]
            "

          />






          <span

            className="
              h-2.5

              w-2.5

              animate-pulse

              rounded-full

              bg-emerald-400

              [animation-delay:300ms]
            "

          />





        </div>








      </div>







    </div>


  );


}