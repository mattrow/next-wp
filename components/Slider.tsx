"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  children: React.ReactNode;
}

const Slider = ({ children }: SliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700/50 p-2 rounded-full z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <div
        ref={sliderRef}
        className="overflow-x-scroll flex space-x-4 scrollbar-hide px-8"
      >
        {children}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700/50 p-2 rounded-full z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default Slider; 