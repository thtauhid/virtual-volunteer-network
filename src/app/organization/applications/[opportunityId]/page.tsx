import prisma from "@/lib/prisma";
import DataTable from "./DataTable";

type Props = {
  params: {
    opportunityId: string;
  };
};

export default async function ApplicationsForOpportunity(props: Props) {
  const opportunity = await prisma.opportunity.findUnique({
    where: {
      id: Number(props.params.opportunityId),
    },
    include: {
      Application: {
        include: {
          applicant: true,
        },
      },
    },
  });

  console.log(opportunity);

  return (
    <div className="border p-4 m-4">
      <h1>Applications for {opportunity?.title}</h1>
      <p className="p-4">{opportunity?.details}</p>

      <h2>Applications</h2>

      {opportunity?.Application.length === 0 ? (
        <p className="p-4">No applications yet.</p>
      ) : (
        <DataTable data={opportunity?.Application || []} />
      )}
    </div>
  );
}
