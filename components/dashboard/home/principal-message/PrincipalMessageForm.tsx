"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  useRouter,
} from "next/navigation";


import PrincipalMessageImageUpload from "./PrincipalMessageImageUpload";


// =========================================================
// DATA TYPE
// =========================================================


export interface PrincipalMessageFormData {

  tagline:string;

  titlePrefix:string;

  titleHighlight:string;


  signatureImage:string;


  principalName:string;

  designation:string;


  heading:string;

  description:string;


  principalImage:string;


  buttonText:string;

  buttonLink:string;


  isActive:boolean;

}






// =========================================================
// PROPS
// =========================================================


interface PrincipalMessageFormProps {


  initialData?:
    PrincipalMessageFormData;


  onSubmit:
    (
      data:PrincipalMessageFormData
    )=>Promise<void>;


  onChange?:
    (
      data:PrincipalMessageFormData
    )=>void;


  submitLabel?:string;


  loading?:boolean;


  title?:string;


  description?:string;

}







// =========================================================
// DEFAULT DATA
// =========================================================


const defaultFormData:
PrincipalMessageFormData = {


  tagline:
    "knowledge meets innovation",


  titlePrefix:
    "Message from the",


  titleHighlight:
    "Principal",



  signatureImage:"",


  principalName:"",


  designation:
    "Principal (In Charge)",



  heading:"",


  description:"",



  principalImage:"",



  buttonText:
    "Read More",



  buttonLink:
    "#",



  isActive:true,

};








// =========================================================
// COMPONENT
// =========================================================


export default function PrincipalMessageForm({

  initialData,

  onSubmit,

  onChange,

  submitLabel =
    "Create Principal Message",

  loading=false,

  title =
    "Principal Message",

  description =
    "Manage the Principal Message section displayed on the website.",


}:PrincipalMessageFormProps){





const router =
  useRouter();






// =======================================================
// FORM STATE
// =======================================================


const [
  formData,
  setFormData,
]=useState<PrincipalMessageFormData>(

()=>({

  ...defaultFormData,

  ...(initialData || {}),

})

);







// =======================================================
// UPLOAD STATE
// =======================================================


const [
 uploadingSignature,
 setUploadingSignature,
]=useState(false);





const [
 uploadingPrincipal,
 setUploadingPrincipal,
]=useState(false);








// =======================================================
// UPDATE FORM DATA
// =======================================================


const updateFormData = (

 updatedData:
 PrincipalMessageFormData

)=>{


setFormData(
 updatedData
);


onChange?.(
 updatedData
);


};









// =======================================================
// INPUT CHANGE
// =======================================================


const handleInputChange = (

event:
ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement
>

)=>{


const {
 name,
 value,

}=event.target;



const updatedData = {


 ...formData,


 [name]:
 value,

} as PrincipalMessageFormData;



updateFormData(
 updatedData
);


};








// =======================================================
// IMAGE UPLOAD
// =======================================================


const handleImageUpload =
async(

file:File,

type:
"signature" |
"principal"

)=>{


try{


if(type==="signature"){

setUploadingSignature(true);

}
else{

setUploadingPrincipal(true);

}






// FILE TYPE CHECK


if(
 !file.type.startsWith(
  "image/"
 )
){

throw new Error(
 "Please select a valid image file."
);

}





// SIZE CHECK


if(
 file.size >
 5*1024*1024
){

throw new Error(
 "Image size must be less than 5MB."
);

}





// FORM DATA


const uploadData =
new FormData();



uploadData.append(
 "file",
 file
);






const response =
await fetch(

"/api/upload",

{

method:"POST",

body:uploadData,

}

);





const result =
await response.json();





if(
 !response.ok ||
 !result?.success
){

throw new Error(

result?.message ||

"Image upload failed."

);

}





const imageUrl =

result.url ||

result.secure_url ||

result.data?.url ||

"";






if(!imageUrl){

throw new Error(

"Cloudinary URL not found."

);

}







const updatedData = {


...formData,


...(type==="signature"

?

{

signatureImage:
imageUrl,

}

:

{

principalImage:
imageUrl,

}

),


};






updateFormData(
 updatedData
);




toast.success(
 "Image uploaded successfully."
);




}
catch(error){



console.error(

"PRINCIPAL IMAGE UPLOAD ERROR:",

error

);



toast.error(

error instanceof Error

?

error.message

:

"Upload failed."

);


}
finally{


if(type==="signature"){

setUploadingSignature(false);

}
else{

setUploadingPrincipal(false);

}


}


};
// =======================================================
// SUBMIT HANDLER
// =======================================================


const handleSubmit = async (

event:FormEvent<HTMLFormElement>

)=>{


event.preventDefault();





// =====================================================
// VALIDATION
// =====================================================


if(!formData.tagline.trim()){

toast.error(
"Please enter the tagline."
);

return;

}



if(!formData.titlePrefix.trim()){

toast.error(
"Please enter the title prefix."
);

return;

}



if(!formData.titleHighlight.trim()){

toast.error(
"Please enter highlighted title."
);

return;

}



if(!formData.signatureImage){

toast.error(
"Please upload signature image."
);

return;

}



if(!formData.principalName.trim()){

toast.error(
"Please enter principal name."
);

return;

}



if(!formData.designation.trim()){

toast.error(
"Please enter designation."
);

return;

}



if(!formData.heading.trim()){

toast.error(
"Please enter heading."
);

return;

}



if(!formData.description.trim()){

toast.error(
"Please enter description."
);

return;

}



if(!formData.principalImage){

toast.error(
"Please upload principal image."
);

return;

}







// =====================================================
// FINAL DATA
// =====================================================


const finalData:PrincipalMessageFormData={


...formData,


tagline:
formData.tagline.trim(),


titlePrefix:
formData.titlePrefix.trim(),


titleHighlight:
formData.titleHighlight.trim(),



principalName:
formData.principalName.trim(),



designation:
formData.designation.trim(),



heading:
formData.heading.trim(),



description:
formData.description.trim(),



buttonText:
formData.buttonText.trim() ||
"Read More",



buttonLink:
formData.buttonLink.trim() ||
"#",


};






try{


await onSubmit(
 finalData
);


}

catch(error){


console.error(
"PRINCIPAL MESSAGE SUBMIT ERROR:",
error
);


}



};









// =======================================================
// RENDER
// =======================================================


return (

<form

onSubmit={
handleSubmit
}

className="
w-full
space-y-6
"

>






{/* ===================================================
    HEADER
=================================================== */}



<div

className="
flex
flex-col
gap-4
sm:flex-row
sm:items-start
"

>


<button

type="button"

onClick={()=>
router.back()
}

className="
flex
h-10
w-10
shrink-0
items-center
justify-center
rounded-xl
border
border-slate-200
bg-[#111936]
text-slate-600
transition
hover:border-[#008B45]
hover:text-[#008B45]
"

>


<ArrowLeft size={18}/>


</button>





<div>


<h1

className="
text-2xl
font-bold
text-white
sm:text-3xl
"
>

{title}

</h1>




<p

className="
mt-2
max-w-2xl
text-sm
leading-6
text-slate-400
"

>

{description}

</p>



</div>



</div>









{/* ===================================================
    SECTION CONTENT
=================================================== */}




<section

className="
rounded-3xl
border
border-slate-800
bg-[#080D24]
p-6
shadow-xl
sm:p-7
"
>


<div

className="
border-b
border-slate-100
pb-4
"

>


<h2

className="
text-lg
font-semibold
text-slate-900
"

>

Section Content

</h2>



<p

className="
mt-1
text-sm
text-slate-500
"

>

Manage Principal Message content.

</p>



</div>









<div

className="
mt-6
grid
gap-5
md:grid-cols-2
"

>





{/* TAGLINE */}



<div>


<label

className="
mb-2
block
text-sm
font-semibold
text-slate-700
"

>

Tagline

</label>


<input

type="text"

name="tagline"

value={
formData.tagline
}

onChange={
handleInputChange
}

placeholder="knowledge meets innovation"

className="
h-12
w-full
rounded-xl
border
border-slate-700
px-4
text-sm
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-[#008B45]/10
"

/>


</div>








{/* TITLE PREFIX */}



<div>


<label

className="
mb-2
block
text-sm
font-semibold
text-slate-700
"

>

Title Prefix

</label>



<input

type="text"

name="titlePrefix"

value={
formData.titlePrefix
}

onChange={
handleInputChange
}

placeholder="Message from the"

className="
h-12
w-full
rounded-xl
border
border-slate-700
px-4
text-sm
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-[#008B45]/10
"

/>


</div>








{/* TITLE HIGHLIGHT */}



<div>


<label

className="
mb-2
block
text-sm
font-semibold
text-slate-700
"

>

Highlight Title

</label>



<input

type="text"

name="titleHighlight"

value={
formData.titleHighlight
}

onChange={
handleInputChange
}

placeholder="Principal"

className="
h-12
w-full
rounded-xl
border
border-slate-700
px-4
text-sm
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-[#008B45]/10
"

/>


</div>









{/* PRINCIPAL NAME */}



<div>


<label

className="
mb-2
block
text-white
font-semibold
text-slate-700
"

>

Principal Name

</label>



<input

type="text"

name="principalName"

value={
formData.principalName
}

onChange={
handleInputChange
}

placeholder="Principal Name"

className="
h-12
w-full
rounded-xl
border
border-slate-700
px-4
text-white
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-[#008B45]/10
"

/>


</div>









{/* DESIGNATION */}



<div>


<label

className="
mb-2
block
text-white
font-semibold
text-slate-700
"

>

Designation

</label>



<input

type="text"

name="designation"

value={
formData.designation
}

onChange={
handleInputChange
}

placeholder="Principal (In Charge)"

className="
h-12
w-full
rounded-xl
border
border-slate-700
px-4
text-white
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-[#008B45]/10
"

/>


</div>








{/* HEADING */}



<div>


<label

className="
mb-2
block
text-white
font-semibold
text-slate-700
"

>

Heading

</label>



<input

type="text"

name="heading"

value={
formData.heading
}

onChange={
handleInputChange
}

placeholder="Ensuring Quality Healthcare"

className="
h-12
w-full
rounded-xl
border
border-slate-700
px-4
text-white
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-[#008B45]/10
"

/>


</div>





</div>









{/* DESCRIPTION */}



<div

className="
mt-5
"

>


<label

className="
mb-2
block
text-sm
font-semibold
text-slate-700
"

>

Description

</label>



<textarea

name="description"

value={
formData.description
}

onChange={
handleInputChange
}

rows={7}

placeholder="Enter Principal message..."

className="
w-full
resize-none
rounded-xl
border
border-slate-700
px-4
py-3
text-write
leading-6
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-[#008B45]/10
"

/>


</div>






</section>
{/* ===================================================
// IMAGES SECTION
// =================================================== */}


<section

className="
rounded-2xl
border
border-slate-700
bg-[#080D24]
p-5
shadow-sm
sm:p-6
"

>



<div

className="
border-b
border-slate-100
pb-4
"

>


<h2

className="
text-lg
font-semibold
text-slate-900
"

>

Images

</h2>



<p

className="
mt-1
text-sm
text-slate-500
"

>

Upload Principal signature and image.

</p>


</div>







<div

className="
mt-6
grid
gap-6
lg:grid-cols-2
"

>






{/* SIGNATURE IMAGE */}



<PrincipalMessageImageUpload


label="Signature Image"


value={
formData.signatureImage
}


onChange={(url)=>{


updateFormData({

...formData,

signatureImage:url,

});


}}



onUpload={(file)=>


handleImageUpload(

file,

"signature"

)


}



uploading={
uploadingSignature
}



required

/>



{/* PRINCIPAL IMAGE */}



<PrincipalMessageImageUpload


label="Principal Image"


value={
formData.principalImage
}



onChange={(url)=>{


updateFormData({

...formData,

principalImage:url,

});


}}



onUpload={(file)=>


handleImageUpload(

file,

"principal"

)


}



uploading={
uploadingPrincipal
}



required

/>



</div>



</section>









{/* ===================================================
// BUTTON SETTINGS
// ====================================================*/}



<section

className="
rounded-2xl
border
border-slate-800
bg-[#080D24]
p-5
shadow-sm
sm:p-6
"

>



<div

className="
border-b
border-slate-100
pb-4
"

>


<h2

className="
text-lg
font-semibold
text-slate-900
"

>

Button Settings

</h2>



<p

className="
mt-1
text-sm
text-slate-500
"

>

Configure Principal Message button.

</p>



</div>








<div

className="
mt-6
grid
gap-5
md:grid-cols-2
"

>





{/* BUTTON TEXT */}



<div>


<label

className="
mb-2
block
text-sm
font-semibold
text-slate-700
"

>

Button Text

</label>



<input


type="text"


name="buttonText"


value={
formData.buttonText
}


onChange={
handleInputChange
}


placeholder="Read More"


className="
h-12
w-full
rounded-xl
border
border-slate-200
px-4
text-sm
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-[#008B45]/10
"

/>


</div>







{/* BUTTON LINK */}



<div>


<label

className="
mb-2
block
text-sm
font-semibold
text-slate-700
"

>

Button Link

</label>




<input


type="text"


name="buttonLink"


value={
formData.buttonLink
}


onChange={
handleInputChange
}


placeholder="#"


className="
h-12
w-full
rounded-xl
border
border-slate-200
px-4
text-sm
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-[#008B45]/10
"

/>


</div>






</div>



</section>









{/* ===================================================
// PUBLISH SECTION
// ====================================================*/}



<section

className="
flex
items-center
justify-between
gap-5
rounded-2xl
border
border-slate-700
bg-[#0111936]
p-5
shadow-sm
sm:p-6
"

>



<div>


<h2

className="
text-base
font-semibold
text-slate-900
"

>

Publish Principal Message

</h2>



<p

className="
mt-1
text-sm
text-slate-500
"

>

Show this section on website.

</p>


</div>







<button


type="button"


onClick={()=>{


updateFormData({

...formData,

isActive:
!formData.isActive,

});


}}



className={`

relative

h-7

w-12

rounded-full

transition


${
formData.isActive

?

"bg-[#008B45]"

:

"bg-slate-300"

}

`}



>


<span


className={`

absolute

top-1

h-5

w-5

rounded-full

bg-[#111936]

shadow

transition-transform


${
formData.isActive

?

"translate-x-6"

:

"translate-x-1"

}

`}


/>


</button>






</section>
{/* ===================================================
// ACTION BUTTONS
// ===================================================*/}


<div

className="
flex
flex-col
gap-3
border-t
border-slate-200
pt-6
sm:flex-row
sm:justify-end
"

>


{/* CANCEL */}


<button


type="button"


onClick={()=>
router.back()
}


disabled={
loading
}


className="
inline-flex
min-h-11
items-center
justify-center
rounded-xl
border
border-slate-200
bg-[#111936]
px-6
py-3
text-sm
font-semibold
text-slate-600
transition
hover:border-[#008B45]
hover:text-[#008B45]
disabled:cursor-not-allowed
disabled:opacity-50
"

>


Cancel


</button>









{/* SAVE */}



<button


type="submit"


disabled={
loading ||
uploadingSignature ||
uploadingPrincipal
}


className="
inline-flex
min-h-11
items-center
justify-center
gap-2
rounded-xl
bg-[#008B45]
px-6
py-3
text-sm
font-semibold
text-white
shadow-sm
transition
hover:bg-[#00763B]
hover:shadow-md
disabled:cursor-not-allowed
disabled:opacity-60
"

>


{


loading ? (


<>


<Loader2

size={18}

className="
animate-spin
"

/>


Saving...


</>


)

:

(


<>


<Save

size={18}

/>


{submitLabel}


</>


)



}



</button>






</div>







</form>

);


}