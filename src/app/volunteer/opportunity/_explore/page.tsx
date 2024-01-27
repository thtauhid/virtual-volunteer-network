import OpportunityCard from "@/components/custom/opportunity_card";
import prisma from "@/lib/prisma";

export default async function ExploreOpportunities() {
  const opportunities = await prisma.opportunity.findMany({
    where: {
      is_deleted: false,
      is_active: true,
    },
  });

  return (
    <div className="p-4">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          {...opportunity}
          user_type="volunteer"
        />
      ))}
    </div>
  );
}
