import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Posts | wemake" }];
};

export default function ProfilePostsPage() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <PostCard
          key={index}
          id="postId"
          title="What is the best productivity tool?"
          author="Debora"
          authorAvatar="https://github.com/apple.png"
          category="Productivity"
          createdAt="12 hours ago"
          expended
        />
      ))}
    </div>
  );
}
