"use client";


import {
  ChangeEvent,
  useRef,
  useState,
} from "react";

import {
  FileText,
  Upload,
  X,
  ExternalLink,
} from "lucide-react";

import { toast } from "sonner";



interface NoticePdfUploadProps {
  pdf: string;
  onChange: (url: string) => void;
}



export default function NoticePdfUpload({
  pdf,
  onChange,
}: NoticePdfUploadProps) {


  const inputRef =
    useRef<HTMLInputElement | null>(null);



  const [uploading, setUploading] =
    useState(false);




  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {


    const file =
      e.target.files?.[0];



    if (!file) return;




    if (
      file.type !==
      "application/pdf"
    ) {

      toast.error(
        "Please select a PDF file."
      );

      e.target.value = "";

      return;
    }





    const maxSize =
      10 * 1024 * 1024;



    if(file.size > maxSize){

      toast.error(
        "PDF file must be smaller than 10MB."
      );

      e.target.value = "";

      return;

    }




    try {


      setUploading(true);



      const formData =
        new FormData();


      formData.append(
        "file",
        file
      );


      formData.append(
        "type",
        "pdf"
      );




      const response =
        await fetch(
          "/api/upload",
          {
            method:"POST",
            body:formData,
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
          "PDF upload failed."
        );

      }



      onChange(
        result.url
      );



      toast.success(
        "PDF uploaded successfully."
      );


    }

    catch(error){


      console.error(
        "PDF UPLOAD ERROR:",
        error
      );


      toast.error(

        error instanceof Error

        ? error.message

        : "PDF upload failed."

      );


    }

    finally{


      setUploading(false);



      if(inputRef.current){

        inputRef.current.value = "";

      }

    }

  };






  const handleRemove = () => {


    onChange("");

    toast.success(
      "PDF removed."
    );


  };





  return (

    <div
      className="
        space-y-4
      "
    >


      {/* Label */}

      <label
        className="
          text-sm
          font-semibold
          text-slate-300
        "
      >
        Notice PDF
      </label>




      {!pdf ? (

        <div
          className="
            group

            rounded-3xl

            border

            border-dashed

            border-white/20

            bg-slate-950/60

            p-8

            transition

            hover:border-cyan-400/60

            hover:bg-slate-900/80
          "
        >


          <div
            className="
              flex
              flex-col
              items-center
              text-center
            "
          >



            {/* Icon */}

            <div
              className="
                flex

                h-20

                w-20

                items-center

                justify-center


                rounded-3xl


                border

                border-red-400/20


                bg-red-500/10


                text-red-400
              "
            >

              <FileText
                size={38}
              />

            </div>




            <h3
              className="
                mt-6

                text-lg

                font-bold

                text-white
              "
            >
              Upload Notice PDF
            </h3>




            <p
              className="
                mt-2

                text-sm

                text-slate-400
              "
            >
              PDF only • Maximum size 10MB
            </p>





            <button
              type="button"

              disabled={uploading}

              onClick={() =>
                inputRef.current?.click()
              }


              className="
                mt-6

                inline-flex

                items-center

                gap-2


                rounded-xl


                bg-gradient-to-r

                from-cyan-500

                to-blue-600


                px-6

                py-3


                text-sm

                font-semibold


                text-white


                shadow-lg

                shadow-cyan-500/20


                transition


                hover:scale-105


                disabled:opacity-50
              "
            >

              <Upload size={18}/>


              {
                uploading
                ? "Uploading..."
                : "Choose PDF"
              }

            </button>




            <input
              ref={inputRef}

              type="file"

              accept="application/pdf,.pdf"

              onChange={handleFileChange}

              className="hidden"
            />



          </div>



        </div>


      ) : (


        <div
          className="
            flex

            flex-col

            gap-5


            rounded-3xl


            border

            border-white/10


            bg-slate-900/70


            p-5


            shadow-xl


            backdrop-blur-xl


            sm:flex-row

            sm:items-center

            sm:justify-between
          "
        >



          {/* PDF Info */}


          <div
            className="
              flex

              items-center

              gap-4
            "
          >


            <div
              className="
                flex

                h-14

                w-14

                items-center

                justify-center


                rounded-2xl


                bg-red-500/10


                text-red-400
              "
            >

              <FileText size={28}/>

            </div>



            <div>


              <p
                className="
                  font-semibold

                  text-white
                "
              >
                Notice PDF
              </p>



              <p
                className="
                  mt-1

                  text-sm

                  text-emerald-400
                "
              >
                PDF uploaded successfully
              </p>


            </div>


          </div>






          {/* Actions */}


          <div
            className="
              flex

              items-center

              gap-3
            "
          >


            <a
              href={pdf}

              target="_blank"

              rel="noopener noreferrer"


              className="
                inline-flex

                items-center

                gap-2


                rounded-xl


                border

                border-white/10


                bg-slate-800


                px-4

                py-2


                text-sm

                font-medium


                text-slate-200


                transition


                hover:bg-slate-700
              "
            >

              <ExternalLink size={16}/>

              View

            </a>





            <button
              type="button"

              onClick={handleRemove}


              className="
                inline-flex

                items-center

                gap-2


                rounded-xl


                bg-red-500/10


                px-4

                py-2


                text-sm


                font-medium


                text-red-400


                transition


                hover:bg-red-500/20
              "
            >

              <X size={16}/>

              Remove

            </button>



          </div>



        </div>


      )}


    </div>

  );

}