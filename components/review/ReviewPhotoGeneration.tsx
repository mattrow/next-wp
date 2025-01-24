"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

interface PhotoExample {
  image: {
    url: string;
    alt: string;
  };
  prompt: string;
  description: string;
}

interface ReviewPhotoGenerationProps {
  websiteName: string;
  overview: string;
  photoExamples: PhotoExample[];
}

const ReviewPhotoGeneration: React.FC<ReviewPhotoGenerationProps> = ({
  websiteName,
  overview,
  photoExamples,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="review-photo-generation py-12">
      <div className="flex items-center gap-3 mb-8">
        <Camera className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Photo Generation
        </h2>
      </div>

      <div className="prose dark:prose-invert max-w-none mb-12">
        {mounted && <div dangerouslySetInnerHTML={{ __html: overview }} />}
      </div>

      {/* Example Images Section */}
      <div className="space-y-12">
        {photoExamples.map((example, index) => (
          <div key={index} className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl px-6 py-8 border border-purple-500/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`max-w-[300px] mx-auto w-full ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
                  <Image
                    src={example.image.url}
                    alt={example.image.alt}
                    width={300}
                    height={533}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className={`flex flex-col justify-center space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div>
                  <h3 className="text-xl font-bold text-purple-400 mb-2">Example {index + 1}</h3>
                  <p className="text-sm text-gray-400 italic">
                    &ldquo;{example.prompt}&rdquo;
                  </p>
                </div>
                <div className="prose dark:prose-invert">
                  {mounted && <p dangerouslySetInnerHTML={{ __html: example.description }} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPhotoGeneration; 