import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { formatDateTime } from "@/lib/time";
import Link from "next/link";

interface Props {
  params: {
    opportunityId: string;
  };
}

export default async function SingleOpportunity(props: Props) {
  // TODO: Add additional logic to check if opportunity is owned by user
  const opportunity = await prisma.opportunity.findUnique({
    where: {
      id: Number(props.params.opportunityId),
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
        <Link href={"/organization/opportunity/edit/" + opportunity.id}>
          <Button className="">Edit Opportunity</Button>
        </Link>
        <Link href={"/organization/opportunity/remove/" + opportunity.id}>
          <Button className="">Remove Opportunity</Button>
        </Link>
      </div>
    </div>
  );
}
