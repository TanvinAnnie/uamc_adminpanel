"use client";


import {
  Building2,
  Edit3,
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






// =====================================================
// PAGE
// =====================================================


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


let mounted = true;



const loadSection = async()=>{


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

"Failed to load department section."

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


if(
section?._id === id
){

setSection(null);

}


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


<DepartmentSectionLoading/>


</div>

);


}









// =====================================================
// EMPTY
// =====================================================


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


<Header

router={router}

/>



<DepartmentSectionEmpty/>



</div>

);


}









// =====================================================
// MAIN
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

section={section}

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


function Header({

router,

section,

}:{

router:any;

section?:DepartmentSectionData | null;

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


Department Section


</h1>




<p

className="
mt-1
text-sm
text-slate-400

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


disabled={!section}


onClick={()=>{


if(section?._id){


router.push(

`/dashboard/home/departments/section/edit/${section._id}`

);


}


}}



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

disabled:cursor-not-allowed
disabled:opacity-50

sm:w-auto
"

>


<Edit3 size={18}/>


Edit Section


</button>






</div>



</div>



);


}