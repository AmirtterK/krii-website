'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/src/lib/supabase';

interface Moderator {
  moderator_id: string;
  username: string;
  role: 'admin' | 'moderator';
  is_active: boolean;
  last_login: string | null;
}

interface AuthContextType {
  moderator: Moderator | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [moderator, setModerator] = useState<Moderator | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if moderator is logged in on mount
  useEffect(() => {
    console.log('🔄 AuthProvider: Checking authentication status...');
    
    const checkAuth = async () => {
      try {
        const storedModerator = localStorage.getItem('moderator');
        console.log('📦 Stored moderator:', storedModerator ? 'Found' : 'Not found');
        
        if (storedModerator) {
          const mod = JSON.parse(storedModerator);
          console.log('👤 Verifying moderator:', mod.username);
          
          // Verify the moderator still exists and is active
          const { data, error } = await supabase
            .from('moderators')
            .select('moderator_id, username, role, is_active, last_login')
            .eq('moderator_id', mod.moderator_id)
            .eq('is_active', true)
            .single();

          console.log('✅ Verification result:', { 
            valid: !!data && !error, 
            error: error?.message 
          });

          if (data && !error) {
            setModerator(data);
            console.log('✅ Moderator authenticated:', data.username);
          } else {
            // Invalid session, clear it
            console.log('❌ Invalid session, clearing...');
            localStorage.removeItem('moderator'); 
            setModerator(null);
          }
        } else {
          console.log('ℹ️ No stored session found');
        }
      } catch (error) {
        console.error('💥 Auth check error:', error);
        localStorage.removeItem('moderator');
        setModerator(null);
      } finally {
        setLoading(false);
        console.log('✅ Auth check complete');
      }
    };

    checkAuth();
  }, []);

  const signIn = async (username: string, password: string): Promise<void> => {
    console.log('🔐 Attempting sign in for username:', username);
    
    try {
      console.log('📡 Calling /api/auth/login...');
      
      // Call your API route to verify credentials
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('📥 API response status:', response.status);

      const data = await response.json();
      console.log('📦 API response data:', { 
        success: data.success, 
        error: data.error,
        hasModerator: !!data.moderator 
      });

      if (!response.ok) {
        console.log('❌ Login failed:', data.error);
        throw new Error(data.error || 'Invalid credentials');
      }

      // Store moderator data
      const moderatorData: Moderator = {
        moderator_id: data.moderator.moderator_id,
        username: data.moderator.username,
        role: data.moderator.role,
        is_active: data.moderator.is_active,
        last_login: data.moderator.last_login,
      };

      console.log('💾 Storing moderator data in localStorage');
      localStorage.setItem('moderator', JSON.stringify(moderatorData));
      setModerator(moderatorData);

      console.log('🕐 Updating last_login in database');
      // Update last_login in database
      await supabase
        .from('moderators')
        .update({ last_login: new Date().toISOString() })
        .eq('moderator_id', moderatorData.moderator_id);

      console.log('✅ Sign in successful!');

    } catch (error) {
      console.error('💥 Sign in error:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    console.log('🚪 Logging out...');
    
    try {
      localStorage.removeItem('moderator');
      setModerator(null);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('💥 Logout error:', error);
      throw new Error('Failed to logout');
    }
  };

  const value: AuthContextType = {
    moderator,
    loading,
    signIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
