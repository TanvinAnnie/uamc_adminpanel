"use client";


import {
  Clock3,
  Download,
  FileText,
} from "lucide-react";



interface PublicationPreviewProps {

  title:string;

  category:
    | "Journal"
    | "Tenders";

  description:string;

  date:string;

  time:string;

  pdf:string;

  isPublished:boolean;

  order:number;

}






export default function PublicationPreview({

  title,

  category,

  description,

  date,

  time,

  pdf,

  isPublished,

  order,

}:PublicationPreviewProps){





  const formatDate = (
    value:string
  )=>{


    if(!value){

      return {

        day:"--",

        month:"---",

        year:""

      };

    }





    const dateObject =
      new Date(
        `${value}T00:00:00`
      );





    if(
      Number.isNaN(
        dateObject.getTime()
      )
    ){

      return {

        day:"--",

        month:"---",

        year:""

      };

    }






    return {

      day:
        dateObject
        .getDate()
        .toString(),



      month:
        dateObject
        .toLocaleDateString(
          "en-US",
          {
            month:"short"
          }
        ),



      year:
        dateObject
        .getFullYear()
        .toString()

    };


  };







  const formattedDate =
    formatDate(date);








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

          Preview before saving

        </p>


      </div>









      <div
        className="
          space-y-6

          p-6
        "
      >






        {/* TITLE */}



        <div
          className="
            flex

            items-center

            justify-between

            gap-4
          "
        >


          <h2
            className="
              text-3xl

              font-bold

              text-white
            "
          >

            Publication

          </h2>



          <span
            className="
              text-sm

              font-semibold

              text-cyan-400
            "
          >

            View All ↗

          </span>



        </div>









        {/* CATEGORY */}



        <div
          className="
            flex

            overflow-x-auto

            rounded-2xl

            border

            border-white/10

            bg-slate-950/60

            p-2
          "
        >


          {["Journal","Tenders"].map(
            (item)=>(

              <div

                key={item}


                className={`
                  min-w-[140px]

                  rounded-xl

                  px-5

                  py-3

                  text-center

                  text-sm

                  font-semibold

                  transition


                  ${
                    category === item

                    ?

                    "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"

                    :

                    "text-slate-400"
                  }

                `}
              >

                {item}

              </div>

            )
          )}



        </div>









        {/* PUBLICATION CARD */}



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

                overflow-hidden

                rounded-2xl

                border

                border-white/10

                text-center
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

                {formattedDate.day}

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

                {formattedDate.month}

                {
                  formattedDate.year &&
                  ` ${formattedDate.year}`
                }

              </span>



            </div>








            {/* CONTENT */}



            <div
              className="
                min-w-0

                flex-1
              "
            >



              <h3
                className="
                  line-clamp-2

                  text-lg

                  font-semibold

                  text-white
                "
              >

                {
                  title ||
                  "Publication Title"
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


                {
                  time ||
                  "3.40 PM"
                }


              </div>



            </div>




          </div>



        </div>









        {/* DETAILS */}



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

                bg-cyan-400/10

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

                  "bg-emerald-400/10 text-emerald-400"

                  :

                  "bg-red-400/10 text-red-400"
                }

              `}
            >

              {
                isPublished
                ?
                "Published"
                :
                "Unpublished"
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








          <p
            className="
              mt-4

              line-clamp-4

              text-sm

              leading-6

              text-slate-400
            "
          >

            {
              description ||

              "Publication description will appear here."
            }


          </p>









          {/* PDF */}



          <div
            className="
              mt-5
            "
          >

            {
              pdf

              ?

              (

                <a

                  href={pdf}

                  target="_blank"

                  rel="noopener noreferrer"


                  className="
                    inline-flex

                    items-center

                    gap-2


                    rounded-xl


                    bg-emerald-500/10


                    px-5


                    py-3


                    text-sm


                    font-semibold


                    text-emerald-400


                    transition


                    hover:bg-emerald-500/20
                  "
                >

                  <Download size={16}/>


                  Download PDF


                </a>


              )


              :


              (

                <div
                  className="
                    flex

                    items-center

                    gap-2

                    text-sm

                    text-slate-500
                  "
                >

                  <FileText size={16}/>


                  PDF not uploaded


                </div>

              )

            }



          </div>



        </div>




      </div>




    </div>


  );

}