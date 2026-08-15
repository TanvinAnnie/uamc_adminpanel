"use client";


import {
  useState,
} from "react";


import {
  Save,
} from "lucide-react";


import CampusLifeImageUpload from "./CampusLifeImageUpload";



// =========================================================
// TYPES
// =========================================================


export interface CampusLifeFormData {

  title:string;

  shortDescription:string;

  image:string;

  buttonText:string;

  buttonLink:string;

  isActive:boolean;

}





interface CampusLifeFormProps {


  initialData:CampusLifeFormData;


  onSubmit:(
    data:CampusLifeFormData
  )=>Promise<void>;


  onChange?:(
    data:CampusLifeFormData
  )=>void;


  submitLabel?:string;


  title?:string;


  description?:string;


}






// =========================================================
// COMPONENT
// =========================================================


export default function CampusLifeForm({

  initialData,

  onSubmit,

  onChange,

  submitLabel="Save Campus Life",

  title="Campus Life",

  description="Manage Campus Life section content.",


}:CampusLifeFormProps){



const [
  formData,
  setFormData
]=useState<CampusLifeFormData>(
  initialData
);





const [
 uploading,
 setUploading
]=useState(false);





const [
 submitting,
 setSubmitting
]=useState(false);







// =========================================================
// UPDATE FIELD
// =========================================================


const updateField = (

field:
keyof CampusLifeFormData,

value:
string | boolean

)=>{


const updated = {

...formData,

[field]:value,

};



setFormData(updated);



onChange?.(
updated
);



};







// =========================================================
// IMAGE UPLOAD
// =========================================================


const handleUpload = async(
file:File
)=>{


try{


setUploading(true);



const form =
new FormData();



form.append(
"file",
file
);





const response =
await fetch(
"/api/upload",
{

method:"POST",

body:form,

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
"Image upload failed."
);

}




updateField(
"image",
data.data.url
);



}

finally{


setUploading(false);


}



};







// =========================================================
// SUBMIT
// =========================================================


const handleSubmit = async(
event:
React.FormEvent
)=>{


event.preventDefault();



try{


setSubmitting(true);



await onSubmit(
formData
);



}
finally{


setSubmitting(false);


}



};
// =========================================================
// RENDER
// =========================================================


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


{/* =====================================================
    HEADER
===================================================== */}


<div

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


<h1

className="
text-xl
font-bold
text-slate-800
sm:text-2xl
"

>

{title}

</h1>



<p

className="
mt-2
text-sm
leading-6
text-slate-500
"

>

{description}

</p>



</div>







{/* =====================================================
    BASIC INFORMATION
===================================================== */}



<section

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


<div

className="
mb-5
"

>


<h2

className="
text-lg
font-bold
text-slate-800
"

>

Basic Information

</h2>



<p

className="
mt-1
text-sm
text-slate-500
"

>

Enter Campus Life card details.

</p>



</div>









{/* TITLE */}



<div

className="
mb-5
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

Title

<span className="ml-1 text-red-500">
*
</span>


</label>




<input


type="text"


value={
formData.title
}



onChange={(e)=>

updateField(
"title",
e.target.value
)

}



placeholder="
Student Life
"



className="
h-12
w-full
rounded-xl
border
border-slate-200
bg-slate-50
px-4
text-sm
text-slate-800
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-emerald-100
"




/>



</div>










{/* SHORT DESCRIPTION */}



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


Short Description


<span className="ml-1 text-red-500">
*
</span>


</label>




<textarea


rows={5}



value={
formData.shortDescription
}



onChange={(e)=>

updateField(
"shortDescription",
e.target.value
)

}



placeholder="
Explore student activities and campus experiences.
"



className="
w-full
resize-none
rounded-xl
border
border-slate-200
bg-slate-50
px-4
py-3
text-sm
leading-6
text-slate-800
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-emerald-100
"




/>



</div>





</section>

{/* =====================================================
// PUBLISH SETTINGS
// =====================================================*/}


<section

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


<div

className="
mb-5
"

>


<h2

className="
text-lg
font-bold
text-slate-800
"

>

Campus Image

</h2>



<p

className="
mt-1
text-sm
text-slate-500
"

>

Upload the image that will represent this Campus Life card.

</p>



</div>





<CampusLifeImageUpload


value={
formData.image
}



onChange={(url)=>

updateField(
"image",
url
)

}

/>



</section>









{/* =====================================================
// PUBLISH SETTINGS
// =====================================================*/}


<section

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


<div

className="
mb-5
"

>


<h2

className="
text-lg
font-bold
text-slate-800
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

Configure the action button shown on the card.

</p>



</div>









<div

className="
grid
grid-cols-1
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


value={
formData.buttonText
}



onChange={(e)=>

updateField(
"buttonText",
e.target.value
)

}



placeholder="
Learn More
"



className="
h-12
w-full
rounded-xl
border
border-slate-200
bg-slate-50
px-4
text-sm
text-slate-800
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-emerald-100
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


value={
formData.buttonLink
}



onChange={(e)=>

updateField(
"buttonLink",
e.target.value
)

}



placeholder="
/student-life
"



className="
h-12
w-full
rounded-xl
border
border-slate-200
bg-slate-50
px-4
text-sm
text-slate-800
outline-none
transition
focus:border-[#008B45]
focus:ring-2
focus:ring-emerald-100
"




/>



</div>





</div>





</section>

{/* =====================================================
// PUBLISH SETTINGS
// =====================================================*/}


<section

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


<div

className="
flex
flex-col
gap-5
sm:flex-row
sm:items-center
sm:justify-between
"

>


<div>


<h2

className="
text-lg
font-bold
text-slate-800
"

>

Publish Settings

</h2>



<p

className="
mt-1
text-sm
text-slate-500
"

>

Control visibility of this Campus Life card.

</p>



</div>







{/* TOGGLE */}



<button


type="button"


onClick={()=>

updateField(
"isActive",
!formData.isActive
)

}


className="
flex
items-center
gap-3
"

>



<div

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


<div

className={`
absolute
top-1
h-5
w-5
rounded-full
bg-white
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


</div>





<span

className={`
text-sm
font-semibold
${
formData.isActive
?
"text-emerald-600"
:
"text-slate-500"
}
`}

>

{
formData.isActive
?
"Published"
:
"Hidden"
}


</span>



</button>





</div>



</section>









{/* =====================================================
// PUBLISH SETTINGS
// =====================================================*/}

<div

className="
flex
justify-end
"

>


<button


type="submit"


disabled={submitting || uploading}


className="
inline-flex
min-h-12
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
transition
hover:bg-[#00763B]
disabled:cursor-not-allowed
disabled:opacity-60
"

>


<Save
size={18}
/>



{
submitting
?
"Saving..."
:
submitLabel
}



</button>



</div>






</form>

);


}
