import { TeamCard } from "../components/team-card";
import type { Route } from "./+types/teams-page";
import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => [{ title: "Teams | wemake" }];

export default function TeamsPage() {
  return (
    <div className="space-y-20">
      <Hero title="Teams" subtitle="Finc a team looking for a new memeber." />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <TeamCard
            id="teamId"
            leaderUserName="Deb"
            leaderAvatar="https://github.com/debora-k.png"
            positions={[
              "React Developer",
              "Backend Developer",
              "Product Manager",
            ]}
            project="a new social media platform"
          />
        ))}
      </div>
    </div>
  );
}
