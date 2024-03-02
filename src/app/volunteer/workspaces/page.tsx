import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { FolderXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmCancel from "./ConfirmCancel";
import ConfirmAccept from "./ConfirmAccept";

export default async function WorkspacesDashboard() {
  const { userId } = auth();

  const invitations = await prisma.workspaceUserInvitation.findMany({
    where: {
      userId: userId!,
    },
    include: {
      workspace: true,
    },
  });

  return (
    <div className="border p-4 m-4">
      <h1>Workspaces</h1>
      <p className="px-4">All your workspaces</p>
      <div>
        {invitations.length > 0 && (
          <div>
            <h2 className="mt-4">Invitations</h2>
            <p className="px-4">
              You have been invited to the following workspaces
            </p>
          </div>
        )}
        {invitations.map((invitation) => {
          return (
            <div
              key={invitation.id}
              className="border p-4 m-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold">{invitation.workspace.name}</h3>
                <p>{invitation.workspace.details}</p>
              </div>
              <div className="space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green-400">Accept</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Accept Invitation</DialogTitle>
                    </DialogHeader>
                    <ConfirmAccept invite={invitation} />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Decline</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Decline Invitation</DialogTitle>
                    </DialogHeader>
                    <ConfirmCancel invite={invitation} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 text-gray-500 flex flex-col items-center gap-4">
        <FolderXIcon className="h-16 w-16" />
        <p>No workspace found</p>
      </div>
    </div>
  );
}
