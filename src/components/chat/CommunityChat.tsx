import { useState, useEffect, useRef } from 'react';
import { Send, Image as ImageIcon, Paperclip, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../lib/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { CommunityMessage } from '../../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function CommunityChat() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, 'community_chat'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CommunityMessage[];
      setMessages(msgs);
      
      // Scroll to bottom
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });

    return unsubscribe;
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim() || !user) return;

    try {
      await addDoc(collection(db, 'community_chat'), {
        schoolId: user.schoolId || 'default-school',
        senderId: user.uid,
        senderName: user.name,
        senderRole: user.role,
        text: message,
        timestamp: new Date().toISOString()
      });
      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)]">
      <div className="flex items-center gap-4 p-5 bg-white rounded-[32px] card-shadow mb-6 border-2 border-[#45B7D1]/10">
        <div className="w-12 h-12 rounded-2xl bg-[#45B7D1]/10 flex items-center justify-center text-[#45B7D1]">
          <Users size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-800">Mural da Comunidade 🤝</h3>
          <p className="text-[10px] text-[#45B7D1] font-bold uppercase tracking-widest">Pais e Monitores unidos</p>
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="flex flex-col gap-6">
          {messages.map((msg) => {
            const isMe = msg.senderId === user?.uid;
            return (
              <motion.div
                key={`comm-msg-${msg.id}`}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  {!isMe && (
                    <span className="text-[10px] font-bold text-gray-400 mb-1 ml-4 uppercase tracking-widest">
                      {msg.senderName} • {msg.senderRole === 'parent' ? 'Pai/Mãe' : 'Equipe'}
                    </span>
                  )}
                  <div className={`p-5 rounded-[32px] text-sm font-medium ${
                    isMe 
                      ? 'bg-primary text-white rounded-br-none shadow-lg shadow-primary/20' 
                      : 'bg-white text-gray-800 rounded-bl-none card-shadow border-2 border-secondary/5'
                  }`}>
                    {msg.photoUrl && (
                      <div className="mb-3 rounded-2xl overflow-hidden border-2 border-white/20">
                        <img src={msg.photoUrl} alt="Shared" className="w-full h-auto" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-2 font-bold ${isMe ? 'text-white/70' : 'text-gray-300'}`}>
                      {format(new Date(msg.timestamp), 'HH:mm', { locale: ptBR })}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="mt-6 flex gap-3 items-center bg-white p-3 rounded-[32px] card-shadow border-2 border-primary/10">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Diga algo para todos... ✨"
          className="flex-1 bg-transparent border-none outline-none text-sm px-4 font-medium"
        />
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSendMessage}
          className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 transition-colors"
        >
          <Send size={22} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}
