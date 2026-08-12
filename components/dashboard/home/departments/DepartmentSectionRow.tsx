"use client";


import {
  Edit3,
  Eye,
  Trash2,
} from "lucide-react";


import Image from "next/image";


import {
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";




// =====================================================
// TYPE
// =====================================================


export interface DepartmentSectionData {

  _id:string;

  title:string;

  description:string;

  searchPlaceholder:string;

  popularSearches:string[];

  imageOne:string;

  imageTwo:string;

  studentCount:string;

  studentCountText:string;

  isActive:boolean;

}





interface DepartmentSectionRowProps{

  section:DepartmentSectionData;

  onDelete:(id:string)=>void;

}









// =====================================================
// COMPONENT
// =====================================================


export default function DepartmentSectionRow({

  section,

  onDelete,

}:DepartmentSectionRowProps){



const router = useRouter();







// =====================================================
// DELETE
// =====================================================


const handleDelete = async()=>{


const confirmed =
window.confirm(
"Are you sure you want to delete this section?"
);



if(!confirmed){

return;

}




try{


const response =
await fetch(

`/api/department-section/${section._id}`,

{

method:"DELETE"

}

);





const data =
await response.json();






if(
!response.ok ||
!data.success
){


throw new Error(

data.message ||

"Delete failed."

);


}





toast.success(
"Department section deleted successfully."
);



onDelete(section._id);



}

catch(error){


console.error(
"DELETE SECTION ERROR:",
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
p-5

transition

hover:bg-[#0d162f]

sm:p-6

"


>



<div


className="
grid
gap-6

xl:grid-cols-[260px_minmax(250px,1fr)_180px_140px_170px]

xl:items-center

"


>






{/* =====================================
    IMAGES
===================================== */}



<div


className="
flex
gap-3

"

>



<div


className="
relative
h-24
w-32
overflow-hidden
rounded-2xl
border
border-slate-700
bg-slate-800
"


>


{

section.imageOne

?

<Image

src={section.imageOne}

alt="Department"

fill

sizes="128px"

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








<div


className="
relative
h-24
w-32
overflow-hidden
rounded-2xl
border
border-slate-700
bg-slate-800
"


>


{

section.imageTwo

?

<Image

src={section.imageTwo}

alt="Department"

fill

sizes="128px"

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





</div>









{/* =====================================
    INFORMATION
===================================== */}



<div>



<h2


className="
text-lg
font-bold
text-white
"


>


{
section.title ||

"Department Section"

}


</h2>





<p


className="
mt-2
line-clamp-3
text-sm
leading-6
text-slate-400
"


>


{
section.description ||

"No description available."

}


</p>





</div>









{/* =====================================
    SEARCH
===================================== */}



<div>


<p


className="
text-xs
font-semibold
uppercase
tracking-wide
text-slate-500
"


>


Search Placeholder


</p>




<p


className="
mt-2
text-sm
font-semibold
text-emerald-400
"


>


{
section.searchPlaceholder ||

"--"

}


</p>



</div>









{/* =====================================
    STATUS
===================================== */}



<div>



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

section.isActive

?

"border-emerald-400/30 bg-emerald-400/10 text-emerald-400"

:

"border-slate-700 bg-slate-800 text-slate-400"

}

`}


>


{

section.isActive

?

"Published"

:

"Draft"

}



</span>


</div>









{/* =====================================
    ACTIONS
===================================== */}



<div


className="
flex
gap-2

xl:justify-end

"


>


<button


type="button"


onClick={()=>


router.push(

`/dashboard/home/departments/section/edit/${section._id}`

)


}


className="
flex
h-10
items-center
justify-center
gap-2
rounded-xl
border
border-cyan-400/20
bg-cyan-400/10
px-3
text-cyan-400
transition
hover:bg-cyan-400/20
"


>


<Edit3 size={16}/>

<span className="hidden sm:inline">

Edit

</span>


</button>







<button


type="button"


onClick={()=>


router.push(

`/dashboard/home/departments/section/${section._id}`

)


}


className="
flex
h-10
items-center
justify-center
gap-2
rounded-xl
border
border-slate-700
bg-slate-800
px-3
text-slate-300
transition
hover:text-white
"


>


<Eye size={16}/>

<span className="hidden sm:inline">

View

</span>


</button>







<button


type="button"


onClick={handleDelete}


className="
flex
h-10
items-center
justify-center
gap-2
rounded-xl
border
border-red-400/20
bg-red-400/10
px-3
text-red-400
transition
hover:bg-red-400/20
"


>


<Trash2 size={16}/>

<span className="hidden sm:inline">

Delete

</span>


</button>






</div>






</div>



</div>



);



}