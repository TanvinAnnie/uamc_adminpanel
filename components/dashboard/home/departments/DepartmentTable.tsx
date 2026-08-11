"use client";


import DepartmentTableRow, {
  DepartmentData,
} from "./DepartmentTableRow";




// =========================================================
// PROPS
// =========================================================


interface DepartmentTableProps {

  departments: DepartmentData[];

  onDelete: (id:string)=>void;

}






// =========================================================
// COMPONENT
// =========================================================


export default function DepartmentTable({

  departments,

  onDelete,

}:DepartmentTableProps){



return(


<div

className="
w-full
overflow-hidden
rounded-2xl
border
border-slate-800
bg-[#080f24]
shadow-xl
"

>



{/* =========================================
    SEARCH AREA
========================================= */}



<div

className="
border-b
border-slate-800
p-5
"

>


<input

type="text"

placeholder="Search Department..."

className="
h-11
w-full
max-w-md
rounded-xl
border
border-slate-700
bg-[#0b142d]
px-4
text-sm
text-white
placeholder:text-slate-500
outline-none

focus:border-emerald-400
"

/>


</div>







{/* =========================================
    DESKTOP HEADER
========================================= */}



<div

className="
hidden
border-b
border-slate-800

lg:grid

grid-cols-[90px_minmax(220px,1fr)_150px_150px_100px_140px]

items-center

gap-4

bg-[#101a36]

px-6

py-4

"

>



<div
className="
text-xs
font-semibold
uppercase
tracking-wide
text-slate-400
"
>

Image

</div>




<div
className="
text-xs
font-semibold
uppercase
tracking-wide
text-slate-400
"
>

Department

</div>





<div
className="
text-xs
font-semibold
uppercase
tracking-wide
text-slate-400
"
>

Popular

</div>





<div
className="
text-xs
font-semibold
uppercase
tracking-wide
text-slate-400
"
>

Status

</div>





<div
className="
text-xs
font-semibold
uppercase
tracking-wide
text-slate-400
"
>

Order

</div>





<div
className="
text-xs
font-semibold
uppercase
tracking-wide
text-slate-400
"
>

Actions

</div>



</div>








{/* =========================================
    ROWS
========================================= */}



<div>


{

departments.map(

(department)=>(


<DepartmentTableRow

key={department._id}

department={department}

onDelete={onDelete}

/>


)


)


}



</div>





</div>


);


}