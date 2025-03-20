import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";

export default function SubmitPostPage() {
  return (
    <div className="pace-y-20">
      <Hero
        title="Create Discussion"
        subtitle="Share your thoughts and ideas with the community"
      />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputPair
          label="Title"
          name="title"
          id="title"
          description="40 characters or less"
          placeholder="i.e. what is the best way to learn React?"
        />
        <SelectPair
          label="Category"
          name="category"
          description="Select the category that best fits your post"
          required
          placeholder="i.e. React"
          options={[
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
          ]}
        />
        <InputPair
          label="Content"
          name="content"
          id="content"
          textArea
          description="1000 characters max"
          placeholder="i.e. I'm having trouble understanding the concept of..."
        />
        <Button className="mx-auto">Create Discussion</Button>
      </Form>
    </div>
  );
}
