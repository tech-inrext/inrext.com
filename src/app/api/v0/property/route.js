import { NextResponse } from "next/server";

const CRM_PUBLIC_API =
  process.env.CRM_PUBLIC_API || "http://localhost:3001";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const slug = searchParams.get("slug");
    const withChildren = searchParams.get("withChildren") === "true";
    if (slug) {
      // Fetch single property by slug
      const crmRes = await fetch(
        `${CRM_PUBLIC_API}/api/v0/public/property?slug=${encodeURIComponent(slug)}&withChildren=${withChildren}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      if (!crmRes.ok) {
        throw new Error("CRM API failed");
      }
      const crmData = await crmRes.json();
      return NextResponse.json({
        success: crmData.success !== false,
        data: crmData.data || null,
      });
    }

    // List mode (default)
    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured") || "false";
    const limit = searchParams.get("limit") || "20";

    const crmRes = await fetch(
      `${CRM_PUBLIC_API}/api/v0/public/property?category=${category}&featured=${featured}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!crmRes.ok) {
      throw new Error("CRM API failed");
    }

    const crmData = await crmRes.json();
    const properties = Array.isArray(crmData?.data)
      ? crmData.data
      : [];
    return NextResponse.json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error("Website Property Proxy Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch properties",
      },
      { status: 500 }
    );
  }
}