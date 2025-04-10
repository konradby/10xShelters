# Dokument wymagań produktu (PRD) - 10xShelter

## 1. Przegląd produktu

10xShelter to aplikacja będąca centralną bazą danych psów ze schronisk w całej Polsce. System ma na celu ułatwienie adopcji psów ze schronisk, zamiast kupowania psów rasowych.

Aplikacja łączy dwie główne grupy użytkowników:

- Osoby poszukujące psów do adopcji
- Pracowników schronisk zarządzających danymi o psach i schroniskach

Główne funkcje produktu obejmują:

- System zarządzania informacjami o psach (dodawanie, edycja, przeglądanie, usuwanie)
- Prosty system kont użytkowników dla pracowników schronisk
- Profile schronisk z danymi kontaktowymi
- Integrację z AI do dopasowywania psów do potrzeb potencjalnych właścicieli
- Śledzenie statusu psów (dostępny/zaadoptowany)

Technologia:

- Frontend: Next.js z interfejsem opartym na bibliotece Tailwind
- Backend: Nest.js
- Baza danych: PostgreSQL
- Język aplikacji: polski

## 2. Problem użytkownika

Ludzie coraz częściej szukają psów jako swoich towarzyszy życia. Niestety, często decydują się na kupno konkretnej rasy zamiast poszukać w schroniskach. Głównym powodem tego zjawiska jest brak jednej centralnej bazy danych z psami z różnych schronisk z całego kraju.

Problemy z perspektywy potencjalnych właścicieli:

- Trudność w znalezieniu odpowiedniego psa w schroniskach bez odwiedzania wielu lokalizacji
- Brak informacji o dostępnych psach w różnych schroniskach w jednym miejscu
- Trudność w dopasowaniu psa do swoich potrzeb i stylu życia

Problemy z perspektywy schronisk:

- Ograniczona widoczność psów dostępnych do adopcji
- Trudności w zarządzaniu informacjami o psach w schronisku
- Brak skutecznego narzędzia do prezentacji swoich podopiecznych potencjalnym właścicielom

## 3. Wymagania funkcjonalne

### 3.1 Zarządzanie danymi o psach

- Zapisywanie informacji o psie (imię, rasa, wielkość, waga, kolor, typ sierści, zdjęcia, temperament, cechy charakteru)
- Odczytywanie i przeglądanie informacji o psach
- Aktualizacja informacji o psach
- Usuwanie informacji o psach
- Zarządzanie statusem psa (dostępny/zaadoptowany)

### 3.2 Zarządzanie schroniskami

- Dodawanie informacji o schronisku
- Edycja danych schroniska (nazwa, adres, dane kontaktowe)
- Przeglądanie profilu schroniska
- Lista psów w danym schronisku

### 3.3 System kont użytkowników

- Rejestracja kont dla pracowników schronisk
- Logowanie użytkowników
- Wybór schroniska do zarządzania po zalogowaniu
- Zarządzanie uprawnieniami użytkowników

### 3.4 Integracja z AI

- Przyjmowanie opisów tekstowych od użytkowników poszukujących psów
- Analiza tekstu przez system AI
- Prezentacja psów dopasowanych do wymagań użytkownika
- Wskazanie procentowego dopasowania psa do wymagań

### 3.5 Interfejs użytkownika

- Prosty, minimalistyczny interfejs dla wszystkich typów użytkowników
- Responsywność dla urządzeń mobilnych i desktopowych
- Dostosowanie do języka polskiego

## 4. Granice produktu

W zakres MVP NIE wchodzą:

- Ograniczanie dostępu pracowników schronisk do konkretnych schronisk - po zalogowaniu użytkownik wybiera schronisko, którym chce zarządzać
- Bogata obsługa i analiza multimediów (zdjęcia i filmy psiaków)
- Zaawansowane filtrowanie psiaków po wielu cechach typu: wiek, rasa, usposobienie, temperament, płeć, cechy charakterystyczne
- System powiadomień dla użytkowników poszukujących psiaki
- Obsługa procesu adopcji (aplikacja służy jedynie do skomunikowania użytkownika ze schroniskiem)
- Monetyzacja (ewentualnie system dobrowolnych dotacji w przyszłości)
- Wielojęzyczność (system będzie dostępny tylko w języku polskim)
- Wsparcie dla innych zwierząt poza psami

## 5. Historyjki użytkowników

### US-001

Tytuł: Rejestracja konta pracownika schroniska

Opis: Jako pracownik schroniska, chcę się zarejestrować w systemie, aby móc zarządzać informacjami o psach.

Kryteria akceptacji:

- Możliwość utworzenia konta poprzez podanie adresu email, hasła i podstawowych danych osobowych
- Weryfikacja poprawności adresu email
- Potwierdzenie rejestracji przez email
- Możliwość zalogowania się po rejestracji

### US-002

Tytuł: Logowanie użytkownika

Opis: Jako pracownik schroniska, chcę zalogować się do systemu, aby zarządzać informacjami o psach.

Kryteria akceptacji:

- Formularz logowania z polami email i hasło
- Komunikat o błędzie przy niepoprawnych danych
- Możliwość resetowania hasła
- Przekierowanie do panelu zarządzania po udanym logowaniu

### US-003

Tytuł: Wybór schroniska do zarządzania

Opis: Jako pracownik schroniska, po zalogowaniu chcę wybrać schronisko, którym będę zarządzać.

Kryteria akceptacji:

- Lista dostępnych schronisk po zalogowaniu
- Możliwość wyboru schroniska z listy
- Możliwość dodania nowego schroniska, jeśli nie ma go na liście
- Zapamiętanie ostatnio wybranego schroniska

### US-004

Tytuł: Dodawanie nowego schroniska

Opis: Jako pracownik schroniska, chcę dodać nowe schronisko do systemu, aby móc nim zarządzać.

Kryteria akceptacji:

- Formularz dodawania schroniska z polami: nazwa, adres, dane kontaktowe (telefon, email)
- Walidacja wprowadzonych danych
- Komunikat o sukcesie po dodaniu schroniska
- Dodane schronisko pojawia się na liście dostępnych schronisk

### US-005

Tytuł: Edycja danych schroniska

Opis: Jako pracownik schroniska, chcę edytować dane schroniska, aby utrzymać aktualne informacje.

Kryteria akceptacji:

- Formularz edycji z wypełnionymi aktualnymi danymi schroniska
- Możliwość zmiany wszystkich pól
- Zapisanie zmian i aktualizacja profilu schroniska
- Komunikat o sukcesie po aktualizacji danych

### US-006

Tytuł: Dodawanie nowego psa

Opis: Jako pracownik schroniska, chcę dodać nowego psa do bazy danych, aby zwiększyć jego szanse na adopcję.

Kryteria akceptacji:

- Formularz dodawania psa z polami: imię, rasa, wielkość, waga, kolor, typ sierści, temperament, cechy charakteru
- Możliwość dodania zdjęcia psa
- Automatyczne przypisanie psa do wybranego schroniska
- Domyślny status psa: "dostępny"
- Komunikat o sukcesie po dodaniu psa

### US-007

Tytuł: Edycja informacji o psie

Opis: Jako pracownik schroniska, chcę edytować informacje o psie, aby utrzymać aktualne dane.

Kryteria akceptacji:

- Dostęp do listy psów w zarządzanym schronisku
- Formularz edycji z wypełnionymi aktualnymi danymi psa
- Możliwość zmiany wszystkich pól
- Zapisanie zmian i aktualizacja profilu psa
- Komunikat o sukcesie po aktualizacji danych

### US-008

Tytuł: Usuwanie psa z bazy danych

Opis: Jako pracownik schroniska, chcę usunąć psa z bazy danych, gdy dane są nieaktualne lub błędne.

Kryteria akceptacji:

- Możliwość usunięcia psa z listy psów w schronisku
- Prośba o potwierdzenie przed usunięciem
- Komunikat o sukcesie po usunięciu psa
- Usunięty pies nie jest widoczny w systemie

### US-009

Tytuł: Zmiana statusu psa po adopcji

Opis: Jako pracownik schroniska, chcę zmienić status psa na "zaadoptowany" po jego adopcji.

Kryteria akceptacji:

- Możliwość zmiany statusu psa z "dostępny" na "zaadoptowany"
- Prośba o potwierdzenie przed zmianą statusu
- Komunikat o sukcesie po zmianie statusu
- Pies ze statusem "zaadoptowany" nie jest pokazywany w wynikach wyszukiwania dla użytkowników poszukujących psów

### US-010

Tytuł: Przeglądanie listy psów w schronisku

Opis: Jako pracownik schroniska, chcę zobaczyć listę wszystkich psów w moim schronisku.

Kryteria akceptacji:

- Lista psów z podstawowymi informacjami (imię, rasa, status)
- Możliwość sortowania listy po różnych parametrach
- Możliwość filtrowania listy po statusie psa
- Dostęp do szczegółowych informacji o psie po kliknięciu

### US-011

Tytuł: Opisanie wymagań dotyczących psa

Opis: Jako osoba poszukująca psa, chcę opisać jakiego psa szukam, aby system dopasował najlepsze opcje.

Kryteria akceptacji:

- Pole tekstowe do wprowadzenia opisu poszukiwanego psa
- Instrukcje pomocnicze jak najlepiej opisać poszukiwanego psa
- Przycisk do uruchomienia wyszukiwania
- Odpowiednia obsługa błędów przy pustym opisie

### US-012

Tytuł: Przeglądanie dopasowanych psów

Opis: Jako osoba poszukująca psa, chcę zobaczyć listę psów dopasowanych do moich wymagań.

Kryteria akceptacji:

- Lista psów dopasowanych przez AI do opisu
- Wskaźnik procentowy dopasowania dla każdego psa
- Podstawowe informacje o każdym psie na liście
- Możliwość sortowania listy według stopnia dopasowania

### US-013

Tytuł: Przeglądanie szczegółów profilu psa

Opis: Jako osoba poszukująca psa, chcę zobaczyć szczegółowe informacje o konkretnym psie.

Kryteria akceptacji:

- Szczegółowy profil psa zawierający wszystkie dostępne informacje
- Zdjęcie psa (jeśli dostępne)
- Dane kontaktowe schroniska, w którym przebywa pies
- Możliwość powrotu do listy dopasowanych psów

### US-014

Tytuł: Przeglądanie profilu schroniska

Opis: Jako osoba poszukująca psa, chcę zobaczyć informacje o schronisku, w którym przebywa pies.

Kryteria akceptacji:

- Szczegółowy profil schroniska zawierający wszystkie dostępne informacje
- Dane kontaktowe schroniska (adres, telefon, email)
- Lista psów dostępnych w danym schronisku
- Możliwość powrotu do profilu psa

### US-015

Tytuł: Zabezpieczenie dostępu do panelu zarządzania

Opis: Jako administrator systemu, chcę zabezpieczyć dostęp do panelu zarządzania, aby tylko uprawnione osoby mogły modyfikować dane.

Kryteria akceptacji:

- Wymuszenie logowania przed dostępem do funkcji zarządzania
- Automatyczne wylogowanie po określonym czasie nieaktywności
- Ograniczenie dostępu do funkcji zarządzania dla niezalogowanych użytkowników
- Prawidłowe zabezpieczenie API przed nieautoryzowanym dostępem

## 6. Metryki sukcesu

### 6.1 Metryki adopcji

- 90% użytkowników uzupełnia informację na temat poszukiwanego psiaka
- 75% schronisk dodaje swoje psiaki do systemu

### 6.2 Metryki zaangażowania

- Liczba wejść w profil psa po dopasowaniu przez AI
- Liczba schronisk aktywnie korzystających z systemu (aktualizujących dane)
- Częstotliwość aktualizacji danych o psach przez schroniska

### 6.3 Metryki techniczne

- Poprawne działanie testów e2e bez błędów timeout
- Czas odpowiedzi API poniżej 1 sekundy
- Dostępność systemu na poziomie 99.9%

### 6.4 Metryki biznesowe

- Liczba kontaktów ze schroniskami zainicjowanych przez aplikację
- Wzrost liczby adopcji w schroniskach korzystających z systemu (dane zbierane przez schroniska)
