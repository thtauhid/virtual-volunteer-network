import { FolderXIcon } from "lucide-react";

export default function WorkspacesDashboard() {
  return (
    <div className="border p-4 m-4">
      <h1>Workspaces</h1>
      <p className="px-4">All your workspaces</p>

      <div className="p-4 text-gray-500 flex flex-col items-center gap-4">
        <FolderXIcon className="h-16 w-16" />
        <p>No workspace found</p>
      </div>
    </div>
  );
}
