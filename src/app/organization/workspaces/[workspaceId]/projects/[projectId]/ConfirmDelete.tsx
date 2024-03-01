"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { ProjectTask } from "@prisma/client";

type Props = {
  task: ProjectTask;
};
export default function ConfirmDelete(props: Props) {
  const { toast } = useToast();

  return (
    <div className="px-4">
      <p className="text-xl">{props.task.name}</p>
      <strong>{props.task.details}</strong>

      <p className="my-4">Are you sure you want to delete this task?</p>
      <Button
        className="bg-red-500"
        onClick={async () => {
          const result = await fetch(
            `/api/organization/workspaces/projects/task`,
            {
              method: "DELETE",
              body: JSON.stringify({
                id: props.task.id,
              }),
            }
          );

          if (result.ok) {
            toast({
              title: "Task deleted",
              description: "The task has been deleted",
            });

            // Reload after 3 seconds
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            toast({
              title: "Failed",
              description: "Failed to delete task",
            });
          }
        }}
      >
        DELETE
      </Button>
    </div>
  );
}
