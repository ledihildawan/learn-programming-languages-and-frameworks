import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import { Form, Link } from "react-router";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  content: string;
  username: string;
  avatarUrl: string;
  timestamp: string;
  topLevel: boolean;
}

export function Reply({
  content,
  username,
  avatarUrl,
  timestamp,
  topLevel,
}: ReplyProps) {
  const [replies, setReplies] = useState(false);
  const toggleReplies = () => {
    setReplies((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-5 items-start w-2/3">
        <Avatar className="size-14">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex items-center gap-2">
            <Link to={`users/@${username}`}>
              <h4 className="font-medium">{username}</h4>
            </Link>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          <p className="text-muted-foreground">{content}</p>
          <Button
            variant="outline"
            className="self-end"
            onClick={toggleReplies}
          >
            <MessageCircleIcon className="size-4" />
            Reply
          </Button>
        </div>
      </div>{" "}
      {replies && (
        <Form className="flex items-start gap-5 w-3/4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/debora-k.png" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-end gap-5 w-full">
            <Textarea
              placeholder="Add a reply"
              className="w-full resize-none"
              rows={3}
            />
            <Button>Reply</Button>
          </div>
        </Form>
      )}
      {topLevel && (
        <div className="pl-20 w-full">
          <Reply
            content="This is a reply to this comment. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            username="John Doe"
            avatarUrl="https://github.com/john-doe.png"
            timestamp="10 hours ago"
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
