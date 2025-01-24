import { Metadata } from "next";
import { AnimatedSection } from '@/components/AnimatedSection';
import { GradientButton } from '@/components/GradientButton';
import styles from './styles.module.css';
import { TableOfContents } from '@/components/TableOfContents';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;
export const runtime = 'edge';

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
import { JsonLd } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import ReviewTopSection from '@/components/ReviewTopSection';
import { 
  ReviewHeader,
  ReviewProsAndCons,
  ReviewPhotoGeneration,
  ReviewCharacterLibrary,
  ReviewPricing,
  ReviewSecurity,
  ReviewUserFeedback,
  ReviewYouTube,
  ReviewConclusion,
  ReviewCTA
} from '@/components/review';
import { mapReviewFields } from '@/lib/mapReviewFields';

// Add debugging logs
const debug = (msg: string, data: any) => {
  console.log('DEBUG:', msg, JSON.stringify(data, null, 2));
};

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp/v2/review?slug=${slug}&_embed&cache_bust=${Date.now()}`,
    {
      next: { revalidate: 0 }
    }
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
  
  // Map the ACF fields to our component props
  const reviewContent = mapReviewFields(post);

  // Add debug logs
  debug('Post Content Length', post.content.rendered.length);
  debug('Post Title', post.title.rendered);
  debug('Post Scores', {
    girls: post.acf.score_girls,
    chat: post.acf.score_chat,
    features: post.acf.score_features
  });

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
    "@type": "Review",
    "name": `${post.title.rendered} Review`,
    "author": {
      "@type": "Person",
      "name": "Jessica Carson",
      "url": "https://bestaigirlfriends.com/about"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": Number(overallScore),
      "bestRating": 10,
      "worstRating": 0
    },
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": post.acf.website_name,
      "applicationCategory": "ChatApplication",
      "operatingSystem": "Web-based",
      "image": post.acf.website_screenshot.url,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/OnlineOnly",
        "url": post.acf.website_url
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": Number(overallScore),
        "bestRating": 10,
        "worstRating": 0,
        "ratingCount": 1,
        "reviewCount": 1
      }
    },
    "datePublished": post.date,
    "dateModified": post.modified,
    "reviewBody": post.content.rendered.replace(/<[^>]+>/g, ''),
    "publisher": {
      "@type": "Organization",
      "name": "Best AI Girlfriends",
      "@id": "https://bestaigirlfriends.com",
      "url": "https://bestaigirlfriends.com",
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

              {/* Use the ReviewTopSection here */}
              <ReviewTopSection review={post} slug={params.slug} />

              {/* Main Content Section */}
              <div className="mt-8">
                {/* Table of Contents */}
                <TableOfContents reviewSlug={params.slug} />

                {/* Review Article */}
                <article 
                  itemScope 
                  itemType="http://schema.org/Review"
                  className="review-content prose dark:prose-invert max-w-none"
                >
                  {/* Schema.org metadata */}
                  <div itemProp="itemReviewed" itemScope itemType="http://schema.org/SoftwareApplication">
                    <meta itemProp="name" content={post.acf.website_name} />
                    <meta itemProp="applicationCategory" content="ChatApplication" />
                    <meta itemProp="operatingSystem" content="Web-based" />
                    <meta itemProp="image" content={post.acf.website_screenshot.url} />
                    <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
                      <meta itemProp="price" content="0" />
                      <meta itemProp="priceCurrency" content="USD" />
                      <meta itemProp="availability" content="https://schema.org/OnlineOnly" />
                      <meta itemProp="url" content={post.acf.website_url} />
                    </div>
                    <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
                      <meta itemProp="ratingValue" content={overallScore} />
                      <meta itemProp="bestRating" content="10" />
                      <meta itemProp="worstRating" content="0" />
                      <meta itemProp="ratingCount" content="1" />
                      <meta itemProp="reviewCount" content="1" />
                    </div>
                  </div>
                  <div itemProp="reviewRating" itemScope itemType="http://schema.org/Rating">
                    <meta itemProp="ratingValue" content={overallScore} />
                    <meta itemProp="bestRating" content="10" />
                    <meta itemProp="worstRating" content="0" />
                  </div>
                  <div itemProp="author" itemScope itemType="http://schema.org/Person">
                    <meta itemProp="name" content="Jessica Carson" />
                    <meta itemProp="url" content="https://bestaigirlfriends.com/about" />
                  </div>
                  <meta itemProp="datePublished" content={post.date} />
                  <meta itemProp="dateModified" content={post.modified} />
                  
                  <div itemProp="reviewBody">
                    <ReviewHeader
                      websiteName={post.acf.website_name}
                      heroImage={post.acf.hero_image}
                      introductionText={reviewContent.introduction_text}
                      updatedDate={post.modified}
                    />

                    <div className="what-is-section grid md:grid-cols-2 gap-8 items-center">
                      <div className="prose dark:prose-invert max-w-none">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                          What is {post.acf.website_name}?
                        </h2>
                        <div dangerouslySetInnerHTML={{ __html: post.acf.what_is_section }} />
                      </div>
                      <Image
                        src={post.acf.website_screenshot.url}
                        alt={`${post.acf.website_name} Interface Screenshot`}
                        width={800}
                        height={600}
                        className="rounded-2xl border border-purple-500/20"
                      />
                    </div>

                    <ReviewProsAndCons
                      websiteName={post.acf.website_name}
                      pros={reviewContent.pros}
                      cons={reviewContent.cons}
                    />

                    {/* First CTA after pros and cons */}
                    <div className="my-8">
                      <ReviewCTA
                        websiteName={post.acf.website_name}
                        websiteFavicon={post.acf.website_favicon}
                        reviewSlug={params.slug}
                      />
                    </div>

                    <ReviewCharacterLibrary
                      websiteName={post.acf.website_name}
                      overview={reviewContent.character_library_overview}
                      characterExamples={reviewContent.character_examples}
                      interfaceImage={post.acf.character_library_interface}
                    />

                    <ReviewPhotoGeneration
                      websiteName={post.acf.website_name}
                      overview={reviewContent.photo_generation_overview}
                      photoExamples={reviewContent.photo_examples}
                    />

                    

                    <ReviewPricing
                      websiteName={post.acf.website_name}
                      overview={reviewContent.pricing_overview}
                      freePlanFeatures={reviewContent.free_plan_features}
                      premiumPlanFeatures={reviewContent.premium_plan_features}
                      premiumPriceMonthly={reviewContent.premium_price_monthly}
                      premiumPriceYearly={reviewContent.premium_price_yearly}
                    />

                    {/* Second CTA after pricing */}
                    <div className="my-8">
                      <ReviewCTA
                        websiteName={post.acf.website_name}
                        websiteFavicon={post.acf.website_favicon}
                        reviewSlug={params.slug}
                      />
                    </div>

                    <ReviewSecurity
                      websiteName={post.acf.website_name}
                      overview={reviewContent.security_overview}
                      platformSecurity={reviewContent.platform_security}
                      privacyConsiderations={reviewContent.privacy_considerations}
                      securityRecommendations={reviewContent.security_recommendations}
                    />

                    <ReviewUserFeedback
                      websiteName={post.acf.website_name}
                      userReviews={reviewContent.user_reviews}
                    />

                    {videoId && (
                      <ReviewYouTube
                        websiteName={post.acf.website_name}
                        videoId={videoId}
                      />
                    )}

                    <ReviewConclusion
                      websiteName={post.acf.website_name}
                      conclusionText={reviewContent.conclusion_text}
                      scoreNotes={reviewContent.score_notes}
                      scores={{
                        characters: scoreGirls,
                        chat: scoreChat,
                        features: scoreFeatures
                      }}
                      reviewSlug={params.slug}
                    />

                    {/* Final CTA at the end of the article */}
                    <div className="mt-12 mb-8">
                      <ReviewCTA
                        websiteName={post.acf.website_name}
                        websiteFavicon={post.acf.website_favicon}
                        reviewSlug={params.slug}
                      />
                    </div>
                  </div>
                </article>

                {/* Free Trial CTA */}
                <div className="mt-12 mb-12 flex justify-center">
                  <Link
                    href={`/link/${params.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 shimmer"
                  >
                    <Image
                      alt="Site Favicon"
                      src={post.acf.website_favicon.url}
                      width={24}
                      height={24}
                      className="inline-block m-0"
                    />
                    <span className="text-white">{post.acf.website_name} Free Trial</span>
                    <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-white" />
                  </Link>
                </div>

                {/* FAQ Section */}
                {post.acf.faqs && (
                  <FAQ 
                    faqs={
                      'faqs' in post.acf.faqs 
                        ? (post.acf.faqs as { faqs: { question: string; answer: string; }[] }).faqs
                        : post.acf.faqs as { question: string; answer: string; }[]
                    }
                    reviewSlug={params.slug}
                  />
                )}

                {/* Alternatives CTA */}
                <div className="mt-12 flex justify-center">
                  <Link
                    href={`/${params.slug}/alternatives`}
                    className="group relative inline-flex items-center gap-2 bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                  >
                    <span>Best Alternatives to {post.acf.website_name}</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* AiGirlfriendGrid Component Underneath Content */}
      <Section>
        <Container>
          <div className="text-center mb-8">
            <h2 className="sm:text-4xl text-2xl font-black text-white">
              Best AI Girlfriends 2025
            </h2>
            <p className="text-gray-300 mt-4">
              Explore more AI companion reviews and find your perfect match
            </p>
          </div>
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const currentYear = new Date().getFullYear();

  return {
    title: `${post.acf.website_name} Review [${currentYear}] - BestAIGirlfriends.com`,
    description: `Detailed review of ${post.acf.website_name}. Learn about features, pricing, and user experience. Updated for ${currentYear} with latest features and pricing.`,
    alternates: {
      canonical: `https://www.bestaigirlfriends.com/${params.slug}`
    }
  };
}
