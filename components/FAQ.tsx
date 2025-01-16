'use client'

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[] | undefined;
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) {
    console.log('No FAQs found or empty array');
    return null;
  }

  console.log('FAQ Component received faqs:', faqs);

  return (
    <div className="mt-12 not-prose">
      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          console.log('Rendering FAQ item:', faq);
          return (
            <div
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/50 transition-colors"
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-gray-400 transition-transform duration-200",
                    openIndex === index ? "transform rotate-180" : ""
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-300 border-t border-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
} 