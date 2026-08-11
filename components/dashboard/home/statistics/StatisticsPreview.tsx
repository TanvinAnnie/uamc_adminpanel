"use client";


import {
  BarChart3,
  Trophy,
} from "lucide-react";


import type {
  StatisticsFormData,
} from "./StatisticsForm";



interface StatisticsPreviewProps {

  data: StatisticsFormData;

}




export default function StatisticsPreview({
  data,
}: StatisticsPreviewProps) {


  const statistics = [

    {
      value:
        data.statisticOneValue || "90%",

      title:
        data.statisticOneTitle ||
        "Post-Graduation Success Rate",

    },


    {
      value:
        data.statisticTwoValue || "Top 10",

      title:
        data.statisticTwoTitle ||
        "Colleges That Create Futures",

    },


    {
      value:
        data.statisticThreeValue || "No. 1",

      title:
        data.statisticThreeTitle ||
        "In The Nation For Materials R&D",

    },

  ];




  return (

    <div className="w-full space-y-5">


      {/* =====================================
          HEADER
      ===================================== */}


      <div>

        <h2
          className="
            text-xl
            font-bold
            text-slate-800
          "
        >
          Live Preview
        </h2>



        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Preview how Statistics section
          will appear on homepage.
        </p>


      </div>







      {/* =====================================
          WEBSITE PREVIEW
      ===================================== */}



      <div
        className="
          relative
          min-h-[430px]
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-slate-900
          shadow-xl
        "
      >



        {/* BACKGROUND IMAGE */}



        {
          data.backgroundImage ?


          (

            <img

              src={
                data.backgroundImage
              }

              alt="Statistics preview"

              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "

            />

          )


          :


          (

            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-900
                via-slate-800
                to-slate-700
              "
            >

              <div
                className="
                  text-center
                  text-white/50
                "
              >

                <BarChart3
                  size={52}
                  className="mx-auto"
                  strokeWidth={1.2}
                />


                <p
                  className="
                    mt-3
                    text-sm
                  "
                >
                  Statistics Background
                </p>


              </div>


            </div>

          )

        }






        {/* OVERLAY */}



        <div
          className="
            absolute
            inset-0
            bg-black/60
          "
        />








        {/* CONTENT */}



        <div
          className="
            relative
            z-10
            flex
            min-h-[430px]
            items-center
            justify-center
            px-5
            py-10
          "
        >


          <div
            className="
              w-full
              max-w-5xl
            "
          >





            {/* ICON */}



            <div
              className="
                mb-10
                flex
                justify-center
              "
            >

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/30
                  bg-white/10
                  text-white
                  backdrop-blur-md
                "
              >

                <Trophy
                  size={28}
                  strokeWidth={1.5}
                />

              </div>


            </div>







            {/* STATISTICS */}



            <div
              className="
                grid
                gap-5
                sm:grid-cols-3
              "
            >


              {
                statistics.map(
                  (item,index)=>(


                    <div

                      key={index}

                      className="
                        rounded-2xl
                        border
                        border-white/20
                        bg-white/10
                        p-6
                        text-center
                        backdrop-blur-sm
                      "

                    >


                      <h3
                        className="
                          text-4xl
                          font-bold
                          text-white
                          sm:text-5xl
                        "
                      >

                        {
                          item.value
                        }

                      </h3>



                      <p
                        className="
                          mt-3
                          text-sm
                          leading-6
                          text-white/80
                          sm:text-base
                        "
                      >

                        {
                          item.title
                        }

                      </p>



                    </div>


                  )

                )
              }


            </div>








            {/* STATUS */}



            <div
              className="
                mt-10
                flex
                justify-center
              "
            >


              <span
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-4
                  py-2
                  text-xs
                  font-semibold

                  ${
                    data.isActive

                    ?

                    "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"

                    :

                    "border-white/20 bg-white/10 text-white/60"

                  }
                `}
              >


                <span
                  className={`
                    h-2
                    w-2
                    rounded-full

                    ${
                      data.isActive

                      ?

                      "bg-emerald-400"

                      :

                      "bg-white/40"

                    }
                  `}
                />



                {
                  data.isActive
                  ?
                  "Published"
                  :
                  "Draft"
                }



              </span>



            </div>




          </div>



        </div>



      </div>





      {/* =====================================
          NOTE
      ===================================== */}



      <div
        className="
          rounded-xl
          bg-slate-50
          px-4
          py-3
          text-xs
          leading-5
          text-slate-500
        "
      >

        Changes made in the form will appear
        here before saving.

      </div>



    </div>

  );

}