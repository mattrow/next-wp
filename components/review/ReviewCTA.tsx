import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewCTAProps {
  websiteName: string;
  websiteFavicon: {
    url: string;
  };
  reviewSlug: string;
  className?: string;
}

export function ReviewCTA({ websiteName, websiteFavicon, reviewSlug, className }: ReviewCTAProps) {
  return (
    <Link
      href={`/link/${reviewSlug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group w-full flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-2",
        "bg-gradient-to-br from-purple-500/5 to-pink-500/5",
        "border border-purple-500/20 rounded-xl",
        "transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/10",
        "relative overflow-hidden",
        className
      )}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-50 blur-2xl" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Content */}
      <div className="flex items-center not-prose gap-2 sm:gap-4 relative">
        {websiteFavicon?.url && (
          <Image
            alt="Site Favicon"
            src={websiteFavicon.url}
            width={32}
            height={32}
            className="inline-block m-0 p-0 border-0 !border-none sm:w-[40px] sm:h-[40px]"
            style={{
              aspectRatio: '1',
              objectFit: 'contain',
              border: 'none'
            }}
          />
        )}
        <div>
          <div className="font-semibold not-prose text-white text-base sm:text-lg">
            Try {websiteName}
          </div>
        </div>
      </div>
      
      {/* Button */}
      <div className="relative flex items-center gap-1 sm:gap-2 text-base sm:text-lg bg-gradient-to-br from-purple-500 to-purple-700 px-3 sm:px-4 py-2 sm:py-4 rounded-lg font-medium text-white transition-all duration-300 group-hover:from-purple-600 group-hover:to-purple-800">
        <span className="hidden sm:inline">Claim</span> Free Trial
        <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
} 