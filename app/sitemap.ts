import { MetadataRoute } from "next";
import { getAllPosts, getAllReviews } from "@/lib/wordpress";
import { siteConfig } from "@/site.config";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const reviews = await getAllReviews();

  // Collect all questions from reviews
  const allQuestions = reviews.reduce<{ question: string; slug: string }[]>((acc, review) => {
    const faqs = review.acf.faqs;
    if (!faqs) return acc;

    const questions = Array.isArray(faqs) ? faqs : faqs.faqs || [];
    
    const reviewQuestions = questions.map(faq => ({
      question: faq.question,
      slug: faq.question.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
    }));

    return [...acc, ...reviewQuestions];
  }, []);

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.site_domain}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as ChangeFreq,
      priority: 1,
    },
    {
      url: `${siteConfig.site_domain}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${siteConfig.site_domain}/reviews`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/questions`,
      lastModified: new Date(),
      changeFrequency: "weekly" as ChangeFreq,
      priority: 0.7,
    },
    {
      url: `${siteConfig.site_domain}/authors`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/categories`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/tags`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.5,
    },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.site_domain}/blog/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: "weekly" as ChangeFreq,
    priority: 0.5,
  }));

  const reviewUrls: MetadataRoute.Sitemap = reviews.map((review) => [
    {
      url: `${siteConfig.site_domain}/${review.slug}`,
      lastModified: new Date(review.modified),
      changeFrequency: "weekly" as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${siteConfig.site_domain}/${review.slug}/alternatives`,
      lastModified: new Date(review.modified),
      changeFrequency: "weekly" as ChangeFreq,
      priority: 0.7,
    }
  ]).flat();

  const questionUrls: MetadataRoute.Sitemap = allQuestions.map((question) => ({
    url: `${siteConfig.site_domain}/questions/${question.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.6,
  }));

  return [...staticUrls, ...postUrls, ...reviewUrls, ...questionUrls];
}
