import { getAllReviews } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import ReviewCard from "@/components/ReviewCard";

export const metadata: Metadata = {
  title: "AI Girlfriend Reviews - Best AI Chat Sites and Apps",
  description: "Browse our comprehensive collection of AI girlfriend reviews. Find detailed analysis, ratings, and comparisons of the top AI chat companions.",
  alternates: {
    canonical: 'https://www.bestaigirlfriends.com/reviews'
  }
};

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  // Calculate scores and sort by overall score
  const reviewsWithScores = reviews.map(review => {
    const scoreGirls = Number(review.acf.score_girls);
    const scoreChat = Number(review.acf.score_chat);
    const scoreFeatures = Number(review.acf.score_features);
    const overallScore = ((scoreGirls + scoreChat + scoreFeatures) / 3).toFixed(1);
    return { ...review, overallScore };
  }).sort((a, b) => Number(b.overallScore) - Number(a.overallScore));

  return (
    <Section>
      <Container>
        <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="sm:text-5xl text-2xl font-black text-white mb-4">
              AI Girlfriend Reviews
            </h1>
            <p className="text-gray-300">
              Explore our in-depth reviews of the best AI chat companions. We test and analyze each platform to help you find your perfect match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsWithScores.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/questions"
            className="group block bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-purple-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400">
                  Frequently Asked Questions
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Find answers to common questions about AI girlfriends
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/blog"
            className="group block bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-purple-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400">
                  Latest Blog Posts
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Stay updated with news and guides about AI companions
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
