  // Craft Imports
  import { Section, Container } from "@/components/craft";
  import Link from "next/link";
  import Image from "next/image";
  import {
    Crown,
    Medal,
    Link as ExternalLink,
    Trophy,
    Star,
    Award,
    Heart,
    MessageCircle,
    Settings,
    ArrowRightCircle,
  } from "lucide-react";
  
  // Import solid icons from Heroicons
  import {
    HeartIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    StarIcon,
    TrophyIcon,
    ArrowRightCircleIcon,
  } from "@heroicons/react/24/solid";
  
  // Import outline icons from Heroicons
  import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
  
  // Import the necessary functions and components
  import { getRecentPosts } from "@/lib/wordpress";
  import PostCard from "@/components/posts/post-card";
  import Slider from "@/components/Slider";
  
  // New imports
  import { getLatestVideos } from "@/lib/youtube";
  import VideoCard from "@/components/videos/video-card";
  
  const apps = [
    {
      slug: 'candy-ai',
      rank: 1,
      name: "Candy AI",
      image: "https://aigirlfriendblog.com/wp-content/uploads/2025/01/CandyAI-scaled.jpeg",
      description:
        "The most advanced AI companion with deep emotional intelligence and natural conversations.",
      categories: {
        girls: 10,
        chat: 9,
        features: 8.5,
      },
      overall: 9.2,
      accent: "from-yellow-500 to-amber-600",
      icon: StarIcon,
      gradient: "from-amber-500/20 via-transparent to-transparent",
      border: "border-amber-500/50",}
    // },
    ,{
      slug: 'kindroid-ai',
      rank: 2,
      name: "Kindroid AI",
      image: "https://aigirlfriendblog.com/wp-content/uploads/2025/01/Kindroid_-Your-Personal-AI.jpeg",
      description: "Most advanced and unrestricted chatting models to fuel your roleplay fantasies.",
      categories: {
        girls: 9,
        chat: 10,
        features: 8.5
      },
      overall: 9.2,
      accent: "from-gray-300 to-gray-400",
      icon: TrophyIcon,
      gradient: "from-gray-500/20 via-transparent to-transparent",
      border: "border-gray-500/50"
    },
    // {
    //   slug: 'romantic-ai',
    //   rank: 3,
    //   name: "Romantic AI",
    //   image: "https://example.com/romantic.jpg",
    //   description: "Focused on romantic connections with sophisticated emotional understanding.",
    //   categories: {
    //     personality: 8.8,
    //     features: 8.5,
    //     customization: 8.7
    //   },
    //   overall: 8.7,
    //   accent: "from-amber-600 to-yellow-700",
    //   icon: Medal,
    //   gradient: "from-amber-700/20 via-transparent to-transparent",
    //   border: "border-amber-700/50"
    // },
    // {
    //   slug: 'anima',
    //   rank: 4,
    //   name: "Anima",
    //   image: "https://example.com/anima.jpg",
    //   description: "AI companion focused on meaningful conversations and emotional support.",
    //   categories: {
    //     personality: 8.5,
    //     features: 8.3,
    //     customization: 8.4
    //   },
    //   overall: 8.4,
    //   accent: "from-purple-500 to-purple-600",
    //   icon: Star,
    //   gradient: "from-purple-500/20 via-transparent to-transparent",
    //   border: "border-purple-500/50"
    // },
    // {
    //   slug: 'eva-ai',
    //   rank: 5,
    //   name: "EVA AI",
    //   image: "https://example.com/eva.jpg",
    //   description: "Modern AI companion with focus on personal growth and emotional connection.",
    //   categories: {
    //     personality: 8.2,
    //     features: 8.0,
    //     customization: 8.3
    //   },
    //   overall: 8.2,
    //   accent: "from-purple-500 to-purple-600",
    //   icon: Award,
    //   gradient: "from-purple-500/20 via-transparent to-transparent",
    //   border: "border-purple-500/50"
    // }
  ];
  
  const rankColors = {
    1: "from-yellow-500 to-amber-600",
    2: "from-gray-300 to-gray-400",
    3: "from-amber-600 to-yellow-700",
    4: "from-purple-500 to-purple-600",
    5: "from-purple-400 to-purple-500"
  };
  
  const featureList = [
    {
      name: "Girls",
      icon: HeartIcon,
      scoreKey: "girls",
    },
    {
      name: "Chat",
      icon: ChatBubbleLeftRightIcon,
      scoreKey: "chat",
    },
    {
      name: "Features",
      icon: Cog6ToothIcon,
      scoreKey: "features",
    },
  ];
 
  
  const Home = async () => {
    // Fetch the recent posts
    const recentPosts = await getRecentPosts(5);
    // Fetch latest videos
    const latestVideos = await getLatestVideos(5);
  
    return (
      <>
        <Section>
          <Container>
            {/* Featured AI Girlfriends Section */}
            <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 sm:p-8 not-prose">
              <div className="relative flex items-center justify-center mb-8">
                {/* Left Laurel */}
                <svg 
                  className="left-8 w-16 h-16 text-white-400" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path d="M9.24601 6.61105C9.03276 8.25332 10.35 9.77729 10.35 9.77729C10.35 9.77729 12.013 8.6386 12.2262 6.99633C12.4395 5.35405 11.1223 3.83008 11.1223 3.83008C11.1223 3.83008 9.45927 4.96877 9.24601 6.61105Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M7.68301 12.1301C8.37906 13.6334 10.3074 14.2234 10.3074 14.2234C10.3074 14.2234 11.1071 12.3759 10.4111 10.8726C9.71504 9.36923 7.78674 8.7793 7.78674 8.7793C7.78674 8.7793 6.98696 10.6267 7.68301 12.1301Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M11.8095 18.0136C11.8095 18.0136 9.83175 18.4083 8.50364 17.4151C7.17554 16.422 7 14.4172 7 14.4172C7 14.4172 8.97775 14.0226 10.3059 15.0157C11.634 16.0089 11.8095 18.0136 11.8095 18.0136ZM11.8095 18.0136H15.0077C16.1085 18.0136 17.0009 18.906 17.0009 20.0068C17.0009 21.1076 16.1085 22 15.0077 22H13.0009" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.7813 2.96764C12.5708 4.10058 12.6174 6.11247 12.6174 6.11247C12.6174 6.11247 14.6267 6.28752 15.8372 5.15458C17.0477 4.02165 17.001 2.00975 17.001 2.00975C17.001 2.00975 14.9918 1.83471 13.7813 2.96764Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                
                <h1 className="sm:text-5xl text-2xl font-black text-center text-white bg-clip-text px-2">
                  Featured AI Girlfriends
                </h1>
                
                {/* Right Laurel */}
                <svg 
                  className="right-8 w-16 h-16 text-white-400 transform -scale-x-100" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path d="M9.24601 6.61105C9.03276 8.25332 10.35 9.77729 10.35 9.77729C10.35 9.77729 12.013 8.6386 12.2262 6.99633C12.4395 5.35405 11.1223 3.83008 11.1223 3.83008C11.1223 3.83008 9.45927 4.96877 9.24601 6.61105Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M7.68301 12.1301C8.37906 13.6334 10.3074 14.2234 10.3074 14.2234C10.3074 14.2234 11.1071 12.3759 10.4111 10.8726C9.71504 9.36923 7.78674 8.7793 7.78674 8.7793C7.78674 8.7793 6.98696 10.6267 7.68301 12.1301Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M11.8095 18.0136C11.8095 18.0136 9.83175 18.4083 8.50364 17.4151C7.17554 16.422 7 14.4172 7 14.4172C7 14.4172 8.97775 14.0226 10.3059 15.0157C11.634 16.0089 11.8095 18.0136 11.8095 18.0136ZM11.8095 18.0136H15.0077C16.1085 18.0136 17.0009 18.906 17.0009 20.0068C17.0009 21.1076 16.1085 22 15.0077 22H13.0009" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.7813 2.96764C12.5708 4.10058 12.6174 6.11247 12.6174 6.11247C12.6174 6.11247 14.6267 6.28752 15.8372 5.15458C17.0477 4.02165 17.001 2.00975 17.001 2.00975C17.001 2.00975 14.9918 1.83471 13.7813 2.96764Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              
              <div className="space-y-8 not-prose">
                {apps.map((app) => {
                  return (
                    <div
                      key={app.rank}
                      className={`
                        relative flex flex-col md:flex-row gap-6 p-4 rounded-xl 
                        bg-gradient-to-r ${app.gradient} bg-gray-900/50 border-2 ${app.border}
                        hover:bg-gray-900/70 transition-all
                        transform transition-transform duration-300 hover:scale-103
                      `}
                    >
                      {/* Rank Badge */}
                      <div
                        className={`absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${
                          rankColors[app.rank as keyof typeof rankColors]
                        } flex items-center justify-center text-white font-bold text-3xl  shadow-xl [text-shadow:_1_2px_5_rgb(0_0_0_/_40%)]`}
                      >
                        {app.rank}
                      </div>
  
                      {/* Left Column - App Name and Image */}
                      <div className="w-full md:w-1/4 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-white mt-0 mb-4 pl-6 sm:pl-10 leading-none">
                          {app.name}
                        </h2>
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 group">
                          <img
                            src={app.image}
                            alt={app.name}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/30 transition-opacity opacity-0 group-hover:opacity-100" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white text-sm">
                              Visit Site
                            </span>
                          </div>
                        </div>
                      </div>
  
                      {/* Middle Column - Description and Features */}
                      <div className="w-full md:w-1/2 flex flex-col justify-between">
                        <p className="text-gray-300 text-sm mb-4">
                          {app.description}
                        </p>
  
                        {/* Features and Score */}
                        {/* For sm and larger screens, show all four rectangles */}
                        <div className="hidden sm:flex space-x-4 mt-4">
                          {/* Feature Rectangles */}
                          {featureList.map((feature) => (
                            <div
                              key={feature.name}
                              className="flex-1 border border-purple-400 rounded-lg p-3 bg-purple-500/20"
                            >
                              <div className="flex flex-col items-center">
                                {/* Solid Icon and Feature Name */}
                                <feature.icon className="w-6 h-6 text-purple-400 mb-2" />
                                <span className="text-sm text-purple-400 font-semibold">
                                  {feature.name}
                                </span>
                                {/* Individual Score */}
                                <span className="mt-2 text-lg font-bold text-white">
                                  {
                                    app.categories[
                                      feature.scoreKey as keyof typeof app.categories
                                    ]
                                  }
                                </span>
                              </div>
                            </div>
                          ))}
  
                          {/* Overall Score Rectangle */}
                          <div className="flex-1 rounded-lg p-3 bg-gradient-to-br from-purple-500 to-purple-700">
                            <div className="flex flex-col items-center">
                              {/* Solid Star Icon and Label */}
                              <StarIcon className="w-6 h-6 text-white mb-2" />
                              <span className="text-sm text-white font-semibold">
                                Overall
                              </span>
                              {/* Overall Score */}
                              <span className="mt-2 text-lg font-bold text-white">
                                {app.overall}
                              </span>
                            </div>
                          </div>
                        </div>
  
                        {/* For mobile screens, show only the Overall Score rectangle */}
                        <div className="flex sm:hidden mt-4">
                          {/* Overall Score Rectangle */}
                          <div className="flex-1 rounded-lg p-3 bg-purple-500/20 border-2 border-purple-400 sm:bg-gradient-to-br sm:from-purple-500 sm:to-purple-700">
                            <div className="flex flex-row sm:flex-col items-center justify-between">
                              {/* Solid Star Icon and Label */}
                              <div className="flex items-center">
                                <StarIcon className="w-6 h-6 text-white sm:mb-2" />
                                <span className="sm:text-sm text-lg pl-2 sm:pl-0 text-white font-semibold">
                                  Overall
                                </span>
                              </div>
                              {/* Overall Score */}
                              <span className="sm:mt-2 mt-0 text-2xl sm:text-lg font-extrabold text-white">
                                {app.overall}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
  
                      {/* Right Column - Buttons */}
                      <div className="w-full md:w-1/4 flex flex-col justify-center items-center">
                        <div className="w-full sm:px-4 px-0 flex flex-col gap-2">
                          <Link
                            href={`/link/${app.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center font-bold justify-center gap-2 py-2 px-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-md transition-all transform hover:scale-105"
                          >
                            Visit Site
                            <ArrowRightCircleIcon className="w-6 h-6" />
                          </Link>
                          <Link
                            href={`/${app.slug}`}
                            className="flex items-center font-bold justify-center gap-2 py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-100 text-purple-500 text-md transition-all transform hover:scale-105"
                          >
                            Read Review
                            <StarIcon className="w-6 h-6" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* New Card with Patreon Link */}
                <div className="relative flex flex-col md:flex-row gap-6 p-4 rounded-xl bg-gray-900/50 border-2 border-gray-700 hover:bg-gray-900/70 transition-all transform duration-300 hover:scale-103">
                  {/* Left Column - Placeholder Image or Icon */}
                  <div className="w-full md:w-1/4 flex flex-col justify-center items-center">
                    {/* Placeholder Icon */}
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-4 4-4-4M12 16v-8" />
                      </svg>
                    </div>
                  </div>

                  {/* Middle Column - Centered Message */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold text-white mt-0 mb-4 text-center">
                      More reviews coming soon!
                    </h2>
                    <p className="text-gray-300 text-sm mb-4 text-center">
                      Vote on which website I will review next on Patreon.
                    </p>
                  </div>

                  {/* Right Column - Patreon Button */}
                  <div className="w-full md:w-1/4 flex flex-col justify-center items-center">
                    <a
                      href="https://www.patreon.com/bestaigirlfriends" // Replace with your actual Patreon link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center font-bold justify-center gap-2 py-2 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-all transform hover:scale-105"
                    >
                      <span className="text-center">Choose the next review</span>
                      <HeartIcon className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* New Latest Blog Posts Section */}
            <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 sm:p-8 mt-8 sm:mt-16">
              <div className="relative flex items-center justify-center mb-8">
                <h1 className="sm:text-5xl text-2xl font-black not-prose text-center text-white bg-clip-text px-2">
                  Latest Blog Posts
                </h1>
              </div>

              <div className="not-prose">
                {recentPosts && recentPosts.length > 0 ? (
                  <Slider>
                    {recentPosts.map((post) => (
                      <PostCard key={post.id} post={post} variant="home" />
                    ))}
                  </Slider>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    Blog posts coming soon.
                  </div>
                )}
              </div>
            </div>

            {/* Latest Videos Section */}
            <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 sm:p-8 mt-8 sm:mt-16 overflow-visible">
              <div className="relative flex items-center justify-center mb-8">
                <h1 className="sm:text-5xl text-2xl font-black not-prose text-center text-white bg-clip-text px-2">
                  Latest Videos
                </h1>
              </div>

              <div className="not-prose">
                {latestVideos && latestVideos.length > 0 ? (
                  <Slider>
                    {latestVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </Slider>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    Videos coming soon.
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      </>
    );
  };
  
  export default Home;