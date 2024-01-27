import prisma from "@/lib/prisma";
import DataTable from "./DataTable";
import { auth } from "@clerk/nextjs";

export default async function OpportunitiesAppliedTo() {
  const { userId } = auth();

  const applications = await prisma.application.findMany({
    where: {
      applicantId: userId!,
    },

    include: {
      opportunity: true,
    },
  });

  return (
    <div className="p-4">
      <DataTable data={applications} />
    </div>
  );
}
