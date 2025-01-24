import React from 'react';
import { Youtube } from 'lucide-react';

interface ReviewYouTubeProps {
  websiteName: string;
  videoId: string;
}

const ReviewYouTube: React.FC<ReviewYouTubeProps> = ({
  websiteName,
  videoId,
}) => {
  if (!videoId) return null;

  return (
    <div className="review-youtube py-12">
      <div className="flex items-center gap-3 mb-8">
        <Youtube className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Video Review
        </h2>
      </div>

      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full rounded-2xl"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={`${websiteName} Video Review`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ReviewYouTube; 