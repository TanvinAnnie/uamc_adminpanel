"use client";


import {
  ArrowLeft,
  Edit3,
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


import StatisticsLoading from "@/components/dashboard/home/statistics/StatisticsLoading";
import StatisticsEmpty from "@/components/dashboard/home/statistics/StatisticsEmpty";
import StatisticsTable from "@/components/dashboard/home/statistics/StatisticsTable";


import type {
  StatisticsData,
} from "@/components/dashboard/home/statistics/StatisticsTableRow";







export default function StatisticsPage(){



const router = useRouter();




const [statistics,setStatistics] =
useState<StatisticsData | null>(null);



const [loading,setLoading] =
useState(true);









useEffect(()=>{



let cancelled=false;




const loadStatistics=async()=>{


try{


const response =
await fetch(
"/api/statistics",
{
cache:"no-store",
}
);



const data =
await response.json();




if(cancelled){

return;

}





if(response.status===404){

setStatistics(null);

return;

}




if(
!response.ok ||
!data.success
){

throw new Error(
data.message ||
"Failed to load statistics"
);

}




setStatistics(data.data);



}



catch(error){


console.error(error);



toast.error(

error instanceof Error

?

error.message

:

"Something went wrong"

);


}



finally{


if(!cancelled){

setLoading(false);

}



}




};



loadStatistics();




return()=>{

cancelled=true;

};



},[]);








const handleDelete=()=>{


setStatistics(null);


};









// ================================
// LOADING
// ================================


if(loading){


return(


<div
className="
w-full
space-y-6
"
>

<StatisticsLoading/>


</div>


);


}









return(



<div

className="
w-full
space-y-6
"

>



{/* =====================================
    HEADER CARD
===================================== */}



<div

className="
rounded-3xl
border
border-slate-800
bg-[#080d20]
p-6
shadow-xl
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



<div>


<h1

className="
text-3xl
font-bold
text-white
"

>

Statistics

</h1>





<p

className="
mt-2
text-sm
text-slate-400
"

>

Manage the Statistics section of the website.

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


onClick={()=>router.push("/dashboard")}


className="
inline-flex
items-center
gap-2
rounded-xl
border
border-slate-700
bg-slate-800
px-5
py-3
text-sm
font-medium
text-slate-300
transition
hover:bg-slate-700
"

>


<ArrowLeft size={16}/>


Back Dashboard


</button>








{

statistics && (


<button


type="button"


onClick={()=>router.push(

`/dashboard/home/statistics/edit/${statistics._id}`

)}


className="
inline-flex
items-center
gap-2
rounded-xl
bg-cyan-500
px-5
py-3
text-sm
font-semibold
text-white
transition
hover:bg-cyan-600
"

>


<Edit3 size={16}/>


Edit Statistics


</button>


)

}





</div>



</div>



</div>









{/* =====================================
    CONTENT
===================================== */}



{


!statistics ?



<StatisticsEmpty/>



:


<StatisticsTable

statistics={statistics}

onDelete={handleDelete}

/>


}





</div>



);



}