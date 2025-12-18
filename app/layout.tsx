import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BMI Calculator - Calculate Your Body Mass Index',
  description: 'Professional BMI Calculator to help you calculate and track your body mass index with personalized health recommendations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
