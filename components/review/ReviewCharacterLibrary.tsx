import React from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';

interface CharacterExample {
  name: string;
  title: string;
  image: {
    url: string;
    alt: string;
  };
  description: string;
}

interface ReviewCharacterLibraryProps {
  websiteName: string;
  overview: string;
  characterExamples: CharacterExample[];
  interfaceImage: {
    url: string;
    alt: string;
  };
}

const ReviewCharacterLibrary: React.FC<ReviewCharacterLibraryProps> = ({
  websiteName,
  overview,
  characterExamples,
  interfaceImage,
}) => {
  // Convert image URL to WebP if it's not already
  const getOptimizedImageUrl = (url: string) => {
    // If the URL is already a WebP, return as is
    if (url.toLowerCase().endsWith('.webp')) return url;
    
    // If it's a WordPress URL, append WebP conversion parameter
    if (url.includes('aigirlfriendblog.com')) {
      return `${url}?format=webp`;
    }
    
    return url;
  };

  return (
    <div className="review-character-library py-12">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Character Library
        </h2>
      </div>

      {/* Overview */}
      <div className="prose dark:prose-invert max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: overview }} />
      </div>

      {/* Character Library Preview */}
      <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl px-6 py-8 border border-purple-500/20 mb-12">
        <h3 className="text-xl font-bold text-purple-400 mb-4">Character Library Overview</h3>
        <div className="aspect-[16/9] rounded-lg overflow-hidden mb-6">
          <Image
            src={getOptimizedImageUrl(interfaceImage.url)}
            alt={interfaceImage.alt}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            quality={75}
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            The library interface is sleek and intuitive, with helpful filters to narrow down your search. 
            You can filter by personality type, interests, occupation, and even conversation style. Each 
            character card shows a preview image, brief bio, and personality traits, making it easy to 
            find someone who matches your interests.
          </p>
        </div>
      </div>

      {/* Example Characters */}
      <div className="space-y-12">
        {characterExamples.map((example, index) => (
          <div key={index} className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl px-6 py-8 border border-purple-500/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`max-w-[300px] mx-auto w-full ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
                  <Image
                    src={getOptimizedImageUrl(example.image.url)}
                    alt={example.image.alt}
                    width={300}
                    height={533}
                    className="w-full h-full object-cover"
                    quality={75}
                    loading={index === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              </div>
              <div className={`flex flex-col justify-center space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <h3 className="text-xl font-bold text-purple-400">{example.name} - {example.title}</h3>
                <div className="prose dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: example.description }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCharacterLibrary; 