import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/connectToDB";

export async function GET() {
  try {
    await connectToDB();

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected Successfully",
      database: mongoose.connection.db?.databaseName,
      readyState: mongoose.connection.readyState,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}