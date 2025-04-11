-- MIGRACJA: Tworzenie tabeli breeds dla ras psów
-- Opis: Ta migracja tworzy tabelę przechowującą informacje o rasach psów

-- utworzenie tabeli breeds
create table breeds (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  name text unique not null,
  size text not null check (size in ('small', 'medium', 'large')),
  coat_type text not null check (coat_type in ('short', 'medium', 'long', 'wire', 'curly', 'hairless')),
  shedding_level integer not null check (shedding_level between 1 and 5),
  energy_level integer not null check (energy_level between 1 and 5),
  trainability integer not null check (trainability between 1 and 5),
  sociability integer not null check (sociability between 1 and 5),
  description text
);

-- włączenie row level security
alter table breeds enable row level security;

-- polityka dla przeglądania ras - dostęp dla wszystkich
create policy "breeds_select_policy" on breeds
  for select using (true);

-- polityka dla dodawania ras - tylko dla pracowników
create policy "breeds_insert_policy" on breeds
  for insert with check (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla aktualizacji ras - tylko dla pracowników
create policy "breeds_update_policy" on breeds
  for update using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla usuwania ras - tylko dla pracowników
create policy "breeds_delete_policy" on breeds
  for delete using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- komentarze do tabeli i kolumn
comment on table breeds is 'Rasy psów w systemie 10xShelter';
comment on column breeds.id is 'Unikalny identyfikator rasy';
comment on column breeds.name is 'Nazwa rasy psa';
comment on column breeds.size is 'Rozmiar rasy (mały, średni, duży)';
comment on column breeds.coat_type is 'Typ sierści rasy';
comment on column breeds.shedding_level is 'Poziom linienia (1-5)';
comment on column breeds.energy_level is 'Poziom energii (1-5)';
comment on column breeds.trainability is 'Poziom podatności na tresurę (1-5)';
comment on column breeds.sociability is 'Poziom towarzyskości (1-5)';
comment on column breeds.description is 'Opis rasy'; 
