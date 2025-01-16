import { Metadata } from 'next';
import { getReviewBySlug, getAllReviews } from '@/lib/wordpress';
import { Section, Container } from '@/components/craft';
import ReviewSummary from '@/components/ReviewSummary';
import FeaturedGirlfriends from '@/components/FeaturedGirlfriends';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const review = await getReviewBySlug(params.slug);

  if (!review) {
    notFound();
  }

  return {
    title: `Best Alternatives to ${review.acf.website_name} [${new Date().getFullYear()}]`,
    description: `Discover the best alternatives to ${review.acf.website_name}. Compare features, pricing, and user experiences with other top AI companion apps.`,
  };
}

export default async function AlternativePage({ params }: { params: { slug: string } }) {
  const review = await getReviewBySlug(params.slug);

  if (!review) {
    notFound();
  }

  // Fetch all reviews excluding the current one
  const allReviews = await getAllReviews();
  const alternativeReviews = allReviews
    .filter((r) => r.slug !== params.slug)
    // Calculate total scores for sorting
    .map(review => {
      const scoreGirls = Number(review.acf.score_girls);
      const scoreChat = Number(review.acf.score_chat);
      const scoreFeatures = Number(review.acf.score_features);
      const totalScore = (scoreGirls + scoreChat + scoreFeatures) / 3;
      return { ...review, totalScore };
    })
    // Sort by total score
    .sort((a, b) => b.totalScore - a.totalScore)
    // Take top 5 alternatives
    .slice(0, 5);

  return (
    <Section>
      <Container>
        {/* Main Content Wrapper */}
        <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 sm:p-8">
          {/* Title - Updated styling to match home page */}
          <div className="text-center mb-8">
            <h1 className="sm:text-5xl text-2xl font-black text-white mb-4 not-prose">
              Best Alternatives to {review.acf.website_name}
            </h1>
            <p className="text-gray-300 mt-4 not-prose">
              Looking for similar apps like {review.acf.website_name}? 
              Explore our top recommended alternatives below.
            </p>
          </div>

          {/* Review Summary */}
          <ReviewSummary review={review} />

          {/* Divider */}
          <hr className="my-12 border-gray-700" />

          {/* Alternatives Section - Updated styling to match home page */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-8">
              <h2 className="sm:text-5xl text-2xl font-black text-center text-white bg-clip-text not-prose px-2">
                Top Alternatives to {review.acf.website_name}
              </h2>
            </div>
            <FeaturedGirlfriends reviews={alternativeReviews} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export async function generateStaticParams() {
  const reviews = await getAllReviews();
  return reviews.map((review) => ({
    slug: review.slug,
  }));
}
