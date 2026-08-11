"use client";


import {
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


import DepartmentLoading from "@/components/dashboard/home/departments/DepartmentLoading";


import DepartmentEmpty from "@/components/dashboard/home/departments/DepartmentEmpty";


import DepartmentTable from "@/components/dashboard/home/departments/DepartmentTable";


import type {
  DepartmentData,
} from "@/components/dashboard/home/departments/DepartmentTableRow";





// =====================================================
// PAGE
// =====================================================


export default function DepartmentsPage(){


  const router = useRouter();



  const [
    departments,
    setDepartments,
  ] = useState<DepartmentData[]>([]);




  const [
    loading,
    setLoading,
  ] = useState(true);






  // =====================================================
  // FETCH DEPARTMENTS
  // =====================================================


  useEffect(()=>{


    let mounted=true;



    const loadDepartments=async()=>{


      try{


        const response =
          await fetch(

            "/api/departments",

            {
              cache:"no-store",
            }

          );



        const data =
          await response.json();





        if(!mounted) return;





        if(
          !response.ok ||
          !data.success
        ){


          throw new Error(

            data.message ||

            "Failed to load departments."

          );


        }






        setDepartments(

          Array.isArray(data.data)

          ?

          data.data

          :

          []

        );



      }


      catch(error){


        console.error(
          "FETCH DEPARTMENT ERROR:",
          error
        );



        toast.error(

          error instanceof Error

          ?

          error.message

          :

          "Failed to load departments."

        );



        setDepartments([]);



      }


      finally{


        if(mounted){

          setLoading(false);

        }


      }


    };




    loadDepartments();



    return()=>{

      mounted=false;

    };


  },[]);









  // =====================================================
  // DELETE
  // =====================================================


  const handleDelete=(id:string)=>{


    setDepartments(

      current =>

      current.filter(

        item=>item._id!==id

      )

    );


  };








  // =====================================================
  // LOADING
  // =====================================================


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


        <DepartmentLoading/>


      </div>

    );


  }









  // =====================================================
  // EMPTY
  // =====================================================


  if(departments.length===0){


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


        <Header
          router={router}
        />



        <DepartmentEmpty/>



      </div>

    );


  }









  // =====================================================
  // MAIN PAGE
  // =====================================================


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




      <Header

        router={router}

      />







      {/* COUNT CARD */}



      <div

        className="
        rounded-2xl
        border
        border-slate-800
        bg-[#080f24]
        px-5
        py-5
        shadow-xl
        "

      >


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


            <p
              className="
              text-sm
              text-slate-400
              "
            >

              Total Departments

            </p>




            <p
              className="
              mt-2
              text-3xl
              font-bold
              text-white
              "
            >

              {departments.length}

            </p>



          </div>






          <div

            className="
            w-fit
            rounded-xl
            border
            border-emerald-400/20
            bg-emerald-400/10
            px-4
            py-2
            text-sm
            font-semibold
            text-emerald-400
            "

          >

            Academic Programs


          </div>





        </div>


      </div>









      <DepartmentTable

        departments={departments}

        onDelete={handleDelete}

      />





    </div>


  );


}









// =====================================================
// HEADER COMPONENT
// =====================================================


function Header({

router,

}:{

router:any;

}){


return(


<div

className="
rounded-2xl
border
border-slate-800
bg-[#080f24]
px-5
py-5
shadow-xl

sm:px-6
"

>


<div

className="
flex
flex-col
gap-5

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
border
border-emerald-400/20
bg-emerald-400/10
text-emerald-400
"

>


<Building2 size={22}/>


</div>





<div>


<h1

className="
text-2xl
font-bold
text-white

sm:text-3xl
"

>

Departments

</h1>




<p

className="
mt-1
text-sm
text-slate-400

sm:text-base
"

>

Manage all academic departments available on the website.

</p>



</div>



</div>



</div>








<button


type="button"


onClick={()=>


router.push(

"/dashboard/home/departments/new"

)

}



className="
inline-flex
min-h-11
w-full
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
transition
hover:bg-[#00763B]

sm:w-auto
"


>


<Plus size={18}/>


Create Department


</button>




</div>


</div>


);


}