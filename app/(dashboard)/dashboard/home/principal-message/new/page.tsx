"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  toast,
} from "sonner";


import PrincipalMessageForm, {
  type PrincipalMessageFormData,
} from "@/components/dashboard/home/principal-message/PrincipalMessageForm";


import PrincipalMessagePreview from "@/components/dashboard/home/principal-message/PrincipalMessagePreview";




// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: PrincipalMessageFormData = {

  tagline:"knowledge meets innovation",

  titlePrefix:"Message from the",

  titleHighlight:"Principal",

  signatureImage:"",

  principalName:"",

  designation:"Principal (In Charge)",

  heading:"",

  description:"",

  principalImage:"",

  buttonText:"Read More",

  buttonLink:"#",

  isActive:true,

};





export default function PrincipalMessageNewPage(){


const router = useRouter();



const [
previewData,
setPreviewData
]=useState<PrincipalMessageFormData>(
defaultFormData
);





const handleFormChange = (
data:PrincipalMessageFormData
)=>{

setPreviewData(data);

};







const handleSubmit = async(
data:PrincipalMessageFormData
)=>{


try{


const response = await fetch(
"/api/principal-message",
{

method:"POST",

headers:{
"Content-Type":"application/json",
},

body:JSON.stringify(data),

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
"Failed to create Principal Message."
);

}




toast.success(
"Principal Message created successfully."
);



router.push(
"/dashboard/home/principal-message"
);


router.refresh();



}

catch(error){


console.error(
"CREATE PRINCIPAL MESSAGE ERROR:",
error
);



toast.error(
error instanceof Error
?
error.message
:
"Failed to create Principal Message."
);



throw error;


}



};









return (

<main

className="
min-h-screen
bg-[#050B20]
px-5
py-8
lg:px-10
"

>


<div
className="
mx-auto
max-w-[1600px]
"
>




{/* HEADER */}


<div

className="
mb-8
rounded-3xl
border
border-slate-800
bg-[#080D24]
px-8
py-7
shadow-xl
"

>


<p
className="
text-xs
font-semibold
uppercase
tracking-[0.18em]
text-cyan-400
"
>

Homepage

</p>



<h1
className="
mt-2
text-3xl
font-bold
text-white
"
>

Create Principal Message

</h1>



<p
className="
mt-2
text-sm
text-slate-400
"
>

Create and configure the Principal Message section.

</p>



</div>









{/* FORM + PREVIEW */}


<div

className="
grid
grid-cols-1
gap-8
xl:grid-cols-2
"

>







{/* FORM */}


<div

className="
rounded-3xl
border
border-slate-800
bg-[#080D24]
p-6
shadow-xl
"

>


<PrincipalMessageForm


initialData={
defaultFormData
}



onChange={
handleFormChange
}



onSubmit={
handleSubmit
}



submitLabel="
Create Principal Message
"



title="
Principal Message
"



description="
Manage the content, images and button settings.
"



/>



</div>









{/* PREVIEW */}



<div

className="
rounded-3xl
border
border-slate-800
bg-[#080D24]
p-5
shadow-xl
xl:sticky
xl:top-6
xl:self-start
"

>


<div
className="
mb-5
"
>


<div
className="
flex
items-center
gap-2
"
>


<span
className="
h-2
w-2
rounded-full
bg-emerald-400
"
/>


<h2
className="
text-lg
font-semibold
text-white
"
>

Live Preview

</h2>


</div>



<p
className="
mt-2
text-sm
text-slate-400
"
>

Changes appear instantly while editing.

</p>



</div>





<PrincipalMessagePreview

data={
previewData
}

/>



</div>







</div>




</div>


</main>


);


}