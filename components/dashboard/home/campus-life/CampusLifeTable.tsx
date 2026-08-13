"use client";


import CampusLifeTableRow from "./CampusLifeTableRow";


// =========================================================
// TYPES
// =========================================================


export interface CampusLifeTableData {


  _id:string;


  title:string;


  shortDescription:string;


  image:string;


  buttonText:string;


  buttonLink:string;


  isActive:boolean;


  createdAt?:string;


}





interface CampusLifeTableProps {


  data:CampusLifeTableData[];


  onEdit:(id:string)=>void;


  onDelete:(id:string)=>void;


  onToggleStatus:(
    id:string,
    currentStatus:boolean
  )=>void;


  deleting?:boolean;


  updatingStatus?:boolean;


}







// =========================================================
// COMPONENT
// =========================================================


export default function CampusLifeTable({

  data,

  onEdit,

  onDelete,

  onToggleStatus,

  deleting=false,

  updatingStatus=false,

}:CampusLifeTableProps){



return (

<div

className="
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
"

>



{/* ================= HEADER ================= */}


<div

className="
flex
flex-col
gap-3
border-b
border-slate-200
px-6
py-5
sm:flex-row
sm:items-center
sm:justify-between
"

>


<div>


<h2

className="
text-lg
font-bold
text-slate-800
"

>

Campus Life List

</h2>



<p

className="
mt-1
text-sm
text-slate-500
"

>

Manage campus life content, visibility and updates.

</p>


</div>




<div

className="
rounded-full
bg-emerald-50
px-4
py-2
text-xs
font-semibold
text-emerald-600
"

>

{data.length} Items

</div>


</div>









{/* ================= DESKTOP ================= */}



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
border-b
border-slate-200
bg-slate-50
"

>


<tr>


<th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
Preview
</th>


<th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
Information
</th>


<th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
Description
</th>


<th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
Status
</th>


<th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
Created
</th>


<th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
Actions
</th>


</tr>


</thead>







<tbody

className="
divide-y
divide-slate-100
"

>


{
data.map((item)=>(


<CampusLifeTableRow

key={
item._id
}

data={
item
}

onEdit={
onEdit
}

onDelete={
onDelete
}

onToggleStatus={
onToggleStatus
}

deleting={
deleting
}

updatingStatus={
updatingStatus
}

/>


))

}


</tbody>



</table>



</div>









{/* ================= MOBILE ================= */}



<div

className="
grid
gap-4
p-5
lg:hidden
"

>


{
data.map((item)=>(


<div

key={
item._id
}

className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-5
"

>



<div

className="
flex
items-center
gap-4
"

>



<div

className="
h-16
w-16
overflow-hidden
rounded-2xl
bg-emerald-50
"

>


<img

src={
item.image || "/avatar.png"
}

alt={
item.title
}

className="
h-full
w-full
object-cover
"

/>


</div>







<div>


<h3

className="
font-bold
text-slate-800
"

>

{item.title}

</h3>



<p

className="
text-sm
text-slate-500
"

>

Campus Life

</p>


</div>


</div>







<p

className="
mt-5
text-sm
leading-6
text-slate-600
"

>

{item.shortDescription}

</p>







<div

className="
mt-5
flex
gap-3
"

>


<button

type="button"

onClick={()=>onEdit(item._id)}

className="
flex-1
rounded-xl
bg-blue-50
py-3
text-sm
font-semibold
text-blue-600
"

>

Edit

</button>





<button

type="button"

onClick={()=>onDelete(item._id)}

className="
flex-1
rounded-xl
bg-red-50
py-3
text-sm
font-semibold
text-red-600
"

>

Delete

</button>



</div>





</div>


))

}



</div>






</div>


);


}