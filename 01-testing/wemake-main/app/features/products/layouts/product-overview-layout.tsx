import { Button, buttonVariants } from "~/common/components/ui/button";
import { NavLink, Outlet } from "react-router";
import { StarIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export default function ProductOverviewLayout() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div>
            <h1 className="text-5xl font-bold">Product Name</h1>
            <p className="text-2xl font-light">product description</p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon className="size-4" fill="currentColor" />
                ))}
              </div>
              <span className="text-muted-foreground">100 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Button variant="secondary" size="lg" className="text-sm h-14 px-10">
            Visit Website
          </Button>
          <Button size="lg" className="text-sm h-14 px-10">
            <ChevronUpIcon className="size-4" />
            Upvote (100)
          </Button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <NavLink
          end
          className={({ isActive }) =>
            cn([
              buttonVariants({ variant: "outline" }),
              isActive && "bg-accent text-foreground",
            ])
          }
          to={`/products/1/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          end
          className={({ isActive }) =>
            cn([
              buttonVariants({ variant: "outline" }),
              isActive && "bg-accent text-foreground",
            ])
          }
          to={`/products/1/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
