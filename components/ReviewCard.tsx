'use client'

import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { Review } from "@/lib/wordpress.d";

interface ReviewCardProps {
  review: Review & { overallScore: string };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Link
      href={`/${review.slug}`}
      className="group block bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Screenshot */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={review.acf.website_screenshot.url}
          alt={`${review.acf.website_name} screenshot`}
          fill
          className="object-cover"
        />
        {/* Score Badge */}
        <div className="absolute top-4 right-4 bg-green-500 rounded-lg px-3 py-1.5 flex items-center gap-1">
          <StarIcon className="w-4 h-4 text-white" />
          <span className="text-white font-bold">{review.overallScore}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src={review.acf.website_favicon.url}
            alt={`${review.acf.website_name} icon`}
            width={24}
            height={24}
            className="rounded"
          />
          <h2 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
            {review.acf.website_name}
          </h2>
        </div>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {review.acf.short_description || review.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim()}
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <Link
            href={`/${review.slug}/alternatives`}
            className="text-xs text-purple-400 hover:text-purple-300 border border-purple-500/30 rounded-full px-3 py-1"
            onClick={handleLinkClick}
          >
            Alternatives
          </Link>
          <Link
            href={`/questions?app=${review.slug}`}
            className="text-xs text-purple-400 hover:text-purple-300 border border-purple-500/30 rounded-full px-3 py-1"
            onClick={handleLinkClick}
          >
            FAQ
          </Link>
        </div>
      </div>
    </Link>
  );
} 