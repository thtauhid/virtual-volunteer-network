import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();
  const req = await request.json();

  const result = await prisma.user.create({
    data: {
      id: userId,
      user_type: "volunteer",
      ...req,
    },
  });

  return Response.json({ data: result });
}
