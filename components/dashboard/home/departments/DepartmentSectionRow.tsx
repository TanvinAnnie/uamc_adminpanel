"use client";

import {
  Edit3,
  Eye,
  Trash2,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";


// =========================================================
// TYPE
// =========================================================

export interface DepartmentSectionData {

  _id: string;

  title: string;

  description: string;

  searchPlaceholder: string;

  popularSearches: string[];

  imageOne: string;

  imageTwo: string;

  studentCount: string;

  studentCountText: string;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;

}



// =========================================================
// PROPS
// =========================================================


interface DepartmentSectionRowProps {

  section: DepartmentSectionData;

  onDelete: (
    id:string
  )=>void;

}



// =========================================================
// COMPONENT
// =========================================================


export default function DepartmentSectionRow({

  section,

  onDelete,

}:DepartmentSectionRowProps){


  const router = useRouter();




  // =====================================================
  // DELETE
  // =====================================================


  const handleDelete = async()=>{


    const confirmed =
      window.confirm(
        "Are you sure you want to delete Department section?"
      );


    if(!confirmed){
      return;
    }



    try{


      const response =
        await fetch(
          "/api/department-section",
          {
            method:"DELETE",
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
          "Failed to delete Department section."
        );

      }



      toast.success(
        "Department section deleted successfully."
      );


      onDelete(
        section._id
      );



    }
    catch(error){


      console.error(
        "DELETE DEPARTMENT SECTION ERROR:",
        error
      );


      toast.error(

        error instanceof Error
        ?
        error.message
        :
        "Failed to delete section."

      );


    }


  };






  return (

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm

        transition

        hover:shadow-md
      "
    >





      {/* =========================================
          IMAGES
      ========================================= */}



      <div
        className="
          grid
          gap-4
          p-5

          sm:p-6

          md:grid-cols-2
        "
      >


        {/* IMAGE ONE */}


        <div
          className="
            h-48
            overflow-hidden
            rounded-xl
            bg-slate-100

            sm:h-56
          "
        >

          {
            section.imageOne
            ?

            <img
              src={section.imageOne}
              alt="Department image one"
              className="
                h-full
                w-full
                object-cover
              "
            />

            :

            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-sm
                text-slate-400
              "
            >
              No Image
            </div>

          }


        </div>





        {/* IMAGE TWO */}


        <div
          className="
            h-48
            overflow-hidden
            rounded-xl
            bg-slate-100

            sm:h-56
          "
        >

          {
            section.imageTwo
            ?

            <img
              src={section.imageTwo}
              alt="Department image two"
              className="
                h-full
                w-full
                object-cover
              "
            />

            :

            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-sm
                text-slate-400
              "
            >
              No Image
            </div>

          }


        </div>



      </div>







      {/* =========================================
          INFORMATION
      ========================================= */}



      <div
        className="
          space-y-6
          px-5
          pb-6

          sm:px-6
        "
      >



        <div
          className="
            flex
            flex-col
            gap-4

            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >



          <div className="min-w-0">


            <h2
              className="
                text-xl
                font-bold
                text-slate-800

                sm:text-2xl
              "
            >
              {section.title}
            </h2>



            <p
              className="
                mt-2
                max-w-3xl
                text-sm
                leading-6
                text-slate-500

                line-clamp-3
              "
            >
              {section.description}
            </p>


          </div>






          {/* STATUS */}


          <span
            className={`
              w-fit
              rounded-full
              px-3
              py-1.5
              text-xs
              font-semibold

              ${
                section.isActive
                ?
                "bg-emerald-50 text-emerald-600"
                :
                "bg-red-50 text-red-500"
              }
            `}
          >

            {
              section.isActive
              ?
              "Active"
              :
              "Inactive"
            }

          </span>



        </div>








        {/* DETAILS */}


        <div
          className="
            grid
            gap-4

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >


          <InfoBox
            title="Search Placeholder"
            value={section.searchPlaceholder}
          />



          <InfoBox
            title="Popular Searches"
            value={`${section.popularSearches?.length || 0} searches`}
          />



          <InfoBox
            title="Student Count"
            value={section.studentCount}
            highlight
          />



          <InfoBox
            title="Count Text"
            value={section.studentCountText}
          />


        </div>







        {/* TAGS */}


        {
          section.popularSearches?.length > 0 &&

          <div>

            <p
              className="
                mb-2
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              Popular Search Terms
            </p>



            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              {
                section.popularSearches.map(
                  (item,index)=>(

                    <span
                      key={`${item}-${index}`}
                      className="
                        rounded-full
                        bg-[#E8F7F0]
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-[#008B45]
                      "
                    >
                      {item}
                    </span>

                  )
                )
              }


            </div>


          </div>

        }




      </div>









      {/* =========================================
          ACTION BAR
      ========================================= */}



      <div
        className="
          flex
          flex-wrap
          gap-2
          border-t
          border-slate-100
          bg-slate-50/70

          px-5
          py-4

          sm:justify-end
          sm:px-6
        "
      >



        <ActionButton
          label="Preview"
          icon={<Eye size={16}/>}
          onClick={()=>router.push(
            `/dashboard/home/departments/section/preview/${section._id}`
          )}
        />



        <ActionButton
          label="Edit"
          icon={<Edit3 size={16}/>}
          onClick={()=>router.push(
            `/dashboard/home/departments/section/edit/${section._id}`
          )}
        />



        <ActionButton
          danger
          label="Delete"
          icon={<Trash2 size={16}/>}
          onClick={handleDelete}
        />


      </div>



    </div>

  );


}







// =========================================================
// SMALL COMPONENTS
// =========================================================


function InfoBox({

  title,

  value,

  highlight=false,

}:{

  title:string;

  value:string;

  highlight?:boolean;

}){


return(

<div
className="
rounded-xl
bg-slate-50
p-4
"
>

<p
className="
text-xs
font-semibold
uppercase
tracking-wide
text-slate-400
"
>
{title}
</p>


<p
className={`
mt-2
truncate
text-sm
font-medium

${
highlight
?
"text-[#008B45] text-lg font-bold"
:
"text-slate-700"
}

`}
>
{value}
</p>


</div>

);

}





function ActionButton({

label,

icon,

onClick,

danger=false,

}:{

label:string;

icon:React.ReactNode;

onClick:()=>void;

danger?:boolean;

}){


return(

<button

type="button"

onClick={onClick}

className={`

inline-flex

h-10

items-center

justify-center

gap-2

rounded-xl

px-4

text-sm

font-semibold

transition


${
danger

?

"bg-red-50 text-red-500 hover:bg-red-100"

:

"border border-slate-200 bg-white text-slate-600 hover:border-[#008B45] hover:text-[#008B45]"

}

`}

>

{icon}

{label}

</button>

);


}