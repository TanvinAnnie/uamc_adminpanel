"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  ArrowLeft,
  Edit3,
  Plus,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";


import AboutLoading from "@/components/dashboard/home/about/AboutLoading";

import AboutEmpty from "@/components/dashboard/home/about/AboutEmpty";

import AboutTable from "@/components/dashboard/home/about/AboutTable";


import type {
  AboutData,
} from "@/components/dashboard/home/about/AboutTableRow";





// =====================================
// HEADER COMPONENT
// =====================================


function AboutHeader({
  router,
  about,
}: {
  router: ReturnType<typeof useRouter>;
  about: AboutData | null;
}) {


  return (

    <div
      className="
        flex
        flex-col
        gap-5
        rounded-3xl
        border
        border-white/10
        bg-slate-900/70
        p-5
        shadow-xl
        backdrop-blur-xl
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:p-6
      "
    >


      <div>


        <h1
          className="
            text-2xl
            font-bold
            text-white
            sm:text-3xl
          "
        >
          About UAMC
        </h1>



        <p
          className="
            mt-2
            text-sm
            text-slate-400
          "
        >
          Manage the About section of the website.
        </p>


      </div>





      <div
        className="
          flex
          flex-wrap
          gap-3
        "
      >



        <button
          type="button"
          onClick={() =>
            router.push("/dashboard")
          }
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-3
            text-sm
            font-semibold
            text-slate-300
            transition
            hover:bg-white/10
            hover:text-white
          "
        >

          <ArrowLeft size={17}/>

          Back Dashboard

        </button>






        {
          about ? (

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/dashboard/home/about/edit/${about._id}`
                )
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-emerald-500
                to-cyan-500
                px-5
                py-3
                text-sm
                font-bold
                text-white
              "
            >

              <Edit3 size={17}/>

              Edit About

            </button>


          ) : (


            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard/home/about/new"
                )
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-emerald-500
                to-cyan-500
                px-5
                py-3
                text-sm
                font-bold
                text-white
              "
            >

              <Plus size={18}/>

              Create About

            </button>


          )
        }



      </div>


    </div>

  );

}









// =====================================
// MAIN PAGE
// =====================================


export default function AboutPage() {


  const router = useRouter();




  const [
    about,
    setAbout
  ] = useState<AboutData | null>(null);




  const [
    loading,
    setLoading
  ] = useState(true);








  // =====================================
  // FETCH ABOUT
  // =====================================


  useEffect(() => {


    let cancelled = false;



    const loadAbout = async () => {


      try {


        const response = await fetch(
          "/api/about",
          {
            cache:"no-store",
          }
        );



        const data =
          await response.json();





        if(cancelled){

          return;

        }





        if(response.status === 404){


          setAbout(null);

          setLoading(false);

          return;

        }







        if(!response.ok || !data.success){


          throw new Error(
            data.message ||
            "Failed to fetch About section."
          );


        }





        setAbout(data.data);




      }


      catch(error){



        console.error(
          "FETCH ABOUT ERROR:",
          error
        );



        toast.error(

          error instanceof Error

          ?

          error.message

          :

          "Failed to fetch About section."

        );


      }


      finally{


        if(!cancelled){

          setLoading(false);

        }


      }



    };





    loadAbout();





    return()=>{

      cancelled=true;

    };



  }, []);









  const handleDelete = () => {

    setAbout(null);

  };









  // =====================================
  // LOADING
  // =====================================


  if(loading){


    return (

      <div
        className="
          min-h-screen
          bg-slate-950
          p-4
          sm:p-6
          lg:p-8
        "
      >

        <AboutLoading/>

      </div>

    );

  }









  // =====================================
  // EMPTY
  // =====================================


  if(!about){


    return (

      <div
        className="
          min-h-screen
          space-y-6
          bg-slate-950
          p-4
          sm:p-6
          lg:p-8
        "
      >


        <AboutHeader
          router={router}
          about={null}
        />



        <AboutEmpty />


      </div>

    );


  }









  // =====================================
  // DATA AVAILABLE
  // =====================================


  return (

    <div
      className="
        min-h-screen
        space-y-6
        bg-slate-950
        p-4
        sm:p-6
        lg:p-8
      "
    >



      <AboutHeader
        router={router}
        about={about}
      />





      <AboutTable
        about={about}
        onDelete={handleDelete}
      />




    </div>

  );


}