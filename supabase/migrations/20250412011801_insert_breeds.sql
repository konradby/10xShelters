-- Migracja dodająca dane testowe dla tabeli breeds
-- Autor: AI Assistant
-- Data: 2024-04-12
-- Opis: Dodanie przykładowych ras psów z pełnymi cechami

INSERT INTO breeds (
  id,
  name,
  size,
  coat_type,
  shedding_level,
  energy_level,
  trainability,
  sociability,
  description
) VALUES
-- Duże rasy
('11111111-1111-1111-1111-111111111111', 'Labrador Retriever', 'large', 'short', 4, 4, 5, 5, 'Przyjazny, inteligentny i energiczny pies rodzinny'),
('22222222-2222-2222-2222-222222222222', 'Owczarek Niemiecki', 'large', 'medium', 3, 4, 5, 3, 'Inteligentny, lojalny i wszechstronny pies pracujący'),
('33333333-3333-3333-3333-333333333333', 'Golden Retriever', 'large', 'long', 4, 4, 5, 5, 'Przyjazny, cierpliwy i doskonały pies rodzinny'),
('44444444-4444-4444-4444-444444444444', 'Bernardyn', 'large', 'long', 5, 3, 3, 4, 'Spokojny, łagodny i opiekuńczy pies rodzinny'),
('55555555-5555-5555-5555-555555555555', 'Rottweiler', 'large', 'short', 3, 4, 4, 3, 'Silny, pewny siebie i lojalny pies stróżujący'),

-- Średnie rasy
('66666666-6666-6666-6666-666666666666', 'Border Collie', 'medium', 'medium', 3, 5, 5, 3, 'Najinteligentniejsza rasa psów, doskonała do agility'),
('77777777-7777-7777-7777-777777777777', 'Beagle', 'medium', 'short', 3, 4, 3, 4, 'Przyjazny, ciekawski pies myśliwski'),
('88888888-8888-8888-8888-888888888888', 'Cocker Spaniel', 'medium', 'long', 4, 4, 4, 5, 'Wesoły, przyjazny i towarzyski pies rodzinny'),
('99999999-9999-9999-9999-999999999999', 'Shiba Inu', 'medium', 'medium', 3, 4, 3, 3, 'Niezależny, czujny i lojalny pies'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Bulterier', 'medium', 'short', 2, 4, 3, 3, 'Energiczny, odważny i lojalny pies'),

-- Małe rasy
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Buldog Francuski', 'small', 'short', 2, 2, 3, 4, 'Mały, przyjazny pies do towarzystwa'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Yorkshire Terrier', 'small', 'long', 2, 3, 3, 3, 'Mały, energiczny pies do towarzystwa'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Chihuahua', 'small', 'short', 2, 3, 2, 3, 'Najmniejsza rasa psów, odważna i lojalna'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Mops', 'small', 'short', 3, 2, 3, 5, 'Przyjazny, spokojny pies do towarzystwa'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Jack Russell Terrier', 'small', 'wire', 2, 5, 4, 3, 'Energiczny, inteligentny i odważny pies'); 
