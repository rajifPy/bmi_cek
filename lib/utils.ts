import { BMIResult } from './types';

export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10;
};

export const getBMICategory = (bmi: number): BMIResult => {
  if (bmi < 18.5) return {
    bmi,
    category: 'Underweight',
    color: '#10b981',
    recommendation: 'Anda perlu menambah berat badan dengan pola makan sehat dan bergizi.'
  };
  if (bmi < 25) return {
    bmi,
    category: 'Normal',
    color: '#3b82f6',
    recommendation: 'Berat badan Anda ideal! Pertahankan gaya hidup sehat dengan olahraga teratur.'
  };
  if (bmi < 30) return {
    bmi,
    category: 'Overweight',
    color: '#f59e0b',
    recommendation: 'Anda perlu menurunkan berat badan dengan olahraga teratur dan pola makan sehat.'
  };
  return {
    bmi,
    category: 'Obesity',
    color: '#ef4444',
    recommendation: 'Konsultasikan dengan dokter untuk program penurunan berat badan yang aman.'
  };
};