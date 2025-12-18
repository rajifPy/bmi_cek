export interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  recommendation: string;
  tips: string[];
}

export type Gender = 'male' | 'female';

export interface HistoryItem {
  id: string;
  date: string;
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  bmi: number;
  category: string;
}
