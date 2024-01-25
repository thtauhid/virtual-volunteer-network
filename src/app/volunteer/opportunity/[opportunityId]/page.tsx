import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { formatDateTime } from "@/lib/time";

interface Props {
  params: {
    opportunityId: string;
  };
}

export default async function SingleOpportunityPage(props: Props) {
  const opportunity = await prisma.opportunity.findUnique({
    where: {
      id: Number(props.params.opportunityId),
      is_deleted: false,
      is_active: true,
    },
  });

  if (!opportunity) {
    return <div>Opportunity not found</div>;
  }
  return (
    <div className="border p-4 m-4">
      <h1>{opportunity.title}</h1>
      <p className="p-4">{opportunity.details}</p>
      <p className="px-4">Location: {opportunity.location}</p>
      <p className="px-4">
        {formatDateTime(opportunity.start_date)} -{" "}
        {formatDateTime(opportunity.end_date)}
      </p>
      <div className="m-4 flex gap-4">
        <Button className="">Apply</Button>
      </div>
    </div>
  );
}
