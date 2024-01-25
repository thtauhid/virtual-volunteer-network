import { Button } from "@/components/ui/button";

const opportunity = {
  id: 2,
  title: "Opportunity 2",
  details: "Details 2",
  location: "Location 2",
  start_date: "Start Date 2",
  end_date: "End Date 2",
};

export default function SingleOpportunityPage() {
  return (
    <div className="border p-4 m-4">
      <h1>{opportunity.title}</h1>
      <p className="p-4">{opportunity.details}</p>
      <p className="px-4">Location: {opportunity.location}</p>
      <p className="px-4">
        {opportunity.start_date} - {opportunity.end_date}
      </p>
      <div className="m-4 flex gap-4">
        <Button className="">Apply</Button>
      </div>
    </div>
  );
}
