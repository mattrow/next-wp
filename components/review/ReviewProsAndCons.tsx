"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

interface Pro {
  title: string;
  description: string;
}

interface Con {
  title: string;
  description: string;
}

interface ReviewProsAndConsProps {
  websiteName: string;
  pros: Pro[];
  cons: Con[];
}

const ReviewProsAndCons: React.FC<ReviewProsAndConsProps> = ({
  websiteName,
  pros,
  cons,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="review-pros-cons py-12">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        {websiteName} Pros and Cons
      </h2>
      {/* Pros Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-green-500 mb-4">Pros</h3>
        <div className="prose dark:prose-invert max-w-none">
          <p>After spending quite a bit of time with the platform (probably more than I should admit), here&apos;s what I found particularly impressive:</p>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            {pros.map((pro, index) => (
              <div key={`pro-${index}`} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-500/10 rounded-lg px-4 py-2 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold text-emerald-400 text-lg">{pro.title}</span>
                  </div>
                </div>
                {mounted && (
                  <p 
                    className="text-gray-400 ml-2" 
                    dangerouslySetInnerHTML={{ __html: pro.description }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cons Section */}
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-4">Cons</h3>
        <div className="prose dark:prose-invert max-w-none">
          <p>Let&apos;s keep it real - no platform is perfect, and {websiteName} has its share of quirks and frustrations:</p>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            {cons.map((con, index) => (
              <div key={`con-${index}`} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-rose-500/10 rounded-lg px-4 py-2 flex items-center gap-2">
                    <Minus className="w-5 h-5 text-rose-500" />
                    <span className="font-semibold text-rose-400 text-lg">{con.title}</span>
                  </div>
                </div>
                {mounted && (
                  <p 
                    className="text-gray-400 ml-2" 
                    dangerouslySetInnerHTML={{ __html: con.description }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewProsAndCons; 