const links = [
  {
    label: "Members",
    href: "/members",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Chat",
    href: "/chat",
  },
  {
    label: "Calls",
    href: "/calls",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

export default function Sidebar() {
  return (
    <div className="border mt-4 ml-4">
      <h2>Workspace Actions</h2>
      <div>
        {links.map((link) => (
          <a
            key={link.label}
            href={`/organization/workspaces/3` + link.href}
            className="block border-y p-4 hover:bg-gray-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
