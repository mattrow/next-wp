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
          <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 sm:p-8 not-prose">
            <div className="text-center mb-8">
              <h1 className="sm:text-5xl text-2xl font-black text-white">
                Best AI Girlfriends - We review them all!
              </h1>
              <p className="text-gray-300 mt-4">
                Welcome to Best AI Girlfriends, your ultimate resource for finding and exploring the top AI girlfriend apps and websites. Dive into detailed reviews, rankings, and insights to help you choose your perfect virtual companion.
              </p>
            </div>
            <div className="relative flex items-center justify-center mb-8">
              {/* Section Header */}
              <h2 className="sm:text-5xl text-2xl font-black text-center text-white bg-clip-text px-2">
                Featured AI Girlfriends
              </h2>
            </div>

            {/* Use the FeaturedGirlfriends component */}
            <FeaturedGirlfriends reviews={featuredReviews} />
          </div>

          {/* Latest Blog Posts Section */}
          <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 sm:p-8 mt-8 sm:mt-16">
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

          {/* Latest Videos Section */}
          <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 sm:p-8 mt-8 sm:mt-16 overflow-visible">
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
        </Container>
      </Section>
    </>
  );
};

export default Home;