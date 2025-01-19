   // components/ReviewTopSection.tsx

   import React from 'react';
   import Link from 'next/link';
   import Image from 'next/image';
   import { GradientButton } from './GradientButton';
   import { Plus, Minus, ExternalLink } from 'lucide-react';
   import { StarIcon, HeartIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
   import { FaYoutube } from 'react-icons/fa';
   import { Review } from '@/lib/wordpress.d';

   interface ReviewTopSectionProps {
     review: Review;
     slug: string;
   }

   const ReviewTopSection: React.FC<ReviewTopSectionProps> = ({ review, slug }) => {
     // Extract scores
     const scoreGirls = Number(review.acf.score_girls);
     const scoreChat = Number(review.acf.score_chat);
     const scoreFeatures = Number(review.acf.score_features);

     const scores = [scoreGirls, scoreChat, scoreFeatures];
     const overallScore = (
       scores.reduce((a, b) => a + b, 0) / scores.length
     ).toFixed(1);

     const featureList = [
       {
         name: "Girls",
         icon: HeartIcon,
         score: scoreGirls,
       },
       {
         name: "Chat",
         icon: ChatBubbleLeftRightIcon,
         score: scoreChat,
       },
       {
         name: "Features",
         icon: Cog6ToothIcon,
         score: scoreFeatures,
       },
     ];

     const videoUrl = review.acf.youtube_video_url;
     
     const getYouTubeVideoId = (url: string) => {
       const regex = /[?&]v=([^&#]*)/;
       const match = regex.exec(url);
       return match ? match[1] : null;
     };

     const videoId = videoUrl ? getYouTubeVideoId(videoUrl) : null;

     return (
       <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
         {/* Left Column */}
         <div className="sm:col-span-1 not-prose">
           {/* Website Button */}
           <Link
             href={`/link/${slug}`}
             target="_blank"
             rel="noopener noreferrer"
             className="relative rounded-xl block overflow-hidden border border-white/10 hover:scale-105 transition-all duration-300 group shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_-2px_rgba(168,85,247,0.5)]"
           >
             {/* Image */}
             <Image
               src={review.acf.website_screenshot.url}
               alt={`${review.acf.website_name} website screenshot`}
               width={800}
               height={600}
               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
               priority
               className="w-full sm:h-64 h-48 object-cover my-0"
               style={{
                 aspectRatio: '4/3',
                 objectFit: 'cover'
               }}
               loading="eager"
             />
             {/* Button */}
             <div className="flex items-center justify-center bg-gray-900/40 backdrop-blur-2xl border-t border-white/10 text-white w-full px-4 py-3 group-hover:bg-purple-500/80 transition-all duration-300">
               <Image
                 alt="Site Favicon"
                 src={review.acf.website_favicon.url}
                 width={32}
                 height={32}
                 className="inline-block m-0 p-0"
                 style={{
                   aspectRatio: '1',
                   objectFit: 'contain'
                 }}
               />
               <span className="mx-2 font-bold text-xl text-white underline decoration-2 underline-offset-4 decoration-white/30 group-hover:decoration-white/80">
                 Open Website
               </span>
               <ExternalLink size={24} className="text-white/90 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
             </div>
           </Link>

           {/* Feature Rectangles */}
           <div className="mt-6">
             <h2 className="text-xl not-prose font-bold text-white mb-4 text-center">Scores</h2>
             <div className="grid grid-cols-4 gap-2">
               {/* Features */}
               {featureList.map((feature, index) => (
                 <div
                   key={feature.name}
                   className="flex flex-col items-center border border-purple-500 rounded-lg p-2 bg-purple-500/20 transform hover:scale-105 transition-all duration-300 hover:bg-purple-500/30"
                   style={{ transitionDelay: `${index * 100}ms` }}
                 >
                   {/* Icon and Feature Name */}
                   <feature.icon className="w-5 h-5 text-white mb-1" />
                   <span className="text-xs text-white font-semibold">
                     {feature.name}
                   </span>
                   {/* Individual Score */}
                   <span className="mt-1 text-md font-bold text-white">
                     {feature.score}
                   </span>
                 </div>
               ))}

               {/* Overall Score */}
               <div className="flex flex-col items-center rounded-lg p-2 bg-green-500 transform hover:scale-105 transition-all duration-300 hover:bg-green-600">
                 {/* Icon and Label */}
                 <StarIcon className="w-5 h-5 text-white mb-1" />
                 <span className="text-xs text-white font-semibold">
                   Overall
                 </span>
                 {/* Display the Overall Score */}
                 <span className="mt-1 text-xl font-bold text-white">
                   {overallScore}
                 </span>
               </div>
             </div>
           </div>
         </div>

         {/* Right Column */}
         <div className="sm:col-span-1 mt-6 sm:mt-0">
           {/* Video Button */}
           {videoId && (
             <Link
               href={videoUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="relative rounded-xl block overflow-hidden mb-6 border border-white/10 hover:scale-105 transition-all duration-300 group"
             >
               {/* Video Thumbnail */}
               <div className="relative w-full sm:h-64 h-48 not-prose">
                 <Image
                   src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                   alt="YouTube Video Thumbnail"
                   fill
                   className="absolute top-0 left-0 w-full h-full object-cover"
                 />
                 {/* Play Button Overlay */}
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                     <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
                   </div>
                 </div>
               </div>
               {/* Button */}
               <div className="flex items-center justify-center bg-gray-900/40 backdrop-blur-2xl border-t border-white/10 text-white w-full px-4 py-3 group-hover:bg-red-500/80 transition-all duration-300">
                 <FaYoutube size={22} className="text-red-500 group-hover:text-white transition-colors" />
                 <span className="mx-2 font-bold text-xl text-white">
                   Watch {review.acf.website_name} Review
                 </span>
                 <ExternalLink size={24} className="text-white/90 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
               </div>
             </Link>
           )}

           {/* Positives and Negatives */}
           <div className="mt-6">
             <h2 className="text-xl not-prose font-bold text-white mb-4 text-center">Pros & Cons</h2>
             {/* Combined Pros and Cons Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
               {/* Pros */}
               {review.acf.pros && review.acf.pros.length > 0 && 
                 review.acf.pros.map((proItem, index) => (
                   <div
                     key={`pro-${index}`}
                     className="border border-green-500 bg-green-500/20 rounded-lg p-2 flex items-center"
                   >
                     <Plus className="text-green-500 mr-2 flex-shrink-0" />
                     <span className="text-gray-300 font-semibold text-sm">
                       {proItem.pros}
                     </span>
                   </div>
                 ))
               }

               {/* Cons */}
               {review.acf.cons && review.acf.cons.length > 0 && 
                 review.acf.cons.map((conItem, index) => (
                   <div
                     key={`con-${index}`}
                     className="border border-red-500 bg-red-500/20 rounded-lg p-2 flex items-center"
                   >
                     <Minus className="text-red-500 mr-2 flex-shrink-0" />
                     <span className="text-gray-300 font-semibold text-sm">
                       {conItem.cons}
                     </span>
                   </div>
                 ))
               }

               {/* Fallback if no pros or cons */}
               {(!review.acf.pros || review.acf.pros.length === 0) && (!review.acf.cons || review.acf.cons.length === 0) && (
                 <>
                   <div className="border border-green-500 bg-green-500/20 rounded-lg p-2 flex items-center">
                     <Plus className="text-green-500 mr-2 flex-shrink-0" />
                     <span className="text-gray-300 font-semibold text-sm">
                       No pros available.
                     </span>
                   </div>
                   <div className="border border-red-500 bg-red-500/20 rounded-lg p-2 flex items-center">
                     <Minus className="text-red-500 mr-2 flex-shrink-0" />
                     <span className="text-gray-300 font-semibold text-sm">
                       No cons available.
                     </span>
                   </div>
                 </>
               )}
             </div>
           </div>
         </div>
       </div>
     );
   };

   export default ReviewTopSection;