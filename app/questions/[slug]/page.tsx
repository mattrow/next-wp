import { Metadata } from "next";
import { Section, Container } from "@/components/craft";
import { getAllReviews } from "@/lib/wordpress";
import { Review } from "@/lib/wordpress.d";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, Heart, ChevronDown, ArrowRight } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import FeaturedGirlfriends from "@/components/FeaturedGirlfriends";
import styles from '@/app/[slug]/styles.module.css';
import { AnimatedSection } from '@/components/AnimatedSection';
import ReviewTopSection from "@/components/ReviewTopSection";
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
    alternates: {
      canonical: `https://www.bestaigirlfriends.com/questions/${params.slug}`
    }
  };
}

export default async function QuestionPage({ params }: Props) {
  const data = await getQuestionData(params.slug);
  
  if (!data) {
    notFound();
  }

  const { question, review } = data;

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

  return (
    <Section className="relative z-10">
      <Container>
        <AnimatedSection delay={0}>
          <div className={styles.mainWrapper}>
            {/* Gradient overlays */}
            <div className={styles.gradientOverlayPurple} id="purple-gradient" />
            <div className={styles.gradientOverlayWhite} id="white-gradient" />

            {/* Question Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-8 mb-8">
              <h1 className="text-3xl font-bold text-white mb-6 not-prose">
                {question.question}
              </h1>
              <div 
                className="prose dark:prose-invert max-w-none text-gray-300 not-prose"
                dangerouslySetInnerHTML={{ __html: question.answer }}
              />
              
              {/* Open Website Button */}
              <div className="mt-8 flex justify-center">
                <Link
                  href={`/link/${review.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 bg-gradient-to-br from-purple-500/20 to-purple-700/20 border border-purple-500/50 hover:border-purple-400 text-white px-6 py-2 rounded-xl text-base transition-all duration-300"
                >
                  <Image
                    alt="Site Favicon"
                    src={review.acf.website_favicon.url}
                    width={18}
                    height={18}
                    className="inline-block m-0"
                  />
                  <span className="text-white group-hover:text-purple-400 transition-colors">Open {review.acf.website_name} Website</span>
                  <ExternalLink className="w-4 h-4 text-white group-hover:text-purple-400 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Review Info Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-8">
              <h2 className="text-3xl font-bold text-white mb-6 not-prose text-center">
                {review.acf.website_name} Review
              </h2>
              
              {/* ReviewTopSection Component */}
              <ReviewTopSection review={review} slug={review.slug} />

              {/* Read Full Review Button */}
              <div className="mt-8 flex justify-center">
                <Link
                  href={`/${review.slug}`}
                  className="group relative inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500 text-white px-6 py-3 rounded-xl text-base transition-colors"
                >
                  <Image
                    alt="Site Favicon"
                    src={review.acf.website_favicon.url}
                    width={20}
                    height={20}
                    className="inline-block m-0"
                  />
                  <span className="text-white group-hover:text-purple-400 transition-colors">Read Full {review.acf.website_name} Review</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:text-purple-400 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Related Questions Section */}
            <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-4">More Questions About {review.acf.website_name}</h3>
              <div className="space-y-2">
                {review.acf.faqs && (
                  'faqs' in review.acf.faqs 
                    ? (review.acf.faqs as { faqs: { question: string; answer: string; }[] }).faqs
                    : review.acf.faqs as { question: string; answer: string; }[]
                ).map((faq, index) => {
                  const questionSlug = faq.question.toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-');
                  
                  return (
                    <Link
                      key={index}
                      href={`/questions/${questionSlug}`}
                      className="block bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:border-purple-500 transition-colors"
                    >
                      <span className="text-white hover:text-purple-400 transition-colors">
                        {faq.question}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Featured Reviews */}
            <div className="mt-8 not-prose">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Top Rated AI Girlfriends</h2>
              <FeaturedGirlfriends reviews={reviewsWithScore} />
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
} 