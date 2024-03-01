"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { WorkspaceUserInvitation, User } from "@prisma/client";

type Props = {
  invite: WorkspaceUserInvitation & { user: User };
};
export default function ConfirmCancel(props: Props) {
  const { toast } = useToast();

  return (
    <div className="px-4">
      <p className="text-xl">{props.invite.user.name}</p>
      <strong>{props.invite.user.email}</strong>

      <p className="my-4">Are you sure you want to cancel invitation?</p>
      <Button
        className="bg-red-500"
        onClick={async () => {
          const result = await fetch(`/api/organization/workspaces/members`, {
            method: "DELETE",
            body: JSON.stringify({
              id: props.invite.id,
            }),
          });

          if (result.ok) {
            toast({
              title: "Invitation Cancelled",
              description: "The invitation has been cancelled",
            });

            // Reload after 3 seconds
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            toast({
              title: "Failed",
              description: "Failed to cancel invitation",
            });
          }
        }}
      >
        Cancel Invitation
      </Button>
    </div>
  );
}
