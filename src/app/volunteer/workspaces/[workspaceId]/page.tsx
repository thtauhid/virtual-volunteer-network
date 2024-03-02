import prisma from "@/lib/prisma";

type Props = {
  params: {
    workspaceId: string;
  };
};

export default async function SingleWorkspacePage(props: Props) {
  const workspace = await prisma.workspace.findUnique({
    where: {
      id: Number(props.params.workspaceId),
    },
  });

  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  return (
    <div className="border p-4 m-4">
      <h1>{workspace.name}</h1>
      <div className="p-4">
        <p>{workspace.details}</p>
      </div>
    </div>
  );
}
