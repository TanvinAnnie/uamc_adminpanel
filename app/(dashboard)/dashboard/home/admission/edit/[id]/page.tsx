"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  ArrowLeft,
  GraduationCap,
} from "lucide-react";


import {
  useParams,
  useRouter,
} from "next/navigation";


import Link from "next/link";


import {
  toast,
} from "sonner";



import AdmissionForm, {

  AdmissionFormData,

} from "@/components/dashboard/home/admission/AdmissionForm";



import AdmissionPreview from "@/components/dashboard/home/admission/AdmissionPreview";









// =========================================================
// DEFAULT DATA
// =========================================================


const defaultFormData:AdmissionFormData={


backgroundImage:"",


titlePrefix:"UAMC",


title:"Admission",


description:"",


buttonText:"Learn More",


buttonLink:"/admission",


isActive:true,


};









// =========================================================
// PAGE
// =========================================================


export default function EditAdmissionPage(){



const router = useRouter();



const params = useParams();




const id = params.id as string;








const [

previewData,

setPreviewData

]=useState<AdmissionFormData>(

defaultFormData

);





const [

loading,

setLoading

]=useState(true);









// =========================================================
// FETCH DATA
// =========================================================


useEffect(()=>{


const loadAdmission=async()=>{


try{



const response = await fetch(

`/api/admission/${id}`,

{

cache:"no-store",

}

);






const data = await response.json();







if(

!response.ok ||

!data.success

){


throw new Error(

data.message ||

"Failed to load admission."

);


}







setPreviewData(

data.data

);



}



catch(error){



toast.error(

error instanceof Error

?

error.message

:

"Failed to load admission."

);



}



finally{


setLoading(false);


}



};






if(id){

loadAdmission();

}



},[id]);









const handleSuccess=()=>{


router.push(

"/dashboard/home/admission"

);


router.refresh();


};
// =========================================================
// LOADING
// =========================================================


if(loading){


return(


<div

className="

flex

min-h-screen

items-center

justify-center

bg-[#F8FAF9]

"


>


<div

className="

rounded-2xl

border

border-slate-200

bg-white

px-8

py-6

text-center

shadow-sm

"


>


<p

className="

text-sm

font-medium

text-slate-500

"

>

Loading Admission data...

</p>



</div>


</div>


);


}









// =========================================================
// RENDER
// =========================================================



return(



<div


className="

w-full

space-y-6

"


>



<div


className="

mx-auto

w-full

max-w-[1600px]

"


>










{/* =====================================================
    HEADER
===================================================== */}



<div


className="

rounded-3xl

border

border-slate-800

bg-[#080d20]

p-5

shadow-xl


sm:p-6

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



<Link


href="/dashboard/home/admission"


className="

inline-flex

items-center

gap-2

text-sm

font-medium

text-slate-400

transition

hover:text-emerald-400

"

>


<ArrowLeft size={17}/>


Back to Admission


</Link>









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

h-12

w-12

items-center

justify-center

rounded-2xl

border

border-emerald-400/20

bg-emerald-400/10

text-emerald-400

"

>


<GraduationCap size={24}/>


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


Edit Admission


</h1>







<p


className="

mt-1

text-sm

text-slate-400

sm:text-base

"

>


Update Admission section content for the website.


</p>





</div>









</div>









</div>









</div>









</div>
{/* =====================================================
    MAIN CONTENT
===================================================== */}



<div

className="

grid

grid-cols-1

items-start

gap-6



xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]

"

>







{/* =====================================================
    FORM
===================================================== */}



<div

className="

min-w-0

"

>



<AdmissionForm


initialData={previewData}



onDataChange={

setPreviewData

}



onSuccess={

handleSuccess

}



/>



</div>










{/* =====================================================
    PREVIEW
===================================================== */}



<div


className="

min-w-0


xl:sticky

xl:top-6

"

>



<AdmissionPreview


data={previewData}


/>



</div>







</div>









</div>






</div>






);



}