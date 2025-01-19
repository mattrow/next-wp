'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import { getFeaturedMediaById } from "@/lib/wordpress";

interface PostCardProps {
  post: Post;
  variant?: "default" | "home";
}

const PostCard = ({ post, variant = "default" }: PostCardProps) => {
  const [media, setMedia] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const mediaData = await getFeaturedMediaById(post.featured_media);
        if (isMounted) {
          setMedia(mediaData);
        }
      } catch {
        if (isMounted) {
          setMedia(null);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [post.featured_media]);

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "relative border border-white/10 p-4 rounded-xl group flex flex-col justify-between not-prose",
        variant === "home" 
          ? "bg-gray-900/40 backdrop-blur-2xl w-72 hover:bg-gray-900/60" 
          : "bg-gray-900/40 backdrop-blur-2xl hover:bg-gray-900/60",
        "transition-all duration-300",
        "transform hover:scale-[1.02]",
        "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.2)]",
        "hover:z-10"
      )}
    >
      {/* Thumbnail */}
      <div className="h-32 w-full overflow-hidden rounded-xl mb-4 bg-gray-800/50 border border-white/5">
        {media ? (
          <img
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            src={media.source_url}
            alt={`${post.title.rendered} - AI Girlfriend Blog Post`}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-2 text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
        <span dangerouslySetInnerHTML={{ __html: post.title.rendered }}></span>
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-gray-300 mb-3 line-clamp-2 group-hover:text-gray-200 transition-colors">
        <span
          dangerouslySetInnerHTML={{
            __html:
              post.excerpt.rendered
                .replace(/<[^>]+>/g, "")
                .split(" ")
                .slice(0, 12)
                .join(" ") + "...",
          }}
        ></span>
      </p>

      {/* Publish Date */}
      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{date}</p>
    </Link>
  );
};

export default PostCard;
