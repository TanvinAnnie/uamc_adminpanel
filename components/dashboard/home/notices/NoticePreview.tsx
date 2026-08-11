"use client";


import {
  Clock3,
  ExternalLink,
  FileText,
} from "lucide-react";



interface NoticePreviewProps {

  title: string;

  category:
    | "General Notice"
    | "Admission Notice"
    | "Reports"
    | "Job Circular";

  description: string;

  pdf: string;

  date: string;

  time: string;

  isPublished: boolean;

  order: number;

}



const categories = [
  "General Notice",
  "Admission Notice",
  "Reports",
  "Job Circular",
];



export default function NoticePreview({

  title,

  category,

  description,

  pdf,

  date,

  time,

  isPublished,

  order,

}: NoticePreviewProps) {



  const formattedDate = date
    ? new Date(`${date}T00:00:00`)
    : null;



  const day = formattedDate
    ? formattedDate.getDate()
    : "--";



  const month = formattedDate
    ? formattedDate.toLocaleDateString(
        "en-US",
        {
          month:"short",
        }
      )
    : "---";



  const year = formattedDate
    ? formattedDate.getFullYear()
    : "----";




  return (

    <div
      className="
        overflow-hidden

        rounded-3xl

        border

        border-white/10

        bg-slate-900/70

        shadow-[0_25px_80px_rgba(0,0,0,0.35)]

        backdrop-blur-xl
      "
    >



      {/* HEADER */}

      <div
        className="
          border-b

          border-white/10

          px-6

          py-5
        "
      >

        <h2
          className="
            text-xl

            font-bold

            text-white
          "
        >
          Live Preview
        </h2>


        <p
          className="
            mt-1

            text-sm

            text-slate-400
          "
        >
          Preview before saving notice
        </p>


      </div>





      {/* CONTENT */}

      <div
        className="
          space-y-6

          p-6
        "
      >



        {/* Notice Board Header */}


        <div
          className="
            flex

            items-center

            justify-between

            gap-4
          "
        >

          <h1
            className="
              text-2xl

              font-bold

              text-white

              sm:text-3xl
            "
          >
            Notice Board
          </h1>



          <span
            className="
              flex

              items-center

              gap-2

              text-sm

              font-semibold

              text-cyan-400
            "
          >

            View All

            <ExternalLink
              size={15}
            />

          </span>


        </div>






        {/* CATEGORY TABS */}


        <div
          className="
            overflow-x-auto
          "
        >

          <div
            className="
              flex

              min-w-max

              gap-2

              rounded-2xl

              bg-slate-950/70

              p-2

              border

              border-white/10
            "
          >

            {categories.map((item)=>(

              <div
                key={item}

                className={`
                  rounded-xl

                  px-5

                  py-3

                  text-sm

                  font-medium

                  transition-all

                  ${
                    item === category

                    ?

                    "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"

                    :

                    "text-slate-400 hover:text-white"
                  }

                `}
              >

                {item}

              </div>


            ))}


          </div>


        </div>







        {/* NOTICE CARD */}


        <div
          className="
            rounded-2xl

            border

            border-white/10

            bg-slate-950/60

            p-5
          "
        >


          <div
            className="
              flex

              gap-5
            "
          >



            {/* DATE */}


            <div
              className="
                flex

                w-[90px]

                shrink-0

                flex-col

                justify-center

                rounded-2xl

                border

                border-white/10

                bg-slate-900

                text-center

                overflow-hidden
              "
            >

              <span
                className="
                  py-3

                  text-3xl

                  font-bold

                  text-white
                "
              >

                {day}

              </span>


              <span
                className="
                  bg-emerald-500

                  px-2

                  py-2

                  text-xs

                  font-bold

                  uppercase

                  text-white
                "
              >

                {month}{" "}

                {year.toString().slice(-2)}

              </span>


            </div>





            {/* DETAILS */}


            <div
              className="
                flex

                min-w-0

                flex-1

                flex-col

                justify-center
              "
            >


              <h3
                className="
                  line-clamp-2

                  text-base

                  font-semibold

                  leading-6

                  text-white

                  sm:text-lg
                "
              >

                {
                  title ||

                  "Your notice title will appear here"
                }

              </h3>




              <div
                className="
                  mt-3

                  flex

                  items-center

                  gap-2

                  text-sm

                  text-slate-400
                "
              >

                <Clock3 size={16}/>

                {time || "3.40 PM"}

              </div>



            </div>


          </div>


        </div>







        {/* INFORMATION */}


        <div
          className="
            rounded-2xl

            border

            border-white/10

            bg-slate-950/50

            p-5
          "
        >



          <div
            className="
              flex

              flex-wrap

              gap-2
            "
          >



            <span
              className="
                rounded-full

                bg-cyan-500/10

                px-3

                py-1

                text-xs

                font-semibold

                text-cyan-400
              "
            >
              {category}
            </span>





            <span
              className={`
                rounded-full

                px-3

                py-1

                text-xs

                font-semibold


                ${
                  isPublished

                  ?

                  "bg-emerald-500/10 text-emerald-400"

                  :

                  "bg-red-500/10 text-red-400"
                }
              `}
            >

              {
                isPublished
                ? "Published"
                : "Unpublished"
              }

            </span>




            <span
              className="
                rounded-full

                bg-slate-800

                px-3

                py-1

                text-xs

                font-semibold

                text-slate-300
              "
            >

              Order #{order}

            </span>



          </div>





          {
            description && (

              <p
                className="
                  mt-4

                  line-clamp-3

                  text-sm

                  leading-6

                  text-slate-400
                "
              >

                {description}

              </p>

            )
          }





          {
            pdf && (

              <div
                className="
                  mt-4

                  flex

                  items-center

                  gap-2

                  text-sm

                  font-medium

                  text-emerald-400
                "
              >

                <FileText size={16}/>

                PDF attached

              </div>

            )
          }



        </div>


      </div>


    </div>

  );

}