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



import CampusLifeForm, {

  type CampusLifeFormData,

} from "@/components/dashboard/home/campus-life/CampusLifeForm";



import CampusLifePreview from "@/components/dashboard/home/campus-life/CampusLifePreview";





// =========================================================
// DEFAULT DATA
// =========================================================


const defaultFormData:CampusLifeFormData = {


  title:"",


  shortDescription:"",


  image:"",


  buttonText:"Learn More",


  buttonLink:"#",


  isActive:true,


};








// =========================================================
// PAGE
// =========================================================


export default function CampusLifeNewPage(){



const router =
useRouter();




// =========================================================
// PREVIEW STATE
// =========================================================


const [
previewData,
setPreviewData
]=useState<CampusLifeFormData>(

defaultFormData

);





// =========================================================
// FORM CHANGE
// =========================================================


const handleFormChange = (

data:CampusLifeFormData

)=>{


setPreviewData(data);


};




// =========================================================
// SUBMIT
// =========================================================


const handleSubmit = async(

data:CampusLifeFormData

)=>{


try{



const response =
await fetch(

"/api/campus-life",

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

"Failed to create Campus Life"

);



}








toast.success(

"Campus Life created successfully"

);







router.push(

"/dashboard/home/campus-life"

);






router.refresh();







}


catch(error){



console.error(

"CREATE CAMPUS LIFE ERROR:",

error

);





toast.error(


error instanceof Error

?

error.message

:

"Failed to create Campus Life"


);





throw error;



}



};
// =========================================================
// RENDER
// =========================================================


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





{/* ================= HEADER ================= */}



<div

className="
mb-8
"

>


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

Create Campus Life

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

Create and configure campus life section content
for the website.

</p>



</div>









{/* ================= FORM + PREVIEW ================= */}



<div

className="
grid
grid-cols-1
items-start
gap-6
xl:grid-cols-2
"

>








{/* ================= FORM ================= */}



<div

className="
min-w-0
w-full
"

>


<CampusLifeForm


initialData={

defaultFormData

}



onChange={

handleFormChange

}



onSubmit={

handleSubmit

}



submitLabel="Create Campus Life"



title="Campus Life"



description="
Manage campus life images, content and button settings.
"



/>



</div>








{/* ================= PREVIEW ================= */}



<div

className="
min-w-0
w-full
xl:sticky
xl:top-6
"

>


<div
className="
relative
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



<div
className="
mb-5
flex
items-start
justify-between
"
>


<div>

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
bg-emerald-500
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





<button

type="button"

onClick={()=>router.back()}

className="
absolute
right-5
top-5
inline-flex
items-center
gap-2
rounded-xl
border
border-slate-200
bg-white
px-4
py-2
text-sm
font-semibold
text-slate-600
shadow-sm
transition
hover:bg-slate-50
"

>
← Back
</button>



</div>


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
<CampusLifePreview


data={

previewData

}


/>



</div>


</div>


</div>



</div>


</main>


);


}