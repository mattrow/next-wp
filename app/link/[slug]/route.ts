import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAffiliateLinkBySlug } from '@/lib/wordpress';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  // Fetch the affiliate URL from WordPress
  const affiliateUrl = await getAffiliateLinkBySlug(slug);

  if (!affiliateUrl) {
    // Return a 404 Not Found response
    return new Response('Not Found', { status: 404 });
  }

  // Ensure the affiliate URL includes the protocol
  let redirectUrl = affiliateUrl;
  if (!/^https?:\/\//i.test(affiliateUrl)) {
    redirectUrl = 'https://' + affiliateUrl;
  }

  // Redirect using the valid URL
  return NextResponse.redirect(redirectUrl, { status: 301 });
} 