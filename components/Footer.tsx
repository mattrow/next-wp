'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import candy_ai from '@/public/candy_ai.png';

export default function Footer({ slug }: { slug: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121417] py-4 z-50 sm:hidden">
      <div className="flex justify-center">
        <Link
          href={`/link/${slug}`}
          className="flex items-center justify-center bg-green-500 text-white rounded-md w-full mx-4 px-4 py-2"
        >
          <Image
            alt="Site Favicon"
            src={candy_ai}
            width={32}
            height={32}
            className="inline-block m-0 p-0"
          />
          <span className="mx-2">candy.ai</span>
          <ExternalLink size={20} />
        </Link>
      </div>
    </div>
  );
} 