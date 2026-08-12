"use client";


import {
  Plus,
  RefreshCw,
} from "lucide-react";


import {
  useEffect,
  useState,
} from "react";


import {
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";


import PrincipalMessageEmpty
from "@/components/dashboard/home/principal-message/PrincipalMessageEmpty";


import PrincipalMessageLoading
from "@/components/dashboard/home/principal-message/PrincipalMessageLoading";


import PrincipalMessageTable
from "@/components/dashboard/home/principal-message/PrincipalMessageTable";


import type {
  PrincipalMessageTableData,
} from "@/components/dashboard/home/principal-message/PrincipalMessageTable";




// =========================================================
// API RESPONSE
// =========================================================


interface PrincipalMessageApiResponse {

  success?: boolean;

  message?: string;

  data?:
    | PrincipalMessageTableData
    | PrincipalMessageTableData[]
    | null;

}






// =========================================================
// PAGE
// =========================================================


export default function PrincipalMessagePage(){


const router = useRouter();



// =======================================================
// STATES
// =======================================================


const [
  principalMessage,
  setPrincipalMessage,
]=useState<PrincipalMessageTableData | null>(
  null
);



const [
  loading,
  setLoading,
]=useState(true);



const [
  deleting,
  setDeleting,
]=useState(false);



const [
  updatingStatus,
  setUpdatingStatus,
]=useState(false);



const [
  refreshing,
  setRefreshing,
]=useState(false);





// =======================================================
// NORMALIZE API DATA
// =======================================================


const normalizeData = (

rawData:
 | PrincipalMessageTableData
 | PrincipalMessageTableData[]
 | null
 | undefined

)=>{


if(Array.isArray(rawData)){

return rawData.length
?
rawData[0]
:
null;

}



if(
rawData &&
typeof rawData==="object"
){

return rawData as PrincipalMessageTableData;

}



return null;


};






// =======================================================
// FETCH PRINCIPAL MESSAGE
// =======================================================


const fetchPrincipalMessage = async(
showRefresh=false
)=>{


try{


if(showRefresh){

setRefreshing(true);

}



const response =
await fetch(
"/api/principal-message",
{
cache:"no-store",
}
);




const result:
PrincipalMessageApiResponse =
await response.json();




if(
!response.ok ||
!result.success
){

throw new Error(
result.message ||
"Failed to fetch Principal Message."
);

}




setPrincipalMessage(

normalizeData(
result.data
)

);



}

catch(error){


console.error(
"FETCH PRINCIPAL MESSAGE ERROR:",
error
);


toast.error(

error instanceof Error
?
error.message
:
"Failed to load Principal Message."

);



setPrincipalMessage(null);



}

finally{


setLoading(false);



if(showRefresh){

setRefreshing(false);

}


}



};





// =======================================================
// INITIAL LOAD
// =======================================================

useEffect(() => {

  const loadPrincipalMessage = async () => {

    try {

      const response = await fetch(
        "/api/principal-message",
        {
          cache: "no-store",
        }
      );


      const result =
        await response.json();


      if (
        response.status === 404
      ) {

        setPrincipalMessage(null);

        return;
      }



      if (
        !response.ok ||
        !result.success
      ) {

        throw new Error(
          result.message ||
          "Failed to fetch Principal Message."
        );

      }



      setPrincipalMessage(
        result.data
      );


    } catch(error){

      console.error(
        "FETCH PRINCIPAL MESSAGE ERROR:",
        error
      );


      toast.error(
        error instanceof Error
        ? error.message
        : "Failed to load Principal Message."
      );


    } finally {

      setLoading(false);

    }

  };


  loadPrincipalMessage();


},[]);
// =======================================================
// CREATE
// =======================================================


const handleCreate = () => {

router.push(
"/dashboard/home/principal-message/new"
);

};





// =======================================================
// EDIT
// =======================================================


const handleEdit = (
id:string
)=>{


router.push(
`/dashboard/home/principal-message/edit/${id}`
);


};






// =======================================================
// DELETE
// =======================================================


const handleDelete = async(
id:string
)=>{


const confirmed =
window.confirm(
"Are you sure you want to delete the Principal Message?"
);



if(!confirmed){

return;

}



try{


setDeleting(true);



const response =
await fetch(
`/api/principal-message?id=${encodeURIComponent(id)}`,
{
method:"DELETE",
}
);



const result:
PrincipalMessageApiResponse =
await response.json();




if(
!response.ok ||
!result.success
){

throw new Error(
result.message ||
"Failed to delete Principal Message."
);

}




setPrincipalMessage(null);



toast.success(
"Principal Message deleted successfully."
);



}

catch(error){


console.error(
"DELETE PRINCIPAL MESSAGE ERROR:",
error
);



toast.error(

error instanceof Error
?
error.message
:
"Failed to delete Principal Message."

);



}

finally{


setDeleting(false);


}



};








// =======================================================
// TOGGLE STATUS
// =======================================================


const handleToggleStatus = async(

id:string,

currentStatus:boolean

)=>{


try{


setUpdatingStatus(true);



const response =
await fetch(
`/api/principal-message?id=${encodeURIComponent(id)}`,
{

method:"PATCH",

headers:{
"Content-Type":
"application/json",
},

body:JSON.stringify({

isActive:
!currentStatus,

}),


}
);





const result:
PrincipalMessageApiResponse =
await response.json();




if(
!response.ok ||
!result.success
){

throw new Error(

result.message ||
"Failed to update Principal Message status."

);

}





setPrincipalMessage(
previous=>{

if(!previous){

return null;

}



return {

...previous,

isActive:
!currentStatus,

};


}
);





toast.success(

currentStatus

?

"Principal Message hidden."

:

"Principal Message published."

);



}

catch(error){


console.error(
"TOGGLE STATUS ERROR:",
error
);



toast.error(

error instanceof Error
?
error.message
:
"Failed to update status."

);



}

finally{


setUpdatingStatus(false);


}



};






// =======================================================
// REFRESH
// =======================================================


const handleRefresh = ()=>{


fetchPrincipalMessage(true);


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

Principal Message

</h1>



<p
className="
mt-1
text-sm
text-slate-500
"
>

Manage the Principal Message section of the website.

</p>


</div>



<button
type="button"
onClick={handleCreate}
className="
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

<Plus size={18}/>

Create Principal Message

</button>



</div>




<PrincipalMessageLoading />


</div>


</main>

);


}
// =======================================================
// EMPTY STATE
// =======================================================


if(!principalMessage){


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



{/* HEADER */}


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

Principal Message

</h1>



<p

className="
mt-2
max-w-xl
text-sm
leading-6
text-slate-500
"

>

Manage the Principal Message section
displayed on the website.

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

onClick={handleRefresh}

disabled={refreshing}

className="
inline-flex
min-h-11
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
transition
hover:border-[#008B45]
hover:text-[#008B45]
disabled:opacity-50
"

>


<RefreshCw

size={17}

className={
refreshing
?
"animate-spin"
:
""
}

/>


Refresh


</button>





<button

type="button"

onClick={handleCreate}

className="
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


<Plus size={18}/>


Create Principal Message


</button>



</div>




</div>








<PrincipalMessageEmpty />





</div>


</main>

);


}









// =======================================================
// DATA AVAILABLE
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

Principal Message

</h1>




<p

className="
mt-2
text-sm
text-slate-500
"

>

Manage your Principal Message content,
status and updates.

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

onClick={handleRefresh}

disabled={refreshing}

className="
inline-flex
min-h-11
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
transition
hover:border-[#008B45]
hover:text-[#008B45]
disabled:opacity-50
"

>


<RefreshCw

size={17}

className={
refreshing
?
"animate-spin"
:
""
}

/>


Refresh


</button>






<button

type="button"

onClick={handleCreate}

className="
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


<Plus size={18}/>


Create Principal Message


</button>




</div>




</div>
{/* =====================================================
// BUTTON
// =====================================================*/}

<div

className="
overflow-hidden
rounded-2xl
border
border-slate-200
bg-white
shadow-sm
"

>



{/* =====================================================
    CARD HEADER
===================================================== */}



<div

className="
flex
flex-col
gap-3
border-b
border-slate-200
px-5
py-5
sm:flex-row
sm:items-center
sm:justify-between
sm:px-6
"

>


<div>


<h2

className="
text-lg
font-semibold
text-slate-800
"

>

Principal Message List

</h2>



<p

className="
mt-1
text-sm
text-slate-500
"

>

Manage message details,
visibility and actions.

</p>



</div>





<span

className="
inline-flex
w-fit
rounded-full
bg-emerald-50
px-3
py-1.5
text-xs
font-semibold
text-emerald-600
"

>

1 Message Added

</span>



</div>









{/* =====================================================
    TABLE
===================================================== */}



<div className="px-0">
  <PrincipalMessageTable
    data={principalMessage}
    onEdit={handleEdit}
    onDelete={handleDelete}
    onToggleStatus={handleToggleStatus}
    deleting={deleting}
    updatingStatus={updatingStatus}
  />
</div>



</div>








</div>


</main>

);


}
