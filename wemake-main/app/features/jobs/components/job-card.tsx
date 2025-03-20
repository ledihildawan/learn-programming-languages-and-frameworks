import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";

interface JobCardProps {
  id: string;
  company: string;
  companyLogoUrl: string;
  companyHq: string;
  title: string;
  type: string;
  position: string;
  salary: string;
  createdAt: string;
}

export function JobCard({
  id,
  company,
  companyLogoUrl,
  companyHq,
  title,
  type,
  position,
  salary,
  createdAt,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent transition-colors hover:bg-card/50">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={companyLogoUrl}
              alt={`${company} Logo`}
              className="size-10 rounded-full"
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{company}</span>
              <span className="text-xs text-muted-foreground">{createdAt}</span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">{type}</Badge>
          <Badge variant="outline">{position}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              {salary}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {companyHq}
            </span>
          </div>
          <Button variant="secondary" size="sm">
            Apply Now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
