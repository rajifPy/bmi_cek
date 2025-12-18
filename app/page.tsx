'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Gender } from '@/lib/types';
import { calculateBMI, getBMICategory } from '@/lib/utils';
import GenderSelector from './components/GenderSelector';
import HeightSlider from './components/HeightSlider';
import InputCounter from './components/InputCounter';
import ResultScreen from './components/ResultScreen';

export default function BMICalculator() {
  const [isDark, setIsDark] = useState(false);
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(23);
  const [showResult, setShowResult] = useState(false);

  const result = getBMICategory(calculateBMI(weight, height));

  const handleCalculate = () => {
    setShowResult(true);
  };

  const handleBack = () => {
    setShowResult(false);
  };

  if (showResult) {
    return (
      <ResultScreen
        result={result}
        height={height}
        weight={weight}
        age={age}
        isDark={isDark}
        onBack={handleBack}
        onToggleTheme={() => setIsDark(!isDark)}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Welcome 👋</div>
            <div className="text-2xl font-bold">BMI Calculator</div>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Gender Selection */}
        <div className="mb-6">
          <GenderSelector selected={gender} onChange={setGender} isDark={isDark} />
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-2 gap-4 mb-6">
          {/* Height */}
          <div className={`rounded-3xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Height
            </div>
            <HeightSlider value={height} onChange={setHeight} isDark={isDark} />
          </div>

          {/* Weight & Age */}
          <div className="flex flex-col gap-4">
            <InputCounter
              label="Weight"
              value={weight}
              onChange={(v) => setWeight(Math.max(30, Math.min(200, v)))}
              isDark={isDark}
            />
            <InputCounter
              label="Age"
              value={age}
              onChange={(v) => setAge(Math.max(15, Math.min(100, v)))}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Calculate Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCalculate}
          className="w-full py-4 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg"
        >
          Let's Go
        </motion.button>
      </div>
    </div>
  );
}