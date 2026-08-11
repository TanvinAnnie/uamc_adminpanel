import { FileText } from "lucide-react";


interface PublicationEmptyProps {

  title?: string;

  description?: string;

}



export default function PublicationEmpty({

  title = "No Publication Found",

  description = "There are no publications available. Click the 'Add Publication' button to create your first publication.",

}: PublicationEmptyProps) {


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

          w-full

          max-w-md

          flex-col

          items-center

          overflow-hidden


          rounded-3xl


          border

          border-white/10


          bg-slate-900/70


          p-10


          text-center


          shadow-[0_25px_80px_rgba(0,0,0,0.35)]


          backdrop-blur-xl
        "
      >



        {/* Glow */}


        <div
          className="
            absolute

            -top-20

            h-40

            w-40

            rounded-full

            bg-cyan-400/20

            blur-3xl
          "
        />






        {/* Icon */}


        <div
          className="
            relative

            flex

            h-24

            w-24

            items-center

            justify-center


            rounded-3xl


            border

            border-cyan-400/20


            bg-cyan-400/10


            text-cyan-400
          "
        >

          <FileText
            size={42}
            strokeWidth={1.8}
          />

        </div>







        {/* Title */}


        <h2
          className="
            mt-7

            text-2xl

            font-bold

            text-white
          "
        >

          {title}

        </h2>







        {/* Description */}


        <p
          className="
            mt-4

            text-sm

            leading-7

            text-slate-400
          "
        >

          {description}

        </p>







        {/* Bottom Accent */}


        <div
          className="
            mt-8

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