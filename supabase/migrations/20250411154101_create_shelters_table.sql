-- MIGRACJA: Tworzenie tabeli shelters dla schronisk
-- Opis: Ta migracja tworzy tabelę dla przechowywania informacji o schroniskach dla zwierząt

-- utworzenie tabeli shelters
create table shelters (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  name text not null,
  address text not null,
  city text not null,
  postal_code text not null,
  phone text not null,
  email text not null,
  description text,
  active boolean default true not null
);

-- włączenie row level security
alter table shelters enable row level security;

-- polityka dla przeglądania schronisk - dostęp dla wszystkich
create policy "shelters_select_policy" on shelters
  for select using (true);

-- polityka dla dodawania schronisk - tylko dla pracowników
create policy "shelters_insert_policy" on shelters
  for insert with check (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla aktualizacji schronisk - tylko dla pracowników przypisanych do schroniska
-- ta polityka zostanie zaktualizowana po utworzeniu tabeli shelter_employees
create policy "shelters_update_policy" on shelters
  for update using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- polityka dla usuwania schronisk - tylko dla pracowników przypisanych do schroniska
-- ta polityka zostanie zaktualizowana po utworzeniu tabeli shelter_employees
create policy "shelters_delete_policy" on shelters
  for delete using (exists (
    select 1 from profiles where id = auth.uid() and role = 'employee'
  ));

-- wyzwalacz dla aktualizacji updated_at w tabeli shelters
create trigger update_shelters_updated_at
  before update on shelters
  for each row execute procedure update_updated_at();

-- komentarze do tabeli i kolumn
comment on table shelters is 'Schroniska dla zwierząt w systemie 10xShelter';
comment on column shelters.id is 'Unikalny identyfikator schroniska';
comment on column shelters.name is 'Nazwa schroniska';
comment on column shelters.address is 'Adres schroniska';
comment on column shelters.city is 'Miasto, w którym znajduje się schronisko';
comment on column shelters.postal_code is 'Kod pocztowy schroniska';
comment on column shelters.phone is 'Numer telefonu do schroniska';
comment on column shelters.email is 'Adres email schroniska';
comment on column shelters.description is 'Opis schroniska';
comment on column shelters.active is 'Czy schronisko jest aktywne w systemie'; 
