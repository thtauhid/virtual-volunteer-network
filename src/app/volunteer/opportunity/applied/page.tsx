import OpportunityCard from "@/components/custom/opportunity_card";
import prisma from "@/lib/prisma";
import DataTable from "./DataTable";
import { auth } from "@clerk/nextjs";

export default async function OpportunitiesAppliedToPage() {
  const { userId } = auth();

  const applications = await prisma.application.findMany({
    where: {
      applicantId: userId!,
    },

    include: {
      opportunity: true,
    },
  });

  console.log(applications);

  return (
    <div className="border m-4 p-4">
      <h1>Opportunities Applied To</h1>
      <p className="p-4">Opportunities you have applied to</p>
      <div className="p-4">
        <DataTable data={applications} />
      </div>
    </div>
  );
}
