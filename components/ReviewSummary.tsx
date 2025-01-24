import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Plus, Minus, Youtube } from 'lucide-react';
import { FaYoutube as YouTubeIcon } from 'react-icons/fa';
import { Review } from '@/lib/wordpress.d';
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

interface ReviewSummaryProps {
  review: Review;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ review }) => {
  // Calculate scores
  const scoreGirls = Number(review.acf.score_girls);
  const scoreChat = Number(review.acf.score_chat);
  const scoreFeatures = Number(review.acf.score_features);
  const scores = [scoreGirls, scoreChat, scoreFeatures];
  const overallScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);

  const featureList = [
    {
      name: "Girls",
      icon: HeartIcon,
      score: review.acf.score_girls,
    },
    {
      name: "Chat",
      icon: ChatBubbleLeftRightIcon,
      score: review.acf.score_chat,
    },
    {
      name: "Features",
      icon: Cog6ToothIcon,
      score: review.acf.score_features,
    },
  ];

  // Video handling
  const getYouTubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = regex.exec(url);
    return match ? match[1] : null;
  };

  const videoId = review.acf.youtube_video_url ? getYouTubeVideoId(review.acf.youtube_video_url) : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
      {/* Left Column */}
      <div className="sm:col-span-1 not-prose">
        {/* Website Link with Screenshot */}
        <Link
          href={`/link/${review.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-xl block overflow-hidden border-4 border-purple-500 hover:scale-105 transition-all duration-300"
        >
          <Image
            src={review.acf.website_screenshot.url}
            alt={`${review.acf.website_name} website screenshot`}
            width={800}
            height={600}
            sizes="(max-width: 600px) 100vw, 600px"
            priority
            className="w-full sm:h-64 h-48 object-cover my-0"
          />
          <div className="flex items-center justify-center bg-purple-500 text-white w-full px-4 py-2 shimmer">
            <Image
              alt="Site Favicon"
              src={review.acf.website_favicon.url}
              width={32}
              height={32}
              className="inline-block m-0 p-0"
            />
            <span className="mx-2 font-semibold text-xl text-white">
              Open Website
            </span>
            <ExternalLink size={24} className="text-white" />
          </div>
        </Link>

        {/* Feature Rectangles */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {featureList.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col items-center border border-purple-500 rounded-lg p-2 bg-purple-500/20"
            >
              <feature.icon className="w-5 h-5 text-white mb-1" />
              <span className="text-xs text-white font-semibold">
                {feature.name}
              </span>
              <span className="mt-1 text-md font-bold text-white">
                {feature.score}
              </span>
            </div>
          ))}

          {/* Overall Score */}
          <div className="flex flex-col items-center rounded-lg p-2 bg-green-500">
            <StarIcon className="w-5 h-5 text-white mb-1" />
            <span className="text-xs text-white font-semibold">
              Overall
            </span>
            <span className="mt-1 text-xl font-bold text-white">
              {overallScore}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="sm:col-span-1 mt-6 sm:mt-0">
        {/* Video Section */}
        {videoId && (
          <Link
            href={review.acf.youtube_video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-xl block overflow-hidden mb-6 border-4 border-white hover:scale-105 transition-all duration-300"
          >
            <div className="relative w-full sm:h-64 h-48 not-prose">
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="YouTube Video Thumbnail"
                fill
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white text-black w-full px-4 py-2">
              <YouTubeIcon size={22} color="#FF0000" />
              <span className="mx-2 font-semibold text-xl">
                Watch Review
              </span>
              <ExternalLink size={24} className="text-black" />
            </div>
          </Link>
        )}

        {/* Pros & Cons */}
        <div className="mt-6">
          <h2 className="text-xl not-prose font-bold text-white mb-4">Pros & Cons</h2>
          {/* Pros */}
          <div className="mb-4">
            {review.acf.pros && review.acf.pros.length > 0 ? (
              review.acf.pros.map((proItem, index) => (
                <div
                  key={index}
                  className="border border-green-500 bg-green-500/20 rounded-2xl p-2 flex items-center mb-2"
                >
                  <Plus className="text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300 font-semibold text-sm">
                    {proItem.title}
                  </span>
                </div>
              ))
            ) : (
              <div className="border border-green-500 bg-green-500/20 rounded-2xl p-2 flex items-center mb-2">
                <Plus className="text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-300 font-semibold text-sm">
                  No pros available.
                </span>
              </div>
            )}
          </div>

          {/* Cons */}
          <div>
            {review.acf.cons && review.acf.cons.length > 0 ? (
              review.acf.cons.map((conItem, index) => (
                <div
                  key={index}
                  className="border border-red-500 bg-red-500/20 rounded-2xl p-2 flex items-center mb-2"
                >
                  <Minus className="text-rose-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300 font-semibold text-sm">
                    {conItem.title}
                  </span>
                </div>
              ))
            ) : (
              <div className="border border-red-500 bg-red-500/20 rounded-2xl p-2 flex items-center mb-2">
                <Minus className="text-rose-500 mr-2 flex-shrink-0" />
                <span className="text-gray-300 font-semibold text-sm">
                  No cons available.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary; 