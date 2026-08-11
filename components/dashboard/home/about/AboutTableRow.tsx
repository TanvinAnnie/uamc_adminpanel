"use client";


import {
  Edit,
  Trash2,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";







export interface AboutData {

  _id:string;


  tagline:string;

  title:string;

  highlightText:string;


  descriptionOne:string;

  descriptionTwo:string;


  imageOne:string;

  imageTwo:string;

  logo:string;


  missionTitle:string;

  missionLink:string;


  visionTitle:string;

  visionLink:string;


  buttonText:string;

  buttonLink:string;


  isActive:boolean;


  createdAt:string;

  updatedAt:string;

}








interface AboutTableRowProps {

  about:AboutData;

  onDelete:(id:string)=>void;

}









export default function AboutTableRow({

  about,

  onDelete,

}:AboutTableRowProps){



  const router = useRouter();







  // ===============================
  // DELETE ABOUT
  // ===============================



  const handleDelete = async()=>{


    const confirmed =
      window.confirm(
        "Are you sure you want to delete the About section?"
      );



    if(!confirmed){

      return;

    }





    try{


      const res = await fetch(

        "/api/about",

        {

          method:"DELETE",

        }

      );





      const data =
        await res.json();





      if(!res.ok){

        throw new Error(

          data.message ||

          "Failed to delete About section."

        );

      }






      toast.success(

        "About section deleted successfully."

      );





      onDelete(
        about._id
      );



    }

    catch(error){



      console.error(

        "DELETE ABOUT ERROR:",

        error

      );





      toast.error(

        error instanceof Error

        ?

        error.message

        :

        "Failed to delete About section."

      );

    }



  };









  return (



    <tr

      className="
        border-t


        border-white/10


        transition


        hover:bg-white/[0.03]
      "

    >








      {/* LOGO */}



      <td

        className="
          px-5


          py-5
        "

      >


        <div

          className="
            flex


            h-14


            w-14


            items-center


            justify-center


            overflow-hidden


            rounded-2xl


            border


            border-white/10


            bg-slate-950
          "

        >


          {

            about.logo

            ?

            (

              <img

                src={about.logo}


                alt="UAMC Logo"


                className="
                  h-full


                  w-full


                  object-contain


                  p-1
                "

              />

            )


            :

            (

              <span

                className="
                  text-[10px]


                  text-slate-500
                "

              >

                No Logo

              </span>

            )

          }



        </div>



      </td>









      {/* ABOUT */}




      <td

        className="
          px-5


          py-5
        "

      >


        <div

          className="
            min-w-[220px]
          "

        >



          <p

            className="
              font-bold


              text-white
            "

          >

            {about.title}

            {" "}


            <span

              className="
                text-emerald-400
              "

            >

              {about.highlightText}

            </span>



          </p>






          <p

            className="
              mt-2


              line-clamp-1


              text-sm


              text-slate-400
            "

          >

            {about.tagline}

          </p>





        </div>


      </td>









      {/* MISSION */}



      <td

        className="
          px-5


          py-5
        "

      >


        <p

          className="
            max-w-[200px]


            text-sm


            font-medium


            text-emerald-300
          "

        >

          {about.missionTitle}

        </p>


      </td>









      {/* VISION */}



      <td

        className="
          px-5


          py-5
        "

      >


        <p

          className="
            max-w-[200px]


            text-sm


            font-medium


            text-cyan-300
          "

        >

          {about.visionTitle}

        </p>


      </td>









      {/* STATUS */}



      <td

        className="
          px-5


          py-5
        "

      >



        <span

          className={`

            inline-flex


            rounded-full


            px-4


            py-1.5


            text-xs


            font-bold


            ${
              about.isActive

              ?

              "border border-emerald-400/20 bg-emerald-400/10 text-emerald-400"

              :

              "border border-slate-400/20 bg-slate-700/40 text-slate-400"

            }

          `}

        >

          {

            about.isActive

            ?

            "Published"

            :

            "Draft"

          }



        </span>


      </td>









      {/* ACTIONS */}



      <td

        className="
          px-5


          py-5
        "

      >



        <div

          className="
            flex


            justify-end


            gap-3
          "

        >






          {/* EDIT */}



          <button


            type="button"


            onClick={()=>


              router.push(

                `/dashboard/home/about/edit/${about._id}`

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


              border-blue-400/20


              bg-blue-400/10


              text-blue-400


              transition


              hover:bg-blue-400/20
            "


            title="Edit About"


          >


            <Edit size={17}/>


          </button>









          {/* DELETE */}




          <button


            type="button"


            onClick={handleDelete}


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


              hover:bg-red-400/20
            "


            title="Delete About"


          >


            <Trash2 size={17}/>


          </button>






        </div>


      </td>






    </tr>


  );


}