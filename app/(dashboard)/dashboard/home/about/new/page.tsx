"use client";


import {
  useState,
} from "react";


import {
  ArrowLeft,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";



import AboutForm, {
  AboutFormData,
} from "@/components/dashboard/home/about/AboutForm";


import AboutPreview from "@/components/dashboard/home/about/AboutPreview";







const defaultPreviewData:AboutFormData={


  tagline:"knowledge meets innovation",


  title:"About",


  highlightText:"UAMC",





  descriptionOne:
    "Uttara Adhunik Medical College (UAMC) is a prestigious medical institution located in Uttara Model Town, Dhaka, Bangladesh. Established in 2003.",




  descriptionTwo:
    "UAMC offers a Bachelor of Medicine and Bachelor of Surgery (MBBS) program, designed to equip students with the knowledge, skills, and hands-on clinical training needed to excel in the medical profession.",





  imageOne:"",

  imageTwo:"",

  logo:"",





  missionTitle:"College Mission Statement",

  missionLink:"/about/mission",





  visionTitle:"College Vision Achievement",

  visionLink:"/about/vision",





  buttonText:"View Our Program",

  buttonLink:"/admission",





  isActive:true,


};









export default function NewAboutPage(){



  const router = useRouter();





  const [

    previewData,

    setPreviewData

  ] = useState<AboutFormData>(

    defaultPreviewData

  );









  const handleSuccess=()=>{


    toast.success(

      "About section created successfully."

    );



    router.push(

      "/dashboard/home/about"

    );



  };









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


          onClick={()=>router.back()}


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

            Add About UAMC

          </h1>





          <p

            className="
              mt-2


              text-sm


              text-slate-400


              sm:text-base
            "

          >

            Create the About section for the homepage.

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





          {/* FORM */}




          <div

            className="
              min-w-0
            "

          >



            <AboutForm

              onSuccess={handleSuccess}


              onDataChange={setPreviewData}

            />



          </div>









          {/* PREVIEW */}





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