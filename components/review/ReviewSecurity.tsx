import React from 'react';
import { Shield } from 'lucide-react';

interface PrivacyConsideration {
  title: string;
  description: string;
}

interface ReviewSecurityProps {
  websiteName: string;
  overview: string;
  platformSecurity: string;
  privacyConsiderations: PrivacyConsideration[];
  securityRecommendations: string[];
}

const ReviewSecurity: React.FC<ReviewSecurityProps> = ({
  websiteName,
  overview,
  platformSecurity,
  privacyConsiderations,
  securityRecommendations,
}) => {
  return (
    <div className="review-security py-12">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Security & Privacy
        </h2>
      </div>

      <div className="prose dark:prose-invert max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: overview }} />
      </div>

      {/* Platform Security */}
      <div className="space-y-12">
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-purple-400 mb-6">Platform Security</h3>
          <div className="prose dark:prose-invert max-w-none space-y-4">
            <div dangerouslySetInnerHTML={{ __html: platformSecurity }} />
          </div>
        </div>

        {/* Privacy Considerations */}
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-purple-400 mb-6">Privacy Considerations</h3>
          <div className="prose dark:prose-invert max-w-none space-y-4">
            <p>
              During my testing, I noticed several important privacy aspects that users should be aware of:
            </p>
            <ul className="space-y-4">
              {privacyConsiderations.map((consideration, index) => (
                <li key={index}>
                  <strong>{consideration.title}:</strong>{' '}
                  <span dangerouslySetInnerHTML={{ __html: consideration.description }} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-purple-400 mb-6">My Recommendations</h3>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Based on my experience with the platform, here are my key recommendations for staying secure:
            </p>
            <ul className="space-y-4">
              {securityRecommendations.map((recommendation, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: recommendation }} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSecurity; 