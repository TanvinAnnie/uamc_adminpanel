"use client";


import {
  useCallback,
  useEffect,
  useState,
} from "react";


import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  toast,
} from "sonner";


import CampusLifeForm, {

  type CampusLifeFormData,

} from "@/components/dashboard/home/campus-life/CampusLifeForm";


import CampusLifePreview from "@/components/dashboard/home/campus-life/CampusLifePreview";


import CampusLifeLoading from "@/components/dashboard/home/campus-life/CampusLifeLoading";





const defaultData: CampusLifeFormData = {

  title:"",

  shortDescription:"",

  image:"",

  buttonText:"Learn More",

  buttonLink:"#",

  isActive:true,

};









export default function CampusLifeEditPage(){



const router = useRouter();


const params = useParams();


const id = params.id as string;





const [

loading,

setLoading

] = useState(true);





const [

formData,

setFormData

] = useState<CampusLifeFormData>(defaultData);









// =========================================================
// FETCH SINGLE CAMPUS LIFE
// =========================================================


const fetchCampusLife = useCallback(async()=>{


try{


setLoading(true);




const response = await fetch(

`/api/campus-life/${id}`,

{

cache:"no-store",

}

);






const result = await response.json();






if(

!response.ok ||

!result.success

){


throw new Error(

result.message ||

"Failed to fetch Campus Life"

);


}







const item = result.data;





setFormData({

title:item.title || "",


shortDescription:
item.shortDescription || "",


image:item.image || "",


buttonText:
item.buttonText || "Learn More",


buttonLink:
item.buttonLink || "#",


isActive:
item.isActive ?? true,


});






}

catch(error){



console.error(

"FETCH CAMPUS LIFE ERROR:",

error

);



toast.error(

"Failed to load Campus Life"

);



}

finally{


setLoading(false);


}



},[id]);









// =========================================================
// LOAD DATA
// =========================================================


useEffect(()=>{


if(!id) return;


const loadData = async()=>{

await fetchCampusLife();

};


loadData();


},[id,fetchCampusLife]);









// =========================================================
// FORM CHANGE
// =========================================================


const handleChange = (

data:CampusLifeFormData

)=>{


setFormData(data);


};









// =========================================================
// UPDATE
// =========================================================


const handleSubmit = async(

data:CampusLifeFormData

)=>{


try{


const response = await fetch(

`/api/campus-life/${id}`,

{


method:"PATCH",


headers:{


"Content-Type":

"application/json",


},



body:

JSON.stringify(data),



}

);








const result = await response.json();







if(

!response.ok ||

!result.success

){


throw new Error(

result.message ||

"Update failed"

);


}







toast.success(

"Campus Life updated successfully"

);







router.push(

"/dashboard/home/campus-life"

);




router.refresh();






}

catch(error){



console.error(

"UPDATE ERROR:",

error

);





toast.error(

error instanceof Error

?

error.message

:

"Update failed"

);



}



};









// =========================================================
// LOADING SCREEN
// =========================================================


if(loading){


return (

<main

className="
min-h-screen
bg-[#F8FAF9]
px-6
py-6
"

>


<CampusLifeLoading />


</main>

);


}









// =========================================================
// PAGE
// =========================================================


return (


<main

className="
min-h-screen
bg-[#F8FAF9]
px-4
py-6
sm:px-6
lg:px-8
"

>


<div

className="
mx-auto
w-full
max-w-[1600px]
"

>






<div className="mb-8">


<p

className="
text-xs
font-semibold
uppercase
tracking-[0.18em]
text-[#008B45]
"

>

Homepage

</p>





<h1

className="
mt-2
text-3xl
font-bold
text-slate-900
"

>

Edit Campus Life

</h1>





<p

className="
mt-2
text-sm
text-slate-500
"

>

Update campus life section information.

</p>



</div>









<div

className="
grid
grid-cols-1
gap-6
xl:grid-cols-2
"

>







<div>


<CampusLifeForm


initialData={formData}



onChange={handleChange}



onSubmit={handleSubmit}



submitLabel="Update Campus Life"



title="Campus Life"



description="
Manage campus life content.
"



/>



</div>









<div

className="
rounded-2xl
border
border-slate-200
bg-white
p-5
xl:sticky
xl:top-6
h-fit
"

>


<div className="mb-5">


<h2

className="
text-lg
font-semibold
text-slate-800
"

>

Live Preview

</h2>



<p

className="
text-sm
text-slate-500
"

>

Changes appear instantly.

</p>



</div>







<CampusLifePreview


data={formData}


/>






</div>









</div>







</div>





</main>



);



}