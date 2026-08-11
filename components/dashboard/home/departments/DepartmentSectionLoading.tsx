export default function DepartmentSectionLoading() {
  return (
    <div className="w-full space-y-6">

      {/* =====================================================
          HEADER SKELETON
      ===================================================== */}

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
              rounded-lg
              bg-slate-200

              sm:w-64
            "
          />


          <div
            className="
              h-4
              w-72
              animate-pulse
              rounded-lg
              bg-slate-100

              sm:w-80
            "
          />

        </div>




        <div
          className="
            h-11
            w-36
            animate-pulse
            rounded-xl
            bg-slate-200
          "
        />

      </div>







      {/* =====================================================
          MAIN CONTENT SKELETON
      ===================================================== */}


      <div
        className="
          overflow-hidden
          rounded-2xl

          border
          border-slate-200

          bg-white

          shadow-sm
        "
      >


        <div
          className="
            space-y-7

            p-5

            sm:p-6
          "
        >






          {/* =====================================================
              IMAGE SECTION
          ===================================================== */}



          <div
            className="
              grid
              gap-5

              md:grid-cols-2
            "
          >


            <div
              className="
                h-52
                animate-pulse
                rounded-2xl
                bg-slate-200

                sm:h-60
              "
            />



            <div
              className="
                h-52
                animate-pulse
                rounded-2xl
                bg-slate-200

                sm:h-60
              "
            />


          </div>









          {/* =====================================================
              TITLE
          ===================================================== */}



          <div className="space-y-3">


            <div
              className="
                h-5
                w-32
                animate-pulse
                rounded
                bg-slate-200
              "
            />


            <div
              className="
                h-12
                w-full
                animate-pulse
                rounded-xl
                bg-slate-100
              "
            />


          </div>









          {/* =====================================================
              DESCRIPTION
          ===================================================== */}



          <div className="space-y-3">


            <div
              className="
                h-5
                w-28
                animate-pulse
                rounded
                bg-slate-200
              "
            />


            <div
              className="
                h-28
                w-full
                animate-pulse
                rounded-xl
                bg-slate-100
              "
            />


          </div>









          {/* =====================================================
              SEARCH PLACEHOLDER
          ===================================================== */}



          <div className="space-y-3">


            <div
              className="
                h-5
                w-44
                animate-pulse
                rounded
                bg-slate-200
              "
            />



            <div
              className="
                h-12
                w-full
                animate-pulse
                rounded-xl
                bg-slate-100
              "
            />



          </div>









          {/* =====================================================
              POPULAR SEARCH + COUNT
          ===================================================== */}



          <div
            className="
              grid
              gap-5

              md:grid-cols-2
            "
          >


            <div
              className="
                h-12
                animate-pulse
                rounded-xl
                bg-slate-100
              "
            />


            <div
              className="
                h-12
                animate-pulse
                rounded-xl
                bg-slate-100
              "
            />


          </div>








          {/* =====================================================
              BUTTON SKELETON
          ===================================================== */}



          <div
            className="
              h-12
              w-full
              animate-pulse
              rounded-xl
              bg-slate-200

              sm:w-44
            "
          />





        </div>


      </div>


    </div>
  );
}