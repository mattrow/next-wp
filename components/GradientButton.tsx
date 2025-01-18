"use client";

import { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  type: 'purple' | 'white';
}

export function GradientButton({ children, type }: GradientButtonProps) {
  const handleMouseEnter = () => {
    const gradientId = type === 'purple' ? 'purple-gradient' : 'white-gradient';
    document.getElementById(gradientId)?.classList.add('opacity-100');
  };

  const handleMouseLeave = () => {
    const gradientId = type === 'purple' ? 'purple-gradient' : 'white-gradient';
    document.getElementById(gradientId)?.classList.remove('opacity-100');
  };

  return (
    <div 
      className={`group/${type} relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
} 