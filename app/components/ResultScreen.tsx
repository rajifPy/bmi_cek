'use client';

import { Sun, Moon, Share2, Heart } from 'lucide-react';
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
  const handleShare = async () => {
    const text = `My BMI is ${result.bmi} (${result.category}). Check yours at BMI Calculator!`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  // Calculate progress percentage (BMI scale up to 40)
  const progressPercentage = Math.min((result.bmi / 40) * 100, 100);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg text-xl active:scale-95 transition-transform`}
          >
            ←
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg active:scale-95 transition-transform`}
            >
              <Share2 className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={onToggleTheme}
              className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg active:scale-95 transition-transform`}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Result Card */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Circular BMI Display */}
          <div className={`rounded-full w-56 h-56 flex flex-col items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl mb-6 relative`}>
            {/* Circular progress using SVG */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isDark ? '#1f2937' : '#e5e7eb'}
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={result.color}
                strokeWidth="8"
                strokeDasharray={`${progressPercentage * 2.827} 282.7`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            
            {/* BMI Value */}
            <div className="relative z-10">
              <div className="text-6xl font-bold mb-2" style={{ color: result.color }}>
                {result.bmi}
              </div>
              <div className={`text-xl text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                BMI
              </div>
            </div>
          </div>

          <div className="text-3xl font-bold mb-4" style={{ color: result.color }}>
            {result.category}
          </div>

          <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 px-6`}>
            {result.recommendation}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 w-full mb-6">
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

          {/* Health Tips */}
          <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-lg mb-6`}>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="font-bold text-lg">Health Tips</h3>
            </div>
            <ul className="space-y-2">
              {result.tips.map((tip, idx) => (
                <li 
                  key={idx} 
                  className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onBack}
            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-colors active:scale-95"
          >
            Calculate Again
          </button>
        </div>
      </div>
    </div>
  );
}
