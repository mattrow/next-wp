'use client'

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface FAQProps {
  faqs: {
    question: string;
    answer: string;
  }[];
  reviewSlug?: string;
}

export default function FAQ({ faqs, reviewSlug }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getQuestionSlug = (question: string) => {
    return question.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="backdrop-blur-2xl rounded-xl overflow-hidden border border-white/10">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 text-left bg-gray-900/40 hover:bg-gray-900/60 flex justify-between items-center transition-all duration-300"
            >
              <span className="font-medium text-white">{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 text-purple-500/70 transition-all duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-[800px]' : 'max-h-0'
              }`}
            >
              <div className="p-4 bg-gray-900/20 backdrop-blur-xl">
                <div className="prose dark:prose-invert max-w-none mb-4" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                <Link
                  href={`/questions/${getQuestionSlug(faq.question)}`}
                  className="text-purple-400 hover:text-purple-300 text-sm inline-flex items-center mt-2 transition-colors duration-300"
                >
                  Read full answer →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Link to all questions */}
      <div className="mt-6 text-center">
        <Link
          href="/questions"
          className="inline-flex items-center px-4 py-2 rounded-xl bg-gray-900/40 backdrop-blur-xl border border-white/10 text-purple-400 hover:text-purple-300 hover:bg-gray-900/60 transition-all duration-300"
        >
          View all FAQ questions →
        </Link>
      </div>
    </div>
  );
} 