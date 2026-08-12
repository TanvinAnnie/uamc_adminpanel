"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  ArrowLeft,
  Loader2,
} from "lucide-react";


import {
  useParams,
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
// API RESPONSE TYPE
// =========================================================


interface PrincipalMessageResponse {

  success?: boolean;

  message?: string;

  data?:
    | PrincipalMessageFormData
    | PrincipalMessageFormData[]
    | null;

}






// =========================================================
// PAGE
// =========================================================


export default function PrincipalMessageEditPage(){


const router =
useRouter();


const params =
useParams();





// =======================================================
// ID
// =======================================================


const rawId =
params?.id;



const id =
Array.isArray(rawId)
?
rawId[0]
:
rawId;







// =======================================================
// STATES
// =======================================================


const [
formData,
setFormData,
]=useState<PrincipalMessageFormData | null>(
null
);



const [
loading,
setLoading,
]=useState(true);



const [
saving,
setSaving,
]=useState(false);









// =======================================================
// FETCH DATA
// =======================================================


useEffect(()=>{


let cancelled =
false;



const loadData =
async()=>{


if(
!id ||
typeof id !== "string"
){

setLoading(false);

toast.error(
"Invalid Principal Message ID."
);

return;

}



try{


const response =
await fetch(
`/api/principal-message?id=${encodeURIComponent(id)}`,
{
method:"GET",
cache:"no-store",
}
);





const result:
PrincipalMessageResponse =
await response.json();





if(
!response.ok ||
!result.success
){

throw new Error(
result.message ||
"Failed to load Principal Message."
);

}






let data =
result.data;



if(
Array.isArray(data)
){

data =
data[0];

}






if(!data){

throw new Error(
"Principal Message not found."
);

}







if(cancelled){

return;

}






setFormData({

tagline:
data.tagline || "",


titlePrefix:
data.titlePrefix || "",


titleHighlight:
data.titleHighlight || "",


signatureImage:
data.signatureImage || "",


principalName:
data.principalName || "",


designation:
data.designation ||
"Principal (In Charge)",


heading:
data.heading || "",


description:
data.description || "",


principalImage:
data.principalImage || "",


buttonText:
data.buttonText ||
"Read More",


buttonLink:
data.buttonLink ||
"#",


isActive:
data.isActive ?? true,


});



setLoading(false);



}
catch(error){


if(cancelled){

return;

}


console.error(
"LOAD PRINCIPAL MESSAGE ERROR:",
error
);



toast.error(

error instanceof Error
?
error.message
:
"Failed to load Principal Message."

);



setFormData(null);

setLoading(false);



}



};




loadData();



return()=>{

cancelled=true;

};


},[id]);


// =======================================================
// FORM CHANGE
// =======================================================


const handleFormChange = (
  data: PrincipalMessageFormData
) => {

  setFormData(data);

};







// =======================================================
// UPDATE SUBMIT
// =======================================================


const handleSubmit = async (
  data: PrincipalMessageFormData
) => {



if(
!id ||
typeof id !== "string"
){

toast.error(
"Invalid Principal Message ID."
);

return;

}




try{


setSaving(true);





const response =
await fetch(
`/api/principal-message?id=${encodeURIComponent(id)}`,
{
method:"PUT",

headers:{
"Content-Type":
"application/json",
},


body:
JSON.stringify(data),

}

);







const result:
PrincipalMessageResponse =
await response.json();







if(
!response.ok ||
!result.success
){

throw new Error(
result.message ||
"Failed to update Principal Message."
);

}







toast.success(
"Principal Message updated successfully."
);





router.push(
"/dashboard/home/principal-message"
);



router.refresh();





}
catch(error){


console.error(
"UPDATE PRINCIPAL MESSAGE ERROR:",
error
);



toast.error(

error instanceof Error
?
error.message
:
"Failed to update Principal Message."

);



throw error;



}
finally{


setSaving(false);


}



};









// =======================================================
// BACK
// =======================================================


const handleBack = ()=>{


router.push(
"/dashboard/home/principal-message"
);


};








// =======================================================
// LOADING UI
// =======================================================


if(loading){


return (

<main
className="
min-h-screen
bg-slate-50
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


<div
className="
flex
items-center
gap-4
"
>


<button
type="button"
onClick={handleBack}

className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
border
border-slate-200
bg-white
text-slate-600
shadow-sm
hover:bg-slate-50
"
>

<ArrowLeft
size={18}
/>

</button>





<div>


<p
className="
text-xs
font-semibold
uppercase
tracking-[0.16em]
text-[#008B45]
"
>

Homepage

</p>



<h1
className="
mt-1
text-2xl
font-bold
text-slate-900
sm:text-3xl
"
>

Edit Principal Message

</h1>


<p
className="
mt-1
text-sm
text-slate-500
"
>

Loading Principal Message...

</p>


</div>



</div>









<div
className="
mt-8
flex
min-h-[300px]
items-center
justify-center
rounded-2xl
border
border-slate-200
bg-white
"
>


<div
className="
flex
flex-col
items-center
gap-3
"
>


<div
className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-emerald-50
"
>


<Loader2
size={30}
className="
animate-spin
text-[#008B45]
"
/>


</div>




<p
className="
text-sm
font-medium
text-slate-500
"
>

Loading Principal Message...

</p>


</div>


</div>




</div>

</main>


);


}
// =======================================================
// NOT FOUND UI
// =======================================================


if(!formData){


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
flex
min-h-[500px]
max-w-lg
items-center
justify-center
"

>


<div

className="
w-full
rounded-2xl
border
border-slate-200
bg-white
p-8
text-center
shadow-sm
"

>


<h1

className="
text-xl
font-bold
text-slate-800
sm:text-2xl
"

>

Principal Message Not Found

</h1>





<p

className="
mt-3
text-sm
leading-6
text-slate-500
"

>

The Principal Message section
could not be loaded.

</p>





<button

type="button"

onClick={handleBack}

className="
mt-6
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
font-semibold
text-white
transition
hover:bg-[#00763B]
"

>

<ArrowLeft
size={17}
/>

Back to Principal Message

</button>




</div>


</div>


</main>

);


}









// =======================================================
// EDIT PAGE
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
sm:flex-row
sm:items-center
sm:justify-between
"

>


<div>


<p

className="
text-xs
font-semibold
uppercase
tracking-[0.16em]
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

Edit Principal Message

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

Update Principal Message content,
images and homepage settings.

</p>



</div>








<button

type="button"

onClick={handleBack}

className="
inline-flex
min-h-11
w-fit
items-center
justify-center
gap-2
rounded-xl
border
border-slate-200
bg-white
px-4
py-3
text-sm
font-medium
text-slate-600
shadow-sm
transition
hover:border-[#008B45]
hover:text-[#008B45]
"

>

<ArrowLeft
size={17}
/>

Back

</button>






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
formData
}


onChange={
handleFormChange
}


onSubmit={
handleSubmit
}


submitLabel={
saving
?
"Updating..."
:
"Update Principal Message"
}


title="
Principal Message
"


description="
Manage the Principal Message content,
images and button settings.
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
formData
}

/>





</div>



</aside>







</div>





</div>


</main>

);


}