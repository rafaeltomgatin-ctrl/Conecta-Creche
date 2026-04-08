import React from 'react';
import { motion } from 'motion/react';

interface ActivityItemProps {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ time, title, description, icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-6 pb-8 last:pb-0 relative group"
    >
      {/* Timeline Line */}
      <div className="absolute left-7 top-14 bottom-0 w-1 bg-gray-100 rounded-full group-last:hidden" />
      
      {/* Time and Icon */}
      <div className="flex flex-col items-center gap-2 z-10">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-14 h-14 rounded-2xl bg-white border-4 border-primary/20 flex items-center justify-center text-2xl card-shadow transition-transform"
        >
          {icon}
        </motion.div>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{time}</span>
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <h4 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
