import { Metadata } from "next";
import { Section, Container } from "@/components/craft";
import Link from "next/link";
import { getAllReviews } from "@/lib/wordpress";
import { Review } from "@/lib/wordpress.d";

interface FAQItem {
  question: string;
  answer: string;
}

interface QuestionWithMeta {
  question: string;
  answer: string;
  reviewSlug: string;
  reviewTitle: string;
  slug: string;
}

export const metadata: Metadata = {
  title: "AI Girlfriend FAQs - Common Questions Answered",
  description: "Find answers to frequently asked questions about AI girlfriends, virtual companions, and AI chat apps.",
  alternates: {
    canonical: 'https://www.bestaigirlfriends.com/questions'
  }
};

export default async function QuestionsPage() {
  const reviews = await getAllReviews();
  
  // Collect all questions from all reviews
  const allQuestions = reviews.reduce<QuestionWithMeta[]>((acc, review) => {
    const faqs = review.acf.faqs;
    if (!faqs) return acc;

    // Handle both old and new FAQ structure
    const questions: FAQItem[] = Array.isArray(faqs) ? faqs : faqs.faqs || [];
    
    const reviewQuestions = questions.map(faq => ({
      question: faq.question,
      answer: faq.answer,
      reviewSlug: review.slug,
      reviewTitle: review.title.rendered,
      slug: faq.question.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
    }));

    return [...acc, ...reviewQuestions];
  }, []);

  return (
    <Section>
      <Container>
        <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8">
          <h1 className="text-3xl font-bold text-white mb-4 text-center not-prose">
            Frequently Asked Questions About AI Girlfriends
          </h1>
          <p className="text-sm text-gray-300 mb-6 text-center not-prose">
            Find answers to common questions about AI girlfriends, virtual relationships, and AI dating apps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {allQuestions.map((item, index) => (
              <Link
                key={index}
                href={`/questions/${item.slug}`}
                className="group"
              >
                <div className="border-b border-gray-700 pb-1 hover:border-purple-500 transition-colors not-prose">
                  <h2 className="text-md text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                    {item.question}
                  </h2>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    From: {item.reviewTitle.replace(' Review', '')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
} 