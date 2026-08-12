"use client";


import {
  useState,
} from "react";


import {
  ArrowLeft,
  GraduationCap,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";


import Link from "next/link";



import AdmissionForm, {

  AdmissionFormData,

} from "@/components/dashboard/home/admission/AdmissionForm";



import AdmissionPreview from "@/components/dashboard/home/admission/AdmissionPreview";








// =========================================================
// DEFAULT DATA
// =========================================================


const defaultFormData:AdmissionFormData = {


  backgroundImage:"",


  titlePrefix:"UAMC",


  title:"Admission",



  description:

  "Uttara Adhunik Medical College (UAMC) was established in 2003 with a vision to provide quality medical education and healthcare services. Founded through the dedicated efforts of medical professionals and social leaders, UAMC is committed to training future doctors while ensuring affordable healthcare for the community.",



  buttonText:"Learn More",



  buttonLink:"/admission",



  isActive:true,


};









// =========================================================
// PAGE
// =========================================================


export default function NewAdmissionPage(){



const router = useRouter();








// =========================================================
// PREVIEW STATE
// =========================================================


const [

previewData,

setPreviewData,

]=useState<AdmissionFormData>(

defaultFormData

);









// =========================================================
// SUCCESS
// =========================================================


const handleSuccess=()=>{


router.push(

"/dashboard/home/admission"

);



router.refresh();



};
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
    PAGE HEADER
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







{/* =====================================
    LEFT CONTENT
===================================== */}



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

Create Admission


</h1>







<p

className="
mt-1

text-sm

text-slate-400


sm:text-base

"

>

Create and configure the Admission section
for the website.

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







{/* =====================================
    FORM
===================================== */}



<div

className="
min-w-0

"

>



<AdmissionForm


onDataChange={

setPreviewData

}


onSuccess={

handleSuccess

}


/>



</div>









{/* =====================================
    LIVE PREVIEW
===================================== */}



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