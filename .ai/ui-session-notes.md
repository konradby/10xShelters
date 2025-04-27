# Notatki z sesji planowania UI - 10xShelter

## Decyzje podjęte podczas sesji

1. Interfejs będzie przyjazny wizualnie, z pastelową zieloną paletą kolorów.
2. Strona główna będzie zawierała misję, opis problemu i krótkie statystyki projektu.
3. Wyniki wyszukiwania będą prezentowane jako siatka kart (3 kolumny), zawierające zdjęcie, imię psa i procent dopasowania.
4. Niezalogowany użytkownik zobaczy wyszukiwarkę, ale po wpisaniu prompta zostanie poproszony o zalogowanie.
5. Zalogowany pracownik schroniska będzie widział schroniska i psy do nich należące.
6. Zalogowany użytkownik będzie widział pieski, schroniska, a prompt do wyszukiwania będzie na pierwszym planie.
7. Wystarczy procentowe dopasowanie psów bez szczegółowego wyjaśnienia powodów.
8. Formularz dodawania psa będzie jednym długim formularzem.
9. Wybór schroniska przez pracownika będzie w formie kart z opisem.
10. Nie będzie zaawansowanych filtrów wyszukiwania.
11. Zdjęcia psów będą prezentowane jako karuzela.
12. Wyświetlane będą wszystkie dostępne informacje o schronisku.
13. Nie będzie funkcji "Ulubione psy".
14. Zuploadowane zdjęcia otrzymają swoje ID oraz URL.
15. Powiadomienia o błędach będą wyświetlane jako toasty.
16. Będą proste statystyki wyświetleń psów dla pracowników schronisk.
17. Przy nieprecyzyjnym promptcie system i tak spróbuje dopasować psy, a prompt będzie edytowalny po wyszukiwaniu.
18. Nie będzie zapisywania historii wyszukiwań.
19. Wyświetlanych będzie tylko 12 najlepiej dopasowanych psów, bez paginacji.
20. Nie będzie widgetów social media do udostępniania profili psów.
21. Sortowanie wyników będzie domyślnie od najlepiej dopasowanego, bez możliwości zmiany.
22. Nie będzie bezpośredniego kontaktu ze schroniskiem przez aplikację, tylko wyświetlanie danych kontaktowych.

## Architektura UI

### Ogólna koncepcja

Architektura UI dla MVP 10xShelter będzie przyjazna, z wykorzystaniem pastelowej zielonej palety kolorów. Interfejs będzie minimalistyczny, ale zawierający wszystkie niezbędne funkcje dla obu grup użytkowników: osób poszukujących psów do adopcji oraz pracowników schronisk.

### Kluczowe widoki i przepływy

#### Strona główna

- Duże, centralne pole wprowadzania prompta dla AI
- Sekcje informacyjne: misja projektu, opis problemu i statystyki
- Różne widoki dla zalogowanych i niezalogowanych użytkowników
- Niezalogowani użytkownicy po wpisaniu prompta będą proszeni o zalogowanie (wyświetlany przycisk logowania)
- W miejscu wyników dla niezalogowanych użytkowników - wyszarzony skeleton grid

#### Panel użytkownika poszukującego psa

- Wyszukiwarka z promptem na pierwszym planie
- Wyniki wyszukiwania jako siatka kart (3 kolumny)
- Każda karta zawiera: zdjęcie psa, imię i procent dopasowania
- Wyświetlanych tylko 12 najlepiej dopasowanych psów
- Sortowanie wyników od najlepiej dopasowanego (bez możliwości zmiany)
- Widok szczegółowy psa z karuzelą zdjęć
- Wyeksponowane dane kontaktowe schroniska

#### Panel pracownika schroniska

- Widok wyboru schroniska w formie kart z opisem
- Dashboard z listą psów należących do schroniska
- Możliwość dodawania nowych psów (jednolity długi formularz)
- Prosty interfejs uploadu zdjęć (zdjęcia otrzymują ID i URL po przesłaniu)
- Podstawowe statystyki wyświetleń profili psów
- Zarządzanie statusem psów (dostępny/zaadoptowany)

### Integracja z API i zarządzanie stanem

- Komunikacja z endpointami API zgodnie z planem API
- Wykorzystanie tokenów JWT z Supabase Auth dla uwierzytelniania
- Obsługa błędów API przez system toastów
- Stan aplikacji zarządzany lokalnie, bez zapisywania historii wyszukiwań
- Prompt AI edytowalny po zakończeniu wyszukiwania dla doprecyzowania

### Responsywność i dostępność

- Interfejs responsywny dla urządzeń mobilnych i desktopowych
- Priorytet dla zdjęć psów w widoku mobilnym
- UI dostosowane do języka polskiego (jedyny obsługiwany język)
- Zapewnienie podstawowej dostępności zgodnie z WCAG

### Bezpieczeństwo

- Integracja z mechanizmami uwierzytelniania Supabase
- Odpowiednie zarządzanie tokenami JWT
- Ograniczenie dostępu do funkcji zarządzania dla niezalogowanych użytkowników
- Zabezpieczenie endpointów API przed nieautoryzowanym dostępem

## Nierozwiązane kwestie

1. Brak szczegółów dotyczących dokładnego wyglądu i zachowania formularza rejestracji/logowania (modal vs osadzona strona).
2. Nie ustalono jak dokładnie będzie wyglądał proces upload'u zdjęć przy dodawaniu/edycji psa.
3. Nie określono doświadczenia użytkownika podczas przechodzenia między widokiem listy psów a widokiem szczegółowym pojedynczego psa.
4. Brak szczegółowych wytycznych dotyczących animacji i przejść między różnymi widokami aplikacji.
5. Nie omówiono szczegółowego layoutu footera i nagłówka na różnych stronach aplikacji.
