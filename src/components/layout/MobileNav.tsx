import { Home, ClipboardList, MessageCircle, Calendar, User, Camera, PlusCircle, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../lib/AuthContext';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const { user } = useAuth();
  const isStaff = user?.role === 'admin' || user?.role === 'teacher' || user?.role === 'monitor';

  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Início', color: 'text-[#FF6B6B]', bg: 'bg-[#FF6B6B]/15' },
    { id: 'diary', icon: isStaff ? PlusCircle : ClipboardList, label: isStaff ? 'Lançar' : 'Diário', color: 'text-[#4ECDC4]', bg: 'bg-[#4ECDC4]/15' },
    { id: 'gallery', icon: Camera, label: 'Galeria', color: 'text-[#FFD93D]', bg: 'bg-[#FFD93D]/15' },
    { id: 'community', icon: Users, label: 'Comunidade', color: 'text-[#45B7D1]', bg: 'bg-[#45B7D1]/15' },
    { id: 'chat', icon: MessageCircle, label: 'Chat', color: 'text-[#A78BFA]', bg: 'bg-[#A78BFA]/15' },
    { id: 'calendar', icon: Calendar, label: 'Agenda', color: 'text-[#F472B6]', bg: 'bg-[#F472B6]/15' },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-lg border border-white/50 rounded-[32px] px-4 py-3 flex justify-between items-center z-50 mobile-nav-shadow">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center gap-1 relative group"
          >
            <motion.div 
              whileTap={{ scale: 0.8 }}
              className={`p-3 rounded-2xl transition-all duration-300 ${isActive ? `${tab.bg} ${tab.color} scale-110` : 'text-gray-300 hover:text-gray-400'}`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </motion.div>
            <span className={`text-[9px] font-bold tracking-wide transition-colors ${isActive ? tab.color : 'text-gray-300'}`}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className={`absolute -top-1 w-1.5 h-1.5 rounded-full ${tab.color.replace('text-', 'bg-')}`}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
