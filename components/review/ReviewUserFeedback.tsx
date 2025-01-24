import React from 'react';
import { MessageCircle, Star } from 'lucide-react';

interface UserReview {
  name: string;
  duration: string;
  rating: number;
  review_text: string;
}

interface ReviewUserFeedbackProps {
  websiteName: string;
  userReviews: UserReview[];
}

const ReviewUserFeedback: React.FC<ReviewUserFeedbackProps> = ({
  websiteName,
  userReviews,
}) => {
  return (
    <div className="review-user-feedback py-12">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          User Reviews
        </h2>
      </div>

      <div className="prose dark:prose-invert max-w-none mb-12">
        <p className="text-lg">
          I&apos;ve gathered some recent user reviews from various sources to give you a real sense of what 
          people are experiencing with {websiteName}. Here are some of the most insightful ones:
        </p>
      </div>

      <div className="space-y-8">
        {userReviews.map((review, index) => (
          <div key={index} className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-purple-400">{review.name}</h3>
                <p className="text-sm text-gray-400">{review.duration}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 text-purple-400 ${i < review.rating ? 'fill-purple-400' : ''}`} 
                  />
                ))}
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <div className={'pl-4 pr-4 relative before:content-["\\""] before:absolute before:left-0 before:top-0 after:content-["\\""] after:absolute after:right-0 after:top-0'}>
                <div dangerouslySetInnerHTML={{ __html: review.review_text }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewUserFeedback; 