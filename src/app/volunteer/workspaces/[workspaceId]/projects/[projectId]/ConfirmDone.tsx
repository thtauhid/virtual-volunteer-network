"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { ProjectTask } from "@prisma/client";

type Props = {
  task: ProjectTask;
};
export default function ConfirmDone(props: Props) {
  const { toast } = useToast();

  return (
    <div className="px-4">
      <p className="text-xl">{props.task.name}</p>
      <strong>{props.task.details}</strong>

      <p className="my-4">Are you sure you want to mark this task as done?</p>
      <Button
        className="bg-green-500"
        onClick={async () => {
          const result = await fetch(
            `/api/organization/workspaces/projects/task`,
            {
              method: "PUT",
              body: JSON.stringify({
                id: props.task.id,
                is_done: true,
              }),
            }
          );

          if (result.ok) {
            toast({
              title: "Task marked as done",
              description: "The task has been marked as done",
            });

            // Reload after 3 seconds
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            toast({
              title: "Failed",
              description: "Failed to mark task as done",
            });
          }
        }}
      >
        Mark as done
      </Button>
    </div>
  );
}
