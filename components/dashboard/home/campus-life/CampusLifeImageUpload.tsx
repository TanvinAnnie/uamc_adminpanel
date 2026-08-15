"use client";


import {
  useState,
} from "react";


import {
  UploadCloud,
  Loader2,
} from "lucide-react";


import {
  toast,
} from "sonner";





interface Props {


value:string;


onChange:(url:string)=>void;


}







export default function CampusLifeImageUpload({

value,

onChange,

}:Props){



const [uploading,setUploading]=useState(false);






const handleFileChange = async(

e:React.ChangeEvent<HTMLInputElement>

)=>{


const file = e.target.files?.[0];


if(!file) return;





try{


setUploading(true);





const formData = new FormData();


formData.append(

"file",

file

);






const response = await fetch(

"/api/upload",

{

method:"POST",

body:formData,

}

);






const result = await response.json();





console.log(
"UPLOAD RESPONSE:",
result
);






if(

!response.ok ||

!result.success

){


throw new Error(

result.message ||

"Upload failed"

);


}








// IMPORTANT PART

const imageUrl =

result.data?.url ||

result.url;







if(!imageUrl){


throw new Error(

"Image URL not found from server"

);


}






onChange(imageUrl);



toast.success(

"Image uploaded successfully"

);





}

catch(error){



console.error(

"UPLOAD ERROR:",

error

);



toast.error(

error instanceof Error

?

error.message

:

"Upload failed"

);



}

finally{


setUploading(false);


}



};








return (



<div>


<label

className="
flex
cursor-pointer
flex-col
items-center
justify-center
rounded-2xl
border
border-dashed
border-slate-300
bg-slate-50
p-8
transition
hover:bg-slate-100
"

>


{

uploading

?

<Loader2

className="
animate-spin
text-emerald-500
"

size={35}

/>

:

<UploadCloud

className="
text-emerald-500
"

size={35}

/>

}





<p

className="
mt-3
text-sm
text-slate-500
"

>

{

uploading

?

"Uploading..."

:

"Upload Image"

}

</p>





<input


type="file"


accept="image/*"


className="hidden"


onChange={handleFileChange}


/>



</label>







{

value && (

<img

src={value}

alt="preview"

className="
mt-4
h-40
w-full
rounded-xl
object-cover
"

/>

)

}



</div>



);


}