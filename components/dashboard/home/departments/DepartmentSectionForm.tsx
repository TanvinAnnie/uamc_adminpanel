"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";


// =========================================================
// FORM DATA
// =========================================================

export interface DepartmentSectionFormData {
  title: string;

  description: string;

  searchPlaceholder: string;

  popularSearches: string[];

  imageOne: string;

  imageTwo: string;

  studentCount: string;

  studentCountText: string;

  isActive: boolean;
}


// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: DepartmentSectionFormData = {
  title: "",

  description: "",

  searchPlaceholder: "",

  popularSearches: [],

  imageOne: "",

  imageTwo: "",

  studentCount: "",

  studentCountText: "",

  isActive: true,
};


// =========================================================
// PROPS
// =========================================================

interface DepartmentSectionFormProps {

  initialData?: DepartmentSectionFormData;


  sectionId?: string;


  onDataChange:
  (
    data: DepartmentSectionFormData
  )=>void;


  onSuccess:
  (
    data:any
  )=>void;

}


// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentSectionForm({

  initialData,

  sectionId,

  onDataChange,

  onSuccess,

}: DepartmentSectionFormProps) {


  const [formData, setFormData] =
    useState<DepartmentSectionFormData>(
      initialData
        ? {
            title:
              initialData.title || "",

            description:
              initialData.description || "",

            searchPlaceholder:
              initialData.searchPlaceholder || "",

            popularSearches:
              initialData.popularSearches || [],

            imageOne:
              initialData.imageOne || "",

            imageTwo:
              initialData.imageTwo || "",

            studentCount:
              initialData.studentCount || "",

            studentCountText:
              initialData.studentCountText || "",

            isActive:
              initialData.isActive ?? true,
          }
        : defaultFormData
    );


  const [saving, setSaving] =
    useState(false);


  const [
    uploadingImageOne,
    setUploadingImageOne,
  ] = useState(false);


  const [
    uploadingImageTwo,
    setUploadingImageTwo,
  ] = useState(false);


  const [
    popularSearchInput,
    setPopularSearchInput,
  ] = useState("");



  // =======================================================
  // UPDATE FORM DATA
  // =======================================================

  const updateFormData = (
    updatedData: DepartmentSectionFormData
  ) => {

    setFormData(updatedData);

    onDataChange?.(
      updatedData
    );
  };



  // =======================================================
  // HANDLE TEXT CHANGE
  // =======================================================

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    const {
      name,
      value,
    } = event.target;


    updateFormData({
      ...formData,

      [name]: value,

    } as DepartmentSectionFormData);

  };



  // =======================================================
  // ACTIVE TOGGLE
  // =======================================================

  const handleActiveToggle = () => {

    updateFormData({

      ...formData,

      isActive:
        !formData.isActive,

    });

  };


// =======================================================
// POPULAR SEARCH ADD
// =======================================================

const addPopularSearch = () => {

  const value =
    popularSearchInput.trim();


  if (!value) {
    return;
  }


  if (
    formData.popularSearches.includes(value)
  ) {

    toast.error(
      "This search already exists."
    );

    return;
  }



  updateFormData({

    ...formData,

    popularSearches: [

      ...formData.popularSearches,

      value,

    ],

  });



  setPopularSearchInput("");

};




// =======================================================
// REMOVE POPULAR SEARCH
// =======================================================

const removePopularSearch = (
  index: number
) => {


  updateFormData({

    ...formData,


    popularSearches:

      formData.popularSearches.filter(
        (_, itemIndex) =>
          itemIndex !== index
      ),

  });


};




// =======================================================
// IMAGE UPLOAD
// =======================================================


const uploadImage = async (

  file: File,

  type: "imageOne" | "imageTwo"

) => {



  if (
    !file.type.startsWith("image/")
  ) {

    toast.error(
      "Please select an image file."
    );

    return;

  }




  if (
    file.size >
    5 * 1024 * 1024
  ) {

    toast.error(
      "Image size must be less than 5MB."
    );

    return;

  }





  try {


    if (
      type === "imageOne"
    ) {

      setUploadingImageOne(true);

    } else {

      setUploadingImageTwo(true);

    }






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

          method: "POST",

          body: uploadData,

        }
      );






    const result =
      await response.json();






    if (
      !response.ok ||
      !result.success
    ) {

      throw new Error(

        result.message ||

        "Image upload failed."

      );

    }






    updateFormData({

      ...formData,


      [type]:
        result.url,

    } as DepartmentSectionFormData);






    toast.success(
      "Image uploaded successfully."
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


    if (
      type === "imageOne"
    ){

      setUploadingImageOne(false);

    }

    else{

      setUploadingImageTwo(false);

    }


  }



};





// =======================================================
// IMAGE CHANGE
// =======================================================


const handleImageChange = (

  event: ChangeEvent<HTMLInputElement>,

  type: "imageOne" | "imageTwo"

) => {


  const file =
    event.target.files?.[0];



  if(!file){

    return;

  }



  uploadImage(
    file,
    type
  );


};






// =======================================================
// FORM SUBMIT
// =======================================================


const handleSubmit = async (

  event: FormEvent<HTMLFormElement>

) => {


  event.preventDefault();



  try {


    setSaving(true);





    const response =
      await fetch(
        "/api/department-section",
        {

          method:

            sectionId

            ?

            "PUT"

            :

            "POST",



          headers:{

            "Content-Type":
              "application/json",

          },



          body:
            JSON.stringify({

              ...formData,

              id:
                sectionId,

            }),

        }
      );







    const result =
      await response.json();






    if(

      !response.ok ||

      !result.success

    ){

      throw new Error(

        result.message ||

        "Failed to save department section."

      );

    }






    toast.success(

      sectionId

      ?

      "Department section updated successfully."

      :

      "Department section created successfully."

    );






    onSuccess?.(
      result.data
    );



  }


  catch(error){



    console.error(
      "SAVE DEPARTMENT SECTION ERROR:",
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

// =======================================================
// RENDER
// =======================================================


return (

<form

  onSubmit={handleSubmit}

  className="
    space-y-6
    rounded-2xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-sm

    sm:p-6
  "

>





{/* =====================================================
    BASIC INFORMATION
===================================================== */}


<div>


<h3

className="
text-lg
font-bold
text-slate-800
"

>

Section Information

</h3>



<div

className="
mt-5
grid
gap-5
"

>



{/* TITLE */}

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

Title

</label>


<input

name="title"

value={
formData.title
}

onChange={
handleChange
}

placeholder="Find Your Department"

className="
h-12
w-full
rounded-xl
border
border-slate-200
px-4
text-sm
outline-none

focus:border-[#008B45]
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
handleChange
}


rows={5}


placeholder="Write department description..."


className="
w-full
resize-none
rounded-xl
border
border-slate-200
p-4
text-sm
outline-none

focus:border-[#008B45]
"

/>


</div>




</div>


</div>









{/* =====================================================
    SEARCH
===================================================== */}



<div>


<h3

className="
text-lg
font-bold
text-slate-800
"

>

Search Settings

</h3>



<div className="mt-5">


<label

className="
mb-2
block
text-sm
font-semibold
text-slate-700
"

>

Search Placeholder

</label>



<input


name="searchPlaceholder"


value={
formData.searchPlaceholder
}


onChange={
handleChange
}



placeholder="Search department..."


className="
h-12
w-full
rounded-xl
border
border-slate-200
px-4
text-sm
outline-none

focus:border-[#008B45]
"


/>


</div>





{/* POPULAR SEARCH */}



<div className="mt-5">


<label

className="
mb-2
block
text-sm
font-semibold
text-slate-700
"

>

Popular Searches

</label>




<div

className="
flex
gap-2
"

>


<input


value={
popularSearchInput
}


onChange={

(e)=>

setPopularSearchInput(
e.target.value
)

}


placeholder="Add search keyword"


className="
h-11
flex-1
rounded-xl
border
border-slate-200
px-4
text-sm
outline-none

focus:border-[#008B45]
"


/>




<button


type="button"


onClick={
addPopularSearch
}


className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
bg-[#008B45]
text-white
"


>

<Plus size={18}/>


</button>



</div>







<div

className="
mt-3
flex
flex-wrap
gap-2
"

>


{
formData.popularSearches.map(
(item,index)=>(


<span


key={index}


className="
inline-flex
items-center
gap-2
rounded-full
bg-emerald-50
px-3
py-1.5
text-xs
font-semibold
text-[#008B45]
"


>


{item}



<button

type="button"

onClick={()=>
removePopularSearch(index)
}


>

<X size={14}/>


</button>



</span>


)

)

}



</div>



</div>



</div>










{/* =====================================================
    IMAGES
===================================================== */}



<div>


<h3

className="
text-lg
font-bold
text-slate-800
"

>

Images

</h3>




<div

className="
mt-5
grid
gap-5

md:grid-cols-2
"

>





{

[
{
key:"imageOne",
label:"Main Image",
value:formData.imageOne,
loading:uploadingImageOne
},

{
key:"imageTwo",
label:"Secondary Image",
value:formData.imageTwo,
loading:uploadingImageTwo
}

].map((image)=>(


<div

key={image.key}

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

{image.label}

</label>




<div

className="
relative
overflow-hidden
rounded-xl
border
border-slate-200
bg-slate-50
"

>



{
image.value &&

<img

src={image.value}

alt={image.label}

className="
h-44
w-full
object-cover
"

/>

}



{
!image.value &&

<div

className="
flex
h-44
items-center
justify-center
text-slate-400
"

>

<ImageIcon size={32}/>


</div>

}




<label

className="
absolute
bottom-3
right-3
flex
cursor-pointer
items-center
gap-2
rounded-lg
bg-[#008B45]
px-3
py-2
text-xs
font-semibold
text-white
"

>


{
image.loading

?

<Loader2
size={15}
className="animate-spin"
/>

:

<Upload
size={15}
/>

}


Upload



<input

type="file"

hidden

accept="image/*"


onChange={(e)=>

handleImageChange(

e,

image.key as
"imageOne" |
"imageTwo"

)

}


/>



</label>




</div>



</div>



))

}



</div>



</div>









{/* =====================================================
    STUDENT COUNT
===================================================== */}



<div>


<h3

className="
text-lg
font-bold
text-slate-800
"

>

Statistics

</h3>




<div

className="
mt-5
grid
gap-5

md:grid-cols-2
"

>


<input


name="studentCount"


value={
formData.studentCount
}


onChange={
handleChange
}


placeholder="5000+"


className="
h-12
rounded-xl
border
border-slate-200
px-4
text-sm
outline-none
"


/>




<input


name="studentCountText"


value={
formData.studentCountText
}


onChange={
handleChange
}


placeholder="Students"


className="
h-12
rounded-xl
border
border-slate-200
px-4
text-sm
outline-none
"


/>



</div>


</div>








{/* =====================================================
    ACTIVE
===================================================== */}



<div

className="
flex
items-center
justify-between
rounded-xl
bg-slate-50
p-4
"

>


<div>


<p

className="
font-semibold
text-slate-700
"

>

Publish Section

</p>


<p

className="
text-sm
text-slate-500
"

>

Show this section on website

</p>


</div>




<button


type="button"


onClick={
handleActiveToggle
}


className={`

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
    SUBMIT
===================================================== */}



<button


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
font-semibold
text-white
transition

hover:bg-[#00763B]

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

<Save size={18}/>

}



{
saving

?

"Saving..."

:

sectionId

?

"Update Section"

:

"Create Section"

}



</button>





</form>


);
}
};