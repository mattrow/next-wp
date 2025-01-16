import {
  StarIcon,
  TrophyIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

export const rankStyles = {
  1: {
    accent: "from-yellow-500 to-amber-600",
    icon: StarIcon,
    gradient: "from-amber-500/20 via-transparent to-transparent",
    border: "border-amber-500/50",
  },
  2: {
    accent: "from-gray-300 to-gray-400",
    icon: TrophyIcon,
    gradient: "from-gray-500/20 via-transparent to-transparent",
    border: "border-gray-500/50",
  },
  3: {
    accent: "from-amber-600 to-yellow-700",
    icon: TrophyIcon,
    gradient: "from-amber-700/20 via-transparent to-transparent",
    border: "border-amber-700/50",
  },
  4: {
    accent: "from-purple-500 to-purple-600",
    icon: TrophyIcon,
    gradient: "from-purple-500/20 via-transparent to-transparent",
    border: "border-purple-500/50",
  },
  5: {
    accent: "from-purple-400 to-purple-500",
    icon: TrophyIcon,
    gradient: "from-purple-400/20 via-transparent to-transparent",
    border: "border-purple-400/50",
  },
} as const;

export const defaultStyle = {
  accent: "from-purple-500 to-purple-600",
  icon: StarIcon,
  gradient: "from-purple-500/20 via-transparent to-transparent",
  border: "border-purple-500/50",
};

export const featureList = [
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