"use client";


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


import NoticeLoading from "./NoticeLoading";
import NoticeEmpty from "./NoticeEmpty";
import NoticeTableRow from "./NoticeTableRow";



interface Notice {

  _id:string;

  title:string;

  slug:string;

  category:
    | "General Notice"
    | "Admission Notice"
    | "Reports"
    | "Job Circular";

  description:string;

  pdf:string;

  date:string;

  time:string;

  isPublished:boolean;

  order:number;

  createdAt:string;

}





export default function NoticeTable(){


  const [notices,setNotices] =
    useState<Notice[]>([]);



  const [loading,setLoading] =
    useState(true);



  const [search,setSearch] =
    useState("");





  // ==========================
  // GET ALL NOTICES
  // ==========================


  const getNotices = async()=>{


    try{


      setLoading(true);



      const res =
        await fetch(
          "/api/notices",
          {
            cache:"no-store",
          }
        );



      const result =
        await res.json();




      if(!res.ok){

        throw new Error(
          result.message ||
          "Failed to load notices."
        );

      }



      setNotices(
        result.data || []
      );



    }

    catch(error){


      console.error(
        "GET NOTICE ERROR:",
        error
      );


      toast.error(

        error instanceof Error

        ? error.message

        : "Failed to load notices."

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


    void Promise.resolve().then(()=>getNotices());


  },[]);







  // ==========================
  // SEARCH
  // ==========================


  const filteredNotices =
    useMemo(()=>{


      return notices.filter(
        (notice)=>

          notice.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      );


    },[
      notices,
      search
    ]);








  // ==========================
  // DELETE NOTICE
  // ==========================


  const handleDelete =
    async(id:string)=>{


    try{


      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this Notice?"
        );



      if(!confirmDelete)
        return;





      const res =
        await fetch(
          `/api/notices/${id}`,
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
        result.message
      );



      await getNotices();



    }

    catch(error){


      console.error(
        "DELETE NOTICE ERROR:",
        error
      );



      toast.error(

        error instanceof Error

        ? error.message

        : "Delete failed."

      );


    }


  };







  // ==========================
  // LOADING
  // ==========================


  if(loading){

    return <NoticeLoading/>;

  }






  // ==========================
  // EMPTY
  // ==========================


  if(filteredNotices.length===0){


    return (

      <NoticeEmpty

        title={
          search
          ? "No Notice Found"
          : "No Notices Available"
        }


        description={
          search
          ? "No notices matched your search."
          : "There are no notices available. Click the Add Notice button to create your first notice."
        }

      />

    );


  }
    return (

    <div
      className="
        space-y-6
      "
    >


      {/* ================= SEARCH ================= */}


      <div
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

            placeholder="Search notices..."

            value={search}

            onChange={(e)=>
              setSearch(e.target.value)
            }


            className="
              w-full

              rounded-2xl

              border

              border-white/10

              bg-slate-950/70

              py-3

              pl-12

              pr-4

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

                  bg-slate-800/60
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
                filteredNotices.map(
                  (notice)=>(

                    <NoticeTableRow

                      key={notice._id}

                      notice={notice}

                      onDelete={handleDelete}

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
          filteredNotices.map(
            (notice)=>(


              <div
                key={notice._id}

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


                {/* Title */}


                <h3
                  className="
                    line-clamp-2

                    text-lg

                    font-bold

                    text-white
                  "
                >

                  {notice.title}

                </h3>





                {/* Category */}


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

                      bg-cyan-500/10

                      px-3

                      py-1

                      text-xs

                      font-semibold

                      text-cyan-400
                    "
                  >

                    {notice.category}

                  </span>




                  <span
                    className={`
                      rounded-full

                      px-3

                      py-1

                      text-xs

                      font-semibold


                      ${
                        notice.isPublished

                        ?

                        "bg-emerald-500/10 text-emerald-400"

                        :

                        "bg-red-500/10 text-red-400"
                      }
                    `}
                  >

                    {
                      notice.isPublished

                      ? "Published"

                      : "Unpublished"
                    }


                  </span>



                </div>






                {/* Information */}


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
                          notice.date
                        ).toLocaleDateString()
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

                      #{notice.order}

                    </p>


                  </div>


                </div>






                {/* Actions */}


                <div
                  className="
                    mt-5
                  "
                >

                  <NoticeTableRow

                    notice={notice}

                    onDelete={handleDelete}

                  />

                </div>



              </div>


            )
          )
        }


      </div>



    </div>

  );

}