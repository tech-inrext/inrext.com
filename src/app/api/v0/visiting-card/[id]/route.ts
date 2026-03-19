export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ FIX
) {
  try {
    // ✅ unwrap params
    const { id } = await context.params;

    const res = await fetch(
      `${process.env.API_URL}/api/v0/public/employee/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return Response.json(
        { error: `Failed to fetch employee: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}