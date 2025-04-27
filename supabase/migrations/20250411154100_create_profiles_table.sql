-- MIGRACJA: Tworzenie tabeli profiles rozszerzającej Supabase auth.users
-- Opis: Ta migracja tworzy tabelę profilów użytkowników powiązaną z Supabase auth

-- włączenie rozszerzenia dla generowania uuid
create extension if not exists "uuid-ossp";

-- utworzenie tabeli profiles
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  role text not null check (role in ('employee', 'user')),
  full_name text,
  phone text,
  email text unique not null,
  avatar_url text
);

-- włączenie row level security
alter table profiles enable row level security;

-- polityka dla przeglądania profilów - dostęp tylko do własnego profilu lub dla pracowników
create policy "profiles_select_policy" on profiles
  for select using (auth.uid() = id or exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla aktualizacji własnego profilu
create policy "profiles_update_own_policy" on profiles
  for update using (auth.uid() = id);

-- polityka dla wstawiania profilu - tylko dla zalogowanych użytkowników
create policy "profiles_insert_policy" on profiles
  for insert with check (auth.uid() = id);

-- funkcja aktualizująca pole updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- wyzwalacz dla aktualizacji updated_at w tabeli profiles
create trigger update_profiles_updated_at
  before update on profiles
  for each row execute procedure update_updated_at();

-- komentarze do tabeli i kolumn
comment on table profiles is 'Profile użytkowników systemu 10xShelter';
comment on column profiles.id is 'ID profilu - odpowiada ID użytkownika z auth.users';
comment on column profiles.role is 'Rola użytkownika - employee (pracownik schroniska) lub user (zwykły użytkownik)';
comment on column profiles.full_name is 'Pełne imię i nazwisko użytkownika';
comment on column profiles.phone is 'Numer telefonu użytkownika';
comment on column profiles.email is 'Adres email użytkownika';
comment on column profiles.avatar_url is 'URL do zdjęcia profilowego użytkownika'; 
