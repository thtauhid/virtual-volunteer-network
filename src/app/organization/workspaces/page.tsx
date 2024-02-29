import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { FolderXIcon } from "lucide-react";
import Link from "next/link";

export default async function WorkspaceDashboardPage() {
  const { userId } = auth();
  const workspaces = await prisma.workspace.findMany({
    where: {
      ownerId: userId!,
    },
  });

  return (
    <div className="border p-4 m-4">
      <span className="flex items-center">
        <h1>Workspaces</h1>{" "}
        {workspaces.length !== 0 && (
          <Link href={`/organization/workspaces/create`}>
            <Button>Create New Workspace</Button>
          </Link>
        )}
      </span>
      <p className="px-4">All your workspaces</p>
      {workspaces.length === 0 ? (
        <div className="p-4 text-gray-500 flex flex-col items-center gap-4">
          <FolderXIcon className="h-16 w-16" />
          <p>No workspace found</p>
          <Link href={`/organization/workspaces/create`}>
            <Button>Create New Workspace</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {workspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} {...workspace} />
          ))}
        </div>
      )}
    </div>
  );
}

type WorkspaceCardProps = Prisma.WorkspaceGetPayload<{}>;
const WorkspaceCard = (props: WorkspaceCardProps) => {
  return (
    <div className="border p-4 m-4">
      <h1>{props.name}</h1>
      <div className="p-4">
        <p className="mb-4">{props.details}</p>
        <Link href={`/organization/workspaces/${props.id}`}>
          <Button>View</Button>
        </Link>
      </div>
    </div>
  );
};
