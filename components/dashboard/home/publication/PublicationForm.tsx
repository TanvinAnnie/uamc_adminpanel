"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";


import PublicationPreview from "./PublicationPreview";
import PublicationPDFUpload from "./PublicationPDFUpload";





interface PublicationFormData {

  _id?: string;

  title:string;

  slug:string;

  category:
    | "Journal"
    | "Tenders";

  description:string;

  pdf:string;

  date:string;

  time:string;

  order:number;

  isPublished:boolean;

}





interface PublicationFormProps {

  initialData?: PublicationFormData;

}







const defaultFormData:PublicationFormData = {


  title:"",

  slug:"",

  category:"Journal",

  description:"",

  pdf:"",

  date:"",

  time:"",

  order:0,

  isPublished:true,

};







export default function PublicationForm({

  initialData,

}:PublicationFormProps){



  const router =
    useRouter();




  const [formData,setFormData] =
    useState<PublicationFormData>(
      initialData || defaultFormData
    );





  const [submitting,setSubmitting] =
    useState(false);






  const isEditMode =
    Boolean(
      initialData?._id
    );








  // ==========================
  // GENERATE SLUG
  // ==========================


  const generateSlug = (
    value:string
  )=>{


    return value

      .toLowerCase()

      .trim()

      .replace(
        /[^\p{L}\p{N}\s-]/gu,
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









  // ==========================
  // UPDATE FIELD
  // ==========================


  const updateField = <
    K extends keyof PublicationFormData
  >(

    field:K,

    value:PublicationFormData[K]

  )=>{


    setFormData(
      (prev)=>({

        ...prev,

        [field]:value,

      })
    );


  };









  // ==========================
  // TITLE CHANGE
  // ==========================


  const handleTitleChange = (
    value:string
  )=>{


    setFormData(
      (prev)=>({


        ...prev,


        title:value,



        ...(

          isEditMode

          ?

          {}

          :

          {

            slug:
              generateSlug(value)

          }

        )


      })
    );


  };









  // ==========================
  // SUBMIT
  // ==========================


  const handleSubmit = async (

    e:React.FormEvent<HTMLFormElement>

  )=>{


    e.preventDefault();





    if(!formData.title.trim()){

      toast.error(
        "Publication title is required."
      );

      return;

    }





    if(!formData.slug.trim()){

      toast.error(
        "Publication slug is required."
      );

      return;

    }





    if(!formData.description.trim()){

      toast.error(
        "Publication description is required."
      );

      return;

    }





    if(!formData.pdf.trim()){

      toast.error(
        "Please upload the publication PDF."
      );

      return;

    }





    if(!formData.date){

      toast.error(
        "Publication date is required."
      );

      return;

    }





    if(!formData.time.trim()){

      toast.error(
        "Publication time is required."
      );

      return;

    }






    try{


      setSubmitting(true);





      const url =

        isEditMode

        ?

        `/api/publications/${initialData?._id}`

        :

        "/api/publications";







      const method =

        isEditMode

        ?

        "PATCH"

        :

        "POST";







      const res = await fetch(

        url,

        {

          method,

          headers:{

            "Content-Type":
              "application/json",

          },


          body:JSON.stringify({

            ...formData,

            order:Number(
              formData.order
            ),

          }),


        }

      );







      const result =
        await res.json();







      if(!res.ok){


        throw new Error(

          result.message ||

          "Failed to save publication."

        );


      }








      toast.success(

        result.message ||

        "Publication saved successfully."

      );








      router.push(

        "/dashboard/home/publications"

      );





      router.refresh();





    }


    catch(error){


      console.error(

        "SAVE PUBLICATION ERROR:",

        error

      );




      toast.error(

        error instanceof Error

        ?

        error.message

        :

        "Failed to save publication."

      );



    }



    finally{


      setSubmitting(false);


    }




  };
    return (

    <form
      onSubmit={handleSubmit}

      className="
        space-y-8
      "
    >




      <div
        className="
          grid

          gap-8


          xl:grid-cols-[1.2fr_0.8fr]
        "
      >






        {/* ================= LEFT SIDE ================= */}



        <div
          className="
            rounded-3xl

            border

            border-white/10


            bg-slate-900/70


            p-6


            shadow-[0_25px_80px_rgba(0,0,0,0.35)]


            backdrop-blur-xl


            lg:p-8
          "
        >



          <div
            className="
              mb-8
            "
          >

            <h2
              className="
                text-2xl

                font-bold

                text-white
              "
            >
              Publication Information
            </h2>


            <p
              className="
                mt-2

                text-sm

                text-slate-400
              "
            >
              Add publication details and manage visibility.
            </p>


          </div>







          {/* TITLE */}



          <div
            className="
              space-y-2
            "
          >

            <label
              className="
                text-sm

                font-semibold

                text-slate-300
              "
            >
              Publication Title
            </label>



            <input

              type="text"

              value={formData.title}

              onChange={(e)=>
                handleTitleChange(
                  e.target.value
                )
              }


              placeholder="Enter publication title"


              className="
                w-full

                rounded-xl


                border

                border-white/10


                bg-slate-950/70


                px-4

                py-3


                text-white


                placeholder:text-slate-500


                outline-none


                transition


                focus:border-cyan-400


                focus:ring-2


                focus:ring-cyan-400/20
              "

            />


          </div>








          {/* SLUG */}



          <div
            className="
              mt-6

              space-y-2
            "
          >


            <label
              className="
                text-sm

                font-semibold

                text-slate-300
              "
            >
              Slug
            </label>




            <input

              type="text"

              value={formData.slug}

              onChange={(e)=>
                updateField(
                  "slug",
                  e.target.value
                )
              }


              placeholder="publication-slug"


              className="
                w-full

                rounded-xl


                border

                border-white/10


                bg-slate-950/70


                px-4

                py-3


                text-white


                placeholder:text-slate-500


                outline-none


                transition


                focus:border-cyan-400
              "

            />



          </div>









          {/* CATEGORY */}




          <div
            className="
              mt-6

              space-y-2
            "
          >


            <label
              className="
                text-sm

                font-semibold

                text-slate-300
              "
            >
              Category
            </label>





            <select

              value={formData.category}

              onChange={(e)=>

                updateField(

                  "category",

                  e.target.value as
                  "Journal" |
                  "Tenders"

                )

              }



              className="
                w-full

                rounded-xl


                border

                border-white/10


                bg-slate-950/70


                px-4

                py-3


                text-white


                outline-none


                focus:border-cyan-400
              "
            >


              <option value="Journal">
                Journal
              </option>



              <option value="Tenders">
                Tenders
              </option>


            </select>


          </div>









          {/* DESCRIPTION */}




          <div
            className="
              mt-6

              space-y-2
            "
          >


            <label
              className="
                text-sm

                font-semibold

                text-slate-300
              "
            >
              Description
            </label>





            <textarea

              rows={7}

              value={formData.description}

              onChange={(e)=>

                updateField(
                  "description",
                  e.target.value
                )

              }


              placeholder="Write publication details..."


              className="
                w-full

                resize-none


                rounded-xl


                border

                border-white/10


                bg-slate-950/70


                px-4

                py-3


                text-white


                placeholder:text-slate-500


                outline-none


                transition


                focus:border-cyan-400
              "

            />


          </div>
                    {/* PDF UPLOAD */}


          <div
            className="
              mt-6
            "
          >

            <PublicationPDFUpload

              pdf={formData.pdf}

              onChange={(url)=>
                updateField(
                  "pdf",
                  url
                )
              }

            />


          </div>









          {/* DATE + TIME */}


          <div
            className="
              mt-6

              grid

              gap-5

              md:grid-cols-2
            "
          >



            <div
              className="
                space-y-2
              "
            >

              <label
                className="
                  text-sm

                  font-semibold

                  text-slate-300
                "
              >
                Publication Date
              </label>


              <input

                type="date"

                value={formData.date}

                onChange={(e)=>

                  updateField(
                    "date",
                    e.target.value
                  )

                }


                className="
                  w-full

                  rounded-xl


                  border

                  border-white/10


                  bg-slate-950/70


                  px-4

                  py-3


                  text-white


                  outline-none


                  focus:border-cyan-400
                "

              />


            </div>







            <div
              className="
                space-y-2
              "
            >

              <label
                className="
                  text-sm

                  font-semibold

                  text-slate-300
                "
              >
                Publication Time
              </label>



              <input

                type="text"

                value={formData.time}

                onChange={(e)=>

                  updateField(
                    "time",
                    e.target.value
                  )

                }


                placeholder="3:30 PM"


                className="
                  w-full

                  rounded-xl


                  border

                  border-white/10


                  bg-slate-950/70


                  px-4

                  py-3


                  text-white


                  placeholder:text-slate-500


                  outline-none


                  focus:border-cyan-400
                "

              />


            </div>



          </div>









          {/* ORDER */}



          <div
            className="
              mt-6

              space-y-2
            "
          >


            <label
              className="
                text-sm

                font-semibold

                text-slate-300
              "
            >
              Display Order
            </label>



            <input

              type="number"

              min={0}

              value={formData.order}


              onChange={(e)=>

                updateField(

                  "order",

                  Number(
                    e.target.value
                  )

                )

              }



              className="
                w-full

                rounded-xl


                border

                border-white/10


                bg-slate-950/70


                px-4

                py-3


                text-white


                outline-none


                focus:border-cyan-400
              "

            />


          </div>









          {/* STATUS */}



          <div
            className="
              mt-6

              space-y-2
            "
          >


            <label
              className="
                text-sm

                font-semibold

                text-slate-300
              "
            >
              Publication Status
            </label>




            <select

              value={
                String(
                  formData.isPublished
                )
              }


              onChange={(e)=>

                updateField(

                  "isPublished",

                  e.target.value === "true"

                )

              }



              className="
                w-full

                rounded-xl


                border

                border-white/10


                bg-slate-950/70


                px-4

                py-3


                text-white


                outline-none


                focus:border-cyan-400
              "
            >


              <option value="true">
                Published
              </option>


              <option value="false">
                Unpublished
              </option>



            </select>


          </div>









          {/* SUBMIT BUTTON */}



          <div
            className="
              mt-8

              flex

              flex-col

              gap-4


              border-t

              border-white/10


              pt-6


              sm:flex-row

              sm:justify-end
            "
          >



            <button

              type="button"

              onClick={()=>
                router.back()
              }


              disabled={submitting}


              className="
                rounded-xl


                border

                border-white/10


                bg-slate-800


                px-6


                py-3


                font-semibold


                text-slate-200


                transition


                hover:bg-slate-700


                disabled:opacity-50
              "

            >

              Cancel

            </button>







            <button

              type="submit"

              disabled={submitting}


              className="
                rounded-xl


                bg-gradient-to-r


                from-cyan-500


                to-blue-600


                px-7


                py-3


                font-semibold


                text-white


                shadow-lg


                shadow-cyan-500/20


                transition


                hover:scale-[1.02]


                disabled:opacity-50
              "

            >

              {
                submitting

                ?

                "Saving..."

                :

                isEditMode

                ?

                "Update Publication"

                :

                "Create Publication"
              }


            </button>



          </div>



        </div>
        

        {/* ================= RIGHT SIDE ================= */}



        <div
          className="
            xl:sticky

            xl:top-6

            self-start
          "
        >



          <div
            className="
              rounded-3xl


              border

              border-white/10


              bg-slate-900/70


              p-6


              shadow-[0_25px_80px_rgba(0,0,0,0.35)]


              backdrop-blur-xl
            "
          >




            <h2
              className="
                mb-6

                text-xl

                font-bold

                text-white
              "
            >

              Live Preview

            </h2>





            <PublicationPreview

              title={
                formData.title
              }


              category={
                formData.category
              }


              description={
                formData.description
              }


              pdf={
                formData.pdf
              }


              date={
                formData.date
              }


              time={
                formData.time
              }


              order={
                formData.order
              }


              isPublished={
                formData.isPublished
              }


            />



          </div>




        </div>





      </div>



    </form>

  );


}