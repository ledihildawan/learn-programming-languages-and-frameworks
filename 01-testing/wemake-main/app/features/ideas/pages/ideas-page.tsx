import type { Route } from "./+types/ideas-page";
import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT | wemake" },
    { name: "description", content: "Browse and manage feature ideas" },
  ];
};

export default function IdeasPage() {
  return (
    <div className="space-y-20">
      <Hero title="IdeasGPT" subtitle="Find ideas for your next project" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            id="ideaId"
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage for user's advanced experience."
            description="Find ideas for your next project."
            viewsCount={123}
            likesCount={12}
            createdAt="12 hours ago"
            claimed={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
