import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export async function POST(request: Request) {
  const user = await currentUser();
  const req = await request.json();

  const result = await prisma.user.create({
    data: {
      clerkId: user?.id,
      user_type: "organization",
      ...req,
    },
  });

  return Response.json({ data: result });
}
