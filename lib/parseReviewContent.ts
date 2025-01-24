import { Post } from './wordpress.d';

export interface ReviewContent {
  // Header content
  hero_image: string;
  introduction_text: string;
  what_is_section: string;

  // Pros and cons
  pros: Array<{
    title: string;
    description: string;
  }>;
  cons: Array<{
    title: string;
    description: string;
  }>;

  // Photo generation
  photo_generation_overview: string;
  photo_examples: Array<{
    image: {
      url: string;
      alt: string;
    };
    prompt: string;
    description: string;
  }>;

  // Character library
  character_library_overview: string;
  character_examples: Array<{
    name: string;
    title: string;
    image: {
      url: string;
      alt: string;
    };
    description: string;
  }>;

  // Pricing
  pricing_overview: string;
  free_plan_features: string[];
  premium_plan_features: string[];
  premium_price_monthly: number;
  premium_price_yearly: number;

  // Security
  security_overview: string;
  platform_security: string;
  privacy_considerations: Array<{
    title: string;
    description: string;
  }>;
  security_recommendations: string[];

  // User reviews
  user_reviews: Array<{
    name: string;
    duration: string;
    rating: number;
    review_text: string;
  }>;

  // Conclusion
  conclusion_text: string;
  score_notes: Array<{
    category: string;
    note: string;
  }>;
}

export function mapReviewFields(post: Post): ReviewContent {
  return {
    // Header content
    hero_image: post.acf.hero_image?.url || '',
    introduction_text: post.acf.introduction_text || '',
    what_is_section: post.acf.what_is_section || '',

    // Pros and cons
    pros: post.acf.pros || [],
    cons: post.acf.cons || [],

    // Photo generation
    photo_generation_overview: post.acf.photo_generation_overview || '',
    photo_examples: post.acf.photo_examples || [],

    // Character library
    character_library_overview: post.acf.character_library_overview || '',
    character_examples: post.acf.character_examples || [],

    // Pricing
    pricing_overview: post.acf.pricing_overview || '',
    free_plan_features: (post.acf.free_plan_features || []).map(item => item.feature),
    premium_plan_features: (post.acf.premium_plan_features || []).map(item => item.feature),
    premium_price_monthly: Number(post.acf.premium_price_monthly) || 0,
    premium_price_yearly: Number(post.acf.premium_price_yearly) || 0,

    // Security
    security_overview: post.acf.security_overview || '',
    platform_security: post.acf.platform_security || '',
    privacy_considerations: post.acf.privacy_considerations || [],
    security_recommendations: (post.acf.security_recommendations || []).map(item => item.recommendation),

    // User reviews
    user_reviews: post.acf.user_reviews || [],

    // Conclusion
    conclusion_text: post.acf.conclusion_text || '',
    score_notes: post.acf.score_notes || []
  };
} 