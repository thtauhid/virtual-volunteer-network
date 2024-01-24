import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/posts", label: "Blog" },
];

export default async function Header() {
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
          <Button>
            <Link href="/dashboard">Sign In</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}
