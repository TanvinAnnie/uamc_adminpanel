"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import NoticePdfUpload from "./NoticePdfUpload";
import NoticePreview from "./NoticePreview";


interface NoticeFormProps {
  initialData?: {
    _id?: string;

    title: string;

    slug: string;

    category:
      | "General Notice"
      | "Admission Notice"
      | "Reports"
      | "Job Circular";

    description: string;

    pdf: string;

    date: string;

    time: string;

    isPublished: boolean;

    order: number;
  };
}


export default function NoticeForm({
  initialData,
}: NoticeFormProps) {


  const router = useRouter();


  const [loading, setLoading] =
    useState(false);



  const [formData, setFormData] =
    useState({

      title:
        initialData?.title ?? "",


      slug:
        initialData?.slug ?? "",


      category:
        initialData?.category ??
        "General Notice",


      description:
        initialData?.description ?? "",


      pdf:
        initialData?.pdf ?? "",


      date:
        initialData?.date
          ? new Date(initialData.date)
              .toISOString()
              .split("T")[0]
          : "",


      time:
        initialData?.time ?? "",


      isPublished:
        initialData?.isPublished ?? true,


      order:
        initialData?.order ?? 0,

    });



  const handleChange = (
    e:
      React.ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
      >
  ) => {


    const {
      name,
      value,
    } = e.target;



    setFormData((prev)=>({

      ...prev,


      [name]:
        name === "order"
          ? Number(value)
          : value,

    }));

  };




  const handlePdfChange = (
    url:string
  ) => {


    setFormData((prev)=>({

      ...prev,

      pdf:url,

    }));

  };





  const handleSubmit = async (
    e:
      React.FormEvent<HTMLFormElement>
  ) => {


    e.preventDefault();



    try {


      setLoading(true);



      const endpoint =
        initialData?._id

        ? `/api/notices/${initialData._id}`

        : "/api/notices";




      const method =
        initialData?._id

        ? "PATCH"

        : "POST";





      const res =
        await fetch(
          endpoint,
          {

            method,

            headers:{
              "Content-Type":
                "application/json",
            },


            body:
              JSON.stringify(formData),

          }
        );





      const result =
        await res.json();





      if(!res.ok){

        throw new Error(
          result.message ||
          "Operation failed."
        );

      }





      toast.success(
        result.message
      );



      router.push(
        "/dashboard/home/notices"
      );



      router.refresh();



    }

    catch(error){


      console.error(error);



      toast.error(

        error instanceof Error

        ? error.message

        : "Something went wrong."

      );


    }

    finally{


      setLoading(false);


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


        {/* ================= LEFT FORM ================= */}


        <div
          className="
            rounded-3xl

            border
            border-white/10

            bg-slate-900/70

            p-6
            lg:p-8

            shadow-[0_25px_80px_rgba(0,0,0,0.35)]

            backdrop-blur-xl
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
              Notice Information
            </h2>


            <p
              className="
                mt-2
                text-sm
                text-slate-400
              "
            >
              Create and manage notice details
            </p>


          </div>




          {/* Title */}

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
              Notice Title
            </label>


            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter notice title"
              required
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





          {/* Slug */}


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
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="notice-slug"
              required

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


            <p
              className="
                text-xs
                text-slate-500
              "
            >
              Example: annual-admission-notice
            </p>


          </div>





          {/* Category */}


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
              name="category"
              value={formData.category}
              onChange={handleChange}
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

              <option>
                General Notice
              </option>

              <option>
                Admission Notice
              </option>

              <option>
                Reports
              </option>

              <option>
                Job Circular
              </option>


            </select>


          </div>





          {/* Date + Time */}


          <div
            className="
              mt-6

              grid

              gap-5

              md:grid-cols-2
            "
          >

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
                Date
              </label>


              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}

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
                Time
              </label>


              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}

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
                  outline-none
                  focus:border-cyan-400
                "
              />


            </div>


          </div>

                    {/* Description */}

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
              Notice Details
            </label>


            <textarea
              rows={8}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write full notice details..."

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




          {/* PDF Upload */}

          <div
            className="
              mt-6
            "
          >

            <NoticePdfUpload
              pdf={formData.pdf}
              onChange={handlePdfChange}
            />

          </div>


        </div>
        {/* END LEFT CARD */}





        {/* ================= RIGHT SIDE ================= */}


        <div
          className="
            space-y-6

            xl:sticky

            xl:top-6

            self-start
          "
        >



          {/* Preview */}

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
                mb-5

                text-xl

                font-bold

                text-white
              "
            >
              Live Preview
            </h2>


            <NoticePreview
              title={formData.title}
              category={formData.category}
              description={formData.description}
              pdf={formData.pdf}
              date={formData.date}
              time={formData.time}
              isPublished={formData.isPublished}
              order={formData.order}
            />


          </div>





          {/* Settings Card */}


          <div
            className="
              rounded-3xl

              border
              border-white/10

              bg-slate-900/70

              p-6

              shadow-xl
            "
          >


            {/* Order */}


            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-300
              "
            >
              Display Order
            </label>


            <input
              type="number"
              name="order"
              min={0}
              value={formData.order}
              onChange={handleChange}

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





            {/* Status */}


            <label
              className="
                mt-6
                mb-2
                block

                text-sm

                font-semibold

                text-slate-300
              "
            >
              Status
            </label>


            <select

              name="isPublished"

              value={String(formData.isPublished)}

              onChange={(e)=>

                setFormData((prev)=>({

                  ...prev,

                  isPublished:
                    e.target.value === "true"

                }))

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



        </div>


      </div>





      {/* ================= BUTTONS ================= */}


      <div
        className="
          flex

          flex-col-reverse

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

          onClick={()=>router.back()}

          disabled={loading}

          className="
            rounded-xl

            border

            border-white/10

            bg-slate-900

            px-7

            py-3

            font-semibold

            text-slate-300

            transition

            hover:bg-slate-800

            disabled:opacity-50
          "
        >

          Cancel

        </button>





        <button

          type="submit"

          disabled={loading}


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
            loading

            ? "Saving..."

            : initialData?._id

            ? "Update Notice"

            : "Create Notice"
          }


        </button>



      </div>



    </form>
  );
}