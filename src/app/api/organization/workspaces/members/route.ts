import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  //   const result = await prisma.workspace.create({
  //     data: {
  //       name: req.name,
  //       details: req.details,
  //       ownerId: userId!,
  //     },
  //   });

  let user = await prisma.user.findFirst({
    where: {
      email: req.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: req.email,
        user_type: "volunteer",
      },
    });
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
