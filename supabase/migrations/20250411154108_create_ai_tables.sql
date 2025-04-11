-- MIGRACJA: Tworzenie tabel ai_searches i ai_matches dla funkcji AI
-- Opis: Ta migracja tworzy tabele do przechowywania wyszukiwań i dopasowań AI

-- utworzenie tabeli ai_searches
create table ai_searches (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  user_id uuid references profiles(id) on delete set null,
  prompt text not null,
  search_vector tsvector generated always as (to_tsvector('polish', prompt)) stored
);

-- włączenie row level security
alter table ai_searches enable row level security;

-- polityka dla przeglądania wyszukiwań AI - zalogowani użytkownicy widzą tylko swoje
create policy "ai_searches_select_policy" on ai_searches
  for select using (auth.uid() = user_id);

-- polityka dla pracowników - widzą wszystkie wyszukiwania
create policy "ai_searches_select_employee_policy" on ai_searches
  for select using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla dodawania wyszukiwań AI - tylko dla zalogowanych użytkowników
create policy "ai_searches_insert_policy" on ai_searches
  for insert with check (auth.uid() = user_id);

-- utworzenie tabeli ai_matches
create table ai_matches (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  search_id uuid not null references ai_searches(id) on delete cascade,
  dog_id uuid not null references dogs(id) on delete cascade,
  match_percentage numeric(5,2) not null check (match_percentage between 0 and 100),
  was_clicked boolean default false not null,
  rank integer not null,
  unique (search_id, dog_id)
);

-- włączenie row level security
alter table ai_matches enable row level security;

-- polityka dla przeglądania dopasowań AI - użytkownicy widzą tylko swoje
create policy "ai_matches_select_policy" on ai_matches
  for select using (exists (
    select 1 from ai_searches 
    where ai_searches.id = ai_matches.search_id and ai_searches.user_id = auth.uid()
  ));

-- polityka dla pracowników - widzą wszystkie dopasowania
create policy "ai_matches_select_employee_policy" on ai_matches
  for select using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla dodawania dopasowań AI - tylko dla zalogowanych użytkowników
create policy "ai_matches_insert_policy" on ai_matches
  for insert with check (exists (
    select 1 from ai_searches 
    where ai_searches.id = ai_matches.search_id and ai_searches.user_id = auth.uid()
  ));

-- polityka dla aktualizacji dopasowań AI (np. oznaczenie kliknięcia) - tylko dla właściciela wyszukiwania
create policy "ai_matches_update_policy" on ai_matches
  for update using (exists (
    select 1 from ai_searches 
    where ai_searches.id = ai_matches.search_id and ai_searches.user_id = auth.uid()
  ));

-- indeksy dla tabel AI
create index idx_ai_searches_search_vector on ai_searches using gin(search_vector);
create index idx_ai_searches_user_id on ai_searches(user_id);
create index idx_ai_matches_search_id on ai_matches(search_id);
create index idx_ai_matches_dog_id on ai_matches(dog_id);
create index idx_ai_matches_percentage on ai_matches(match_percentage desc);

-- komentarze do tabel i kolumn
comment on table ai_searches is 'Wyszukiwania AI w systemie 10xShelter';
comment on column ai_searches.id is 'Unikalny identyfikator wyszukiwania';
comment on column ai_searches.user_id is 'ID użytkownika wykonującego wyszukiwanie';
comment on column ai_searches.prompt is 'Zapytanie użytkownika';
comment on column ai_searches.search_vector is 'Wektor wyszukiwania dla indeksowania pełnotekstowego';

comment on table ai_matches is 'Dopasowania AI dla wyszukiwań w systemie 10xShelter';
comment on column ai_matches.id is 'Unikalny identyfikator dopasowania';
comment on column ai_matches.search_id is 'ID wyszukiwania AI';
comment on column ai_matches.dog_id is 'ID dopasowanego psa';
comment on column ai_matches.match_percentage is 'Procent dopasowania (0-100)';
comment on column ai_matches.was_clicked is 'Czy dopasowanie zostało kliknięte przez użytkownika';
comment on column ai_matches.rank is 'Pozycja dopasowania w wynikach wyszukiwania'; 
