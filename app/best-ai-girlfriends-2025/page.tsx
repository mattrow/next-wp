import { getReviewBySlug } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import { Metadata } from "next";
import FeaturedGirlfriends from "@/components/FeaturedGirlfriends";
import { Sparkles } from "lucide-react";
import { Review } from "@/lib/wordpress.d";

export const metadata: Metadata = {
  title: "Best AI Girlfriends 2025 - Top AI Chat Companions Ranked",
  description: "Discover the best AI girlfriends of 2025. We've tested and ranked the top AI chat companions to help you find your perfect match.",
  alternates: {
    canonical: 'https://www.bestaigirlfriends.com/best-ai-girlfriends-2025'
  }
};

export default async function BestAIGirlfriends2025() {
  // Define featured slugs in order of ranking
  const featuredSlugs = ["candy-ai", "girlfriendgpt", "kindroid-ai"];

  // Fetch the featured reviews
  const reviewsData = await Promise.all(
    featuredSlugs.map(async (slug) => {
      const review = await getReviewBySlug(slug);
      return review;
    })
  );

  // Filter out any null reviews
  const featuredReviews = reviewsData.filter(
    (review): review is Review => review !== null
  );

  return (
    <Section>
      <Container>
        <div className="bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-xl p-6 sm:p-8">
          {/* Header Section */}
          <div className="relative">
            {/* Purple glow effects */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl" />
            
            {/* Content */}
            <div className="relative">
              {/* Top Badge */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-300">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium not-prose">Updated February 2025</span>
                </div>
              </div>

              {/* Main Title */}
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl not-prose font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-4">
                  Best AI Girlfriends of 2025
                </h1>
                <p className="text-gray-400 text-sm sm:text-base not-prose">
                  We&apos;ve tested and ranked the top AI chat companions to help you find your perfect match. Our comprehensive reviews consider personality variety, chat quality, and features to ensure you find the best experience.
                </p>
              </div>
            </div>
          </div>

          {/* Featured AI Girlfriends */}
          <div className="not-prose">
            <FeaturedGirlfriends reviews={featuredReviews} />
          </div>

          {/* Additional Information */}
          <div className="mt-12 max-w-none">
            <h2 className="not-prose">How We Rank AI Girlfriends</h2>
            <p className="not-prose">
              Our rankings are based on extensive testing and real user experiences. We evaluate each platform across multiple criteria:
            </p>
            <ul className="not-prose">
              <li>Personality variety and customization options</li>
              <li>Chat quality and response intelligence</li>
              <li>Available features and user experience</li>
              <li>Value for money and subscription options</li>
              <li>Privacy and security measures</li>
            </ul>
            
            <h2 className="not-prose">Why Trust Our Rankings</h2>
            <p className="not-prose">
              We spend countless hours testing each AI girlfriend platform to provide accurate, unbiased reviews. Our team regularly updates these rankings to reflect the latest features and improvements in the rapidly evolving AI companion space.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
} 