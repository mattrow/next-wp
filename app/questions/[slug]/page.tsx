import { Metadata } from "next";
import { Section, Container } from "@/components/craft";
import { getAllReviews } from "@/lib/wordpress";
import { Review } from "@/lib/wordpress.d";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, Heart, ChevronDown } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import FeaturedGirlfriends from "@/components/FeaturedGirlfriends";
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

interface Props {
  params: {
    slug: string;
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

interface QuestionData {
  question: FAQItem;
  review: Review;
}

async function getQuestionData(slug: string): Promise<QuestionData | null> {
  const reviews = await getAllReviews();
  
  for (const review of reviews) {
    const faqs = review.acf.faqs;
    if (!faqs) continue;

    // Handle both old and new FAQ structure
    const questions: FAQItem[] = Array.isArray(faqs) ? faqs : faqs.faqs || [];
    
    const question = questions.find(faq => {
      const questionSlug = faq.question.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      return questionSlug === slug;
    });

    if (question) {
      return {
        question,
        review
      };
    }
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getQuestionData(params.slug);
  
  if (!data) {
    return {
      title: "Question Not Found",
      description: "The requested question could not be found."
    };
  }

  return {
    title: `${data.question.question} - AI Girlfriend FAQ`,
    description: data.question.answer.replace(/<[^>]+>/g, '').slice(0, 155) + "...",
  };
}

export default async function QuestionPage({ params }: Props) {
  const data = await getQuestionData(params.slug);
  
  if (!data) {
    notFound();
  }

  const { question, review } = data;

  // Calculate scores
  const scoreGirls = Number(review.acf.score_girls);
  const scoreChat = Number(review.acf.score_chat);
  const scoreFeatures = Number(review.acf.score_features);
  const overallScore = ((scoreGirls + scoreChat + scoreFeatures) / 3).toFixed(1);

  // Get all reviews and sort by total score
  const reviews = await getAllReviews();
  const reviewsWithScore = reviews.map(review => {
    const scoreGirls = Number(review.acf.score_girls || 0);
    const scoreChat = Number(review.acf.score_chat || 0);
    const scoreFeatures = Number(review.acf.score_features || 0);
    const totalScore = (scoreGirls + scoreChat + scoreFeatures) / 3;
    return { ...review, totalScore };
  }).sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
    .slice(0, 3); // Get top 3 reviews

  const featureList = [
    {
      name: "Girls",
      icon: HeartIcon,
      score: review.acf.score_girls,
    },
    {
      name: "Chat",
      icon: ChatBubbleLeftRightIcon,
      score: review.acf.score_chat,
    },
    {
      name: "Features",
      icon: Cog6ToothIcon,
      score: review.acf.score_features,
    },
  ];

  // Video handling
  const videoUrl = review.acf.youtube_video_url;
  const getYouTubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = regex.exec(url);
    return match ? match[1] : null;
  };
  const videoId = videoUrl ? getYouTubeVideoId(videoUrl) : null;

  return (
    <Section>
      <Container>
        {/* Question Section */}
        <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-6 not-prose">
            {question.question}
          </h1>
          <div 
            className="prose dark:prose-invert max-w-none text-gray-300 not-prose"
            dangerouslySetInnerHTML={{ __html: question.answer }}
          />
        </div>

        {/* Review Info Section */}
        <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8">
          <h2 className="text-3xl font-bold text-white mb-6 not-prose text-center">
            {review.acf.website_name} Review
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
            {/* Left Column */}
            <div className="sm:col-span-1 not-prose">
              <Link
                href={`/link/${review.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-xl block overflow-hidden border-4 border-purple-500 hover:scale-105 transition-all duration-300"
              >
                <Image
                  src={review.acf.website_screenshot.url}
                  alt={`${review.acf.website_name} website screenshot`}
                  width={800}
                  height={600}
                  sizes="(max-width: 600px) 100vw, 600px"
                  priority
                  className="w-full sm:h-64 h-48 object-cover my-0"
                />
                <div className="flex items-center justify-center bg-purple-500 text-white w-full px-4 py-2 shimmer">
                  <Image
                    alt="Site Favicon"
                    src={review.acf.website_favicon.url}
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
                {featureList.map((feature) => (
                  <div
                    key={feature.name}
                    className="flex flex-col items-center border border-purple-500 rounded-lg p-2 bg-purple-500/20"
                  >
                    <feature.icon className="w-5 h-5 text-white mb-1" />
                    <span className="text-xs text-white font-semibold">
                      {feature.name}
                    </span>
                    <span className="mt-1 text-md font-bold text-white">
                      {feature.score}
                    </span>
                  </div>
                ))}

                <div className="flex flex-col items-center rounded-lg p-2 bg-green-500">
                  <StarIcon className="w-5 h-5 text-white mb-1" />
                  <span className="text-xs text-white font-semibold">
                    Overall
                  </span>
                  <span className="mt-1 text-xl font-bold text-white">
                    {overallScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="sm:col-span-1 mt-6 sm:mt-0">
              {videoId && (
                <Link
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-xl block overflow-hidden mb-6 border-4 border-white hover:scale-105 transition-all duration-300"
                >
                  <div className="relative w-full sm:h-64 h-48 not-prose">
                    <Image
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt="YouTube Video Thumbnail"
                      fill
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-white text-black w-full px-4 py-2">
                    <FaYoutube size={22} color="#FF0000" />
                    <span className="mx-2 font-semibold text-xl">
                      Watch Review
                    </span>
                    <ExternalLink size={24} className="text-black" />
                  </div>
                </Link>
              )}

              {/* Pros and Cons */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-4">Pros & Cons</h3>
                <div className="mb-4">
                  {review.acf.pros?.map((proItem, index) => (
                    <div
                      key={index}
                      className="border border-green-500 bg-green-500/20 rounded-2xl p-2 flex items-center mb-2"
                    >
                      <Heart className="text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-300 font-semibold text-sm">
                        {proItem.pros}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  {review.acf.cons?.map((conItem, index) => (
                    <div
                      key={index}
                      className="border border-red-500 bg-red-500/20 rounded-2xl p-2 flex items-center mb-2"
                    >
                      <ChevronDown className="text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-300 font-semibold text-sm">
                        {conItem.cons}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Girlfriends Section */}
        <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8 mt-8">
          <h2 className="text-3xl font-bold text-white mb-6 not-prose text-center">
            Alternatives to {review.acf.website_name}
          </h2>
          <FeaturedGirlfriends reviews={reviewsWithScore} />
        </div>
      </Container>
    </Section>
  );
} 