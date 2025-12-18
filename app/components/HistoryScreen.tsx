'use client';

import { Sun, Moon } from 'lucide-react';
import { HistoryItem } from '@/lib/types';
import { getBMICategory } from '@/lib/utils';

interface HistoryScreenProps {
  history: HistoryItem[];
  isDark: boolean;
  onBack: () => void;
  onToggleTheme: () => void;
}

export default function HistoryScreen({
  history,
  isDark,
  onBack,
  onToggleTheme,
}: HistoryScreenProps) {
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg text-xl`}
          >
            ←
          </button>
          <h2 className="text-2xl font-bold">History</h2>
          <button
            onClick={onToggleTheme}
            className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {history.length === 0 ? (
            <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No history yet. Calculate your BMI first!
            </div>
          ) : (
            history.map((item) => {
              const categoryData = getBMICategory(item.bmi);
              return (
                <div
                  key={item.id}
                  className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.date}
                    </span>
                    <span
                      className="font-bold text-lg"
                      style={{ color: categoryData.color }}
                    >
                      {item.bmi}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>Height</div>
                      <div className="font-semibold">{item.height}cm</div>
                    </div>
                    <div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>Weight</div>
                      <div className="font-semibold">{item.weight}kg</div>
                    </div>
                    <div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>Age</div>
                      <div className="font-semibold">{item.age}yo</div>
                    </div>
                    <div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status</div>
                      <div className="font-semibold text-xs">{item.category}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
