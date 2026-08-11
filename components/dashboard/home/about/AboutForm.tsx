"use client";


import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";


import {
  Loader2,
  Save,
  Upload,
  X,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";


import {
  toast,
} from "sonner";


import type {
  AboutData,
} from "./AboutTableRow";





interface AboutFormProps {

  initialData?: AboutData | null;

  onSuccess?: (
    data: AboutData
  ) => void;


  onDataChange?: (
    data: AboutFormData
  ) => void;

}







export interface AboutFormData {


  tagline:string;


  title:string;


  highlightText:string;



  descriptionOne:string;


  descriptionTwo:string;



  imageOne:string;


  imageTwo:string;


  logo:string;




  missionTitle:string;


  missionLink:string;



  visionTitle:string;


  visionLink:string;



  buttonText:string;


  buttonLink:string;



  isActive:boolean;

}








const defaultFormData:AboutFormData = {


  tagline:"",


  title:"",


  highlightText:"",




  descriptionOne:"",


  descriptionTwo:"",




  imageOne:"",


  imageTwo:"",


  logo:"",




  missionTitle:"",


  missionLink:"",



  visionTitle:"",


  visionLink:"",




  buttonText:
    "View Our Program",


  buttonLink:"",




  isActive:true,


};









export default function AboutForm({


  initialData=null,


  onSuccess,


  onDataChange,

}:AboutFormProps){







  const [
    formData,
    setFormData
  ] = useState<AboutFormData>(



    initialData

    ?

    {


      tagline:
        initialData.tagline || "",



      title:
        initialData.title || "",



      highlightText:
        initialData.highlightText || "",





      descriptionOne:
        initialData.descriptionOne || "",



      descriptionTwo:
        initialData.descriptionTwo || "",





      imageOne:
        initialData.imageOne || "",



      imageTwo:
        initialData.imageTwo || "",



      logo:
        initialData.logo || "",






      missionTitle:
        initialData.missionTitle || "",



      missionLink:
        initialData.missionLink || "",






      visionTitle:
        initialData.visionTitle || "",



      visionLink:
        initialData.visionLink || "",





      buttonText:
        initialData.buttonText ||
        "View Our Program",



      buttonLink:
        initialData.buttonLink || "",





      isActive:
        initialData.isActive ?? true,



    }


    :

    defaultFormData


  );









  const [
    saving,
    setSaving
  ] = useState(false);






  const [
    uploading,
    setUploading
  ] = useState<

    | "imageOne"

    | "imageTwo"

    | "logo"

    | null

  >(null);









  // LIVE PREVIEW DATA



  useEffect(()=>{


    onDataChange?.(
      formData
    );


  },[
    formData,
    onDataChange
  ]);
    // ===============================
  // HANDLE INPUT CHANGE
  // ===============================


  const handleChange = (
    event:
      ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement
      >
  ) => {


    const {
      name,
      value
    } = event.target;



    setFormData((previous)=>({

      ...previous,

      [name]:value,

    }));


  };








  // ===============================
  // IMAGE UPLOAD
  // ===============================


  const handleImageUpload = async (

    event:
      ChangeEvent<HTMLInputElement>,


    field:
      | "imageOne"
      | "imageTwo"
      | "logo"

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


      event.target.value="";


      return;

    }







    if(file.size > 5 * 1024 * 1024){


      toast.error(
        "Image size must be less than 5MB."
      );


      event.target.value="";


      return;

    }







    try{


      setUploading(field);





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







      setFormData((previous)=>({

        ...previous,

        [field]:
          data.url,

      }));






      toast.success(
        "Image uploaded successfully."
      );





    }


    catch(error){


      console.error(
        "ABOUT IMAGE UPLOAD ERROR:",
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


      setUploading(null);


      event.target.value="";


    }



  };









  // ===============================
  // REMOVE IMAGE
  // ===============================


  const removeImage = (

    field:
      | "imageOne"
      | "imageTwo"
      | "logo"

  )=>{


    setFormData((previous)=>({


      ...previous,


      [field]:"",


    }));


  };









  // ===============================
  // SUBMIT FORM
  // ===============================


  const handleSubmit = async (

    event:
      FormEvent<HTMLFormElement>

  )=>{


    event.preventDefault();







    if(!formData.title.trim()){


      toast.error(
        "Please enter the About title."
      );


      return;

    }







    if(!formData.highlightText.trim()){


      toast.error(
        "Please enter the highlight text."
      );


      return;


    }







    if(!formData.descriptionOne.trim()){


      toast.error(
        "Please enter Description 1."
      );


      return;


    }







    if(!formData.descriptionTwo.trim()){


      toast.error(
        "Please enter Description 2."
      );


      return;


    }







    if(!formData.imageOne){


      toast.error(
        "Please upload Left Image 1."
      );


      return;


    }







    if(!formData.imageTwo){


      toast.error(
        "Please upload Left Image 2."
      );


      return;


    }







    if(!formData.logo){


      toast.error(
        "Please upload the UAMC logo."
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
          "/api/about",
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
              JSON.stringify(
                formData
              ),


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

          "Failed to save About section."

        );


      }







      toast.success(

        isEdit

        ?

        "About section updated successfully."

        :

        "About section created successfully."

      );








      onSuccess?.(
        data.data
      );






    }


    catch(error){


      console.error(
        "SAVE ABOUT ERROR:",
        error
      );



      toast.error(

        error instanceof Error

        ?

        error.message

        :

        "Failed to save About section."

      );



    }


    finally{


      setSaving(false);


    }



  };
    // ===============================
  // IMAGE UPLOAD COMPONENT
  // ===============================


  const renderImageUpload = (

    field:
      | "imageOne"
      | "imageTwo"
      | "logo",


    label:string,


    description:string

  )=>{


    const imageUrl =
      formData[field];



    const isUploading =
      uploading === field;





    return (

      <div
        className="
          space-y-3
        "
      >



        <div>


          <label
            className="
              block

              text-sm

              font-semibold

              text-slate-200
            "
          >

            {label}

          </label>



          <p
            className="
              mt-1

              text-xs

              text-slate-400
            "
          >

            {description}

          </p>


        </div>








        {
          imageUrl

          ?

          (

            <div
              className="
                relative

                overflow-hidden

                rounded-2xl


                border

                border-white/10


                bg-slate-950/60
              "
            >



              <img

                src={imageUrl}

                alt={label}


                className={`
                  w-full

                  object-cover


                  ${
                    field==="logo"

                    ?

                    "h-40 object-contain p-5"

                    :

                    "h-52"
                  }

                `}

              />







              <button

                type="button"


                onClick={()=>removeImage(field)}


                className="
                  absolute

                  right-3

                  top-3


                  flex

                  h-9

                  w-9


                  items-center

                  justify-center


                  rounded-full


                  bg-red-500/20


                  text-red-400


                  backdrop-blur-md


                  transition


                  hover:bg-red-500/30
                "

              >

                <X size={17}/>


              </button>



            </div>


          )



          :



          (

            <label

              className="
                flex

                min-h-[190px]

                cursor-pointer

                flex-col

                items-center

                justify-center


                rounded-2xl


                border-2


                border-dashed


                border-white/20


                bg-slate-950/60


                px-5


                text-center


                transition


                hover:border-emerald-400
              "

            >



              {
                isUploading

                ?

                (

                  <>


                    <Loader2

                      size={30}

                      className="
                        animate-spin

                        text-emerald-400
                      "

                    />



                    <p
                      className="
                        mt-3

                        text-sm

                        font-semibold

                        text-white
                      "
                    >

                      Uploading...

                    </p>



                  </>


                )



                :


                (

                  <>


                    <div

                      className="
                        flex

                        h-14

                        w-14


                        items-center

                        justify-center


                        rounded-2xl


                        bg-emerald-400/10


                        text-emerald-400
                      "

                    >

                      <Upload size={25}/>


                    </div>





                    <p

                      className="
                        mt-4

                        text-sm

                        font-semibold

                        text-white
                      "

                    >

                      Click to upload

                    </p>




                    <p

                      className="
                        mt-1

                        text-xs

                        text-slate-400
                      "

                    >

                      PNG, JPG or WEBP up to 5MB

                    </p>



                  </>


                )

              }





              <input

                type="file"

                accept="
                  image/png,
                  image/jpeg,
                  image/webp
                "

                className="hidden"


                disabled={isUploading}


                onChange={(event)=>

                  handleImageUpload(

                    event,

                    field

                  )

                }

              />



            </label>


          )

        }




      </div>

    );


  };












  return (

    <form

      onSubmit={handleSubmit}


      className="
        w-full

        space-y-6
      "

    >








      {/* ===============================
          BASIC INFORMATION
      =============================== */}




      <div

        className="
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



        <div
          className="
            mb-6
          "
        >


          <h2
            className="
              text-xl

              font-bold

              text-white
            "
          >

            About Information

          </h2>



          <p
            className="
              mt-2

              text-sm

              text-slate-400
            "
          >

            Manage the main About UAMC content.

          </p>


        </div>









        <div
          className="
            grid

            gap-5
          "
        >







          {/* TAGLINE */}



          <div>


            <label

              className="
                mb-2

                block

                text-sm

                font-semibold

                text-slate-200
              "

            >

              Small Tagline

            </label>




            <input

              name="tagline"


              value={formData.tagline}


              onChange={handleChange}


              placeholder="knowledge meets innovation"



              className="
                h-12

                w-full


                rounded-xl


                border


                border-white/10


                bg-slate-950/70


                px-4


                text-sm


                text-white


                outline-none


                placeholder:text-slate-500


                focus:border-emerald-400


                focus:ring-2


                focus:ring-emerald-400/20
              "

            />


          </div>








          {/* TITLE + HIGHLIGHT */}



          <div

            className="
              grid

              gap-5


              sm:grid-cols-2
            "

          >


            <input

              name="title"


              value={formData.title}


              onChange={handleChange}


              placeholder="Main Title"


              className="
                h-12

                rounded-xl


                border


                border-white/10


                bg-slate-950/70


                px-4


                text-sm


                text-white


                outline-none


                focus:border-emerald-400
              "

            />





            <input

              name="highlightText"


              value={formData.highlightText}


              onChange={handleChange}


              placeholder="Highlight Text"


              className="
                h-12

                rounded-xl


                border


                border-white/10


                bg-slate-950/70


                px-4


                text-sm


                text-white


                outline-none


                focus:border-emerald-400
              "

            />



          </div>







          {/* DESCRIPTION 1 */}



          <textarea


            name="descriptionOne"


            value={formData.descriptionOne}


            onChange={handleChange}


            rows={5}


            placeholder="Enter Description 1"


            className="
              w-full

              resize-y


              rounded-xl


              border


              border-white/10


              bg-slate-950/70


              px-4


              py-3


              text-sm


              text-white


              outline-none


              focus:border-emerald-400
            "

          />







          {/* DESCRIPTION 2 */}



          <textarea


            name="descriptionTwo"


            value={formData.descriptionTwo}


            onChange={handleChange}


            rows={5}


            placeholder="Enter Description 2"


            className="
              w-full

              resize-y


              rounded-xl


              border


              border-white/10


              bg-slate-950/70


              px-4


              py-3


              text-sm


              text-white


              outline-none


              focus:border-emerald-400
            "

          />





        </div>


      </div>
            {/* ===============================
          IMAGES SECTION
      =============================== */}



      <div
        className="
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


        <div
          className="
            mb-6
          "
        >

          <h2
            className="
              text-xl

              font-bold

              text-white
            "
          >

            About Images

          </h2>



          <p
            className="
              mt-2

              text-sm

              text-slate-400
            "
          >

            Upload images used in the About section.

          </p>


        </div>






        <div
          className="
            grid

            gap-6


            lg:grid-cols-3
          "
        >



          {renderImageUpload(

            "imageOne",

            "Image One",

            "Main About image"

          )}




          {renderImageUpload(

            "imageTwo",

            "Image Two",

            "Secondary About image"

          )}





          {renderImageUpload(

            "logo",

            "UAMC Logo",

            "Upload organization logo"

          )}





        </div>


      </div>









      {/* ===============================
          MISSION & VISION
      =============================== */}




      <div
        className="
          grid

          gap-6


          lg:grid-cols-2
        "
      >








        {/* MISSION */}



        <div
          className="
            rounded-3xl


            border


            border-white/10


            bg-slate-900/70


            p-5


            shadow-xl


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

            Mission

          </h2>







          <div
            className="
              space-y-4
            "
          >



            <input

              name="missionTitle"


              value={
                formData.missionTitle
              }


              onChange={handleChange}


              placeholder="Mission Title"


              className="
                h-12

                w-full


                rounded-xl


                border


                border-white/10


                bg-slate-950/70


                px-4


                text-sm


                text-white


                outline-none


                focus:border-emerald-400
              "

            />





            <div
              className="
                relative
              "
            >



              <LinkIcon

                size={17}

                className="
                  absolute

                  left-4

                  top-1/2

                  -translate-y-1/2

                  text-slate-500
                "

              />



              <input

                name="missionLink"


                value={
                  formData.missionLink
                }


                onChange={handleChange}


                placeholder="Mission Link"


                className="
                  h-12

                  w-full


                  rounded-xl


                  border


                  border-white/10


                  bg-slate-950/70


                  pl-11


                  pr-4


                  text-sm


                  text-white


                  outline-none


                  focus:border-emerald-400
                "

              />



            </div>



          </div>




        </div>









        {/* VISION */}



        <div
          className="
            rounded-3xl


            border


            border-white/10


            bg-slate-900/70


            p-5


            shadow-xl


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

            Vision

          </h2>







          <div
            className="
              space-y-4
            "
          >



            <input

              name="visionTitle"


              value={
                formData.visionTitle
              }


              onChange={handleChange}


              placeholder="Vision Title"


              className="
                h-12

                w-full


                rounded-xl


                border


                border-white/10


                bg-slate-950/70


                px-4


                text-sm


                text-white


                outline-none


                focus:border-emerald-400
              "

            />






            <div
              className="
                relative
              "
            >


              <LinkIcon

                size={17}

                className="
                  absolute

                  left-4

                  top-1/2

                  -translate-y-1/2

                  text-slate-500
                "

              />




              <input

                name="visionLink"


                value={
                  formData.visionLink
                }


                onChange={handleChange}


                placeholder="Vision Link"


                className="
                  h-12

                  w-full


                  rounded-xl


                  border


                  border-white/10


                  bg-slate-950/70


                  pl-11


                  pr-4


                  text-sm


                  text-white


                  outline-none


                  focus:border-emerald-400
                "

              />



            </div>




          </div>





        </div>






      </div>
            {/* ===============================
          BUTTON SETTINGS
      =============================== */}



      <div
        className="
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



        <h2
          className="
            mb-5

            text-xl

            font-bold

            text-white
          "
        >

          Button Settings

        </h2>







        <div
          className="
            grid

            gap-5


            sm:grid-cols-2
          "
        >




          <input

            name="buttonText"


            value={
              formData.buttonText
            }


            onChange={handleChange}


            placeholder="Button Text"


            className="
              h-12


              rounded-xl


              border


              border-white/10


              bg-slate-950/70


              px-4


              text-sm


              text-white


              outline-none


              focus:border-emerald-400
            "

          />







          <input

            name="buttonLink"


            value={
              formData.buttonLink
            }


            onChange={handleChange}


            placeholder="Button Link"


            className="
              h-12


              rounded-xl


              border


              border-white/10


              bg-slate-950/70


              px-4


              text-sm


              text-white


              outline-none


              focus:border-emerald-400
            "

          />



        </div>





      </div>









      {/* ===============================
          STATUS
      =============================== */}




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


          sm:p-6
        "
      >





        <div>


          <h2
            className="
              text-lg

              font-bold

              text-white
            "
          >

            Publish Status

          </h2>



          <p
            className="
              mt-1

              text-sm

              text-slate-400
            "
          >

            Control whether this About section is visible.

          </p>



        </div>









        <button

          type="button"


          onClick={()=>


            setFormData((previous)=>({


              ...previous,


              isActive:
                !previous.isActive


            }))


          }


          className={`
            relative

            h-8

            w-16

            rounded-full


            transition


            ${
              formData.isActive

              ?

              "bg-emerald-500"

              :

              "bg-slate-700"

            }
          `}

        >


          <span

            className={`
              absolute

              top-1

              h-6

              w-6

              rounded-full

              bg-white


              transition


              ${
                formData.isActive

                ?

                "left-9"

                :

                "left-1"

              }
            `}

          />


        </button>





      </div>









      {/* ===============================
          SAVE BUTTON
      =============================== */}




      <button

        type="submit"


        disabled={saving}


        className="
          inline-flex


          w-full


          items-center


          justify-center


          gap-3


          rounded-2xl


          bg-gradient-to-r


          from-emerald-500


          to-cyan-500


          px-6


          py-4


          text-sm


          font-bold


          text-white


          shadow-lg


          shadow-emerald-500/20


          transition


          hover:scale-[1.01]


          disabled:cursor-not-allowed


          disabled:opacity-60
        "

      >



        {
          saving

          ?

          (

            <>

              <Loader2

                size={20}

                className="animate-spin"

              />

              Saving...

            </>


          )


          :


          (

            <>

              <Save

                size={20}

              />

              Save About Section

            </>


          )

        }




      </button>





    </form>

  );


}