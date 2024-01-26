import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
} from "@clerk/nextjs";
import Link from "next/link";

type Link = {
  href: string;
  label: string;
};

let links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const volunteer_links = [
  { href: "/volunteer", label: "Dashboard" },
  { href: "/volunteer/opportunity", label: "Opportunities" },
  { href: "/volunteer/workspaces", label: "Workspaces" },
];

const organization_links = [
  { href: "/organization", label: "Dashboard" },
  { href: "/organization/opportunity", label: "Opportunities" },
  { href: "/organization/workspaces", label: "Workspaces" },
];

export default async function Header() {
  const { userId } = auth();

  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const isOrganization = user?.user_type === "organization";
    links = isOrganization ? organization_links : volunteer_links;
  }

  return (
    <div className="bg-gray-600 p-4 flex justify-between items-center">
      <div className="">
        {links.map(({ href, label }) => {
          return (
            <Link
              href={href}
              key={href}
              className="p-5 mx-1 hover:bg-gray-700 text-white"
            >
              {label}
            </Link>
          );
        })}
      </div>
      <div className="text-white">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-2">
            <Button>
              <SignInButton mode="modal" />
            </Button>
            <Button>
              <SignUpButton mode="modal" />
            </Button>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
