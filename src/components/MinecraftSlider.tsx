
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

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between mb-2">
          <label className="font-minecraft text-sm">{label}</label>
          <span className="font-minecraft text-sm">{value}</span>
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          className="w-full h-6 appearance-none bg-minecraft-stone pixel-border cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              #5D9C3B 0%, 
              #5D9C3B ${((value - min) / (max - min)) * 100}%, 
              #828282 ${((value - min) / (max - min)) * 100}%, 
              #828282 100%)`
          }}
        />
        <style>
          {`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            background: #9B6E36;
            border: 2px solid black;
            cursor: pointer;
          }
          
          input[type=range]::-moz-range-thumb {
            width: 24px;
            height: 24px;
            background: #9B6E36;
            border: 2px solid black;
            cursor: pointer;
          }
          `}
        </style>
      </div>
      <div className="flex justify-between mt-1 font-minecraft text-xs text-gray-200">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default MinecraftSlider;
