import prisma from "@/lib/prisma";

import Link from "next/link";

type Props = {
  workspaceId: number;
};

export default async function InvitedUsers(props: Props) {
  const projects = await prisma.project.findMany({
    where: {
      workspaceId: props.workspaceId,
    },
  });

  if (projects.length === 0) {
    return <div className="p-4 text-center">No projects</div>;
  }

  return (
    <div>
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/organization/workspaces/${props.workspaceId}/projects/${project.id}`}
          className="block border p-4 m-4 hover:bg-gray-200"
        >
          <div key={project.id} className="">
            <h2>{project.name}</h2>
            <p className="px-4">{project.details}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
