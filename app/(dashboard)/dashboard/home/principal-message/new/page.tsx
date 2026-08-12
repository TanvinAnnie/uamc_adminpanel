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
// DEFAULT FORM DATA
// =========================================================


const defaultFormData: PrincipalMessageFormData = {

  tagline:
    "knowledge meets innovation",


  titlePrefix:
    "Message from the",


  titleHighlight:
    "Principal",


  signatureImage:
    "",


  principalName:
    "",


  designation:
    "Principal (In Charge)",


  heading:
    "",


  description:
    "",


  principalImage:
    "",


  buttonText:
    "Read More",


  buttonLink:
    "#",


  isActive:
    true,

};








// =========================================================
// PAGE
// =========================================================


export default function PrincipalMessageNewPage(){


const router =
useRouter();





// =======================================================
// PREVIEW STATE
// =======================================================


const [
 previewData,
 setPreviewData,
]=useState<PrincipalMessageFormData>(
 defaultFormData
);







// =======================================================
// FORM CHANGE
// =======================================================


const handleFormChange = (

data:PrincipalMessageFormData

)=>{


setPreviewData(data);


};









// =======================================================
// CREATE PRINCIPAL MESSAGE
// =======================================================


const handleSubmit = async(

data:PrincipalMessageFormData

)=>{


try{


const response =
await fetch(
"/api/principal-message",
{

method:"POST",

headers:{

"Content-Type":
"application/json",

},

body:
JSON.stringify(data),

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









// =======================================================
// RENDER
// =======================================================


return (

<main

className="
min-h-screen
bg-[#F8FAF9]
px-4
py-6
sm:px-6
lg:px-8
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
mb-8
flex
flex-col
gap-4
"

>


<div>


<p

className="
text-xs
font-semibold
uppercase
tracking-[0.18em]
text-[#008B45]
"

>

Homepage

</p>





<h1

className="
mt-2
text-2xl
font-bold
text-slate-900
sm:text-3xl
"

>

Create Principal Message

</h1>





<p

className="
mt-2
max-w-2xl
text-sm
leading-6
text-slate-500
"

>

Create and configure the Principal Message
section for the website.

</p>




</div>



</div>









{/* =====================================================
    FORM + PREVIEW
===================================================== */}



<div

className="
grid
grid-cols-1
items-start
gap-6
xl:grid-cols-2
"

>







{/* =====================================================
    LEFT FORM
===================================================== */}



<div

className="
min-w-0
w-full
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
Manage the content, images and button settings
for this homepage section.
"


/>



</div>









{/* =====================================================
    RIGHT PREVIEW
===================================================== */}



<aside

className="
min-w-0
w-full
xl:sticky
xl:top-6
xl:self-start
"

>


<div

className="
overflow-hidden
rounded-2xl
border
border-slate-200
bg-white
p-4
shadow-sm
sm:p-5
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
bg-[#008B45]
"

/>



<h2

className="
text-lg
font-semibold
text-slate-800
"

>

Live Preview

</h2>



</div>




<p

className="
mt-1
text-sm
text-slate-500
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



</aside>








</div>





</div>


</main>


);


}