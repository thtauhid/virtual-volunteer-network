import Card from "@/components/custom/card";

const cards = [
  {
    title: "All Opportunities",
    details: "View all your opportunities",
    number: 12,
    button: {
      title: "View",
      href: "/organization/opportunity",
    },
  },
  {
    title: "Create Opportunity",
    details: "Create a volunteering opportunity",
    button: {
      title: "Create",
      href: "/organization/opportunity/create",
    },
  },
  {
    title: "Applications",
    details: "View all applications",
    // number: 50,
    button: {
      title: "View",
      href: "/organization/applications",
    },
  },
];

export default function OrganizationDashboard() {
  return (
    <div className="border m-4 p-4">
      <h1>Organization Dashboard</h1>

      <div className="grid grid-cols-3 p-4 gap-4">
        {cards.map((card, i) => (
          <Card key={i} {...card} />
        ))}
      </div>
    </div>
  );
}
