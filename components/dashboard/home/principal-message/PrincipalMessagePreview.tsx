"use client";

import {
  ArrowRight,
} from "lucide-react";


import type {
  PrincipalMessageFormData,
} from "./PrincipalMessageForm";



// =========================================================
// PROPS
// =========================================================


interface PrincipalMessagePreviewProps {

  data: PrincipalMessageFormData;

}








// =========================================================
// COMPONENT
// =========================================================


export default function PrincipalMessagePreview({

  data,

}:PrincipalMessagePreviewProps){



return (

<div

className="
w-full
overflow-hidden
rounded-3xl
border
border-slate-200
bg-[#E9F5EE]
shadow-sm
"

>






{/* =====================================================
    PREVIEW HEADER
===================================================== */}



<div

className="
flex
flex-col
gap-3
border-b
border-slate-200
bg-white
px-5
py-4
sm:flex-row
sm:items-center
sm:justify-between
"

>


<div>


<p

className="
text-xs
font-bold
uppercase
tracking-wider
text-slate-500
"

>

Live Preview

</p>



<p

className="
mt-1
text-xs
text-slate-400
"

>

Principal Message Section

</p>



</div>







<span

className="
w-fit
rounded-full
bg-emerald-50
px-3
py-1.5
text-xs
font-semibold
text-[#008B45]
"

>

Website Preview

</span>



</div>








{/* =====================================================
    WEBSITE PREVIEW
===================================================== */}



<div

className="
overflow-hidden
"

>







{/* =====================================================
    TITLE
===================================================== */}



<div

className="
px-5
pt-8
sm:px-8
sm:pt-10
"

>





<div

className="
flex
items-center
justify-center
gap-2
"

>


<span

className="
text-sm
text-[#008B45]
"

>

🎓

</span>




<p

className="
text-xs
font-semibold
text-[#008B45]
sm:text-sm
"

>

{

data.tagline ||

"knowledge meets innovation"

}

</p>



</div>







<h2

className="
mt-3
text-center
font-serif
text-3xl
font-bold
leading-tight
text-black
sm:text-4xl
lg:text-5xl
"

>

{

data.titlePrefix ||

"Message from the"

}

{" "}


<span

className="
text-[#FFC62A]
"

>

{

data.titleHighlight ||

"Principal"

}

</span>



</h2>




</div>









{/* =====================================================
    CONTENT GRID
===================================================== */}



<div

className="
mt-8
grid
grid-cols-1
lg:grid-cols-2
"

>






{/* =====================================================
    LEFT CONTENT
===================================================== */}



<div

className="
flex
flex-col
justify-center
px-5
py-8
sm:px-8
sm:py-10
"

>





{/* SIGNATURE */}



<div

className="
mb-5
h-[70px]
w-[170px]
sm:h-[85px]
sm:w-[220px]
"

>


{

data.signatureImage ? (


<img

src={
data.signatureImage
}

alt="
Principal Signature
"

className="
h-full
w-full
object-contain
object-left
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
text-xs
italic
text-slate-400
"

>

Signature preview

</div>



)


}



</div>






{/* HONORABLE */}



<p

className="
font-serif
text-xl
font-bold
text-black
sm:text-2xl
"

>

Honorable

</p>






{/* NAME */}



<h3

className="
mt-1
font-serif
text-xl
font-bold
leading-tight
text-[#008B45]
sm:text-2xl
"

>

{

data.principalName ||

"Principal Name"

}

</h3>





{/* DESIGNATION */}



<div

className="
mt-4
flex
flex-wrap
items-baseline
gap-2
"

>


<span

className="
font-serif
text-4xl
font-bold
leading-none
text-[#444444]
sm:text-5xl
"

>


{

data.designation

?

data.designation.split(" ")[0]

:

"Principal"

}


</span>



{
data.designation?.split(" ").slice(1).join(" ") &&

(

<span

className="
font-serif
text-sm
text-[#444444]
sm:text-base
"

>

(

{

data.designation
.split(" ")
.slice(1)
.join(" ")

}

)

</span>


)

}



</div>
{/* =====================================================
// BUTTON
// =====================================================*/}


<h4

className="
mt-4
text-sm
font-bold
leading-6
text-[#444444]
sm:text-base
"

>

{

data.heading ||

"Ensuring Quality Healthcare & Medical Education"

}

</h4>







{/* =====================================================
// BUTTON
// =====================================================*/}



<p

className="
mt-4
text-sm
leading-6
text-[#4F4F4F]
sm:text-base
sm:leading-7
"

>

{

data.description ||

"Principal message description will appear here."

}

</p>









{/* =====================================================
// BUTTON
// =====================================================*/}



{

data.buttonText && (

<button

type="button"

className="
group
mt-6
inline-flex
min-h-11
w-fit
items-center
justify-center
gap-3
rounded-xl
bg-[#009447]
px-5
py-3
text-sm
font-semibold
text-white
transition
hover:bg-[#00763B]
"

>


<span>

{

data.buttonText

}

</span>




<ArrowRight

size={18}

className="
transition-transform
duration-300
group-hover:translate-x-1
"

/>



</button>

)

}




</div>









{/* =====================================================
    RIGHT IMAGE
===================================================== */}



<div

className="
min-h-[360px]
w-full
overflow-hidden
bg-slate-100
sm:min-h-[450px]
"

>


{

data.principalImage ? (



<img


src={

data.principalImage

}



alt={

data.principalName ||

"Principal"

}



className="
h-full
min-h-[360px]
w-full
object-cover
object-center
sm:min-h-[450px]
"



/>



)

:

(


<div

className="
flex
min-h-[360px]
items-center
justify-center
text-sm
text-slate-400
sm:min-h-[450px]
"

>


Principal image preview


</div>


)



}



</div>








</div>







</div>








</div>



);

}