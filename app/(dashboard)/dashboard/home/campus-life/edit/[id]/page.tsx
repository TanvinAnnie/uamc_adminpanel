"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";



import CampusLifeForm, {

  type CampusLifeFormData,

} from "@/components/dashboard/home/campus-life/CampusLifeForm";



import CampusLifePreview from "@/components/dashboard/home/campus-life/CampusLifePreview";



import CampusLifeLoading from "@/components/dashboard/home/campus-life/CampusLifeLoading";






// =========================================================
// PAGE
// =========================================================


export default function CampusLifeEditPage(){



const router =
useRouter();



const params =
useParams();



const id =
params.id as string;







// =========================================================
// STATES
// =========================================================



const [

loading,

setLoading

]=useState(true);





const [

previewData,

setPreviewData

]=useState<CampusLifeFormData | null>(

null

);







// =========================================================
// FETCH SINGLE DATA
// =========================================================


const fetchCampusLife = async()=>{


try{


setLoading(true);



const response =
await fetch(

`/api/campus-life/${id}`,

{
cache:"no-store",
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

"Failed to fetch Campus Life"

);


}






const item =
result.data;





setPreviewData({

title:item.title || "",


shortDescription:
item.shortDescription || "",


image:item.image || "",


buttonText:
item.buttonText || "Learn More",


buttonLink:
item.buttonLink || "#",


isActive:
item.isActive,

});





}


catch(error){



console.error(

"FETCH CAMPUS LIFE ERROR:",

error

);



toast.error(

"Failed to load Campus Life"

);



}



finally{


setLoading(false);


}



};







useEffect(()=>{


if(id){

fetchCampusLife();

}


},[id]);
// =========================================================
// FORM CHANGE
// =========================================================


const handleFormChange = (

data:CampusLifeFormData

)=>{


setPreviewData(data);


};









// =========================================================
// UPDATE SUBMIT
// =========================================================


const handleSubmit = async(

data:CampusLifeFormData

)=>{


try{


const response =

await fetch(

`/api/campus-life/${id}`,

{


method:"PATCH",



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

"Failed to update Campus Life"

);


}







toast.success(

"Campus Life updated successfully"

);







router.push(

"/dashboard/home/campus-life"

);





router.refresh();







}


catch(error){



console.error(

"UPDATE CAMPUS LIFE ERROR:",

error

);





toast.error(


error instanceof Error

?

error.message

:

"Failed to update Campus Life"


);



throw error;



}



};
// =========================================================
// LOADING
// =========================================================


if(loading || !previewData){


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
max-w-[1600px]
"

>


<CampusLifeLoading />


</div>


</main>


);


}









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

Edit Campus Life

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

Update campus life information,
images and button settings.

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

previewData

}



onChange={

handleFormChange

}



onSubmit={

handleSubmit

}



submitLabel="Update Campus Life"



title="Campus Life"



description="
Manage and update campus life section data.
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







<CampusLifePreview


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