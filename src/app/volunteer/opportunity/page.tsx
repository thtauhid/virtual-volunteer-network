import OpportunityCard from "@/components/custom/opportunity_card";

const opportunities = [
  {
    id: 1,
    title: "Opportunity 1",
    details: "Details 1",
    location: "Location 1",
    start_date: "Start Date 1",
    end_date: "End Date 1",
    href: "/volunteer/opportunity/1",
  },
  {
    id: 2,
    title: "Opportunity 2",
    details: "Details 2",
    location: "Location 2",
    start_date: "Start Date 2",
    end_date: "End Date 2",
    href: "/volunteer/opportunity/2",
  },
  {
    id: 3,
    title: "Opportunity 3",
    details: "Details 3",
    location: "Location 3",
    start_date: "Start Date 3",
    end_date: "End Date 3",
    href: "/volunteer/opportunity/3",
  },
];

export default function OpportunityDashboard() {
  return (
    <div className="border m-4 p-4">
      <h1>Opportunities</h1>
      <div className="p-4">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} {...opportunity} />
        ))}
      </div>
    </div>
  );
}
