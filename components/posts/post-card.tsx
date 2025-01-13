import Link from "next/link";
import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import { getFeaturedMediaById } from "@/lib/wordpress";

interface PostCardProps {
  post: Post;
  variant?: "default" | "home";
}

const PostCard = async ({ post, variant = "default" }: PostCardProps) => {
  let media;
  try {
    media = await getFeaturedMediaById(post.featured_media);
  } catch {
    media = null;
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "relative border-2 border-purple-500/50 p-2 rounded-lg group flex flex-col justify-between not-prose",
        variant === "home" ? "bg-purple-500/10 w-72" : "bg-accent/30",
        "hover:bg-purple-500/20 transition-all",
        "transform transition-transform duration-300 hover:scale-105",
        "hover:z-10"
      )}
    >
      {/* Thumbnail */}
      <div className="h-32 w-full overflow-hidden rounded-md mb-2 bg-gray-700">
        {media ? (
          <img
            className="h-full w-full object-cover"
            src={media.source_url}
            alt={`${post.title.rendered} - AI Girlfriend Blog Post`}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-500 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-md font-semibold mb-1 text-white line-clamp-2">
        <span dangerouslySetInnerHTML={{ __html: post.title.rendered }}></span>
      </h3>

      {/* Excerpt */}
      <p className="text-xs text-gray-300 mb-2 line-clamp-2">
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
      <p className="text-xs text-gray-500">{date}</p>
    </Link>
  );
};

export default PostCard;
