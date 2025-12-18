'use client';

interface InputCounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  isDark: boolean;
}

export default function InputCounter({ label, value, onChange, isDark }: InputCounterProps) {
  return (
    <div className={`rounded-3xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className={`text-sm mb-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </div>
      <div className="text-5xl font-bold text-center mb-4">
        {value}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onChange(value - 1)}
          className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg active:scale-90 transition-transform"
        >
          -
        </button>
        <button
          onClick={() => onChange(value + 1)}
          className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg active:scale-90 transition-transform"
        >
          +
        </button>
      </div>
    </div>
  );
}
