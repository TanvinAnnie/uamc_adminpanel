"use client";


import {
  ArrowLeft,
  Building2,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";


import {
  useEffect,
  useState,
} from "react";


import DepartmentSectionForm, {
  DepartmentSectionFormData,
} from "@/components/dashboard/home/departments/DepartmentSectionForm";


import DepartmentSectionPreview from "@/components/dashboard/home/departments/DepartmentSectionPreview";


import { toast } from "sonner";


// =========================================================
// DEFAULT DATA
// =========================================================


const defaultFormData: DepartmentSectionFormData = {

  title: "",

  description: "",

  searchPlaceholder: "",

  popularSearches: [],

  imageOne: "",

  imageTwo: "",

  studentCount: "",

  studentCountText: "",

  isActive: true,

};




// =========================================================
// PAGE
// =========================================================


export default function EditDepartmentSectionPage({

  params,

}: {

  params: Promise<{
    id:string;
  }>;

}) {


  const router = useRouter();


  const [sectionId,setSectionId] =
    useState("");



  const [
    formData,
    setFormData,
  ] = useState<DepartmentSectionFormData>(
    defaultFormData
  );



  const [
    loading,
    setLoading,
  ] = useState(true);





  // =====================================================
  // LOAD DATA
  // =====================================================


  useEffect(()=>{


    const loadData = async()=>{


      try{


        const {id} = await params;


        setSectionId(id);



        const response =
          await fetch(
            `/api/department-section?id=${id}`,
            {
              cache:"no-store",
            }
          );



        const result =
          await response.json();




        if(
          !response.ok ||
          !result.success
        ){

          throw new Error(
            result.message ||
            "Failed to load section."
          );

        }



        setFormData(
          result.data
        );



      }
      catch(error){


        console.error(
          error
        );


        toast.error(
          "Failed to load department section."
        );


      }
      finally{


        setLoading(false);


      }


    };



    loadData();



  },[params]);







  // =====================================================
  // SUCCESS
  // =====================================================


  const handleSuccess = ()=>{


    router.push(
      "/dashboard/home/departments/section"
    );


    router.refresh();


  };







  if(loading){


    return (

      <div className="p-8 text-slate-500">

        Loading Department Section...

      </div>

    );


  }






  return (

    <div
      className="
      w-full
      space-y-6
      p-4
      sm:p-6
      lg:p-8
      "
    >



      {/* HEADER */}



      <div>


        <button

          type="button"

          onClick={()=>
            router.push(
              "/dashboard/home/departments/section"
            )
          }

          className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-600
          hover:text-[#008B45]
          "

        >


          <ArrowLeft size={17}/>


          Back to Department Section


        </button>





        <div
          className="
          mt-5
          flex
          items-center
          gap-3
          "
        >


          <div
            className="
            flex
            h-11
            w-11
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

              Edit Department Section

            </h1>



            <p
              className="
              mt-1
              text-sm
              text-slate-500
              "
            >

              Update Find Your Department section.

            </p>


          </div>



        </div>


      </div>






      {/* FORM + PREVIEW */}



      <div

        className="
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]
        xl:items-start
        "

      >



        <div className="min-w-0">


          <DepartmentSectionForm


            initialData={formData}


            sectionId={sectionId}


            onDataChange={
              setFormData
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


          <DepartmentSectionPreview


            data={formData}


          />



        </div>




      </div>




    </div>

  );


}