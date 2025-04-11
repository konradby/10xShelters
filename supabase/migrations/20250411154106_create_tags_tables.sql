-- MIGRACJA: Tworzenie tabel tags i dog_tags dla tagów psów
-- Opis: Ta migracja tworzy tabele do przechowywania tagów i ich powiązań z psami

-- utworzenie tabeli tags
create table tags (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  name text unique not null
);

-- włączenie row level security dla tabeli tags
alter table tags enable row level security;

-- polityka dla przeglądania tagów - dostęp dla wszystkich
create policy "tags_select_policy" on tags
  for select using (true);

-- polityka dla dodawania tagów - tylko dla pracowników
create policy "tags_insert_policy" on tags
  for insert with check (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla aktualizacji tagów - tylko dla pracowników
create policy "tags_update_policy" on tags
  for update using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla usuwania tagów - tylko dla pracowników
create policy "tags_delete_policy" on tags
  for delete using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- utworzenie tabeli dog_tags (relacja wiele-do-wielu między psami i tagami)
create table dog_tags (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  dog_id uuid not null references dogs(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  unique (dog_id, tag_id)
);

-- włączenie row level security dla tabeli dog_tags
alter table dog_tags enable row level security;

-- polityka dla przeglądania powiązań psów z tagami - dostęp dla wszystkich
create policy "dog_tags_select_policy" on dog_tags
  for select using (true);

-- polityka dla dodawania powiązań psów z tagami - tylko dla pracowników przypisanych do schroniska
create policy "dog_tags_insert_policy" on dog_tags
  for insert with check (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    join dogs on shelter_employees.shelter_id = dogs.shelter_id
    where profiles.id = auth.uid() and dogs.id = dog_tags.dog_id
  ));

-- polityka dla usuwania powiązań psów z tagami - tylko dla pracowników przypisanych do schroniska
create policy "dog_tags_delete_policy" on dog_tags
  for delete using (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    join dogs on shelter_employees.shelter_id = dogs.shelter_id
    where profiles.id = auth.uid() and dogs.id = dog_tags.dog_id
  ));

-- indeks dla tabeli dog_tags
create index idx_dog_tags_dog_id on dog_tags(dog_id);
create index idx_dog_tags_tag_id on dog_tags(tag_id);

-- komentarze do tabel i kolumn
comment on table tags is 'Tagi opisujące cechy psów w systemie 10xShelter';
comment on column tags.id is 'Unikalny identyfikator tagu';
comment on column tags.name is 'Nazwa tagu';

comment on table dog_tags is 'Powiązania między psami a tagami w systemie 10xShelter';
comment on column dog_tags.id is 'Unikalny identyfikator powiązania';
comment on column dog_tags.dog_id is 'ID psa';
comment on column dog_tags.tag_id is 'ID tagu'; 
