import { Review } from "@/lib/wordpress.d";
import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  StarIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import {
  rankStyles,
  defaultStyle,
  featureList,
} from "@/components/FeaturedGirlfriendsConfig";

interface FeaturedGirlfriendsProps {
  reviews: Review[];
}

const FeaturedGirlfriends = ({ reviews }: FeaturedGirlfriendsProps) => {
  // Map reviews to apps structure
  const apps = reviews.map((review, index) => {
    const scoreGirls = Number(review.acf.score_girls);
    const scoreChat = Number(review.acf.score_chat);
    const scoreFeatures = Number(review.acf.score_features);

    const overallScore = ((scoreGirls + scoreChat + scoreFeatures) / 3).toFixed(1);
    const rank = index + 1;
    const styles = rankStyles[rank as keyof typeof rankStyles] || defaultStyle;

    return {
      slug: review.slug,
      rank,
      name: review.acf.website_name || review.title.rendered,
      image: review.acf.website_screenshot?.url || "/default-image.jpg",
      description:
        review.acf.short_description ||
        review.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
        review.content?.rendered?.replace(/<[^>]+>/g, "").trim().substring(0, 200) ||
        "Read our review to learn more!",
      categories: {
        girls: scoreGirls,
        chat: scoreChat,
        features: scoreFeatures,
      },
      overall: overallScore,
      ...styles,
    };
  });

  return (
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
                rankStyles[app.rank as keyof typeof rankStyles]?.accent
              } flex items-center justify-center text-white font-bold text-3xl shadow-xl [text-shadow:_1_2px_5_rgb(0_0_0_/_40%)]`}
            >
              {app.rank}
            </div>

            {/* Left Column - App Name and Image */}
            <div className="w-full md:w-1/4 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mt-0 mb-4 pl-6 sm:pl-10 leading-none">
                {app.name}
              </h2>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 group">
                <Image
                  src={app.image}
                  alt={`${app.name} - Best AI Girlfriend Site Screenshot`}
                  className="object-cover"
                  width={500}
                  height={281}
                  priority={app.rank === 1}
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
              <p className="text-gray-300 text-sm mb-4">{app.description}</p>

              {/* Features and Score */}
              {/* For sm and larger screens, show all four rectangles */}
              <div className="hidden sm:flex space-x-4 mt-4">
                {/* Feature Rectangles */}
                {featureList.map((feature: { name: string; scoreKey: string; icon: React.ElementType }) => (
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
    </div>
  );
};

export default FeaturedGirlfriends; 