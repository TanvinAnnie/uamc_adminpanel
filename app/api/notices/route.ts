import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import { NoticeModel } from "@/lib/models/Notice";

// =========================================================
// ERROR MESSAGE HELPER
// =========================================================

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown server error.";
}

// =========================================================
// CORS HEADERS
// =========================================================

function withCors(response: NextResponse) {
  response.headers.set(
    "Access-Control-Allow-Origin",
    "*"
  );

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  return response;
}

// =========================================================
// OPTIONS
// =========================================================

export async function OPTIONS() {
  return withCors(
    new NextResponse(null, {
      status: 204,
    })
  );
}

// =========================================================
// GET ALL NOTICES
// =========================================================

export async function GET() {
  try {
    await connectToDB();

    const notices = await NoticeModel.find()
      .sort({
        order: 1,
        createdAt: -1,
      })
      .lean();

    return withCors(
      NextResponse.json(
        {
          success: true,
          data: notices,
          message: "Notices fetched successfully.",
        },
        {
          status: 200,
        }
      )
    );
  } catch (error) {
    console.error(
      "GET NOTICE ERROR:",
      error
    );

    return withCors(
      NextResponse.json(
        {
          success: false,
          data: null,
          message: "Failed to fetch notices.",
          error: getErrorMessage(error),
        },
        {
          status: 500,
        }
      )
    );
  }
}

// =========================================================
// CREATE NOTICE
// =========================================================

export async function POST(
  request: NextRequest
) {
  try {
    await connectToDB();

    const body = await request.json();

    // =====================================================
    // EXTRACT DATA
    // =====================================================

    const {
      title,
      slug,
      category,
      description,
      pdf,
      date,
      time,
      isPublished,
      order,
    } = body;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return withCors(
        NextResponse.json(
          {
            success: false,
            data: null,
            message:
              "Notice title is required.",
          },
          {
            status: 400,
          }
        )
      );
    }

    if (
      typeof slug !== "string" ||
      !slug.trim()
    ) {
      return withCors(
        NextResponse.json(
          {
            success: false,
            data: null,
            message:
              "Notice slug is required.",
          },
          {
            status: 400,
          }
        )
      );
    }

    const allowedCategories = [
      "General Notice",
      "Admission Notice",
      "Reports",
      "Job Circular",
    ];

    if (
      typeof category !== "string" ||
      !allowedCategories.includes(category)
    ) {
      return withCors(
        NextResponse.json(
          {
            success: false,
            data: null,
            message:
              "Please select a valid notice category.",
          },
          {
            status: 400,
          }
        )
      );
    }

    if (
      typeof description !== "string" ||
      !description.trim()
    ) {
      return withCors(
        NextResponse.json(
          {
            success: false,
            data: null,
            message:
              "Notice description is required.",
          },
          {
            status: 400,
          }
        )
      );
    }

    if (
      typeof pdf !== "string" ||
      !pdf.trim()
    ) {
      return withCors(
        NextResponse.json(
          {
            success: false,
            data: null,
            message:
              "Please upload the notice PDF.",
          },
          {
            status: 400,
          }
        )
      );
    }

    if (
      typeof date !== "string" ||
      !date.trim()
    ) {
      return withCors(
        NextResponse.json(
          {
            success: false,
            data: null,
            message:
              "Notice date is required.",
          },
          {
            status: 400,
          }
        )
      );
    }

    if (
      typeof time !== "string" ||
      !time.trim()
    ) {
      return withCors(
        NextResponse.json(
          {
            success: false,
            data: null,
            message:
              "Notice time is required.",
          },
          {
            status: 400,
          }
        )
      );
    }

    // =====================================================
    // CHECK DUPLICATE SLUG
    // =====================================================

    const existingNotice =
      await NoticeModel.findOne({
        slug: slug.trim(),
      });

    if (existingNotice) {
      return withCors(
        NextResponse.json(
          {
            success: false,
            data: existingNotice,
            message:
              "A notice with this slug already exists.",
          },
          {
            status: 409,
          }
        )
      );
    }

    // =====================================================
    // PREPARE NOTICE DATA
    // =====================================================

    const noticeData = {
      title: title.trim(),
      slug: slug.trim(),
      category,
      description: description.trim(),
      pdf: pdf.trim(),
      date: date.trim(),
      time: time.trim(),
      isPublished:
        typeof isPublished === "boolean"
          ? isPublished
          : true,
      order:
        typeof order === "number"
          ? order
          : 0,
    };

    console.log(
      "CREATE NOTICE DATA:",
      noticeData
    );

    // =====================================================
    // CREATE
    // =====================================================

    const notice =
      await NoticeModel.create(
        noticeData
      );

    // =====================================================
    // SUCCESS
    // =====================================================

    return withCors(
      NextResponse.json(
        {
          success: true,
          data: notice,
          message:
            "Notice created successfully.",
        },
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    console.error(
      "CREATE NOTICE ERROR:",
      error
    );

    return withCors(
      NextResponse.json(
        {
          success: false,
          data: null,
          message:
            "Failed to create notice.",
          error: getErrorMessage(error),
        },
        {
          status: 500,
        }
      )
    );
  }
}