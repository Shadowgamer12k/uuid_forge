
import React from 'react';
import { cn } from '@/lib/utils';

interface MinecraftSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  className?: string;
  label?: string;
}

const MinecraftSlider: React.FC<MinecraftSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  className,
  label
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  // Calculate percentage for slider fill
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between mb-2">
          <label className="font-minecraft text-sm">{label}</label>
          <span className="font-minecraft text-sm">{value}</span>
        </div>
      )}
      <div className="relative h-10 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-4 bg-black/50 rounded-sm pixel-border overflow-hidden">
          {/* Filled part */}
          <div 
            className="h-full bg-white/20"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Marker lines on track */}
        <div className="absolute w-full h-4 flex justify-between px-[2px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[2px] h-2 bg-white/30" />
          ))}
        </div>

        {/* Actual slider input - invisible but functional */}
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          className="absolute w-full h-10 opacity-0 cursor-pointer z-10"
        />

        {/* Slider handle */}
        <div 
          className="absolute h-8 w-3 bg-white/90 border-2 border-black pointer-events-none z-[1]"
          style={{ 
            left: `calc(${percentage}% - 6px)`,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 2px 0 rgba(0,0,0,0.3)'
          }}
        />
      </div>
      
      <div className="flex justify-between mt-1 font-minecraft text-xs text-gray-300">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default MinecraftSlider;
