import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

if (!YOUTUBE_API_KEY) {
  throw new Error('Missing YOUTUBE_API_KEY in environment variables');
}

if (!CHANNEL_ID) {
  throw new Error('Missing YOUTUBE_CHANNEL_ID in environment variables');
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

let cachedVideos: Video[] | null = null;
let cacheTime = 0;

export const getLatestVideos = async (maxResults = 5): Promise<Video[]> => {
  const now = Date.now();

  if (cachedVideos !== null && now - cacheTime < 1000 * 60 * 5) {
    // Return cached data if it's been less than 5 minutes
    return cachedVideos!;
  }

  try {
    const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: YOUTUBE_API_KEY,
        channelId: CHANNEL_ID,
        part: 'snippet',
        order: 'date',
        maxResults,
        type: 'video',
      },
    });

    cachedVideos = res.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));
    cacheTime = now;
    return cachedVideos!;
  } catch (error: any) {
    console.error('Failed to fetch latest videos:', error);

    // **Add this block to log detailed error information**
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }

    return [];
  }
}; 