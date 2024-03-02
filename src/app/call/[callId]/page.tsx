import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import CallBox from "./CallBox";

export default async function Call({ params }: { params: { callId: string } }) {
  const { userId } = auth();

  const user = await prisma.user.findFirst({
    where: {
      id: userId!,
    },
  });

  console.log(params.callId);
  return (
    <div>
      <CallBox user={user!} callId={params.callId} />
    </div>
  );
}
