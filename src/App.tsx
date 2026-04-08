/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Diary } from './components/diary/Diary';
import { Gallery } from './components/gallery/Gallery';
import { Chat } from './components/chat/Chat';
import { CommunityChat } from './components/chat/CommunityChat';
import { CalendarView } from './components/calendar/CalendarView';
import { Profile } from './components/profile/Profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './lib/AuthContext';

export default function App() {
  const { user, loading, signIn } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const isStaff = user?.role === 'admin' || user?.role === 'teacher' || user?.role === 'monitor';

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Conecta Creche';
      case 'diary': return isStaff ? 'Lançar Atividade' : 'Diário do Pedro';
      case 'gallery': return 'Galeria de Fotos';
      case 'community': return 'Comunidade';
      case 'chat': return 'Mensagens Privadas';
      case 'calendar': return 'Agenda da Creche';
      case 'profile': return 'Meu Perfil';
      default: return 'Conecta Creche';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary/5 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute top-10 left-10 text-6xl opacity-20"
        >
          ☁️
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute bottom-20 right-10 text-6xl opacity-20"
        >
          🎨
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-40 right-20 text-4xl opacity-10"
        >
          ⭐
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-[48px] p-10 card-shadow border-4 border-primary/10 relative z-10"
        >
          <div className="flex flex-col items-center gap-6 mb-10">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0] }}
              className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center text-5xl card-shadow border-4 border-primary/20"
            >
              🏫
            </motion.div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">Conecta Creche</h1>
              <p className="text-gray-500 font-medium">O dia a dia do seu pequeno, <br/>na palma da sua mão! ✨</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={() => signIn()}
              className="w-full py-8 rounded-3xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 flex gap-3 bouncy-hover"
            >
              <span className="text-2xl">🌈</span> Entrar com Google
            </Button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-300 font-bold tracking-widest">Ou</span>
              </div>
            </div>

            <div className="space-y-3">
              <Input 
                placeholder="E-mail dos pais" 
                className="rounded-2xl py-6 bg-gray-50 border-none text-sm font-medium"
              />
              <Input 
                type="password" 
                placeholder="Senha mágica" 
                className="rounded-2xl py-6 bg-gray-50 border-none text-sm font-medium"
              />
              <Button 
                variant="outline" 
                className="w-full py-6 rounded-2xl border-2 border-gray-100 text-gray-400 font-bold text-sm hover:bg-gray-50 transition-all"
              >
                Entrar com E-mail
              </Button>
            </div>
          </div>
          
          <p className="text-center text-[10px] text-gray-300 mt-8 font-bold uppercase tracking-widest">
            Feito com ❤️ para famílias felizes
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AppLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      title={getTitle()}
      userName={user.name}
      userPhoto={user.photoUrl}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'diary' && <Diary />}
          {activeTab === 'gallery' && <Gallery />}
          {activeTab === 'community' && <CommunityChat />}
          {activeTab === 'chat' && <Chat />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'profile' && <Profile />}
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  );
}

