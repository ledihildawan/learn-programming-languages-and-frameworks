import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile | wemake" }];
};

export default function ProfilePage() {
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Headline</h4>
        <p className="text-muted-foreground">
          I am a full stack developer based on Canada, I love to build products
          that help people to improve their lives.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-semibold">About</h4>
        <p className="text-muted-foreground">
          I am a full stack developer based on Canada, I love to build products
          that help people to improve their lives.
        </p>
      </div>
    </div>
  );
}
