
import React from 'react';
import { cn } from '@/lib/utils';

interface MinecraftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const MinecraftButton: React.FC<MinecraftButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  iconLeft,
  iconRight,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-minecraft-grass text-white hover:bg-minecraft-leaves active:bg-minecraft-grass',
    secondary: 'bg-minecraft-stone text-white hover:bg-gray-600 active:bg-minecraft-stone',
    tertiary: 'bg-minecraft-wood text-white hover:bg-amber-700 active:bg-minecraft-wood',
  };

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <button
      className={cn(
        'pixel-button font-minecraft inline-block',
        variantClasses[variant],
        sizeClasses[size],
        'transition-all duration-75 relative',
        'hover:shadow-minecraft focus:outline-none',
        'transform hover:-translate-y-1 active:translate-y-0',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
      </div>
    </button>
  );
};

export default MinecraftButton;
