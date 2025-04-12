-- Migracja dodająca dane testowe dla tabeli auth.users
-- Autor: AI Assistant
-- Data: 2025-04-12
-- Opis: Dodanie przykładowych użytkowników do auth.users

INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES
-- Pracownicy schronisk
('11111111-1111-1111-1111-111111111111', 'jan.kowalski@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', 'anna.nowak@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
('33333333-3333-3333-3333-333333333333', 'piotr.wisniewski@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
('44444444-4444-4444-4444-444444444444', 'maria.wojcik@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
('55555555-5555-5555-5555-555555555555', 'tomasz.lewandowski@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),

-- Zwykli użytkownicy
('66666666-6666-6666-6666-666666666666', 'katarzyna.zielinska@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
('77777777-7777-7777-7777-777777777777', 'michal.szymanski@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
('88888888-8888-8888-8888-888888888888', 'agnieszka.wozniak@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
('99999999-9999-9999-9999-999999999999', 'pawel.dabrowski@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'magdalena.kozlowska@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()); 
