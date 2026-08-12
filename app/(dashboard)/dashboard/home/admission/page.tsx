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



import AdmissionLoading from "@/components/dashboard/home/admission/AdmissionLoading";

import AdmissionEmpty from "@/components/dashboard/home/admission/AdmissionEmpty";

import AdmissionTable from "@/components/dashboard/home/admission/AdmissionTable";





// =========================================================
// ADMISSION TYPE
// =========================================================


export interface AdmissionData {


  _id:string;



  backgroundImage:string;



  titlePrefix:string;



  title:string;



  description:string;



  buttonText:string;



  buttonLink:string;



  isActive:boolean;



  createdAt:string;



  updatedAt:string;


}









// =========================================================
// PAGE
// =========================================================


export default function AdmissionPage(){



const router =
useRouter();






// =====================================================
// STATE
// =====================================================



const [

admission,

setAdmission,

]=useState<AdmissionData | null>(null);








const [

loading,

setLoading,

]=useState(true);











// =====================================================
// FETCH ADMISSION
// =====================================================


useEffect(()=>{



let cancelled=false;






const loadAdmission=async()=>{



try{





const response =

await fetch(

"/api/admission",

{

cache:"no-store",

}

);









const responseText =

await response.text();






let data:

{

success?:boolean;

message?:string;

data?:AdmissionData;


}

|null=null;







try{


data =

JSON.parse(
responseText
);



}

catch{


throw new Error(

"Admission API returned an invalid response."

);


}









if(cancelled){


return;


}









if(response.status===404){



setAdmission(null);


setLoading(false);


return;


}








if(

!response.ok ||

!data?.success ||

!data.data

){


throw new Error(

data?.message ||

"Failed to fetch Admission section."

);


}







setAdmission(

data.data

);




}



catch(error){



if(cancelled){


return;


}




console.error(

"FETCH ADMISSION ERROR:",

error

);






toast.error(


error instanceof Error


?


error.message


:


"Failed to fetch Admission section."


);



}




finally{



if(!cancelled){


setLoading(false);


}



}




};








loadAdmission();







return()=>{


cancelled=true;


};



},[]);











// =====================================================
// DELETE CALLBACK
// =====================================================



const handleDelete=()=>{


setAdmission(null);


};
// =======================================================
// LOADING
// =======================================================


if(loading){


return(

<div
className="
w-full
space-y-6
"
>


<AdmissionLoading/>


</div>

);


}









// =======================================================
// EMPTY
// =======================================================


if(!admission){


return(


<div

className="
w-full
space-y-6
"

>


<AdmissionHeader

router={router}

hasAdmission={false}

/>



<AdmissionEmpty/>


</div>


);


}









// =======================================================
// HEADER COMPONENT
// =======================================================


function AdmissionHeader({

router,

hasAdmission,


}:{

router:ReturnType<typeof useRouter>;

hasAdmission:boolean;


}){



return(


<div

className="
flex

flex-col

gap-5

rounded-3xl

border

border-slate-800

bg-[#080d20]

p-5

shadow-xl


sm:flex-row

sm:items-center

sm:justify-between


sm:p-6
"

>







{/* =====================================
    LEFT CONTENT
===================================== */}




<div>



<h1

className="
text-2xl

font-bold

text-white


sm:text-3xl
"

>

Admission


</h1>







<p

className="
mt-2

text-sm

text-slate-400


sm:text-base
"

>

Manage the Admission section
of the website.


</p>



</div>









{/* =====================================
    ACTION BUTTONS
===================================== */}




<div

className="
flex

flex-wrap

gap-3
"

>









<button


type="button"



onClick={()=>router.push("/dashboard")}



className="
inline-flex

min-h-11

items-center

justify-center

gap-2

rounded-xl

border

border-slate-700

bg-slate-800

px-4

py-3

text-sm

font-semibold

text-slate-300

transition

hover:bg-slate-700

hover:text-white
"

>


<ArrowLeft size={17}/>


Back Dashboard


</button>









{

!hasAdmission && (



<button


type="button"



onClick={()=>router.push(
"/dashboard/home/admission/new"
)}



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

font-bold

text-white

transition

hover:bg-[#00763B]

"

>


<Plus size={18}/>



Create Admission


</button>



)

}





{

hasAdmission && (



<button


type="button"



onClick={()=>router.push(
`/dashboard/home/admission/edit/${admission?._id}`
)}



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

font-bold

text-white

transition

hover:bg-[#00763B]

"

>


<Edit3 size={17}/>



Edit Admission


</button>



)

}






</div>







</div>



);


}
// =======================================================
// DATA AVAILABLE
// =======================================================


return(


<div

className="
w-full

space-y-6

"

>




{/* =====================================
    HEADER
===================================== */}



<AdmissionHeader

router={router}

hasAdmission={true}

/>









{/* =====================================
    TABLE
===================================== */}



<div

className="
overflow-hidden

rounded-3xl

border

border-slate-800

bg-[#080d20]

shadow-xl

"

>


<AdmissionTable


admission={admission}


onDelete={handleDelete}


/>



</div>







</div>


);



}