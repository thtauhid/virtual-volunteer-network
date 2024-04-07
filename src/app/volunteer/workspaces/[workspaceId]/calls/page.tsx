import { auth } from "@clerk/nextjs";

import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function WorkspaceCalls() {
  const { userId } = auth();

  const user = await prisma.user.findFirst({
    where: {
      id: userId!,
    },
  });

  const calls = await prisma.call.findMany({
    where: {
      has_started: true,
      has_ended: false,
      updatedAt: {
        gte: new Date(Date.now() - 30 * 60 * 1000),
      },
    },
  });

  console.log(calls);

  return (
    <div className="border p-4 m-4">
      <h1>Remote Meeting</h1>
      {calls.length === 0 ? (
        <div className="p-4 text-center">No ongoing calls</div>
      ) : (
        <div>
          {calls.map((call) => (
            <div
              key={call.id}
              className="border p-4 m-4 flex items-center justify-between"
            >
              <h3 className="font-bold">Call Ongoing</h3>
              <Link href={`http://localhost:3000/call/${call.id}`}>
                <Button>Join Call</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
