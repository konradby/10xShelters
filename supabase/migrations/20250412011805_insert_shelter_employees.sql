-- Migracja dodająca dane testowe dla tabeli shelter_employees
-- Autor: AI Assistant
-- Data: 2025-04-12
-- Opis: Dodanie powiązań między pracownikami a schroniskami

INSERT INTO shelter_employees (
  shelter_id,
  employee_id,
  role,
  created_at,
  updated_at
) VALUES
-- Pracownicy Schroniska dla Psów w Warszawie
(1, '11111111-1111-1111-1111-111111111111', 'manager', NOW(), NOW()),
(1, '22222222-2222-2222-2222-222222222222', 'employee', NOW(), NOW()),

-- Pracownicy Schroniska dla Psów w Krakowie
(2, '33333333-3333-3333-3333-333333333333', 'manager', NOW(), NOW()),
(2, '44444444-4444-4444-4444-444444444444', 'employee', NOW(), NOW()),

-- Pracownicy Schroniska dla Psów w Gdańsku
(3, '55555555-5555-5555-5555-555555555555', 'manager', NOW(), NOW()),
(3, '11111111-1111-1111-1111-111111111111', 'employee', NOW(), NOW()),

-- Pracownicy Schroniska dla Psów w Poznaniu
(4, '22222222-2222-2222-2222-222222222222', 'manager', NOW(), NOW()),
(4, '33333333-3333-3333-3333-333333333333', 'employee', NOW(), NOW()),

-- Pracownicy Schroniska dla Psów we Wrocławiu
(5, '44444444-4444-4444-4444-444444444444', 'manager', NOW(), NOW()),
(5, '55555555-5555-5555-5555-555555555555', 'employee', NOW(), NOW()); 
