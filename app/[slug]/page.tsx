import { Metadata } from "next";

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
import TableOfContents from '@/components/TableOfContents';
import { JsonLd } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';


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
  console.log('API Response for post:', posts[0]); // Debug log
  console.log('ACF Data:', posts[0].acf); // Debug ACF data
  console.log('FAQs Data:', posts[0].acf.faqs); // Debug FAQs specifically

  if (!posts.length) {
    notFound();
  }

  return posts[0];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  // Add debug logs for the post data
  console.log('Post ACF in page:', post.acf);
  console.log('FAQs in page:', post.acf.faqs);

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

  // Prepare JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntity": {
      "@type": "Review",
      "name": post.title.rendered,
      "author": {
        "@type": "Person",
        "name": "Jessica Carter"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": overallScore,
        "bestRating": "10",
        "worstRating": "0"
      },
      "datePublished": post.date,
      "dateModified": post.modified,
      "reviewBody": post.content.rendered.replace(/<[^>]+>/g, ''),
      "itemReviewed": {
        "@type": "SoftwareApplication",
        "name": post.acf.website_name,
        "applicationCategory": "AI Girlfriend App",
        "operatingSystem": "Web-based",
      }
    },
    "author": {
      "@type": "Person",
      "name": "Jessica Carter"
    },
    "headline": post.title.rendered,
    "datePublished": post.date,
    "dateModified": post.modified,
    "image": post.acf.website_screenshot.url,
    "publisher": {
      "@type": "Organization",
      "name": "Best AI Girlfriends",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aigirlfriendblog.com/wp-content/uploads/2025/01/websitethumb.jpg"
      }
    }
  };

  return (
    <>
      {/* Add JSON-LD structured data */}
      <JsonLd data={jsonLd} />

      <Section>
        <Container>
          {/* Main Content Wrapper */}
          <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8">
            {/* Title and Meta Information */}
            <header className="mb-6">
              <h1 className="text-center text-white text-4xl font-bold not-prose mb-3">
                {post.title.rendered} Review
              </h1>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
                <span>
                  Author: Jess Carson
                </span>
                <time dateTime={post.modified}>
                  Updated: {new Date(post.modified).toLocaleDateString()}
                </time>
              </div>
            </header>

            {/* Grid layout for main content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
              {/* Left Column */}
              <div className="sm:col-span-1 not-prose">
                {/* Clickable wrapper for website image and button */}
                <Link
                  href={`/link/${params.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-xl block overflow-hidden border-4 border-purple-500 hover:scale-105 transition-all duration-300"
                >
                  {/* Image */}
                  <Image
                    src={post.acf.website_screenshot.url}
                    alt={`${post.acf.website_name} website screenshot`}
                    width={800}
                    height={600}
                    sizes="(max-width: 600px) 100vw, 600px"
                    priority
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
                <div className="mt-6">
                  <h2 className="text-xl not-prose font-bold text-white mb-4 text-center">Scores</h2>
                  <div className="grid grid-cols-4 gap-2">
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
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                          <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                    {/* Button */}
                    <div className="flex items-center justify-center bg-white text-black w-full px-4 py-2">
                      {/* YouTube Play Icon */}
                      <FaYoutube size={22} color="#FF0000" />

                      <span className="mx-2 font-semibold text-xl">
                        Watch {post.acf.website_name} Review
                      </span>
                      <ExternalLink size={24} className="text-black" />
                    </div>
                  </Link>
                )}

                {/* Positives and Negatives */}
                <div className="mt-6">
                  <h2 className="text-xl not-prose font-bold text-white mb-4 text-center">Pros & Cons</h2>
                  {/* Combined Pros and Cons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Pros */}
                    {post.acf.pros && post.acf.pros.length > 0 && 
                      post.acf.pros.map((proItem, index) => (
                        <div
                          key={`pro-${index}`}
                          className="border border-green-500 bg-green-500/20 rounded-2xl p-2 flex items-center"
                        >
                          <Plus className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 font-semibold text-sm">
                            {proItem.pros}
                          </span>
                        </div>
                      ))
                    }

                    {/* Cons */}
                    {post.acf.cons && post.acf.cons.length > 0 && 
                      post.acf.cons.map((conItem, index) => (
                        <div
                          key={`con-${index}`}
                          className="border border-red-500 bg-red-500/20 rounded-2xl p-2 flex items-center"
                        >
                          <Minus className="text-red-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 font-semibold text-sm">
                            {conItem.cons}
                          </span>
                        </div>
                      ))
                    }

                    {/* Fallback if no pros or cons */}
                    {(!post.acf.pros || post.acf.pros.length === 0) && (!post.acf.cons || post.acf.cons.length === 0) && (
                      <>
                        <div className="border border-green-500 bg-green-500/20 rounded-2xl p-2 flex items-center">
                          <Plus className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 font-semibold text-sm">
                            No pros available.
                          </span>
                        </div>
                        <div className="border border-red-500 bg-red-500/20 rounded-2xl p-2 flex items-center">
                          <Minus className="text-red-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 font-semibold text-sm">
                            No cons available.
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Section */}
            <div className="mt-8">
              {/* Table of Contents */}
              <TableOfContents />

              {/* Review Article */}
              <article 
                itemScope 
                itemType="http://schema.org/Review"
                className="review-content"
              >
                <meta itemProp="reviewRating" content={overallScore} />
                <meta itemProp="author" content="Jessica Carter" />
                <meta itemProp="datePublished" content={post.date} />
                <meta itemProp="dateModified" content={post.modified} />
                
                <div
                  className="prose dark:prose-invert max-w-none"
                  itemProp="reviewBody"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </article>

              {/* FAQ Section */}
              {post.acf.faqs && (
                <>
                  {console.log('Rendering FAQs section with data:', post.acf.faqs)}
                  <FAQ 
                    faqs={
                      'faqs' in post.acf.faqs 
                        ? (post.acf.faqs as { faqs: { question: string; answer: string; }[] }).faqs
                        : post.acf.faqs as { question: string; answer: string; }[]
                    } 
                  />
                </>
              )}
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
        websiteBaseUrl={post.acf.website_base_url}
        websiteFavicon={websiteFaviconUrl}
      />

      <Breadcrumbs params={params} />
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  // Calculate the overall score
  const scoreGirls = Number(post.acf.score_girls);
  const scoreChat = Number(post.acf.score_chat);
  const scoreFeatures = Number(post.acf.score_features);
  const overallScore = ((scoreGirls + scoreChat + scoreFeatures) / 3).toFixed(1);

  // Create a more SEO-friendly description
  const cleanDescription = post.excerpt?.rendered 
    ? post.excerpt.rendered.replace(/<[^>]+>/g, '').trim()
    : `Read our in-depth review of ${post.acf.website_name}, including features, pros & cons, pricing, and user experiences. Discover how it ranks among the best AI girlfriend apps in ${new Date().getFullYear()}.`;

  const metadata: Metadata = {
    title: `${post.title.rendered} Review [${new Date().getFullYear()}] | BestAIGirlfriends.com`,
    description: cleanDescription,
    openGraph: {
      title: `${post.title.rendered} Review [${new Date().getFullYear()}] - Rating: ${overallScore}/10`,
      description: cleanDescription,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: ['Jessica Carter'],
      images: post.acf?.website_screenshot?.url ? [
        {
          url: post.acf.website_screenshot.url,
          width: 1200,
          height: 630,
          alt: `${post.title.rendered} Screenshot and Review`,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title.rendered} Review [${new Date().getFullYear()}] - Rating: ${overallScore}/10`,
      description: cleanDescription,
      images: post.acf?.website_screenshot?.url ? [post.acf.website_screenshot.url] : [],
      creator: '@BestAIGFs',
      site: '@BestAIGFs',
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `https://bestaigirlfriends.com/${params.slug}`,
    },
  };

  return metadata;
}
