import prisma from "@/lib/prisma";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TaskList from "./TaskList";

export default async function SingleProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await prisma.project.findFirst({
    where: {
      id: Number(params.projectId),
    },
  });

  const assignables = await prisma.workspaceUser.findMany({
    include: {
      user: true,
    },
  });

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="border p-4 m-4">
      <h1>{project.name}</h1>
      <p className="px-4">{project.details}</p>

      <h2>Tasks</h2>

      <TaskList
        projectId={Number(params.projectId)}
        assignables={assignables}
      />
    </div>
  );
}
