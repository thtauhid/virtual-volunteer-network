import prisma from "@/lib/prisma";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditTask from "./EditTask";
import type { WorkspaceUserInvitation, User } from "@prisma/client";
import ConfirmDone from "./ConfirmDone";
import ConfirmDelete from "./ConfirmDelete";
type Props = {
  projectId: number;
  assignables: (WorkspaceUserInvitation & { user: User })[];
};

export default async function TaskList(props: Props) {
  const tasks = await prisma.projectTask.findMany({
    where: {
      projectId: props.projectId,
    },
    include: {
      assigned: true,
    },
  });

  if (tasks.length === 0) {
    return <div className="p-4 text-center">No tasks</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Assigned</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                {task.is_done ? (
                  <span className="line-through">{task.name}</span>
                ) : (
                  task.name
                )}
              </TableCell>
              <TableCell>
                {task.is_done ? (
                  <span className="line-through">{task.details}</span>
                ) : (
                  task.details
                )}
              </TableCell>
              <TableCell>
                {task.is_done ? (
                  <span className="line-through">
                    {task.assignedId
                      ? task.assigned?.name
                        ? task.assigned.name
                        : task.assigned?.email
                      : "Unassigned"}
                  </span>
                ) : task.assignedId ? (
                  task.assigned?.name ? (
                    task.assigned.name
                  ) : (
                    task.assigned?.email
                  )
                ) : (
                  "Unassigned"
                )}
              </TableCell>
              <TableCell className="space-x-2">
                {!task.is_done && (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-500">Mark as done</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Mark as done</DialogTitle>
                        </DialogHeader>
                        <ConfirmDone task={task} />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-400">Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Update Task</DialogTitle>
                        </DialogHeader>
                        <EditTask task={task} assignables={props.assignables} />
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Delete Task</DialogTitle>
                        </DialogHeader>
                        <ConfirmDelete task={task} />
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
