import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreateNewProject from "./CreateNewProject";
import CurrentProjects from "./CurrentProjects";

export default function WorkspaceProjects({
  params,
}: {
  params: { workspaceId: string };
}) {
  return (
    <div className="border p-4 m-4">
      <span className="flex items-center">
        <h1>Projects</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <CreateNewProject workspaceId={Number(params.workspaceId)} />
          </DialogContent>
        </Dialog>
      </span>

      <CurrentProjects workspaceId={Number(params.workspaceId)} />
    </div>
  );
}
