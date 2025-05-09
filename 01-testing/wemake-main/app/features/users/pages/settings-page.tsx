import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/settings-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Settings | wemake" }];
};

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-20">
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-bold">Edit profile</h2>
          <Form className="flex flex-col w-2/3 gap-5">
            <InputPair
              label="Name"
              description="This will be displayed on your profile and in search results."
              name="name"
              id="name"
              required
              placeholder="John Doe"
            />
            <SelectPair
              label="Role"
              description="This will be displayed on your profile and in search results."
              name="role"
              required
              placeholder="Select your role"
              options={[
                { label: "Designer", value: "designer" },
                { label: "Developer", value: "developer" },
                { label: "Product Manager", value: "product-manager" },
                { label: "Entrepreneur", value: "entrepreneur" },
                { label: "Other", value: "other" },
              ]}
            />
            <InputPair
              label="Bio"
              description="This will be displayed on your profile and in search results."
              name="bio"
              id="bio"
              required
              textArea
            />
            <InputPair
              label="Headline"
              description="An introduction to your profile."
              name="headline"
              id="headline"
              required
              textArea
            />
            <Button className="w-full">Update Profile</Button>
          </Form>
        </div>
        <aside className="col-span-2 row-span-1 p-6 rounded-lg border shadow-md">
          <span className="text-sm font-bold text-muted-foreground uppercase">
            Update Avatar
          </span>
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" />
              ) : null}
            </div>
            <Input
              type="file"
              className="w-1/2"
              onChange={onChange}
              required
              name="icon"
            />
            <div className="flex flex-col text-xs">
              {" "}
              <span className="text-muted-foreground">
                Recommended size: 128x128px
              </span>
              <span className="text-muted-foreground">
                Allowed formats: PNG, JPEG
              </span>
              <span className="text-muted-foreground">
                Maximum file size: 1MB
              </span>
            </div>
            <Button className="w-full">Update Avatar</Button>{" "}
          </div>
        </aside>
      </div>
    </div>
  );
}
