-- Migracja dodająca dane testowe dla tabeli profiles
-- Autor: AI Assistant
-- Data: 2025-04-12
-- Opis: Dodanie przykładowych profili użytkowników

INSERT INTO profiles (
  id,
  role,
  full_name,
  phone,
  email,
  avatar_url,
  created_at,
  updated_at
) VALUES
-- Pracownicy schronisk
('11111111-1111-1111-1111-111111111111', 'employee', 'Jan Kowalski', '+48 123 456 789', 'jan.kowalski@example.com', 'https://example.com/avatars/jan.jpg', NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', 'employee', 'Anna Nowak', '+48 987 654 321', 'anna.nowak@example.com', 'https://example.com/avatars/anna.jpg', NOW(), NOW()),
('33333333-3333-3333-3333-333333333333', 'employee', 'Piotr Wiśniewski', '+48 555 666 777', 'piotr.wisniewski@example.com', 'https://example.com/avatars/piotr.jpg', NOW(), NOW()),
('44444444-4444-4444-4444-444444444444', 'employee', 'Maria Wójcik', '+48 888 999 000', 'maria.wojcik@example.com', 'https://example.com/avatars/maria.jpg', NOW(), NOW()),
('55555555-5555-5555-5555-555555555555', 'employee', 'Tomasz Lewandowski', '+48 111 222 333', 'tomasz.lewandowski@example.com', 'https://example.com/avatars/tomasz.jpg', NOW(), NOW()),

-- Zwykli użytkownicy
('66666666-6666-6666-6666-666666666666', 'user', 'Katarzyna Zielińska', '+48 444 555 666', 'katarzyna.zielinska@example.com', 'https://example.com/avatars/katarzyna.jpg', NOW(), NOW()),
('77777777-7777-7777-7777-777777777777', 'user', 'Michał Szymański', '+48 777 888 999', 'michal.szymanski@example.com', 'https://example.com/avatars/michal.jpg', NOW(), NOW()),
('88888888-8888-8888-8888-888888888888', 'user', 'Agnieszka Woźniak', '+48 222 333 444', 'agnieszka.wozniak@example.com', 'https://example.com/avatars/agnieszka.jpg', NOW(), NOW()),
('99999999-9999-9999-9999-999999999999', 'user', 'Paweł Dąbrowski', '+48 666 777 888', 'pawel.dabrowski@example.com', 'https://example.com/avatars/pawel.jpg', NOW(), NOW()),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'user', 'Magdalena Kozłowska', '+48 999 000 111', 'magdalena.kozłowska@example.com', 'https://example.com/avatars/magdalena.jpg', NOW(), NOW()); 
