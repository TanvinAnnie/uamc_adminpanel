"use client";


import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";


import {
  ArrowDown,
  ArrowUp,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";


import {
  toast,
} from "sonner";


import FacilitiesPreview from "./FacilitiesPreview";




// =========================================================
// TYPES
// =========================================================


export interface FacilityItem {


  _id?: string;


  name:string;


  title:string;


  description:string;


  detailsText:string;


  detailsLink:string;


  order:number;


  isActive?:boolean;


}









export interface FacilitiesPreviewData {


  _id?:string;


  tagline:string;


  title:string;


  image:string;


  facilities:FacilityItem[];


  programButtonText:string;


  programButtonLink:string;


  isActive:boolean;


}









interface FacilitiesFormProps {


  initialData:FacilitiesPreviewData;



  onSubmit:(

    data:FacilitiesPreviewData

  )=>Promise<void>|void;



  submitLabel?:string;



  loading?:boolean;


}









// =========================================================
// DEFAULT FACILITY
// =========================================================


const createDefaultFacility = (

  order:number

):FacilityItem => ({


  name:"",


  title:"",


  description:"",


  detailsText:"View Details",


  detailsLink:"#",


  order,


  isActive:true,


});









// =========================================================
// DEFAULT FORM DATA
// =========================================================


const createDefaultFormData = (


initialData:FacilitiesPreviewData


):FacilitiesPreviewData => ({



  _id:initialData?._id,



  tagline:

    initialData?.tagline || "",



  title:

    initialData?.title || "",



  image:

    initialData?.image || "",





  facilities:


    initialData?.facilities?.length > 0


    ?


    initialData.facilities.map(


      (facility,index)=>(

        {


          _id:facility._id,


          name:

            facility.name || "",



          title:

            facility.title || "",



          description:

            facility.description || "",



          detailsText:

            facility.detailsText ||

            "View Details",



          detailsLink:

            facility.detailsLink ||

            "#",



          order:

            typeof facility.order === "number"

            ?

            facility.order

            :

            index,



          isActive:

            facility.isActive ??

            true,


        }


      )


    )


    :


    [

      createDefaultFacility(0)

    ],







  programButtonText:


    initialData?.programButtonText ||

    "View Our Program",







  programButtonLink:


    initialData?.programButtonLink ||

    "/programs",







  isActive:


    initialData?.isActive ??

    true,



});









// =========================================================
// COMPONENT
// =========================================================


export default function FacilitiesForm({



  initialData,



  onSubmit,



  submitLabel="Save Facilities",



  loading=false,



}:FacilitiesFormProps){







// =======================================================
// FORM STATE
// =======================================================



const [formData,setFormData]=

useState<FacilitiesPreviewData>(


()=>


createDefaultFormData(initialData)


);







// =======================================================
// UPLOAD STATE
// =======================================================



const [uploading,setUploading]=

useState(false);








// =======================================================
// BASIC INPUT CHANGE
// =======================================================



const handleChange = (



event:

ChangeEvent<

HTMLInputElement |

HTMLTextAreaElement

>



)=>{



const {

name,

value

}=event.target;





setFormData(previous=>({



...previous,



[name]:value,



}));



};









// =======================================================
// FACILITY INPUT CHANGE
// =======================================================



const handleFacilityChange = (



index:number,



field:keyof FacilityItem,



value:string|boolean



)=>{



setFormData(previous=>({



...previous,



facilities:


previous.facilities.map(


(facility,facilityIndex)=>


facilityIndex===index


?


{


...facility,


[field]:value,


}



:


facility



)



}));



};
// =======================================================
// ADD FACILITY
// =======================================================


const addFacility = () => {


setFormData(previous => ({


...previous,


facilities:[

...previous.facilities,


createDefaultFacility(

previous.facilities.length

)

],


}));


};









// =======================================================
// DELETE FACILITY
// =======================================================


const deleteFacility = (


index:number


)=>{


if(formData.facilities.length <= 1){


toast.error(

"At least one facility is required."

);


return;


}





setFormData(previous=>({


...previous,


facilities:


previous.facilities

.filter(

(_,facilityIndex)=>

facilityIndex !== index

)


.map(

(facility,facilityIndex)=>(


{


...facility,


order:facilityIndex,


}


)

)



}));


};









// =======================================================
// MOVE FACILITY UP
// =======================================================


const moveFacilityUp = (


index:number


)=>{


if(index <= 0){

return;

}




setFormData(previous=>{


const updated = [

...previous.facilities

];





const current =

updated[index];





updated[index]=

updated[index-1];





updated[index-1]=

current;





return {


...previous,


facilities:


updated.map(

(facility,facilityIndex)=>(


{


...facility,


order:facilityIndex,


}


)


)


};


});


};









// =======================================================
// MOVE FACILITY DOWN
// =======================================================


const moveFacilityDown = (


index:number


)=>{


if(

index >= formData.facilities.length-1

){

return;

}




setFormData(previous=>{


const updated=[

...previous.facilities

];





const current =

updated[index];





updated[index]=

updated[index+1];





updated[index+1]=

current;





return {


...previous,


facilities:


updated.map(

(facility,facilityIndex)=>(


{


...facility,


order:facilityIndex,


}


)

)



};



});



};









// =======================================================
// CLOUDINARY IMAGE UPLOAD
// =======================================================


const handleImageUpload = async(



event:ChangeEvent<HTMLInputElement>



)=>{



const file =

event.target.files?.[0];




if(!file){

return;

}




if(

!file.type.startsWith("image/")

){


toast.error(

"Please select a valid image file."

);


event.target.value="";


return;


}





if(

file.size > 5 * 1024 * 1024

){


toast.error(

"Image size must be less than 5MB."

);


event.target.value="";


return;


}





try{



setUploading(true);




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

"Cloudinary URL missing."

);


}








setFormData(previous=>({



...previous,


image:imageUrl,



}));







toast.success(

"Facilities image uploaded successfully."

);






}

catch(error){



console.error(

"FACILITIES IMAGE UPLOAD ERROR:",

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



setUploading(false);



event.target.value="";



}



};









// =======================================================
// REMOVE IMAGE
// =======================================================


const removeImage = ()=>{


setFormData(previous=>({



...previous,


image:"",



}));


};









// =======================================================
// SUBMIT
// =======================================================


const handleSubmit = async(


event:FormEvent<HTMLFormElement>


)=>{


event.preventDefault();







if(!formData.tagline.trim()){


toast.error(

"Please enter the Facilities tagline."

);


return;


}







if(!formData.title.trim()){


toast.error(

"Please enter the Facilities title."

);


return;


}







if(!formData.image){


toast.error(

"Please upload the Facilities image."

);


return;


}







if(formData.facilities.length===0){


toast.error(

"Please add at least one facility."

);


return;


}







for(

let index=0;

index<formData.facilities.length;

index++

){



const facility =

formData.facilities[index];







if(!facility.name.trim()){


toast.error(

`Please enter Facility ${index+1} name.`

);


return;


}







if(!facility.title.trim()){


toast.error(

`Please enter Facility ${index+1} title.`

);


return;


}







if(!facility.description.trim()){


toast.error(

`Please enter Facility ${index+1} description.`

);


return;


}



}








try{



await onSubmit({


...formData,


facilities:


formData.facilities.map(

(facility,index)=>(


{


...facility,


order:index,


}


)

)


});





}

catch(error){



console.error(

"SAVE FACILITIES ERROR:",

error

);



}



};
// =======================================================
// RENDER
// =======================================================


return(



<div


className="

grid

w-full


items-start


gap-6



xl:grid-cols-2


"

>







{/* ===================================================
    LEFT SIDE FORM
=================================================== */}





<div


className="

min-w-0

w-full

"

>





<form


onSubmit={handleSubmit}


className="

w-full

space-y-6

"

>









{/* =================================================
    BASIC INFORMATION
================================================= */}



<section


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





<div

className="

mb-6

"

>



<h2


className="

text-lg

font-bold

text-white

"

>


Facilities Information


</h2>





<p


className="

mt-1

text-sm

text-slate-400

"

>


Manage the main Facilities section.


</p>




</div>








<div


className="

space-y-5

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

text-slate-300

"

>

Small Tagline

</label>






<input


name="tagline"


value={formData.tagline}


onChange={handleChange}


placeholder="knowledge meets innovation"


disabled={loading}


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


outline-none


placeholder:text-slate-500


transition


focus:border-emerald-400


focus:ring-2


focus:ring-emerald-400/10

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

Section Title

</label>






<input


name="title"


value={formData.title}


onChange={handleChange}


placeholder="Our Facilities"


disabled={loading}


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


outline-none


placeholder:text-slate-500


transition


focus:border-emerald-400


focus:ring-2


focus:ring-emerald-400/10

"


/>



</div>









{/* IMAGE UPLOAD */}




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

Facilities Image

</label>









{

formData.image ? (



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




<img


src={formData.image}


alt="Facilities"


className="

h-[280px]

w-full

object-cover

"

/>







<button


type="button"


onClick={removeImage}


disabled={uploading || loading}


className="

absolute

right-4

top-4


flex

h-10

w-10


items-center

justify-center


rounded-full


bg-red-500/20


text-red-400


transition


hover:bg-red-500/30


disabled:opacity-50

"

>


<X size={18}/>


</button>







</div>



)

:

(




<label


className="

flex


min-h-[260px]


cursor-pointer


flex-col


items-center


justify-center


rounded-2xl


border-2


border-dashed


border-slate-700


bg-[#0d162f]


px-5


text-center


transition


hover:border-emerald-400


hover:bg-emerald-400/5

"

>




{

uploading ? (



<>


<Loader2


size={32}


className="

animate-spin

text-emerald-400

"

/>





<p


className="

mt-3

text-sm

text-slate-300

"

>


Uploading image...


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


bg-emerald-400/10

"

>


<Upload


size={25}


className="text-emerald-400"

/>


</div>






<p


className="

mt-4

text-sm

font-semibold

text-white

"

>

Click to upload

</p>





<p


className="

mt-1

text-xs

text-slate-500

"

>

PNG, JPG, WEBP • Max 5MB

</p>



</>


)

}



<input


type="file"


accept="image/png,image/jpeg,image/webp"


disabled={uploading || loading}


onChange={handleImageUpload}


className="hidden"

/>



</label>





)



}





</div>







</div>






</section>
{/* =================================================
    FACILITIES LIST
================================================= */}


<section


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





<div


className="

mb-6


flex


flex-col


gap-4


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

text-white

"

>


Facilities List


</h2>



<p


className="

mt-1

text-sm

text-slate-400

"

>


Add facilities and manage order.


</p>



</div>







<button


type="button"


onClick={addFacility}


disabled={loading}


className="

inline-flex

items-center

justify-center

gap-2


rounded-xl


bg-emerald-500


px-4


py-3


text-sm


font-semibold


text-white


transition


hover:bg-emerald-600


disabled:opacity-50

"

>



<Plus size={17}/>


Add Facility


</button>





</div>










<div


className="

space-y-5

"

>



{


formData.facilities.map(


(facility,index)=>(




<div


key={

facility._id ||

`facility-${index}`

}


className="

rounded-2xl


border

border-slate-700


bg-[#0d162f]


p-4


sm:p-5

"


>







<div


className="

mb-5


flex


flex-col


gap-4


border-b


border-slate-700


pb-4


sm:flex-row


sm:items-center


sm:justify-between

"

>





<div>


<p


className="

font-semibold

text-white

"

>


Facility #{index+1}


</p>



<p


className="

text-xs

text-slate-500

"

>


{facility.name || "New Facility"}


</p>


</div>








<div


className="

flex

gap-2

"

>


<button


type="button"


onClick={()=>moveFacilityUp(index)}


disabled={index===0}


className="

flex

h-9

w-9

items-center

justify-center

rounded-lg

border

border-slate-700

text-slate-400

hover:text-emerald-400

disabled:opacity-40

"

>

<ArrowUp size={16}/>


</button>






<button


type="button"


onClick={()=>moveFacilityDown(index)}


disabled={index===formData.facilities.length-1}


className="

flex

h-9

w-9

items-center

justify-center

rounded-lg

border

border-slate-700

text-slate-400

hover:text-emerald-400

disabled:opacity-40

"

>

<ArrowDown size={16}/>


</button>






<button


type="button"


onClick={()=>deleteFacility(index)}


className="

flex

h-9

w-9

items-center

justify-center

rounded-lg


bg-red-500/10


text-red-400

hover:bg-red-500/20

"

>

<Trash2 size={16}/>


</button>



</div>





</div>









<div


className="

grid

gap-5

md:grid-cols-2

"

>





<input


value={facility.name}


onChange={(e)=>

handleFacilityChange(

index,

"name",

e.target.value

)

}


placeholder="Facility Name"


className="dark-input"


/>







<input


value={facility.title}


onChange={(e)=>

handleFacilityChange(

index,

"title",

e.target.value

)

}


placeholder="Facility Title"


className="dark-input"


/>




</div>








<textarea


value={facility.description}


onChange={(e)=>

handleFacilityChange(

index,

"description",

e.target.value

)

}


placeholder="Facility Description"


rows={4}


className="

mt-5

w-full

rounded-xl

border

border-slate-700

bg-[#080d20]

px-4

py-3

text-sm

text-white

outline-none

focus:border-emerald-400

"

/>








<div


className="

mt-5

grid

gap-5

md:grid-cols-2

"

>





<input


value={facility.detailsText}


onChange={(e)=>

handleFacilityChange(

index,

"detailsText",

e.target.value

)

}


placeholder="Button Text"


className="dark-input"

/>





<input


value={facility.detailsLink}


onChange={(e)=>

handleFacilityChange(

index,

"detailsLink",

e.target.value

)

}


placeholder="Button Link"


className="dark-input"

/>




</div>









<div


className="

mt-5

flex

items-center

justify-between

rounded-xl

border

border-slate-700

px-4

py-3

"

>



<span className="text-sm text-slate-300">


Show Facility


</span>





<button


type="button"


onClick={()=>


handleFacilityChange(

index,

"isActive",

!(facility.isActive ?? true)

)


}


className={`

h-7

w-12

rounded-full

transition


${

facility.isActive

?

"bg-emerald-500"

:

"bg-slate-600"

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

facility.isActive

?

"translate-x-6"

:

"translate-x-1"

}

`}

/>


</button>



</div>








</div>





)



)



}



</div>



</section>









{/* =================================================
    PROGRAM BUTTON
================================================= */}



<section


className="

rounded-3xl

border

border-slate-800

bg-[#080d20]

p-5

shadow-xl

"

>



<h2 className="text-lg font-bold text-white">


Program Button


</h2>





<div className="mt-5 grid gap-5 md:grid-cols-2">


<input


name="programButtonText"


value={formData.programButtonText}


onChange={handleChange}


className="dark-input"


placeholder="Button Text"

/>





<input


name="programButtonLink"


value={formData.programButtonLink}


onChange={handleChange}


className="dark-input"


placeholder="Button Link"

/>



</div>


</section>









{/* =================================================
    PUBLISH + SAVE
================================================= */}



<section


className="

rounded-3xl

border

border-slate-800

bg-[#080d20]

p-5

shadow-xl

"

>



<div className="flex items-center justify-between">


<div>


<p className="font-semibold text-white">

Publish Facilities

</p>


<p className="text-sm text-slate-400">

Show this section on website.

</p>


</div>





<button


type="button"


onClick={()=>


setFormData(previous=>({

...previous,

isActive:!previous.isActive

}))


}


className={`

h-7

w-12

rounded-full


${

formData.isActive

?

"bg-emerald-500"

:

"bg-slate-600"

}

`}

>

<span className={`

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








<button


type="submit"


disabled={loading || uploading}


className="

mt-6

flex

w-full

items-center

justify-center

gap-2

rounded-xl

bg-emerald-500

px-6

py-3

font-semibold

text-white

hover:bg-emerald-600

disabled:opacity-50

"

>



{

loading

?

<Loader2 className="animate-spin"/>

:

<Save/>

}



{submitLabel}



</button>



</section>









</form>


</div>









{/* ===================================================
    LIVE PREVIEW
=================================================== */}



<aside


className="

w-full

xl:sticky

xl:top-6

xl:self-start

"

>



<div


className="

rounded-3xl

border

border-slate-800

bg-[#080d20]

p-5

shadow-xl

"

>



<h2 className="text-lg font-bold text-white">


Live Preview


</h2>



<p className="mt-1 text-sm text-slate-400">


Changes appear instantly.


</p>






<div className="mt-5">


<FacilitiesPreview

data={formData}

/>


</div>





</div>


</aside>







</div>


);


}