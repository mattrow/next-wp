import { getAllPages } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Girlfriend Reviews - Best AI Chat Sites and Apps",
  description: "Browse our comprehensive collection of AI girlfriend reviews. Find detailed analysis, ratings, and comparisons of the top AI chat companions.",
  alternates: {
    canonical: 'https://www.bestaigirlfriends.com/reviews'
  }
};

export default async function Page() {
  const pages = await getAllPages();

  return (
    <Section>
      <Container>
        <h1>Pages</h1>

        <h2>All Pages</h2>
        <div className="grid">
          {pages.map((page: any) => (
            <Link key={page.id} href={`reviews/${page.slug}`}>
              {page.title.rendered}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
