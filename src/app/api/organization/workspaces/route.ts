import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();
  const req = await request.json();

  const result = await prisma.workspace.create({
    data: {
      name: req.name,
      details: req.details,
      ownerId: userId!,
    },
  });

  console.log(result);

  return Response.json({ data: result });
}
