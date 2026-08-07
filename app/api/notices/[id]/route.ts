import { NextRequest, NextResponse } from "next/server";

import {
  deleteNotice,
  getNoticeById,
  updateNotice,
} from "@/lib/services/notice.service";

import { NoticeSchema } from "@/lib/validations/notice.validation";

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

    const notice = await getNoticeById(id);

    if (!notice) {
      return NextResponse.json(
        {
          success: false,
          message: "Notice not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: notice,
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
        message: "Failed to fetch notice.",
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

    const validatedData = NoticeSchema.partial().parse(body);

    const updated = await updateNotice(id, validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Notice updated successfully.",
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
        message: error?.message || "Failed to update notice.",
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

    await deleteNotice(id);

    return NextResponse.json(
      {
        success: true,
        message: "Notice deleted successfully.",
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
        message: "Failed to delete notice.",
      },
      {
        status: 500,
      }
    );
  }
}