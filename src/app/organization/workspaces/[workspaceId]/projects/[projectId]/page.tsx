import prisma from "@/lib/prisma";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateNewTask from "./CreateNewTask";
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

      <span className="flex items-center">
        <h2>Tasks</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <CreateNewTask
              projectId={Number(params.projectId)}
              assignables={assignables}
            />
          </DialogContent>
        </Dialog>
      </span>

      <TaskList
        projectId={Number(params.projectId)}
        assignables={assignables}
      />
    </div>
  );
}
