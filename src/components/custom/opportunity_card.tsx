import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  id: number;
  title: string;
  details: string;
  location: string;
  start_date: string;
  end_date: string;
  href: string;
};

export default function OpportunityCard(props: Props) {
  return (
    <div className="border mb-4">
      <h2>{props.title}</h2>
      <p className="p-4">{props.details}</p>
      <p className="px-4">Location: {props.location}</p>
      <p className="px-4">
        {props.start_date} - {props.end_date}
      </p>
      <Link href={props.href}>
        <Button className="m-4">View Opportunity</Button>
      </Link>
    </div>
  );
}
