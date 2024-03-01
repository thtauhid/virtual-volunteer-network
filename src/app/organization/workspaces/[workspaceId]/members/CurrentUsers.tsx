import prisma from "@/lib/prisma";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  workspaceId: number;
};

export default async function CurrentUsers(props: Props) {
  const currentUsers = await prisma.workspaceUser.findMany({
    where: {
      workspaceId: props.workspaceId,
    },
    include: {
      user: true,
    },
  });

  if (currentUsers.length === 0) {
    return <div className="p-4 text-center">No current users</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.user.name}</TableCell>
              <TableCell>{user.user.email}</TableCell>
              <TableCell>
                {/* <Button variant="destructive">Cancel</Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
