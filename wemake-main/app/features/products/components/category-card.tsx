import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/common/components/ui/card";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
}

export function CategoryCard({ id, name, description }: CategoryCardProps) {
  return (
    <Link to={`/products/categories/${id}`} className="block">
      <Card>
        <CardHeader>
          <CardTitle className="flex">
            {name} <ChevronRightIcon className="size-6" />
          </CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
