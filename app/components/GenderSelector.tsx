'use client';

import { User } from 'lucide-react';
import { Gender } from '@/lib/types';

interface GenderSelectorProps {
  selected: Gender;
  onChange: (gender: Gender) => void;
  isDark: boolean;
}

export default function GenderSelector({ selected, onChange, isDark }: GenderSelectorProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onChange('male')}
        className={`flex-1 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
          selected === 'male'
            ? 'bg-blue-600 text-white shadow-lg'
            : isDark
            ? 'bg-gray-800 text-gray-400'
            : 'bg-white text-gray-600'
        }`}
      >
        <User className="w-5 h-5" />
        Male
      </button>
      <button
        onClick={() => onChange('female')}
        className={`flex-1 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
          selected === 'female'
            ? 'bg-blue-600 text-white shadow-lg'
            : isDark
            ? 'bg-gray-800 text-gray-400'
            : 'bg-white text-gray-600'
        }`}
      >
        <User className="w-5 h-5" />
        Female
      </button>
    </div>
  );
}
