import { Section, Container } from "@/components/craft";
import Link from "next/link";
import Image from "next/image";
import {
  Crown,
  Medal,
  Link as ExternalLink,
  Trophy,
  Star,
  Award,
  Heart,
  MessageCircle,
  Settings,
  ArrowRightCircle,
  Sparkles,
} from "lucide-react";
import Head from "next/head";
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  StarIcon,
  TrophyIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import { getRecentPosts, getReviewBySlug } from "@/lib/wordpress";
import PostCard from "@/components/posts/post-card";
import Slider from "@/components/Slider";

import { getLatestVideos } from "@/lib/youtube";
import VideoCard from "@/components/videos/video-card";
import { Review } from "@/lib/wordpress.d";
import FeaturedGirlfriends from "@/components/FeaturedGirlfriends";

const Home = async () => {
  // Define featured slugs in order of ranking
  const featuredSlugs = ["candy-ai", "girlfriendgpt","kindroid-ai"];

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

  // Fetch the recent posts
  const recentPosts = await getRecentPosts(5);
  // Fetch latest videos
  const latestVideos = await getLatestVideos(5);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Best AI Girlfriends - Best AI Chat Sites",
              description:
                "Explore the best AI girlfriend sites and apps. Find reviews, rankings, and insights on the top virtual companions available.",
              url: "https://www.bestaigirlfriends.com",
              publisher: {
                "@type": "Organization",
                name: "Best AI Girlfriends",
                url: "https://www.bestaigirlfriends.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://aigirlfriendblog.com/wp-content/uploads/2025/01/websitethumb.jpg",
                },
              },
            }),
          }}
        />
      </Head>
      <Section>
        <Container>
          {/* Featured AI Girlfriends Section */}
          <div className="bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-xl p-6 sm:p-8 not-prose">
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
                    <span className="text-sm font-medium">Top AI Girlfriends of 2025</span>
                  </div>
                </div>

                {/* Main Title */}
                <div className="max-w-3xl mx-auto text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-4">
                    Find Your Perfect AI Girlfriend
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Discover and compare the best AI girlfriend experiences. Our detailed reviews and rankings help you find the perfect match for meaningful conversations and companionship.
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-300">Expert Reviews</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                    <HeartIcon className="w-4 h-4 text-pink-500" />
                    <span className="text-sm text-gray-300">Personality Tests</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-300">Chat Quality Scores</span>
                  </div>
                </div>

                {/* Featured Section Title */}
                <div className="flex items-center justify-center text-center w-full mb-8">
                  <div className="flex items-center gap-3 w-full max-w-sm">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-purple-500/50" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">Featured AI Girlfriends</h2>
                    <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-purple-500/50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Use the FeaturedGirlfriends component */}
            <FeaturedGirlfriends reviews={featuredReviews} />
          </div>

          {/* Latest Videos Section */}
          <div className="bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-xl p-6 sm:p-8 mt-8 sm:mt-16 overflow-visible">
            <div className="relative flex items-center justify-center mb-8">
              <h2 className="sm:text-5xl text-2xl font-black not-prose text-center text-white bg-clip-text px-2">
                Latest Videos
              </h2>
            </div>

            <div className="not-prose">
              {latestVideos && latestVideos.length > 0 ? (
                <Slider>
                  {latestVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </Slider>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  Videos coming soon.
                </div>
              )}
            </div>
          </div>

          {/* Latest Blog Posts Section */}
          <div className="bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-xl p-6 sm:p-8 mt-8 sm:mt-16">
            <div className="relative flex items-center justify-center mb-8">
              <h2 className="sm:text-5xl text-2xl font-black not-prose text-center text-white bg-clip-text px-2">
                Latest Blog Posts
              </h2>
            </div>

            <div className="not-prose">
              {recentPosts && recentPosts.length > 0 ? (
                <Slider>
                  {recentPosts.map((post) => (
                    <PostCard key={post.id} post={post} variant="home" />
                  ))}
                </Slider>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  Blog posts coming soon.
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Home;