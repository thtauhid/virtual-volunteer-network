import OrganizationDashboard from "../organization/page";
import VolunteerDashboard from "../volunteer/page";
import prisma from "@/lib/prisma";
import { SignIn, auth } from "@clerk/nextjs";
import DashboardPage from "./DashboardPage";

export default async function Dashboard() {
  const { userId } = auth();

  if (userId) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (user) {
      if (user.user_type === "organization") {
        return <OrganizationDashboard />;
      }

      return <VolunteerDashboard />;
    }

    return <DashboardPage />;
  }

  return <SignIn />;
}
