import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils, Moon, Smile, Bath, Camera, Plus, Save, Droplets, Baby } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../lib/AuthContext';
import { toast } from 'sonner';

export function Diary() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const isStaff = user?.role === 'admin' || user?.role === 'teacher' || user?.role === 'monitor';

  if (isStaff) {
    return <DiaryStaffView date={selectedDate} onDateChange={setSelectedDate} />;
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Diário de Bordo 📝</h2>
        <input 
          type="date" 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="text-xs font-bold bg-white border-2 border-primary/10 rounded-2xl px-4 py-2 outline-none focus:ring-4 focus:ring-primary/10 transition-all"
        />
      </div>

      <Tabs defaultValue="feeding" className="w-full">
        <TabsList className="grid grid-cols-4 gap-2 bg-transparent h-auto p-0 mb-8">
          <TabsTrigger 
            value="feeding" 
            className="rounded-2xl py-4 data-[state=active]:bg-[#FF6B6B] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#FF6B6B]/20 transition-all border-2 border-transparent data-[state=active]:border-white/20 bg-white text-gray-400 font-bold text-xs flex flex-col gap-1"
          >
            <Utensils size={18} />
          </TabsTrigger>
          <TabsTrigger 
            value="hygiene" 
            className="rounded-2xl py-4 data-[state=active]:bg-[#4ECDC4] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#4ECDC4]/20 transition-all border-2 border-transparent data-[state=active]:border-white/20 bg-white text-gray-400 font-bold text-xs flex flex-col gap-1"
          >
            <Bath size={18} />
          </TabsTrigger>
          <TabsTrigger 
            value="sleep" 
            className="rounded-2xl py-4 data-[state=active]:bg-[#A78BFA] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#A78BFA]/20 transition-all border-2 border-transparent data-[state=active]:border-white/20 bg-white text-gray-400 font-bold text-xs flex flex-col gap-1"
          >
            <Moon size={18} />
          </TabsTrigger>
          <TabsTrigger 
            value="photos" 
            className="rounded-2xl py-4 data-[state=active]:bg-[#FFD93D] data-[state=active]:text-[#4A4A4A] data-[state=active]:shadow-lg data-[state=active]:shadow-[#FFD93D]/20 transition-all border-2 border-transparent data-[state=active]:border-white/20 bg-white text-gray-400 font-bold text-xs flex flex-col gap-1"
          >
            <Camera size={18} />
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="feeding" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
              <MealCard title="Café da Manhã 🍎" time="08:30" status="Comeu tudo" description="Frutas picadas e iogurte." />
              <MealCard title="Almoço 🍲" time="12:00" status="Comeu tudo" description="Arroz, feijão, frango grelhado e brócolis." />
              <MealCard title="Lanche da Tarde 🍪" time="15:30" status="Comeu pouco" description="Suco de laranja e biscoito integral." />
            </motion.div>
          </TabsContent>

          <TabsContent value="hygiene" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
              <HygieneCard title="Troca de Fralda 👶" time="09:30" status="Xixi" />
              <HygieneCard title="Banho 🧼" time="11:00" status="Realizado" />
              <HygieneCard title="Troca de Fralda 👶" time="14:00" status="Xixi e Cocô" />
            </motion.div>
          </TabsContent>

          <TabsContent value="sleep" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
              <Card className="rounded-[40px] border-none card-shadow bg-white overflow-hidden">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-3xl bg-[#A78BFA]/10 flex items-center justify-center text-[#A78BFA]">
                    <Moon size={32} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Soneca da Tarde 💤</h3>
                    <p className="text-xs text-gray-400">Início: 13:00 | Fim: 14:30</p>
                    <p className="text-sm text-[#A78BFA] font-bold mt-1">Duração: 1h 30min</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="photos" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-5">
              <PhotoCard url="https://picsum.photos/seed/kids1/400/400" caption="Hora da pintura 🎨" />
              <PhotoCard url="https://picsum.photos/seed/kids2/400/400" caption="Brincando no parque 🌳" />
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

function DiaryStaffView({ date, onDateChange }: any) {
  const [category, setCategory] = useState('feeding');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Atividade registrada com sucesso! ✨');
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Lançar Atividade ✍️</h2>
        <input 
          type="date" 
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="text-xs font-bold bg-white border-2 border-primary/10 rounded-2xl px-4 py-2 outline-none"
        />
      </div>

      <div className="p-6 bg-white rounded-[40px] card-shadow border-2 border-primary/5">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Plus size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800">Pedro Silva</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Maternal I</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          <CategoryBtn active={category === 'feeding'} onClick={() => setCategory('feeding')} icon={Utensils} color="bg-[#FF6B6B]" />
          <CategoryBtn active={category === 'hygiene'} onClick={() => setCategory('hygiene')} icon={Baby} color="bg-[#4ECDC4]" />
          <CategoryBtn active={category === 'water'} onClick={() => setCategory('water')} icon={Droplets} color="bg-[#45B7D1]" />
          <CategoryBtn active={category === 'sleep'} onClick={() => setCategory('sleep')} icon={Moon} color="bg-[#A78BFA]" />
        </div>

        <div className="space-y-6">
          {category === 'feeding' && (
            <div className="space-y-4">
              <InputGroup label="Refeição" placeholder="Ex: Almoço" />
              <InputGroup label="O que comeu?" placeholder="Ex: Arroz, feijão e frango" />
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-xl bg-secondary/10 text-secondary text-xs font-bold border-2 border-secondary/20">Comeu tudo</button>
                <button className="py-3 rounded-xl bg-gray-50 text-gray-400 text-xs font-bold border-2 border-transparent">Comeu pouco</button>
              </div>
            </div>
          )}

          {category === 'hygiene' && (
            <div className="space-y-4">
              <InputGroup label="Tipo de Troca" placeholder="Ex: Fralda" />
              <div className="grid grid-cols-3 gap-2">
                <button className="py-3 rounded-xl bg-primary/10 text-primary text-[10px] font-bold border-2 border-primary/20">Xixi</button>
                <button className="py-3 rounded-xl bg-gray-50 text-gray-400 text-[10px] font-bold">Cocô</button>
                <button className="py-3 rounded-xl bg-gray-50 text-gray-400 text-[10px] font-bold">Ambos</button>
              </div>
            </div>
          )}

          {category === 'water' && (
            <div className="space-y-4">
              <InputGroup label="Quantidade" placeholder="Ex: 1 copo / 200ml" />
              <p className="text-[10px] text-gray-400 text-center italic">A hidratação é fundamental para o crescimento! 💧</p>
            </div>
          )}

          {category === 'sleep' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Início" type="time" />
                <InputGroup label="Fim" type="time" />
              </div>
              <textarea 
                placeholder="Observações sobre o sono..."
                className="w-full h-24 rounded-2xl bg-gray-50 border-none p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}

          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-primary text-white font-bold text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save size={18} />
                Salvar no Diário
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryBtn({ active, onClick, icon: Icon, color }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-4 rounded-2xl flex items-center justify-center transition-all ${active ? `${color} text-white shadow-lg` : 'bg-gray-50 text-gray-300'}`}
    >
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    </button>
  );
}

function InputGroup({ label, placeholder, type = "text" }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full py-4 px-5 rounded-2xl bg-gray-50 border-none text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function MealCard({ title, time, status, description }: any) {
  return (
    <Card className="rounded-3xl border-none card-shadow">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="text-[10px] text-gray-400">{time}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${status === 'Comeu tudo' ? 'bg-secondary/20 text-secondary-foreground' : 'bg-accent/20 text-accent-foreground'}`}>
            {status}
          </span>
        </div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}

function HygieneCard({ title, time, status }: any) {
  return (
    <Card className="rounded-3xl border-none card-shadow">
      <CardContent className="p-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
            {title.includes('Banho') ? <Bath size={20} /> : <Smile size={20} />}
          </div>
          <div>
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="text-[10px] text-gray-400">{time}</p>
          </div>
        </div>
        <span className="text-xs font-medium text-gray-600">{status}</span>
      </CardContent>
    </Card>
  );
}

function PhotoCard({ url, caption }: any) {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-square rounded-3xl overflow-hidden card-shadow">
        <img src={url} alt={caption} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <p className="text-[10px] font-medium text-center text-gray-500">{caption}</p>
    </div>
  );
}
