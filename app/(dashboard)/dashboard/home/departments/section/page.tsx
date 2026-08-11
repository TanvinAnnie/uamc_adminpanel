"use client";


import {
  ArrowLeft,
  Building2,
  Plus,
} from "lucide-react";


import {
  useEffect,
  useState,
} from "react";


import {
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";



import DepartmentSectionLoading
from "@/components/dashboard/home/departments/DepartmentSectionLoading";


import DepartmentSectionEmpty
from "@/components/dashboard/home/departments/DepartmentSectionEmpty";


import DepartmentSectionTable
from "@/components/dashboard/home/departments/DepartmentSectionTable";


import type {
  DepartmentSectionData,
} from "@/components/dashboard/home/departments/DepartmentSectionRow";









export default function DepartmentSectionPage(){


  const router = useRouter();





  const [
    section,
    setSection,
  ] =
  useState<DepartmentSectionData | null>(null);





  const [
    loading,
    setLoading,
  ] =
  useState(true);









  // =====================================================
  // FETCH SECTION
  // =====================================================


  useEffect(()=>{


    let mounted=true;



    const loadSection=async()=>{


      try{


        const response =
          await fetch(

            "/api/department-section",

            {
              cache:"no-store",
            }

          );



        const data =
          await response.json();





        if(!mounted){

          return;

        }





        if(response.status===404){


          setSection(null);

          return;


        }







        if(
          !response.ok ||
          !data.success
        ){


          throw new Error(

            data.message ||

            "Failed to load department section."

          );


        }






        setSection(
          data.data
        );




      }

      catch(error){



        console.error(
          "FETCH DEPARTMENT SECTION ERROR:",
          error
        );



        toast.error(

          error instanceof Error

          ?

          error.message

          :

          "Failed to load section."

        );



      }


      finally{


        if(mounted){

          setLoading(false);

        }


      }


    };




    loadSection();




    return()=>{

      mounted=false;

    };


  },[]);









  // =====================================================
  // DELETE
  // =====================================================


  const handleDelete=(id:string)=>{


    if(section?._id===id){

      setSection(null);

    }


  };









  if(loading){


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


        <DepartmentSectionLoading/>


      </div>

    );


  }









  if(!section){


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



        <SectionHeader

          router={router}

          empty

        />



        <DepartmentSectionEmpty/>



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




      <SectionHeader

        router={router}

      />





      <DepartmentSectionTable

        section={section}

        onDelete={handleDelete}

      />




    </div>


  );


}









// =====================================================
// HEADER
// =====================================================


function SectionHeader({

  router,

  empty=false,

}:{

  router:any;

  empty?:boolean;

}){


return(


<div
className="
flex
flex-col
gap-4

sm:flex-row
sm:items-center
sm:justify-between
"
>




<div>


<div
className="
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

Department Section

</h1>



<p
className="
mt-1
text-sm
text-slate-500
sm:text-base
"
>

Manage the Find Your Department section.

</p>


</div>



</div>


</div>







<button

type="button"

onClick={()=>{


if(empty){

router.push(
"/dashboard/home/departments/section/new"
);


}

else{

router.push(
`/dashboard/home/departments/section/edit`
);


}


}}

className="
inline-flex
min-h-11
items-center
justify-center
gap-2
rounded-xl
bg-[#008B45]
px-5
py-3
text-sm
font-semibold
text-white
shadow-sm
transition
hover:bg-[#00763B]
"

>


{

empty

?

<>

<Plus size={18}/>

Create Section

</>


:

<>

Edit Section

</>


}



</button>





</div>


);


}