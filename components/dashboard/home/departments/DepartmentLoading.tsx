export default function DepartmentLoading() {
  return (
    <div className="w-full space-y-6">


      {/* =========================================
          HEADER SKELETON
      ========================================= */}


      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >


        <div className="space-y-3">

          <div
            className="
              h-8
              w-56
              animate-pulse
              rounded-xl
              bg-slate-200
            "
          />


          <div
            className="
              h-4
              w-72
              animate-pulse
              rounded-lg
              bg-slate-100
            "
          />


        </div>



        <div
          className="
            h-11
            w-44
            animate-pulse
            rounded-xl
            bg-slate-200
          "
        />


      </div>





      {/* =========================================
          TABLE / CARD SKELETON
      ========================================= */}


      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >



        {/* DESKTOP HEADER */}


        <div
          className="
            hidden
            grid-cols-[90px_1fr_160px_140px_100px_100px]
            gap-5
            border-b
            border-slate-200
            bg-slate-50
            px-6
            py-4
            lg:grid
          "
        >

          {
            Array.from({
              length:6
            }).map((_,index)=>(
              <div
                key={index}
                className="
                  h-4
                  animate-pulse
                  rounded
                  bg-slate-200
                "
              />
            ))
          }


        </div>





        {/* ROWS */}


        <div
          className="
            divide-y
            divide-slate-100
          "
        >



          {
            [1,2,3,4].map((item)=>(

              <div
                key={item}
                className="
                  flex
                  flex-col
                  gap-5
                  px-5
                  py-6

                  lg:grid
                  lg:grid-cols-[90px_1fr_160px_140px_100px_100px]
                  lg:items-center
                  lg:gap-5
                  lg:px-6
                "
              >



                {/* IMAGE */}


                <div
                  className="
                    h-16
                    w-24
                    animate-pulse
                    rounded-xl
                    bg-slate-200
                  "
                />





                {/* NAME */}


                <div
                  className="
                    space-y-3
                  "
                >

                  <div
                    className="
                      h-5
                      w-52
                      animate-pulse
                      rounded-lg
                      bg-slate-200
                    "
                  />


                  <div
                    className="
                      h-3
                      w-36
                      animate-pulse
                      rounded
                      bg-slate-100
                    "
                  />


                </div>







                {/* POPULAR */}


                <div
                  className="
                    h-7
                    w-24
                    animate-pulse
                    rounded-full
                    bg-slate-200
                  "
                />





                {/* ACTIVE */}


                <div
                  className="
                    h-7
                    w-24
                    animate-pulse
                    rounded-full
                    bg-slate-200
                  "
                />






                {/* ORDER */}


                <div
                  className="
                    h-5
                    w-12
                    animate-pulse
                    rounded
                    bg-slate-200
                  "
                />






                {/* ACTIONS */}


                <div
                  className="
                    flex
                    gap-2
                  "
                >

                  <div
                    className="
                      h-10
                      w-10
                      animate-pulse
                      rounded-xl
                      bg-slate-200
                    "
                  />


                  <div
                    className="
                      h-10
                      w-10
                      animate-pulse
                      rounded-xl
                      bg-slate-200
                    "
                  />

                </div>



              </div>

            ))
          }



        </div>


      </div>


    </div>
  );
}