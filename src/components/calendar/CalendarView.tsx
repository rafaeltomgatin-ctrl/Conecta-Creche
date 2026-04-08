import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events = [
    { 
      id: '1', 
      title: 'Festa da Primavera', 
      date: '2026-04-10', 
      time: '14:00', 
      location: 'Pátio Central', 
      description: 'Celebração da chegada da primavera com apresentações das crianças.',
      confirmations: 15
    },
    { 
      id: '2', 
      title: 'Reunião de Pais', 
      date: '2026-04-15', 
      time: '19:00', 
      location: 'Auditório', 
      description: 'Apresentação do plano pedagógico do segundo semestre.',
      confirmations: 22
    },
  ];

  const eventDates = events.map(e => new Date(e.date));

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800">Agenda da Creche 📅</h2>
      
      <div className="bg-white rounded-[40px] card-shadow p-6 border-4 border-primary/5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-2xl"
          modifiers={{ event: eventDates }}
          modifiersStyles={{
            event: { 
              fontWeight: 'bold', 
              backgroundColor: '#FF6B6B', 
              color: 'white', 
              borderRadius: '12px' 
            }
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-800">Próximos Eventos</h3>
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="rounded-3xl border-none card-shadow overflow-hidden">
              <div className="h-1 bg-primary w-full" />
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-gray-800">{event.title}</h4>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                    {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{event.description}</p>
                <div className="flex flex-wrap gap-3 mt-1">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Clock size={12} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <MapPin size={12} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-primary font-medium">
                    <Users size={12} />
                    <span>{event.confirmations} confirmados</span>
                  </div>
                </div>
                <button className="w-full py-2 text-xs font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors mt-2">
                  Confirmar Presença
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
