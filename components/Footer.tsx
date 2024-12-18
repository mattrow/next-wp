'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export default function Footer({
  slug,
  websiteUrl,
  websiteFavicon,
}: {
  slug: string;
  websiteUrl: string;
  websiteFavicon?: string;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121417] py-4 z-50 sm:hidden">
      <div className="flex justify-center">
        <Link
          href={`/link/${slug}`}
          className="flex items-center justify-center bg-purple-500 text-white rounded-md w-full mx-4 px-4 py-2 shimmer"
        >
          {websiteFavicon ? (
            <Image
              alt="Site Favicon"
              src={websiteFavicon}
              width={32}
              height={32}
              className="inline-block m-0 p-0"
            />
          ) : (
            // Placeholder or default image
            <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
          )}
          <span className="mx-2 font-semibold text-xl text-white">
            {websiteUrl || 'Website'}
          </span>
          <ExternalLink size={24} className="text-white" />
        </Link>
      </div>
    </div>
  );
} 