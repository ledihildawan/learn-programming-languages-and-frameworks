import { JobCard } from "../components/job-card";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Jobs | wemake.jobs" },
    { name: "description", content: "Find your dream job here" },
  ];
};

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-20">
      <Hero title="Jobs" subtitle="Companies looking for top talent" />
      <div className="grid grid-cols-1 xl:grid-cols-6gap-20 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
          {Array.from({ length: 20 }).map((_, index) => (
            <JobCard
              key={index}
              id="jobId"
              company="Meta"
              companyLogoUrl="https://github.com/facebook.png"
              companyHq="Calgary, AB"
              title="Software Engineer"
              type="Full-time"
              position="Remote"
              salary="$100,000 - $120,000"
              createdAt="8 hours ago"
            />
          ))}
        </div>
        <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm font-bold text-muted-foreground">Type</h4>
            <div className="flex flex-wrap gap-2">
              {" "}
              {JOB_TYPES.map((type) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("type", type.value)}
                  className={cn(
                    type.value === searchParams.get("type") ? "bg-accent" : ""
                  )}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm font-bold text-muted-foreground">
              Location
            </h4>
            <div className="flex flex-wrap gap-2">
              {" "}
              {LOCATION_TYPES.map((type) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("location", type.value)}
                  className={cn(
                    type.value === searchParams.get("location")
                      ? "bg-accent"
                      : ""
                  )}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm font-bold text-muted-foreground">Salary</h4>
            <div className="flex flex-wrap gap-2">
              {" "}
              {SALARY_RANGES.map((range) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("salary", range)}
                  className={cn(
                    range === searchParams.get("salary") ? "bg-accent" : ""
                  )}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
