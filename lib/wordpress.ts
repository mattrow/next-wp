// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from 'query-string'
import { notFound } from 'next/navigation';

import {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
  Review,
} from "./wordpress.d";

// WordPress Config
const baseUrl = process.env.WORDPRESS_API_URL || 'https://aigirlfriendblog.com/wp-json';

async function fetchWithErrorHandling(url: string) {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Origin': 'https://www.bestaigirlfriends.com'
      }
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} on ${url}`);
      if (response.status === 403) {
        console.error('Access forbidden - CORS or authentication issue');
      }
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return null;
  }
}

function getUrl(path: string, query?: Record<string, any>) {
  if (path.startsWith('/wp-json')) {
    path = path.substring(8); // Remove /wp-json prefix as it's in baseUrl
  }
  const params = query ? querystring.stringify(query) : null;
  return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

// WordPress Functions

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
}): Promise<Post[]> {  
  const url = getUrl("/wp/v2/posts", { author: filterParams?.author, tags: filterParams?.tag, categories: filterParams?.category });
  const posts = await fetchWithErrorHandling(url);
  return posts || [];
}

export async function getPostById(id: number): Promise<Post> {
  const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
  const response = await fetch(url);
  const post: Post = await response.json();
  return post;
}

export async function getPostBySlug(
  slug: string,
  postType: string = 'posts'
): Promise<Post | null> {
  const url = getUrl(`/wp-json/wp/v2/${postType}`, { slug });
  const response = await fetch(url);

  if (!response.ok) {
    console.error('Failed to fetch post:', await response.text());
    return null;
  }

  const posts: Post[] = await response.json();
  return posts.length > 0 ? posts[0] : null;
}

export async function getAllCategories(): Promise<Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories");
  const response = await fetch(url);
  const categories: Category[] = await response.json();
  return categories;
}

export async function getCategoryById(id: number): Promise<Category> {
  const url = getUrl(`/wp-json/wp/v2/categories/${id}`);
  const response = await fetch(url);
  const category: Category = await response.json();
  return category;
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const url = getUrl("/wp-json/wp/v2/categories", { slug });
  const response = await fetch(url);
  const category: Category[] = await response.json();
  return category[0];
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { categories:  categoryId });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByTag(tagId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { tags:  tagId });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", { post:  postId });
  const response = await fetch(url);
  const tags: Tag[] = await response.json();
  return tags;
}

export async function getAllTags(): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags");
  const response = await fetch(url);
  const tags: Tag[] = await response.json();
  return tags;
}

export async function getTagById(id: number): Promise<Tag> {
  const url = getUrl(`/wp-json/wp/v2/tags/${id}`);
  const response = await fetch(url);
  const tag: Tag = await response.json();
  return tag;
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  const url = getUrl("/wp-json/wp/v2/tags", { slug });
  const response = await fetch(url);
  const tag: Tag[] = await response.json();
  return tag[0];
}

export async function getAllPages(): Promise<Page[]> {
  const url = getUrl("/wp-json/wp/v2/pages");
  const response = await fetch(url);
  const pages: Page[] = await response.json();
  return pages;
}

export async function getPageById(id: number): Promise<Page> {
  const url = getUrl(`/wp-json/wp/v2/pages/${id}`);
  const response = await fetch(url);
  const page: Page = await response.json();
  return page;
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/pages", { slug });
  const response = await fetch(url);
  const page: Page[] = await response.json();
  return page[0];
}

export async function getAllAuthors(): Promise<Author[]> {
  const url = getUrl("/wp-json/wp/v2/users");
  const response = await fetch(url);
  const authors: Author[] = await response.json();
  return authors;
}

export async function getAuthorById(id: number): Promise<Author> {
  const url = getUrl(`/wp-json/wp/v2/users/${id}`);
  const response = await fetch(url);
  const author: Author = await response.json();
  return author;
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  const url = getUrl("/wp-json/wp/v2/users", { slug });
  const response = await fetch(url);
  const author: Author[] = await response.json();
  return author[0];
}

export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { author: authorId });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByAuthorSlug(
  authorSlug: string
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { author: author.id });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByCategorySlug(
  categorySlug: string
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  const url = getUrl("/wp-json/wp/v2/posts", { categories: category.id });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tag.id });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  const url = getUrl(`/wp-json/wp/v2/media/${id}`);
  const response = await fetch(url);
  const featuredMedia: FeaturedMedia = await response.json();
  return featuredMedia;
}

export async function getRecentPosts(perPage: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { per_page: perPage });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getAffiliateLinkBySlug(slug: string): Promise<string | null> {
  const url = getUrl('/wp-json/wp/v2/review', { slug });
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch post:', errorText);
    return null;
  }

  const posts = await response.json();

  if (posts && posts.length > 0) {
    const post = posts[0];
    return post.acf.website_url || null;
  } else {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound(); // This will trigger a 404 page
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered,
  };
}

export async function getAllReviews(): Promise<Review[]> {  
  const url = getUrl("/wp-json/wp/v2/review", { per_page: 100, _embed: true });
  const response = await fetch(url);
  
  if (!response.ok) {
    console.error('Failed to fetch reviews:', await response.text());
    return [];
  }

  const reviews: Review[] = await response.json();
  return reviews;
}

export async function getReviews(): Promise<Review[]> {  
  const url = getUrl("/wp-json/wp/v2/review", { per_page: 100, _embed: true });
  const response = await fetch(url);
  
  if (!response.ok) {
    console.error('Failed to fetch reviews:', await response.text());
    return [];
  }

  const reviews: Review[] = await response.json();
  return reviews;
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  const url = getUrl("/wp-json/wp/v2/review", {
    slug,
    _embed: true,
  });

  const response = await fetch(url);

  if (!response.ok) {
    console.error("Failed to fetch review:", await response.text());
    return null;
  }

  const reviews = await response.json();
  return reviews.length > 0 ? reviews[0] : null;
}

export async function getPost(slug: string): Promise<Post> {
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp/v2/review?slug=${slug}&_embed`
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Failed to fetch post:', errorText);
    throw new Error('Failed to fetch post');
  }

  const posts = await res.json();

  if (!posts.length) {
    throw new Error('Post not found');
  }

  return posts[0];
}
