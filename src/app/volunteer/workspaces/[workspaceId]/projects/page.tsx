import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CurrentProjects from "./CurrentProjects";

export default function WorkspaceProjects({
  params,
}: {
  params: { workspaceId: string };
}) {
  return (
    <div className="border p-4 m-4">
      <h1>Projects</h1>

      <CurrentProjects workspaceId={Number(params.workspaceId)} />
    </div>
  );
}
