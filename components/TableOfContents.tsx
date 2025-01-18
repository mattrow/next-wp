"use client";

import { useEffect, useState } from 'react';
import { Link } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
  isActive: boolean;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

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
        level: parseInt(heading.tagName[1]),
        isActive: false
      };
    });

    setHeadings(articleHeadings);

    // Add scroll event listener for active heading tracking
    const handleScroll = () => {
      const headingElements = document.querySelectorAll('h2, h3, h4');
      const headerHeight = 80;
      
      // Find the heading that's currently in view
      for (const heading of Array.from(headingElements)) {
        const rect = heading.getBoundingClientRect();
        if (rect.top >= headerHeight && rect.top <= window.innerHeight / 2) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      <div className="flex items-center gap-1.5 mb-4">
        <Link className="w-3.5 h-3.5 text-purple-400" />
        <h2 className="text-base font-semibold text-white m-0 not-prose">Contents</h2>
      </div>
      <nav className="overflow-x-auto">
        <div className="flex flex-wrap gap-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`
                relative px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-300 group
                ${heading.id === activeId 
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' 
                  : 'bg-gray-700/20 border border-gray-600 text-gray-300 hover:bg-gray-700/30'}
              `}
            >
              {heading.text}
              {/* Hover effect */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
} 