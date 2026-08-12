"use client";


import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";


import {
  Image as ImageIcon,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";


import {
  toast,
} from "sonner";




// =========================================================
// FORM DATA TYPE
// =========================================================


export interface AdmissionFormData {

  backgroundImage:string;


  titlePrefix:string;


  title:string;


  description:string;


  buttonText:string;


  buttonLink:string;


  isActive:boolean;

}







// =========================================================
// DEFAULT DATA
// =========================================================


const defaultFormData:AdmissionFormData={


  backgroundImage:"",


  titlePrefix:"UAMC",


  title:"Admission",


  description:"",


  buttonText:"Learn More",


  buttonLink:"/admission",


  isActive:true,


};









// =========================================================
// PROPS
// =========================================================


interface AdmissionFormProps{


  initialData?:AdmissionFormData | null;


  admissionId?:string;


  onDataChange?:(
    data:AdmissionFormData
  )=>void;



  onSuccess?:(
    data:unknown
  )=>void;


}









// =========================================================
// COMPONENT
// =========================================================


export default function AdmissionForm({

  initialData=null,

  admissionId,

  onDataChange,

  onSuccess,

}:AdmissionFormProps){







// =========================================================
// INITIAL DATA
// =========================================================


const initialFormData:AdmissionFormData =

initialData

?

{

backgroundImage:
initialData.backgroundImage || "",


titlePrefix:
initialData.titlePrefix || "UAMC",


title:
initialData.title || "Admission",


description:
initialData.description || "",


buttonText:
initialData.buttonText || "Learn More",


buttonLink:
initialData.buttonLink || "/admission",


isActive:
initialData.isActive ?? true,


}

:

defaultFormData;









// =========================================================
// STATES
// =========================================================


const [

formData,

setFormData,

]=useState<AdmissionFormData>(

initialFormData

);







const [

saving,

setSaving,

]=useState(false);







const [

uploadingImage,

setUploadingImage,

]=useState(false);









// =========================================================
// UPDATE FORM DATA
// =========================================================


const updateFormData = (

nextData:AdmissionFormData

)=>{


setFormData(
nextData
);



onDataChange?.(
nextData
);



};









// =========================================================
// INPUT CHANGE
// =========================================================


const handleChange = (

event:ChangeEvent<
HTMLInputElement | HTMLTextAreaElement
>

)=>{


const {

name,

value,

}=event.target;



const nextData:AdmissionFormData={


...formData,


[name]:value,


};




updateFormData(
nextData
);


};









// =========================================================
// ACTIVE TOGGLE
// =========================================================


const handleActiveToggle = ()=>{


const nextData:AdmissionFormData={


...formData,


isActive:
!formData.isActive,


};



updateFormData(
nextData
);



};









// =========================================================
// IMAGE UPLOAD
// =========================================================


const uploadImage = async (

file:File

)=>{


if(
!file.type.startsWith("image/")
){


toast.error(
"Please select a valid image file."
);


return;


}






if(
file.size >
5 * 1024 * 1024
){


toast.error(
"Image size must be less than 5MB."
);


return;


}





try{


setUploadingImage(true);




const uploadData =
new FormData();



uploadData.append(
"file",
file
);




uploadData.append(
"type",
"image"
);







const response =
await fetch(

"/api/upload",

{

method:"POST",

body:uploadData,

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






const imageUrl =

data.url ||

data.data?.url ||

"";







if(!imageUrl){


throw new Error(
"Image URL not found."
);


}








const nextData:AdmissionFormData={


...formData,


backgroundImage:imageUrl,


};






updateFormData(
nextData
);




toast.success(
"Background image uploaded successfully."
);



}



catch(error){



console.error(
"ADMISSION IMAGE UPLOAD ERROR:",
error
);



toast.error(

error instanceof Error

?

error.message

:

"Image upload failed."

);


}



finally{


setUploadingImage(false);


}




};









// =========================================================
// IMAGE CHANGE
// =========================================================


const handleImageChange = async (

event:ChangeEvent<HTMLInputElement>

)=>{


const file =
event.target.files?.[0];



if(!file){

return;

}



await uploadImage(
file
);



event.target.value="";


};









// =========================================================
// REMOVE IMAGE
// =========================================================


const removeImage = ()=>{


const nextData:AdmissionFormData={


...formData,


backgroundImage:"",


};




updateFormData(
nextData
);



};
// =========================================================
// SUBMIT HANDLER
// =========================================================


const handleSubmit = async (
  event:FormEvent<HTMLFormElement>
)=>{


event.preventDefault();



try{


setSaving(true);




const response =
await fetch(

admissionId

?

`/api/admission/${admissionId}`

:

"/api/admission",

{


method:
admissionId
?

"PUT"

:

"POST",



headers:{

"Content-Type":
"application/json",

},



body:
JSON.stringify(formData),


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

"Failed to save admission section."

);


}






toast.success(

admissionId

?

"Admission section updated."

:

"Admission section created."

);






onSuccess?.(
data.data
);




}



catch(error){



console.error(
"ADMISSION SAVE ERROR:",
error
);



toast.error(

error instanceof Error

?

error.message

:

"Something went wrong."

);


}



finally{


setSaving(false);


}



};









return(



<form

onSubmit={handleSubmit}

className="
space-y-6
"

>







{/* =====================================================
    CONTENT SECTION
===================================================== */}



<div

className="
rounded-3xl
border
border-slate-800
bg-[#080d20]
p-5

shadow-xl

sm:p-6
"

>







<h3

className="
text-lg
font-bold
text-white
"

>

Admission Content

</h3>








<p

className="
mt-1
text-sm
text-slate-400
"

>

Configure the admission section content displayed on homepage.

</p>









<div

className="
mt-6
space-y-5
"

>









{/* TITLE PREFIX */}



<div>



<label

className="
mb-2
block
text-sm
font-semibold
text-slate-300
"

>

Title Prefix

</label>






<input


name="titlePrefix"


value={
formData.titlePrefix
}


onChange={handleChange}



placeholder="UAMC"



className="
h-12
w-full
rounded-xl
border
border-slate-700

bg-[#0d162f]

px-4

text-sm

text-white

placeholder:text-slate-500

outline-none

transition

focus:border-emerald-400
"




/>





</div>









{/* TITLE */}



<div>



<label

className="
mb-2
block
text-sm
font-semibold
text-slate-300
"

>

Admission Title

</label>






<input


name="title"


value={
formData.title
}


onChange={handleChange}



placeholder="Admission Open"



className="
h-12
w-full
rounded-xl
border
border-slate-700

bg-[#0d162f]

px-4

text-sm

text-white

placeholder:text-slate-500

outline-none

transition

focus:border-emerald-400
"



/>






</div>









{/* DESCRIPTION */}



<div>



<label

className="
mb-2
block
text-sm
font-semibold
text-slate-300
"

>

Description

</label>








<textarea


name="description"



value={
formData.description
}



onChange={handleChange}



rows={5}



placeholder="Write admission description..."



className="
w-full

resize-none

rounded-xl

border

border-slate-700

bg-[#0d162f]

px-4

py-3

text-sm

leading-6

text-white

placeholder:text-slate-500

outline-none

transition

focus:border-emerald-400
"



/>






</div>








</div>








</div>
{/* =====================================================
    SAVE BUTTON
===================================================== */}


<div

className="
rounded-3xl

border
border-slate-800

bg-[#080d20]

p-5

shadow-xl

sm:p-6
"

>





<h3

className="
text-lg
font-bold
text-white
"

>

Background Image

</h3>






<p

className="
mt-1
text-sm
text-slate-400
"

>

Upload the image used for the admission section background.

</p>








<div

className="
mt-6
"

>








<div

className="
relative

overflow-hidden

rounded-2xl

border

border-slate-700

bg-[#0d162f]

"

>



{


formData.backgroundImage

?

<img

src={formData.backgroundImage}

alt="Admission background"

className="
h-64
w-full
object-cover

sm:h-72
"

/>



:


<div

className="
flex

h-64

flex-col

items-center

justify-center

gap-3

text-slate-500

sm:h-72
"

>



<ImageIcon

size={42}

/>



<p

className="
text-sm
"

>

No image uploaded

</p>



</div>



}






{/* REMOVE BUTTON */}



{


formData.backgroundImage && (



<button


type="button"



onClick={removeImage}



className="
absolute

right-4

top-4

flex

h-9

w-9

items-center

justify-center

rounded-xl

border

border-red-400/20

bg-red-400/10

text-red-400

transition

hover:bg-red-400/20

"

>


<X size={18}/>


</button>



)



}





</div>









{/* UPLOAD BUTTON */}




<label


className="
mt-5

flex

h-12

cursor-pointer

items-center

justify-center

gap-2

rounded-xl

bg-[#008B45]

px-5

text-sm

font-semibold

text-white

transition

hover:bg-[#00763B]

"

>



{


uploadingImage

?


<Loader2

size={18}

className="animate-spin"

/>


:


<Upload

size={18}

/>



}





{

uploadingImage

?

"Uploading..."

:

formData.backgroundImage

?

"Change Image"

:

"Upload Image"

}



<input


type="file"


hidden


accept="image/*"


onChange={handleImageChange}


/>




</label>







</div>








</div>
{/* =====================================================
    SAVE BUTTON
===================================================== */}



<div

className="
rounded-3xl

border
border-slate-800

bg-[#080d20]

p-5

shadow-xl

sm:p-6
"

>



<h3

className="
text-lg
font-bold
text-white
"

>

Button Settings

</h3>






<p

className="
mt-1
text-sm
text-slate-400
"

>

Configure the admission action button.

</p>








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
text-slate-300
"

>

Button Text

</label>





<input


name="buttonText"


value={
formData.buttonText
}



onChange={handleChange}



placeholder="Apply Now"



className="
h-12

w-full

rounded-xl

border

border-slate-700

bg-[#0d162f]

px-4

text-sm

text-white

placeholder:text-slate-500

outline-none

transition

focus:border-emerald-400
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
text-slate-300
"

>

Button Link

</label>





<input


name="buttonLink"



value={
formData.buttonLink
}



onChange={handleChange}



placeholder="/admission"



className="
h-12

w-full

rounded-xl

border

border-slate-700

bg-[#0d162f]

px-4

text-sm

text-white

placeholder:text-slate-500

outline-none

transition

focus:border-emerald-400
"

/>





</div>






</div>





</div>









{/* =====================================================
    SAVE BUTTON
===================================================== */}


<div

className="
flex

flex-col

gap-4

rounded-3xl

border

border-slate-800

bg-[#080d20]

p-5

shadow-xl

sm:flex-row

sm:items-center

sm:justify-between

sm:p-6
"

>



<div>



<h3

className="
font-bold
text-white
"

>

Publish Admission Section

</h3>





<p

className="
mt-1
text-sm
text-slate-400
"

>

Show this section on the website homepage.

</p>





</div>







<button


type="button"



onClick={handleActiveToggle}



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

"bg-slate-700"

}

`}



>



<span

className={`

block

h-5

w-5

rounded-full

bg-white

transition



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






</div>









{/* =====================================================
    SAVE BUTTON
===================================================== */}


<button


type="submit"



disabled={saving}



className="
inline-flex

min-h-12

w-full

items-center

justify-center

gap-2

rounded-xl

bg-[#008B45]

px-6

py-3

text-sm

font-bold

text-white

transition

hover:bg-[#00763B]

disabled:cursor-not-allowed

disabled:opacity-60
"



>



{


saving

?


<Loader2

size={18}

className="animate-spin"

/>


:


<Save

size={18}

/>



}




{


saving

?

"Saving..."

:

admissionId

?

"Update Admission"

:

"Create Admission"

}



</button>







</form>

);


}