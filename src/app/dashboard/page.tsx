import { Button } from "@/components/ui/button";
import OrganizationDashboard from "../organization/page";
import VolunteerDashboard from "../volunteer/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

const isRegistered = async (clerkId: string | undefined) => {
  const user = await prisma.user.findFirst({
    where: {
      clerkId,
    },
  });

  return !!user;
};

// TODO: Replace with actual logic
const is_org = false;

export default async function Dashboard() {
  const user = await currentUser();

  const is_org_or_vol = await isRegistered(user?.id);

  if (!is_org_or_vol) {
    return <DashboardPage />;
  }

  if (is_org) {
    return <OrganizationDashboard />;
  }

  return <VolunteerDashboard />;
}

function DashboardPage() {
  return (
    <div className="border m-4 p-4">
      <h1>Choose your interest</h1>
      <div className="flex">
        <div className="m-4 border p-4 flex flex-col">
          <h2 className="text-center">Organization</h2>
          <p className="mb-4">
            Organizations can create and volunteering opportunities and manage
            their volunteers.
          </p>
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link href="/dashboard/organization-signup" className="flex flex-col">
            <Button>Sign up as an organization</Button>
          </Link>
        </div>
        <div className="border m-4 p-4 flex flex-col">
          <h2 className="text-center">Volunteer</h2>
          <p className="mb-4">
            Volunteers can find volunteering opportunities and manage their
            volunteering hours.
          </p>
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link href="/dashboard/volunteer-signup" className="flex flex-col">
            <Button>Sign up as a volunteer</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
