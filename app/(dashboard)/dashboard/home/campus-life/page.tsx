"use client";


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



import CampusLifeTable from "@/components/dashboard/home/campus-life/CampusLifeTable";


import CampusLifeEmpty from "@/components/dashboard/home/campus-life/CampusLifeEmpty";


import CampusLifeLoading from "@/components/dashboard/home/campus-life/CampusLifeLoading";



import type {
  CampusLifeTableData,
} from "@/components/dashboard/home/campus-life/CampusLifeTable";






// =========================================================
// PAGE
// =========================================================


export default function CampusLifePage(){



const router = useRouter();





// =========================================================
// STATES
// =========================================================


const [data,setData] =
useState<CampusLifeTableData[]>([]);



const [loading,setLoading] =
useState(true);



const [deleting,setDeleting] =
useState(false);



const [updatingStatus,setUpdatingStatus] =
useState(false);





// =========================================================
// FETCH DATA
// =========================================================


const fetchCampusLife = async()=>{


try{


setLoading(true);



const response =
await fetch(
"/api/campus-life",
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




setData(
result.data || []
);




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


const loadData = async()=>{

await fetchCampusLife();

};


loadData();


},[]);



// =========================================================
// EDIT
// =========================================================


const handleEdit = (
  id:string
)=>{


router.push(
`/dashboard/home/campus-life/edit/${id}`
);


};







// =========================================================
// DELETE
// =========================================================


const handleDelete = async(
  id:string
)=>{


try{


setDeleting(true);



const response =
await fetch(
`/api/campus-life/${id}`,
{
method:"DELETE",
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
"Delete failed"
);

}



toast.success(
"Campus Life deleted successfully"
);



fetchCampusLife();



}


catch(error){


console.error(
"DELETE CAMPUS LIFE ERROR:",
error
);



toast.error(
error instanceof Error
?
error.message
:
"Delete failed"
);



}

finally{


setDeleting(false);


}



};









// =========================================================
// TOGGLE STATUS
// =========================================================


const handleToggleStatus = async(

id:string,

currentStatus:boolean

)=>{


try{


setUpdatingStatus(true);



const response =
await fetch(
`/api/campus-life/${id}`,
{

method:"PATCH",

headers:{
"Content-Type":"application/json",
},


body:JSON.stringify({

isActive:
!currentStatus

}),


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
"Status update failed"
);

}





toast.success(

!currentStatus

?

"Campus Life published"

:

"Campus Life hidden"

);




fetchCampusLife();





}


catch(error){


console.error(
"UPDATE STATUS ERROR:",
error
);



toast.error(
error instanceof Error
?
error.message
:
"Status update failed"
);



}


finally{


setUpdatingStatus(false);


}



};






// =========================================================
// CREATE
// =========================================================


const handleCreate = ()=>{


router.push(
"/dashboard/home/campus-life/new"
);


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

Campus Life

</h1>




<p

className="
mt-2
text-sm
text-slate-500
"

>

Manage campus life content, visibility and updates.

</p>



</div>









<div

className="
flex
gap-3
"

>



<button


type="button"


onClick={
fetchCampusLife
}


className="
rounded-xl
border
border-slate-200
bg-white
px-5
py-3
text-sm
font-semibold
text-slate-700
transition
hover:bg-slate-50
"

>

Refresh

</button>








<button


type="button"


onClick={
handleCreate
}


className="
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

+ Create Campus Life

</button>





</div>





</div>









{/* ================= CONTENT ================= */}



<div


className="
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
"

>
{/* ================= CONTENT ================= */}


{

loading ? (


<CampusLifeLoading />


)


:


data.length === 0 ? (


<CampusLifeEmpty />


)


:


<CampusLifeTable


data={data}


onEdit={handleEdit}


onDelete={handleDelete}


onToggleStatus={
handleToggleStatus
}


deleting={
deleting
}


updatingStatus={
updatingStatus
}


/>


}



</div>



</div>



</main>



);


}
