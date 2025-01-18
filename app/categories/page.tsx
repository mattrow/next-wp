import { getAllCategories } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories - Best AI Girlfriends",
  description: "Browse all categories of AI girlfriend reviews and articles.",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <Section>
      <Container>
        <h1 className="text-4xl font-bold mb-8">Categories</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.id} className="p-6 rounded-lg border border-gray-700 bg-gray-800/50">
              <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
              {category.description && (
                <p className="text-gray-400 mb-4">{category.description}</p>
              )}
              <p className="text-sm text-gray-500 mb-4">{category.count} posts</p>
              <Link 
                href={`/blog?category=${category.slug}`}
                className="text-purple-500 hover:text-purple-400"
              >
                View posts in {category.name} →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
} 