"use client";

import { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  type: 'purple' | 'white';
}

export function GradientButton({ children, type }: GradientButtonProps) {
  const handleMouseEnter = () => {
    const gradientId = `${type}-gradient`;
    const element = document.getElementById(gradientId);
    if (element) {
      element.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const gradientId = `${type}-gradient`;
    const element = document.getElementById(gradientId);
    if (element) {
      element.style.opacity = '0';
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
} 