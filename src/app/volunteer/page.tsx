import Card from "@/components/custom/card";

const opportunities_cards = [
  {
    title: "All Opportunities",
    details: "View all your opportunities",
    number: 12,
    button: {
      title: "View",
      href: "/volunteer/opportunity",
    },
  },
  {
    title: "Opportunities Applied in",
    details: "View all the opportunities you have applied in",
    button: {
      title: "View",
      href: "/volunteer/opportunity/applied",
    },
  },
];
export default function VolunteerDashboard() {
  return (
    <div className="border m-4 p-4">
      <h1>Volunteer Dashboard</h1>

      <h2>Opportunities</h2>
      <p className="px-4">Explore new volunteering opportunities</p>
      <div className="grid grid-cols-3 p-4 gap-4">
        {opportunities_cards.map((card, i) => (
          <Card key={i} {...card} />
        ))}
      </div>

      <h2 className="mt-4">Workspace</h2>
      <p className="px-4 text-gray-500">No Workspace Found</p>
    </div>
  );
}
