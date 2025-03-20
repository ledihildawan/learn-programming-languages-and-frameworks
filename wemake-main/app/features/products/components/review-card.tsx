import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";

interface ReviewCardProps {
  avatarUrl: string;
  avatarFallback: string;
  authorName: string;
  username: string;
  rating: number;
  content: string;
  postedAt: string;
}

export function ReviewCard({
  avatarUrl,
  avatarFallback,
  authorName,
  username,
  rating,
  content,
  postedAt,
}: ReviewCardProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-lg font-bold">{authorName}</h4>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>
        </div>
        <div className="flex text-yellow-400">
          {Array.from({ length: rating }).map((_, index) => (
            <StarIcon key={index} className="size-4" fill="currentColor" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{content}</p>
        <span className="text-xs text-muted-foreground">{postedAt}</span>
      </div>
    </div>
  );
}
