"use client";


import Link from "next/link";

import {
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";




interface Publication {

  _id:string;

  title:string;

  slug:string;

  category:
    | "Journal"
    | "Tenders";

  description:string;

  pdf:string;

  date:string;

  time:string;

  isPublished:boolean;

  order:number;

  createdAt:string;

}




interface PublicationTableRowProps {

  publication:Publication;

  onDelete:(id:string)=>void;

}







export default function PublicationTableRow({

  publication,

  onDelete,

}:PublicationTableRowProps){



  return (

    <tr

      className="
        border-b

        border-white/10


        transition


        hover:bg-white/[0.03]
      "

    >






      {/* ================= PDF ================= */}



      <td
        className="
          px-6

          py-5
        "
      >


        <div
          className="
            flex

            h-12

            w-12

            items-center

            justify-center


            rounded-2xl


            border

            border-red-400/20


            bg-red-400/10


            text-red-400
          "
        >

          <FileText
            size={22}
          />

        </div>


      </td>









      {/* ================= TITLE ================= */}



      <td

        className="
          px-6

          py-5
        "

      >


        <div
          className="
            max-w-[320px]
          "
        >



          <h3
            className="
              line-clamp-2

              font-semibold

              text-white
            "
          >

            {
              publication.title
            }

          </h3>





          <p
            className="
              mt-2

              line-clamp-2

              text-sm

              leading-5

              text-slate-400
            "
          >

            {
              publication.description
            }


          </p>



        </div>


      </td>









      {/* ================= CATEGORY ================= */}



      <td

        className="
          px-6

          py-5
        "

      >


        <span

          className="
            inline-flex

            rounded-full


            border

            border-cyan-400/20


            bg-cyan-400/10


            px-3


            py-1


            text-xs


            font-semibold


            text-cyan-400
          "

        >

          {
            publication.category
          }


        </span>


      </td>









      {/* ================= ORDER ================= */}



      <td

        className="
          px-6

          py-5
        "

      >


        <span

          className="
            rounded-xl


            bg-slate-800


            px-3


            py-1


            text-sm


            font-semibold


            text-slate-300
          "

        >

          #
          {
            publication.order
          }

        </span>


      </td>









      {/* ================= STATUS ================= */}



      <td

        className="
          px-6

          py-5
        "

      >


        {

          publication.isPublished

          ?

          (

            <span

              className="
                inline-flex


                rounded-full


                border


                border-emerald-400/20


                bg-emerald-400/10


                px-3


                py-1


                text-xs


                font-semibold


                text-emerald-400
              "

            >

              Published

            </span>

          )


          :


          (

            <span

              className="
                inline-flex


                rounded-full


                border


                border-red-400/20


                bg-red-400/10


                px-3


                py-1


                text-xs


                font-semibold


                text-red-400
              "

            >

              Unpublished

            </span>

          )


        }



      </td>









      {/* ================= DATE ================= */}



      <td

        className="
          px-6

          py-5


          text-sm


          text-slate-400
        "

      >


        {
          new Date(
            publication.date
          )
          .toLocaleDateString()
        }


      </td>









      {/* ================= ACTIONS ================= */}



      <td

        className="
          px-6

          py-5
        "

      >


        <div

          className="
            flex

            items-center

            justify-center

            gap-3
          "

        >






          {/* EDIT */}



          <Link

            href={
              `/dashboard/home/publications/edit/${publication._id}`
            }


            className="
              flex

              h-10

              w-10

              items-center

              justify-center


              rounded-xl


              border


              border-blue-400/20


              bg-blue-400/10


              text-blue-400


              transition


              hover:scale-105


              hover:bg-blue-400/20
            "


            title="Edit Publication"

          >

            <Pencil
              size={18}
            />


          </Link>









          {/* DELETE */}



          <button


            type="button"


            onClick={()=>

              onDelete(
                publication._id
              )

            }


            className="
              flex

              h-10

              w-10

              items-center

              justify-center


              rounded-xl


              border


              border-red-400/20


              bg-red-400/10


              text-red-400


              transition


              hover:scale-105


              hover:bg-red-400/20
            "


            title="Delete Publication"

          >

            <Trash2
              size={18}
            />


          </button>





        </div>


      </td>





    </tr>


  );


}