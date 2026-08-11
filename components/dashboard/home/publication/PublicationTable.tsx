"use client";


import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";


import {
  Search,
} from "lucide-react";


import {
  toast,
} from "sonner";



import PublicationLoading from "./PublicationLoading";

import PublicationEmpty from "./PublicationEmpty";

import PublicationTableRow from "./PublicationTableRow";







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









export default function PublicationTable(){





  const [
    publications,
    setPublications
  ] = useState<Publication[]>([]);





  const [
    loading,
    setLoading
  ] = useState(true);





  const [
    search,
    setSearch
  ] = useState("");









  // ==========================
  // GET PUBLICATIONS
  // ==========================



  const getPublications = async()=>{


    try{


      setLoading(true);





      const res =
        await fetch(

          "/api/publications",

          {
            cache:"no-store",
          }

        );






      const result =
        await res.json();







      if(!res.ok){


        throw new Error(

          result.message ||

          "Failed to fetch publications."

        );


      }







      const data =

        Array.isArray(result)

        ?

        result

        :

        Array.isArray(result.data)

        ?

        result.data

        :

        [];







      setPublications(
        data
      );




    }


    catch(error){


      console.error(

        "GET PUBLICATIONS ERROR:",

        error

      );



      toast.error(

        "Failed to load publications."

      );



    }


    finally{


      setLoading(false);


    }


  };









  // ==========================
  // INITIAL LOAD
  // ==========================



  useEffect(()=>{


    const timer =

      setTimeout(()=>{


        getPublications();



      },0);





    return()=>{


      clearTimeout(timer);


    };



  },[]);









  // ==========================
  // SEARCH
  // ==========================



  const filteredPublications =

    useMemo(()=>{


      const searchValue =

        search

        .toLowerCase()

        .trim();






      if(!searchValue){


        return publications;


      }








      return publications.filter(

        (publication)=>

          publication.title

          .toLowerCase()

          .includes(searchValue)


          ||


          publication.category

          .toLowerCase()

          .includes(searchValue)


      );



    },[

      publications,

      search

    ]);












  // ==========================
  // DELETE
  // ==========================



  const handleDelete = async(

    id:string

  )=>{



    try{



      const confirmDelete =

        window.confirm(

          "Are you sure you want to delete this Publication?"

        );






      if(!confirmDelete){


        return;


      }







      const res =

        await fetch(

          `/api/publications/${id}`,

          {

            method:"DELETE",

          }

        );








      const result =

        await res.json();








      if(!res.ok){


        throw new Error(

          result.message ||

          "Delete failed."

        );


      }







      toast.success(

        result.message ||

        "Publication deleted successfully."

      );







      await getPublications();




    }


    catch(error){



      console.error(

        "DELETE PUBLICATION ERROR:",

        error

      );





      toast.error(

        "Delete failed."

      );



    }



  };








  // ==========================
  // LOADING
  // ==========================



  if(loading){


    return (

      <PublicationLoading />

    );


  }








  // ==========================
  // EMPTY
  // ==========================



  if(publications.length===0){


    return (

      <PublicationEmpty />

    );


  }
    return (

    <div
      className="
        space-y-6
      "
    >






      {/* ================= SEARCH BOX ================= */}



      <div
        className="
          rounded-3xl

          border

          border-white/10


          bg-slate-900/70


          p-5


          shadow-[0_25px_80px_rgba(0,0,0,0.35)]


          backdrop-blur-xl
        "
      >



        <div
          className="
            relative

            max-w-lg
          "
        >



          <Search

            size={20}

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


            onChange={(e)=>

              setSearch(
                e.target.value
              )

            }


            placeholder="Search publications..."


            className="
              w-full


              rounded-2xl


              border


              border-white/10


              bg-slate-950/70


              py-3.5


              pl-12


              pr-5


              text-sm


              text-white


              placeholder:text-slate-500


              outline-none


              transition


              focus:border-cyan-400


              focus:ring-2


              focus:ring-cyan-400/20
            "


          />



        </div>




      </div>









      {/* ================= NO SEARCH RESULT ================= */}



      {
        filteredPublications.length===0

        &&

        (

          <div
            className="
              flex

              min-h-[300px]

              items-center

              justify-center


              rounded-3xl


              border

              border-white/10


              bg-slate-900/70


              shadow-xl


              backdrop-blur-xl
            "
          >


            <div
              className="
                text-center
              "
            >


              <h3
                className="
                  text-xl

                  font-bold

                  text-white
                "
              >

                No Publication Found

              </h3>



              <p
                className="
                  mt-2

                  text-sm

                  text-slate-400
                "
              >

                Try searching with another keyword.

              </p>



            </div>



          </div>

        )

      }









           {/* ================= DESKTOP TABLE ================= */}



      <div
        className="
          hidden

          overflow-hidden

          rounded-3xl


          border

          border-white/10


          bg-slate-900/70


          shadow-[0_25px_80px_rgba(0,0,0,0.35)]


          backdrop-blur-xl


          lg:block
        "
      >




        <div
          className="
            overflow-x-auto
          "
        >




          <table
            className="
              min-w-full
            "
          >





            <thead>


              <tr
                className="
                  border-b

                  border-white/10


                  bg-slate-800/50
                "
              >



                {
                  [

                    "Title",

                    "Category",

                    "Date",

                    "Order",

                    "Status",

                    "Created",

                    "Actions"

                  ].map((item)=>(


                    <th

                      key={item}


                      className="
                        px-6

                        py-5


                        text-left


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

                filteredPublications.map(

                  (publication)=>(


                    <PublicationTableRow


                      key={
                        publication._id
                      }


                      publication={
                        publication
                      }


                      onDelete={
                        handleDelete
                      }


                    />


                  )

                )

              }



            </tbody>






          </table>





        </div>



      </div>
            {/* ================= MOBILE CARDS ================= */}



      <div
        className="
          space-y-5

          lg:hidden
        "
      >




        {
          filteredPublications.map(

            (publication)=>(


              <div
                key={
                  publication._id
                }


                className="
                  rounded-3xl


                  border

                  border-white/10


                  bg-slate-900/70


                  p-5


                  shadow-xl


                  backdrop-blur-xl
                "
              >






                {/* TITLE */}



                <h3
                  className="
                    line-clamp-2

                    text-lg

                    font-bold

                    text-white
                  "
                >

                  {
                    publication.title
                  }


                </h3>









                {/* BADGES */}



                <div
                  className="
                    mt-4

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

                    {
                      publication.category
                    }


                  </span>





                  <span
                    className={`
                      rounded-full

                      px-3

                      py-1

                      text-xs

                      font-semibold


                      ${
                        publication.isPublished

                        ?

                        "bg-emerald-400/10 text-emerald-400"

                        :

                        "bg-red-400/10 text-red-400"

                      }

                    `}
                  >

                    {
                      publication.isPublished

                      ?

                      "Published"

                      :

                      "Unpublished"
                    }


                  </span>



                </div>









                {/* INFORMATION */}



                <div
                  className="
                    mt-5

                    grid

                    grid-cols-2

                    gap-3
                  "
                >




                  <div
                    className="
                      rounded-2xl


                      border

                      border-white/10


                      bg-slate-950/60


                      p-3
                    "
                  >


                    <p
                      className="
                        text-xs

                        text-slate-500
                      "
                    >

                      Date

                    </p>



                    <p
                      className="
                        mt-1

                        text-sm

                        font-semibold

                        text-white
                      "
                    >

                      {
                        new Date(
                          publication.date
                        )
                        .toLocaleDateString()
                      }


                    </p>



                  </div>









                  <div
                    className="
                      rounded-2xl


                      border

                      border-white/10


                      bg-slate-950/60


                      p-3
                    "
                  >


                    <p
                      className="
                        text-xs

                        text-slate-500
                      "
                    >

                      Order

                    </p>




                    <p
                      className="
                        mt-1

                        text-sm

                        font-semibold

                        text-white
                      "
                    >

                      #
                      {
                        publication.order
                      }


                    </p>


                  </div>




                </div>









                {/* ACTIONS */}



                <div
                  className="
                    mt-5

                    overflow-x-auto
                  "
                >


                  <div
                    className="
                      min-w-[650px]
                    "
                  >


                    <table
                      className="
                        hidden
                      "
                    >

                      <tbody>

                        <PublicationTableRow

                          publication={
                            publication
                          }


                          onDelete={
                            handleDelete
                          }

                        />


                      </tbody>


                    </table>



                  </div>



                </div>






              </div>



            )

          )

        }





      </div>






    </div>

  );


}
