import { Metadata } from 'next';
import { getReviewBySlug, getAllReviews } from '@/lib/wordpress';
import { Section, Container } from '@/components/craft';
import ReviewSummary from '@/components/ReviewSummary';
import FeaturedGirlfriends from '@/components/FeaturedGirlfriends';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReviewTopSection from '@/components/ReviewTopSection';
import { AnimatedSection } from '@/components/AnimatedSection';
import styles from '../styles.module.css';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const review = await getReviewBySlug(params.slug);

  if (!review) {
    notFound();
  }

  return {
    title: `Best Alternatives to ${review.acf.website_name} [${new Date().getFullYear()}]`,
    description: `Discover the best alternatives to ${review.acf.website_name}. Compare features, pricing, and user experiences with other top AI companion apps.`,
    alternates: {
      canonical: `https://www.bestaigirlfriends.com/${params.slug}/alternatives`
    }
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
    <Section className="relative z-10">
      <Container>
        <AnimatedSection delay={0}>
          <div className={styles.mainWrapper}>
            {/* Gradient overlays */}
            <div className={styles.gradientOverlayPurple} id="purple-gradient" />
            <div className={styles.gradientOverlayWhite} id="white-gradient" />

            {/* Title and Meta Information */}
            <header className="mb-6 relative">
              <h1 className="text-center text-white text-4xl font-bold not-prose mb-3">
                Best Alternatives to {review.acf.website_name}
              </h1>
              <div className="text-center">
                <p className="text-gray-400 text-lg">
                  Looking for similar apps like {review.acf.website_name}? 
                  Explore our top recommended alternatives below.
                </p>
              </div>
            </header>

            {/* Use the ReviewTopSection here */}
            <ReviewTopSection review={review} slug={params.slug} />

            {/* Alternatives Section */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-white text-cente not-prose mb-6">
                Top Alternatives to {review.acf.website_name}
              </h2>
              <FeaturedGirlfriends reviews={alternativeReviews} />
            </div>
          </div>
        </AnimatedSection>
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
