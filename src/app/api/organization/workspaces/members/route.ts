import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const req = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: req.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  console.log(user);

  const result = await prisma.workspaceUserInvitation.create({
    data: {
      userId: user.id,
      workspaceId: req.workspaceId,
    },
  });

  console.log(result);

  return Response.json({ data: result });
}

export async function DELETE(request: Request) {
  const req = await request.json();
  console.log(req);

  const result = await prisma.workspaceUserInvitation.delete({
    where: {
      id: req.id,
    },
  });

  console.log({ result });

  return Response.json({ data: result });
}
