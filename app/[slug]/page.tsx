import Image from 'next/image';
import Link from 'next/link';
import { Section, Container } from "@/components/craft";
import candy_aiwebsite from '@/public/candy_aiwebsite.png';
import candy_ai from '@/public/candy_ai.png';
import { ArrowRight, Plus, Minus, ExternalLink } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';


// Import solid icons from Heroicons
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

// Import the necessary components
import Footer from '@/components/Footer';

// For demo purposes, we define a video URL
const demoVideoUrl = "https://www.youtube.com/watch?v=NfqoUowoWac";

export default function Page({ params }: { params: { slug: string } }) {
  // Define the feature list
  const featureList = [
    {
      name: "Girls",
      icon: HeartIcon,
      score: 9.8,
    },
    {
      name: "Chat",
      icon: ChatBubbleLeftRightIcon,
      score: 9.1,
    },
    {
      name: "Features",
      icon: Cog6ToothIcon,
      score: 9.4,
    },
  ];

  const overallScore = 9.6;

  // Video URL (replace with actual data or state as needed)
  const videoUrl = demoVideoUrl; // Set to null or undefined if no video is available

  // Extract YouTube Video ID from the URL
  const getYouTubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = regex.exec(url);
    return match ? match[1] : null;
  };

  const videoId = videoUrl ? getYouTubeVideoId(videoUrl) : null;

  return (
    <>
      <Section>
        <Container>
          {/* Wrap the top section */}
          <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8 not-prose">
            {/* Grid container for responsive layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
              {/* Left Column */}
              <div className="sm:col-span-1">
                {/* Clickable wrapper for website image and button */}
                <Link
                  href={`/link/${params.slug}`}
                  className="relative rounded-xl block overflow-hidden"
                >
                  {/* Image */}
                  <Image
                    src={candy_aiwebsite}
                    alt="Candy.ai Website"
                    className="w-full h-auto my-0"
                    placeholder="blur"
                  />
                  {/* Button */}
                  <div className="flex items-center justify-center bg-purple-500 text-white w-full px-4 py-2 shimmer">
                    <Image
                      alt="Site Favicon"
                      src={candy_ai}
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
                  {/* Features */}
                  {featureList.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex flex-col items-center border border-purple-500 rounded-lg p-2 bg-purple-500/20"
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
                  <div className="flex flex-col items-center rounded-lg p-2 bg-green-500">
                    {/* Icon and Label */}
                    <StarIcon className="w-5 h-5 text-white mb-1" />
                    <span className="text-xs text-white font-semibold">
                      Overall
                    </span>
                    {/* Overall Score */}
                    <span className="mt-1 text-xl font-bold text-white">
                      {overallScore}
                    </span>
                  </div>
                </div>

                {/* Positives and Negatives */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
                  {/* Positives */}
                  <div className="border border-green-500 bg-green-500/20 rounded-2xl p-1 flex items-center mb-2 sm:mb-0">
                    <Plus className="text-green-500 mr-2 ml-1" />
                    <p className="text-gray-300 font-semibold text-sm">
                      Great user interface and easy to use.
                    </p>
                  </div>
                  {/* Negatives */}
                  <div className="border border-red-500 bg-red-500/20 rounded-2xl p-1 flex items-center">
                    <Minus className="text-red-500 mr-2 ml-1" />
                    <p className="text-gray-300 font-semibold text-sm">
                      Limited customization options.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="sm:col-span-1 mt-6 sm:mt-0">
                {/* Conditional Rendering of Video Section */}
                {videoId && (
                  <Link
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative rounded-xl block overflow-hidden mb-6"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative w-full h-0 pb-[56.25%]">
                      <Image
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt="YouTube Video Thumbnail"
                        fill
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    {/* Button */}
                    <div className="flex items-center justify-center bg-white text-black w-full px-4 py-2">
                      {/* YouTube Play Icon */}
                      <FaYoutube size={22} color="#FF0000" />

                      <span className="mx-2 font-semibold text-xl">
                        Watch Review
                      </span>
                      <ExternalLink size={24} className="text-black" />
                    </div>
                  </Link>
                )}

                {/* Title */}
                <h1 className="not-prose text-center sm:text-left text-white text-3xl font-bold">
                  Candy.ai
                </h1>

                {/* Content */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin vel neque nec eros dictum aliquet. Donec at nisl at
                    sapien vehicula convallis. Suspendisse potenti. Sed
                    sollicitudin, ipsum eu gravida facilisis, justo nunc
                    convallis ex, at luctus purus orci nec augue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Wrap the '26+ AI Girlfriends' section */}
          <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4 sm:p-8 not-prose mt-8">
            {/* 26+ AI Girlfriends Section */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                26+ AI Girlfriends like Candy.ai
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
                {/* Number */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                {/* Image */}
                <div className="w-full h-40 relative">
                  <Image
                    src={candy_aiwebsite}
                    alt="AI Girlfriend"
                    fill
                    className="object-cover"
                    placeholder="blur"
                  />
                </div>
                {/* Name */}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                  <span className="text-white font-bold">AI Girlfriend Name</span>
                </div>
              </div>
              {/* Repeat for other cards */}
              {/* ... */}
            </div>
          </div>
        </Container>
      </Section>
      <Footer slug={params.slug} />
    </>
  );
}
