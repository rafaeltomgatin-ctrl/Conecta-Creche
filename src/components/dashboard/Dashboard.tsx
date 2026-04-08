import { useState } from 'react';
import { Utensils, Smile, Thermometer, Moon, Bell, Droplets, Baby, BarChart3, TrendingUp } from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import { ActivityItem } from './ActivityItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

export function Dashboard() {
  const activities = [
    { time: '14:30', title: 'Soneca da tarde', description: 'Dormiu por 1h30 e acordou bem disposto.', icon: '😴' },
    { time: '12:00', title: 'Almoço', description: 'Comeu toda a refeição (arroz, feijão, frango e brócolis).', icon: '🍲' },
    { time: '10:00', title: 'Atividade Lúdica', description: 'Pintura com os dedos. Adorou as cores azul e amarelo!', icon: '🎨' },
    { time: '08:30', title: 'Chegada', description: 'Chegou animado e abraçou a professora.', icon: '👋' },
  ];

  const [period, setPeriod] = useState<'diario' | 'semanal' | 'mensal'>('semanal');

  const chartData = {
    diario: [
      { name: '08:00', agua: 1, fraldas: 0 },
      { name: '10:00', agua: 2, fraldas: 1 },
      { name: '12:00', agua: 1, fraldas: 1 },
      { name: '14:00', agua: 1, fraldas: 1 },
      { name: '16:00', agua: 1, fraldas: 1 },
    ],
    semanal: [
      { name: 'Seg', agua: 5, fraldas: 4 },
      { name: 'Ter', agua: 7, fraldas: 5 },
      { name: 'Qua', agua: 6, fraldas: 4 },
      { name: 'Qui', agua: 8, fraldas: 6 },
      { name: 'Sex', agua: 5, fraldas: 4 },
    ],
    mensal: [
      { name: 'Sem 1', agua: 30, fraldas: 25 },
      { name: 'Sem 2', agua: 35, fraldas: 28 },
      { name: 'Sem 3', agua: 32, fraldas: 24 },
      { name: 'Sem 4', agua: 38, fraldas: 30 },
    ]
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Welcome Message */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-1"
      >
        <h2 className="text-2xl font-bold text-gray-800">O dia do Pedro 🌈</h2>
        <p className="text-sm text-gray-500">Acompanhe as aventuras de hoje!</p>
      </motion.div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 gap-5">
        <SummaryCard 
          icon={Utensils} 
          label="Barriguinha" 
          value="Cheia! 😋" 
          status="ok" 
          colorClass="bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/20"
        />
        <SummaryCard 
          icon={Smile} 
          label="Sentimento" 
          value="Radiante ✨" 
          status="ok" 
          colorClass="bg-[#FFD93D]/15 text-[#B58900] border-[#FFD93D]/20"
        />
        <SummaryCard 
          icon={Baby} 
          label="Fraldas" 
          value="4 trocas 👶" 
          status="ok" 
          colorClass="bg-[#4ECDC4]/15 text-[#2A9D8F] border-[#4ECDC4]/20"
        />
        <SummaryCard 
          icon={Droplets} 
          label="Água" 
          value="6 vezes 💧" 
          status="ok" 
          colorClass="bg-[#45B7D1]/15 text-[#0077B6] border-[#45B7D1]/20"
        />
        <SummaryCard 
          icon={Moon} 
          label="Descanso" 
          value="1h30 💤" 
          status="neutral" 
          colorClass="bg-[#A78BFA]/15 text-[#6D28D9] border-[#A78BFA]/20"
        />
        <SummaryCard 
          icon={Thermometer} 
          label="Saúde" 
          value="Nota 10! 🌡️" 
          status="ok" 
          colorClass="bg-[#F472B6]/15 text-[#BE185D] border-[#F472B6]/20"
        />
      </div>

      {/* Analytics Section */}
      <Card className="rounded-[40px] border-none shadow-xl shadow-gray-200/50 overflow-hidden bg-white">
        <CardHeader className="pb-2 pt-8 px-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BarChart3 className="text-primary" size={24} />
              Análise de Rotina
            </CardTitle>
            <p className="text-xs text-gray-400">Comparativo de hidratação e trocas</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {(['diario', 'semanal', 'mensal'] as const).map((p) => (
              <button
                key={`period-tab-${p}`}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${period === p ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-8">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData[period]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: '#9ca3af' }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#f9fafb', radius: 10 }}
                />
                <Bar dataKey="agua" fill="#45B7D1" radius={[10, 10, 0, 0]} name="Água" />
                <Bar dataKey="fraldas" fill="#4ECDC4" radius={[10, 10, 0, 0]} name="Fraldas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#45B7D1]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Água</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4ECDC4]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fraldas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Alert */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-[32px] bg-primary/10 border-2 border-primary/20 flex gap-5 items-center card-shadow"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
          <Bell size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-primary">Lembrete da Creche 🎒</h3>
          <p className="text-xs text-gray-600 leading-relaxed">Trazer reposição de fraldas amanhã, por favor!</p>
        </div>
      </motion.div>

      {/* Recent Activities */}
      <Card className="rounded-[40px] border-none shadow-xl shadow-gray-200/50 overflow-hidden bg-white">
        <CardHeader className="pb-4 pt-8 px-8">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">📸</span> Linha do Tempo
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="flex flex-col">
            {activities.map((activity, index) => (
              <ActivityItem 
                key={`activity-${index}-${activity.time}`} 
                time={activity.time} 
                title={activity.title} 
                description={activity.description} 
                icon={activity.icon} 
              />
            ))}
          </div>
          <Button className="w-full py-6 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-bold text-sm shadow-lg shadow-secondary/20 mt-4">
            Ver Diário Completo 📖
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
