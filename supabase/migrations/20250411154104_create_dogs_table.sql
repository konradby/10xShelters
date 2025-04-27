-- MIGRACJA: Tworzenie tabeli dogs dla psów w schroniskach
-- Opis: Ta migracja tworzy tabelę przechowującą informacje o psach dostępnych w schroniskach

-- utworzenie tabeli dogs
create table dogs (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  name text not null,
  shelter_id uuid not null references shelters(id) on delete cascade,
  breed_id uuid not null references breeds(id) on delete restrict,
  approximate_age text,
  weight numeric(5,2),
  color text,
  gender text check (gender in ('male', 'female')),
  status text not null check (status in ('available', 'adopted')) default 'available',
  description text,
  mixed_breed boolean default false not null
);

-- włączenie row level security
alter table dogs enable row level security;

-- polityka dla przeglądania psów - dostęp dla wszystkich
create policy "dogs_select_policy" on dogs
  for select using (true);

-- polityka dla dodawania psów - tylko dla pracowników przypisanych do schroniska
create policy "dogs_insert_policy" on dogs
  for insert with check (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    where profiles.id = auth.uid() and shelter_employees.shelter_id = dogs.shelter_id
  ));

-- polityka dla aktualizacji psów - tylko dla pracowników przypisanych do schroniska
create policy "dogs_update_policy" on dogs
  for update using (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    where profiles.id = auth.uid() and shelter_employees.shelter_id = dogs.shelter_id
  ));

-- polityka dla usuwania psów - tylko dla pracowników przypisanych do schroniska
create policy "dogs_delete_policy" on dogs
  for delete using (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    where profiles.id = auth.uid() and shelter_employees.shelter_id = dogs.shelter_id
  ));

-- indeksy dla tabeli dogs
create index idx_dogs_status on dogs(status);
create index idx_dogs_shelter on dogs(shelter_id);
create index idx_dogs_breed on dogs(breed_id);

-- wyzwalacz dla aktualizacji updated_at w tabeli dogs
create trigger update_dogs_updated_at
  before update on dogs
  for each row execute procedure update_updated_at();

-- komentarze do tabeli i kolumn
comment on table dogs is 'Psy dostępne w schroniskach w systemie 10xShelter';
comment on column dogs.id is 'Unikalny identyfikator psa';
comment on column dogs.name is 'Imię psa';
comment on column dogs.shelter_id is 'ID schroniska, w którym przebywa pies';
comment on column dogs.breed_id is 'ID rasy psa';
comment on column dogs.approximate_age is 'Przybliżony wiek psa';
comment on column dogs.weight is 'Waga psa w kg';
comment on column dogs.color is 'Kolor/umaszczenie psa';
comment on column dogs.gender is 'Płeć psa (samiec/samica)';
comment on column dogs.status is 'Status psa (dostępny/zaadoptowany)';
comment on column dogs.description is 'Opis psa';
comment on column dogs.mixed_breed is 'Czy pies jest mieszańcem'; 
