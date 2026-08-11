import { notFound } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Pencil,
} from "lucide-react";


import { connectToDB } from "@/lib/connectToDB";
import { NoticeModel } from "@/lib/models/Notice";


import NoticeForm from "@/components/dashboard/home/notices/NoticeForm";



interface Props {

  params: Promise<{
    id:string;
  }>;

}





export default async function EditNoticePage({

  params,

}:Props){


  const {id} =
    await params;




  await connectToDB();




  const notice =
    await NoticeModel
      .findById(id)
      .lean();





  if(!notice){

    notFound();

  }






  const noticeData = {

    _id:
      notice._id.toString(),

    title:
      notice.title,

    slug:
      notice.slug,

    category:
      notice.category,

    description:
      notice.description,

    pdf:
      notice.pdf,

    date:
      notice.date,

    time:
      notice.time,

    isPublished:
      notice.isPublished,

    order:
      notice.order,

  };







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



          sm:flex-row

          sm:items-center

          sm:justify-between
        "
      >





        {/* LEFT */}



        <div
          className="
            flex

            items-center

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

              border-blue-400/20


              bg-blue-400/10


              text-blue-400
            "
          >

            <Pencil
              size={27}
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

              Edit Notice

            </h1>



            <p
              className="
                mt-2

                text-sm

                text-slate-400


                sm:text-base
              "
            >

              Update homepage notice information.

            </p>


          </div>



        </div>







        {/* BACK BUTTON */}



        <Link

          href="/dashboard/home/notices"


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



      </div>







      {/* ================= FORM ================= */}



      <div
        className="
          rounded-3xl


          border

          border-white/10


          bg-slate-900/70


          p-5


          shadow-[0_25px_80px_rgba(0,0,0,0.35)]


          backdrop-blur-xl



          sm:p-8
        "
      >


        <NoticeForm

          initialData={
            noticeData
          }

        />


      </div>





    </div>

  );

}