import { NextRequest, NextResponse } from "next/server";

import {
  deletePublication,
  getPublicationById,
  updatePublication,
} from "@/lib/services/publication.service";

import { PublicationSchema } from "@/lib/validations/publication.validation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const publication = await getPublicationById(id);

    if (!publication) {
      return NextResponse.json(
        {
          success: false,
          message: "Publication not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: publication,
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
        message: "Failed to fetch publication.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const validatedData = PublicationSchema.partial().parse(body);

    const updated = await updatePublication(id, validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Publication updated successfully.",
        data: updated,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to update publication.",
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    await deletePublication(id);

    return NextResponse.json(
      {
        success: true,
        message: "Publication deleted successfully.",
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
        message: "Failed to delete publication.",
      },
      {
        status: 500,
      }
    );
  }
}