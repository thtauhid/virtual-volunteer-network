export async function GET() {
  return Response.json({ message: "Hello world" });
}

export async function POST(request: Request) {
  const res = await request.json();
  return Response.json({ res });
}
