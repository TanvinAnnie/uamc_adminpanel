import { NextRequest, NextResponse } from "next/server";

import {
  createPublication,
  getAllPublications,
  getPublishedPublications,
} from "@/lib/services/publication.service";

import { PublicationSchema } from "@/lib/validations/publication.validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const published = searchParams.get("published");

    let publications;

    if (published === "true") {
      publications = await getPublishedPublications();
    } else {
      publications = await getAllPublications();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Publications fetched successfully.",
        data: publications,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch publications.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = PublicationSchema.parse(body);

    const publication = await createPublication(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Publication created successfully.",
        data: publication,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
  error instanceof Error
    ? error.message
    : "Failed to create publication.",
      },
      {
        status: 400,
      }
    );
  }
}