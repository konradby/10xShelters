
<conversation_summary>
<decisions>
1. Użytkownikami aplikacji są osoby poszukujące psów oraz pracownicy schronisk zarządzający danymi.
2. Informacje o psach obejmują: imię, rasę, wielkość, wagę, kolor, typ sierści, zdjęcia, temperament i cechy charakteru.
3. Integracja z AI opiera się na prostym pytaniu otwartym, gdzie użytkownik opisuje poszukiwanego psa.
4. System będzie dostępny tylko w języku polskim.
5. Interfejs użytkownika będzie prosty i minimalistyczny, oparty na bibliotece Tailwind.
6. Technologie: Next.js (frontend), Nest.js (backend), PostgreSQL (baza danych).
7. Weryfikacja danych wprowadzanych przez schroniska będzie opierać się na prostej walidacji i odpowiedzialności pracowników.
8. Operacje dla pracowników schronisk: tworzenie/modyfikacja/usuwanie schronisk, dodawanie psów.
9. Pomiar skuteczności poprzez śledzenie wejść w profil psa po dopasowaniu przez AI.
10. Brak monetyzacji w MVP, ewentualnie system dobrowolnych dotacji w przyszłości.
11. Na profilu psa będą widoczne dane kontaktowe schroniska (email, telefon, nazwa, adres).
12. Termin wdrożenia MVP: do 1 maja, dalszy rozwój zależny od feedbacku.
13. Aplikacja ma służyć jedynie do skomunikowania użytkownika ze schroniskiem, bez obsługi procesu adopcji.
14. Po adopcji status psa będzie zmieniany na "zaadoptowany".
15. Zbieranie opinii użytkowników będzie realizowane bezpośrednio przez schroniska w momencie adopcji.
</decisions>

<matched_recommendations>
1. Stworzenie map ścieżek użytkownika (user journey) dla dwóch głównych typów użytkowników: osób szukających psów i pracowników schronisk.
2. Zdefiniowanie minimalnego zestawu danych o psie koniecznego do skutecznego dopasowania przez AI.
3. Zaprojektowanie prostego, intuicyjnego interfejsu dla obsługi schronisk, umożliwiającego łatwe zarządzanie informacjami o psach.
4. Opracowanie algorytmu rekomendacji opartego na AI z wykorzystaniem opisów wprowadzanych przez użytkowników.
5. Wprowadzenie monitorowania aktywności użytkowników do pomiaru wskaźników sukcesu.
6. Zaprojektowanie architektury systemu z myślą o przyszłej skalowalności.
7. Stworzenie prostego kreatora dopasowania dla użytkowników poszukujących psów.
8. Zdefiniowanie modelu danych z uwzględnieniem przyszłej rozbudowy funkcjonalności.
9. Optymalizacja interfejsu dla urządzeń mobilnych.
10. Implementacja mechanizmu prostego feedbacku po interakcji z systemem.
</matched_recommendations>

<prd_planning_summary>
Projekt 10xShelter to aplikacja służąca jako centralna baza danych psów ze schronisk w całej Polsce, mająca na celu ułatwienie adopcji zamiast kupowania psów rasowych. MVP koncentruje się na podstawowych funkcjonalnościach umożliwiających schroniskom dodawanie psów oraz użytkownikom znajdowanie odpowiednich czworonogów.

Główne wymagania funkcjonalne:
- System zarządzania psami (dodawanie, edycja, przeglądanie, usuwanie) dla pracowników schronisk
- Prosty system kont użytkowników dla pracowników schronisk
- Profile schronisk zawierające dane kontaktowe
- Integracja z AI dobierająca psy na podstawie opisów użytkowników
- System statusów psów (dostępny/zaadoptowany)

Kluczowe historie użytkownika:
1. Jako osoba poszukująca psa, chcę opisać jakiego psa szukam, aby system dopasował najbardziej odpowiednie zwierzęta
2. Jako osoba poszukująca psa, chcę zobaczyć szczegółowe informacje o dopasowanym psie i dane kontaktowe schroniska
3. Jako pracownik schroniska, chcę łatwo dodawać i aktualizować informacje o psach w moim schronisku
4. Jako pracownik schroniska, chcę aktualizować status psa po jego adopcji
5. Jako pracownik schroniska, chcę zarządzać danymi kontaktowymi schroniska

Technologicznie, system będzie zbudowany na Next.js (frontend), Nest.js (backend) i PostgreSQL (baza danych), z prostym i minimalistycznym interfejsem użytkownika opartym na bibliotece Tailwind. System będzie dostępny wyłącznie w języku polskim.

Kryteria sukcesu obejmują:
- 90% użytkowników uzupełniających informacje o poszukiwanym psie
- 75% schronisk dodających swoje psy do systemu
- Poprawne działanie testów e2e bez błędów timeout

Termin wdrożenia MVP ustalono na 1 maja, a dalszy rozwój będzie zależeć od opinii użytkowników zbieranych przez schroniska podczas procesu adopcji.
</prd_planning_summary>

<unresolved_issues>
1. Brak szczegółów dotyczących konkretnego modelu AI do wykorzystania w procesie dopasowywania psów.
2. Nie określono dokładnych metryk retencji użytkowników.
3. Brak szczegółowego procesu dodawania nowego schroniska do systemu i weryfikacji jego danych.
4. Nie określono dokładnych uprawnień administratorów systemu w porównaniu do pracowników schronisk.
5. Brak informacji o częstotliwości aktualizacji danych o psach przez schroniska.
6. Nie zdefiniowano mechanizmu wykrywania duplikatów psów lub schronisk.
7. Brak szczegółów na temat testowania użyteczności przed pełnym wdrożeniem.
8. Nie określono strategii skalowania systemu w przypadku dużego sukcesu.
</unresolved_issues>
</conversation_summary>
