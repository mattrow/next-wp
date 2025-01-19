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
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-2 rounded-full z-10 hover:bg-gray-900/60 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <div
        ref={sliderRef}
        className="flex space-x-4 px-2 sm:px-8 overflow-x-scroll overflow-y-visible scrollbar-hide"
      >
        {children}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-2 rounded-full z-10 hover:bg-gray-900/60 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default Slider; 