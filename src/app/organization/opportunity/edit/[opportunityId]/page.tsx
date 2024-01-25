import { Button } from "@/components/ui/button";
import Link from "next/link";

const opportunity = {
  id: 2,
  title: "Opportunity 2",
  details: "Details 2",
  location: "Location 2",
  start_date: "Start Date 2",
  end_date: "End Date 2",
  edit_href: "/organization/opportunity/edit/2",
  remove_href: "/organization/opportunity/remove/2",
};

export default function EditOpportunity() {
  return (
    <div className="border p-4 m-4">
      <h1>{opportunity.title}</h1>
      <p className="p-4">{opportunity.details}</p>
      <p className="px-4">Location: {opportunity.location}</p>
      <p className="px-4">
        {opportunity.start_date} - {opportunity.end_date}
      </p>
      <div className="m-4 flex gap-4">
        <Link href={opportunity.edit_href}>
          <Button className="">Edit Opportunity</Button>
        </Link>
        <Link href={opportunity.remove_href}>
          <Button className="">Remove Opportunity</Button>
        </Link>
      </div>
    </div>
  );
}
