import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
  content: string;
  avatarUrl: string;
  avatarFallback: string;
  isCurrentUser?: boolean;
}

export function MessageBubble({
  content,
  avatarUrl,
  avatarFallback,
  isCurrentUser = false,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-4",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div
        className={cn({
          "rounded-md p-4 text-sm w-1/4": true,
          "bg-accent rounded-br-none": isCurrentUser,
          "bg-primary/10 rounded-bl-none": !isCurrentUser,
        })}
      >
        <p>{content}</p>
      </div>
    </div>
  );
}
