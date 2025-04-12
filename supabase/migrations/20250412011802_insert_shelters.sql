-- Migracja dodająca dane testowe dla tabeli shelters
-- Autor: AI Assistant
-- Data: 2024-04-12
-- Opis: Dodanie przykładowych schronisk z pełnymi danymi

INSERT INTO shelters (
  id,
  name,
  address,
  city,
  postal_code,
  phone,
  email,
  description,
  active
) VALUES
-- Schroniska w Warszawie
('11111111-1111-1111-1111-111111111111', 'Schronisko dla Zwierząt w Warszawie', 'ul. Paluch 2', 'Warszawa', '02-147', '+48 22 868 06 24', 'warszawa@schronisko.pl', 'Największe schronisko w Polsce, opiekujące się setkami zwierząt', true),
('22222222-2222-2222-2222-222222222222', 'Fundacja Azylu pod Psim Aniołem', 'ul. Główna 45', 'Warszawa', '03-001', '+48 22 123 45 67', 'azyl@psianiol.pl', 'Nowoczesne schronisko z profesjonalną opieką behawioralną', true),

-- Schroniska w Krakowie
('33333333-3333-3333-3333-333333333333', 'Schronisko dla Zwierząt w Krakowie', 'ul. Rybna 3', 'Kraków', '30-001', '+48 12 429 18 33', 'krakow@schronisko.pl', 'Nowoczesne schronisko z profesjonalną opieką weterynaryjną', true),
('44444444-4444-4444-4444-444444444444', 'Krakowskie Stowarzyszenie Pomocy Zwierzętom', 'ul. Karmelicka 12', 'Kraków', '31-001', '+48 12 345 67 89', 'krakow@psypomoc.pl', 'Organizacja zajmująca się pomocą bezdomnym zwierzętom', true),

-- Schroniska w Gdańsku
('55555555-5555-5555-5555-555555555555', 'Schronisko dla Zwierząt w Gdańsku', 'ul. Przyrodników 14', 'Gdańsk', '80-001', '+48 58 349 19 33', 'gdansk@schronisko.pl', 'Schronisko z dużym terenem spacerowym i profesjonalną kadrą', true),
('66666666-6666-6666-6666-666666666666', 'Gdańskie Stowarzyszenie Przyjaciół Zwierząt', 'ul. Długa 7', 'Gdańsk', '80-001', '+48 58 123 45 67', 'gdansk@psypomoc.pl', 'Organizacja pomagająca zwierzętom w potrzebie', true),

-- Schroniska w Poznaniu
('77777777-7777-7777-7777-777777777777', 'Schronisko dla Zwierząt w Poznaniu', 'ul. Bukowska 17', 'Poznań', '60-001', '+48 61 123 45 67', 'poznan@schronisko.pl', 'Nowoczesne schronisko z profesjonalną opieką weterynaryjną', true),
('88888888-8888-8888-8888-888888888888', 'Poznańskie Stowarzyszenie Pomocy Zwierzętom', 'ul. Święty Marcin 42', 'Poznań', '61-001', '+48 61 234 56 78', 'poznan@psypomoc.pl', 'Organizacja zajmująca się pomocą bezdomnym zwierzętom', true),

-- Schroniska we Wrocławiu
('99999999-9999-9999-9999-999999999999', 'Schronisko dla Zwierząt we Wrocławiu', 'ul. Ślężna 20', 'Wrocław', '50-001', '+48 71 123 45 67', 'wroclaw@schronisko.pl', 'Schronisko z profesjonalną opieką weterynaryjną i behawioralną', true),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Wrocławskie Stowarzyszenie Przyjaciół Zwierząt', 'ul. Oławska 5', 'Wrocław', '50-001', '+48 71 234 56 78', 'wroclaw@psypomoc.pl', 'Organizacja pomagająca zwierzętom w potrzebie', true); 
