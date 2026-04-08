import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db, googleProvider, type FirebaseUser } from './firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  updateRole: (role: User['role']) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseUser(fUser);
      
      if (fUser) {
        // Try to get user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', fUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as User);
          } else {
            // Create a default profile if it doesn't exist
            const newUser: User = {
              uid: fUser.uid,
              name: fUser.displayName || 'Usuário',
              email: fUser.email || '',
              role: 'parent', // Default role
              photoUrl: fUser.photoURL || undefined
            };
            await setDoc(doc(db, 'users', fUser.uid), newUser);
            setUser(newUser);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateRole = async (newRole: User['role']) => {
    if (!user || !firebaseUser) return;
    try {
      const updatedUser = { ...user, role: newRole };
      await setDoc(doc(db, 'users', firebaseUser.uid), updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, signIn, logout, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
