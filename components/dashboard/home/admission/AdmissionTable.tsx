"use client";


import {
  Edit3,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";





// =========================================================
// TYPE
// =========================================================


export interface AdmissionData {

  _id:string;

  backgroundImage:string;

  titlePrefix:string;

  title:string;

  description:string;

  buttonText:string;

  buttonLink:string;

  isActive:boolean;

  createdAt:string;

  updatedAt:string;

}








// =========================================================
// PROPS
// =========================================================


interface AdmissionTableProps {

  admission:AdmissionData;

  onDelete:()=>void;

}









// =========================================================
// COMPONENT
// =========================================================


export default function AdmissionTable({

  admission,

  onDelete,

}:AdmissionTableProps){



const router = useRouter();








// =====================================================
// EDIT
// =====================================================


const handleEdit = ()=>{


router.push(

`/dashboard/home/admission/edit/${admission._id}`

);


};









// =====================================================
// DELETE
// =====================================================


const handleDelete = async ()=>{


const confirmed = window.confirm(

"Are you sure you want to delete this Admission section?"

);



if(!confirmed){

return;

}




try{


const response = await fetch(

"/api/admission",

{

method:"DELETE",

headers:{

"Content-Type":"application/json",

},

body:JSON.stringify({

id:admission._id,

}),

}

);






const data = await response.json();







if(

!response.ok ||

!data.success

){


throw new Error(

data.message ||

"Failed to delete admission section."

);


}






toast.success(

"Admission section deleted."

);




onDelete();





}

catch(error){



console.error(

"DELETE ADMISSION ERROR:",

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









// =====================================================
// DATE
// =====================================================


const formattedDate = admission.createdAt

?

new Date(

admission.createdAt

).toLocaleDateString(

"en-GB",

{

day:"2-digit",

month:"short",

year:"numeric",

}

)

:

"—";









// =====================================================
// RETURN
// =====================================================


return(


<div


className="

mt-8

w-full

overflow-hidden

rounded-3xl

border

border-slate-800

bg-[#080d20]

shadow-xl

"

>





{/* =====================================================
    HEADER
===================================================== */}



<div


className="

flex

flex-col

gap-4

border-b

border-slate-800

px-5

py-5


sm:flex-row

sm:items-center

sm:justify-between


sm:px-6

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

Admission Section

</h2>





<p

className="

mt-1

text-xs

text-slate-400

"

>

Manage your Admission section content.

</p>



</div>








<span


className={`

inline-flex

items-center

gap-2

rounded-full

border

px-3

py-1.5

text-xs

font-semibold


${
admission.isActive

?

"border-emerald-400/20 bg-emerald-400/10 text-emerald-400"

:

"border-slate-700 bg-slate-800 text-slate-400"

}

`}

>




<span

className={`

h-1.5

w-1.5

rounded-full


${
admission.isActive

?

"bg-emerald-400"

:

"bg-slate-500"

}

`}

/>





{

admission.isActive

?

"Active"

:

"Inactive"

}



</span>




</div>

{/* =====================================================
    TABLE BODY
===================================================== */}


<tbody>



<tr

className="
border-b

border-slate-800

transition

hover:bg-white/5

"

>








{/* =====================================
    IMAGE
===================================== */}



<td

className="
px-6

py-5

"

>



<div

className="
h-[76px]

w-[125px]

overflow-hidden

rounded-xl

border

border-slate-700

bg-[#0d162f]

"

>




{

admission.backgroundImage

?


<img


src={admission.backgroundImage}


alt="Admission"


className="
h-full

w-full

object-cover

"


/>



:


<div

className="
flex

h-full

w-full

items-center

justify-center

text-slate-500

"

>


<ImageIcon size={24}/>


</div>



}





</div>




</td>









{/* =====================================
    TITLE
===================================== */}



<td

className="
px-6

py-5

"

>



<div

className="
min-w-[180px]

"

>



<p

className="
text-sm

font-semibold

text-emerald-400

"

>



{admission.titlePrefix}

{" "}

{admission.title}



</p>






<p

className="
mt-1

text-xs

text-slate-500

"

>

Admission Section


</p>




</div>



</td>









{/* =====================================
    DESCRIPTION
===================================== */}



<td

className="
max-w-[420px]

px-6

py-5

"

>



<p

className="
line-clamp-2

text-sm

leading-6

text-slate-300

"

>



{admission.description}



</p>



</td>









{/* =====================================
    DATE
===================================== */}



<td

className="
whitespace-nowrap

px-6

py-5

text-sm

text-slate-400

"

>



{formattedDate}



</td>









{/* =====================================
    ACTIONS
===================================== */}



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

justify-end

gap-2

"

>









{/* EDIT */}



<button


type="button"



onClick={handleEdit}



className="
inline-flex

h-10

items-center

gap-2

rounded-xl

border

border-emerald-400/20

bg-emerald-400/10

px-3

text-sm

font-semibold

text-emerald-400

transition

hover:bg-emerald-400/20

"

>


<Edit3

size={16}

/>


Edit



</button>









{/* DELETE */}



<button


type="button"



onClick={handleDelete}



className="
inline-flex

h-10

items-center

gap-2

rounded-xl

border

border-red-400/20

bg-red-400/10

px-3

text-sm

font-semibold

text-red-400

transition

hover:bg-red-400/20

"

>


<Trash2

size={16}

/>


Delete



</button>









</div>



</td>







</tr>




</tbody>


<div

className="
overflow-x-auto

"

>




<table

className="
w-full

min-w-[900px]

border-collapse

"

>







{/* =====================================================
    TABLE HEAD
===================================================== */}



<thead>


<tr

className="
border-b

border-slate-800

bg-[#0d162f]

"

>






<th

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

Preview

</th>







<th

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

Title

</th>








<th

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

Description

</th>








<th

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

Created

</th>








<th

className="
px-6

py-4

text-right

text-xs

font-semibold

uppercase

tracking-wide

text-slate-400

"

>

Actions

</th>






</tr>


</thead>










{/* =====================================================
    TABLE BODY
===================================================== */}



<tbody>



<tr


className="
border-b

border-slate-800

transition

hover:bg-white/5

"

>








{/* =====================================
    IMAGE
===================================== */}



<td

className="
px-6

py-5

"

>



<div


className="
h-[76px]

w-[125px]

overflow-hidden

rounded-xl

border

border-slate-700

bg-[#0d162f]

"

>



{

admission.backgroundImage

?

<img


src={
admission.backgroundImage
}


alt="Admission"


className="
h-full

w-full

object-cover

"

/>



:


<div

className="
flex

h-full

w-full

items-center

justify-center

text-slate-500

"

>


<ImageIcon size={24}/>


</div>



}



</div>



</td>









{/* =====================================
    TITLE
===================================== */}



<td

className="
px-6

py-5

"

>



<div

className="
min-w-[180px]

"

>


<p

className="
text-sm

font-semibold

text-emerald-400

"

>


{

admission.titlePrefix

}

{" "}

{

admission.title

}



</p>







<p

className="
mt-1

text-xs

text-slate-500

"

>

Admission Section

</p>




</div>



</td>









{/* =====================================
    DESCRIPTION
===================================== */}



<td

className="
max-w-[420px]

px-6

py-5

"

>



<p

className="
line-clamp-2

text-sm

leading-6

text-slate-300

"

>


{

admission.description

}


</p>



</td>









{/* =====================================
    CREATED DATE
===================================== */}



<td

className="
whitespace-nowrap

px-6

py-5

text-sm

text-slate-400

"

>


{

formattedDate

}


</td>

{/* =====================================
    ACTIONS
===================================== */}



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

justify-end

gap-2

"

>







{/* EDIT BUTTON */}



<button


type="button"



onClick={handleEdit}



className="
inline-flex

h-10

items-center

gap-2

rounded-xl

border

border-cyan-400/20

bg-cyan-400/10

px-3

text-sm

font-semibold

text-cyan-400

transition

hover:bg-cyan-400/20

"

>



<Edit3 size={16}/>



Edit



</button>








{/* DELETE BUTTON */}



<button


type="button"



onClick={handleDelete}



className="
inline-flex

h-10

items-center

gap-2

rounded-xl

border

border-red-400/20

bg-red-400/10

px-3

text-sm

font-semibold

text-red-400

transition

hover:bg-red-400/20

"

>



<Trash2 size={16}/>



Delete



</button>






</div>



</td>







</tr>




</tbody>







</table>






</div>










{/* =====================================================
    FOOTER
===================================================== */}



<div

className="
flex

flex-col

gap-2

border-t

border-slate-800

bg-[#0d162f]

px-6

py-4


sm:flex-row

sm:items-center

sm:justify-between

"

>




<p

className="
text-xs

text-slate-500

"

>

1 Admission section

</p>






<p

className="
text-xs

text-slate-500

"

>

Last updated{" "}



{

admission.updatedAt

?

new Date(

admission.updatedAt

).toLocaleDateString(

"en-GB",

{

day:"2-digit",

month:"short",

year:"numeric",

}

)

:

"—"

}



</p>






</div>






</div>


);


}