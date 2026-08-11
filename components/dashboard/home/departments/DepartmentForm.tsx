"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  Building2,
  Image as ImageIcon,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";

import type {
  DepartmentData,
} from "./DepartmentTableRow";


// =========================================================
// PROPS
// =========================================================

interface DepartmentFormProps {

  initialData?: DepartmentData | null;

  onSuccess?: (
    data: DepartmentData
  ) => void;

  onDataChange?: (
    data: DepartmentFormData
  ) => void;

}



// =========================================================
// FORM DATA
// =========================================================

export interface DepartmentFormData {

  name: string;

  slug: string;

  image: string;

  description: string;

  isPopular: boolean;

  isActive: boolean;

  order: number;

}



// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: DepartmentFormData = {

  name: "",

  slug: "",

  image: "",

  description: "",

  isPopular: false,

  isActive: true,

  order: 0,

};



// =========================================================
// SLUG GENERATOR
// =========================================================

const createSlug = (
  value: string
) => {

  return value

    .toLowerCase()

    .trim()

    .replace(
      /[^a-z0-9\s-]/g,
      ""
    )

    .replace(
      /\s+/g,
      "-"
    )

    .replace(
      /-+/g,
      "-"
    );

};



// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentForm({

  initialData = null,

  onSuccess,

  onDataChange,

}: DepartmentFormProps) {



  // =======================================================
  // FORM STATE
  // =======================================================


  const [formData, setFormData] =
    useState<DepartmentFormData>(

      initialData

        ? {

            name:
              initialData.name || "",


            slug:
              initialData.slug || "",


            image:
              initialData.image || "",


            description:
              initialData.description || "",


            isPopular:
              initialData.isPopular ?? false,


            isActive:
              initialData.isActive ?? true,


            order:
              initialData.order ?? 0,

          }

        : defaultFormData

    );





  // =======================================================
  // STATES
  // =======================================================


  const [saving, setSaving] =
    useState(false);



  const [uploading, setUploading] =
    useState(false);





  // =======================================================
  // TEXT CHANGE
  // =======================================================


  const handleChange = (

    event:
      ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement
      >

  ) => {


    const {
      name,
      value,

    } = event.target;



    const updatedData = {

      ...formData,

      [name]: value,

    } as DepartmentFormData;



    setFormData(updatedData);


    onDataChange?.(
      updatedData
    );

  };





  // =======================================================
  // NAME CHANGE + AUTO SLUG
  // =======================================================


  const handleNameChange = (

    event:
      ChangeEvent<HTMLInputElement>

  ) => {


    const value =
      event.target.value;



    const updatedData = {


      ...formData,


      name:value,


      ...(initialData

        ? {}

        : {

            slug:
              createSlug(value),

          }

      ),

    };



    setFormData(updatedData);


    onDataChange?.(
      updatedData
    );

  };





  // =======================================================
  // SLUG CHANGE
  // =======================================================


  const handleSlugChange = (

    event:
      ChangeEvent<HTMLInputElement>

  ) => {


    const updatedData = {


      ...formData,


      slug:
        createSlug(
          event.target.value
        ),


    };



    setFormData(updatedData);


    onDataChange?.(
      updatedData
    );

  };





  // =======================================================
  // TOGGLE
  // =======================================================


  const handleToggle = (

    field:
      | "isPopular"
      | "isActive"

  ) => {


    const updatedData = {


      ...formData,


      [field]:
        !formData[field],


    };



    setFormData(updatedData);


    onDataChange?.(
      updatedData
    );

  };





  // =======================================================
  // ORDER
  // =======================================================


  const handleOrderChange = (

    event:
      ChangeEvent<HTMLInputElement>

  ) => {


    const value =
      Number(
        event.target.value
      );



    const updatedData = {


      ...formData,


      order:

        Number.isNaN(value)

          ? 0

          : value,


    };



    setFormData(updatedData);


    onDataChange?.(
      updatedData
    );

  };
 // =======================================================
// IMAGE UPLOAD
// =======================================================

const handleImageUpload = async (
  event: ChangeEvent<HTMLInputElement>
) => {

  const file =
    event.target.files?.[0];


  if (!file) {
    return;
  }



  if (!file.type.startsWith("image/")) {

    toast.error(
      "Please select a valid image file."
    );

    event.target.value = "";

    return;
  }




  if (file.size > 5 * 1024 * 1024) {

    toast.error(
      "Image size must be less than 5MB."
    );

    event.target.value = "";

    return;
  }




  try {

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



    const updatedData = {

      ...formData,

      image:
        data.url || "",

    };



    setFormData(updatedData);


    onDataChange?.(
      updatedData
    );



    toast.success(
      "Department image uploaded successfully."
    );



  }

  catch(error){


    console.error(
      "IMAGE UPLOAD ERROR:",
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

const removeImage = () => {


  const updatedData = {

    ...formData,

    image:"",

  };


  setFormData(updatedData);


  onDataChange?.(
    updatedData
  );

};





// =======================================================
// SUBMIT
// =======================================================

const handleSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {


event.preventDefault();



if(!formData.name.trim()){

toast.error(
"Please enter department name."
);

return;

}



if(!formData.image){

toast.error(
"Please upload department image."
);

return;

}



if(!formData.description.trim()){

toast.error(
"Please enter description."
);

return;

}




try{


setSaving(true);



const isEdit =
Boolean(
initialData?._id
);



const response =
await fetch(

isEdit

?

`/api/departments/${initialData?._id}`

:

"/api/departments",

{


method:
isEdit
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
"Failed to save department."
);

}





toast.success(

isEdit

?

"Department updated successfully."

:

"Department created successfully."

);




onSuccess?.(
data.data
);




}

catch(error){


console.error(
"SAVE DEPARTMENT ERROR:",
error
);



toast.error(

error instanceof Error

?

error.message

:

"Failed to save department."

);


}

finally{


setSaving(false);


}



};





// =======================================================
// JSX
// =======================================================


return (

<form
onSubmit={handleSubmit}
className="space-y-6"
>



{/* BASIC INFORMATION */}


<div

className="
rounded-3xl
border
border-white/10
bg-[#080d20]
p-5
shadow-xl
sm:p-6
"

>


<div className="mb-6 flex items-center gap-3">


<div

className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
bg-cyan-400/10
text-cyan-400
"

>

<Building2 size={22}/>

</div>



<div>

<h2 className="text-lg font-bold text-white">

Department Information

</h2>


<p className="text-sm text-slate-400">

Add department details.

</p>


</div>


</div>





<div className="grid gap-5 md:grid-cols-2">



<div>

<label className="mb-2 block text-sm font-semibold text-slate-300">

Department Name

</label>


<input

name="name"

value={formData.name}

onChange={handleNameChange}

placeholder="Department of Cardiology"

className="
h-12
w-full
rounded-xl
border
border-white/10
bg-white/5
px-4
text-sm
text-white
outline-none
placeholder:text-slate-500
focus:border-cyan-400
"

/>


</div>





<div>

<label className="mb-2 block text-sm font-semibold text-slate-300">

Slug

</label>


<input

name="slug"

value={formData.slug}

onChange={handleSlugChange}

placeholder="cardiology"

className="
h-12
w-full
rounded-xl
border
border-white/10
bg-white/5
px-4
text-sm
text-white
outline-none
placeholder:text-slate-500
focus:border-cyan-400
"

/>


</div>



</div>





<div className="mt-5">


<label className="mb-2 block text-sm font-semibold text-slate-300">

Description

</label>


<textarea

rows={5}

name="description"

value={formData.description}

onChange={handleChange}

placeholder="Write department description..."

className="
w-full
resize-none
rounded-xl
border
border-white/10
bg-white/5
px-4
py-3
text-sm
text-white
outline-none
placeholder:text-slate-500
focus:border-cyan-400
"

/>


</div>


</div>





{/* IMAGE */}


<div

className="
rounded-3xl
border
border-white/10
bg-[#080d20]
p-5
shadow-xl
sm:p-6
"

>


<h2 className="mb-4 text-lg font-bold text-white">

Department Image

</h2>



{

formData.image

?

<div className="relative overflow-hidden rounded-2xl">


<img

src={formData.image}

alt="Department"

className="
h-72
w-full
object-cover
"

/>



<button

type="button"

onClick={removeImage}

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
bg-white
text-red-500
"

>

<X size={18}/>

</button>



</div>


:


<label

className="
flex
min-h-[250px]
cursor-pointer
flex-col
items-center
justify-center
rounded-2xl
border-2
border-dashed
border-white/20
bg-white/5
text-center
"

>


{

uploading

?

<Loader2
className="animate-spin text-cyan-400"
/>


:

<>

<ImageIcon
size={35}
className="text-cyan-400"
/>


<p className="mt-3 text-sm text-white">

Upload Department Image

</p>


<span className="mt-3 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white">

<Upload size={15} className="inline mr-2"/>

Choose Image

</span>


</>

}



<input

type="file"

accept="image/*"

onChange={handleImageUpload}

className="hidden"

/>



</label>


}


</div>





{/* SETTINGS */}


<div

className="
rounded-3xl
border
border-white/10
bg-[#080d20]
p-5
shadow-xl
sm:p-6
"

>


<h2 className="mb-5 text-lg font-bold text-white">

Department Settings

</h2>




<div className="grid gap-4 md:grid-cols-2">


<button

type="button"

onClick={()=>handleToggle("isPopular")}

className="
flex
items-center
justify-between
rounded-xl
border
border-white/10
bg-white/5
p-4
text-left
"

>


<span className="text-sm text-white">

Popular Department

</span>


<span className={`h-6 w-11 rounded-full ${
formData.isPopular
?
"bg-cyan-500"
:
"bg-slate-600"
}`}/>


</button>






<button

type="button"

onClick={()=>handleToggle("isActive")}

className="
flex
items-center
justify-between
rounded-xl
border
border-white/10
bg-white/5
p-4
text-left
"

>


<span className="text-sm text-white">

Publish Department

</span>


<span className={`h-6 w-11 rounded-full ${
formData.isActive
?
"bg-cyan-500"
:
"bg-slate-600"
}`}/>


</button>


</div>





<input

type="number"

value={formData.order}

onChange={handleOrderChange}

className="
mt-5
h-12
w-full
max-w-xs
rounded-xl
border
border-white/10
bg-white/5
px-4
text-white
"

/>


</div>





{/* SAVE BUTTON */}


<div className="flex justify-end">


<button

disabled={saving || uploading}

className="
inline-flex
items-center
gap-2
rounded-xl
bg-cyan-500
px-6
py-3
font-semibold
text-white
hover:bg-cyan-600
disabled:opacity-50
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

<Save size={18}/>

}


{

initialData

?

"Update Department"

:

"Create Department"

}


</button>


</div>



</form>

);

} 