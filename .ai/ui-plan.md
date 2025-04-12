# Architektura UI dla 10xShelter

## 1. Przegląd struktury UI

Architektura UI dla 10xShelter opiera się na minimalistycznym, przyjaznym interfejsie z pastelową zieloną paletą kolorów. Struktura UI uwzględnia potrzeby dwóch głównych grup użytkowników: osób poszukujących psów do adopcji oraz pracowników schronisk zarządzających danymi.

Główne założenia:

- Intuicyjny interfejs z wyraźnymi ścieżkami dla różnych typów użytkowników
- Responsywność dla urządzeń mobilnych i desktopowych
- Wsparcie dla języka polskiego jako jedynego obsługiwanego języka
- Zabezpieczenie dostępu do funkcji zarządzania
- Integracja z AI do dopasowywania psów

## 2. Lista widoków

### 2.1. Strona główna

- **Ścieżka**: `/`
- **Główny cel**: Wprowadzenie użytkownika do aplikacji, prezentacja misji i funkcji wyszukiwania
- **Kluczowe informacje**: Misja projektu, opis problemu, statystyki projektu
- **Kluczowe komponenty**:
  - Nagłówek z logo i przyciskami logowania/rejestracji
  - Duże, centralne pole wprowadzania prompta dla AI
  - Sekcja hero z opisem misji
  - Sekcja ze statystykami (liczba schronisk, psów, adopcji)
  - Wyszarzony skeleton grid w miejscu wyników dla niezalogowanych
  - Stopka z informacjami o projekcie
- **UX i dostępność**: Przyciski CTA dużych rozmiarów, wyraźne kontrasty kolorów, responsywność

### 2.2. Rejestracja

- **Ścieżka**: `/register`
- **Główny cel**: Rejestracja nowego użytkownika (pracownika schroniska)
- **Kluczowe informacje**: Formularz rejestracji
- **Kluczowe komponenty**:
  - Formularz z polami: email, hasło, pełne imię i nazwisko, telefon, rola
  - Przycisk rejestracji
  - Link do logowania dla istniejących użytkowników
- **UX i bezpieczeństwo**: Walidacja pól w czasie rzeczywistym, podpowiedzi dot. siły hasła, zabezpieczenie CSRF

### 2.3. Logowanie

- **Ścieżka**: `/login`
- **Główny cel**: Logowanie użytkownika
- **Kluczowe informacje**: Formularz logowania
- **Kluczowe komponenty**:
  - Formularz z polami: email, hasło
  - Przycisk logowania
  - Link do rejestracji i resetowania hasła
- **UX i bezpieczeństwo**: Obsługa błędów logowania przez toast, zabezpieczenie przed atakami brute-force

### 2.4. Wyniki wyszukiwania AI

- **Ścieżka**: `/search`
- **Główny cel**: Wyświetlenie psów dopasowanych przez AI do prompta użytkownika
- **Kluczowe informacje**: Lista dopasowanych psów z procentem dopasowania
- **Kluczowe komponenty**:
  - Pole prompta z wprowadzonym tekstem (edytowalne)
  - Przycisk ponownego wyszukiwania
  - Siatka kart psów (3 kolumny, max 12 wyników)
  - Każda karta: zdjęcie psa, imię, procent dopasowania
- **UX i dostępność**: Sortowanie od najlepiej dopasowanego, brak paginacji, komunikat przy braku wyników

### 2.5. Szczegóły psa

- **Ścieżka**: `/dogs/{id}`
- **Główny cel**: Wyświetlenie szczegółowych informacji o psie
- **Kluczowe informacje**: Zdjęcia psa, dane psa, informacje o schronisku
- **Kluczowe komponenty**:
  - Karuzela zdjęć psa
  - Sekcja z danymi psa (imię, rasa, wiek, płeć, waga, kolor, itd.)
  - Sekcja z informacjami o schronisku (nazwa, adres, kontakt)
  - Przycisk powrotu do wyników wyszukiwania
- **UX i dostępność**: Możliwość powiększenia zdjęć, wyraźne dane kontaktowe schroniska

### 2.6. Szczegóły schroniska

- **Ścieżka**: `/shelters/{id}`
- **Główny cel**: Wyświetlenie informacji o schronisku
- **Kluczowe informacje**: Dane schroniska, lista psów w schronisku
- **Kluczowe komponenty**:
  - Dane schroniska (nazwa, adres, telefon, email)
  - Lista psów dostępnych w schronisku jako karty
  - Mapa z lokalizacją schroniska (opcjonalnie)
- **UX i dostępność**: Wyraźne dane kontaktowe, czytelny układ informacji

### 2.7. Panel pracownika - wybór schroniska

- **Ścieżka**: `/employee/shelters`
- **Główny cel**: Wybór schroniska do zarządzania
- **Kluczowe informacje**: Lista dostępnych schronisk
- **Kluczowe komponenty**:
  - Karty schronisk z opisem
  - Przycisk dodawania nowego schroniska
  - Modal z formularzem dodawania schroniska
- **UX i bezpieczeństwo**: Dostęp tylko dla zalogowanych pracowników, zapamiętanie ostatnio wybranego schroniska

### 2.8. Panel pracownika - dodawanie schroniska

- **Ścieżka**: `/employee/shelters/add`
- **Główny cel**: Dodanie nowego schroniska do systemu
- **Kluczowe informacje**: Formularz dodawania schroniska
- **Kluczowe komponenty**:
  - Formularz z polami: nazwa, adres, miasto, kod pocztowy, telefon, email, opis
  - Przyciski zapisz/anuluj
- **UX i bezpieczeństwo**: Walidacja pól w czasie rzeczywistym, dostęp tylko dla zalogowanych pracowników

### 2.9. Panel pracownika - edycja schroniska

- **Ścieżka**: `/employee/shelters/{id}/edit`
- **Główny cel**: Edycja danych istniejącego schroniska
- **Kluczowe informacje**: Formularz edycji schroniska
- **Kluczowe komponenty**:
  - Formularz z wypełnionymi aktualnymi danymi schroniska
  - Przyciski zapisz/anuluj
- **UX i bezpieczeństwo**: Walidacja pól, komunikaty o błędach, dostęp tylko dla zalogowanych pracowników

### 2.10. Panel pracownika - lista psów

- **Ścieżka**: `/employee/shelters/{id}/dogs`
- **Główny cel**: Zarządzanie psami w schronisku
- **Kluczowe informacje**: Lista psów w schronisku
- **Kluczowe komponenty**:
  - Tabela psów z podstawowymi informacjami
  - Przyciski akcji dla każdego psa (edycja, zmiana statusu)
  - Przycisk dodawania nowego psa
  - Filtrowanie po statusie (dostępny/zaadoptowany)
- **UX i dostępność**: Czytelny układ tabeli, wyraźne przyciski akcji, komunikaty toast o sukcesie operacji

### 2.11. Panel pracownika - dodawanie psa

- **Ścieżka**: `/employee/shelters/{id}/dogs/add`
- **Główny cel**: Dodanie nowego psa do schroniska
- **Kluczowe informacje**: Formularz dodawania psa
- **Kluczowe komponenty**:
  - Długi formularz z danymi psa (imię, rasa, wiek, waga, kolor, płeć, opis)
  - Sekcja uploadu zdjęć z drag-and-drop
  - Przyciski zapisz/anuluj
- **UX i dostępność**: Walidacja pól, komunikaty o błędach, podgląd zdjęć przed uploadem

### 2.12. Panel pracownika - edycja psa

- **Ścieżka**: `/employee/shelters/{id}/dogs/{dogId}/edit`
- **Główny cel**: Edycja danych istniejącego psa
- **Kluczowe informacje**: Formularz edycji psa
- **Kluczowe komponenty**:
  - Formularz z wypełnionymi aktualnymi danymi psa
  - Sekcja zarządzania zdjęciami
  - Przyciski zapisz/anuluj
- **UX i dostępność**: Walidacja pól, komunikaty o błędach, podgląd istniejących zdjęć

### 2.13. Panel pracownika - statystyki

- **Ścieżka**: `/employee/shelters/{id}/stats`
- **Główny cel**: Wyświetlenie prostych statystyk wyświetleń psów
- **Kluczowe informacje**: Statystyki wyświetleń dla każdego psa
- **Kluczowe komponenty**:
  - Lista psów z liczbą wyświetleń
  - Prosty wykres popularności psów
- **UX i dostępność**: Czytelne dane statystyczne, możliwość sortowania po liczbie wyświetleń

## 3. Mapa podróży użytkownika

### 3.1. Osoba poszukująca psa do adopcji

1. **Wejście na stronę główną**

   - Użytkownik trafia na stronę główną z misją projektu i polem wyszukiwania
   - Może przeglądać podstawowe informacje o projekcie

2. **Wpisanie prompta w pole wyszukiwania**

   - Użytkownik opisuje jakiego psa szuka
   - System sprawdza czy użytkownik jest zalogowany

3. **Proces logowania/rejestracji (jeśli niezalogowany)**

   - Przekierowanie do strony logowania
   - Użytkownik loguje się lub wybiera rejestrację
   - Po zalogowaniu, powrót do wyszukiwania

4. **Wyświetlenie wyników wyszukiwania**

   - System prezentuje do 12 najlepiej dopasowanych psów
   - Dla każdego psa widoczne jest zdjęcie, imię i procent dopasowania

5. **Przeglądanie szczegółów psa**

   - Użytkownik klika na kartę psa aby zobaczyć szczegóły
   - System wyświetla karuzelę zdjęć i wszystkie dostępne informacje o psie
   - Widoczne są dane kontaktowe schroniska

6. **Przeglądanie schroniska**

   - Opcjonalne przejście do widoku schroniska
   - Sprawdzenie lokalizacji i danych kontaktowych
   - Przeglądanie innych psów dostępnych w schronisku

7. **Kontakt ze schroniskiem (poza aplikacją)**
   - Użytkownik kontaktuje się ze schroniskiem przy użyciu danych kontaktowych

### 3.2. Pracownik schroniska

1. **Rejestracja i logowanie**

   - Wejście na stronę główną
   - Przejście do formularza rejestracji
   - Wypełnienie danych i utworzenie konta
   - Logowanie do systemu

2. **Wybór/dodanie schroniska**

   - Po zalogowaniu przejście do panelu wyboru schroniska
   - Wybór istniejącego schroniska lub dodanie nowego

3. **Zarządzanie psami w schronisku**

   - Przeglądanie listy psów
   - Dodawanie nowych psów
   - Edycja danych istniejących psów
   - Zmiana statusu psów (dostępny/zaadoptowany)

4. **Przeglądanie statystyk**
   - Analiza popularności psów
   - Sprawdzanie liczby wyświetleń poszczególnych psów

## 4. Układ i struktura nawigacji

### 4.1. Nawigacja główna (dla wszystkich użytkowników)

- **Lewa strona nagłówka**:

  - Logo 10xShelter (link do strony głównej)

- **Prawa strona nagłówka**:
  - Dla niezalogowanych: Przyciski "Zaloguj się" i "Zarejestruj się"
  - Dla zalogowanych: Menu użytkownika (avatar i nazwa użytkownika)

### 4.2. Menu użytkownika (rozwijane)

- **Dla zwykłych użytkowników**:

  - Strona główna
  - Profil użytkownika
  - Wyloguj

- **Dla pracowników schronisk**:
  - Strona główna
  - Panel pracownika
  - Profil użytkownika
  - Wyloguj

### 4.3. Nawigacja panelu pracownika (sidebar)

- Wybór schroniska (z listy ostatnio wybranych)
- Zarządzanie schroniskiem
  - Edycja danych schroniska
  - Lista psów
  - Dodaj psa
  - Statystyki

### 4.4. Nawigacja kontekstowa

- Ścieżka nawigacyjna (breadcrumbs) pokazująca aktualną lokalizację w aplikacji
- Przyciski powrotu do poprzedniego widoku
- Linki kontekstowe (np. przejście od szczegółów psa do schroniska)

## 5. Kluczowe komponenty

### 5.1. Pole wyszukiwania AI

Pole tekstowe przeznaczone do wpisywania prompta opisującego poszukiwanego psa. Zawiera podpowiedzi i przykłady, jak formułować zapytanie, oraz przycisk do uruchomienia wyszukiwania.

### 5.2. Karta psa

Komponent prezentujący podstawowe informacje o psie - zdjęcie, imię oraz procent dopasowania (w wynikach wyszukiwania). Klikalna, prowadzi do widoku szczegółowego psa.

### 5.3. Karuzela zdjęć

Komponent do wyświetlania wielu zdjęć psa w formie przewijanej karuzeli. Umożliwia powiększenie zdjęć i nawigację między nimi.

### 5.4. Karta schroniska

Prezentuje podstawowe informacje o schronisku - nazwę, lokalizację i liczby psów. Używana w panelu pracownika do wyboru schroniska.

### 5.5. Formularz dodawania/edycji psa

Długi formularz zawierający wszystkie pola niezbędne do wprowadzenia danych psa, wraz z sekcją uploadu zdjęć obsługującą drag-and-drop.

### 5.6. Formularz dodawania/edycji schroniska

Formularz do wprowadzania danych schroniska z walidacją w czasie rzeczywistym.

### 5.7. Tabela psów

Komponent wyświetlający listę psów w schronisku z opcjami sortowania i filtrowania. Zawiera przyciski akcji dla każdego psa.

### 5.8. Toast powiadomień

System powiadomień wyświetlający komunikaty o sukcesie, błędach i innych zdarzeniach w formie nakładek.

### 5.9. Menu użytkownika

Rozwijane menu z opcjami dostępnymi dla zalogowanego użytkownika.

### 5.10. Sidebar nawigacyjny

Boczny panel nawigacyjny używany w panelu pracownika, zapewniający szybki dostęp do różnych sekcji zarządzania.
