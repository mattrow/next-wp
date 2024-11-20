import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getReviews,
} from "@/lib/wordpress";

import { Section, Container, Article, Main } from "@/components/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { notFound } from 'next/navigation';
import { Post, Review } from '@/lib/wordpress.d';
import AiGirlfriendGrid from "@/components/AiGirlfriendGrid";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const featuredMedia = await getFeaturedMediaById(post.featured_media);
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  // Fetch reviews data for AiGirlfriendGrid
  const reviews = await getReviews(); // Implement getReviews() to fetch your reviews

  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 gap-4 mr-4">
            <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8 not-prose">
              <h1>
                <Balancer>
                  <span
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  ></span>
                </Balancer>
              </h1>

              <div className="flex justify-between items-center gap-4 text-sm mb-4">
                <h5>
                  Published {date} by{" "}
                  {author.name && (
                    <span>
                      <a href={`/posts/?author=${author.id}`}>{author.name}</a>{" "}
                    </span>
                  )}
                </h5>
                <Link
                  href={`/posts/?category=${category.id}`}
                  className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
                >
                  {category.name}
                </Link>
              </div>
              <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
                {/* eslint-disable-next-line */}
                <img
                  className="w-full"
                  src={featuredMedia.source_url}
                  alt={post.title.rendered}
                />
              </div>
              <Article dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <AiGirlfriendGrid reviews={reviews as (Review & { totalScore: number })[]} variant="sidebar"  />
          </div>
        </div>
      </Container>
    </Section>
  );
}
