import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { Button } from "~/common/components/ui/button";
export const meta: Route.MetaFunction = () => {
  return [
    { title: `Post a Job | wemake` },
    { name: "description", content: "Post a Job" },
  ];
};

export default function SubmitJobPage() {
  return (
    <div>
      <Hero
        title="Post a Job"
        subtitle="Post a Job to wemake. We'll review your job and get back to you as soon as possible."
      />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            id="position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. Software Engineer"
          />
          <InputPair
            id="overview"
            label="Overview"
            description="(1000 characters max)"
            name="overview"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. We are looking for a Software Engineer who has experienced in React and Node.js."
            textArea
          />
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(1000 characters max, comma separated)"
            name="responsibilities"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. Implement new features, Refactor code, Debug issues"
            textArea
          />
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(1000 characters max, comma separated)"
            name="qualifications"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. Bachelor's degree in Computer Science or equivalent, 1 year or less of experience in React and Node.js"
            textArea
          />
          <InputPair
            id="benefits"
            label="Benefits"
            description="(1000 characters max, comma separated)"
            name="benefits"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. Health insurance, Dental insurance, Vision insurance, etc."
            textArea
          />
          <InputPair
            id="skills"
            label="Skills"
            description="(1000 characters max, comma separated)"
            name="skills"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. React, Node.js, TypeScript, etc."
            textArea
          />
          <InputPair
            id="company_name"
            label="Company Name"
            description="(40 characters max)"
            name="company_name"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. Google"
          />
          <InputPair
            id="company_logo_url"
            label="Company Logo URL"
            description="(1000 characters max)"
            name="company_logo_url"
            maxLength={100}
            type="text"
            required
            placeholder="e.g. https://example.com/logo.png"
          />
          <InputPair
            id="company_location"
            label="Company Location"
            description="(100 characters max)"
            name="company_location"
            maxLength={100}
            type="text"
            required
            placeholder="e.g. San Francisco, CA"
          />
          <InputPair
            id="apply_url"
            label="Apply URL"
            description="(1000 characters max)"
            name="apply_url"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. https://example.com/apply"
          />
          <SelectPair
            label="Job Type"
            description="Select the type of job"
            name="job_type"
            required
            placeholder="Select the type of job"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="location"
            required
            placeholder="Select the location of the job"
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
          />
          <SelectPair
            label="Salary Range"
            description="Select the salary of the job"
            name="salary_range"
            required
            placeholder="Select the salary of the job"
            options={SALARY_RANGES.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
