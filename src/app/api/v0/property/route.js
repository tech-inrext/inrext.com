import { NextResponse } from "next/server";

const CRM_API = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url);

    const url = `${CRM_API}/v0/property?${searchParams.toString()}`;

    const crmRes = await fetch(url, {
      method: "GET",
      cache: "no-store"
    });

    if (!crmRes.ok) {
      throw new Error("CRM API failed");
    }

    const crmData = await crmRes.json();

    // RETURN EXACT CRM RESPONSE
    return NextResponse.json(crmData);

  } catch (error) {

    console.error("Property Proxy Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch properties"
      },
      { status: 500 }
    );
  }
}