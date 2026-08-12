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



import FacilitiesForm, {
  FacilitiesPreviewData,
} from "@/components/dashboard/home/facilities/FacilitiesForm";







// =========================================================
// PAGE
// =========================================================


export default function FacilitiesEditPage(){





const router = useRouter();


const params = useParams();







// =========================================================
// ID
// =========================================================



const id =

typeof params?.id === "string"

?

params.id

:

"";









// =========================================================
// STATE
// =========================================================



const [

facilities,

setFacilities

]=useState<FacilitiesPreviewData|null>(null);






const [

loadError,

setLoadError

]=useState<string|null>(null);











// =========================================================
// LOAD DATA
// =========================================================



useEffect(()=>{



let cancelled=false;






if(!id){

return()=>{

cancelled=true;

};

}







const loadFacilities = async()=>{



try{





const response = await fetch(

`/api/facilities/${id}`,

{

cache:"no-store"

}

);







const text = await response.text();





let data:
{

success?:boolean;

message?:string;

data?:FacilitiesPreviewData;


}

|null=null;







try{


data=JSON.parse(text);


}

catch{


throw new Error(

"Invalid API response."

);


}







if(cancelled){

return;

}









if(response.status===404){



toast.error(

"Facilities section not found."

);



router.push(

"/dashboard/home/facilities"

);



return;


}







if(
  !response.ok ||
  !data ||
  !data.success ||
  !data.data
){

throw new Error(

data?.message ||

"Failed to load Facilities."

);

}







setFacilities(
  data!.data
);



setLoadError(null);







}

catch(error){





if(cancelled){

return;

}







console.error(

"LOAD FACILITIES ERROR:",

error

);







const message =


error instanceof Error

?

error.message

:

"Failed to load Facilities.";






setLoadError(message);



toast.error(message);







}







};







loadFacilities();






return()=>{


cancelled=true;


};






},[id,router]);











// =========================================================
// UPDATE FACILITIES
// =========================================================



const handleSubmit = async(

formData:FacilitiesPreviewData

)=>{



if(!id){



toast.error(

"Facilities ID missing."

);



return;

}




try{





const response = await fetch(

`/api/facilities/${id}`,

{


method:"PUT",



headers:{


"Content-Type":

"application/json",


},




body:JSON.stringify(formData),



}

);







const text = await response.text();







let data:

{

success?:boolean;

message?:string;


}

|null=null;








try{


data=JSON.parse(text);


}

catch{


throw new Error(

"Invalid update response."

);


}







if(
  !response.ok ||
  !data?.success
){

  throw new Error(
    data?.message ||
    "Failed to update Facilities."
  );

}







toast.success(

"Facilities updated successfully."

);







router.push(

"/dashboard/home/facilities"

);






router.refresh();







}

catch(error){





console.error(

"UPDATE FACILITIES ERROR:",

error

);







toast.error(

error instanceof Error

?

error.message

:

"Update failed."

);







throw error;







}






};
// =======================================================
// INVALID ID
// =======================================================


if(!id){


return(


<main


className="

flex

min-h-screen

items-center

justify-center

bg-[#020617]

px-5

py-10

"


>



<div


className="

w-full

max-w-lg

rounded-3xl

border

border-slate-800

bg-[#080d20]

p-8

text-center

shadow-xl

"


>




<h1


className="

text-xl

font-bold

text-white

sm:text-2xl

"


>


Invalid Facilities ID


</h1>






<p


className="

mt-3

text-sm

leading-6

text-slate-400

"


>


The Facilities ID is missing
from the URL.


</p>








<button


type="button"


onClick={()=>


router.push(

"/dashboard/home/facilities"

)


}


className="

mt-6

inline-flex

items-center

gap-2

rounded-xl

bg-emerald-500

px-5

py-3

text-sm

font-semibold

text-white

transition

hover:bg-emerald-600

"


>



<ArrowLeft size={17}/>



Back to Facilities



</button>






</div>



</main>



);


}











// =======================================================
// LOADING
// =======================================================



const loading =

facilities===null &&

loadError===null &&

Boolean(id);








if(loading){



return(



<main


className="

flex

min-h-screen

items-center

justify-center

bg-[#020617]

px-5

py-10

"


>




<div


className="

flex

flex-col

items-center

text-center

"


>



<div


className="

flex

h-16

w-16

items-center

justify-center

rounded-2xl

bg-emerald-400/10

"


>


<Loader2


size={32}


className="

animate-spin

text-emerald-400

"


/>



</div>







<h1


className="

mt-5

text-xl

font-semibold

text-white

sm:text-2xl

"


>


Loading Facilities


</h1>






<p


className="

mt-2

text-sm

text-slate-400

"


>


Please wait while we load
Facilities data.


</p>





</div>




</main>



);


}











// =======================================================
// LOAD ERROR
// =======================================================



if(loadError){



return(



<main


className="

flex

min-h-screen

items-center

justify-center

bg-[#020617]

px-5

py-10

"


>




<div


className="

w-full

max-w-lg

rounded-3xl

border

border-red-400/20

bg-[#080d20]

p-8

text-center

shadow-xl

"


>




<h1


className="

text-xl

font-bold

text-white

sm:text-2xl

"


>


Failed to Load Facilities


</h1>







<p


className="

mt-3

text-sm

leading-6

text-slate-400

"


>


{loadError}


</p>








<button


type="button"


onClick={()=>


router.push(

"/dashboard/home/facilities"

)


}


className="

mt-6

inline-flex

items-center

gap-2

rounded-xl

bg-emerald-500

px-5

py-3

text-sm

font-semibold

text-white

transition

hover:bg-emerald-600

"


>



<ArrowLeft size={17}/>



Back to Facilities



</button>






</div>





</main>



);


}











// =======================================================
// SAFETY CHECK
// =======================================================



if(!facilities){



return(



<main


className="

flex

min-h-screen

items-center

justify-center

bg-[#020617]

px-5

py-10

"


>




<div


className="

w-full

max-w-lg

rounded-3xl

border

border-slate-800

bg-[#080d20]

p-8

text-center

shadow-xl

"


>




<h1


className="

text-xl

font-bold

text-white

sm:text-2xl

"


>


Facilities Not Found


</h1>







<p


className="

mt-3

text-sm

leading-6

text-slate-400

"


>


The Facilities section could not
be loaded.


</p>







<button


type="button"


onClick={()=>


router.push(

"/dashboard/home/facilities"

)


}


className="

mt-6

inline-flex

items-center

gap-2

rounded-xl

bg-emerald-500

px-5

py-3

text-sm

font-semibold

text-white

transition

hover:bg-emerald-600

"


>



<ArrowLeft size={17}/>



Back to Facilities



</button>






</div>





</main>



);


}
// =======================================================
// EDIT PAGE
// =======================================================


return(



<main


className="

min-h-screen

bg-[#020617]

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


Edit Facilities


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


Update and manage the Facilities
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
    FORM + PREVIEW
===================================================== */}





<FacilitiesForm



initialData={facilities}



onSubmit={handleSubmit}



submitLabel="Update Facilities"



/>








</div>






</main>



);



}