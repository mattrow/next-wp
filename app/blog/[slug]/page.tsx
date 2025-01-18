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
    alternates: {
      canonical: `https://www.bestaigirlfriends.com/blog/${params.slug}`
    }
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
          <div className="lg:col-span-3 gap-4 mr-4 blogsection">
            <article className="prose lg:prose-xl mx-auto bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8 not-prose">
              <h1 className="mb-4 text-3xl text-white font-bold">
                <Balancer>
                  <span
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  ></span>
                </Balancer>
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-300 mb-6">
                <div>
                  Published on {date} by{' '}
                  {author.name && (
                    <a
                      href={`/posts/?author=${author.id}`}
                      className="text-white hover:underline"
                    >
                      {author.name}
                    </a>
                  )}
                </div>
                <div className="mt-2 sm:mt-0">
                  <Link
                    href={`/posts/?category=${category.id}`}
                    className={cn(
                      badgeVariants({ variant: 'outline' }),
                      'not-prose'
                    )}
                  >
                    {category.name}
                  </Link>
                </div>
              </div>

              {featuredMedia && (
                <img
                  className="w-full rounded-lg shadow-lg my-8"
                  src={featuredMedia.source_url}
                  alt={post.title.rendered}
                />
              )}

              <div
                className="post-content text-white"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </article>
          </div>

          <div className="lg:col-span-1">
            <AiGirlfriendGrid reviews={reviews as (Review & { totalScore: number })[]} variant="sidebar"  />
          </div>
        </div>
      </Container>
    </Section>
  );
}
