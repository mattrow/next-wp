import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Section, Container } from './craft';

interface BreadcrumbsProps {
  params: {
    slug: string;
  };
}

export default function Breadcrumbs({ params }: BreadcrumbsProps) {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Reviews', href: '/reviews' },
    { label: params.slug.charAt(0).toUpperCase() + params.slug.slice(1), href: `/${params.slug}` },
  ];

  return (
    <Section className="mt-4">
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center flex-wrap gap-2 text-sm">
            {items.map((item, index) => (
              <li key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className={`hover:text-white transition-colors ${
                    index === items.length - 1 ? 'font-medium text-white' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-600" />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </Section>
  );
}
