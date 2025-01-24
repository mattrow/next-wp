import React from 'react';
import { DollarSign, Check, X } from 'lucide-react';

interface ReviewPricingProps {
  websiteName: string;
  overview: string;
  freePlanFeatures: string[];
  premiumPlanFeatures: string[];
  premiumPriceMonthly: number;
  premiumPriceYearly: number;
}

const ReviewPricing: React.FC<ReviewPricingProps> = ({
  websiteName,
  overview,
  freePlanFeatures,
  premiumPlanFeatures,
  premiumPriceMonthly,
  premiumPriceYearly,
}) => {
  return (
    <div className="review-pricing py-12">
      <div className="flex items-center gap-3 mb-8">
        <DollarSign className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Pricing
        </h2>
      </div>

      <div className="prose dark:prose-invert max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: overview }} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-gradient-to-br from-gray-500/10 to-gray-500/5 rounded-2xl p-6 border border-gray-500/20">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">Free Version</h3>
              <p className="text-sm text-gray-500">Try before you buy</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-400">$0</div>
              <div className="text-sm text-gray-500">Forever free</div>
            </div>
          </div>

          <div className="space-y-4">
            {freePlanFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-gray-400" />
                <span dangerouslySetInnerHTML={{ __html: feature }} />
              </div>
            ))}
            {premiumPlanFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-500">
                <X className="w-5 h-5" />
                <span dangerouslySetInnerHTML={{ __html: feature }} />
              </div>
            ))}
          </div>
        </div>

        {/* Premium Plan */}
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">Premium Access</h3>
              <p className="text-sm text-gray-400">Full platform access</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">${premiumPriceMonthly}</div>
              <div className="text-sm text-gray-400">per month</div>
            </div>
          </div>

          <div className="text-sm text-gray-400 mb-6">
            Or approximately ${premiumPriceYearly}/year (significantly discounted from monthly rate)
          </div>

          <div className="space-y-4">
            {premiumPlanFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-purple-400" />
                <span dangerouslySetInnerHTML={{ __html: feature }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPricing; 