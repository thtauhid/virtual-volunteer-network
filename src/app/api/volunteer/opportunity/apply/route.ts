import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const req = await request.json();

  const user = await prisma.user.findUnique({
    where: { clerkId: userId! },
  });

  const result = await prisma.application.create({
    data: {
      message: req.message,
      applicant: {
        connect: {
          id: user?.id,
        },
      },
      opportunity: {
        connect: {
          id: Number(req.opportunityId),
        },
      },
    },
  });

  return Response.json({ data: result });
}
