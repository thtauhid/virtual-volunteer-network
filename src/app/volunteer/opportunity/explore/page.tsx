import prisma from "@/lib/prisma";
import ExploreOpportunities from "../_explore/page";

export default async function ExploreOpportunitiesPage() {
  const opportunities = await prisma.opportunity.findMany({
    where: {
      is_deleted: false,
      is_active: true,
    },
  });

  return (
    <div className="border m-4 p-4">
      <h1>Explore Opportunities</h1>
      <ExploreOpportunities />
    </div>
  );
}
