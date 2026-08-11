export default function AboutLoading() {

  return (

    <div
      className="
        w-full


        rounded-3xl


        border


        border-white/10


        bg-slate-900/70


        p-5


        shadow-[0_25px_80px_rgba(0,0,0,0.35)]


        backdrop-blur-xl


        sm:p-6
      "
    >






      {/* HEADER SKELETON */}



      <div
        className="
          mb-7
        "
      >


        <div
          className="
            h-7

            w-48

            animate-pulse


            rounded-xl


            bg-slate-700/60
          "
        />



        <div
          className="
            mt-3


            h-4


            w-72


            animate-pulse


            rounded-lg


            bg-slate-800
          "
        />



      </div>









      {/* CONTENT */}



      <div
        className="
          space-y-6
        "
      >








        {/* IMAGE */}



        <div
          className="
            h-56


            w-full


            animate-pulse


            rounded-3xl


            bg-slate-800
          "
        />









        {/* TEXT AREA */}



        <div
          className="
            space-y-4
          "
        >



          <div
            className="
              h-5


              w-36


              animate-pulse


              rounded-lg


              bg-slate-700/60
            "
          />





          <div
            className="
              h-4


              w-full


              animate-pulse


              rounded-lg


              bg-slate-800
            "
          />




          <div
            className="
              h-4


              w-5/6


              animate-pulse


              rounded-lg


              bg-slate-800
            "
          />





          <div
            className="
              h-4


              w-4/6


              animate-pulse


              rounded-lg


              bg-slate-800
            "
          />




        </div>









        {/* CARD SKELETON */}



        <div
          className="
            grid


            gap-5


            sm:grid-cols-2
          "
        >



          <div
            className="
              h-28


              animate-pulse


              rounded-2xl


              border


              border-white/10


              bg-slate-800
            "
          />





          <div
            className="
              h-28


              animate-pulse


              rounded-2xl


              border


              border-white/10


              bg-slate-800
            "
          />



        </div>









        {/* BUTTON */}



        <div
          className="
            h-12


            w-48


            animate-pulse


            rounded-xl


            bg-slate-700/60
          "
        />






      </div>






    </div>

  );

}