export const dynamic = 'force-dynamic';
export const revalidate = false;

import Image from 'next/image';
import Link from 'next/link';
import { Section, Container } from "@/components/craft";
import { notFound } from 'next/navigation';
import { ArrowRight, Plus, Minus, ExternalLink } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';

// Import solid icons from Heroicons
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

// Import the necessary components
import Footer from '@/components/Footer';
import { Post } from '@/lib/wordpress.d';
import AiGirlfriendGrid from '@/components/AiGirlfriendGrid';
import { getAllReviews } from '@/lib/wordpress';
import { Review } from '@/lib/wordpress.d';


async function getPost(slug: string): Promise<Post> {
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp/v2/review?slug=${slug}&_embed`
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Failed to fetch post:', errorText);
    throw new Error('Failed to fetch post');
  }

  const posts = await res.json();

  if (!posts.length) {
    notFound();
  }

  return posts[0];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  // Fetch all reviews
  const allReviews: Review[] = await getAllReviews();

  // Calculate total score for each review
  const reviewsWithTotalScore = allReviews.map(review => {
    const scoreGirls = Number(review.acf.score_girls || 0);
    const scoreChat = Number(review.acf.score_chat || 0);
    const scoreFeatures = Number(review.acf.score_features || 0);

    const totalScore = (scoreGirls + scoreChat + scoreFeatures) / 3;

    return {
      ...review,
      totalScore,
    };
  });

  // Sort reviews by totalScore in descending order
  const sortedReviews = reviewsWithTotalScore.sort((a, b) => b.totalScore - a.totalScore);

  // Extract the scores and ensure they are numbers
  const scoreGirls = Number(post.acf.score_girls);
  const scoreChat = Number(post.acf.score_chat);
  const scoreFeatures = Number(post.acf.score_features);

  // Check if any score is NaN
  if (isNaN(scoreGirls) || isNaN(scoreChat) || isNaN(scoreFeatures)) {
    console.error('One or more scores are not valid numbers:', {
      scoreGirls,
      scoreChat,
      scoreFeatures,
    });
  }

  const scores = [scoreGirls, scoreChat, scoreFeatures];

  // Calculate the average score
  const overallScore = (
    scores.reduce((a, b) => a + b, 0) / scores.length
  ).toFixed(1);

  const featureList = [
    {
      name: "Girls",
      icon: HeartIcon,
      score: post.acf.score_girls,
    },
    {
      name: "Chat",
      icon: ChatBubbleLeftRightIcon,
      score: post.acf.score_chat,
    },
    {
      name: "Features",
      icon: Cog6ToothIcon,
      score: post.acf.score_features,
    },
  ];

  // Video URL (from ACF)
  const videoUrl = post.acf.youtube_video_url; // Use the URL from ACF

  // Extract YouTube Video ID from the URL
  const getYouTubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = regex.exec(url);
    return match ? match[1] : null;
  };

  const videoId = videoUrl ? getYouTubeVideoId(videoUrl) : null;

  // Debugging console logs
  console.log('post.acf.website_favicon:', post.acf.website_favicon);
  console.log('post.acf.website_favicon.url:', post.acf.website_favicon.url);
  console.log('post.acf.website_url:', post.acf.website_url);

  // Ensure website favicon URL exists
  const websiteFaviconUrl = post.acf.website_favicon?.url || '';

  return (
    <>
      <Section>
        <Container>
          {/* Wrap the top section */}
          <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8">
            {/* Title at the top and centered */}
            <h1 className="text-center text-white text-3xl font-bold not-prose mb-6">
              {post.title.rendered}
            </h1>
            {/* Grid container for responsive layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
              {/* Left Column */}
              <div className="sm:col-span-1 not-prose">
                {/* Clickable wrapper for website image and button */}
                <Link
                  href={`/link/${params.slug}`}
                  className="relative rounded-xl block overflow-hidden border-4 border-purple-500 hover:scale-105 transition-all duration-300"
                >
                  {/* Image */}
                  <Image
                    src={post.acf.website_screenshot.url}
                    alt={`${post.acf.website_name} Website`}
                    width={800}
                    height={600}
                    className="w-full sm:h-64 h-48 object-cover my-0"
                  />
                  {/* Button */}
                  <div className="flex items-center justify-center bg-purple-500 text-white w-full px-4 py-2 shimmer">
                    <Image
                      alt="Site Favicon"
                      src={post.acf.website_favicon.url}
                      width={32}
                      height={32}
                      className="inline-block m-0 p-0"
                    />
                    <span className="mx-2 font-semibold text-xl text-white">
                      Open Website
                    </span>
                    <ExternalLink size={24} className="text-white" />
                  </div>
                </Link>

                {/* Feature Rectangles */}
                <div className="grid grid-cols-4 gap-2 mt-6">
                  {/* Features */}
                  {featureList.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex flex-col items-center border border-purple-500 rounded-lg p-2 bg-purple-500/20"
                    >
                      {/* Icon and Feature Name */}
                      <feature.icon className="w-5 h-5 text-white mb-1" />
                      <span className="text-xs text-white font-semibold">
                        {feature.name}
                      </span>
                      {/* Individual Score */}
                      <span className="mt-1 text-md font-bold text-white">
                        {feature.score}
                      </span>
                    </div>
                  ))}

                  {/* Overall Score */}
                  <div className="flex flex-col items-center rounded-lg p-2 bg-green-500">
                    {/* Icon and Label */}
                    <StarIcon className="w-5 h-5 text-white mb-1" />
                    <span className="text-xs text-white font-semibold">
                      Overall
                    </span>
                    {/* Display the Overall Score */}
                    <span className="mt-1 text-xl font-bold text-white">
                      {overallScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="sm:col-span-1 mt-6 sm:mt-0">
                {/* Conditional Rendering of Video Section */}
                {videoId && (
                  <Link
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative rounded-xl block overflow-hidden mb-6 border-4 border-white hover:scale-105 transition-all duration-300"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative w-full sm:h-64 h-48 not-prose">
                      <Image
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt="YouTube Video Thumbnail"
                        fill
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    {/* Button */}
                    <div className="flex items-center justify-center bg-white text-black w-full px-4 py-2">
                      {/* YouTube Play Icon */}
                      <FaYoutube size={22} color="#FF0000" />

                      <span className="mx-2 font-semibold text-xl">
                        Watch Review
                      </span>
                      <ExternalLink size={24} className="text-black" />
                    </div>
                  </Link>
                )}

                {/* Positives and Negatives */}
                <div className="mt-6">
                  <h2 className="text-xl not-prose font-bold text-white mb-4">Pros & Cons</h2>
                  {/* Positives */}
                  <div className="mb-4">
                    {post.acf.pros && post.acf.pros.length > 0 ? (
                      post.acf.pros.map((proItem, index) => (
                        <div
                          key={index}
                          className="border border-green-500 bg-green-500/20 rounded-2xl p-2 flex items-center mb-2"
                        >
                          <Plus className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 font-semibold text-sm">
                            {proItem.pros}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="border border-green-500 bg-green-500/20 rounded-2xl p-2 flex items-center mb-2">
                        <Plus className="text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-300 font-semibold text-sm">
                          No pros available.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Negatives */}
                  <div>
                    {post.acf.cons && post.acf.cons.length > 0 ? (
                      post.acf.cons.map((conItem, index) => (
                        <div
                          key={index}
                          className="border border-red-500 bg-red-500/20 rounded-2xl p-2 flex items-center mb-2"
                        >
                          <Minus className="text-red-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 font-semibold text-sm">
                            {conItem.cons}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="border border-red-500 bg-red-500/20 rounded-2xl p-2 flex items-center mb-2">
                        <Minus className="text-red-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-300 font-semibold text-sm">
                          No cons available.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content spanning both columns */}
            <div className="mt-8">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* AiGirlfriendGrid Component Underneath Content */}
      <Section>
        <Container>
          <AiGirlfriendGrid reviews={sortedReviews} />
        </Container>
      </Section>

      <Footer
        slug={params.slug}
        websiteUrl={post.acf.website_url}
        websiteFavicon={websiteFaviconUrl}
      />
    </>
  );
}

export async function generateStaticParams() {
  const posts: Post[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const res = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp/v2/review?per_page=100&page=${page}`
    );

    if (!res.ok) {
      console.error('Failed to fetch posts:', await res.text());
      break;
    }

    const data: Post[] = await res.json();
    posts.push(...data);

    totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
    page++;
  } while (page <= totalPages);

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
