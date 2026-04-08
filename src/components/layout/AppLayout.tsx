import { ReactNode } from 'react';
import { MobileNav } from './MobileNav';
import { Header } from './Header';
import { Toaster } from '@/components/ui/sonner';

interface AppLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  title: string;
  userName?: string;
  userPhoto?: string;
}

export function AppLayout({
  children,
  activeTab,
  onTabChange,
  title,
  userName,
  userPhoto,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title={title} userName={userName} userPhoto={userPhoto} />
      <main className="px-6 py-4">
        {children}
      </main>
      <MobileNav activeTab={activeTab} onTabChange={onTabChange} />
      <Toaster position="top-center" />
    </div>
  );
}
