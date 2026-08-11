"use client";


import Link from "next/link";


import {
  ArrowRight,
  Building2,
  GraduationCap,
  Lightbulb,
} from "lucide-react";







interface AboutPreviewProps {

  data: {

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


  };

}








export default function AboutPreview({

  data,

}:AboutPreviewProps){





  return (

    <div

      className="
        w-full


        overflow-hidden


        rounded-3xl


        border


        border-white/10


        bg-slate-900/70


        shadow-[0_25px_80px_rgba(0,0,0,0.35)]


        backdrop-blur-xl
      "

    >







      {/* ===============================
          PREVIEW HEADER
      =============================== */}




      <div

        className="
          flex


          flex-col


          gap-4


          border-b


          border-white/10


          px-5


          py-5


          sm:flex-row


          sm:items-center


          sm:justify-between


          sm:px-6
        "

      >





        <div>


          <h2

            className="
              text-xl


              font-bold


              text-white
            "

          >

            Live Preview

          </h2>





          <p

            className="
              mt-2


              text-sm


              text-slate-400
            "

          >

            Preview how the About section will appear on the website.

          </p>



        </div>









        <span

          className={`

            inline-flex


            w-fit


            rounded-full


            px-4


            py-1.5


            text-xs


            font-semibold


            ${
              data.isActive

              ?

              "border border-emerald-400/20 bg-emerald-400/10 text-emerald-400"

              :

              "border border-slate-400/20 bg-slate-700/40 text-slate-400"

            }

          `}

        >

          {

            data.isActive

            ?

            "Published"

            :

            "Draft"

          }


        </span>





      </div>
            {/* ===============================
          WEBSITE PREVIEW
      =============================== */}



      <div

        className="
          p-4


          sm:p-6
        "

      >





        <div

          className="
            overflow-hidden


            rounded-3xl


            border


            border-white/10


            bg-slate-950/60
          "

        >







          <div

            className="
              grid


              gap-8


              p-5


              sm:p-7


              lg:grid-cols-2


              lg:gap-10


              lg:p-8
            "

          >







            {/* ===============================
                LEFT IMAGE AREA
            =============================== */}





            <div

              className="
                relative


                min-h-[330px]
              "

            >







              {/* IMAGE ONE */}




              <div

                className="
                  absolute


                  left-0


                  top-10


                  h-[240px]


                  w-[62%]


                  overflow-hidden


                  rounded-3xl


                  border


                  border-white/10


                  bg-slate-800


                  sm:h-[300px]
                "

              >



                {
                  data.imageOne

                  ?

                  (

                    <img

                      src={data.imageOne}


                      alt="About UAMC"


                      className="
                        h-full


                        w-full


                        object-cover
                      "

                    />

                  )


                  :


                  (

                    <div

                      className="
                        flex


                        h-full


                        items-center


                        justify-center
                      "

                    >


                      <Building2

                        size={45}


                        className="
                          text-slate-600
                        "

                      />


                    </div>

                  )

                }





              </div>









              {/* IMAGE TWO */}





              <div

                className="
                  absolute


                  right-0


                  top-0


                  h-[240px]


                  w-[48%]


                  overflow-hidden


                  rounded-3xl


                  border


                  border-white/10


                  bg-slate-800


                  sm:h-[300px]
                "

              >





                {

                  data.imageTwo

                  ?

                  (

                    <img

                      src={data.imageTwo}


                      alt="UAMC Campus"


                      className="
                        h-full


                        w-full


                        object-cover
                      "

                    />

                  )


                  :


                  (

                    <div

                      className="
                        flex


                        h-full


                        items-center


                        justify-center
                      "

                    >


                      <Building2

                        size={45}


                        className="
                          text-slate-600
                        "

                      />


                    </div>

                  )


                }






              </div>









              {/* LOGO */}




              {

                data.logo &&

                (

                  <div

                    className="
                      absolute


                      left-[38%]


                      top-[120px]


                      z-10


                      flex


                      h-28


                      w-28


                      items-center


                      justify-center


                      overflow-hidden


                      rounded-full


                      border


                      border-emerald-400/20


                      bg-white


                      p-3


                      shadow-2xl


                      sm:left-[36%]


                      sm:top-[145px]


                      sm:h-36


                      sm:w-36
                    "

                  >



                    <img

                      src={data.logo}


                      alt="UAMC Logo"


                      className="
                        h-full


                        w-full


                        object-contain
                      "

                    />


                  </div>

                )


              }





            </div>
                        {/* ===============================
                RIGHT CONTENT
            =============================== */}



            <div

              className="
                flex


                flex-col


                justify-center
              "

            >








              {/* TAGLINE */}





              <div

                className="
                  flex


                  items-center


                  gap-2


                  text-sm


                  font-semibold


                  text-emerald-400
                "

              >



                <GraduationCap

                  size={22}


                  strokeWidth={1.7}

                />



                <span>

                  {
                    data.tagline ||

                    "knowledge meets innovation"
                  }


                </span>



              </div>









              {/* TITLE */}





              <h3

                className="
                  mt-5


                  text-4xl


                  font-bold


                  leading-tight


                  text-white


                  sm:text-5xl
                "

              >



                {
                  data.title ||

                  "About"
                }


                {" "}



                <span

                  className="
                    text-emerald-400
                  "

                >

                  {
                    data.highlightText ||

                    "UAMC"
                  }


                </span>



              </h3>









              {/* DESCRIPTION ONE */}





              <p

                className="
                  mt-6


                  text-sm


                  leading-7


                  text-slate-400


                  sm:text-base
                "

              >



                {
                  data.descriptionOne ||

                  "The first About description will appear here."
                }



              </p>









              {/* DESCRIPTION TWO */}





              <p

                className="
                  mt-5


                  text-sm


                  leading-7


                  text-slate-400


                  sm:text-base
                "

              >



                {
                  data.descriptionTwo ||

                  "The second About description will appear here."
                }



              </p>









              {/* ===============================
                  MISSION + VISION
              =============================== */}





              <div

                className="
                  mt-7


                  grid


                  gap-4


                  sm:grid-cols-2
                "

              >









                {/* MISSION */}





                <Link

                  href={

                    data.missionLink ||

                    "#"

                  }


                  className="
                    group


                    flex


                    min-h-[110px]


                    items-center


                    gap-4


                    rounded-2xl


                    border


                    border-emerald-400/20


                    bg-emerald-400/5


                    p-4


                    transition


                    hover:bg-emerald-400/10
                  "

                >



                  <GraduationCap

                    size={40}


                    strokeWidth={1.4}


                    className="
                      shrink-0


                      text-emerald-400
                    "

                  />





                  <span

                    className="
                      text-sm


                      font-semibold


                      leading-6


                      text-emerald-300
                    "

                  >


                    {
                      data.missionTitle ||

                      "College Mission Statement"
                    }



                  </span>







                  <ArrowRight

                    size={18}


                    className="
                      ml-auto


                      shrink-0


                      text-emerald-400


                      opacity-0


                      transition


                      group-hover:opacity-100
                    "

                  />



                </Link>












                {/* VISION */}





                <Link

                  href={

                    data.visionLink ||

                    "#"

                  }


                  className="
                    group


                    flex


                    min-h-[110px]


                    items-center


                    gap-4


                    rounded-2xl


                    border


                    border-cyan-400/20


                    bg-cyan-400/5


                    p-4


                    transition


                    hover:bg-cyan-400/10
                  "

                >



                  <Building2

                    size={40}


                    strokeWidth={1.4}


                    className="
                      shrink-0


                      text-cyan-400
                    "

                  />





                  <span

                    className="
                      text-sm


                      font-semibold


                      leading-6


                      text-cyan-300
                    "

                  >


                    {
                      data.visionTitle ||

                      "College Vision Achievement"
                    }



                  </span>







                  <ArrowRight

                    size={18}


                    className="
                      ml-auto


                      shrink-0


                      text-cyan-400


                      opacity-0


                      transition


                      group-hover:opacity-100
                    "

                  />



                </Link>






              </div>
                            {/* ===============================
                  PROGRAM BUTTON
              =============================== */}



              <div

                className="
                  mt-7
                "

              >




                <Link

                  href={

                    data.buttonLink ||

                    "#"

                  }


                  className="
                    inline-flex


                    items-center


                    gap-3


                    rounded-xl


                    bg-gradient-to-r


                    from-emerald-500


                    to-cyan-500


                    px-6


                    py-3.5


                    text-sm


                    font-bold


                    text-white


                    shadow-lg


                    shadow-emerald-500/20


                    transition


                    hover:scale-[1.03]
                  "

                >




                  {

                    data.buttonText ||

                    "View Our Program"

                  }



                  <ArrowRight

                    size={19}

                  />



                </Link>




              </div>






            </div>


          </div>


        </div>








        {/* ===============================
            PREVIEW NOTE
        =============================== */}




        <div

          className="
            mt-5


            flex


            items-start


            gap-3


            rounded-2xl


            border


            border-amber-400/20


            bg-amber-400/5


            px-4


            py-4
          "

        >



          <Lightbulb

            size={18}


            className="
              mt-0.5


              shrink-0


              text-amber-400
            "

          />





          <p

            className="
              text-xs


              leading-6


              text-slate-400
            "

          >

            This is a live preview. Changes made
            in the form will be reflected here
            before saving.

          </p>





        </div>





      </div>





    </div>

  );

}