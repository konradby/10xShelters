-- MIGRACJA: Tworzenie tabeli adoptions i triggerów dla adopcji psów
-- Opis: Ta migracja tworzy tabelę dla procesów adopcji psów oraz trigger aktualizujący status psa

-- utworzenie tabeli adoptions
create table adoptions (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  dog_id uuid not null references dogs(id) on delete restrict,
  owner_id uuid not null references profiles(id) on delete restrict,
  adoption_date date not null default current_date,
  notes text
);

-- włączenie row level security
alter table adoptions enable row level security;

-- polityka dla przeglądania adopcji - pracownicy widzą wszystkie, użytkownicy tylko swoje
create policy "adoptions_select_employee_policy" on adoptions
  for select using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

create policy "adoptions_select_owner_policy" on adoptions
  for select using (auth.uid() = owner_id);

-- polityka dla dodawania adopcji - tylko dla pracowników schroniska
create policy "adoptions_insert_policy" on adoptions
  for insert with check (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    join dogs on shelter_employees.shelter_id = dogs.shelter_id
    where profiles.id = auth.uid() and dogs.id = adoptions.dog_id
  ));

-- polityka dla aktualizacji adopcji - tylko dla pracowników schroniska
create policy "adoptions_update_policy" on adoptions
  for update using (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    join dogs on shelter_employees.shelter_id = dogs.shelter_id
    where profiles.id = auth.uid() and dogs.id = adoptions.dog_id
  ));

-- polityka dla usuwania adopcji - tylko dla pracowników schroniska
create policy "adoptions_delete_policy" on adoptions
  for delete using (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    join dogs on shelter_employees.shelter_id = dogs.shelter_id
    where profiles.id = auth.uid() and dogs.id = adoptions.dog_id
  ));

-- funkcja automatycznie aktualizująca status psa po dodaniu adopcji
create or replace function update_dog_status_on_adoption()
returns trigger as $$
begin
  update dogs set status = 'adopted' where id = new.dog_id;
  return new;
end;
$$ language plpgsql;

-- wyzwalacz dla aktualizacji statusu psa po dodaniu adopcji
create trigger update_dog_status_after_adoption
  after insert on adoptions
  for each row execute procedure update_dog_status_on_adoption();

-- indeksy dla tabeli adoptions
create index idx_adoptions_dog_id on adoptions(dog_id);
create index idx_adoptions_owner_id on adoptions(owner_id);
create index idx_adoptions_date on adoptions(adoption_date);

-- komentarze do tabeli i kolumn
comment on table adoptions is 'Adopcje psów w systemie 10xShelter';
comment on column adoptions.id is 'Unikalny identyfikator adopcji';
comment on column adoptions.dog_id is 'ID adoptowanego psa';
comment on column adoptions.owner_id is 'ID nowego właściciela psa';
comment on column adoptions.adoption_date is 'Data adopcji';
comment on column adoptions.notes is 'Dodatkowe uwagi dotyczące adopcji'; 
