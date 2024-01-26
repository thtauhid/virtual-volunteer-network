import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import Table from "./table";

export default async function Applications() {
  const { userId } = auth();

  const opportunities = await prisma.opportunity.findMany({
    where: {
      ownerId: userId!,
      is_deleted: false,
    },
    include: {
      Application: true,
    },
  });

  return (
    <div className="border p-4 m-4">
      <h1>Applications</h1>
      <p className="p-4">Applications for all active opportunities.</p>

      <div className="p-4">
        <Table data={opportunities} />
      </div>
    </div>
  );
}
