"use client";


import {
  useCallback,
  useEffect,
  useState,
} from "react";


import {
  ArrowLeft,
  Loader2,
} from "lucide-react";


import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";



import AboutForm from "@/components/dashboard/home/about/AboutForm";

import AboutPreview from "@/components/dashboard/home/about/AboutPreview";


import type {
  AboutData,
} from "@/components/dashboard/home/about/AboutTableRow";









export default function EditAboutPage(){



  const router = useRouter();


  const params = useParams();





  const id =

    typeof params.id === "string"

    ?

    params.id

    :

    "";









  const [

    about,

    setAbout

  ] = useState<AboutData|null>(null);





  const [

    previewData,

    setPreviewData

  ] = useState<AboutData|null>(null);





  const [

    loading,

    setLoading

  ] = useState(true);









  // ===============================
  // FETCH ABOUT
  // ===============================



  useEffect(()=>{


    if(!id){

      return;

    }





    let cancelled=false;






    const loadAbout=async()=>{


      try{



        const response = await fetch(

          "/api/about",

          {

            cache:"no-store"

          }

        );






        const data =
          await response.json();







        if(cancelled){

          return;

        }







        if(

          !response.ok ||

          !data.success

        ){

          throw new Error(

            data.message ||

            "Failed to fetch About section."

          );


        }








        setAbout(data.data);


        setPreviewData(data.data);






      }


      catch(error){



        if(cancelled){

          return;

        }






        console.error(

          "FETCH ABOUT FOR EDIT ERROR:",

          error

        );






        toast.error(

          error instanceof Error

          ?

          error.message

          :

          "Failed to load About section."

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






  },[id]);









  // ===============================
  // PREVIEW CHANGE
  // ===============================



  const handlePreviewChange = useCallback(

    (data:Partial<AboutData>)=>{


      setPreviewData(previous=>{


        if(!previous){

          return null;

        }



        return{

          ...previous,

          ...data,

        };


      });



    },

    []

  );









  // ===============================
  // SUCCESS
  // ===============================



  const handleSuccess = useCallback(

    (updatedData:AboutData)=>{


      setAbout(updatedData);


      setPreviewData(updatedData);





      toast.success(

        "About section updated successfully."

      );





      router.push(

        "/dashboard/home/about"

      );



    },

    [router]

  );









  // ===============================
  // LOADING
  // ===============================



  if(loading){


    return(


      <div

        className="
          flex


          min-h-screen


          items-center


          justify-center


          bg-slate-950
        "

      >


        <div

          className="
            flex


            flex-col


            items-center


            rounded-3xl


            border


            border-white/10


            bg-slate-900/70


            px-10


            py-8


            backdrop-blur-xl
          "

        >


          <Loader2

            size={36}


            className="
              animate-spin


              text-emerald-400
            "

          />



          <p

            className="
              mt-4


              text-sm


              text-slate-400
            "

          >

            Loading About section...

          </p>



        </div>


      </div>


    );


  }









  // ===============================
  // NOT FOUND
  // ===============================



  if(!about || !previewData){



    return(


      <div

        className="
          flex


          min-h-screen


          flex-col


          items-center


          justify-center


          bg-slate-950


          p-6


          text-center
        "

      >



        <div

          className="
            rounded-3xl


            border


            border-white/10


            bg-slate-900/70


            p-8
          "

        >



          <h2

            className="
              text-xl


              font-bold


              text-white
            "

          >

            About Section Not Found

          </h2>





          <p

            className="
              mt-3


              text-sm


              text-slate-400
            "

          >

            The About section could not be loaded.

          </p>






          <button


            type="button"


            onClick={()=>


              router.push(

                "/dashboard/home/about"

              )


            }


            className="
              mt-6


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


            <ArrowLeft size={17}/>


            Back to About



          </button>





        </div>






      </div>


    );



  }









  return(


    <div

      className="
        min-h-screen


        bg-slate-950


        p-4


        sm:p-6


        lg:p-8
      "

    >




      <div

        className="
          mx-auto


          max-w-[1800px]


          space-y-6
        "

      >









        {/* BACK BUTTON */}




        <button


          type="button"


          onClick={()=>


            router.push(

              "/dashboard/home/about"

            )


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


            py-2.5


            text-sm


            font-semibold


            text-slate-300


            transition


            hover:bg-white/10


            hover:text-white
          "

        >



          <ArrowLeft size={17}/>


          Back to About



        </button>









        {/* HEADER */}




        <div

          className="
            rounded-3xl


            border


            border-white/10


            bg-slate-900/70


            p-5


            shadow-xl


            backdrop-blur-xl


            sm:p-6
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

            Edit About UAMC

          </h1>




          <p

            className="
              mt-2


              text-sm


              text-slate-400
            "

          >

            Update the About section of the website.

          </p>



        </div>









        {/* FORM + PREVIEW */}




        <div

          className="
            grid


            items-start


            gap-6


            xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]
          "

        >





          <div className="min-w-0">


            <AboutForm


              initialData={about}


              onDataChange={
                handlePreviewChange
              }


              onSuccess={
                handleSuccess
              }


            />


          </div>








          <div

            className="
              min-w-0


              xl:sticky


              xl:top-6
            "

          >



            <AboutPreview


              data={previewData}


            />



          </div>






        </div>






      </div>






    </div>


  );


}