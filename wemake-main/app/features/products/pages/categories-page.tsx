import type { Route } from "./+types/categories-page";
import { Hero } from "~/common/components/hero";
import { CategoryCard } from "~/features/products/components/category-card";

export const meta: Route.MetaFunction = () => [
  { title: "Categories | Product Hunt Clone" },
  { name: "description", content: "Browse products by category" },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-10">
      <Hero title="Categories" subtitle="Browse products by category" />
      <div className="grid grid-cols-4 gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={index}
            id={`categoryId-${index}`}
            name="Category Name"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          />
        ))}
      </div>
    </div>
  );
}
