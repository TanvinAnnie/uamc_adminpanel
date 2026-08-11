export default function StatisticsLoading() {
  return (
    <div className="w-full space-y-6">
      {/* =====================================
          HEADER SKELETON
      ===================================== */}

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">

        {/* TITLE */}

        <div className="space-y-3">
          <div className="h-8 w-64 animate-pulse rounded-xl bg-slate-200" />

          <div className="h-4 w-80 animate-pulse rounded-lg bg-slate-100" />
        </div>


        {/* BUTTON */}

        <div className="h-11 w-44 animate-pulse rounded-xl bg-slate-200" />

      </div>





      {/* =====================================
          STATISTICS CARD SKELETON
      ===================================== */}


      <div className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      ">


        {/* IMAGE SKELETON */}


        <div className="
          h-56
          w-full
          animate-pulse
          rounded-2xl
          bg-slate-100
        "
        />





        {/* STATISTICS GRID */}


        <div className="
          mt-6
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
        ">


          {Array.from({
            length:3,
          }).map((_,index)=>(


            <div
              key={index}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
              "
            >


              {/* NUMBER */}


              <div className="
                h-9
                w-24
                animate-pulse
                rounded-lg
                bg-slate-200
              "
              />



              {/* TITLE */}


              <div className="
                mt-3
                h-4
                w-32
                animate-pulse
                rounded-lg
                bg-slate-100
              "
              />



            </div>


          ))}


        </div>






        {/* FOOTER ACTION */}


        <div className="
          mt-6
          flex
          justify-end
          gap-3
        ">


          <div
            className="
              h-10
              w-24
              animate-pulse
              rounded-xl
              bg-slate-200
            "
          />



          <div
            className="
              h-10
              w-24
              animate-pulse
              rounded-xl
              bg-slate-200
            "
          />


        </div>


      </div>






      {/* =====================================
          MOBILE EXTRA SKELETON
      ===================================== */}


      <div className="
        space-y-4
        lg:hidden
      ">


        {Array.from({
          length:2,
        }).map((_,index)=>(


          <div
            key={index}
            className="
              animate-pulse
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
            "
          >


            <div className="
              h-5
              w-40
              rounded
              bg-slate-200
            "
            />


            <div className="
              mt-4
              h-4
              w-full
              rounded
              bg-slate-100
            "
            />


            <div className="
              mt-2
              h-4
              w-4/5
              rounded
              bg-slate-100
            "
            />


          </div>


        ))}


      </div>


    </div>
  );
}