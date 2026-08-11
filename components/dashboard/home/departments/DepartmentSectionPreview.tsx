"use client";

import {
  ArrowRight,
  Building2,
  Search,
} from "lucide-react";

import type {
  DepartmentSectionFormData,
} from "./DepartmentSectionForm";


interface DepartmentSectionPreviewProps {
  data: DepartmentSectionFormData;
}



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
    <div className="w-full">


      {/* ===============================
          PREVIEW HEADER
      =============================== */}

      <div className="
        mb-5
        flex
        flex-col
        gap-3

        sm:flex-row
        sm:items-center
        sm:justify-between
      ">


        <div>

          <p className="
            text-xs
            font-bold
            uppercase
            tracking-[0.18em]
            text-[#008B45]
          ">
            Live Preview
          </p>


          <h2 className="
            mt-1
            text-xl
            font-bold
            text-slate-800
          ">
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
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }
          `}
        >
          {
            data.isActive
              ? "Published"
              : "Draft"
          }

        </span>


      </div>






      {/* ===============================
          WEBSITE PREVIEW
      =============================== */}


      <div className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-[#F7F8F5]
        shadow-sm
      ">




        <div className="
          grid
          gap-8
          px-5
          py-8

          sm:px-8

          lg:grid-cols-2
          lg:px-10
          lg:py-12
        ">




          {/* ===============================
              LEFT CONTENT
          =============================== */}


          <div className="
            flex
            flex-col
            justify-center
          ">


            <div className="
              flex
              items-center
              gap-3
            ">

              <span className="
                h-px
                w-8
                bg-[#008B45]
              "/>


              <span className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#008B45]
              ">
                Explore
              </span>


            </div>





            <h3 className="
              mt-5
              font-serif
              text-3xl
              leading-tight
              text-slate-800

              sm:text-4xl
            ">
              {title}
            </h3>





            <p className="
              mt-4
              text-sm
              leading-6
              text-slate-500
            ">
              {description}
            </p>






            {/* SEARCH */}

            <div className="
              mt-6
              flex
              h-12
              items-center
              gap-3
              rounded-xl
              border
              border-slate-200
              bg-white
              px-3
              shadow-sm
            ">


              <Search
                size={17}
                className="text-slate-400"
              />



              <span className="
                flex-1
                truncate
                text-xs
                text-slate-400
              ">
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
                "
              >

                <ArrowRight size={15}/>

              </button>


            </div>







            {/* POPULAR SEARCH */}


            {
              data.popularSearches?.length > 0 && (

                <div className="mt-5">

                  <p className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-400
                  ">
                    Popular Searches
                  </p>



                  <div className="
                    mt-2
                    flex
                    flex-wrap
                    gap-2
                  ">

                    {
                      data.popularSearches
                        .slice(0,5)
                        .map(
                          (item,index)=>(
                            <span
                              key={`${item}-${index}`}
                              className="
                                rounded-full
                                bg-[#E8F7F0]
                                px-3
                                py-1.5
                                text-[10px]
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

              )
            }



          </div>









          {/* ===============================
              IMAGE SECTION
          =============================== */}



          <div className="
            relative
            min-h-[320px]

            sm:min-h-[380px]
          ">



            {/* IMAGE ONE */}


            <div className="
              absolute
              right-0
              top-0

              h-[210px]
              w-[75%]

              overflow-hidden
              rounded-3xl
              border-8
              border-white
              bg-slate-200
              shadow-lg

              sm:h-[240px]
            ">


              {
                data.imageOne ? (

                  <img
                    src={data.imageOne}
                    alt="Department"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                ) : (

                  <div className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-slate-400
                  ">

                    <Building2 size={38}/>

                  </div>

                )
              }


            </div>





            {/* IMAGE TWO */}


            <div className="
              absolute
              bottom-0
              left-0

              h-[170px]
              w-[60%]

              overflow-hidden
              rounded-3xl
              border-8
              border-white
              bg-slate-200
              shadow-lg
            ">


              {
                data.imageTwo ? (

                  <img
                    src={data.imageTwo}
                    alt="Department"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                ):(

                  <div className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-slate-400
                  ">
                    <Building2 size={32}/>
                  </div>

                )
              }


            </div>






            {/* COUNT BADGE */}


            <div className="
              absolute
              bottom-5
              right-2

              rounded-2xl
              bg-[#008B45]
              px-5
              py-4
              text-white
              shadow-xl
            ">


              <p className="
                font-serif
                text-2xl
              ">
                {studentCount}
              </p>


              <p className="
                text-[10px]
                text-white/80
              ">
                {studentCountText}
              </p>


            </div>



          </div>




        </div>






        {/* FOOTER */}


        <div className="
          flex
          flex-col
          gap-2

          border-t
          border-slate-200
          bg-white

          px-5
          py-4

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-8
        ">


          <span className="
            text-[10px]
            text-slate-400
          ">
            Website section preview
          </span>




          <span className={`
            flex
            items-center
            gap-2
            text-[10px]
            font-semibold

            ${
              data.isActive
              ? "text-[#008B45]"
              : "text-red-500"
            }
          `}>


            <span className={`
              h-1.5
              w-1.5
              rounded-full

              ${
                data.isActive
                ? "bg-[#008B45]"
                : "bg-red-500"
              }
            `}/>


            {
              data.isActive
              ? "Visible on website"
              : "Hidden from website"
            }


          </span>



        </div>



      </div>



    </div>
  );
}