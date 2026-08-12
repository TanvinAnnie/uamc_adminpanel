"use client";


import {
  useRouter,
} from "next/navigation";


import {
  ArrowLeft,
} from "lucide-react";


import {
  toast,
} from "sonner";



import FacilitiesForm, {
  FacilitiesPreviewData,
} from "@/components/dashboard/home/facilities/FacilitiesForm";







// =========================================================
// PAGE
// =========================================================


export default function NewFacilitiesPage(){



const router = useRouter();






// =========================================================
// DEFAULT DATA
// =========================================================



const initialData:FacilitiesPreviewData = {



tagline:"",



title:"",



image:"",






facilities:[



{

name:"",


title:"",


description:"",


detailsText:"View Details",


detailsLink:"#",


order:0,


isActive:true,


}



],






programButtonText:
"View Our Program",





programButtonLink:
"/programs",





isActive:true,



};









// =========================================================
// CREATE FACILITIES
// =========================================================



const handleSubmit = async(

formData:FacilitiesPreviewData

)=>{



try{





const response = await fetch(

"/api/facilities",

{

method:"POST",


headers:{


"Content-Type":
"application/json",


},



body:JSON.stringify({



tagline:
formData.tagline,



title:
formData.title,



image:
formData.image,





facilities:

formData.facilities.map(

(facility,index)=>(

{

...facility,


order:index,


}

)

),





programButtonText:

formData.programButtonText,






programButtonLink:

formData.programButtonLink,






isActive:

formData.isActive,





}),



}

);







const data = await response.json();






if(

!response.ok ||

!data.success

){



throw new Error(

data.message ||

"Failed to create Facilities section."

);



}







toast.success(

"Facilities section created successfully."

);








router.push(

"/dashboard/home/facilities"

);





router.refresh();





}





catch(error){





console.error(

"CREATE FACILITIES ERROR:",

error

);






toast.error(



error instanceof Error

?

error.message

:

"Failed to create Facilities section."



);





throw error;





}



};









// =========================================================
// RENDER
// =========================================================



return(




<div

className="

w-full

"

>









{/* =====================================================
    HEADER
===================================================== */}




<div



className="

mb-8


flex


flex-col


gap-5


sm:flex-row


sm:items-center


sm:justify-between

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



Create Facilities



</h1>






<p



className="

mt-2

max-w-xl

text-sm

leading-6

text-slate-400

"

>



Create and manage the Facilities
section of the website.



</p>






</div>









<button



type="button"



onClick={()=>


router.push(

"/dashboard/home/facilities"

)


}



className="

inline-flex

min-h-11

items-center

justify-center

gap-2

rounded-xl

border

border-slate-700

bg-[#080d20]

px-5

py-3

text-sm

font-semibold

text-slate-300

transition

hover:border-emerald-400

hover:text-emerald-400

"



>





<ArrowLeft size={17}/>



Back to Facilities



</button>









</div>









{/* =====================================================
    FORM
===================================================== */}




<FacilitiesForm



initialData={initialData}




onSubmit={handleSubmit}




submitLabel="Create Facilities"



/>









</div>



);



}