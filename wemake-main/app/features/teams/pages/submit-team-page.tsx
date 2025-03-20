import { Form } from "react-router";
import type { Route } from "./+types/submit-team-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => [
  { title: "Create Team | wemake" },
];

export default function SubmitTeamPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Team"
        subtitle="Create a team to find your team mates."
      />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            label="What is the name of your product?"
            name="name"
            description="(20 characters max)"
            maxLength={20}
            type="text"
            id="name"
            required
          />
          <SelectPair
            label="What is the stage of your product?"
            name="stage"
            description="(Select one)"
            required
            placeholder="Select one"
            options={[
              { label: "Idea", value: "idea" },
              { label: "MVP", value: "mvp" },
              { label: "Prototype", value: "prototype" },
              { label: "Product", value: "product" },
            ]}
          />
          <InputPair
            label="What is the size of your team?"
            name="size"
            description="(1-100)"
            maxLength={100}
            minLength={1}
            type="number"
            id="size"
            required
          />
          <InputPair
            label="How much equity are you willing to give?"
            name="equity"
            description="(each %)"
            maxLength={100}
            minLength={1}
            type="number"
            id="equity"
          />
          <InputPair
            label="What roles are you looking for?"
            placeholder="e.g. Frontend Developer, Backend Developer, etc."
            name="roles"
            description="(comma separated)"
            maxLength={100}
            minLength={1}
            type="text"
            id="roles"
          />
          <InputPair
            label="What is the description of your product?"
            name="description"
            placeholder="e.g. We are building a new social media platform for dogs to connect with each other."
            description="(200 characters max)"
            maxLength={200}
            type="text"
            id="description"
            required
            textArea
          />
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Create Team
        </Button>
      </Form>
    </div>
  );
}
