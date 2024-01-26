import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const req = await request.json();

  const result = await prisma.application.create({
    data: {
      message: req.message,
      applicant: {
        connect: {
          id: userId!,
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
