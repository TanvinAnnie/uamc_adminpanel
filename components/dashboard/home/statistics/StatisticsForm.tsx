"use client";


import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";


import {
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";


import {
  toast,
} from "sonner";


import type {
  StatisticsData,
} from "./StatisticsTableRow";



// =========================================
// PROPS
// =========================================


interface StatisticsFormProps {

  initialData?: StatisticsData | null;


  onSuccess?: (
    data: StatisticsData
  ) => void;


  onDataChange?: (
    data: StatisticsFormData
  ) => void;

}



// =========================================
// FORM DATA TYPE
// =========================================


export interface StatisticsFormData {


  backgroundImage: string;



  statisticOneValue: string;

  statisticOneTitle: string;



  statisticTwoValue: string;

  statisticTwoTitle: string;



  statisticThreeValue: string;

  statisticThreeTitle: string;



  isActive: boolean;

}



// =========================================
// DEFAULT DATA
// =========================================


const defaultFormData: StatisticsFormData = {


  backgroundImage: "",



  statisticOneValue: "",

  statisticOneTitle: "",



  statisticTwoValue: "",

  statisticTwoTitle: "",



  statisticThreeValue: "",

  statisticThreeTitle: "",



  isActive: true,


};





// =========================================
// COMPONENT
// =========================================


export default function StatisticsForm({

  initialData = null,

  onSuccess,

  onDataChange,


}: StatisticsFormProps) {



  const [formData,setFormData] =
    useState<StatisticsFormData>(


      initialData

      ?


      {


        backgroundImage:
          initialData.backgroundImage || "",



        statisticOneValue:
          initialData.statisticOneValue || "",



        statisticOneTitle:
          initialData.statisticOneTitle || "",



        statisticTwoValue:
          initialData.statisticTwoValue || "",



        statisticTwoTitle:
          initialData.statisticTwoTitle || "",



        statisticThreeValue:
          initialData.statisticThreeValue || "",



        statisticThreeTitle:
          initialData.statisticThreeTitle || "",



        isActive:
          initialData.isActive ?? true,


      }


      :


      defaultFormData


    );




  const [saving,setSaving] =
    useState(false);



  const [uploading,setUploading] =
    useState(false);





// =========================================
// INPUT CHANGE
// =========================================


const handleChange = (

  event: ChangeEvent<HTMLInputElement>

) => {


  const {

    name,

    value,

  } = event.target;





  const field =
    name as keyof StatisticsFormData;





  const updatedData = {


    ...formData,


    [field]: value,


  } as StatisticsFormData;





  setFormData(updatedData);



  onDataChange?.(
    updatedData
  );


};
// =========================================
// IMAGE UPLOAD
// =========================================


const handleImageUpload = async (

  event: ChangeEvent<HTMLInputElement>

) => {


  const file =
    event.target.files?.[0];



  if(!file){

    return;

  }




  if(!file.type.startsWith("image/")){


    toast.error(
      "Please select a valid image file."
    );


    event.target.value = "";


    return;

  }





  if(file.size > 5 * 1024 * 1024){


    toast.error(
      "Image size must be less than 5MB."
    );


    event.target.value = "";


    return;

  }





  try{


    setUploading(true);



    const formDataUpload =
      new FormData();



    formDataUpload.append(
      "file",
      file
    );



    formDataUpload.append(
      "type",
      "image"
    );






    const response =
      await fetch(

        "/api/upload",

        {

          method:"POST",

          body:
            formDataUpload,

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

        "Image upload failed."

      );

    }






    const updatedData = {


      ...formData,


      backgroundImage:
        result.url,


    } as StatisticsFormData;





    setFormData(updatedData);



    onDataChange?.(
      updatedData
    );



    toast.success(
      "Background image uploaded successfully."
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



    event.target.value = "";

  }


};







// =========================================
// REMOVE IMAGE
// =========================================


const removeImage = ()=>{


  const updatedData = {


    ...formData,


    backgroundImage:"",


  };





  setFormData(updatedData);



  onDataChange?.(
    updatedData
  );


};








// =========================================
// SUBMIT FORM
// =========================================


const handleSubmit = async (

  event: FormEvent<HTMLFormElement>

)=>{


  event.preventDefault();



  try{


    if(

      !formData.statisticOneValue ||

      !formData.statisticOneTitle ||

      !formData.statisticTwoValue ||

      !formData.statisticTwoTitle ||

      !formData.statisticThreeValue ||

      !formData.statisticThreeTitle

    ){


      toast.error(
        "Please fill all statistics fields."
      );


      return;

    }







    setSaving(true);







    const payload = {


      ...formData,


    };







    const url = initialData

      ?

      `/api/statistics/${initialData._id}`

      :

      "/api/statistics";







    const method = initialData

      ?

      "PUT"

      :

      "POST";







    const response =
      await fetch(

        url,

        {


          method,


          headers:{


            "Content-Type":

              "application/json",


          },



          body:

            JSON.stringify(payload),


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

        "Failed to save statistics."

      );


    }







    toast.success(

      initialData

      ?

      "Statistics updated successfully."

      :

      "Statistics created successfully."

    );






    onSuccess?.(
      result.data
    );




  }

  catch(error){


    console.error(
      "SAVE STATISTICS ERROR:",
      error
    );



    toast.error(

      error instanceof Error

      ?

      error.message

      :

      "Failed to save statistics."

    );


  }

  finally{


    setSaving(false);


  }


};
// =========================================
// UI
// =========================================


return (

<form

  onSubmit={handleSubmit}

  className="
    space-y-6
    rounded-3xl
    border
    border-white/10
    bg-slate-900/70
    p-5
    shadow-xl
    backdrop-blur-xl
    sm:p-6
  "

>



{/* =====================================
    HEADER
===================================== */}


<div
  className="
    border-b
    border-white/10
    pb-5
  "
>


<h2
  className="
    text-xl
    font-bold
    text-white
    sm:text-2xl
  "
>

{
  initialData
  ?
  "Edit Statistics"
  :
  "Create Statistics"
}

</h2>



<p
  className="
    mt-2
    text-sm
    text-slate-400
  "
>

Manage homepage statistics section.

</p>



</div>








{/* =====================================
    BACKGROUND IMAGE
===================================== */}



<div

className="
 rounded-2xl
 border
 border-white/10
 bg-white/5
 p-5
"

>



<h3
className="
 text-sm
 font-semibold
 text-white
"
>

Background Image

</h3>



<p
className="
 mt-1
 text-xs
 text-slate-400
"
>

Upload statistics background image.

</p>







<label

className="
 mt-5
 flex
 min-h-[220px]
 cursor-pointer
 items-center
 justify-center
 overflow-hidden
 rounded-2xl
 border-2
 border-dashed
 border-white/20
 bg-slate-950/40
 transition
 hover:border-emerald-400
"

>



{
formData.backgroundImage ?


(

<div
className="
relative
h-full
w-full
"
>



<img

src={
formData.backgroundImage
}

alt="Statistics background"

className="
h-[220px]
w-full
object-cover
"

/>





<button

type="button"

onClick={(e)=>{

e.preventDefault();

removeImage();

}}

className="
absolute
right-3
top-3
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-red-500
text-white
"

>

<X size={18}/>

</button>



</div>


)

:

(

<div
className="
flex
flex-col
items-center
text-center
"
>



{
uploading ?


(

<Loader2

size={36}

className="
animate-spin
text-emerald-400
"

/>


)


:


(

<Upload

size={36}

className="
text-slate-400
"

/>


)

}




<span
className="
mt-4
text-sm
font-semibold
text-slate-300
"
>

{
uploading
?
"Uploading..."
:
"Upload Background Image"
}

</span>




<span
className="
mt-1
text-xs
text-slate-500
"
>

PNG JPG WEBP • Max 5MB

</span>



</div>

)

}





<input

type="file"

accept="image/*"

hidden

onChange={handleImageUpload}

/>



</label>




</div>
{/* =====================================
    STATISTICS CARDS
===================================== */}


<div
  className="
    grid
    gap-5
    lg:grid-cols-3
  "
>


{
[
  {
    value:"statisticOneValue",
    title:"statisticOneTitle",
    label:"Statistics One",
  },


  {
    value:"statisticTwoValue",
    title:"statisticTwoTitle",
    label:"Statistics Two",
  },


  {
    value:"statisticThreeValue",
    title:"statisticThreeTitle",
    label:"Statistics Three",
  },

].map((item)=>(


<div
key={item.value}
className="
rounded-2xl
border
border-white/10
bg-white/5
p-5
"
>


<h3
className="
mb-4
text-sm
font-bold
text-emerald-400
"
>

{item.label}

</h3>




<input

name={item.value}

value={
formData[
item.value as keyof StatisticsFormData
] as string
}

onChange={handleChange}

placeholder="Number"

className="
h-11
w-full
rounded-xl
border
border-white/10
bg-slate-950
px-4
text-sm
text-white
outline-none
focus:border-emerald-400
"

/>





<input

name={item.title}

value={
formData[
item.title as keyof StatisticsFormData
] as string
}

onChange={handleChange}

placeholder="Title"

className="
mt-3
h-11
w-full
rounded-xl
border
border-white/10
bg-slate-950
px-4
text-sm
text-white
outline-none
focus:border-emerald-400
"

/>



</div>


))


}


</div>









{/* =====================================
    ACTIVE STATUS
===================================== */}



<label

className="
flex
items-center
justify-between
rounded-2xl
border
border-white/10
bg-white/5
p-5
"

>


<div>


<h3
className="
text-sm
font-semibold
text-white
"
>

Publish Statistics

</h3>



<p
className="
mt-1
text-xs
text-slate-400
"
>

Show this section on homepage.

</p>


</div>




<input

type="checkbox"

checked={
formData.isActive
}

onChange={(e)=>{


const updatedData = {


...formData,


isActive:
e.target.checked,


};



setFormData(updatedData);



onDataChange?.(
updatedData
);



}}


className="
h-5
w-5
accent-emerald-500
"

/>



</label>









{/* =====================================
    SAVE BUTTON
===================================== */}



<button

type="submit"

disabled={saving}

className="
inline-flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-gradient-to-r
from-emerald-500
to-cyan-500
px-6
py-3
text-sm
font-bold
text-white
transition
hover:scale-[1.01]
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

initialData

?

"Update Statistics"

:

"Create Statistics"

}



</button>



</form>

);

}