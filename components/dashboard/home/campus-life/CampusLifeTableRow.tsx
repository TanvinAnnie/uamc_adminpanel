"use client";


import {

  Edit3,

  Eye,

  EyeOff,

  Trash2,

  Image as ImageIcon,
  ArrowRight,

} from "lucide-react";



import type {

  CampusLifeTableData,

} from "./CampusLifeTable";




// =========================================================
// PROPS
// =========================================================


interface CampusLifeTableRowProps {


  data:CampusLifeTableData;


  onEdit:(

    id:string

  )=>void;



  onDelete:(

    id:string

  )=>void;



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


export default function CampusLifeTableRow({


  data,


  onEdit,


  onDelete,


  onToggleStatus,


  deleting=false,


  updatingStatus=false,



}:CampusLifeTableRowProps){



const description =

data.shortDescription.length > 90

?

`${data.shortDescription.slice(0,90)}...`

:

data.shortDescription;





const formattedDate =

data.createdAt

?

new Date(
data.createdAt
).toLocaleDateString(
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
border-slate-100
transition
hover:bg-slate-50
"

>
    {/* =====================================================
    CARD LIST
===================================================== */}


<div

className="
rounded-3xl
"

>



{/* CARD */}


<div

className="
group
overflow-hidden
rounded-3xl
bg-white
shadow-xl
transition
hover:-translate-y-1
"

>



{/* IMAGE */}


<div

className="
h-56
overflow-hidden
bg-slate-100
"

>


{
data.image ? (

<img

src={
data.image
}

alt={
data.title ||
"Campus Life"
}

className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-105
"

/>

)

:

(

<div

className="
flex
h-full
items-center
justify-center
text-sm
text-slate-400
"

>

No Image

</div>

)

}



</div>








{/* CONTENT */}


<div

className="
p-6
"

>


<h3

className="
text-xl
font-bold
text-slate-800
"

>


{
data.title ||
"Campus Life Title"
}


</h3>






<p

className="
mt-3
line-clamp-3
text-sm
leading-6
text-slate-500
"

>


{
data.shortDescription ||
"Campus Life description will appear here."
}


</p>







{/* BUTTON */}


<button

type="button"

className="
mt-6
inline-flex
items-center
gap-2
rounded-xl
bg-[#008B45]
px-5
py-3
text-sm
font-semibold
text-white
transition
hover:bg-[#00763B]
"

>


{
data.buttonText ||
"Learn More"
}



<ArrowRight

size={17}

/>



</button>



</div>




</div>




</div>
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



<div

className="
flex
h-12
w-12
shrink-0
items-center
justify-center
overflow-hidden
rounded-xl
bg-emerald-50
"

>


{
data.image ? (

<img

src={
data.image
}

alt={
data.title
}

className="
h-full
w-full
object-cover
"

/>


)

:

(


<ImageIcon

size={20}

className="
text-[#008B45]
"

/>


)

}



</div>







<div>


<p

className="
font-semibold
text-slate-800
"

>

Campus Life

</p>



<p

className="
mt-1
text-xs
text-slate-500
"

>

{data.title}

</p>



</div>



</div>



</td>









{/* =====================================================
    CARD LIST
===================================================== */}


<div

className="
rounded-3xl
"

>



{/* CARD */}


<div

className="
group
overflow-hidden
rounded-3xl
bg-white
shadow-xl
transition
hover:-translate-y-1
"

>



{/* IMAGE */}


<div

className="
h-56
overflow-hidden
bg-slate-100
"

>


{
data.image ? (

<img

src={
data.image
}

alt={
data.title ||
"Campus Life"
}

className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-105
"

/>

)

:

(

<div

className="
flex
h-full
items-center
justify-center
text-sm
text-slate-400
"

>

No Image

</div>

)

}



</div>








{/* CONTENT */}


<div

className="
p-6
"

>


<h3

className="
text-xl
font-bold
text-slate-800
"

>


{
data.title ||
"Campus Life Title"
}


</h3>






<p

className="
mt-3
line-clamp-3
text-sm
leading-6
text-slate-500
"

>


{
data.shortDescription ||
"Campus Life description will appear here."
}


</p>







{/* BUTTON */}


<button

type="button"

className="
mt-6
inline-flex
items-center
gap-2
rounded-xl
bg-[#008B45]
px-5
py-3
text-sm
font-semibold
text-white
transition
hover:bg-[#00763B]
"

>


{
data.buttonText ||
"Learn More"
}



<ArrowRight

size={17}

/>



</button>



</div>




</div>




</div>


<td

className="
px-6
py-5
"

>



<p

className="
font-semibold
text-slate-800
"

>

{data.title}

</p>



<p

className="
mt-1
text-xs
text-slate-500
"

>

{data.buttonText}

</p>



</td>









{/* =====================================================
    CARD LIST
===================================================== */}


<div

className="
rounded-3xl
"

>



{/* CARD */}


<div

className="
group
overflow-hidden
rounded-3xl
bg-white
shadow-xl
transition
hover:-translate-y-1
"

>



{/* IMAGE */}


<div

className="
h-56
overflow-hidden
bg-slate-100
"

>


{
data.image ? (

<img

src={
data.image
}

alt={
data.title ||
"Campus Life"
}

className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-105
"

/>

)

:

(

<div

className="
flex
h-full
items-center
justify-center
text-sm
text-slate-400
"

>

No Image

</div>

)

}



</div>








{/* CONTENT */}


<div

className="
p-6
"

>


<h3

className="
text-xl
font-bold
text-slate-800
"

>


{
data.title ||
"Campus Life Title"
}


</h3>






<p

className="
mt-3
line-clamp-3
text-sm
leading-6
text-slate-500
"

>


{
data.shortDescription ||
"Campus Life description will appear here."
}


</p>







{/* BUTTON */}


<button

type="button"

className="
mt-6
inline-flex
items-center
gap-2
rounded-xl
bg-[#008B45]
px-5
py-3
text-sm
font-semibold
text-white
transition
hover:bg-[#00763B]
"

>


{
data.buttonText ||
"Learn More"
}



<ArrowRight

size={17}

/>



</button>



</div>




</div>




</div>


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
leading-5
text-slate-600
"

>

{description}

</p>



</td>









{/* =====================================================
    CARD LIST
===================================================== */}


<div

className="
rounded-3xl
"

>



{/* CARD */}


<div

className="
group
overflow-hidden
rounded-3xl
bg-white
shadow-xl
transition
hover:-translate-y-1
"

>



{/* IMAGE */}


<div

className="
h-56
overflow-hidden
bg-slate-100
"

>


{
data.image ? (

<img

src={
data.image
}

alt={
data.title ||
"Campus Life"
}

className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-105
"

/>

)

:

(

<div

className="
flex
h-full
items-center
justify-center
text-sm
text-slate-400
"

>

No Image

</div>

)

}



</div>








{/* CONTENT */}


<div

className="
p-6
"

>


<h3

className="
text-xl
font-bold
text-slate-800
"

>


{
data.title ||
"Campus Life Title"
}


</h3>






<p

className="
mt-3
line-clamp-3
text-sm
leading-6
text-slate-500
"

>


{
data.shortDescription ||
"Campus Life description will appear here."
}


</p>







{/* BUTTON */}


<button

type="button"

className="
mt-6
inline-flex
items-center
gap-2
rounded-xl
bg-[#008B45]
px-5
py-3
text-sm
font-semibold
text-white
transition
hover:bg-[#00763B]
"

>


{
data.buttonText ||
"Learn More"
}



<ArrowRight

size={17}

/>



</button>



</div>




</div>




</div>

<td

className="
px-6
py-5
"

>



<button

type="button"

disabled={
updatingStatus
}

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
disabled:opacity-50
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
"text-emerald-600"
:
"text-slate-500"
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
{/* =====================================================
    CARD LIST
===================================================== */}


<div

className="
rounded-3xl
"

>



{/* CARD */}


<div

className="
group
overflow-hidden
rounded-3xl
bg-white
shadow-xl
transition
hover:-translate-y-1
"

>



{/* IMAGE */}


<div

className="
h-56
overflow-hidden
bg-slate-100
"

>


{
data.image ? (

<img

src={
data.image
}

alt={
data.title ||
"Campus Life"
}

className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-105
"

/>

)

:

(

<div

className="
flex
h-full
items-center
justify-center
text-sm
text-slate-400
"

>

No Image

</div>

)

}



</div>








{/* CONTENT */}


<div

className="
p-6
"

>


<h3

className="
text-xl
font-bold
text-slate-800
"

>


{
data.title ||
"Campus Life Title"
}


</h3>






<p

className="
mt-3
line-clamp-3
text-sm
leading-6
text-slate-500
"

>


{
data.shortDescription ||
"Campus Life description will appear here."
}


</p>







{/* BUTTON */}


<button

type="button"

className="
mt-6
inline-flex
items-center
gap-2
rounded-xl
bg-[#008B45]
px-5
py-3
text-sm
font-semibold
text-white
transition
hover:bg-[#00763B]
"

>


{
data.buttonText ||
"Learn More"
}



<ArrowRight

size={17}

/>



</button>



</div>




</div>




</div>


<td

className="
px-6
py-5
"

>


<span

className="
whitespace-nowrap
text-sm
text-slate-500
"

>

{formattedDate}

</span>



</td>









{/* =====================================================
    CARD LIST
===================================================== */}


<div

className="
rounded-3xl
"

>



{/* CARD */}


<div

className="
group
overflow-hidden
rounded-3xl
bg-white
shadow-xl
transition
hover:-translate-y-1
"

>



{/* IMAGE */}


<div

className="
h-56
overflow-hidden
bg-slate-100
"

>


{
data.image ? (

<img

src={
data.image
}

alt={
data.title ||
"Campus Life"
}

className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-105
"

/>

)

:

(

<div

className="
flex
h-full
items-center
justify-center
text-sm
text-slate-400
"

>

No Image

</div>

)

}



</div>








{/* CONTENT */}


<div

className="
p-6
"

>


<h3

className="
text-xl
font-bold
text-slate-800
"

>


{
data.title ||
"Campus Life Title"
}


</h3>






<p

className="
mt-3
line-clamp-3
text-sm
leading-6
text-slate-500
"

>


{
data.shortDescription ||
"Campus Life description will appear here."
}


</p>







{/* BUTTON */}


<button

type="button"

className="
mt-6
inline-flex
items-center
gap-2
rounded-xl
bg-[#008B45]
px-5
py-3
text-sm
font-semibold
text-white
transition
hover:bg-[#00763B]
"

>


{
data.buttonText ||
"Learn More"
}



<ArrowRight

size={17}

/>



</button>



</div>




</div>




</div>
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





{/* EDIT */}



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
border-slate-200
bg-white
text-slate-600
transition
hover:border-[#008B45]
hover:bg-emerald-50
hover:text-[#008B45]
"

>


<Edit3

size={16}

/>


</button>









{/* STATUS */}



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
border-slate-200
bg-white
text-slate-600
transition
hover:bg-blue-50
hover:text-blue-600
disabled:opacity-50
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









{/* DELETE */}



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
border-red-100
bg-white
text-red-500
transition
hover:bg-red-50
disabled:opacity-50
"

>


<Trash2

size={16}

/>


</button>







</div>




</td>







</tr>


);


}

