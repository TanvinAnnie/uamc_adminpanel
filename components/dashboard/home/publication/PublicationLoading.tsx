export default function PublicationLoading() {

  return (

    <div
      className="
        flex

        min-h-[400px]

        items-center

        justify-center

        p-6
      "
    >



      <div
        className="
          relative

          flex

          flex-col

          items-center

          overflow-hidden


          rounded-3xl


          border

          border-white/10


          bg-slate-900/70


          px-10

          py-12


          shadow-[0_25px_80px_rgba(0,0,0,0.35)]


          backdrop-blur-xl
        "
      >



        {/* Glow Effect */}


        <div
          className="
            absolute

            -top-16

            h-32

            w-32

            rounded-full

            bg-cyan-400/20

            blur-3xl
          "
        />





        {/* Loader */}


        <div
          className="
            relative

            flex

            h-16

            w-16

            items-center

            justify-center


            rounded-full


            border

            border-cyan-400/20


            bg-cyan-400/10
          "
        >

          <div
            className="
              h-10

              w-10

              animate-spin


              rounded-full


              border-4


              border-slate-700


              border-t-cyan-400
            "
          />


        </div>






        {/* Text */}


        <p
          className="
            mt-6

            text-sm

            font-semibold

            text-slate-300
          "
        >

          Loading publications...

        </p>






        {/* Bottom Accent */}


        <div
          className="
            mt-5

            h-1

            w-20

            rounded-full


            bg-gradient-to-r

            from-cyan-400

            to-blue-600
          "
        />


      </div>



    </div>

  );

}