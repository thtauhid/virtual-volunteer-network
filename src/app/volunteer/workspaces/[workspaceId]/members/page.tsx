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

import CurrentUsers from "./CurrentUsers";

export default function WorkspaceMembers({
  params,
}: {
  params: { workspaceId: string };
}) {
  console.table(params);

  return (
    <div className="border p-4 m-4">
      <h1>Members</h1>

      <CurrentUsers workspaceId={Number(params.workspaceId)} />
    </div>
  );
}
