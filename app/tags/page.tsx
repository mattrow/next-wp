import { getAllTags } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags - Best AI Girlfriends",
  description: "Browse all tags and topics covered in our AI girlfriend reviews and articles.",
  alternates: {
    canonical: 'https://www.bestaigirlfriends.com/tags'
  }
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <Section>
      <Container>
        <h1 className="text-4xl font-bold mb-8">Tags</h1>
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/blog?tag=${tag.slug}`}
              className="px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              {tag.name}
              <span className="ml-2 text-sm text-gray-500">({tag.count})</span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
} 