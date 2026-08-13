"use client";


import {
Edit3,
Eye,
EyeOff,
Trash2
} from "lucide-react";


import type {
PrincipalMessageTableData
} from "./PrincipalMessageTable";



interface Props {

data:PrincipalMessageTableData;

onEdit:(id:string)=>void;

onDelete:(id:string)=>void;

onToggleStatus:(
id:string,
currentStatus:boolean
)=>void;

deleting?:boolean;

updatingStatus?:boolean;

}



export default function PrincipalMessageTableRow({

data,

onEdit,

onDelete,

onToggleStatus,

deleting=false,

updatingStatus=false,

}:Props){



return (

<tr
className="
transition
hover:bg-[#111936]
"
>



<td
className="
px-6
py-5
"
>


<div
className="
flex
items-center
gap-4
"
>


<img

src={
data.principalImage
}

alt={
data.principalName
}

className="
h-14
w-14
rounded-xl
object-cover
border
border-slate-700
"

/>



<div>


<h3
className="
font-bold
text-white
"
>

{data.principalName}

</h3>


<p
className="
text-sm
text-slate-400
"
>

{data.designation}

</p>



</div>


</div>


</td>







<td
className="
px-6
py-5
"
>


<p
className="
font-semibold
text-cyan-400
"
>

{data.heading}

</p>



<p
className="
mt-1
text-xs
text-slate-400
"
>

{data.description}

</p>



</td>








<td
className="
px-6
py-5
"
>


{
data.isActive ?

<span
className="
rounded-full
border
border-emerald-500/30
bg-emerald-500/10
px-4
py-2
text-xs
font-semibold
text-emerald-400
"
>
Published
</span>

:

<span
className="
rounded-full
bg-slate-700
px-4
py-2
text-xs
text-slate-300
"
>
Hidden
</span>

}



</td>






<td
className="
px-6
py-5
text-sm
text-slate-400
"
>

{
data.createdAt
?
new Date(
data.createdAt
).toLocaleDateString()
:
"—"
}


</td>







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

onClick={()=>
onEdit(data._id)
}

className="
flex
h-9
w-9
items-center
justify-center
rounded-lg
border
border-cyan-400/30
text-cyan-400
hover:bg-cyan-400/10
"

>

<Edit3 size={16}/>

</button>




<button

onClick={()=>
onToggleStatus(
data._id,
data.isActive
)
}

disabled={updatingStatus}

className="
flex
h-9
w-9
items-center
justify-center
rounded-lg
border
border-slate-700
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

disabled={deleting}

onClick={()=>
onDelete(data._id)
}

className="
flex
h-9
w-9
items-center
justify-center
rounded-lg
border
border-red-500/30
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