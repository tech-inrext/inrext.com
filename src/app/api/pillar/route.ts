import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import Pillar from "../../../models/Pillar";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const isFeatured = searchParams.get("isFeatured");

  await connectToDatabase();

  let query: any = {};
  if (category) {
    query.category = category;
  }
  if (isFeatured === "true") {
    query.isFeatured = true;
  }

  try {
    const pillars = await Pillar.find(query);
    return NextResponse.json(pillars);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pillars" },
      { status: 500 }
    );
  }
}
