import { Bell, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';

interface HeaderProps {
  title: string;
  userPhoto?: string;
  userName?: string;
}

export function Header({ title, userPhoto, userName }: HeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-40 px-6 py-5 flex justify-between items-center border-b border-white/50">
      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: -5 }}
          className="relative"
        >
          <Avatar className="h-12 w-12 border-4 border-primary/20 card-shadow">
            <AvatarImage src={userPhoto} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
              {userName?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-white flex items-center justify-center text-[10px]">
            ⭐
          </div>
        </motion.div>
        <div>
          <motion.h1 
            key={title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-gray-800 tracking-tight"
          >
            {title}
          </motion.h1>
          <p className="text-xs text-gray-400 font-medium">✨ Olá, {userName || 'Amiguinho'}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-2xl bg-accent/20 text-accent-foreground border-2 border-accent/20 relative bouncy-hover"
        >
          <Bell size={22} strokeWidth={2.5} />
          <span className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full border-2 border-white animate-pulse"></span>
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-2xl bg-secondary/20 text-secondary-foreground border-2 border-secondary/20 bouncy-hover"
        >
          <Settings size={22} strokeWidth={2.5} />
        </motion.button>
      </div>
    </header>
  );
}
