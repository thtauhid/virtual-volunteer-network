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
      applicant: true;
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
            <TableHead className="text-center">Applicant Details</TableHead>
            <TableHead className="text-center">Cover Letter</TableHead>
            <TableHead className="text-center">View</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((application) => {
            return (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.id}</TableCell>
                <TableCell className="text-center">
                  <div>
                    <p>{application.applicant.name}</p>
                    <p>{application.applicant.email}</p>
                    <p>{application.applicant.phone}</p>
                    <p>{application.applicant.address}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {application.message}
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/organization/applications/${application.id}`}>
                    <Button>View</Button>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex gap-2 justify-center">
                    <Button className="bg-green-600">Accept</Button>
                    <Button className="bg-red-600">Reject</Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
