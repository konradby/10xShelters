'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/db/supabase.client';
import type { Database } from '@/db/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function ProfileExample() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .single();

        if (error) {
          console.error('Błąd pobierania profilu:', error);
        } else if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Wystąpił nieoczekiwany błąd:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profil użytkownika</h1>

      {loading ? (
        <p>Ładowanie profilu...</p>
      ) : profile ? (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl">
            {profile.full_name || 'Brak nazwy użytkownika'}
          </h2>
          <p>{profile.email}</p>
        </div>
      ) : (
        <p>Nie znaleziono profilu</p>
      )}
    </div>
  );
}
