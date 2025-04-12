-- Migracja dodająca dane testowe dla tabeli dogs
-- Autor: AI Assistant
-- Data: 2024-04-12
-- Opis: Dodanie przykładowych psów z pełnymi danymi

INSERT INTO dogs (
  id,
  name,
  breed_id,
  shelter_id,
  approximate_age,
  weight,
  color,
  gender,
  status,
  description,
  mixed_breed,
  created_at,
  updated_at
) VALUES
-- Psy w schronisku warszawskim
('11111111-1111-1111-1111-111111111111', 'Burek', '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '3 lata', 35.0, 'czarny', 'male', 'available', 'Spokojny i zrównoważony pies, idealny do domu z ogrodem', false, NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', 'Luna', '22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', '2 lata', 15.0, 'brązowy', 'female', 'available', 'Energiczna i wesoła suczka, uwielbia zabawę', false, NOW(), NOW()),

-- Psy w schronisku krakowskim
('33333333-3333-3333-3333-333333333333', 'Max', '33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', '4 lata', 40.0, 'złoty', 'male', 'available', 'Inteligentny i lojalny pies, wymaga doświadczonego opiekuna', false, NOW(), NOW()),
('44444444-4444-4444-4444-444444444444', 'Bella', '44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', '1 rok', 5.0, 'biały', 'female', 'available', 'Słodka i towarzyska suczka, idealna do mieszkania', false, NOW(), NOW()),

-- Psy w schronisku gdańskim
('55555555-5555-5555-5555-555555555555', 'Rocky', '55555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', '5 lat', 45.0, 'brązowy', 'male', 'available', 'Silny i odważny pies, wymaga konsekwentnego szkolenia', false, NOW(), NOW()),
('66666666-6666-6666-6666-666666666666', 'Mia', '66666666-6666-6666-6666-666666666666', '55555555-5555-5555-5555-555555555555', '2 lata', 12.0, 'czarny', 'female', 'available', 'Inteligentna i czuła suczka, uwielbia dzieci', false, NOW(), NOW()),

-- Psy w schronisku poznańskim
('77777777-7777-7777-7777-777777777777', 'Charlie', '77777777-7777-7777-7777-777777777777', '77777777-7777-7777-7777-777777777777', '3 lata', 18.0, 'brązowo-biały', 'male', 'available', 'Wesoły i towarzyski pies, idealny do aktywnego trybu życia', false, NOW(), NOW()),
('88888888-8888-8888-8888-888888888888', 'Daisy', '88888888-8888-8888-8888-888888888888', '77777777-7777-7777-7777-777777777777', '4 lata', 6.0, 'biały', 'female', 'available', 'Spokojna i zrównoważona suczka, idealna dla seniorów', false, NOW(), NOW()),

-- Psy w schronisku wrocławskim
('99999999-9999-9999-9999-999999999999', 'Buddy', '99999999-9999-9999-9999-999999999999', '99999999-9999-9999-9999-999999999999', '2 lata', 30.0, 'złoty', 'male', 'available', 'Inteligentny i lojalny pies, wymaga dużo ruchu', false, NOW(), NOW()),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Lola', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '99999999-9999-9999-9999-999999999999', '1 rok', 4.0, 'brązowy', 'female', 'available', 'Słodka i towarzyska suczka, uwielbia przytulanie', false, NOW(), NOW()); 
