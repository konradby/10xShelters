<conversation_summary>
<decisions>
Pracownicy schronisk mogą być przypisani do wielu schronisk.
System będzie śledzić tylko aktualny status psów (bez historii zmian).
Cechy charakteru psów będą przechowywane jako dowolne tagi tworzone przez pracowników schronisk.
System będzie wykorzystywać osobną tabelę ras z cechami ras psów.
System będzie przechowywać informacje o aktualnych/poprzednich właścicielach psów.
Zdjęcia psów będą przechowywane jako ścieżki do plików (domena dla storage w .env backendu).
Każdy pies może mieć wiele zdjęć (bez wersjonowania).
System będzie zapisywać wyszukiwania i dopasowania AI oraz śledzić, które wyniki zostały kliknięte.
Historia wyszukiwań i dopasowań AI będzie przechowywana bezterminowo.
Użytkownicy będą mieli role: "employee" (pracownicy schronisk) i "user" (pozostali).
Logowanie będzie realizowane przez Google Auth.
System będzie śledzić, które psy zostały zaadoptowane przez którego właściciela.
W mechanizmie AI najważniejsze jest dopasowanie cech rasy, wielkości psa itp. do podanego prompta.
Pracownicy schronisk mogą edytować dane wszystkich schronisk, do których są przypisani.
System nie wymaga mechanizmu powiadomień.
</decisions>

<matched_recommendations>
Utworzenie tabeli profiles rozszerzającej standardową tabelę auth.users Supabase z polem role typu enum ('employee', 'user').
Utworzenie tabeli shelters zawierającej informacje o schroniskach.
Implementacja tabeli shelter_employees do zarządzania relacją wielu-do-wielu między pracownikami a schroniskami.
Utworzenie tabeli breeds zawierającej zdefiniowane rasy psów z kolumnami dla wszystkich cech (wielkość, długość sierści, temperament, itd.).
Utworzenie tabeli dogs z podstawowymi informacjami o psach, kluczami obcymi do rasy i schroniska oraz statusem (dostępny/zaadoptowany).
Implementacja tabeli dog_images do przechowywania ścieżek do zdjęć psów z relacją jeden-do-wielu do tabeli dogs.
Wdrożenie systemu tagów dla cech charakteru psów z tabelami tags i dog_tags (relacja wielu-do-wielu).
Utworzenie tabeli adoptions do śledzenia adopcji, zawierającej referencje do psa i właściciela.
Implementacja tabel ai_searches i ai_matches do przechowywania wyszukiwań użytkowników i wyników dopasowań AI.
Implementacja polityk RLS w Supabase dla kontroli dostępu na podstawie ról użytkowników.
Wykorzystanie indeksów dla pól często używanych w wyszukiwaniach (status psa, rasa, tagi).
Implementacja wyzwalaczy do aktualizacji statusu psa przy dodaniu rekordu do tabeli adoptions.
Utworzenie widoków dla często wykonywanych zapytań.
</matched_recommendations>

<database_planning_summary>
Na podstawie wymagań produktu i odpowiedzi na pytania, schemat bazy danych dla MVP aplikacji 10xShelter będzie oparty na Supabase z PostgreSQL. System będzie obsługiwał dwie główne grupy użytkowników: pracowników schronisk i osoby poszukujące psów do adopcji.
Kluczowe encje w systemie to:
Użytkownicy (profiles) - rozszerzenie standardowej tabeli auth.users Supabase, z podziałem na role "employee" i "user", wykorzystujące autentykację Google.
Schroniska (shelters) - przechowujące podstawowe informacje o schroniskach, takie jak nazwa, adres i dane kontaktowe.
Psy (dogs) - centralna encja zawierająca informacje o psach, ich statusie (dostępny/zaadoptowany) oraz powiązania ze schroniskiem i rasą.
Rasy (breeds) - tabela zawierająca informacje o rasach psów i ich cechach charakterystycznych, takich jak wielkość, typ sierści, temperament, itp.
Zdjęcia psów (dog_images) - przechowujące ścieżki do zdjęć psów, z relacją jeden-do-wielu z tabelą psów.
Tagi (tags i dog_tags) - system do elastycznego opisywania cech charakteru psów przez pracowników schronisk.
Adopcje (adoptions) - śledzenie adopcji psów przez właścicieli.
Wyszukiwania AI (ai_searches i ai_matches) - przechowywanie promptów użytkowników, wyników dopasowań oraz śledzenie klikniętych wyników.
Główne relacje między encjami:
Pracownicy schronisk mogą być przypisani do wielu schronisk (relacja wiele-do-wielu poprzez tabelę pośrednią)
Każdy pies jest przypisany do jednego schroniska i jednej rasy
Każdy pies może mieć wiele zdjęć i wiele tagów opisujących jego cechy charakteru
Każdy pies może być zaadoptowany przez jednego właściciela
Każde wyszukiwanie AI może generować wiele dopasowań
Bezpieczeństwo będzie realizowane poprzez Row Level Security (RLS) w Supabase, zapewniające, że pracownicy schronisk mogą modyfikować tylko dane psów w schroniskach, do których są przypisani.
Dla optymalizacji wydajności zaleca się indeksowanie często wyszukiwanych pól oraz utworzenie widoków dla często wykonywanych zapytań.
</database_planning_summary>

<unresolved_issues>
Szczegółowa implementacja modelu procentowego dopasowania w systemie AI - jak dokładnie będą przeliczane i przechowywane wartości procentowe dopasowań.
Dokładna struktura i implementacja pełnotekstowego wyszukiwania dla promptów AI.
Szczegółowe polityki RLS dla różnych operacji i typów użytkowników.
Strategie optymalizacji wydajności dla dużej liczby zapisanych wyszukiwań i dopasowań AI.
Dokładna definicja struktury i typów danych dla przechowywania cech ras psów.
</unresolved_issues>
</conversation_summary>
