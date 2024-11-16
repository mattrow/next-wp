import Link from 'next/link';
import { Video } from '@/lib/youtube';

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const date = new Date(video.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="border-2 border-purple-500/50 p-2 rounded-lg group flex flex-col justify-between
                bg-purple-500/10 w-72 hover:bg-purple-500/20 transition-all flex-shrink-0"
    >
      {/* Thumbnail */}
      <div className="h-32 w-full overflow-hidden rounded-md mb-2 bg-gray-700">
        <img
          className="h-full w-full object-cover"
          src={video.thumbnail}
          alt={video.title}
        />
      </div>

      {/* Title */}
      <h3 className="text-md font-semibold mb-1 text-white line-clamp-2">
        {video.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-300 mb-2 line-clamp-2">
        {video.description}
      </p>

      {/* Publish Date */}
      <p className="text-xs text-gray-500">{date}</p>
    </Link>
  );
};

export default VideoCard; 