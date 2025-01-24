'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Youtube, Play } from 'lucide-react';

interface ReviewYouTubeProps {
  websiteName: string;
  videoId: string;
}

const ReviewYouTube: React.FC<ReviewYouTubeProps> = ({
  websiteName,
  videoId,
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const loadVideo = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="review-youtube py-12">
      <div className="flex items-center gap-3 mb-8">
        <Youtube className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Video Review
        </h2>
      </div>

      <div className="aspect-video w-full relative rounded-2xl overflow-hidden">
        {!isVideoLoaded ? (
          <button 
            onClick={loadVideo}
            className="w-full h-full relative group"
            aria-label="Play video"
          >
            <Image
              src={thumbnailUrl}
              alt={`${websiteName} Video Review Thumbnail`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
              </div>
            </div>
          </button>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={`${websiteName} Video Review`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default ReviewYouTube; 