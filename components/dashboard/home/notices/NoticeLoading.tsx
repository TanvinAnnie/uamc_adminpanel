export default function NoticeLoading() {
  return (
    <div
      className="
        space-y-6
        p-5
        lg:p-8
      "
    >

      {/* Search Skeleton */}

      <div
        className="
          w-full
          max-w-md
        "
      >
        <div
          className="
            h-12
            w-full

            animate-pulse

            rounded-2xl

            border
            border-white/10

            bg-slate-900/70

            shadow-lg

            backdrop-blur-xl

            before:absolute
          "
        />
      </div>




      {/* Desktop Skeleton */}

      <div
        className="
          hidden

          overflow-hidden

          rounded-3xl

          border
          border-white/10

          bg-slate-900/70

          shadow-[0_25px_80px_rgba(0,0,0,0.35)]

          backdrop-blur-xl

          lg:block
        "
      >

        <div
          className="
            animate-pulse
          "
        >

          {/* Header */}

          <div
            className="
              grid
              grid-cols-7
              gap-4

              border-b

              border-white/10

              bg-slate-800/60

              px-6
              py-5
            "
          >

            {Array.from({
              length:7
            }).map((_,index)=>(
              <div
                key={index}
                className="
                  h-4

                  rounded-lg

                  bg-slate-700
                "
              />
            ))}

          </div>




          {/* Rows */}


          {Array.from({
            length:5
          }).map((_,rowIndex)=>(

            <div
              key={rowIndex}

              className="
                grid

                grid-cols-7

                gap-4

                border-b

                border-white/10

                px-6

                py-6
              "
            >

              {Array.from({
                length:7
              }).map((_,columnIndex)=>(

                <div
                  key={columnIndex}

                  className="
                    h-5

                    rounded-lg

                    bg-slate-800
                  "
                />

              ))}


            </div>

          ))}


        </div>


      </div>






      {/* Mobile Skeleton */}


      <div
        className="
          space-y-5

          lg:hidden
        "
      >

        {Array.from({
          length:4
        }).map((_,index)=>(

          <div
            key={index}

            className="
              animate-pulse

              space-y-5

              rounded-3xl

              border

              border-white/10

              bg-slate-900/70

              p-6

              shadow-xl

              backdrop-blur-xl
            "
          >


            {/* Title */}

            <div
              className="
                h-6

                w-4/5

                rounded-lg

                bg-slate-800
              "
            />



            {/* Category */}

            <div
              className="
                h-4

                w-1/3

                rounded-lg

                bg-slate-800
              "
            />



            {/* Info Cards */}

            <div
              className="
                grid

                grid-cols-2

                gap-3
              "
            >

              <div
                className="
                  h-16

                  rounded-2xl

                  bg-slate-800
                "
              />


              <div
                className="
                  h-16

                  rounded-2xl

                  bg-slate-800
                "
              />

            </div>




            {/* Status */}

            <div
              className="
                h-6

                w-1/2

                rounded-lg

                bg-slate-800
              "
            />





            {/* Buttons */}

            <div
              className="
                flex

                gap-3
              "
            >

              <div
                className="
                  h-11

                  flex-1

                  rounded-xl

                  bg-slate-800
                "
              />


              <div
                className="
                  h-11

                  flex-1

                  rounded-xl

                  bg-slate-800
                "
              />

            </div>



          </div>

        ))}


      </div>


    </div>
  );
}