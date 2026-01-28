// app/api/v0/public/employee/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    console.log("🔄 Proxy: Forwarding request for employee ID:", id);

    if (!id || id === "undefined" || id === "null") {
      return NextResponse.json(
        { 
          success: false, 
          error: "Employee ID is required"
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Forward the request to your actual backend on port 3000
    const backendUrl = `http://localhost:3000/api/v0/public/employee/${id}`;
    console.log("📡 Fetching from backend:", backendUrl);

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log("📥 Backend response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend error:", errorText);
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Backend returned ${response.status}`,
          details: errorText
        },
        { status: response.status, headers: corsHeaders }
      );
    }

    const data = await response.json();
    console.log("✅ Successfully fetched employee data");

    return NextResponse.json(data, { 
      status: 200,
      headers: corsHeaders 
    });

  } catch (error: any) {
    console.error("💥 Proxy error:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to connect to backend",
        message: error.message,
        hint: "Make sure your backend server is running on port 3000"
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
