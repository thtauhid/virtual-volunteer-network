import Link from "next/link";
import { Button } from "../ui/button";
import { Prisma } from "@prisma/client";
import { formatDateTime } from "@/lib/time";

type Props = Prisma.OpportunityGetPayload<{}>;

export default function OpportunityCard(props: Props) {
  return (
    <div className="border mb-4">
      <h2>{props.title}</h2>
      <p className="p-4">{props.details}</p>
      <p className="px-4">Location: {props.location}</p>
      <p className="px-4">
        {formatDateTime(props.start_date)} - {formatDateTime(props.end_date)}
      </p>
      <Link href={"/organization/opportunity/" + props.id}>
        <Button className="m-4">View Opportunity</Button>
      </Link>
    </div>
  );
}
