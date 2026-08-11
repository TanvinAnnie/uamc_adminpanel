import Link from "next/link";

import {
  ArrowLeft,
  Plus,
  Bell,
} from "lucide-react";


import NoticeTable from "@/components/dashboard/home/notices/NoticeTable";



export default function NoticePage() {

  return (

    <div
      className="
        space-y-8
      "
    >



      {/* ================= HEADER ================= */}


      <div
        className="
          flex

          flex-col

          gap-6


          rounded-3xl


          border

          border-white/10


          bg-slate-900/70


          p-6


          shadow-[0_25px_80px_rgba(0,0,0,0.35)]


          backdrop-blur-xl



          lg:flex-row

          lg:items-center

          lg:justify-between
        "
      >



        {/* LEFT */}


        <div
          className="
            flex

            items-start

            gap-4
          "
        >


          <div
            className="
              flex

              h-14

              w-14

              shrink-0

              items-center

              justify-center


              rounded-2xl


              border

              border-cyan-400/20


              bg-cyan-400/10


              text-cyan-400
            "
          >

            <Bell
              size={28}
            />


          </div>





          <div>

            <h1
              className="
                text-2xl

                font-bold

                text-white


                sm:text-3xl
              "
            >

              Notice Management

            </h1>


            <p
              className="
                mt-2

                text-sm

                text-slate-400


                sm:text-base
              "
            >

              Manage homepage notices and announcements.

            </p>


          </div>


        </div>







        {/* ACTION BUTTONS */}


        <div
          className="
            flex

            flex-col

            gap-3


            sm:flex-row
          "
        >



          {/* BACK */}


          <Link

            href="/dashboard"


            className="
              inline-flex

              items-center

              justify-center

              gap-2


              rounded-xl


              border

              border-white/10


              bg-slate-800


              px-5

              py-3


              text-sm

              font-semibold


              text-slate-200


              transition


              hover:bg-slate-700
            "
          >

            <ArrowLeft
              size={18}
            />


            Back


          </Link>






          {/* ADD */}



          <Link

            href="/dashboard/home/notices/new"


            className="
              inline-flex

              items-center

              justify-center

              gap-2


              rounded-xl


              bg-gradient-to-r


              from-cyan-500


              to-blue-600


              px-5


              py-3


              text-sm


              font-semibold


              text-white


              shadow-lg


              shadow-cyan-500/20


              transition


              hover:scale-[1.03]
            "
          >

            <Plus
              size={18}
            />


            Add Notice


          </Link>



        </div>



      </div>








      {/* ================= NOTICE TABLE ================= */}



      <div

        className="
          overflow-hidden

          rounded-3xl


          border

          border-white/10


          bg-slate-900/70


          shadow-[0_25px_80px_rgba(0,0,0,0.35)]


          backdrop-blur-xl
        "

      >


        <NoticeTable />


      </div>





    </div>

  );

}