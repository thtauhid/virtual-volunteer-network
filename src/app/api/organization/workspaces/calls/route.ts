import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);

  const result = await prisma.call.update({
    where: {
      id: req.id,
    },
    data: {
      has_started: req.has_started,
      has_ended: req.has_ended,
    },
  });

  return Response.json({ data: result });
}
