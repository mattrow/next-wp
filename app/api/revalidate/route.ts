// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const slug = request.nextUrl.searchParams.get('slug');

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (!slug) {
    return NextResponse.json({ message: 'Slug query parameter is required' }, { status: 400 });
  }

  try {
    // Revalidate the specific page
    await revalidatePath(`/{slug}`); // Revalidate the dynamic route
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}