import { ImageResponse } from 'next/og';
import { getPost } from '@/lib/wordpress';

export const runtime = 'edge';

const variants = {
  purple: {
    background: 'linear-gradient(135deg, rgb(88, 28, 135), rgb(67, 20, 102), rgb(46, 16, 101))',
    glow: 'rgba(168, 85, 247, 0.1)',
    text: 'white',
    subtext: 'rgb(233, 213, 255)',
    innerBg: 'linear-gradient(135deg, rgb(88, 28, 135), rgb(46, 16, 101))'
  },
  grey: {
    background: 'linear-gradient(135deg, rgb(31, 41, 55), rgb(17, 24, 39), rgb(3, 7, 18))',
    glow: 'rgba(156, 163, 175, 0.1)',
    text: 'white',
    subtext: 'rgb(209, 213, 219)',
    innerBg: 'linear-gradient(135deg, rgb(31, 41, 55), rgb(17, 24, 39))'
  },
  white: {
    background: 'white',
    glow: 'rgba(168, 85, 247, 0.03)',
    text: 'rgb(17, 24, 39)',
    subtext: 'rgb(75, 85, 99)',
    innerBg: 'white'
  }
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const theme = (searchParams.get('theme') || 'purple') as keyof typeof variants;
    const v = variants[theme];

    const post = await getPost(params.slug);
    
    // Calculate average score
    const scoreGirls = Number(post.acf.score_girls);
    const scoreChat = Number(post.acf.score_chat);
    const scoreFeatures = Number(post.acf.score_features);
    const averageScore = ((scoreGirls + scoreChat + scoreFeatures) / 3).toFixed(1);

    return new ImageResponse(
      (
        <div style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          background: v.background,
          boxShadow: theme === 'white' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {/* Background Effects */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${v.glow}, transparent 80%)`,
          }} />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            position: 'relative',
          }}>
            {/* Avatar Section */}
            <div style={{ 
              position: 'relative', 
              width: '56px', 
              height: '56px',
              flexShrink: 0
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '100%',
                opacity: 0.8,
              }} />
              <div style={{
                position: 'absolute',
                inset: '2px',
                background: v.innerBg,
                borderRadius: '100%',
              }} />
              <div style={{
                position: 'absolute',
                inset: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '100%',
                background: theme === 'white' ? '#f9fafb' : 'rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <img
                  src={`${process.env.NEXT_PUBLIC_SITE_URL}/thumbsuprounded.webp`}
                  alt="BestAIGirlfriends"
                  width="50"
                  height="50"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>

            {/* Text Content */}
            <div style={{ 
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                width: '100%'
              }}>
                <div style={{
                  color: v.text,
                  fontSize: '16px',
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%'
                }}>
                  {post.acf.website_name}
                </div>
                {post.acf.website_favicon?.url && (
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '100%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: theme === 'white' ? '0 1px 2px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.2)',
                  }}>
                    <img
                      src={post.acf.website_favicon.url}
                      alt=""
                      width="20"
                      height="20"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
              </div>
              <div style={{
                color: v.subtext,
                fontSize: '12px',
                fontWeight: 500,
              }}>
                BestAIGirlfriends.com
              </div>
            </div>

            {/* Score */}
            <div style={{ 
              position: 'relative',
              flexShrink: 0
            }}>
              <div style={{
                position: 'absolute',
                inset: '-4px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '8px',
                filter: 'blur(8px)',
                opacity: 0.4,
              }} />
              <div style={{
                position: 'relative',
                background: theme === 'white' ? '#111827' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                padding: '8px 14px',
                borderRadius: '8px',
                border: theme === 'white' 
                  ? '1px solid rgba(17, 24, 39, 0.8)'
                  : '1px solid rgba(251, 191, 36, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}>
                <div style={{
                  color: theme === 'white' ? 'transparent' : 'white',
                  background: theme === 'white' 
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                    : 'none',
                  backgroundClip: theme === 'white' ? 'text' : 'none',
                  fontSize: '24px',
                  fontWeight: 800,
                  lineHeight: 1,
                  textShadow: theme === 'white' ? 'none' : '0 2px 2px rgba(0,0,0,0.3)',
                }}>
                  {averageScore}
                </div>
                <div style={{
                  color: theme === 'white' ? '#f59e0b' : 'rgba(255,255,255,0.9)',
                  fontSize: '11px',
                  fontWeight: 600,
                  alignSelf: 'flex-end',
                  marginBottom: '2px',
                }}>
                  /10
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 340,
        height: 56,
      }
    );
  } catch (error) {
    console.error('Error generating badge:', error);
    return new Response('Error generating badge', { status: 500 });
  }
} 