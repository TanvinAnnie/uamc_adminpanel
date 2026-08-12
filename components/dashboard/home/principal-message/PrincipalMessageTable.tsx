"use client";

import type { PrincipalMessageTableData } from "./PrincipalMessageTable";

import PrincipalMessageTableRow from "./PrincipalMessageTableRow";


interface PrincipalMessageTableProps {
  data: PrincipalMessageTableData;

  onEdit: (id:string)=>void;

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
rounded-2xl
border
border-slate-200
bg-white
"
>


{/* DESKTOP */}

<div className="hidden lg:block overflow-x-auto">

<table className="w-full">


<thead
className="
bg-slate-50
border-b
border-slate-200
"
>

<tr>

<th className="
px-6
py-4
text-left
text-xs
font-semibold
uppercase
text-slate-500
">
Preview
</th>


<th className="
px-6
py-4
text-left
text-xs
font-semibold
uppercase
text-slate-500
">
Information
</th>


<th className="
px-6
py-4
text-left
text-xs
font-semibold
uppercase
text-slate-500
">
Description
</th>


<th className="
px-6
py-4
text-left
text-xs
font-semibold
uppercase
text-slate-500
">
Status
</th>


<th className="
px-6
py-4
text-left
text-xs
font-semibold
uppercase
text-slate-500
">
Created
</th>


<th className="
px-6
py-4
text-right
text-xs
font-semibold
uppercase
text-slate-500
">
Actions
</th>


</tr>


</thead>


<tbody>


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





{/* MOBILE */}

<div
className="
grid
gap-4
p-4
lg:hidden
"
>


<div
className="
rounded-xl
border
border-slate-200
bg-slate-50
p-4
"
>


<div className="
flex
items-center
gap-4
">


<img

src={data.principalImage}

alt={data.principalName}

className="
h-16
w-16
rounded-xl
object-cover
"

/>


<div>

<h3 className="
font-semibold
text-slate-800
">
{data.principalName}
</h3>


<p className="
text-sm
text-slate-500
">
{data.designation}
</p>


</div>


</div>



<p className="
mt-4
text-sm
text-slate-600
">
{data.description}
</p>



<div className="
mt-4
flex
gap-2
">

<button
onClick={()=>onEdit(data._id)}
className="
rounded-lg
bg-blue-50
px-4
py-2
text-sm
font-semibold
text-blue-600
"
>
Edit
</button>


<button
onClick={()=>onDelete(data._id)}
className="
rounded-lg
bg-red-50
px-4
py-2
text-sm
font-semibold
text-red-600
"
>
Delete
</button>


</div>


</div>


</div>


</div>

);

}