"use client";


import {
  Edit3,
  Eye,
  EyeOff,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";


import type {
  CampusLifeTableData,
} from "./CampusLifeTable";



interface CampusLifeTableRowProps {


data: CampusLifeTableData;


onEdit:(id:string)=>void;


onDelete:(id:string)=>void;


onToggleStatus:(

id:string,

currentStatus:boolean

)=>void;


deleting?:boolean;


updatingStatus?:boolean;


}




export default function CampusLifeTableRow({

data,

onEdit,

onDelete,

onToggleStatus,

deleting=false,

updatingStatus=false,

}:CampusLifeTableRowProps){



const formattedDate =

data.createdAt

?

new Date(data.createdAt)
.toLocaleDateString(
"en-GB",
{
day:"2-digit",
month:"short",
year:"numeric"
}
)

:

"—";






return (

<tr

className="
border-b
border-slate-800
transition
hover:bg-[#111936]
"

>



{/* IMAGE */}

<td

className="
px-6
py-5
"

>


<div

className="
h-14
w-20
overflow-hidden
rounded-xl
bg-slate-800
"

>


{

data.image

?

<img

src={data.image}

alt={data.title}

className="
h-full
w-full
object-cover
"

/>


:

<ImageIcon

size={22}

className="
mx-auto
text-slate-400
"

/>

}



</div>


</td>







{/* TITLE */}


<td

className="
px-6
py-5
"

>


<p

className="
font-semibold
text-emerald-400
"

>

{data.title}

</p>



<p

className="
mt-1
text-xs
text-slate-400
"

>

Campus Life

</p>


</td>








{/* DESCRIPTION */}


<td

className="
max-w-[300px]
px-6
py-5
"

>


<p

className="
line-clamp-2
text-sm
text-slate-300
"

>

{data.shortDescription}

</p>


</td>








{/* STATUS */}


<td

className="
px-6
py-5
"

>


<button

disabled={updatingStatus}

onClick={()=>


onToggleStatus(

data._id,

data.isActive

)

}


className="

flex
items-center
gap-2

"


>


<span

className={`
h-2
w-2
rounded-full

${
data.isActive

?

"bg-emerald-500"

:

"bg-slate-400"

}

`}

/>



<span

className={`
text-xs
font-semibold

${
data.isActive

?

"text-emerald-400"

:

"text-slate-400"

}

`}

>


{

data.isActive

?

"Published"

:

"Hidden"

}


</span>



</button>


</td>









{/* DATE */}



<td

className="
px-6
py-5
"

>


<span

className="
text-sm
text-slate-400
"

>

{formattedDate}

</span>


</td>








{/* ACTIONS */}



<td

className="
px-6
py-5
"

>


<div

className="
flex
justify-end
gap-2
"

>



<button

type="button"

onClick={()=>onEdit(data._id)}

className="
flex
h-9
w-9
items-center
justify-center
rounded-lg
border
border-cyan-500/40
text-cyan-400
hover:bg-cyan-500/10
"

>


<Edit3 size={16}/>


</button>









<button

type="button"

disabled={updatingStatus}

onClick={()=>


onToggleStatus(

data._id,

data.isActive

)

}

className="
flex
h-9
w-9
items-center
justify-center
rounded-lg
border
border-slate-600
text-slate-300
hover:bg-slate-800
"

>


{

data.isActive

?

<EyeOff size={16}/>

:

<Eye size={16}/>

}



</button>








<button

type="button"

disabled={deleting}

onClick={()=>onDelete(data._id)}

className="
flex
h-9
w-9
items-center
justify-center
rounded-lg
border
border-red-500/40
text-red-400
hover:bg-red-500/10
"

>


<Trash2 size={16}/>


</button>





</div>


</td>





</tr>

);


}