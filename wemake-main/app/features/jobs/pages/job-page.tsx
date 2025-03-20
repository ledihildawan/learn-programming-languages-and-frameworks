import { DotIcon } from "lucide-react";
import type { Route } from "./+types/job-page";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: `Job Details | wemake` },
    { name: "description", content: "Job details" },
  ];
};

export default function JobPage() {
  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 -mt-20 gap-20 items-start">
        <div className="col-span-4 space-y-5">
          <div className="size-40 bg-white rounded-full overflow-hidden relative left-10">
            <img
              src="https://github.com/facebook.png"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Software Engineer</h1>
            <h4 className="text-lg text-muted-foreground">Meta</h4>
          </div>
          <div>
            <div className="flex gap-2">
              <Badge variant="secondary">Full-Time</Badge>
              <Badge variant="secondary">Remote</Badge>
            </div>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">
              We are looking for a Software Engineer with a passion for building
              scalable and efficient systems.
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Develop and maintain web applications using React, Next.js, and TypeScript",
                "Collaborate with cross-functional teams to define, design, and ship new features",
                "Optimize application performance and ensure scalability",
                "Maintain code quality, organization, and proper documentation",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Bachelor's degree in Computer Science or related field",
                "3+ years of experience in software development",
                "Strong proficiency in React, Next.js, and TypeScript",
                "Experience with Node.js and Express",
                "Familiarity with MongoDB and PostgreSQL",
                "Excellent problem-solving skills",
                "Strong communication and teamwork skills",
                "Flexible working hours",
                "Remote work options",
                "Health and wellness benefits",
                "Professional development opportunities",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Flexible working hours",
                "Remote work options",
                "Health and wellness benefits",
                "Professional development opportunities",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Express",
                "MongoDB",
                "PostgreSQL",
                "Docker",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 space-y-5 mt-32 sticky top-20 p-6 border rounded-lg">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
            <span className="text-2xl font-medium">$100,000 - $120,000</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium">Remote</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Job Type</span>
            <span className="text-2xl font-medium">Full Time</span>
          </div>
          <div className="flex">
            <span className="text-sm text-muted-foreground">
              Posted 2 days ago
            </span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">345 views</span>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}
