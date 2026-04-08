import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface SummaryCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  status?: 'ok' | 'attention' | 'neutral';
  colorClass?: string;
}

export function SummaryCard({ icon: Icon, label, value, status = 'neutral', colorClass }: SummaryCardProps) {
  const statusColors = {
    ok: 'bg-[#C1E1C1] text-[#2D5A27] border-[#A8D1A8]',
    attention: 'bg-[#FFB3B3] text-[#8B0000] border-[#FF9999]',
    neutral: 'bg-[#A7C7E7] text-[#1E3A5F] border-[#8FB8E3]',
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      className={`p-5 rounded-[32px] border-2 flex flex-col gap-3 card-shadow cursor-pointer ${colorClass || statusColors[status]}`}
    >
      <div className="flex justify-between items-start">
        <div className="p-3 rounded-2xl bg-white/40 backdrop-blur-sm">
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {status !== 'neutral' && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-3 h-3 rounded-full border-2 border-white ${status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`} 
          />
        )}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-60 mb-0.5">{label}</p>
        <p className="text-base font-bold tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}
