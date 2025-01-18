import { getAllAuthors } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors - Best AI Girlfriends",
  description: "Meet our team of expert reviewers and writers at Best AI Girlfriends.",
};

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <Section>
      <Container>
        <h1 className="text-4xl font-bold mb-8">Our Authors</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <div key={author.id} className="p-6 rounded-lg border border-gray-700 bg-gray-800/50">
              <h2 className="text-2xl font-semibold mb-2">{author.name}</h2>
              {author.description && (
                <p className="text-gray-400 mb-4">{author.description}</p>
              )}
              <Link 
                href={`/blog?author=${author.slug}`}
                className="text-purple-500 hover:text-purple-400"
              >
                View posts by {author.name} →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
} 