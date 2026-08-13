"use client";

import PrincipalMessageTableRow from "./PrincipalMessageTableRow";


export interface PrincipalMessageTableData {

  _id:string;

  tagline:string;

  principalName:string;

  designation:string;

  heading:string;

  description:string;

  principalImage:string;

  isActive:boolean;

  createdAt?:string;

}



interface PrincipalMessageTableProps {

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



export default function PrincipalMessageTable({

data,

onEdit,

onDelete,

onToggleStatus,

deleting=false,

updatingStatus=false,


}:PrincipalMessageTableProps){



return (

<div
className="
overflow-hidden
rounded-3xl
border
border-slate-800
bg-[#080D24]
shadow-xl
"
>



{/* HEADER */}

<div
className="
flex
items-center
justify-between
border-b
border-slate-800
px-6
py-5
"
>


<div>

<h2
className="
text-lg
font-bold
text-white
"
>
Principal Message List
</h2>


<p
className="
mt-1
text-sm
text-slate-400
"
>
Manage principal information, visibility and updates.
</p>


</div>



<div
className="
rounded-full
bg-emerald-500/10
px-4
py-2
text-xs
font-semibold
text-emerald-400
"
>

1 Message Added

</div>



</div>





{/* SEARCH */}

<div
className="
px-5
py-4
"
>


<input

placeholder="Search Principal Message..."

className="
w-full
max-w-md
rounded-xl
border
border-slate-700
bg-[#111936]
px-4
py-3
text-sm
text-white
outline-none
placeholder:text-slate-500
focus:border-cyan-400
"

/>


</div>






<div
className="
overflow-x-auto
"
>


<table
className="
w-full
"
>


<thead
className="
bg-[#111936]
"
>


<tr>


{
[
"Preview",
"Information",
"Content",
"Status",
"Created",
"Actions"
].map((item)=>(


<th

key={item}

className="
px-6
py-4
text-left
text-xs
font-semibold
uppercase
tracking-wide
text-slate-400
"

>

{item}

</th>


))
}



</tr>


</thead>





<tbody
className="
divide-y
divide-slate-800
"
>


<PrincipalMessageTableRow

data={data}

onEdit={onEdit}

onDelete={onDelete}

onToggleStatus={onToggleStatus}

deleting={deleting}

updatingStatus={updatingStatus}

/>



</tbody>



</table>


</div>




</div>


);


}