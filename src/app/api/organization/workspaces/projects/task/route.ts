import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);

  const result = await prisma.projectTask.create({
    data: {
      name: req.name,
      details: req.details,
      projectId: req.projectId,
      assignedId: req.assignedId,
    },
  });

  console.log({ result });

  return Response.json({ data: result });
}

export async function PATCH(request: Request) {
  const req = await request.json();
  console.log(req);

  const result = await prisma.projectTask.update({
    where: {
      id: req.id,
    },
    data: {
      name: req.name,
      details: req.details,
      assignedId: req.assignedId,
    },
  });

  console.log({ result });

  return Response.json({ data: result });
}
