export type UserRole = 'parent' | 'monitor' | 'teacher' | 'admin';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId?: string;
  photoUrl?: string;
}

export interface School {
  id: string;
  name: string;
  address?: string;
  plan: 'free' | 'premium';
}

export interface Child {
  id: string;
  name: string;
  birthDate?: string;
  schoolId: string;
  classId?: string;
  photoUrl?: string;
  allergies?: string;
  authorizedPickups: string[];
  parentUids: string[];
}

export interface DiaryEntry {
  id: string;
  childId: string;
  date: string;
  feeding?: {
    breakfast?: string;
    lunch?: string;
    snack?: string;
  };
  activities: string[];
  mood: 'happy' | 'agitated' | 'sad' | 'calm';
  hygiene?: {
    bathroom?: string;
    sleep?: string;
    bath?: boolean;
  };
  photos: string[];
  diaperChanges?: number;
  waterIntake?: number;
  teacherId: string;
  importantAlert?: boolean;
  alertDescription?: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Event {
  id: string;
  schoolId: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  confirmations: string[];
}

export interface Medication {
  id: string;
  childId: string;
  name: string;
  dosage: string;
  schedule: string[];
  prescriptionUrl?: string;
  active: boolean;
}

export interface GalleryPhoto {
  id: string;
  schoolId: string;
  url: string;
  caption: string;
  uploadedBy: string;
  timestamp: string;
  comments: PhotoComment[];
}

export interface PhotoComment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

export interface CommunityMessage {
  id: string;
  schoolId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  text: string;
  photoUrl?: string;
  timestamp: string;
}
