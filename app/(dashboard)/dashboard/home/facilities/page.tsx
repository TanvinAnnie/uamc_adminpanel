"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  ArrowLeft,
  Edit3,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";



import FacilitiesLoading from "@/components/dashboard/home/facilities/FacilitiesLoading";

import FacilitiesEmpty from "@/components/dashboard/home/facilities/FacilitiesEmpty";


import type {
  FacilitiesPreviewData,
  FacilityItem,
} from "@/components/dashboard/home/facilities/FacilitiesForm";






// =========================================================
// PAGE
// =========================================================


export default function FacilitiesPage(){





const router = useRouter();







const [

facilities,

setFacilities

]=useState<FacilitiesPreviewData|null>(null);







const [

loading,

setLoading

]=useState(true);







const [

deleteLoading,

setDeleteLoading

]=useState(false);









// =======================================================
// LOAD FACILITIES
// =======================================================



useEffect(()=>{



let cancelled=false;





const loadFacilities = async()=>{



try{



const response = await fetch(

"/api/facilities",

{

cache:"no-store"

}

);





const data = await response.json();





if(cancelled){

return;

}






if(response.status===404){



setFacilities(null);

setLoading(false);


return;


}






if(

!response.ok ||

!data.success

){


throw new Error(

data.message ||

"Failed to fetch Facilities section."

);


}






setFacilities(data.data);





}





catch(error){



if(cancelled){

return;

}




console.error(

"FETCH FACILITIES ERROR:",

error

);





toast.error(


error instanceof Error

?

error.message

:

"Failed to fetch Facilities section."


);



}





finally{



if(!cancelled){

setLoading(false);

}



}





};





loadFacilities();





return()=>{


cancelled=true;


};





},[]);









// =======================================================
// DELETE FACILITIES
// =======================================================



const handleDelete = async()=>{



if(!facilities?._id){

return;

}






const confirmed = window.confirm(

"Are you sure you want to delete the Facilities section?"

);





if(!confirmed){

return;

}







try{



setDeleteLoading(true);






const response = await fetch(

`/api/facilities?id=${facilities._id}`,

{

method:"DELETE"

}

);






const data = await response.json();





if(

!response.ok ||

!data.success

){


throw new Error(

data.message ||

"Failed to delete Facilities section."

);


}





toast.success(

"Facilities section deleted successfully."

);






setFacilities(null);






}

catch(error){



toast.error(


error instanceof Error

?

error.message

:

"Delete failed."

);



}

finally{



setDeleteLoading(false);



}





};
// =======================================================
// LOADING
// =======================================================


if(loading){


return(


<div className="w-full">


<FacilitiesLoading/>


</div>


);


}









// =======================================================
// EMPTY STATE
// =======================================================


if(!facilities){


return(



<div className="w-full">


{/* HEADER */}


<div

className="

mb-6

flex

flex-col

gap-4


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


Facilities


</h1>





<p

className="

mt-1

text-sm

text-slate-400

"

>


Manage the Facilities section
of the website.


</p>




</div>









<div

className="

flex

flex-wrap

gap-3

"

>



<button

type="button"


onClick={()=>


router.push("/dashboard")

}


className="

inline-flex

items-center

gap-2

rounded-xl

border

border-slate-700

bg-[#080d20]

px-4

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


Back Dashboard


</button>








<button


type="button"


onClick={()=>


router.push(

"/dashboard/home/facilities/new"

)

}


className="

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



<Plus size={18}/>


Create Facilities


</button>






</div>



</div>







<FacilitiesEmpty/>



</div>



);


}









// =======================================================
// SORT FACILITIES
// =======================================================


const sortedFacilities =

[

...(facilities.facilities || [])

].sort(

(a,b)=>

(a.order ?? 0)

-

(a.order ?? 0)

);









// =======================================================
// DATA AVAILABLE
// =======================================================


return(



<div className="w-full">







{/* =====================================================
    HEADER
===================================================== */}





<div


className="

mb-6


flex


flex-col


gap-4


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


Facilities


</h1>




<p


className="

mt-1

text-sm

text-slate-400

"


>


Manage the Facilities section
of the website.


</p>




</div>









<div


className="

flex

flex-wrap

gap-3

"


>





<button


type="button"


onClick={()=>


router.push("/dashboard")

}


className="

inline-flex

items-center

gap-2


rounded-xl


border


border-slate-700


bg-[#080d20]


px-4


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


Back Dashboard


</button>










<button


type="button"


onClick={()=>


router.push(

`/dashboard/home/facilities/edit/${facilities._id}`

)

}


className="

inline-flex

items-center

gap-2

rounded-xl

bg-blue-500/10

border

border-blue-400/20

px-5

py-3

text-sm

font-semibold

text-blue-400

transition

hover:bg-blue-500/20

"


>


<Edit3 size={17}/>


Edit


</button>








<button


type="button"


onClick={handleDelete}


disabled={deleteLoading}


className="

inline-flex

items-center

gap-2

rounded-xl

bg-red-500/10

border

border-red-400/20

px-5

py-3

text-sm

font-semibold

text-red-400

transition

hover:bg-red-500/20

disabled:opacity-50

"


>


{


deleteLoading

?

<Loader2

size={17}

className="animate-spin"

/>

:

<Trash2 size={17}/>


}




{

deleteLoading

?

"Deleting..."

:

"Delete"

}



</button>








</div>






</div>









{/* =====================================================
    OVERVIEW CARD
===================================================== */}



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




<div


className="

grid


lg:grid-cols-[300px_1fr]

"


>






{/* IMAGE */}



<div


className="

h-[260px]


lg:h-full

"


>



{

facilities.image ? (



<img


src={facilities.image}


alt="Facilities"


className="

h-full

w-full

object-cover

"

/>



)

:

(



<div


className="

flex

h-full

items-center

justify-center

bg-[#0d162f]

text-slate-500

"

>


No Image


</div>


)



}



</div>









{/* CONTENT */}



<div


className="

p-6

sm:p-8

"


>






{

facilities.tagline && (



<p


className="

text-xs

font-semibold

uppercase

tracking-[0.18em]

text-emerald-400

"

>


{facilities.tagline}


</p>



)



}






<h2


className="

mt-3

text-3xl

font-bold

text-white

"

>


{

facilities.title ||

"Our Facilities"

}



</h2>
{/* STATUS */}


<div className="mt-5">


<span

className={`

inline-flex

rounded-full

px-3

py-1.5

text-xs

font-semibold


${

facilities.isActive

?

"bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"

:

"bg-slate-700 text-slate-400"

}


`}

>

{

facilities.isActive

?

"Published"

:

"Draft"

}


</span>


</div>








{/* PROGRAM BUTTON INFO */}



<div


className="

mt-6

rounded-2xl

border

border-slate-800

bg-[#0d162f]

p-4

"

>


<p

className="

text-xs

font-semibold

uppercase

tracking-wide

text-slate-500

"

>

Program Button

</p>





<p

className="

mt-2

font-semibold

text-white

"

>

{

facilities.programButtonText ||

"View Our Program"

}

</p>






<p

className="

mt-1

break-all

text-xs

text-slate-500

"

>

{

facilities.programButtonLink ||

"#"

}

</p>



</div>






</div>





</div>



</div>









{/* =====================================================
    FACILITIES LIST
===================================================== */}



<div


className="

mt-6


overflow-hidden


rounded-3xl


border


border-slate-800


bg-[#080d20]


shadow-xl

"

>







<div


className="

border-b

border-slate-800

px-5

py-5

sm:px-6

"

>


<h2


className="

text-lg

font-bold

text-white

"

>


Facilities List


</h2>




<p


className="

mt-1

text-sm

text-slate-400

"

>


{

sortedFacilities.length

}

{

sortedFacilities.length === 1

?

" facility"

:

" facilities"

}

configured.


</p>


</div>









{/* DESKTOP TABLE */}



<div


className="

hidden

overflow-x-auto

lg:block

"

>


<table


className="

w-full

"

>


<thead


className="

bg-[#0d162f]

"

>


<tr>


<th className="table-head">
#
</th>


<th className="table-head">
Name
</th>


<th className="table-head">
Title
</th>


<th className="table-head">
Description
</th>


<th className="table-head">
Details
</th>


</tr>


</thead>







<tbody>



{


sortedFacilities.map(


(facility:FacilityItem,index)=>(



<tr


key={

facility._id ||

`facility-${index}`

}


className="

border-b

border-slate-800

last:border-none

"

>



<td className="px-6 py-5">


<span


className="

flex

h-8

w-8

items-center

justify-center

rounded-lg

bg-emerald-400/10

text-xs

font-bold

text-emerald-400

"

>

{index+1}

</span>


</td>





<td className="px-6 py-5">


<p className="font-semibold text-white">


{facility.name || "—"}


</p>


</td>





<td className="px-6 py-5">


<p className="text-slate-300">


{facility.title || "—"}


</p>


</td>






<td className="max-w-[350px] px-6 py-5">


<p className="line-clamp-2 text-sm leading-6 text-slate-400">


{facility.description || "—"}


</p>


</td>







<td className="px-6 py-5">


<span


className="

rounded-lg

bg-blue-400/10

px-3

py-2

text-xs

font-semibold

text-blue-400

"


>


{

facility.detailsText ||

"View Details"

}


</span>


</td>






</tr>



)



)



}





</tbody>


</table>


</div>









{/* MOBILE CARDS */}



<div


className="

grid

gap-4

p-4

lg:hidden

"

>



{


sortedFacilities.map(


(facility,index)=>(



<div


key={

facility._id ||

`mobile-${index}`

}


className="

rounded-2xl

border

border-slate-800

bg-[#0d162f]

p-4

"

>


<div


className="

flex

items-start

justify-between

gap-4

"

>


<div

className="flex items-center gap-3"

>


<span


className="

flex

h-9

w-9

items-center

justify-center

rounded-lg

bg-emerald-400/10

text-emerald-400

text-sm

font-bold

"

>


{index+1}


</span>





<div>


<h3 className="font-semibold text-white">


{facility.name || "Unnamed Facility"}


</h3>



<p className="text-xs text-slate-500">


{facility.title || "No title"}


</p>



</div>


</div>







<span


className="

rounded-lg

bg-blue-400/10

px-2.5

py-1.5

text-xs

font-semibold

text-blue-400

"


>


{

facility.detailsText ||

"Details"

}


</span>




</div>







<p


className="

mt-4

text-sm

leading-6

text-slate-400

"

>


{

facility.description ||

"No description available."

}


</p>




</div>



)



)



}




</div>









</div>









</div>


);


}