'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  reviewSlug: string;
}

interface Section {
  id: string;
  title: string;
}

export const TableOfContents = ({ reviewSlug }: TableOfContentsProps) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Get only h2 sections on mount and ensure they have IDs
  useEffect(() => {
    const articleSections = Array.from(document.querySelectorAll('article h2'))
      .map((heading) => {
        // Create an ID from the heading text if none exists
        if (!heading.id) {
          heading.id = heading.textContent?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || '';
        }
        return {
          id: heading.id,
          title: heading.textContent || '',
        };
      })
      .filter(section => section.id); // Only include sections with valid IDs
    setSections(articleSections);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    );

    document.querySelectorAll('article h2').forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('toc-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  if (sections.length === 0) return null;

  return (
    <nav 
      aria-label="Table of contents"
      className="relative z-20 mb-8 print:hidden"
    >
      <div className="relative">
        {/* Gradient borders */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-purple-600/20 to-purple-700/20 p-[1px]">
          <div className="h-full w-full rounded-lg bg-gray-900/90 backdrop-blur-xl" />
        </div>

        {/* Content */}
        <div className="relative flex items-center px-4 py-3">
          <button
            onClick={() => scroll('left')}
            className="mr-2 flex-none text-gray-400 hover:text-purple-400 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div 
            id="toc-container"
            className="flex-1 overflow-x-auto scrollbar-hide"
          >
            <div className="flex space-x-6 whitespace-nowrap">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'text-purple-400'
                      : 'text-gray-400 hover:text-purple-400'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll('right')}
            className="ml-2 flex-none text-gray-400 hover:text-purple-400 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
