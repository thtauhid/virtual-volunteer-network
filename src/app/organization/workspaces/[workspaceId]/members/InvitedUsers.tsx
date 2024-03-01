import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import ConfirmCancel from "./ConfirmCancel";

type Props = {
  workspaceId: number;
};

export default async function InvitedUsers(props: Props) {
  const invitedUsers = await prisma.workspaceUserInvitation.findMany({
    where: {
      workspaceId: props.workspaceId,
    },
    include: {
      user: true,
    },
  });

  if (invitedUsers.length === 0) {
    return <div className="p-4 text-center">No invited users</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.user.name}</TableCell>
              <TableCell>{user.user.email}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Cancel</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete Task</DialogTitle>
                    </DialogHeader>
                    <ConfirmCancel invite={user} />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
