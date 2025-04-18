'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthStatusViewModel } from '@/types/viewModels.types';

export const useAuth = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatusViewModel>({
    isLoggedIn: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (session) {
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
        }
      } catch (e) {
        console.error('Error checking auth status:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
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
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return { ...authStatus, isLoading };
};
