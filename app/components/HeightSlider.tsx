'use client';

import { motion } from 'framer-motion';
import { CSSProperties } from 'react';

interface HeightSliderProps {
  value: number;
  onChange: (value: number) => void;
  isDark: boolean;
}

export default function HeightSlider({ value, onChange, isDark }: HeightSliderProps) {
  const heights = Array.from({ length: 9 }, (_, i) => 190 - i * 10);

  return (
    <div className="relative h-[280px] w-full">
      {/* Skala angka */}
      <div className="absolute left-8 top-0 bottom-0 flex flex-col justify-between py-2">
        {heights.map((h) => (
          <div
            key={h}
            className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
          >
            {h}
          </div>
        ))}
      </div>

      {/* Garis horizontal */}
      <div className="absolute left-16 right-0 top-0 bottom-0 flex flex-col justify-between py-2">
        {heights.map((h) => (
          <div
            key={h}
            className={`h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      {/* Slider vertikal */}
      <input
        type="range"
        min="112"
        max="190"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute left-3 top-0 h-full w-6 appearance-none bg-transparent cursor-pointer vertical-slider"
        style={{
          WebkitAppearance: 'slider-vertical',
        } as CSSProperties}
      />

      {/* Indicator bar */}
      <div className="absolute left-3 top-0 bottom-0 w-6 flex items-end pointer-events-none">
        <motion.div
          animate={{ height: `${((value - 112) / (190 - 112)) * 100}%` }}
          className="w-full bg-blue-600 rounded-full"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}
