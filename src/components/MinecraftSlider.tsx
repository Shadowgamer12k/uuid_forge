
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
          <label className="font-minecraft text-sm text-white/90">{label}</label>
          <span className="font-minecraft text-sm text-white/90">{value}</span>
        </div>
      )}
      <div className="relative h-10 flex items-center">
        {/* Track background - Bedrock style */}
        <div className="bedrock-slider-track rounded-none w-full">
          {/* Filled part */}
          <div 
            className="bedrock-slider-fill"
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

        {/* Slider handle - Bedrock style */}
        <div 
          className="bedrock-slider-handle"
          style={{ left: `calc(${percentage}% - 6px)` }}
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
