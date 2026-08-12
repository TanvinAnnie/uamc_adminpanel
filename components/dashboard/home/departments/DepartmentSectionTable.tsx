"use client";


import DepartmentSectionRow, {
  DepartmentSectionData,
} from "./DepartmentSectionRow";



interface DepartmentSectionTableProps {

  section: DepartmentSectionData;

  onDelete: (id:string)=>void;

}




export default function DepartmentSectionTable({

  section,

  onDelete,

}:DepartmentSectionTableProps){


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


{/* HEADER */}


<div

className="
hidden
grid-cols-[160px_minmax(250px,1fr)_200px_150px_120px]
gap-5
border-b
border-slate-800
bg-[#111827]
px-6
py-4

lg:grid
"


>


<div className="
text-xs
font-bold
uppercase
text-slate-400
">

Images

</div>



<div className="
text-xs
font-bold
uppercase
text-slate-400
">

Department Info

</div>



<div className="
text-xs
font-bold
uppercase
text-slate-400
">

Search

</div>



<div className="
text-xs
font-bold
uppercase
text-slate-400
">

Status

</div>



<div className="
text-xs
font-bold
uppercase
text-slate-400
">

Actions

</div>


</div>




<DepartmentSectionRow

section={section}

onDelete={onDelete}

/>



</div>


);


}