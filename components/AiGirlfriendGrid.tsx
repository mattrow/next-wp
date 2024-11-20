import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface AiGirlfriendGridProps {
  websiteName: string;
  websiteScreenshot: {
    url: string;
  };
}

export default function AiGirlfriendGrid({ websiteName, websiteScreenshot }: AiGirlfriendGridProps) {
  return (
    <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8 not-prose mt-8">
      {/* 26+ AI Girlfriends Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          26+ AI Girlfriends like {websiteName}
        </h2>
        <Link
          href="#"
          className="flex items-center bg-purple-500 text-white py-2 px-4 rounded-lg"
        >
          <ArrowRight />
        </Link>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {/* Card Example */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden">
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">1</span>
          </div>
          <div className="w-full h-40 relative">
            <Image
              src={websiteScreenshot.url}
              alt="AI Girlfriend"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
            <span className="text-white font-bold">{websiteName}</span>
          </div>
        </div>
        {/* Additional cards would go here */}
      </div>
    </div>
  );
}