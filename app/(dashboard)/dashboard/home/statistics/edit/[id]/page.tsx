"use client";


import {
  ArrowLeft,
  Loader2,
  BarChart3,
} from "lucide-react";


import {
  useCallback,
  useEffect,
  useState,
} from "react";


import {
  useParams,
  useRouter,
} from "next/navigation";


import { toast } from "sonner";


import StatisticsForm from "@/components/dashboard/home/statistics/StatisticsForm";

import StatisticsPreview from "@/components/dashboard/home/statistics/StatisticsPreview";


import type {
  StatisticsData,
} from "@/components/dashboard/home/statistics/StatisticsTableRow";






export default function EditStatisticsPage(){


const router = useRouter();

const params = useParams();



const id =
typeof params.id === "string"
?
params.id
:
"";




const [statistics,setStatistics] =
useState<StatisticsData | null>(null);



const [previewData,setPreviewData] =
useState<any>(null);



const [loading,setLoading] =
useState(true);






useEffect(()=>{


if(!id){

return;

}




const loadStatistics=async()=>{


try{


const response =
await fetch(
"/api/statistics",
{
cache:"no-store"
}
);



const data =
await response.json();





if(!response.ok || !data.success){

throw new Error(
data.message ||
"Failed to load statistics"
);

}




setStatistics(data.data);

setPreviewData(data.data);



}

catch(error){


toast.error(
error instanceof Error
?
error.message
:
"Something went wrong"
);



}

finally{

setLoading(false);

}


};



loadStatistics();



},[id]);









const handlePreviewChange =
useCallback(
(data:any)=>{


setPreviewData(
(previous:any)=>({

...previous,

...data

})

);



},
[]
);







const handleSuccess =
(updatedData:StatisticsData)=>{


toast.success(
"Statistics updated successfully."
);



router.push(
"/dashboard/home/statistics"
);



router.refresh();


};









if(loading){


return(

<div className="
flex
min-h-screen
items-center
justify-center
bg-[#030817]
">


<Loader2

size={35}

className="
animate-spin
text-cyan-400
"

/>


</div>

);


}







if(!statistics || !previewData){


return null;


}









return(


<div

className="
min-h-screen
bg-[#030817]
p-4
sm:p-6
lg:p-8
"

>


{/* BACK */}



<button

onClick={()=>router.push(
"/dashboard/home/statistics"
)}

className="
mb-6
flex
items-center
gap-2
text-sm
font-medium
text-slate-400
hover:text-cyan-400
"


>

<ArrowLeft size={17}/>

Back to Statistics


</button>








{/* HEADER */}



<div

className="
mb-6
rounded-3xl
border
border-white/10
bg-[#080d20]
p-6
"


>


<div className="flex items-center gap-4">


<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-cyan-400/10
text-cyan-400
"


>

<BarChart3 size={25}/>


</div>





<div>


<h1

className="
text-3xl
font-bold
text-white
"

>

Edit Statistics

</h1>



<p

className="
mt-1
text-sm
text-slate-400
"

>

Update the Statistics section of the website.

</p>


</div>



</div>



</div>









{/* FORM + PREVIEW */}



<div

className="
grid
gap-6
xl:grid-cols-2
"

>



{/* FORM */}



<div

className="
rounded-3xl
border
border-white/10
bg-[#080d20]
p-6
"

>


<StatisticsForm


initialData={statistics}


onDataChange={handlePreviewChange}


onSuccess={handleSuccess}


/>



</div>









{/* PREVIEW */}



<div

className="
rounded-3xl
border
border-white/10
bg-[#080d20]
p-6
xl:sticky
xl:top-6
h-fit
"

>


<StatisticsPreview

data={previewData}

/>



</div>







</div>






</div>


);


}