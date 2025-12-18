import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BMI Calculator - Hitung Indeks Massa Tubuh Anda',
  description: 'Aplikasi kalkulator BMI interaktif untuk menghitung indeks massa tubuh Anda dengan mudah',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
