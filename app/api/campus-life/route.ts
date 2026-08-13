import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";

import CampusLife from "@/lib/models/CampusLife";



// =========================================================
// GET ALL CAMPUS LIFE
// =========================================================

export async function GET() {

  try {

    await connectToDB();


    const campusLife =
      await CampusLife.find()
        .sort({
          createdAt: -1,
        });



    return NextResponse.json(

      {
        success: true,

        data: campusLife,

        message:
          "Campus Life fetched successfully.",
      },

      {
        status: 200,
      }

    );


  } catch (error) {


    console.error(
      "GET CAMPUS LIFE ERROR:",
      error
    );


    return NextResponse.json(

      {
        success: false,

        data: null,

        message:
          "Failed to fetch Campus Life.",
      },

      {
        status: 500,
      }

    );

  }

}







// =========================================================
// CREATE CAMPUS LIFE
// =========================================================

export async function POST(
  request: NextRequest
) {

  try {


    await connectToDB();



    const body =
      await request.json();



    const {

      title,

      shortDescription,

      image,

      buttonText,

      buttonLink,

      isActive,


    } = body;





    // =====================================================
    // VALIDATION
    // =====================================================


    if(
      !title ||
      !shortDescription ||
      !image
    ){

      return NextResponse.json(

        {
          success:false,

          data:null,

          message:
            "Title, description and image are required.",
        },

        {
          status:400,
        }

      );

    }







    const campusLife =
      await CampusLife.create({

        title,

        shortDescription,

        image,

        buttonText:
          buttonText ||
          "Learn More",

        buttonLink:
          buttonLink ||
          "#",

        isActive:
          isActive ?? true,

      });







    return NextResponse.json(

      {
        success:true,

        data:campusLife,

        message:
          "Campus Life created successfully.",
      },

      {
        status:201,
      }

    );



  } catch(error){


    console.error(
      "CREATE CAMPUS LIFE ERROR:",
      error
    );



    return NextResponse.json(

      {
        success:false,

        data:null,

        message:
          "Failed to create Campus Life.",
      },

      {
        status:500,
      }

    );


  }

}