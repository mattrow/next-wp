import React from 'react';
import { Review } from '@/lib/wordpress.d';
import Link from 'next/link';
import Image from 'next/image';

interface AlternativesComponentProps {
  reviews: Review[];
}

const AlternativesComponent: React.FC<AlternativesComponentProps> = ({ reviews }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {reviews.map(review => (
        <div key={review.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50 transition-all">
          <h3 className="text-xl font-semibold text-white mb-2">
            {review.acf.website_name || review.title.rendered}
          </h3>
          {review.acf.website_screenshot?.url && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 group mb-4">
              <Image
                src={review.acf.website_screenshot.url}
                alt={`${review.acf.website_name} Screenshot`}
                className="object-cover"
                layout="fill"
              />
            </div>
          )}
          <p className="text-gray-300 mb-4">
            {review.acf.short_description ||
              review.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
              "Read our review to learn more!"}
          </p>
          <Link href={`/${review.slug}`} className="inline-block px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
            Read Review
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AlternativesComponent;
