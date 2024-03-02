"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { WorkspaceUserInvitation, Workspace } from "@prisma/client";

type Props = {
  invite: WorkspaceUserInvitation & { workspace: Workspace };
};

export default function ConfirmAccept(props: Props) {
  const { toast } = useToast();

  return (
    <div className="px-4">
      <p className="text-xl">{props.invite.workspace.name}</p>
      <strong>{props.invite.workspace.details}</strong>

      <p className="my-4">Are you sure you want to accept invitation?</p>
      <Button
        className="bg-green-500"
        onClick={async () => {
          const result = await fetch("/api/volunteer/workspaces", {
            method: "POST",
            body: JSON.stringify({
              workspaceId: props.invite.workspaceId,
              invitationId: props.invite.id,
            }),
          });

          if (result.ok) {
            toast({
              title: "Invitation Accepted",
              description: "The invitation has been accepted",
            });

            // Reload after 3 seconds
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            toast({
              title: "Failed",
              description: "Failed to accept invitation",
            });
          }
        }}
      >
        Accept Invitation
      </Button>
    </div>
  );
}
