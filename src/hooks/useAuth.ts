'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { AuthStatusViewModel } from '@/types/viewModels.types';

const clearAuthStorage = () => {
  // Wyczyść wszystkie ciasteczka związane z autentykacją
  document.cookie.split(';').forEach((cookie) => {
    const [name] = cookie.split('=');
    if (name.trim().startsWith('supabase.auth.')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });

  // Wyczyść localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.')) {
      localStorage.removeItem(key);
    }
  });
};

export const useAuth = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatusViewModel>({
    isLoggedIn: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Wyczyść storage przed sprawdzeniem statusu autentykacji
    clearAuthStorage();

    const checkAuthStatus = async () => {
      try {
        console.log('useAuth - Checking auth status...');

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('useAuth - Error getting session:', error);
          return;
        }

        console.log(
          'useAuth - getSession result:',
          !!session,
          session?.user?.id
        );

        if (session) {
          console.log(
            'useAuth - session exists, user metadata:',
            session.user.user_metadata
          );

          setAuthStatus({
            isLoggedIn: true,
            user: {
              id: session.user.id,
              email: session.user.email || '',
              role:
                (session.user.user_metadata.role as 'user' | 'employee') ||
                'user',
            },
          });

          console.log('useAuth - authStatus updated with user');
        }
      } catch (e) {
        console.error('Error checking auth status:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('useAuth - onAuthStateChange event:', _event, !!session);

      if (session) {
        console.log('useAuth - Session details:', {
          id: session.user.id,
          email: session.user.email,
          metadata: session.user.user_metadata,
        });
      }

      setAuthStatus({
        isLoggedIn: !!session,
        user: session
          ? {
              id: session.user.id,
              email: session.user.email || '',
              role:
                (session.user.user_metadata.role as 'user' | 'employee') ||
                'user',
            }
          : null,
      });

      console.log(
        'useAuth - authStatus updated after state change:',
        !!session
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return { ...authStatus, isLoading };
};
