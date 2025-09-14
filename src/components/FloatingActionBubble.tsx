import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface FloatingActionBubbleProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  position: { x: number; y: number };
  color?: 'primary' | 'secondary' | 'accent' | 'harvest';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const FloatingActionBubble = ({
  icon: Icon,
  label,
  onClick,
  position,
  color = 'primary',
  size = 'md',
  animate = true
}: FloatingActionBubbleProps) => {
  const colorClasses = {
    primary: 'bg-growth text-primary-foreground shadow-glow',
    secondary: 'bg-earth text-secondary-foreground shadow-soft',
    accent: 'bg-harvest text-accent-foreground shadow-harvest',
    harvest: 'bg-accent text-accent-foreground shadow-float'
  };

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-20 h-20 text-lg'
  };

  return (
    <div
      className="fixed z-40 transition-all duration-500 ease-out"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Button
        onClick={onClick}
        className={`
          float-bubble relative
          ${colorClasses[color]}
          ${sizeClasses[size]}
          ${animate ? 'animate-float' : ''}
          touch-friendly group
          hover:scale-110 hover:shadow-glow
          transition-all duration-300 ease-out
        `}
        aria-label={label}
      >
        <Icon className="icon-nature group-hover:scale-110 transition-transform duration-200" />
        
        {/* Tooltip */}
        <div className="
          absolute -top-8 left-1/2 transform -translate-x-1/2
          bg-foreground text-background text-xs font-medium
          px-2 py-1 rounded-lg whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
        ">
          {label}
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-primary-glow/20 animate-pulse-gentle opacity-50" />
      </Button>
    </div>
  );
};

export default FloatingActionBubble;