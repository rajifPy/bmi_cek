'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { BMIResult } from '@/lib/types';

interface ResultScreenProps {
  result: BMIResult;
  height: number;
  weight: number;
  age: number;
  isDark: boolean;
  onBack: () => void;
  onToggleTheme: () => void;
}

export default function ResultScreen({
  result,
  height,
  weight,
  age,
  isDark,
  onBack,
  onToggleTheme,
}: ResultScreenProps) {
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className={`p-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg text-2xl`}
          >
            ←
          </button>
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Result Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <div className={`rounded-full w-64 h-64 flex flex-col items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl mb-8`}>
            <div className="text-6xl font-bold mb-2" style={{ color: result.color }}>
              {result.bmi}
            </div>
            <div className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              BMI
            </div>
          </div>

          <div className="text-3xl font-bold mb-4" style={{ color: result.color }}>
            {result.category}
          </div>

          <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 px-6`}>
            {result.recommendation}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 w-full mb-8">
            <div className={`rounded-2xl p-4 text-center ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Height</div>
              <div className="text-xl font-bold">{height} cm</div>
            </div>
            <div className={`rounded-2xl p-4 text-center ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Weight</div>
              <div className="text-xl font-bold">{weight} kg</div>
            </div>
            <div className={`rounded-2xl p-4 text-center ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Age</div>
              <div className="text-xl font-bold">{age} yo</div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg"
          >
            Calculate Again
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}