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
    recommendation: 'You need to gain weight with a healthy and nutritious diet.',
    tips: [
      'Eat more frequently with nutrient-dense foods',
      'Include protein in every meal',
      'Add healthy fats like nuts and avocados',
      'Consider strength training exercises'
    ]
  };
  if (bmi < 25) return {
    bmi,
    category: 'Normal',
    color: '#3b82f6',
    recommendation: 'Your weight is ideal! Maintain a healthy lifestyle with regular exercise.',
    tips: [
      'Continue balanced diet and exercise',
      'Stay hydrated with 8 glasses of water daily',
      'Get 7-8 hours of quality sleep',
      'Regular health check-ups recommended'
    ]
  };
  if (bmi < 30) return {
    bmi,
    category: 'Overweight',
    color: '#f59e0b',
    recommendation: 'You need to lose weight with regular exercise and a healthy diet.',
    tips: [
      'Start with 30 minutes of cardio daily',
      'Reduce sugar and processed foods',
      'Eat more vegetables and lean protein',
      'Track your daily calorie intake'
    ]
  };
  return {
    bmi,
    category: 'Obesity',
    color: '#ef4444',
    recommendation: 'Consult with a doctor for a safe weight loss program.',
    tips: [
      'Seek professional medical guidance',
      'Create a sustainable meal plan',
      'Start with low-impact exercises',
      'Consider joining a support group'
    ]
  };
};
