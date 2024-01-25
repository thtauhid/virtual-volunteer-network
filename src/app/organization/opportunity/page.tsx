import OpportunityCard from "@/components/custom/opportunity_card";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export default async function OpportunityPage() {
  const clerk_user = await currentUser();

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerk_user?.id,
    },
  });

  const opportunities = await prisma.opportunity.findMany({
    where: {
      ownerId: user?.id,
      is_deleted: false,
      is_active: true,
    },
  });

  return (
    <div className="border m-4 p-4">
      <h1>Opportunities</h1>
      <p className="px-4">Only active opportunities are shown here.</p>
      <div className="p-4">
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            {...opportunity}
            user_type="organization"
          />
        ))}
      </div>
    </div>
  );
}
