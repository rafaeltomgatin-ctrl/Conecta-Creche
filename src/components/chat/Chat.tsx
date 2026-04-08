import { useState } from 'react';
import { Send, Image as ImageIcon, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'motion/react';

export function Chat() {
  const [message, setMessage] = useState('');
  
  const messages = [
    { id: '1', sender: 'teacher', text: 'Olá! O Pedro está se divertindo muito hoje com a atividade de pintura. 🎨', time: '10:15', isMe: false },
    { id: '2', sender: 'parent', text: 'Que bom! Ele adora pintar. Ele comeu bem o lanche? 🍎', time: '10:20', isMe: true },
    { id: '3', sender: 'teacher', text: 'Sim, comeu toda a maçã e o iogurte. 😋', time: '10:25', isMe: false },
    { id: '4', sender: 'teacher', text: 'Vou enviar uma foto dele daqui a pouco. ✨', time: '10:26', isMe: false },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-220px)]">
      <div className="flex items-center gap-4 p-5 bg-white rounded-[32px] card-shadow mb-6 border-2 border-secondary/10">
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-secondary/20">
            <AvatarImage src="https://picsum.photos/seed/teacher1/100/100" />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-800">Profª. Fernanda 👩‍🏫</h3>
          <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online agora</p>
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="flex flex-col gap-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.9, x: msg.isMe ? 20 : -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-5 rounded-[32px] text-sm font-medium ${
                msg.isMe 
                  ? 'bg-primary text-white rounded-br-none shadow-lg shadow-primary/20' 
                  : 'bg-white text-gray-800 rounded-bl-none card-shadow border-2 border-secondary/5'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-2 font-bold ${msg.isMe ? 'text-white/70' : 'text-gray-300'}`}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-6 flex gap-3 items-center bg-white p-3 rounded-[32px] card-shadow border-2 border-primary/10">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 text-gray-400 hover:text-primary transition-colors"
        >
          <ImageIcon size={22} strokeWidth={2.5} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 text-gray-400 hover:text-primary transition-colors"
        >
          <Paperclip size={22} strokeWidth={2.5} />
        </motion.button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escreva um recadinho... ✨"
          className="flex-1 bg-transparent border-none outline-none text-sm px-2 font-medium"
        />
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 transition-colors"
        >
          <Send size={22} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}
