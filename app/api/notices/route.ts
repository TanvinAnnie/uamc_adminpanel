import { NextRequest, NextResponse } from "next/server";

import {
  createNotice,
  getAllNotices,
  getPublishedNotices,
} from "@/lib/services/notice.service";

import { NoticeSchema } from "@/lib/validations/notice.validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const published = searchParams.get("published");

    let notices;

    if (published === "true") {
      notices = await getPublishedNotices();
    } else {
      notices = await getAllNotices();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Notices fetched successfully.",
        data: notices,
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
        message: "Failed to fetch notices.",
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

    const validatedData = NoticeSchema.parse(body);

    const notice = await createNotice(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Notice created successfully.",
        data: notice,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create notice.",
      },
      {
        status: 400,
      }
    );
  }
}