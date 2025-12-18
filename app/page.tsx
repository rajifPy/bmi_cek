import React, { useState, useRef } from 'react';
import { Sun, Moon, History, User, Share2, Heart, TrendingUp, Activity, Info, X, ChevronLeft, Download } from 'lucide-react';

type Gender = 'male' | 'female';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  recommendation: string;
  tips: string[];
  idealWeight: { min: number; max: number };
  healthRisk: string;
}

interface HistoryItem {
  id: string;
  date: string;
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  bmi: number;
  category: string;
}

const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10;
};

const calculateIdealWeight = (height: number): { min: number; max: number } => {
  const heightInMeters = height / 100;
  const min = Math.round(18.5 * heightInMeters * heightInMeters);
  const max = Math.round(24.9 * heightInMeters * heightInMeters);
  return { min, max };
};

const getBMICategory = (bmi: number, height: number): BMIResult => {
  const idealWeight = calculateIdealWeight(height);
  
  if (bmi < 16) return {
    bmi, category: 'Sangat Kurus', color: '#ef4444', healthRisk: 'Risiko Tinggi',
    recommendation: 'Segera konsultasi dengan tenaga kesehatan profesional. IMT Anda menunjukkan kondisi sangat kurus.',
    idealWeight,
    tips: ['Segera cari bantuan medis', 'Bekerja sama dengan ahli gizi untuk perencanaan makan', 'Pertimbangkan makanan berkalori tinggi dan bergizi', 'Pantau kesehatan Anda secara teratur']
  };
  
  if (bmi < 18.5) return {
    bmi, category: 'Kurus', color: '#10b981', healthRisk: 'Risiko Sedang',
    recommendation: 'Anda perlu menambah berat badan dengan pola makan sehat dan bergizi.', idealWeight,
    tips: ['Makan lebih sering dengan makanan padat gizi', 'Sertakan protein dalam setiap makanan', 'Tambahkan lemak sehat seperti kacang dan alpukat', 'Pertimbangkan latihan kekuatan']
  };
  
  if (bmi < 25) return {
    bmi, category: 'Normal', color: '#3b82f6', healthRisk: 'Risiko Rendah',
    recommendation: 'Sangat baik! Berat badan Anda ideal. Pertahankan gaya hidup sehat dengan olahraga teratur.', idealWeight,
    tips: ['Lanjutkan pola makan seimbang dan olahraga', 'Tetap terhidrasi dengan 8 gelas air sehari', 'Tidur berkualitas 7-8 jam', 'Pemeriksaan kesehatan rutin dianjurkan']
  };
  
  if (bmi < 30) return {
    bmi, category: 'Kelebihan Berat Badan', color: '#f59e0b', healthRisk: 'Risiko Sedang',
    recommendation: 'Pertimbangkan untuk menurunkan berat badan dengan olahraga teratur dan pola makan sehat.', idealWeight,
    tips: ['Mulai dengan kardio 30 menit setiap hari', 'Kurangi gula dan makanan olahan', 'Makan lebih banyak sayuran dan protein tanpa lemak', 'Pantau asupan kalori harian Anda']
  };
  
  if (bmi < 35) return {
    bmi, category: 'Obesitas Kelas I', color: '#ef4444', healthRisk: 'Risiko Tinggi',
    recommendation: 'Konsultasi dengan dokter untuk program penurunan berat badan yang aman.', idealWeight,
    tips: ['Cari bimbingan medis profesional', 'Buat rencana makan yang berkelanjutan', 'Mulai dengan latihan ringan', 'Pertimbangkan untuk bergabung dengan kelompok dukungan']
  };
  
  return {
    bmi, category: 'Obesitas Kelas II', color: '#dc2626', healthRisk: 'Risiko Sangat Tinggi',
    recommendation: 'Intervensi medis direkomendasikan. Segera konsultasi dengan tenaga kesehatan profesional.', idealWeight,
    tips: ['Konsultasi medis segera diperlukan', 'Ikuti rencana perawatan yang diresepkan', 'Pemantauan rutin sangat penting', 'Pertimbangkan program yang diawasi secara medis']
  };
};

const GenderSelector = ({ selected, onChange, isDark }: { selected: Gender; onChange: (g: Gender) => void; isDark: boolean }) => (
  <div className="flex gap-3">
    {(['male', 'female'] as Gender[]).map(g => (
      <button key={g} onClick={() => onChange(g)}
        className={`flex-1 py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
          selected === g
            ? `bg-gradient-to-r ${g === 'male' ? 'from-blue-500 to-blue-600' : 'from-pink-500 to-pink-600'} text-white shadow-lg scale-105`
            : isDark ? 'bg-gray-800 text-gray-400 hover:bg-gray-750' : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}>
        <User className="w-5 h-5" />
        <span>{g === 'male' ? 'Laki-laki' : 'Perempuan'}</span>
      </button>
    ))}
  </div>
);

const HeightSlider = ({ value, onChange, isDark }: { value: number; onChange: (v: number) => void; isDark: boolean }) => {
  const [dragging, setDragging] = useState(false);
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const percent = Math.max(0, Math.min(1, 1 - (y - rect.top) / rect.height));
    onChange(Math.round(100 + percent * 120));
  };

  return (
    <div className="relative h-72 w-full touch-none select-none"
      onMouseDown={() => setDragging(true)} onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)} onMouseMove={handleDrag}
      onTouchStart={() => setDragging(true)} onTouchEnd={() => setDragging(false)} onTouchMove={handleDrag}>
      {[220, 200, 180, 160, 140, 120, 100].map(h => (
        <div key={h} className="absolute left-0 right-0 flex items-center pointer-events-none"
          style={{ top: `${((220 - h) / 120) * 100}%` }}>
          <span className={`text-xs w-10 text-right ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{h}</span>
          <div className={`flex-1 ml-2 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
        </div>
      ))}
      <div className="absolute left-12 top-0 bottom-0 w-1.5 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full">
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-150"
          style={{ height: `${((value - 100) / 120) * 100}%` }} />
      </div>
      <div className={`absolute left-10 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg ${dragging ? 'scale-125' : 'scale-110'} transition-all border-4 border-white`}
        style={{ top: `${((220 - value) / 120) * 100}%`, transform: 'translateY(-50%)' }} />
      <div className="absolute left-0 right-0 bottom-0 text-center pointer-events-none">
        <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">{value}</div>
        <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>sentimeter</div>
      </div>
    </div>
  );
};

const InputCounter = ({ label, value, onChange, isDark, unit }: { label: string; value: number; onChange: (v: number) => void; isDark: boolean; unit: string }) => (
  <div className={`rounded-3xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
    <div className={`text-sm mb-3 text-center font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</div>
    <div className="text-5xl font-bold text-center mb-1 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">{value}</div>
    <div className={`text-sm text-center mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{unit}</div>
    <div className="flex justify-center gap-3">
      {['-', '+'].map(op => (
        <button key={op} onClick={() => onChange(value + (op === '+' ? 1 : -1))}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold shadow-lg active:scale-90 transition-transform">
          {op}
        </button>
      ))}
    </div>
  </div>
);

const ResultScreen = ({ result, height, weight, age, gender, isDark, onBack, onToggleTheme }: any) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const weightDiff = weight - ((result.idealWeight.min + result.idealWeight.max) / 2);
  const progressPct = Math.min((result.bmi / 45) * 100, 100);
  const [exporting, setExporting] = useState(false);

  const exportToPDF = async () => {
    if (!resultRef.current) return;
    setExporting(true);
    
    try {
      const html2canvas = (window as any).html2canvas;
      const jsPDF = (window as any).jspdf.jsPDF;
      
      if (!html2canvas || !jsPDF) {
        alert('Memuat library PDF...');
        return;
      }
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: isDark ? '#111827' : '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Hasil-IMT-${new Date().toLocaleDateString('id-ID')}.pdf`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Fitur export PDF: Gunakan Print to PDF dari browser Anda sebagai alternatif (Ctrl+P atau Cmd+P)');
    } finally {
      setExporting(false);
    }
  };

  const handleShare = async () => {
    const text = `IMT saya adalah ${result.bmi} (${result.category})!`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert('✓ Disalin ke clipboard!');
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'} transition-colors`}>
      <div className="max-w-2xl mx-auto min-h-screen flex flex-col p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold">Hasil Perhitungan</h2>
          <div className="flex gap-2">
            <button 
              onClick={exportToPDF} 
              disabled={exporting}
              className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg ${exporting ? 'opacity-50' : ''}`}>
              <Download className={`w-5 h-5 text-green-600 ${exporting ? 'animate-bounce' : ''}`} />
            </button>
            <button onClick={handleShare} className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <Share2 className="w-5 h-5 text-blue-600" />
            </button>
            <button onClick={onToggleTheme} className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div ref={resultRef} className="flex-1 overflow-y-auto pb-4">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <svg className="w-64 h-64 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke={isDark ? '#1f2937' : '#e5e7eb'} strokeWidth="10" />
                <circle cx="50" cy="50" r="42" fill="none" stroke={result.color} strokeWidth="10"
                  strokeDasharray={`${progressPct * 2.64} 264`} strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl font-bold" style={{ color: result.color }}>{result.bmi}</div>
                <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Skor IMT</div>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: result.color }}>{result.category}</div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              result.healthRisk.includes('Rendah') ? 'bg-green-100 text-green-700' :
              result.healthRisk.includes('Sedang') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
            }`}>
              <Activity className="w-4 h-4" />{result.healthRisk}
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-xl mb-4`}>
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-lg">Penilaian</h3>
            </div>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{result.recommendation}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Tinggi', value: height, unit: 'cm' },
              { label: 'Berat', value: weight, unit: 'kg' },
              { label: 'Usia', value: age, unit: 'tahun' },
              { label: 'Jenis Kelamin', value: gender === 'male' ? 'L' : 'P', unit: '' }
            ].map(item => (
              <div key={item.label} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 text-center shadow-lg`}>
                <div className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</div>
                <div className="text-2xl font-bold capitalize">{item.value}</div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.unit}</div>
              </div>
            ))}
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-3xl p-6 shadow-lg mb-4`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-lg">Rentang Berat Badan Ideal</h3>
            </div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Minimum</div>
                <div className="text-2xl font-bold text-blue-600">{result.idealWeight.min} kg</div>
              </div>
              <div className={`text-3xl ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>-</div>
              <div className="text-right">
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Maksimum</div>
                <div className="text-2xl font-bold text-blue-600">{result.idealWeight.max} kg</div>
              </div>
            </div>
            {Math.abs(weightDiff) > 0.5 && (
              <div className={`mt-4 p-3 rounded-xl ${weightDiff > 0 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                <p className="text-sm font-medium">
                  {weightDiff > 0 
                    ? `Anda ${Math.abs(weightDiff).toFixed(1)} kg di atas rentang ideal`
                    : `Anda ${Math.abs(weightDiff).toFixed(1)} kg di bawah rentang ideal`}
                </p>
              </div>
            )}
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-lg mb-6`}>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="font-bold text-lg">Tips Kesehatan</h3>
            </div>
            <ul className="space-y-3">
              {result.tips.map((tip: string, i: number) => (
                <li key={i} className={`flex gap-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-xs">{i + 1}</span>
                  </div>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={onBack}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg active:scale-95 transition-all">
            Hitung Lagi
          </button>
        </div>
      </div>
    </div>
  );
};

const HistoryScreen = ({ history, isDark, onBack, onToggleTheme, onClear }: any) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'} transition-colors`}>
    <div className="max-w-2xl mx-auto min-h-screen flex flex-col p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">Riwayat Perhitungan</h2>
        <div className="flex gap-2">
          {history.length > 0 && (
            <button onClick={onClear} className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <X className="w-5 h-5 text-red-500" />
            </button>
          )}
          <button onClick={onToggleTheme} className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <div className={`w-24 h-24 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center mb-4 shadow-lg`}>
            <History className={`w-12 h-12 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          </div>
          <div className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Belum Ada Riwayat</div>
          <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Hitung IMT Anda untuk melihat riwayat</div>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item: HistoryItem) => {
            const cat = getBMICategory(item.bmi, item.height);
            return (
              <div key={item.id} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-lg`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.date}</div>
                    <div className="text-xl font-bold" style={{ color: cat.color }}>IMT {item.bmi}</div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: cat.color + '20', color: cat.color }}>
                    {item.category}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  {[
                    { label: 'Tinggi', value: `${item.height} cm` },
                    { label: 'Berat', value: `${item.weight} kg` },
                    { label: 'Usia', value: `${item.age} th` },
                    { label: 'JK', value: item.gender === 'male' ? 'L' : 'P' }
                  ].map(d => (
                    <div key={d.label}>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{d.label}</div>
                      <div className="font-semibold text-xs">{d.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

export default function BMICalculator() {
  const [isDark, setIsDark] = useState(false);
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(23);
  const [showResult, setShowResult] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const result = getBMICategory(calculateBMI(weight, height), height);

  const handleCalculate = () => {
    const newRecord: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      weight, height, age, gender,
      bmi: result.bmi,
      category: result.category
    };
    setHistory([newRecord, ...history].slice(0, 10));
    setShowResult(true);
  };

  if (showHistory) return <HistoryScreen history={history} isDark={isDark} onBack={() => setShowHistory(false)} 
    onToggleTheme={() => setIsDark(!isDark)} onClear={() => setHistory([])} />;

  if (showResult) return <ResultScreen result={result} height={height} weight={weight} age={age} gender={gender} 
    isDark={isDark} onBack={() => setShowResult(false)} onToggleTheme={() => setIsDark(!isDark)} />;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'} transition-colors`}>
      <div className="max-w-2xl mx-auto min-h-screen flex flex-col p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Selamat Datang 👋</div>
            <div className="text-2xl font-bold">Kalkulator IMT</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowHistory(true)} className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg relative`}>
              <History className="w-5 h-5" />
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {history.length}
                </span>
              )}
            </button>
            <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <GenderSelector selected={gender} onChange={setGender} isDark={isDark} />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className={`rounded-3xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className={`text-sm mb-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tinggi Badan</div>
            <HeightSlider value={height} onChange={setHeight} isDark={isDark} />
          </div>

          <div className="flex flex-col gap-4">
            <InputCounter label="Berat Badan" value={weight} onChange={(v) => setWeight(Math.max(30, Math.min(300, v)))} isDark={isDark} unit="kilogram" />
            <InputCounter label="Usia" value={age} onChange={(v) => setAge(Math.max(10, Math.min(120, v)))} isDark={isDark} unit="tahun" />
          </div>
        </div>

        <button onClick={handleCalculate}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all active:scale-95">
          Hitung IMT Saya
        </button>
      </div>
    </div>
  );
}
