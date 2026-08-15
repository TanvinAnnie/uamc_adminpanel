"use client";


import {
  ArrowRight,
} from "lucide-react";


import type {
  CampusLifeFormData,
} from "./CampusLifeForm";



interface Props {

data:CampusLifeFormData;

}



export default function CampusLifePreview({
data
}:Props){



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


{/* HEADER */}

<div

className="
border-b
border-slate-200
px-6
py-5
"

>


<div

className="
flex
items-center
gap-2
"

>

<span

className="
h-2
w-2
rounded-full
bg-emerald-500
"

/>


<h2

className="
text-lg
font-semibold
text-slate-800
"

>

Live Preview

</h2>


</div>


<p

className="
mt-1
text-sm
text-slate-500
"

>

Changes appear instantly while editing.

</p>


</div>






{/* PREVIEW CARD */}


<div

className="
m-5
overflow-hidden
rounded-3xl
bg-[#008B45]
"

>


<div

className="
px-6
py-10
text-center
"

>


<h2

className="
text-3xl
font-bold
text-white
"

>

{

data.title ||

"Campus Life"

}

</h2>



</div>






{/* IMAGE */}


<div

className="
mx-6
h-64
overflow-hidden
rounded-2xl
bg-slate-100
"

>


{

data.image

?

<img

src={data.image}

alt={data.title}

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
items-center
justify-center
text-sm
text-slate-400
"

>

No Image

</div>

}



</div>






{/* CONTENT */}

<div

className="
bg-white
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





<button

type="button"

className="
mt-5
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
"

>


{

data.buttonText ||

"Learn More"

}


<ArrowRight size={16}/>


</button>


</div>





</div>






</div>



);


}