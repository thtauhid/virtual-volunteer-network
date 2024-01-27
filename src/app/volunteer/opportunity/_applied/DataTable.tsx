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
  data: Prisma.ApplicationGetPayload<{
    include: {
      opportunity: true;
    };
  }>[];
};

export default function DataTable(props: Props) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Application ID</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Cover Letter</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((application) => {
            return (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.id}</TableCell>
                <TableCell className="text-center">
                  {application.opportunity.title}
                </TableCell>
                <TableCell className="text-center">
                  {application.message}
                </TableCell>
                <TableCell className="text-center">
                  {
                    // TODO: Add status
                  }
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    href={`/volunteer/opportunity/${application.opportunityId}`}
                  >
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
