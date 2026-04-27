export const dynamic = "force-dynamic";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const resolved = apiUrl || "https://api.azim.cc";
  const fetchUrl = `${resolved}/api/settings/featured`;

  try {
    const res = await fetch(fetchUrl, { cache: "no-store" });
    const text = await res.text();
    return Response.json({
      env: apiUrl ?? "(undefined)",
      resolved,
      fetchUrl,
      status: res.status,
      body: text,
    });
  } catch (err: unknown) {
    return Response.json({
      env: apiUrl ?? "(undefined)",
      resolved,
      fetchUrl,
      error: String(err),
    });
  }
}
