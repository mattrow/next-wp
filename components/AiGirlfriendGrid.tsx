import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink, BookOpen } from 'lucide-react';
import { Review } from '@/lib/wordpress.d';

interface AiGirlfriendGridProps {
  reviews: (Review & { totalScore: number })[];
  variant?: 'sidebar' | 'full';
}

export default function AiGirlfriendGrid({ reviews, variant = 'full' }: AiGirlfriendGridProps) {
  const gridClasses = clsx('grid gap-4 mt-6', {
    'grid-cols-2 sm:grid-cols-4 mt-8': variant === 'full',
    'grid-cols-2 lg:grid-cols-1 mx-auto': variant === 'sidebar',
  });

  return (
    <div className={clsx(
      'bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 sm:p-8 not-prose',
      {
        'max-w-[280px] mx-auto mt-0': variant === 'sidebar',
        'mt-8': variant === 'full',
      }
    )}>
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">
          Best AI Girlfriends 2025
        </h2>
        <Link
          href="#"
          className="flex items-center bg-purple-500/80 hover:bg-purple-500 text-white py-2 px-4 rounded-xl transition-all duration-300"
        >
          <ArrowRight />
        </Link>
      </div>

      {/* Grid of Cards */}
      <div className={gridClasses}>
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="relative bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden group transition-all duration-300 hover:border-purple-500/50"
          >
            {/* Website Screenshot */}
            <div className="w-full h-40 relative">
              {review.acf.website_screenshot?.url ? (
                <Image
                  src={review.acf.website_screenshot.url}
                  alt={review.acf.website_name || 'AI Girlfriend'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800/50 backdrop-blur-xl flex items-center justify-center">
                  <span className="text-white/70">No Image</span>
                </div>
              )}
            </div>

            {/* Hover Buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900/80 backdrop-blur-sm">
              <Link 
                href={`/link/${review.slug}`}
                className="w-40 bg-purple-500/80 hover:bg-purple-500 text-white py-1.5 text-sm text-center rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1"
              >
                <ExternalLink size={16} />
                Visit Website
              </Link>
              <Link 
                href={`/${review.slug}`}
                className="w-40 bg-white/90 hover:bg-white text-gray-900 py-1.5 text-sm text-center rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1"
              >
                <BookOpen size={16} />
                Read Review
              </Link>
            </div>

            {/* Website Name */}
            <div className="absolute bottom-2 left-2 bg-purple-500/80 backdrop-blur-sm px-2 rounded-lg">
              <span className="text-white font-bold">
                {review.acf.website_name}
              </span>
            </div>
            {/* Rank Number */}
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg w-7 h-7 flex items-center justify-center">
              <span className="text-black font-bold">
                {index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}