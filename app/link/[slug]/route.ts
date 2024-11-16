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
    // If no affiliate URL is found, return a 404 Not Found response
    return NextResponse.redirect('/', { status: 404 });
  }

  // Perform a server-side redirect to the affiliate URL with a 301 status code
  return NextResponse.redirect(affiliateUrl, { status: 301 });
} 