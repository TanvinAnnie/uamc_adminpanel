"use client";


import {
  ArrowLeft,
  Building2,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";


import {
  useState,
} from "react";



import DepartmentSectionForm, {
  DepartmentSectionFormData,
} from "@/components/dashboard/home/departments/DepartmentSectionForm";


import DepartmentSectionPreview
from "@/components/dashboard/home/departments/DepartmentSectionPreview";





// =========================================================
// DEFAULT DATA
// =========================================================


const defaultFormData: DepartmentSectionFormData = {

  title:"",

  description:"",

  searchPlaceholder:"",

  popularSearches:[],

  imageOne:"",

  imageTwo:"",

  studentCount:"",

  studentCountText:"",

  isActive:true,

};









// =========================================================
// PAGE
// =========================================================


export default function NewDepartmentSectionPage(){



  const router = useRouter();





  // =======================================================
  // PREVIEW STATE
  // =======================================================


  const [
    previewData,
    setPreviewData,
  ] =
  useState<DepartmentSectionFormData>(
    defaultFormData
  );









  // =======================================================
  // SUCCESS
  // =======================================================


  const handleSuccess = ()=>{


    router.push(
      "/dashboard/home/departments/section"
    );


    router.refresh();


  };









  return(


    <div
      className="
        w-full
        space-y-6
        p-4

        sm:p-6

        lg:p-8
      "
    >






      {/* =================================================
          HEADER
      ================================================= */}



      <div
        className="
          space-y-5
        "
      >





        {/* BACK BUTTON */}



        <button

          type="button"

          onClick={()=>router.push(
            "/dashboard/home/departments/section"
          )}

          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-600
            transition
            hover:text-[#008B45]
          "

        >

          <ArrowLeft size={17}/>


          Back to Department Section


        </button>








        {/* TITLE */}



        <div
          className="
            flex
            items-start
            gap-3
          "
        >




          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#E8F7F0]
              text-[#008B45]
            "
          >

            <Building2 size={22}/>


          </div>







          <div>


            <h1
              className="
                text-2xl
                font-bold
                text-slate-800

                sm:text-3xl
              "
            >

              Create Department Section

            </h1>




            <p
              className="
                mt-1
                text-sm
                leading-6
                text-slate-500

                sm:text-base
              "
            >

              Configure the Find Your Department
              section.

            </p>




          </div>





        </div>






      </div>









      {/* =================================================
          FORM + PREVIEW
      ================================================= */}



      <div
        className="
          grid
          gap-6

          xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]

          xl:items-start
        "
      >






        {/* FORM */}



        <div
          className="
            min-w-0
          "
        >



          <DepartmentSectionForm

            initialData={previewData}

            onDataChange={
              setPreviewData
            }

            onSuccess={
              handleSuccess
            }

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



          <DepartmentSectionPreview

            data={
              previewData
            }

          />



        </div>






      </div>







    </div>


  );


}