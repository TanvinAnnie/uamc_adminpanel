"use client";


import {
  Building2,
  Plus,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";





export default function DepartmentSectionEmpty(){


const router = useRouter();




return(



<div


className="
flex
min-h-[420px]
w-full
flex-col
items-center
justify-center
rounded-2xl
border
border-slate-800
bg-[#080f24]
px-6
py-12
text-center
shadow-xl
"


>



{/* =====================================
    ICON
===================================== */}



<div


className="
flex
h-16
w-16
items-center
justify-center
rounded-2xl
border
border-emerald-400/20
bg-emerald-400/10
text-emerald-400
"


>


<Building2 size={32}/>


</div>






{/* =====================================
    TITLE
===================================== */}



<h2


className="
mt-6
text-xl
font-bold
text-white

sm:text-2xl
"


>


No Department Section Found


</h2>







{/* =====================================
    DESCRIPTION
===================================== */}



<p


className="
mt-3
max-w-md
text-sm
leading-6
text-slate-400

sm:text-base
"


>


Create your Find Your Department section
to display department information,
images and search details.


</p>









{/* =====================================
    BUTTON
===================================== */}



<button



type="button"



onClick={()=>


router.push(

"/dashboard/home/departments/section/new"

)

}




className="
mt-7
inline-flex
min-h-11
items-center
justify-center
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
hover:shadow-lg

w-full
sm:w-auto
"


>



<Plus size={18}/>


Create Section



</button>







</div>



);



}