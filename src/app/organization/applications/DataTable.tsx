import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type Props = {
  data: Prisma.OpportunityGetPayload<{
    include: {
      Application: true;
    };
  }>[];
};

export default function DataTable(props: Props) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Applications</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((opportunity) => {
            return (
              <TableRow key={opportunity.id}>
                <TableCell className="font-medium">{opportunity.id}</TableCell>
                <TableCell className="text-center">
                  {opportunity.title}
                </TableCell>
                <TableCell className="text-center">
                  {opportunity.Application.length}
                </TableCell>
                <TableCell className="text-center">
                  {opportunity.is_active ? "Active" : "Inactive"}
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/organization/applications/${opportunity.id}`}>
                    <Button>View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
