// "use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddUserForm from "./AddUserForm";
import InvitedUsers from "./InvitedUsers";
import CurrentUsers from "./CurrentUsers";

export default function WorkspaceMembers({
  params,
}: {
  params: { workspaceId: string };
}) {
  // const params = useParams<{ workspaceId: string }>();
  console.table(params);

  return (
    <div className="border p-4 m-4">
      <span className="flex items-center">
        <h1>Members</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription className="px-4">
                Add user to workspace
              </DialogDescription>
            </DialogHeader>
            <AddUserForm workspaceId={Number(params.workspaceId)} />
          </DialogContent>
        </Dialog>
      </span>

      <h2>Invited Members</h2>
      <InvitedUsers workspaceId={Number(params.workspaceId)} />

      <h2>Current Members</h2>
      <CurrentUsers workspaceId={Number(params.workspaceId)} />
    </div>
  );
}
