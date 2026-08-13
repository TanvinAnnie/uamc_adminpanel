"use client";


import {
  ArrowRight,
} from "lucide-react";



import type {
  CampusLifeFormData,
} from "./CampusLifeForm";



// =========================================================
// PROPS
// =========================================================


interface CampusLifePreviewProps {

  data: CampusLifeFormData;

}






// =========================================================
// COMPONENT
// =========================================================


export default function CampusLifePreview({

  data,

}:CampusLifePreviewProps){



return (

<section

className="
overflow-hidden
rounded-3xl
bg-[#008B45]
px-5
py-10
sm:px-8
sm:py-14
"

>


{/* =====================================================
    HEADER
===================================================== */}


<div

className="
mx-auto
max-w-3xl
text-center
"

>


<h2

className="
text-3xl
font-bold
text-white
sm:text-4xl
"

>

Campus Life

</h2>



<p

className="
mt-4
text-sm
leading-7
text-emerald-50
sm:text-base
"

>

Explore the vibrant campus experience,
student activities and unforgettable
moments.

</p>



</div>






{/* =====================================================
    CARDS
===================================================== */}


<div

className="
mt-10
grid
grid-cols-1
gap-6
md:grid-cols-2
xl:grid-cols-3
"

></div>
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



</section>


);


}