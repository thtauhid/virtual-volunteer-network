import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();
  const req = await request.json();

  // add user to workspace
  const result = await prisma.workspaceUser.create({
    data: {
      userId: userId!,
      workspaceId: req.workspaceId,
    },
  });

  // remove user invitation
  await prisma.workspaceUserInvitation.delete({
    where: {
      id: req.invitationId,
    },
  });

  return Response.json({ data: result });
}

export async function DELETE(request: Request) {
  const req = await request.json();

  const result = await prisma.workspaceUserInvitation.delete({
    where: {
      id: req.invitationId,
    },
  });

  return Response.json({ data: result });
}
