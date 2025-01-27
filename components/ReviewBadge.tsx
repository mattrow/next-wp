'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewBadgeProps {
  websiteName: string;
  score: number;
  reviewSlug: string;
  variant?: 'purple' | 'grey' | 'white';
  websiteFavicon?: string;
}

const ReviewBadge: React.FC<ReviewBadgeProps> = ({ 
  websiteName, 
  score, 
  reviewSlug,
  variant = 'purple',
  websiteFavicon
}) => {
  const badgeUrl = `https://bestaigirlfriends.com/${reviewSlug}`;

  const variants = {
    purple: {
      background: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900",
      border: "border-purple-400/30",
      hover: "hover:shadow-purple-500/20",
      glow: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
      radial: "bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_80%)]",
      innerBg: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900",
      text: "text-white",
      subtext: "text-purple-200"
    },
    grey: {
      background: "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900",
      border: "border-gray-600/30",
      hover: "hover:shadow-gray-500/20",
      glow: "bg-gradient-to-r from-gray-500/20 to-gray-400/20",
      radial: "bg-[radial-gradient(circle_at_50%_50%,rgba(156,163,175,0.1),transparent_80%)]",
      innerBg: "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900",
      text: "text-white",
      subtext: "text-gray-300"
    },
    white: {
      background: "bg-white",
      border: "border-gray-200",
      hover: "hover:shadow-gray-200/30",
      glow: "bg-gradient-to-r from-gray-100 to-white",
      radial: "bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03),transparent_80%)]",
      innerBg: "bg-white",
      text: "text-gray-900",
      subtext: "text-gray-600"
    }
  };

  const v = variants[variant];

  return (
    <a
      href={badgeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block w-full relative overflow-hidden shadow-sm",
        "rounded-xl border transition-all duration-300 no-underline group",
        v.background,
        v.border,
        `hover:shadow-lg ${v.hover}`
      )}
    >
      {/* Background Effects */}
      <div className={cn(
        "absolute inset-0 blur-xl opacity-50",
        v.glow
      )} />
      <div className={cn(
        "absolute inset-0",
        v.radial
      )} />
      
      {/* Content Container */}
      <div className="relative not-prose flex items-center gap-2 sm:gap-4 w-full p-3 sm:p-4">
        {/* Avatar Container with Award Frame */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full blur opacity-40" />
          <div className="relative w-12 h-12 sm:w-14 sm:h-14">
            {/* Decorative Award Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-600 rounded-full animate-[spin_8s_linear_infinite] opacity-80" />
            <div className={cn(
              "absolute inset-[1.5px] rounded-full",
              v.innerBg
            )} />
            <div className={cn(
              "absolute inset-[2px] rounded-full flex items-center justify-center",
              variant === 'white' ? "bg-gray-50" : "bg-black/10"
            )}>
              <Image
                src="/thumbsuprounded.webp"
                alt="Jess thumbs up"
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-sm not-prose !border-0 !shadow-none !m-0 w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className={cn(
              "font-bold text-base sm:text-lg truncate",
              v.text
            )}>
              {websiteName}
            </span>
            {websiteFavicon && (
              <div className={cn(
                "w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden flex-shrink-0",
                variant === 'white' ? "shadow-sm" : "shadow"
              )}>
                <Image
                  src={websiteFavicon}
                  alt={`${websiteName} favicon`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-cover !border-0 !shadow-none !m-0"
                />
              </div>
            )}
          </div>
          <span className={cn(
            "text-[10px] sm:text-xs font-medium truncate",
            v.subtext
          )}>
            BestAIGirlfriends.com
          </span>
        </div>

        {/* Score Award */}
        <div className="relative group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-yellow-600 blur-md opacity-40" />
          <div className={cn(
            "relative flex items-center gap-0.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-lg border",
            variant === 'white' 
              ? "bg-gray-900 border-gray-800" 
              : "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 border-amber-300/50"
          )}>
            {/* Inner glow and shine effects */}
            <div className={cn(
              "absolute inset-0 rounded-lg",
              variant === 'white'
                ? "bg-gradient-to-t from-amber-400/10 to-yellow-300/10"
                : "bg-gradient-to-t from-amber-400/30 to-yellow-300/30"
            )} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_70%)]" />
            <div className="relative flex items-center gap-0.5">
              <span className={cn(
                "font-extrabold text-xl sm:text-2xl leading-none tracking-tight",
                variant === 'white' 
                  ? "bg-gradient-to-br from-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow"
                  : "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
              )}>
                {score.toFixed(1)}
              </span>
              <span className={cn(
                "text-[10px] sm:text-[11px] self-end mb-0.5 font-semibold",
                variant === 'white' ? "text-amber-400" : "text-white/90"
              )}>
                /10
              </span>
            </div>
            {/* Additional shine effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-lg" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default ReviewBadge; 