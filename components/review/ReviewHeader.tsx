"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ReviewHeaderProps {
  websiteName: string;
  heroImage: {
    url: string;
    alt: string;
  };
  introductionText: string;
  updatedDate: string;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  websiteName,
  heroImage,
  introductionText,
  updatedDate,
}) => {
  // Initialize state with empty string to match server-side initial render
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format date consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="review-header relative">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-black/80 z-10" />
        <div className="absolute inset-0">
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-white not-prose">
            {websiteName} Review: An Honest Look at the Popular AI Girlfriend Website
          </h1>
          <div className="flex items-center gap-4 text-gray-200">
            <div className="flex items-center gap-2">
              <Image
                src="/jesssmilingsmall.webp"
                alt="Jessica Carson"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span>By Jessica Carson</span>
            </div>
            <span>•</span>
            <span>Updated {formatDate(updatedDate)}</span>
          </div>
        </div>
      </div>
      
      {/* Introduction */}
      <div className="introduction mb-6">
        <div className="prose dark:prose-invert max-w-none">
          {mounted && (
            <p 
              className="text-xl leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: introductionText }} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader; 