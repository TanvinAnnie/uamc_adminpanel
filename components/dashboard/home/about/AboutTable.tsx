"use client";


import {
  Search,
} from "lucide-react";


import {
  useMemo,
  useState,
} from "react";


import AboutTableRow, {
  AboutData,
} from "./AboutTableRow";





interface AboutTableProps {

  about: AboutData | null;

  onDelete:(id:string)=>void;

}









export default function AboutTable({

  about,

  onDelete,

}:AboutTableProps){





  const [
    search,
    setSearch
  ] = useState("");







  // ===============================
  // FILTER ABOUT
  // ===============================



  const filteredAbout = useMemo(()=>{


    if(!about){

      return null;

    }







    const searchValue =

      search

      .trim()

      .toLowerCase();







    if(!searchValue){

      return about;

    }







    const matches =

      about.title

      ?.toLowerCase()

      .includes(searchValue)



      ||



      about.highlightText

      ?.toLowerCase()

      .includes(searchValue)



      ||



      about.tagline

      ?.toLowerCase()

      .includes(searchValue)



      ||



      about.missionTitle

      ?.toLowerCase()

      .includes(searchValue)



      ||



      about.visionTitle

      ?.toLowerCase()

      .includes(searchValue);







    return matches

      ?

      about

      :

      null;



  },[

    about,

    search

  ]);









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








      {/* ===============================
          SEARCH
      =============================== */}



      <div

        className="
          border-b


          border-white/10


          p-5
        "

      >



        <div

          className="
            relative


            max-w-md
          "

        >



          <Search

            size={19}


            className="
              absolute


              left-4


              top-1/2


              -translate-y-1/2


              text-slate-500
            "

          />





          <input


            type="text"


            value={search}


            onChange={(event)=>

              setSearch(
                event.target.value
              )

            }


            placeholder="Search About section..."


            className="
              h-12


              w-full


              rounded-xl


              border


              border-white/10


              bg-slate-950/70


              pl-11


              pr-4


              text-sm


              text-white


              outline-none


              placeholder:text-slate-500


              transition


              focus:border-emerald-400


              focus:ring-2


              focus:ring-emerald-400/20
            "


          />



        </div>



      </div>









      {/* ===============================
          TABLE
      =============================== */}



      <div

        className="
          w-full


          overflow-x-auto
        "

      >



        <table

          className="
            w-full


            min-w-[1050px]


            border-collapse
          "

        >







          <thead>


            <tr

              className="
                border-b


                border-white/10


                bg-slate-800/50


                text-left
              "

            >



              {
                [

                  "Logo",

                  "About",

                  "Mission",

                  "Vision",

                  "Status",

                  "Actions"

                ]

                .map((item)=>(



                  <th

                    key={item}


                    className="
                      px-5


                      py-5


                      text-xs


                      font-semibold


                      uppercase


                      tracking-wider


                      text-slate-400
                    "

                  >

                    {item}


                  </th>



                ))
              }




            </tr>



          </thead>









          <tbody>



            {

              filteredAbout

              ?

              (

                <AboutTableRow

                  about={
                    filteredAbout
                  }


                  onDelete={
                    onDelete
                  }

                />

              )


              :


              (

                <tr>


                  <td

                    colSpan={6}


                    className="
                      px-6


                      py-14


                      text-center
                    "

                  >




                    <p

                      className="
                        text-sm


                        font-semibold


                        text-white
                      "

                    >

                      {
                        about

                        ?

                        "No About section found."

                        :

                        "No About section available."
                      }


                    </p>







                    {

                      search && about &&

                      (

                        <p

                          className="
                            mt-2


                            text-xs


                            text-slate-500
                          "

                        >

                          Try a different search term.

                        </p>


                      )

                    }






                  </td>


                </tr>


              )

            }





          </tbody>






        </table>





      </div>






    </div>

  );


}