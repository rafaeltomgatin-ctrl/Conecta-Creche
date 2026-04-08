import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, MessageCircle, Send, Heart, Share2, Download, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../lib/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { GalleryPhoto, PhotoComment } from '../../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

export function Gallery() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [isUploading, setIsUploading] = useState(false);

  const isStaff = user?.role === 'admin' || user?.role === 'teacher' || user?.role === 'monitor';

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const photoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryPhoto[];
      setPhotos(photoData);
    });

    return unsubscribe;
  }, []);

  const handleShare = async (photo: GalleryPhoto) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Conecta Creche',
          text: photo.caption,
          url: photo.url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(photo.url);
      toast.success('Link da foto copiado! 🔗');
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Iniciando download... 📥');
  };

  const handleSendToCommunity = async (photo: GalleryPhoto) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'community_chat'), {
        schoolId: user.schoolId || 'default-school',
        senderId: user.uid,
        senderName: user.name,
        senderRole: user.role,
        text: `Olhem esta foto da galeria: ${photo.caption}`,
        photoUrl: photo.url,
        timestamp: new Date().toISOString()
      });
      toast.success('Foto enviada para a comunidade! 🤝');
    } catch (error) {
      console.error('Error sending to community:', error);
      toast.error('Erro ao enviar para a comunidade.');
    }
  };

  const handleAddComment = async (photoId: string) => {
    if (!newComment[photoId]?.trim() || !user) return;

    const comment: PhotoComment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.uid,
      userName: user.name,
      text: newComment[photoId],
      timestamp: new Date().toISOString()
    };

    try {
      await updateDoc(doc(db, 'gallery', photoId), {
        comments: arrayUnion(comment)
      });
      setNewComment({ ...newComment, [photoId]: '' });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleUploadMock = async () => {
    if (!user) return;
    setIsUploading(true);
    
    // In a real app, this would involve Firebase Storage
    const newPhoto = {
      schoolId: user.schoolId || 'default-school',
      url: `https://picsum.photos/seed/${Math.random()}/800/600`,
      caption: 'Nova atividade do dia!',
      uploadedBy: user.name,
      timestamp: new Date().toISOString(),
      comments: []
    };

    try {
      await addDoc(collection(db, 'gallery'), newPhoto);
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Galeria Compartilhada</h2>
        {isStaff && (
          <Button 
            onClick={handleUploadMock} 
            disabled={isUploading}
            className="rounded-2xl bg-primary text-white gap-2"
          >
            <Camera size={18} />
            Postar Foto
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {photos.map((photo) => (
          <Card key={`photo-${photo.id}`} className="rounded-[32px] border-none card-shadow overflow-hidden bg-white">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-800">{photo.caption}</p>
                  <p className="text-[10px] text-gray-400">
                    Postado por {photo.uploadedBy} • {format(new Date(photo.timestamp), "d 'de' MMMM, HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleSendToCommunity(photo)}
                    className="p-2 text-[#45B7D1] hover:bg-[#45B7D1]/10 rounded-xl transition-colors"
                    title="Enviar para Comunidade"
                  >
                    <Users size={20} />
                  </button>
                  <button 
                    onClick={() => handleShare(photo)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors"
                    title="Compartilhar"
                  >
                    <Share2 size={20} />
                  </button>
                  <button 
                    onClick={() => handleDownload(photo.url, `foto-${photo.id}.jpg`)}
                    className="p-2 text-secondary hover:bg-secondary/10 rounded-xl transition-colors"
                    title="Salvar"
                  >
                    <Download size={20} />
                  </button>
                  <button className="p-2 text-destructive hover:scale-110 transition-transform">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {photo.comments?.map((comment) => (
                  <div key={`comment-${comment.id}`} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                      {comment.userName.charAt(0)}
                    </div>
                    <div className="flex-1 bg-muted/30 p-3 rounded-2xl">
                      <p className="text-[10px] font-bold text-gray-700 mb-1">{comment.userName}</p>
                      <p className="text-xs text-gray-600">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Adicione um comentário..."
                  value={newComment[photo.id] || ''}
                  onChange={(e) => setNewComment({ ...newComment, [photo.id]: e.target.value })}
                  className="rounded-xl bg-muted/30 border-none text-xs"
                />
                <Button 
                  size="icon" 
                  onClick={() => handleAddComment(photo.id)}
                  className="rounded-xl bg-primary text-white shrink-0"
                >
                  <Send size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {photos.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Camera size={48} className="mx-auto mb-4 opacity-20" />
            <p>Nenhuma foto na galeria ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
