import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExploreOpportunities from "./_explore/page";
import OpportunitiesAppliedTo from "./_applied/page";

export default async function OpportunityDashboard() {
  return (
    <div className="border p-4 m-4">
      <h1>Opportunity Dashboard</h1>

      <Tabs defaultValue="explore">
        <TabsList className="m-4">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <ExploreOpportunities />
        </TabsContent>
        <TabsContent value="applied">
          <OpportunitiesAppliedTo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
