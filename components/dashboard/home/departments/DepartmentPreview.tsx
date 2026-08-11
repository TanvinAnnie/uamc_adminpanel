"use client";


import {
  ArrowRight,
  Building2,
  Search,
} from "lucide-react";


import type {
  DepartmentFormData,
} from "./DepartmentForm";



// =======================================================
// PROPS
// =======================================================


interface DepartmentPreviewProps {

  data: DepartmentFormData;

}





// =======================================================
// COMPONENT
// =======================================================


export default function DepartmentPreview({

  data,

}: DepartmentPreviewProps) {



  // =====================================================
  // FALLBACK DATA
  // =====================================================


  const mainImage =

    data.image ||

    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80";




  const secondaryImage =

    data.image ||

    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80";





  const departmentName =

    data.name ||

    "Department Name";





  const description =

    data.description ||

    "Explore our academic departments and discover the right program for your educational journey.";






  return (

    <div className="w-full">



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
              text-cyan-500
            "

          >

            Live Preview

          </p>




          <h2

            className="
              mt-1
              text-xl
              font-bold
              text-slate-800
            "

          >

            Find Your Department

          </h2>


        </div>





        <span

          className="
            inline-flex
            w-fit
            rounded-full
            bg-cyan-50
            px-3
            py-1.5
            text-xs
            font-semibold
            text-cyan-600
          "

        >

          Website Preview

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
          border-white/10
          bg-[#080d20]
          shadow-xl
        "

      >




        {/* =====================================================
            LEFT + RIGHT CONTENT
        ===================================================== */}


        <div

          className="
            grid
            gap-8
            px-5
            py-8

            sm:px-8
            sm:py-10

            lg:grid-cols-2
            lg:gap-12
            lg:px-10
            lg:py-14
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



            {/* LABEL */}


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
                  w-10
                  bg-cyan-400
                "

              />


              <span

                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-cyan-400
                "

              >

                Explore

              </span>


            </div>







            {/* TITLE */}


            <h3

              className="
                mt-5
                max-w-xl
                font-serif
                text-4xl
                leading-tight
                text-white

                sm:text-5xl
              "

            >

              Find Your

              <span className="text-cyan-400">

                {" "}
                Department

              </span>


            </h3>







            {/* DESCRIPTION */}


            <p

              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-slate-400

                sm:text-base
              "

            >

              {description}


            </p>







            {/* SEARCH BOX */}


            <div className="mt-7">


              <div

                className="
                  flex
                  h-14
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                "

              >


                <Search

                  size={19}

                  className="text-slate-400"

                />



                <span

                  className="
                    flex-1
                    truncate
                    text-sm
                    text-slate-400
                  "

                >

                  Search for a department...

                </span>





                <button

                  type="button"

                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-cyan-500
                    text-white
                  "

                >

                  <ArrowRight size={17}/>


                </button>


              </div>


            </div>







            {/* POPULAR */}



            {data.isPopular && (

              <div className="mt-6">


                <p

                  className="
                    text-xs
                    font-semibold
                    text-slate-500
                  "

                >

                  Popular Department

                </p>




                <div

                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-2
                  "

                >


                  <span

                    className="
                      rounded-full
                      border
                      border-cyan-400/20
                      bg-cyan-400/10
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-cyan-300
                    "

                  >

                    {departmentName}

                  </span>




                  <span

                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-3
                      py-1.5
                      text-xs
                      text-slate-400
                    "

                  >

                    Medical

                  </span>




                  <span

                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-3
                      py-1.5
                      text-xs
                      text-slate-400
                    "

                  >

                    Clinical

                  </span>


                </div>


              </div>

            )}







            {/* FEATURE CARD */}



            <div

              className="
                mt-8
                flex
                items-center
                gap-4
              "

            >


              <div

                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-500
                  text-white
                "

              >

                <Building2 size={20}/>


              </div>




              <div>


                <p

                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-slate-500
                  "

                >

                  Featured Department

                </p>




                <p

                  className="
                    mt-1
                    text-sm
                    font-bold
                    text-white
                  "

                >

                  {departmentName}

                </p>


              </div>


            </div>


          </div>








          {/* =====================================================
              RIGHT IMAGE AREA
          ===================================================== */}



          <div

            className="
              relative
              min-h-[380px]
            "

          >





            {/* MAIN IMAGE */}


            <div

              className="
                absolute
                right-0
                top-0

                h-[260px]
                w-[75%]

                overflow-hidden
                rounded-3xl
                border-8
                border-[#080d20]
                shadow-xl

                sm:h-[300px]
              "

            >


              <img

                src={mainImage}

                alt="Department"

                className="
                  h-full
                  w-full
                  object-cover
                "

              />


            </div>








            {/* SECOND IMAGE */}



            <div

              className="
                absolute
                bottom-0
                left-0

                h-[200px]
                w-[60%]

                overflow-hidden
                rounded-3xl
                border-8
                border-[#080d20]
                shadow-xl

                sm:h-[230px]
              "

            >


              <img

                src={secondaryImage}

                alt="Department"

                className="
                  h-full
                  w-full
                  object-cover
                "

              />


            </div>








            {/* COUNT BADGE */}



            <div

              className="
                absolute
                bottom-8
                right-3
                rounded-2xl
                bg-cyan-500
                px-6
                py-5
                text-white
                shadow-xl
              "

            >


              <p

                className="
                  text-3xl
                  font-bold
                "

              >

                28+

              </p>


              <p

                className="
                  text-xs
                  text-white/80
                "

              >

                Departments

              </p>


            </div>




          </div>



        </div>








        {/* =====================================================
            STATUS
        ===================================================== */}



        <div

          className="
            flex
            items-center
            justify-between
            border-t
            border-white/10
            bg-white/5
            px-5
            py-4

            sm:px-8
          "

        >



          <span

            className="
              text-xs
              text-slate-400
            "

          >

            Department visibility

          </span>




          <span

            className={`
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold

              ${
                data.isActive

                ?

                "text-cyan-400"

                :

                "text-red-400"

              }

            `}

          >


            <span

              className={`
                h-2
                w-2
                rounded-full

                ${
                  data.isActive

                  ?

                  "bg-cyan-400"

                  :

                  "bg-red-400"

                }

              `}

            />



            {data.isActive
              ? "Published"
              : "Draft"}


          </span>



        </div>



      </div>



    </div>

  );

}