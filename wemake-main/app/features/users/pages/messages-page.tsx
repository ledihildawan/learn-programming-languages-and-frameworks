import type { Route } from "./+types/messages-page";
import { MessageCircleIcon } from "lucide-react";
export const meta: Route.MetaFunction = () => {
  return [{ title: "Messages | wemake" }];
};

export default function MessagesPage() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      <MessageCircleIcon className="size-12 text-muted-foreground" />
      <h1 className="text-xl font-medium text-center text-muted-foreground">
        Click on a message in the sidebar to view it
      </h1>
    </div>
  );
}
