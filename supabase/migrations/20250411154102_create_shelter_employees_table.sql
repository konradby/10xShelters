-- MIGRACJA: Tworzenie tabeli shelter_employees
-- Opis: Ta migracja tworzy tabelę łączącą pracowników ze schroniskami i aktualizuje polityki dostępu

-- utworzenie tabeli shelter_employees
create table shelter_employees (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  shelter_id uuid not null references shelters(id) on delete cascade,
  employee_id uuid not null references profiles(id) on delete cascade,
  unique (shelter_id, employee_id)
);

-- włączenie row level security
alter table shelter_employees enable row level security;

-- polityka dla przeglądania powiązań pracownik-schronisko - dla wszystkich pracowników
create policy "shelter_employees_select_policy" on shelter_employees
  for select using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla dodawania powiązań pracownik-schronisko - tylko dla pracowników
create policy "shelter_employees_insert_policy" on shelter_employees
  for insert with check (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla usuwania powiązań pracownik-schronisko - tylko dla pracowników
create policy "shelter_employees_delete_policy" on shelter_employees
  for delete using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- aktualizacja polityk dla tabeli shelters - teraz że mamy tabelę shelter_employees
drop policy if exists "shelters_update_policy" on shelters;
drop policy if exists "shelters_delete_policy" on shelters;

-- nowa polityka aktualizacji schronisk - tylko dla pracowników przypisanych do schroniska
create policy "shelters_update_policy" on shelters
  for update using (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    where profiles.id = auth.uid() and shelter_employees.shelter_id = shelters.id
  ));

-- nowa polityka usuwania schronisk - tylko dla pracowników przypisanych do schroniska
create policy "shelters_delete_policy" on shelters
  for delete using (exists (
    select 1 from profiles
    join shelter_employees on profiles.id = shelter_employees.employee_id
    where profiles.id = auth.uid() and shelter_employees.shelter_id = shelters.id
  ));

-- indeksy dla tabeli shelter_employees
create index idx_shelter_employees_shelter_id on shelter_employees(shelter_id);
create index idx_shelter_employees_employee_id on shelter_employees(employee_id);

-- komentarze do tabeli i kolumn
comment on table shelter_employees is 'Powiązania pracowników ze schroniskami';
comment on column shelter_employees.id is 'Unikalny identyfikator powiązania';
comment on column shelter_employees.shelter_id is 'ID schroniska, do którego przypisany jest pracownik';
comment on column shelter_employees.employee_id is 'ID pracownika (profil użytkownika)'; 
