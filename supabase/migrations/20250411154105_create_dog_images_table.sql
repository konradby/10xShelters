-- MIGRACJA: Tworzenie tabeli dog_images dla zdjęć psów
-- Opis: Ta migracja tworzy tabelę przechowującą zdjęcia psów ze schronisk

-- utworzenie tabeli dog_images
create table dog_images (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  dog_id uuid not null references dogs(id) on delete cascade,
  image_path text not null,
  is_primary boolean default false not null,
  description text
);

-- włączenie row level security
alter table dog_images enable row level security;

-- polityka dla przeglądania zdjęć psów - dostęp dla wszystkich
create policy "dog_images_select_policy" on dog_images
  for select using (true);

-- polityka dla dodawania zdjęć psów - tylko dla pracowników przypisanych do schroniska
create policy "dog_images_insert_policy" on dog_images
  for insert with check (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    join dogs on shelter_employees.shelter_id = dogs.shelter_id
    where profiles.id = auth.uid() and dogs.id = dog_images.dog_id
  ));

-- polityka dla aktualizacji zdjęć psów - tylko dla pracowników przypisanych do schroniska
create policy "dog_images_update_policy" on dog_images
  for update using (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    join dogs on shelter_employees.shelter_id = dogs.shelter_id
    where profiles.id = auth.uid() and dogs.id = dog_images.dog_id
  ));

-- polityka dla usuwania zdjęć psów - tylko dla pracowników przypisanych do schroniska
create policy "dog_images_delete_policy" on dog_images
  for delete using (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    join dogs on shelter_employees.shelter_id = dogs.shelter_id
    where profiles.id = auth.uid() and dogs.id = dog_images.dog_id
  ));

-- indeksy dla tabeli dog_images
create index idx_dog_images_dog_id on dog_images(dog_id);
create index idx_dog_images_primary on dog_images(dog_id, is_primary);

-- komentarze do tabeli i kolumn
comment on table dog_images is 'Zdjęcia psów w systemie 10xShelter';
comment on column dog_images.id is 'Unikalny identyfikator zdjęcia';
comment on column dog_images.dog_id is 'ID psa, do którego należy zdjęcie';
comment on column dog_images.image_path is 'Ścieżka do pliku zdjęcia w storage';
comment on column dog_images.is_primary is 'Czy zdjęcie jest głównym zdjęciem psa';
comment on column dog_images.description is 'Opis zdjęcia'; 
