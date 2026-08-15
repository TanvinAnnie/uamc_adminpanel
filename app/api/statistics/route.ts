import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import { StatisticsModel } from "@/lib/models/Statistics";

export const runtime = "nodejs";

// =========================================================
// TYPES
// =========================================================

interface StatisticsRequestBody {
  backgroundImage?: unknown;

  statisticOneValue?: unknown;
  statisticOneTitle?: unknown;

  statisticTwoValue?: unknown;
  statisticTwoTitle?: unknown;

  statisticThreeValue?: unknown;
  statisticThreeTitle?: unknown;

  isActive?: unknown;
}

// =========================================================
// ALLOWED ORIGINS
// =========================================================

const allowedOrigins = [
  process.env.NEXT_PUBLIC_CLIENT_URL,
  process.env.CLIENT_URL,

  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
].filter(
  (origin): origin is string =>
    Boolean(origin)
);

// =========================================================
// CORS HEADERS
// =========================================================

function getCorsHeaders(
  origin: string | null
) {
  const headers = new Headers();

  if (
    origin &&
    allowedOrigins.includes(origin)
  ) {
    headers.set(
      "Access-Control-Allow-Origin",
      origin
    );
  }

  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  headers.set(
    "Access-Control-Allow-Credentials",
    "true"
  );

  headers.set(
    "Vary",
    "Origin"
  );

  headers.set(
    "Content-Type",
    "application/json"
  );

  return headers;
}

// =========================================================
// RESPONSE HELPERS
// =========================================================

function successResponse<T>(
  data: T,
  message: string,
  status = 200,
  origin: string | null = null
) {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    {
      status,
      headers:
        getCorsHeaders(origin),
    }
  );
}

function errorResponse(
  message: string,
  status = 500,
  origin: string | null = null
) {
  return NextResponse.json(
    {
      success: false,
      data: null,
      message,
    },
    {
      status,
      headers:
        getCorsHeaders(origin),
    }
  );
}

// =========================================================
// ERROR MESSAGE HELPER
// =========================================================

function getErrorMessage(
  error: unknown
) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown server error.";
}

// =========================================================
// READ JSON BODY SAFELY
// =========================================================

async function readJsonBody(
  req: NextRequest
): Promise<StatisticsRequestBody> {
  const contentType =
    req.headers.get("content-type") || "";

  if (
    !contentType
      .toLowerCase()
      .includes("application/json")
  ) {
    throw new Error(
      "Request must use Content-Type: application/json."
    );
  }

  try {
    const body =
      await req.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      throw new Error(
        "Invalid request body."
      );
    }

    return body as StatisticsRequestBody;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "Invalid request body."
    ) {
      throw error;
    }

    throw new Error(
      "Invalid JSON request body."
    );
  }
}

// =========================================================
// NORMALIZE BODY
// =========================================================

function normalizeStatisticsBody(
  body: StatisticsRequestBody
) {
  const normalized = {
    backgroundImage:
      typeof body.backgroundImage ===
      "string"
        ? body.backgroundImage.trim()
        : "",

    statisticOneValue:
      typeof body.statisticOneValue ===
      "string"
        ? body.statisticOneValue.trim()
        : "",

    statisticOneTitle:
      typeof body.statisticOneTitle ===
      "string"
        ? body.statisticOneTitle.trim()
        : "",

    statisticTwoValue:
      typeof body.statisticTwoValue ===
      "string"
        ? body.statisticTwoValue.trim()
        : "",

    statisticTwoTitle:
      typeof body.statisticTwoTitle ===
      "string"
        ? body.statisticTwoTitle.trim()
        : "",

    statisticThreeValue:
      typeof body.statisticThreeValue ===
      "string"
        ? body.statisticThreeValue.trim()
        : "",

    statisticThreeTitle:
      typeof body.statisticThreeTitle ===
      "string"
        ? body.statisticThreeTitle.trim()
        : "",

    isActive:
      typeof body.isActive ===
      "boolean"
        ? body.isActive
        : true,
  };

  return normalized;
}

// =========================================================
// VALIDATE BODY
// =========================================================

function validateStatisticsBody(
  body: ReturnType<
    typeof normalizeStatisticsBody
  >
) {
  const missingFields: string[] = [];

  if (!body.backgroundImage) {
    missingFields.push(
      "backgroundImage"
    );
  }

  if (!body.statisticOneValue) {
    missingFields.push(
      "statisticOneValue"
    );
  }

  if (!body.statisticOneTitle) {
    missingFields.push(
      "statisticOneTitle"
    );
  }

  if (!body.statisticTwoValue) {
    missingFields.push(
      "statisticTwoValue"
    );
  }

  if (!body.statisticTwoTitle) {
    missingFields.push(
      "statisticTwoTitle"
    );
  }

  if (!body.statisticThreeValue) {
    missingFields.push(
      "statisticThreeValue"
    );
  }

  if (!body.statisticThreeTitle) {
    missingFields.push(
      "statisticThreeTitle"
    );
  }

  return missingFields;
}

// =========================================================
// OPTIONS
// Handle CORS preflight request
// =========================================================

export async function OPTIONS(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers:
      getCorsHeaders(origin),
  });
}

// =========================================================
// GET
// Get Statistics section
//
// GET /api/statistics
// =========================================================

export async function GET(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // FIND STATISTICS
    // =====================================================

    const statistics =
      await StatisticsModel.findOne()
        .lean();

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!statistics) {
      return errorResponse(
        "Statistics section not found.",
        404,
        origin
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return successResponse(
      statistics,
      "Statistics section fetched successfully.",
      200,
      origin
    );
  } catch (error) {
    console.error(
      "GET STATISTICS ERROR:",
      error
    );

    return errorResponse(
      getErrorMessage(error),
      500,
      origin
    );
  }
}

// =========================================================
// POST
// Create Statistics section
//
// POST /api/statistics
// =========================================================

export async function POST(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // BODY
    // =====================================================

    const body =
      await readJsonBody(req);

    // =====================================================
    // NORMALIZE
    // =====================================================

    const normalizedBody =
      normalizeStatisticsBody(body);

    // =====================================================
    // VALIDATION
    // =====================================================

    const missingFields =
      validateStatisticsBody(
        normalizedBody
      );

    if (
      missingFields.length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message:
            "Please complete all required Statistics fields.",
          errors: missingFields,
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // CHECK EXISTING STATISTICS
    // =====================================================

    const existingStatistics =
      await StatisticsModel.findOne();

    if (existingStatistics) {
      return errorResponse(
        "Statistics section already exists. Use PUT to update it.",
        409,
        origin
      );
    }

    // =====================================================
    // CREATE
    // =====================================================

    const statistics =
      await StatisticsModel.create(
        normalizedBody
      );

    // =====================================================
    // SUCCESS
    // =====================================================

    return successResponse(
      statistics,
      "Statistics section created successfully.",
      201,
      origin
    );
  } catch (error) {
    console.error(
      "CREATE STATISTICS ERROR:",
      error
    );

    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name ===
        "ValidationError"
    ) {
      return errorResponse(
        "Statistics validation failed.",
        400,
        origin
      );
    }

    // =====================================================
    // INVALID JSON
    // =====================================================

    if (
      error instanceof Error &&
      error.message.includes(
        "Invalid JSON"
      )
    ) {
      return errorResponse(
        error.message,
        400,
        origin
      );
    }

    // =====================================================
    // OTHER ERROR
    // =====================================================

    return errorResponse(
      "Failed to create Statistics section.",
      500,
      origin
    );
  }
}

// =========================================================
// PUT
// Update Statistics section
//
// PUT /api/statistics
//
// IMPORTANT:
// This endpoint intentionally does NOT use /:id.
// Statistics is a single-document section.
// =========================================================

export async function PUT(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    console.log(
      "================================================="
    );

    console.log(
      "🟢 PUT /api/statistics"
    );

    console.log(
      "================================================="
    );

    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // BODY
    // =====================================================

    const body =
      await readJsonBody(req);

    console.log(
      "STATISTICS UPDATE BODY:",
      body
    );

    // =====================================================
    // NORMALIZE
    // =====================================================

    const normalizedBody =
      normalizeStatisticsBody(body);

    // =====================================================
    // VALIDATION
    // =====================================================

    const missingFields =
      validateStatisticsBody(
        normalizedBody
      );

    if (
      missingFields.length > 0
    ) {
      console.error(
        "STATISTICS MISSING FIELDS:",
        missingFields
      );

      return NextResponse.json(
        {
          success: false,
          data: null,
          message:
            "Please complete all required Statistics fields.",
          errors: missingFields,
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // UPDATE EXISTING DOCUMENT
    // =====================================================

    const statistics =
      await StatisticsModel.findOneAndUpdate(
        {},
        {
          $set: normalizedBody,
        },
        {
          new: true,
          runValidators: true,
        }
      ).lean();

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!statistics) {
      console.error(
        "STATISTICS UPDATE FAILED: DOCUMENT NOT FOUND"
      );

      return errorResponse(
        "Statistics section not found. Please create the Statistics section first.",
        404,
        origin
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    console.log(
      "STATISTICS UPDATED SUCCESSFULLY:",
      statistics
    );

    return successResponse(
      statistics,
      "Statistics section updated successfully.",
      200,
      origin
    );
  } catch (error) {
    console.error(
      "UPDATE STATISTICS ERROR:",
      error
    );

    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name ===
        "ValidationError"
    ) {
      return errorResponse(
        "Statistics validation failed.",
        400,
        origin
      );
    }

    // =====================================================
    // INVALID JSON
    // =====================================================

    if (
      error instanceof Error &&
      (
        error.message.includes(
          "Invalid JSON"
        ) ||
        error.message.includes(
          "Invalid request body"
        )
      )
    ) {
      return errorResponse(
        error.message,
        400,
        origin
      );
    }

    // =====================================================
    // OTHER ERROR
    // =====================================================

    return errorResponse(
      "Failed to update Statistics section.",
      500,
      origin
    );
  }
}

// =========================================================
// DELETE
// Delete Statistics section
//
// DELETE /api/statistics
// =========================================================

export async function DELETE(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // DELETE
    // =====================================================

    const statistics =
      await StatisticsModel.findOneAndDelete(
        {}
      );

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!statistics) {
      return errorResponse(
        "Statistics section not found.",
        404,
        origin
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return successResponse(
      null,
      "Statistics section deleted successfully.",
      200,
      origin
    );
  } catch (error) {
    console.error(
      "DELETE STATISTICS ERROR:",
      error
    );

    return errorResponse(
      "Failed to delete Statistics section.",
      500,
      origin
    );
  }
}