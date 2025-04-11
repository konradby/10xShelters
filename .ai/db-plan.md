# Schemat bazy danych PostgreSQL dla 10xShelter

## 1. Lista tabel z kolumnami, typami danych i ograniczeniami

### 1.1. Tabela `profiles`

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('employee', 'user')),
  full_name TEXT,
  phone TEXT,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT
);
```

### 1.2. Tabela `shelters`

```sql
CREATE TABLE shelters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT TRUE NOT NULL
);
```

### 1.3. Tabela `shelter_employees`

```sql
CREATE TABLE shelter_employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  shelter_id UUID NOT NULL REFERENCES shelters(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  UNIQUE (shelter_id, employee_id)
);
```

### 1.4. Tabela `breeds`

```sql
CREATE TABLE breeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  name TEXT UNIQUE NOT NULL,
  size TEXT NOT NULL CHECK (size IN ('small', 'medium', 'large')),
  coat_type TEXT NOT NULL CHECK (coat_type IN ('short', 'medium', 'long', 'wire', 'curly', 'hairless')),
  shedding_level INTEGER NOT NULL CHECK (shedding_level BETWEEN 1 AND 5),
  energy_level INTEGER NOT NULL CHECK (energy_level BETWEEN 1 AND 5),
  trainability INTEGER NOT NULL CHECK (trainability BETWEEN 1 AND 5),
  sociability INTEGER NOT NULL CHECK (sociability BETWEEN 1 AND 5),
  description TEXT
);
```

### 1.5. Tabela `dogs`

```sql
CREATE TABLE dogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  shelter_id UUID NOT NULL REFERENCES shelters(id) ON DELETE CASCADE,
  breed_id UUID NOT NULL REFERENCES breeds(id) ON DELETE RESTRICT,
  approximate_age TEXT,
  weight NUMERIC(5,2),
  color TEXT,
  gender TEXT CHECK (gender IN ('male', 'female')),
  status TEXT NOT NULL CHECK (status IN ('available', 'adopted')) DEFAULT 'available',
  description TEXT,
  mixed_breed BOOLEAN DEFAULT FALSE NOT NULL
);
```

### 1.6. Tabela `dog_images`

```sql
CREATE TABLE dog_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  image_path TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE NOT NULL,
  description TEXT
);
```

### 1.7. Tabela `tags`

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  name TEXT UNIQUE NOT NULL
);
```

### 1.8. Tabela `dog_tags`

```sql
CREATE TABLE dog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  UNIQUE (dog_id, tag_id)
);
```

### 1.9. Tabela `adoptions`

```sql
CREATE TABLE adoptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE RESTRICT,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  adoption_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT
);
```

### 1.10. Tabela `ai_searches`

```sql
CREATE TABLE ai_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  prompt TEXT NOT NULL,
  search_vector TSVECTOR GENERATED ALWAYS AS (to_tsvector('polish', prompt)) STORED
);
```

### 1.11. Tabela `ai_matches`

```sql
CREATE TABLE ai_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  search_id UUID NOT NULL REFERENCES ai_searches(id) ON DELETE CASCADE,
  dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  match_percentage NUMERIC(5,2) NOT NULL CHECK (match_percentage BETWEEN 0 AND 100),
  was_clicked BOOLEAN DEFAULT FALSE NOT NULL,
  rank INTEGER NOT NULL,
  UNIQUE (search_id, dog_id)
);
```

## 2. Relacje między tabelami

- `profiles` (1) → `shelter_employees` (∞) - Jeden użytkownik może być pracownikiem w wielu schroniskach
- `shelters` (1) → `shelter_employees` (∞) - Jedno schronisko może mieć wielu pracowników
- `shelters` (1) → `dogs` (∞) - Jedno schronisko może mieć wiele psów
- `breeds` (1) → `dogs` (∞) - Jedna rasa może mieć wiele psów
- `dogs` (1) → `dog_images` (∞) - Jeden pies może mieć wiele zdjęć
- `dogs` (1) → `dog_tags` (∞) - Jeden pies może mieć wiele tagów
- `tags` (1) → `dog_tags` (∞) - Jeden tag może być przypisany do wielu psów
- `dogs` (1) → `adoptions` (1) - Jeden pies może mieć jedną adopcję
- `profiles` (1) → `adoptions` (∞) - Jeden użytkownik może adoptować wiele psów
- `profiles` (1) → `ai_searches` (∞) - Jeden użytkownik może wykonać wiele wyszukiwań AI
- `ai_searches` (1) → `ai_matches` (∞) - Jedno wyszukiwanie może mieć wiele dopasowań
- `dogs` (1) → `ai_matches` (∞) - Jeden pies może być dopasowany w wielu wyszukiwaniach

## 3. Indeksy

```sql
-- Indeks dla pola status w tabeli dogs
CREATE INDEX idx_dogs_status ON dogs(status);

-- Indeks dla psa w konkretnym schronisku
CREATE INDEX idx_dogs_shelter ON dogs(shelter_id);

-- Indeks dla konkretnej rasy
CREATE INDEX idx_dogs_breed ON dogs(breed_id);

-- Indeks dla wyszukiwania pełnotekstowego
CREATE INDEX idx_ai_searches_search_vector ON ai_searches USING GIN(search_vector);

-- Indeks dla tagów przypisanych do psa
CREATE INDEX idx_dog_tags_dog_id ON dog_tags(dog_id);

-- Indeks dla zdjęć psa
CREATE INDEX idx_dog_images_dog_id ON dog_images(dog_id);

-- Indeks dla głównego zdjęcia
CREATE INDEX idx_dog_images_primary ON dog_images(dog_id, is_primary);

-- Indeks dla pracowników schroniska
CREATE INDEX idx_shelter_employees_shelter_id ON shelter_employees(shelter_id);
CREATE INDEX idx_shelter_employees_employee_id ON shelter_employees(employee_id);

-- Indeks dla dopasowań AI
CREATE INDEX idx_ai_matches_search_id ON ai_matches(search_id);
CREATE INDEX idx_ai_matches_dog_id ON ai_matches(dog_id);
CREATE INDEX idx_ai_matches_percentage ON ai_matches(match_percentage DESC);
```

## 4. Polityki Row-Level Security (RLS)

```sql
-- Polityka dla tabeli profiles - dostęp tylko do własnego profilu lub jeśli jesteś pracownikiem
CREATE POLICY profiles_select_policy ON profiles
  FOR SELECT USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'employee'
  ));

CREATE POLICY profiles_update_own_policy ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Polityka dla tabeli shelters - przeglądanie dla wszystkich, modyfikacje tylko dla pracowników
CREATE POLICY shelters_select_policy ON shelters
  FOR SELECT USING (true);

CREATE POLICY shelters_insert_policy ON shelters
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'employee'
  ));

CREATE POLICY shelters_update_policy ON shelters
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM profiles
    JOIN shelter_employees ON profiles.id = shelter_employees.employee_id
    WHERE profiles.id = auth.uid() AND shelter_employees.shelter_id = shelters.id
  ));

-- Polityka dla tabeli dogs - przeglądanie dla wszystkich, modyfikacje tylko dla pracowników przypisanych do schroniska
CREATE POLICY dogs_select_policy ON dogs
  FOR SELECT USING (true);

CREATE POLICY dogs_insert_policy ON dogs
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    JOIN shelter_employees ON profiles.id = shelter_employees.employee_id
    WHERE profiles.id = auth.uid() AND shelter_employees.shelter_id = dogs.shelter_id
  ));

CREATE POLICY dogs_update_policy ON dogs
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM profiles
    JOIN shelter_employees ON profiles.id = shelter_employees.employee_id
    WHERE profiles.id = auth.uid() AND shelter_employees.shelter_id = dogs.shelter_id
  ));

CREATE POLICY dogs_delete_policy ON dogs
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM profiles
    JOIN shelter_employees ON profiles.id = shelter_employees.employee_id
    WHERE profiles.id = auth.uid() AND shelter_employees.shelter_id = dogs.shelter_id
  ));

-- Podobne polityki dla pozostałych tabel powiązanych z psami i schroniskami
```

## 5. Funkcje i wyzwalacze

```sql
-- Funkcja automatycznie aktualizująca pole updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Wyzwalacz dla aktualizacji updated_at w odpowiednich tabelach
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_shelters_updated_at
  BEFORE UPDATE ON shelters
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_dogs_updated_at
  BEFORE UPDATE ON dogs
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- Funkcja aktualizująca status psa po dodaniu adopcji
CREATE OR REPLACE FUNCTION update_dog_status_on_adoption()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE dogs SET status = 'adopted' WHERE id = NEW.dog_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Wyzwalacz dla aktualizacji statusu psa po dodaniu adopcji
CREATE TRIGGER update_dog_status_after_adoption
  AFTER INSERT ON adoptions
  FOR EACH ROW EXECUTE PROCEDURE update_dog_status_on_adoption();
```

## 6. Widoki

```sql
-- Widok łączący informacje o psach z ich zdjęciami głównymi, rasami i schroniskami
CREATE VIEW dog_details AS
SELECT
  d.id,
  d.name,
  d.status,
  d.approximate_age,
  d.weight,
  d.color,
  d.gender,
  d.description,
  d.mixed_breed,
  b.name AS breed_name,
  b.size AS breed_size,
  b.coat_type,
  b.energy_level,
  s.name AS shelter_name,
  s.city AS shelter_city,
  i.image_path AS primary_image_path
FROM
  dogs d
JOIN
  breeds b ON d.breed_id = b.id
JOIN
  shelters s ON d.shelter_id = s.id
LEFT JOIN
  (SELECT DISTINCT ON (dog_id) dog_id, image_path
   FROM dog_images
   WHERE is_primary = true
   ORDER BY dog_id, created_at DESC) i ON d.id = i.dog_id;

-- Widok łączący informacje o psach z ich tagami
CREATE VIEW dog_characteristics AS
SELECT
  d.id AS dog_id,
  d.name AS dog_name,
  string_agg(t.name, ', ') AS characteristics
FROM
  dogs d
LEFT JOIN
  dog_tags dt ON d.id = dt.dog_id
LEFT JOIN
  tags t ON dt.tag_id = t.id
GROUP BY
  d.id, d.name;
```

## 7. Dodatkowe uwagi

1. **Optymalizacja wydajności:**

   - Indeksy zostały dodane dla najczęściej wyszukiwanych kolumn, w szczególności dla pól status, shelter_id i breed_id w tabeli dogs.
   - Wykorzystujemy generowaną kolumnę tsvector dla wyszukiwania pełnotekstowego w promptach AI.
   - Widoki zostały utworzone dla najczęstszych złożonych zapytań.

2. **Bezpieczeństwo:**

   - Zaimplementowano Row Level Security (RLS) dla kontroli dostępu.
   - Pracownicy schronisk mogą modyfikować tylko dane psów w schroniskach, do których są przypisani.
   - Wszyscy użytkownicy mogą przeglądać dane publiczne, ale tylko zalogowani pracownicy mogą dokonywać zmian.

3. **Skalowalność:**

   - Struktura bazy danych pozwala na łatwe dodawanie nowych schronisk i psów.
   - System tagów jest elastyczny i pozwala na dodawanie nowych cech charakteru bez modyfikacji schematu.
   - Historia wyszukiwań i dopasowań AI jest przechowywana bezterminowo, co pozwala na analizę danych w przyszłości.

4. **Integracja z Supabase:**

   - Schemat wykorzystuje funkcje i możliwości Supabase, takie jak uwierzytelnianie i RLS.
   - Tabela profiles rozszerza standardową tabelę auth.users Supabase.

5. **Przyszłe rozszerzenia:**
   - Schemat jest przygotowany na ewentualne rozszerzenia, takie jak system powiadomień czy zaawansowane filtrowanie.
   - Możliwe jest łatwe dodanie historii zmian statusu psów w przyszłości.
