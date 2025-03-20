import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";

interface TeamCardProps {
  id: string;
  leaderUserName: string;
  leaderAvatar: string;
  positions: string[];
  project: string;
}

export function TeamCard({
  id,
  leaderUserName,
  leaderAvatar,
  positions,
  project,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="bg-transparent transition-colors hover:bg-card/50">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge
              variant="secondary"
              className="inline-flex shadow-sm items-center text-base"
            >
              <span>@{leaderUserName}</span>
              <Avatar className="size-5">
                <AvatarFallback>{leaderUserName[0]}</AvatarFallback>
                {leaderAvatar && <AvatarImage src={leaderAvatar} />}
              </Avatar>
            </Badge>
            <span> is looking for </span>
            {positions.map((position) => (
              <Badge key={position} className="text-base">
                {position}
              </Badge>
            ))}
            <span> to build</span>
            <span> {project}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button variant="link">Join Team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
