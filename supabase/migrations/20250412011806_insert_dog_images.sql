-- Migracja dodająca dane testowe dla tabeli dog_images
-- Autor: AI Assistant
-- Data: 2025-04-12
-- Opis: Dodanie zdjęć psów do bazy danych

INSERT INTO dog_images (
  dog_id,
  image_url,
  is_primary,
  created_at,
  updated_at
) VALUES
-- Zdjęcia psa Burek (ID: 1)
(1, 'https://example.com/images/dogs/burek1.jpg', true, NOW(), NOW()),
(1, 'https://example.com/images/dogs/burek2.jpg', false, NOW(), NOW()),
(1, 'https://example.com/images/dogs/burek3.jpg', false, NOW(), NOW()),

-- Zdjęcia psa Reksio (ID: 2)
(2, 'https://example.com/images/dogs/reksio1.jpg', true, NOW(), NOW()),
(2, 'https://example.com/images/dogs/reksio2.jpg', false, NOW(), NOW()),

-- Zdjęcia psa Azor (ID: 3)
(3, 'https://example.com/images/dogs/azor1.jpg', true, NOW(), NOW()),
(3, 'https://example.com/images/dogs/azor2.jpg', false, NOW(), NOW()),

-- Zdjęcia psa Luna (ID: 4)
(4, 'https://example.com/images/dogs/luna1.jpg', true, NOW(), NOW()),
(4, 'https://example.com/images/dogs/luna2.jpg', false, NOW(), NOW()),

-- Zdjęcia psa Max (ID: 5)
(5, 'https://example.com/images/dogs/max1.jpg', true, NOW(), NOW()),
(5, 'https://example.com/images/dogs/max2.jpg', false, NOW(), NOW()); 
