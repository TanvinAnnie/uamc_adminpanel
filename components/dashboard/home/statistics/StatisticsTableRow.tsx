"use client";


import {
  Edit3,
  Trash2,
} from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



export interface StatisticsData {

  _id:string;

  backgroundImage:string;


  statisticOneValue:string;
  statisticOneTitle:string;


  statisticTwoValue:string;
  statisticTwoTitle:string;


  statisticThreeValue:string;
  statisticThreeTitle:string;


  isActive:boolean;


  createdAt?:string;
  updatedAt?:string;

}




interface StatisticsTableRowProps {

  statistics:StatisticsData;

  onDelete:()=>void;

}





export default function StatisticsTableRow({

  statistics,

  onDelete,

}:StatisticsTableRowProps){



const router = useRouter();




// DELETE

const handleDelete = async()=>{


const confirmDelete =
window.confirm(
"Are you sure you want to delete Statistics section?"
);



if(!confirmDelete){

return;

}



try{


const response = await fetch(
"/api/statistics",
{
method:"DELETE"
}
);



const data =
await response.json();



if(!response.ok || !data.success){

throw new Error(
data.message ||
"Failed to delete Statistics"
);

}



toast.success(
"Statistics deleted successfully"
);



onDelete();



}

catch(error){


console.error(
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



};





return(


<tr

className="
border-b
border-white/10
transition
hover:bg-white/[0.04]
"


>



{/* IMAGE */}

<td className="px-6 py-5">


<div

className="
relative
h-16
w-24
overflow-hidden
rounded-xl
border
border-white/10
bg-[#111a35]
"

>


{

statistics.backgroundImage ?

<Image

src={statistics.backgroundImage}

alt="Statistics"

fill

sizes="96px"

className="
object-cover
"

/>


:

<div

className="
flex
h-full
items-center
justify-center
text-xs
text-slate-500
"

>

No Image

</div>

}


</div>


</td>








{/* STAT ONE */}

<td className="px-6 py-5">


<div>


<h3

className="
text-xl
font-bold
text-cyan-400
"

>

{statistics.statisticOneValue || "--"}

</h3>



<p

className="
mt-1
max-w-[180px]
text-sm
text-slate-400
"

>

{statistics.statisticOneTitle || "No title"}

</p>


</div>


</td>








{/* STAT TWO */}

<td className="px-6 py-5">


<div>


<h3

className="
text-xl
font-bold
text-cyan-400
"

>

{statistics.statisticTwoValue || "--"}

</h3>



<p

className="
mt-1
max-w-[180px]
text-sm
text-slate-400
"

>

{statistics.statisticTwoTitle || "No title"}

</p>


</div>


</td>








{/* STAT THREE */}

<td className="px-6 py-5">


<div>


<h3

className="
text-xl
font-bold
text-cyan-400
"

>

{statistics.statisticThreeValue || "--"}

</h3>



<p

className="
mt-1
max-w-[180px]
text-sm
text-slate-400
"

>

{statistics.statisticThreeTitle || "No title"}

</p>


</div>


</td>








{/* STATUS */}

<td className="px-6 py-5">


<span

className={`
inline-flex
rounded-full
border
px-4
py-1.5
text-xs
font-semibold


${
statistics.isActive

?

"border-emerald-400/30 bg-emerald-400/10 text-emerald-300"

:

"border-white/20 bg-white/10 text-slate-400"

}

`}

>


{statistics.isActive
?
"Published"
:
"Draft"
}


</span>


</td>








{/* ACTION */}

<td className="px-6 py-5">


<div

className="
flex
justify-end
gap-3

"

>


<button

type="button"

onClick={()=>


router.push(

`/dashboard/home/statistics/edit/${statistics._id}`

)


}


className="
flex
h-9
items-center
gap-2
rounded-xl
border
border-cyan-400/20
bg-cyan-400/10
px-4
text-sm
font-semibold
text-cyan-300
transition
hover:bg-cyan-400/20

"

>


<Edit3 size={15}/>

Edit


</button>





<button

type="button"

onClick={handleDelete}


className="
flex
h-9
items-center
gap-2
rounded-xl
border
border-red-400/20
bg-red-400/10
px-4
text-sm
font-semibold
text-red-300
transition
hover:bg-red-400/20

"

>


<Trash2 size={15}/>

Delete


</button>



</div>


</td>



</tr>


);


}