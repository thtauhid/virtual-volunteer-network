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
    label: "Remote Meeting",
    href: "/calls",
  },
];

type Props = {
  workspaceId: string;
};

export default function Sidebar(props: Props) {
  return (
    <div className="border mt-4 ml-4">
      <h2>Workspace Actions</h2>
      <div>
        {links.map((link) => (
          <a
            key={link.label}
            href={`/volunteer/workspaces/${props.workspaceId}` + link.href}
            className="block border-y p-4 hover:bg-gray-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
