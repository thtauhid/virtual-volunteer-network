import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export async function POST(request: Request) {
  const clear_user = await currentUser();
  const req = await request.json();

  const user = await prisma.user.findUnique({
    where: { clerkId: clear_user?.id },
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
