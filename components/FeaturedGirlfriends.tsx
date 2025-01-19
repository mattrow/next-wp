'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Review } from '@/lib/wordpress.d';

interface FeaturedGirlfriendsProps {
  reviews: Review[];
}

const rankingIcons = [
  { label: '#1 Best Choice', color: 'border-l-yellow-400' },
  { label: '#2 Runner Up', color: 'border-l-gray-400' },
  { label: '#3 Great Option', color: 'border-l-amber-700' }
];

// Client Component for Action Buttons
const ActionButtons = ({ slug }: { slug: string }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={`/link/${slug}`}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 border border-purple-400/30"
        onClick={handleClick}
      >
        Try For Free
        <ExternalLink className="w-4 h-4" />
      </Link>
      <Link
        href={`/${slug}`}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group border border-white/10 hover:border-purple-500/30"
        onClick={handleClick}
      >
        Read Review
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
};

export default function FeaturedGirlfriends({ reviews }: FeaturedGirlfriendsProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {reviews.map((review, index) => {
        // Calculate the overall score
        const scoreGirls = Number(review.acf.score_girls);
        const scoreChat = Number(review.acf.score_chat);
        const scoreFeatures = Number(review.acf.score_features);
        const overallScore = ((scoreGirls + scoreChat + scoreFeatures) / 3).toFixed(1);

        return (
          <Link
            key={review.id}
            href={`/${review.slug}`}
            className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-700/10 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 ${rankingIcons[index].color} border-l-4`}
          >
            <div className="relative flex flex-col md:flex-row items-stretch">
              {/* Screenshot Section */}
              <div className="md:w-1/3 relative group/image">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={review.acf.website_screenshot.url}
                    alt={`${review.acf.website_name} screenshot`}
                    fill
                    className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                    priority
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-2/3 p-5 flex flex-col justify-between relative">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative w-8 h-8">
                        <Image
                          src={review.acf.website_favicon.url}
                          alt={`${review.acf.website_name} icon`}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                          {review.acf.website_name}
                        </h3>
                        <span className="text-xs text-purple-300">{rankingIcons[index].label}</span>
                      </div>
                    </div>
                    {/* Score Badge */}
                    <div className="flex items-center gap-1.5 bg-green-500 rounded-lg px-3 py-1.5 shadow-lg shadow-green-500/20">
                      <StarIcon className="w-4 h-4 text-white" />
                      <span className="font-bold text-white">{overallScore}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 line-clamp-2 text-sm">
                    {review.acf.short_description || review.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim()}
                  </p>
                </div>

                {/* Action Buttons */}
                <ActionButtons slug={review.slug} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}