"use client";


import {
  ArrowRight,
  Building2,
  Search,
} from "lucide-react";


import type {
  DepartmentSectionFormData,
} from "./DepartmentSectionForm";




// =========================================================
// PROPS
// =========================================================


interface DepartmentSectionPreviewProps {

  data: DepartmentSectionFormData;

}







// =========================================================
// COMPONENT
// =========================================================


export default function DepartmentSectionPreview({

  data,

}: DepartmentSectionPreviewProps) {





  const title =

    data.title ||

    "Find Your Department";





  const description =

    data.description ||

    "Explore our academic departments and find the right program for your educational journey.";





  const searchPlaceholder =

    data.searchPlaceholder ||

    "Search for a department...";





  const studentCount =

    data.studentCount ||

    "28+";





  const studentCountText =

    data.studentCountText ||

    "Departments";







  return (

    <div

      className="
        w-full
      "

    >






      {/* =====================================================
          PREVIEW HEADER
      ===================================================== */}



      <div

        className="
          mb-5
          flex
          flex-col
          gap-3

          sm:flex-row
          sm:items-center
          sm:justify-between
        "

      >




        <div>



          <p

            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-emerald-400
            "

          >

            Live Preview

          </p>






          <h2

            className="
              mt-1
              text-xl
              font-bold
              text-slate-900

              dark:text-white
            "

          >

            Department Section

          </h2>




        </div>








        <span

          className={`

            w-fit
            rounded-full
            px-3
            py-1.5
            text-xs
            font-semibold


            ${
              data.isActive

              ?

              "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"

              :

              "bg-red-400/10 text-red-400 border border-red-400/20"

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









      {/* =====================================================
          WEBSITE PREVIEW CARD
      ===================================================== */}





      <div

        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-800
          bg-[#080f24]
          shadow-xl
        "

      >







        <div

          className="
            grid
            gap-8
            px-5
            py-8

            sm:px-8

            lg:grid-cols-2
            lg:px-10
            lg:py-12

          "

        >







          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}



          <div

            className="
              flex
              flex-col
              justify-center
            "

          >







            <div

              className="
                flex
                items-center
                gap-3
              "

            >



              <span

                className="
                  h-px
                  w-8
                  bg-emerald-400
                "

              />





              <span

                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-emerald-400
                "

              >

                Explore

              </span>




            </div>








            <h3

              className="
                mt-5
                text-3xl
                font-bold
                leading-tight
                text-white

                sm:text-4xl
              "

            >

              {title}


            </h3>








            <p

              className="
                mt-4
                text-sm
                leading-6
                text-slate-400
              "

            >

              {description}


            </p>
                        {/* =====================================================
                SEARCH BOX
            ===================================================== */}


            <div

              className="
                mt-6
                flex
                h-12
                items-center
                gap-3
                rounded-xl
                border
                border-slate-700
                bg-[#0d162f]
                px-3
              "

            >





              <Search

                size={17}

                className="
                  text-slate-500
                "

              />








              <span

                className="
                  flex-1
                  truncate
                  text-xs
                  text-slate-400
                "

              >

                {searchPlaceholder}


              </span>









              <button


                type="button"


                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#008B45]
                  text-white
                  transition
                  hover:bg-[#00763B]
                "


              >


                <ArrowRight size={15}/>


              </button>





            </div>









            {/* =====================================================
                POPULAR SEARCHES
            ===================================================== */}



            {
              data.popularSearches?.length > 0 && (



                <div

                  className="
                    mt-5
                  "

                >





                  <p

                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wide
                      text-slate-500
                    "

                  >

                    Popular Searches


                  </p>








                  <div

                    className="
                      mt-3
                      flex
                      flex-wrap
                      gap-2
                    "

                  >




                    {
                      data.popularSearches

                      .slice(0,5)

                      .map(

                        (item,index)=>(


                          <span


                            key={`${item}-${index}`}


                            className="
                              rounded-full
                              border
                              border-emerald-400/20
                              bg-emerald-400/10
                              px-3
                              py-1.5
                              text-[10px]
                              font-semibold
                              text-emerald-400
                            "


                          >


                            {item}



                          </span>



                        )

                      )
                    }





                  </div>







                </div>


              )
            }







          </div>
                    {/* =====================================================
              IMAGE SECTION
          ===================================================== */}



          <div

            className="
              relative
              min-h-[320px]

              sm:min-h-[380px]
            "

          >






            {/* IMAGE ONE */}



            <div

              className="
                absolute
                right-0
                top-0

                h-[210px]
                w-[75%]

                overflow-hidden
                rounded-3xl
                border-8
                border-[#080f24]
                bg-slate-800
                shadow-xl

                sm:h-[240px]
              "

            >




              {

                data.imageOne

                ?


                <img

                  src={data.imageOne}

                  alt="Department"

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
                    text-slate-500
                  "

                >

                  <Building2 size={38}/>


                </div>


              }




            </div>









            {/* IMAGE TWO */}



            <div

              className="
                absolute
                bottom-0
                left-0

                h-[170px]
                w-[60%]

                overflow-hidden
                rounded-3xl
                border-8
                border-[#080f24]
                bg-slate-800
                shadow-xl
              "

            >



              {

                data.imageTwo


                ?



                <img

                  src={data.imageTwo}

                  alt="Department"

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
                    text-slate-500
                  "

                >


                  <Building2 size={32}/>



                </div>


              }



            </div>









            {/* COUNT BADGE */}



            <div

              className="
                absolute
                bottom-5
                right-2

                rounded-2xl
                bg-[#008B45]
                px-5
                py-4
                text-white
                shadow-xl
              "

            >



              <p

                className="
                  text-2xl
                  font-bold
                "

              >

                {studentCount}


              </p>





              <p

                className="
                  text-[10px]
                  text-white/80
                "

              >

                {studentCountText}


              </p>




            </div>






          </div>







        </div>









        {/* =====================================================
            FOOTER
        ===================================================== */}



        <div

          className="
            flex
            flex-col
            gap-2

            border-t
            border-slate-800
            bg-[#0d162f]

            px-5
            py-4

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-8
          "

        >





          <span

            className="
              text-[10px]
              text-slate-500
            "

          >

            Website section preview


          </span>








          <span

            className={`
              flex
              items-center
              gap-2
              text-[10px]
              font-semibold


              ${
                data.isActive

                ?

                "text-emerald-400"

                :

                "text-red-400"

              }

            `}

          >




            <span

              className={`

                h-1.5
                w-1.5
                rounded-full


                ${
                  data.isActive

                  ?

                  "bg-emerald-400"

                  :

                  "bg-red-400"

                }

              `}

            />




            {

              data.isActive

              ?

              "Visible on website"

              :

              "Hidden from website"

            }





          </span>







        </div>






      </div>





    </div>


  );

}