-- MIGRACJA: Tworzenie widoków dla 10xShelter
-- Opis: Ta migracja tworzy widoki łączące informacje z różnych tabel dla łatwiejszego dostępu

-- widok dog_details łączący informacje o psach z ich rasami, schroniskami i głównym zdjęciem
create view dog_details as
select
  d.id,
  d.name,
  d.status,
  d.approximate_age,
  d.weight,
  d.color,
  d.gender,
  d.description,
  d.mixed_breed,
  b.name as breed_name,
  b.size as breed_size,
  b.coat_type,
  b.energy_level,
  s.name as shelter_name,
  s.city as shelter_city,
  i.image_path as primary_image_path
from
  dogs d
join
  breeds b on d.breed_id = b.id
join
  shelters s on d.shelter_id = s.id
left join
  (select distinct on (dog_id) dog_id, image_path
   from dog_images
   where is_primary = true
   order by dog_id, created_at desc) i on d.id = i.dog_id;

-- widok dog_characteristics łączący informacje o psach z ich tagami
create view dog_characteristics as
select
  d.id as dog_id,
  d.name as dog_name,
  string_agg(t.name, ', ') as characteristics
from
  dogs d
left join
  dog_tags dt on d.id = dt.dog_id
left join
  tags t on dt.tag_id = t.id
group by
  d.id, d.name;

-- widok adoptable_dogs pokazujący tylko psy dostępne do adopcji
create view adoptable_dogs as
select
  d.*,
  s.name as shelter_name,
  s.city as shelter_city,
  b.name as breed_name
from
  dogs d
join
  shelters s on d.shelter_id = s.id
join
  breeds b on d.breed_id = b.id
where
  d.status = 'available';

-- widok shelter_stats pokazujący statystyki schronisk
create view shelter_stats as
select
  s.id as shelter_id,
  s.name as shelter_name,
  s.city as shelter_city,
  count(d.id) as total_dogs,
  sum(case when d.status = 'available' then 1 else 0 end) as available_dogs,
  sum(case when d.status = 'adopted' then 1 else 0 end) as adopted_dogs
from
  shelters s
left join
  dogs d on s.id = d.shelter_id
group by
  s.id, s.name, s.city;

-- komentarze do widoków
comment on view dog_details is 'Szczegółowe informacje o psach, łącznie z rasą, schroniskiem i głównym zdjęciem';
comment on view dog_characteristics is 'Charakterystyka psów oparta na przypisanych tagach';
comment on view adoptable_dogs is 'Psy dostępne do adopcji';
comment on view shelter_stats is 'Statystyki schronisk dotyczące psów'; 
