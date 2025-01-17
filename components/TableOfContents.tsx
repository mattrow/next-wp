"use client";

import { useEffect, useState } from 'react';
import { Link } from 'lucide-react';

export default function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    // Get all headings and ensure they have IDs
    const elements = document.querySelectorAll('h2, h3, h4');
    const articleHeadings = Array.from(elements).map(heading => {
      // Generate an ID if one doesn't exist
      if (!heading.id) {
        const id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
        heading.id = id;
      }
      return {
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1])
      };
    });

    setHeadings(articleHeadings);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-1.5 mb-4">
        <Link className="w-3.5 h-3.5" />
        <h2 className="text-base font-semibold text-white m-0 not-prose">Contents</h2>
      </div>
      <nav className="overflow-x-auto">
        <div className="flex flex-wrap gap-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${heading.level === 2 
                  ? 'bg-purple-500/20 border border-purple-500 text-purple-300 hover:bg-purple-500/30' 
                  : 'bg-gray-700/20 border border-gray-600 text-gray-300 hover:bg-gray-700/30'}
              `}
            >
              {heading.text}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
} 