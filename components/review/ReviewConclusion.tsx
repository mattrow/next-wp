'use client'

import React, { useState } from 'react';
import { Flag, Star, Award, Copy, Check } from 'lucide-react';
import ReviewBadge from '../ReviewBadge';

interface ScoreNote {
  category: string;
  note: string;
}

interface ReviewConclusionProps {
  websiteName: string;
  scores: {
    characters: number;
    chat: number;
    features: number;
  };
  reviewSlug: string;
  websiteFavicon?: string;
  conclusionText: string;
  scoreNotes: ScoreNote[];
}

type BadgeVariant = 'purple' | 'grey' | 'white';

const ReviewConclusion: React.FC<ReviewConclusionProps> = ({
  websiteName,
  scores,
  reviewSlug,
  websiteFavicon,
  conclusionText,
  scoreNotes,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<BadgeVariant>('purple');
  const [copied, setCopied] = useState(false);
  const averageScore = ((scores.characters + scores.chat + scores.features) / 3).toFixed(1);

  const getEmbedCode = (variant: BadgeVariant) => {
    return `<a href="https://bestaigirlfriends.com/${reviewSlug}?ref=badge" target="_blank"><img src="https://bestaigirlfriends.com/api/badge/${reviewSlug}?theme=${variant}" alt="${websiteName} Review | BestAIGirlfriends" style="width: 340px; height: 56px;" width="340" height="56" /></a>`;
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(getEmbedCode(selectedVariant));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const variants: { label: string; value: BadgeVariant }[] = [
    { label: 'Purple', value: 'purple' },
    { label: 'Dark', value: 'grey' },
    { label: 'Light', value: 'white' }
  ];

  return (
    <div className="review-conclusion py-12">
      <div className="flex items-center gap-3 mb-8">
        <Flag className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          In Conclusion
        </h2>
      </div>

      {/* Overall Score Card */}
      <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-8 border border-purple-500/20 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-4">Final Verdict</h3>
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: conclusionText }} />
            </div>
            {/* Mobile Score Display */}
            <div className="md:hidden mt-6 flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <Star className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-purple-400 font-medium">Overall Score</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-purple-400">{averageScore}</span>
                  <span className="text-sm text-gray-400">/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badge Section - Hidden on Mobile */}
          <div className="hidden md:flex flex-col justify-center items-center gap-6">
            {/* Style Selector */}
            <div className="flex items-center justify-between gap-2 p-1 bg-purple-900/20 rounded-lg w-full max-w-[340px]">
              {variants.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setSelectedVariant(value)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedVariant === value
                      ? 'bg-purple-500 text-white shadow-sm'
                      : 'text-purple-300 hover:text-purple-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Badge Display */}
            <div className="flex items-start gap-4">
              <ReviewBadge 
                websiteName={websiteName}
                score={Number(averageScore)}
                reviewSlug={reviewSlug}
                variant={selectedVariant}
                websiteFavicon={websiteFavicon}
              />
              <button
                onClick={handleCopyClick}
                className={`flex items-center gap-2 mt-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  copied 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                }`}
                title="Copy embed code"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span className="text-sm font-medium">Copy Badge</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {scoreNotes.map((note, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              {index === 0 && <Award className="w-6 h-6 text-purple-400" />}
              {index === 1 && <Star className="w-6 h-6 text-purple-400" />}
              {index === 2 && <Flag className="w-6 h-6 text-purple-400" />}
              <h3 className="text-xl font-bold text-purple-400">{note.category}</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <div className="text-4xl font-bold text-purple-400">
                {index === 0 && scores.characters}
                {index === 1 && scores.chat}
                {index === 2 && scores.features}
              </div>
              <div className="text-gray-400 mb-1">/10</div>
            </div>
            <p className="text-sm text-gray-400">{note.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewConclusion; 