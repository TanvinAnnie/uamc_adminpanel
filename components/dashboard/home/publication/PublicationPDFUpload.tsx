"use client";


import {
  FileText,
  Loader2,
  Upload,
  Trash2,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  useRef,
  useState,
} from "react";



interface PublicationPDFUploadProps {

  pdf:string;

  onChange:(url:string)=>void;

}





export default function PublicationPDFUpload({

  pdf,

  onChange,

}:PublicationPDFUploadProps){



  const inputRef =
    useRef<HTMLInputElement>(null);



  const [uploading,setUploading] =
    useState(false);






  // ==========================
  // UPLOAD PDF
  // ==========================


  const handleUpload = async(
    e:React.ChangeEvent<HTMLInputElement>
  )=>{


    try{


      const file =
        e.target.files?.[0];



      if(!file)
        return;





      if(file.type !== "application/pdf"){


        toast.error(
          "Only PDF files are allowed."
        );


        e.target.value="";


        return;

      }







      const maxSize =
        10 * 1024 * 1024;




      if(file.size > maxSize){


        toast.error(
          "PDF size must be less than 10MB."
        );


        e.target.value="";


        return;


      }






      setUploading(true);





      const formData =
        new FormData();



      formData.append(
        "file",
        file
      );







      const res =
        await fetch(
          "/api/upload",
          {
            method:"POST",
            body:formData,
          }
        );





      const result =
        await res.json();







      if(!res.ok){


        throw new Error(
          result.message ||
          "PDF upload failed."
        );


      }







      if(!result.url){


        throw new Error(
          "Upload URL was not returned."
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

        ?

        error.message

        :

        "PDF upload failed."

      );


    }


    finally{


      setUploading(false);



      if(inputRef.current){

        inputRef.current.value="";

      }


    }


  };








  // ==========================
  // REMOVE PDF
  // ==========================


  const handleRemove =()=>{


    onChange("");



    toast.success(
      "PDF removed."
    );


  };








  return (

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



      {/* HEADER */}



      <div>


        <h2
          className="
            text-xl

            font-bold

            text-white
          "
        >

          Publication PDF

        </h2>




        <p
          className="
            mt-2

            text-sm

            text-slate-400
          "
        >

          Upload the PDF document for this publication.

        </p>


      </div>







      {/* INPUT */}


      <input

        ref={inputRef}

        type="file"

        accept="application/pdf,.pdf"

        hidden

        onChange={handleUpload}

      />








      {!pdf ? (



        <button

          type="button"

          disabled={uploading}


          onClick={()=>
            inputRef.current?.click()
          }


          className="
            group

            mt-6

            flex

            min-h-52

            w-full

            flex-col

            items-center

            justify-center


            rounded-3xl


            border-2


            border-dashed


            border-white/20


            bg-slate-950/60


            px-6


            transition


            hover:border-cyan-400/60


            hover:bg-slate-900


            disabled:cursor-not-allowed


            disabled:opacity-60
          "

        >



          {
            uploading

            ?

            <>


              <Loader2

                size={42}

                className="
                  animate-spin

                  text-cyan-400
                "

              />



              <span
                className="
                  mt-5

                  font-semibold

                  text-white
                "
              >

                Uploading PDF...

              </span>



              <span
                className="
                  mt-1

                  text-sm

                  text-slate-400
                "
              >

                Please wait

              </span>



            </>



            :


            <>



              <div
                className="
                  flex

                  h-20

                  w-20

                  items-center

                  justify-center


                  rounded-3xl


                  bg-cyan-400/10


                  text-cyan-400
                "
              >

                <Upload size={38}/>


              </div>





              <span
                className="
                  mt-5

                  text-lg

                  font-bold

                  text-white
                "
              >

                Click to Upload PDF

              </span>




              <span
                className="
                  mt-2

                  text-sm

                  text-slate-400
                "
              >

                PDF only • Maximum 10MB

              </span>



            </>


          }




        </button>



      )





      :



      (



        <div
          className="
            mt-6

            overflow-hidden

            rounded-3xl

            border

            border-white/10

            bg-slate-950/60
          "
        >




          <div
            className="
              flex

              items-center

              gap-4

              p-5
            "
          >




            {/* ICON */}


            <div
              className="
                flex

                h-14

                w-14

                shrink-0

                items-center

                justify-center


                rounded-2xl


                bg-red-500/10


                text-red-400
              "
            >

              <FileText size={28}/>


            </div>







            {/* INFO */}



            <div
              className="
                min-w-0

                flex-1
              "
            >

              <p
                className="
                  font-semibold

                  text-white
                "
              >

                Publication PDF

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







            {/* REMOVE */}



            <button

              type="button"

              onClick={handleRemove}


              className="
                flex

                h-10

                w-10

                shrink-0

                items-center

                justify-center


                rounded-xl


                bg-red-500/10


                text-red-400


                transition


                hover:bg-red-500/20
              "

              title="Remove PDF"

            >

              <Trash2 size={18}/>


            </button>



          </div>








          {/* URL */}



          <div
            className="
              border-t

              border-white/10

              bg-slate-900/70

              px-5

              py-3
            "
          >

            <p
              className="
                truncate

                text-xs

                text-slate-400
              "
            >

              {pdf}

            </p>


          </div>




        </div>



      )



      }



    </div>

  );


}