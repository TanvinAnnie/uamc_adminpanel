"use client";


import {
  Edit3,
  Trash2,
} from "lucide-react";


import Image from "next/image";


import {
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";




// =========================================================
// TYPES
// =========================================================


export interface DepartmentData {


  _id:string;


  name:string;


  slug:string;


  image:string;


  description:string;


  isPopular:boolean;


  isActive:boolean;


  order:number;


  createdAt?:string;


  updatedAt?:string;


}






interface DepartmentTableRowProps{


department:DepartmentData;


onDelete:(id:string)=>void;


}









// =========================================================
// COMPONENT
// =========================================================


export default function DepartmentTableRow({


department,


onDelete,


}:DepartmentTableRowProps){



const router = useRouter();





// =====================================================
// DELETE
// =====================================================


const handleDelete=async()=>{



const confirmDelete =
window.confirm(
"Are you sure you want to delete this department?"
);



if(!confirmDelete){

return;

}




try{


const response =
await fetch(

`/api/departments/${department._id}`,

{

method:"DELETE",

}

);





const result =
await response.json();





if(

!response.ok ||

!result.success

){


throw new Error(

result.message ||

"Delete failed."

);


}




toast.success(
"Department deleted successfully."
);



onDelete(
department._id
);



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

"Delete failed."

);


}



};








return(



<div

className="

border-b

border-slate-800

transition

hover:bg-white/[0.03]

"

>







{/* =================================================
    DESKTOP ROW
================================================= */}



<div

className="

hidden

lg:grid

grid-cols-[90px_minmax(220px,1fr)_150px_150px_100px_140px]

items-center

gap-4

px-6

py-5

"

>







{/* IMAGE */}



<div

className="

relative

h-16

w-20

overflow-hidden

rounded-xl

border

border-slate-700

bg-slate-900

"

>


{

department.image

?

<Image

src={department.image}

alt={department.name}

fill

sizes="80px"

className="object-cover"

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








{/* NAME */}



<div>


<h3

className="

font-semibold

text-white

"

>

{department.name}

</h3>



<p

className="

mt-1

text-sm

text-slate-400

line-clamp-1

"

>

{department.description}

</p>


</div>








{/* POPULAR */}



<div>


<span

className={

`

inline-flex

rounded-full

px-3

py-1

text-xs

font-semibold


${

department.isPopular

?

"bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"

:

"bg-slate-700 text-slate-300"

}

`

}

>

{

department.isPopular

?

"Popular"

:

"Normal"

}


</span>


</div>








{/* STATUS */}



<div>


<span

className={

`

inline-flex

rounded-full

px-3

py-1

text-xs

font-semibold


${

department.isActive

?

"bg-blue-400/10 text-blue-400 border border-blue-400/20"

:

"bg-slate-700 text-slate-300"

}

`

}

>


{

department.isActive

?

"Active"

:

"Inactive"

}



</span>


</div>








{/* ORDER */}



<div

className="

text-white

font-semibold

"

>

{department.order}


</div>








{/* ACTION */}



<div

className="

flex

gap-2

"

>


<button


type="button"


onClick={()=>


router.push(

`/dashboard/home/departments/edit/${department._id}`

)

}


className="

flex

h-9

items-center

gap-2

rounded-lg

border

border-blue-400/20

bg-blue-400/10

px-3

text-xs

font-semibold

text-blue-400

hover:bg-blue-400/20

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

rounded-lg

border

border-red-400/20

bg-red-400/10

px-3

text-xs

font-semibold

text-red-400

hover:bg-red-400/20

"

>


<Trash2 size={15}/>


Delete


</button>





</div>





</div>









{/* =================================================
    MOBILE CARD
================================================= */}



<div

className="

space-y-4

p-5

lg:hidden

"

>






<div

className="

flex

gap-4

"

>



<div

className="

relative

h-20

w-24

shrink-0

overflow-hidden

rounded-xl

border

border-slate-700

"

>


{

department.image &&

<Image

src={department.image}

alt={department.name}

fill

className="object-cover"

/>


}


</div>




<div>


<h3

className="

font-semibold

text-white

"

>

{department.name}

</h3>



<p

className="

mt-1

text-sm

text-slate-400

"

>

{department.description}

</p>


</div>



</div>








<div

className="

flex

flex-wrap

gap-2

"

>


<span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">

{department.isPopular ? "Popular":"Normal"}

</span>



<span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs text-blue-400">

{department.isActive ? "Active":"Inactive"}

</span>



</div>








<div

className="

flex

gap-2

"

>


<button

onClick={()=>router.push(

`/dashboard/home/departments/edit/${department._id}`

)}

className="flex-1 rounded-xl bg-blue-400/10 py-2 text-sm text-blue-400"

>

Edit

</button>




<button

onClick={handleDelete}

className="flex-1 rounded-xl bg-red-400/10 py-2 text-sm text-red-400"

>

Delete

</button>



</div>





</div>





</div>



);



}