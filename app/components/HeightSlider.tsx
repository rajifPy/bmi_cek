'use client';

import { useState } from 'react';

interface HeightSliderProps {
  value: number;
  onChange: (value: number) => void;
  isDark: boolean;
}

export default function HeightSlider({ value, onChange, isDark }: HeightSliderProps) {
  const [dragging, setDragging] = useState(false);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const percent = Math.max(0, Math.min(1, 1 - (y - rect.top) / rect.height));
    const newHeight = Math.round(112 + percent * (190 - 112));
    onChange(newHeight);
  };

  const heights = [190, 180, 170, 160, 150, 140, 130, 120, 110];

  return (
    <div
      className="relative h-[280px] w-full touch-none"
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onMouseMove={handleDrag}
      onTouchStart={() => setDragging(true)}
      onTouchEnd={() => setDragging(false)}
      onTouchMove={handleDrag}
    >
      {/* Skala angka dan garis */}
      {heights.map((h) => (
        <div
          key={h}
          className="absolute left-0 right-0 flex items-center"
          style={{ top: `${((190 - h) / 80) * 100}%` }}
        >
          <span className={`text-xs w-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {h}
          </span>
          <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
        </div>
      ))}
      
      {/* Bar indicator */}
      <div className="absolute left-10 top-0 bottom-0 w-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="absolute bottom-0 w-full bg-blue-600 transition-all duration-150"
          style={{ height: `${((value - 112) / 78) * 100}%` }}
        />
      </div>
      
      {/* Draggable handle */}
      <div
        className={`absolute left-8 w-6 h-6 bg-blue-600 rounded-full shadow-lg ${
          dragging ? 'cursor-grabbing scale-110' : 'cursor-grab'
        } transition-transform`}
        style={{ top: `${((190 - value) / 78) * 100}%`, transform: 'translateY(-50%)' }}
      />
      
      {/* Value display */}
      <div className="absolute left-0 right-0 bottom-0 text-center">
        <div className="text-4xl font-bold text-blue-600">{value}</div>
        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>cm</div>
      </div>
    </div>
  );
}
