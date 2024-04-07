import { auth } from "@clerk/nextjs";
import CallBox from "./CallBox";
import prisma from "@/lib/prisma";

export default async function WorkspaceCalls() {
  const { userId } = auth();

  const user = await prisma.user.findFirst({
    where: {
      id: userId!,
    },
  });

  const call = await prisma.call.create({
    data: {
      ownerId: user!.id,
    },
  });

  return (
    <div className="border p-4 m-4">
      <h1>Remote Meeting</h1>
      <CallBox user={user!} call={call} />
    </div>
  );
}
