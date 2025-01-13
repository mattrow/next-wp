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
      // Get the header height - adjust this value based on your fixed header height
      const headerHeight = 80; // Example: 80px header height
      
      // Calculate position
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      // Smooth scroll to element
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 mb-4">
      <div className="flex items-center gap-1.5 mb-2">
        <Link className="w-3.5 h-3.5" />
        <h2 className="text-base font-semibold text-white m-0">Contents</h2>
      </div>
      <nav>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ marginLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className="text-purple-400 hover:text-purple-300 transition-colors text-xs text-left"
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 