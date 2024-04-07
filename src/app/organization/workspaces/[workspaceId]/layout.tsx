import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
  params: { workspaceId: string };
};
export default function RootLayout(props: Props) {
  return (
    <div>
      <div className="flex">
        <div className="w-1/4">
          <Sidebar workspaceId={props.params.workspaceId} />
        </div>
        <div className="w-3/4">{props.children}</div>
      </div>
    </div>
  );
}
