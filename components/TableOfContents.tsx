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
    <div className="bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-xl p-6 mb-6 transition-all duration-300 hover:bg-gray-900/50">
      <div className="flex items-center gap-2 mb-6">
        <Link className="w-4 h-4 text-purple-500" />
        <h2 className="text-lg font-bold text-white m-0 not-prose">Quick Navigation</h2>
      </div>
      <nav className="overflow-x-auto">
        <div className="flex flex-wrap gap-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`
                relative px-4 py-2 rounded-xl text-sm font-medium
                transition-all duration-300 group
                ${heading.id === activeId 
                  ? 'bg-purple-500/80 backdrop-blur-xl text-white border border-purple-500/50' 
                  : 'bg-gray-900/40 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-gray-900/60'}
              `}
            >
              {/* Button content */}
              <div className="relative flex items-center gap-2">
                <span className="relative z-10">{heading.text}</span>
                {/* Level indicator - more indentation for deeper levels */}
                <div 
                  className={`absolute left-0 w-[2px] h-full bg-purple-500/30
                    ${heading.level === 2 ? 'opacity-0' : 
                      heading.level === 3 ? 'opacity-30' : 'opacity-60'}`
                  }
                />
              </div>
              
              {/* Hover effect */}
              <div className={`
                absolute inset-0 rounded-xl transition-opacity duration-300
                ${heading.id === activeId
                  ? 'bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent'
                  : 'bg-gradient-to-r from-white/5 via-white/2 to-transparent opacity-0 group-hover:opacity-100'}
              `} />
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
} 