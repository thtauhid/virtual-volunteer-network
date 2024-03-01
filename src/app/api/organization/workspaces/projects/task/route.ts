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

export async function DELETE(request: Request) {
  const req = await request.json();
  console.log(req);

  const result = await prisma.projectTask.delete({
    where: {
      id: req.id,
    },
  });

  console.log({ result });

  return Response.json({ data: result });
}

export async function PUT(request: Request) {
  const req = await request.json();
  console.log(req);

  const result = await prisma.projectTask.update({
    where: {
      id: req.id,
    },
    data: {
      is_done: req.is_done,
    },
  });

  console.log({ result });

  return Response.json({ data: result });
}
