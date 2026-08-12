"use client";

import {
  ChangeEvent,
} from "react";

import {
  ImagePlus,
  Loader2,
  X,
} from "lucide-react";


// =========================================================
// PROPS
// =========================================================


interface PrincipalMessageImageUploadProps {

  label:string;

  value:string;

  onChange:
    (url:string)=>void;

  onUpload:
    (file:File)=>Promise<void>;

  uploading?:boolean;

  required?:boolean;

}







// =========================================================
// COMPONENT
// =========================================================


export default function PrincipalMessageImageUpload({

  label,

  value,

  onChange,

  onUpload,

  uploading=false,

  required=false,


}:PrincipalMessageImageUploadProps){







// =======================================================
// FILE CHANGE
// =======================================================


const handleFileChange = async (

event:
ChangeEvent<HTMLInputElement>

)=>{


const file =
event.target.files?.[0];



if(!file){

return;

}







await onUpload(
file
);






// allow same file selection again


event.target.value="";



};









// =======================================================
// REMOVE IMAGE
// =======================================================


const handleRemove = ()=>{


onChange("");



};









// =======================================================
// RENDER
// =======================================================


return (

<div

className="
w-full
"

>



{/* =====================================================
    LABEL
===================================================== */}


<label

className="
mb-2
block
text-sm
font-semibold
text-slate-700
"

>

{label}


{required && (

<span

className="
ml-1
text-red-500
"

>

*

</span>

)}


</label>









{/* =====================================================
    IMAGE EXISTS
===================================================== */}



{
value ? (


<div

className="
relative
overflow-hidden
rounded-2xl
border
border-slate-200
bg-slate-50
"

>



<div

className="
flex
min-h-[220px]
items-center
justify-center
p-4
sm:min-h-[260px]
"

>


<img

src={value}

alt={label}

className="
max-h-[260px]
w-full
rounded-xl
object-contain
"

 />


</div>









{/* REMOVE */}


<button


type="button"


onClick={handleRemove}


disabled={uploading}


className="
absolute
right-3
top-3
flex
h-9
w-9
items-center
justify-center
rounded-full
bg-white
text-red-500
shadow-md
transition
hover:bg-red-50
disabled:cursor-not-allowed
disabled:opacity-50
"

aria-label={`Remove ${label}`}

>

<X size={18}/>

</button>









{/* REPLACE */}


<label

className="
absolute
bottom-3
right-3
cursor-pointer
rounded-xl
bg-[#008B45]
px-4
py-2.5
text-xs
font-semibold
text-white
shadow-md
transition
hover:bg-[#00763B]
"

>


{
uploading

?

"Uploading..."

:

"Replace Image"

}





<input

type="file"

accept="
image/png,
image/jpeg,
image/jpg,
image/webp
"

className="hidden"

disabled={uploading}

onChange={
handleFileChange
}

/>



</label>




</div>



)

:

(






/* =====================================================
   EMPTY UPLOAD
===================================================== */


<label

className={`
flex
min-h-[220px]
w-full
cursor-pointer
flex-col
items-center
justify-center
rounded-2xl
border-2
border-dashed
border-slate-300
bg-slate-50
px-5
py-8
text-center
transition

hover:border-[#008B45]

hover:bg-emerald-50/40


${
uploading

?

"cursor-not-allowed opacity-60"

:

""

}

`}

>





{

uploading ? (



<>


<div

className="
flex
h-14
w-14
items-center
justify-center
rounded-full
bg-emerald-50
"

>


<Loader2

size={28}

className="
animate-spin
text-[#008B45]
"

/>


</div>




<p

className="
mt-4
text-sm
font-semibold
text-slate-700
"

>

Uploading image...

</p>





<p

className="
mt-1
text-xs
text-slate-500
"

>

Please wait

</p>


</>



)

:

(



<>


<div

className="
flex
h-14
w-14
items-center
justify-center
rounded-full
bg-emerald-50
"

>


<ImagePlus

size={28}

strokeWidth={1.8}

className="
text-[#008B45]
"

/>


</div>





<p

className="
mt-4
text-sm
font-semibold
text-slate-700
"

>

Click to upload image

</p>





<p

className="
mt-1
text-xs
text-slate-500
"

>

PNG, JPG, JPEG or WEBP • Max 5MB

</p>


</>



)



}






<input

type="file"

accept="
image/png,
image/jpeg,
image/jpg,
image/webp
"

className="hidden"

disabled={uploading}

onChange={
handleFileChange
}

/>



</label>


)



}



</div>

);

}