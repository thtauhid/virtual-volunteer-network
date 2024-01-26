import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();
  const req = await request.json();

  const user = await prisma.user.findUnique({
    where: { clerkId: userId! },
  });

  const result = await prisma.opportunity.create({
    data: {
      ...req,
      owner: {
        connect: { id: user?.id },
      },
    },
  });

  return Response.json({ data: result });
}
