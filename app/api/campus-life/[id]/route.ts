import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";

import CampusLife from "@/lib/models/CampusLife";

import mongoose from "mongoose";



// =========================================================
// GET SINGLE CAMPUS LIFE
// =========================================================

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {


  try {


    await connectToDB();



    const {
      id,
    } = await params;




    if(
      !mongoose.Types.ObjectId.isValid(id)
    ){

      return NextResponse.json(

        {
          success:false,

          data:null,

          message:
          "Invalid Campus Life ID.",
        },

        {
          status:400,
        }

      );

    }





    const campusLife =
      await CampusLife.findById(id);





    if(!campusLife){


      return NextResponse.json(

        {
          success:false,

          data:null,

          message:
          "Campus Life not found.",
        },

        {
          status:404,
        }

      );

    }







    return NextResponse.json(

      {
        success:true,

        data:campusLife,

        message:
        "Campus Life fetched successfully.",
      },

      {
        status:200,
      }

    );




  } catch(error){



    console.error(
      "GET SINGLE CAMPUS LIFE ERROR:",
      error
    );



    return NextResponse.json(

      {
        success:false,

        data:null,

        message:
        "Failed to fetch Campus Life.",
      },

      {
        status:500,
      }

    );

  }


}









// =========================================================
// UPDATE CAMPUS LIFE
// =========================================================

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id:string;
    }>;
  }
){


  try{


    await connectToDB();



    const {
      id,
    } = await params;




    if(
      !mongoose.Types.ObjectId.isValid(id)
    ){

      return NextResponse.json(

        {
          success:false,

          data:null,

          message:
          "Invalid Campus Life ID.",
        },

        {
          status:400,
        }

      );

    }




    const body =
      await request.json();





    const updatedCampusLife =
      await CampusLife.findByIdAndUpdate(

        id,

        body,

        {
          new:true,

          runValidators:true,
        }

      );





    if(!updatedCampusLife){


      return NextResponse.json(

        {
          success:false,

          data:null,

          message:
          "Campus Life not found.",
        },

        {
          status:404,
        }

      );

    }







    return NextResponse.json(

      {
        success:true,

        data:updatedCampusLife,

        message:
        "Campus Life updated successfully.",
      },

      {
        status:200,
      }

    );




  }catch(error){


    console.error(
      "UPDATE CAMPUS LIFE ERROR:",
      error
    );



    return NextResponse.json(

      {
        success:false,

        data:null,

        message:
        "Failed to update Campus Life.",
      },

      {
        status:500,
      }

    );

  }


}










// =========================================================
// DELETE CAMPUS LIFE
// =========================================================

export async function DELETE(

  request:NextRequest,

  {
    params,
  }:{
    params:Promise<{
      id:string;
    }>;
  }

){


  try{


    await connectToDB();



    const {
      id,
    } = await params;





    if(
      !mongoose.Types.ObjectId.isValid(id)
    ){

      return NextResponse.json(

        {
          success:false,

          data:null,

          message:
          "Invalid Campus Life ID.",
        },

        {
          status:400,
        }

      );

    }






    const deletedCampusLife =
      await CampusLife.findByIdAndDelete(id);






    if(!deletedCampusLife){


      return NextResponse.json(

        {
          success:false,

          data:null,

          message:
          "Campus Life not found.",
        },

        {
          status:404,
        }

      );

    }






    return NextResponse.json(

      {
        success:true,

        data:null,

        message:
        "Campus Life deleted successfully.",
      },

      {
        status:200,
      }

    );





  }catch(error){


    console.error(
      "DELETE CAMPUS LIFE ERROR:",
      error
    );



    return NextResponse.json(

      {
        success:false,

        data:null,

        message:
        "Failed to delete Campus Life.",
      },

      {
        status:500,
      }

    );

  }


}