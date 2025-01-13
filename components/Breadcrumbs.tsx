import Link from 'next/link';

export default function Breadcrumbs({ params }: { params: { slug: string } }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm text-gray-400">
        <li>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
        </li>
        <li>/</li>
        <li>
          <Link href="/reviews" className="hover:text-white">
            Reviews
          </Link>
        </li>
        <li>/</li>
        <li className="text-white">
          {params.slug.replace(/-/g, ' ')}
        </li>
      </ol>
    </nav>
  );
}
