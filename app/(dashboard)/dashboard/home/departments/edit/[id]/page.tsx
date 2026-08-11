"use client";


import {
  ArrowLeft,
  Building2,
  Loader2,
} from "lucide-react";


import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  useEffect,
  useState,
} from "react";


import {
  toast,
} from "sonner";



import DepartmentForm, {
  DepartmentFormData,
} from "@/components/dashboard/home/departments/DepartmentForm";


import DepartmentPreview from "@/components/dashboard/home/departments/DepartmentPreview";


import type {
  DepartmentData,
} from "@/components/dashboard/home/departments/DepartmentTableRow";








export default function EditDepartmentPage(){


  const router = useRouter();


  const params = useParams();


  const id =
    typeof params.id === "string"
    ?
    params.id
    :
    "";







  const [
    department,
    setDepartment,
  ] =
  useState<DepartmentData | null>(null);





  const [
    previewData,
    setPreviewData,
  ] =
  useState<DepartmentFormData>({

    name:"",

    slug:"",

    image:"",

    description:"",

    isPopular:false,

    isActive:true,

    order:0,

  });







  const [
    loading,
    setLoading,
  ] =
  useState(true);










  // =====================================================
  // FETCH DEPARTMENT
  // =====================================================


  useEffect(()=>{


    if(!id){

      return;

    }




    let cancelled=false;



    const loadDepartment=async()=>{


      try{


        const response =
          await fetch(

            `/api/departments/${id}`,

            {
              cache:"no-store",
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
            "Failed to load department."

          );

        }





        const item =
          data.data as DepartmentData;




        setDepartment(item);



        setPreviewData({

          name:item.name || "",

          slug:item.slug || "",

          image:item.image || "",

          description:item.description || "",

          isPopular:item.isPopular ?? false,

          isActive:item.isActive ?? true,

          order:item.order ?? 0,

        });



      }

      catch(error){



        console.error(
          "LOAD DEPARTMENT ERROR:",
          error
        );



        toast.error(

          error instanceof Error

          ?

          error.message

          :

          "Failed to load department."

        );


      }


      finally{


        if(!cancelled){

          setLoading(false);

        }


      }


    };




    loadDepartment();




    return()=>{

      cancelled=true;

    };


  },[id]);












  // =====================================================
  // PREVIEW UPDATE
  // =====================================================


  const handlePreviewChange = (
    data:DepartmentFormData
  )=>{


    setPreviewData(data);


  };









  // =====================================================
  // UPDATE SUCCESS
  // =====================================================


  const handleSuccess = (
    updated:DepartmentData
  )=>{


    setDepartment(updated);



    setPreviewData({

      name:updated.name || "",

      slug:updated.slug || "",

      image:updated.image || "",

      description:updated.description || "",

      isPopular:updated.isPopular ?? false,

      isActive:updated.isActive ?? true,

      order:updated.order ?? 0,

    });



    toast.success(
      "Department updated successfully."
    );



    router.push(
      "/dashboard/home/departments"
    );


    router.refresh();


  };









  // =====================================================
  // LOADING
  // =====================================================


  if(loading){


    return(

      <div
        className="
          flex
          min-h-[500px]
          items-center
          justify-center
        "
      >


        <div
          className="
            text-center
          "
        >


          <Loader2

            size={38}

            className="
              mx-auto
              animate-spin
              text-[#008B45]
            "

          />



          <p
            className="
              mt-4
              text-sm
              text-slate-500
            "
          >

            Loading Department...

          </p>



        </div>



      </div>

    );


  }









  // =====================================================
  // NOT FOUND
  // =====================================================


  if(!department){


    return(

      <div
        className="
          flex
          min-h-[500px]
          flex-col
          items-center
          justify-center
          text-center
          px-6
        "
      >


        <Building2
          size={42}
          className="
            text-red-400
          "
        />



        <h2
          className="
            mt-5
            text-xl
            font-bold
            text-slate-800
          "
        >

          Department Not Found

        </h2>




        <button

          type="button"

          onClick={()=>router.push(
            "/dashboard/home/departments"
          )}

          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-[#008B45]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            hover:bg-[#00763B]
          "

        >

          <ArrowLeft size={17}/>

          Back to Departments


        </button>



      </div>


    );


  }









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







      {/* HEADER */}


      <div>


        <button

          type="button"

          onClick={()=>router.push(
            "/dashboard/home/departments"
          )}

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

          Back to Departments


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

              Edit Department

            </h1>



            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >

              Update department information.

            </p>


          </div>



        </div>



      </div>










      {/* FORM + PREVIEW */}



      <div
        className="
          grid
          gap-6
          xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]
          xl:items-start
        "
      >



        <div>

          <DepartmentForm

            initialData={department}

            onDataChange={handlePreviewChange}

            onSuccess={handleSuccess}

          />

        </div>






        <div
          className="
            xl:sticky
            xl:top-6
          "
        >

          <DepartmentPreview

            data={previewData}

          />

        </div>





      </div>





    </div>


  );


}