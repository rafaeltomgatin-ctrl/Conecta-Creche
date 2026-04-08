import { User, ShieldCheck, Heart, Pill, LogOut, ChevronRight, Users, UserCog } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { useAuth } from '../../lib/AuthContext';

export function Profile() {
  const { user, updateRole, logout } = useAuth();
  
  const child = {
    name: 'Pedro Silva',
    birthDate: '2022-05-15',
    school: 'Creche Pequenos Passos',
    class: 'Maternal I',
    allergies: 'Lactose, Amendoim',
    photoUrl: 'https://picsum.photos/seed/child1/200/200',
    authorizedPickups: ['João Silva (Pai)', 'Maria Silva (Mãe)', 'Ana Souza (Avó)'],
    medications: [
      { name: 'Antitérmico', dosage: '5ml', schedule: 'Se febre > 37.8°', active: true }
    ]
  };

  const isStaff = user?.role === 'admin' || user?.role === 'teacher' || user?.role === 'monitor';

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex flex-col items-center gap-3 py-6">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-xl">
            <AvatarImage src={isStaff ? user?.photoUrl : child.photoUrl} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {isStaff ? user?.name.charAt(0) : child.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
            <ShieldCheck size={18} className="text-secondary" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">{isStaff ? user?.name : child.name}</h2>
          <p className="text-sm text-gray-500">
            {isStaff ? `Equipe: ${user?.role}` : `${child.school} | ${child.class}`}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Role Switcher for Testing */}
        <div className="p-5 bg-[#45B7D1]/10 rounded-[32px] border-2 border-[#45B7D1]/20">
          <div className="flex items-center gap-3 mb-4">
            <UserCog className="text-[#45B7D1]" size={20} />
            <h3 className="text-sm font-bold text-gray-800">Simulador de Visão</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => updateRole('parent')}
              className={`py-3 rounded-2xl text-xs font-bold transition-all ${user?.role === 'parent' ? 'bg-[#45B7D1] text-white shadow-lg shadow-[#45B7D1]/20' : 'bg-white text-gray-400'}`}
            >
              Visão Pais 👨‍👩‍👧
            </button>
            <button 
              onClick={() => updateRole('monitor')}
              className={`py-3 rounded-2xl text-xs font-bold transition-all ${user?.role === 'monitor' ? 'bg-[#45B7D1] text-white shadow-lg shadow-[#45B7D1]/20' : 'bg-white text-gray-400'}`}
            >
              Visão Monitores 👩‍🏫
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-3 text-center font-medium">Use para alternar entre as interfaces do app</p>
        </div>

        {!isStaff && (
          <>
            <h3 className="text-sm font-bold text-gray-800">Informações de Saúde</h3>
            <Card className="rounded-3xl border-none card-shadow">
              <CardContent className="p-5 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                    <Heart size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Alergias</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {child.allergies.split(', ').map((allergy, i) => (
                        <Badge key={`allergy-${i}-${allergy}`} variant="outline" className="rounded-lg border-destructive/30 text-destructive bg-destructive/5">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent-foreground">
                    <Pill size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Medicamentos Ativos</p>
                    {child.medications.map((med, i) => (
                      <div key={`med-${i}-${med.name}`} className="mt-1">
                        <p className="text-xs font-bold text-gray-800">{med.name} - {med.dosage}</p>
                        <p className="text-[10px] text-gray-500">{med.schedule}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <h3 className="text-sm font-bold text-gray-800">Configurações e Segurança</h3>
        <div className="flex flex-col gap-2">
          {!isStaff && <ProfileMenuItem icon={Users} label="Pessoas Autorizadas" value={`${child.authorizedPickups.length} pessoas`} />}
          <ProfileMenuItem icon={ShieldCheck} label="Privacidade e Dados" />
          <ProfileMenuItem icon={LogOut} label="Sair da Conta" colorClass="text-destructive" onClick={logout} />
        </div>
      </div>
    </div>
  );
}

function ProfileMenuItem({ icon: Icon, label, value, colorClass, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white rounded-2xl card-shadow border border-gray-50 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${colorClass || 'text-gray-500'}`}>
          <Icon size={20} />
        </div>
        <div className="text-left">
          <p className={`text-sm font-bold ${colorClass || 'text-gray-800'}`}>{label}</p>
          {value && <p className="text-[10px] text-gray-400">{value}</p>}
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-300" />
    </button>
  );
}
