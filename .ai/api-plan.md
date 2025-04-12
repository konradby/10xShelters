# REST API Plan

## 1. Zasoby

### Profiles

- Tabela: `profiles`
- Opis: Zarządzanie kontami użytkowników

### Shelters

- Tabela: `shelters`
- Opis: Zarządzanie schroniskami

### Dogs

- Tabela: `dogs`
- Opis: Zarządzanie psami

### Breeds

- Tabela: `breeds`
- Opis: Zarządzanie rasami psów

### Dog Images

- Tabela: `dog_images`
- Opis: Zarządzanie zdjęciami psów

## 2. Punkty końcowe

### Authentication

#### Register User

- Method: POST
- Path: `/auth/register`
- Description: Rejestracja nowego użytkownika
- Request Body:

```json
{
  "email": "string",
  "password": "string",
  "full_name": "string",
  "phone": "string",
  "role": "employee|user"
}
```

- Response (201):

```json
{
  "id": "uuid",
  "email": "string",
  "full_name": "string",
  "role": "string"
}
```

#### Login

- Method: POST
- Path: `/auth/login`
- Description: Logowanie użytkownika
- Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

- Response (200):

```json
{
  "access_token": "string",
  "refresh_token": "string",
  "user": {
    "id": "uuid",
    "email": "string",
    "role": "string"
  }
}
```

### Shelters

#### List Shelters

- Method: GET
- Path: `/shelters`
- Description: Lista schronisk
- Query Parameters:
  - page: number
  - limit: number
  - city: string
  - active: boolean
- Response (200):

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "city": "string",
      "active": boolean
    }
  ],
  "meta": {
    "total": number,
    "page": number,
    "limit": number
  }
}
```

#### Get Shelter

- Method: GET
- Path: `/shelters/{id}`
- Description: Szczegóły schroniska
- Response (200):

```json
{
  "id": "uuid",
  "name": "string",
  "address": "string",
  "city": "string",
  "postal_code": "string",
  "phone": "string",
  "email": "string",
  "description": "string",
  "active": boolean
}
```

#### Create Shelter

- Method: POST
- Path: `/shelters`
- Description: Tworzenie nowego schroniska
- Request Body:

```json
{
  "name": "string",
  "address": "string",
  "city": "string",
  "postal_code": "string",
  "phone": "string",
  "email": "string",
  "description": "string"
}
```

- Response (201):

```json
{
  "id": "uuid",
  "name": "string",
  "address": "string",
  "city": "string",
  "postal_code": "string",
  "phone": "string",
  "email": "string",
  "description": "string",
  "active": true
}
```

### Dogs

#### List Dogs

- Method: GET
- Path: `/dogs`
- Description: Lista psów
- Query Parameters:
  - page: number
  - limit: number
  - shelter_id: uuid
  - breed_id: uuid
  - status: available|adopted
  - gender: male|female
  - size: small|medium|large
- Response (200):

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "breed": {
        "id": "uuid",
        "name": "string",
        "size": "string"
      },
      "shelter": {
        "id": "uuid",
        "name": "string",
        "city": "string"
      },
      "status": "string",
      "primary_image": "string"
    }
  ],
  "meta": {
    "total": number,
    "page": number,
    "limit": number
  }
}
```

#### Get Dog

- Method: GET
- Path: `/dogs/{id}`
- Description: Szczegóły psa
- Response (200):

```json
{
  "id": "uuid",
  "name": "string",
  "breed": {
    "id": "uuid",
    "name": "string",
    "size": "string",
    "coat_type": "string",
    "shedding_level": number
  },
  "shelter": {
    "id": "uuid",
    "name": "string",
    "address": "string",
    "city": "string",
    "phone": "string",
    "email": "string"
  },
  "approximate_age": "string",
  "weight": number,
  "color": "string",
  "gender": "string",
  "status": "string",
  "description": "string",
  "images": [
    {
      "id": "uuid",
      "url": "string",
      "is_primary": boolean
    }
  ]
}
```

#### Create Dog

- Method: POST
- Path: `/dogs`
- Description: Dodawanie nowego psa
- Request Body:

```json
{
  "name": "string",
  "shelter_id": "uuid",
  "breed_id": "uuid",
  "approximate_age": "string",
  "weight": number,
  "color": "string",
  "gender": "male|female",
  "description": "string"
}
```

- Response (201):

```json
{
  "id": "uuid",
  "name": "string",
  "status": "available"
}
```

#### Update Dog Status

- Method: PATCH
- Path: `/dogs/{id}/status`
- Description: Aktualizacja statusu psa
- Request Body:

```json
{
  "status": "available|adopted"
}
```

- Response (200):

```json
{
  "id": "uuid",
  "status": "string"
}
```

### AI Matching

#### Match Dogs

- Method: POST
- Path: `/ai/match`
- Description: Wyszukiwanie psów przez AI
- Request Body:

```json
{
  "prompt": "string",
  "limit": number
}
```

- Response (200):

```json
{
  "matches": [
    {
      "dog_id": "uuid",
      "match_percentage": number,
      "dog": {
        "id": "uuid",
        "name": "string",
        "breed": {
          "name": "string",
          "size": "string"
        },
        "primary_image": "string"
      }
    }
  ]
}
```

## 3. Uwierzytelnianie i autoryzacja

### Mechanizm uwierzytelniania

- Supabase Auth dla uwierzytelniania użytkowników
- JWT tokeny dla autoryzacji
- Refresh tokeny dla przedłużenia sesji

### Autoryzacja

- Role-based access control (RBAC)
- Row Level Security (RLS) w Supabase
- Role: employee, user

### Middleware

- Weryfikacja tokenu JWT
- Sprawdzanie uprawnień użytkownika
- Ograniczenie szybkości (rate limiting)

## 4. Walidacja i logika biznesowa

### Walidacja danych

#### Profiles

- Email: wymagany, unikalny, format email
- Role: wymagany, enum ('employee', 'user')
- Full name: opcjonalny
- Phone: opcjonalny, format numeru telefonu

#### Shelters

- Name: wymagany
- Address: wymagany
- City: wymagany
- Postal code: wymagany, format kodu pocztowego
- Phone: wymagany, format numeru telefonu
- Email: wymagany, format email
- Active: domyślnie true

#### Dogs

- Name: wymagany
- Shelter ID: wymagany, istniejące schronisko
- Breed ID: wymagany, istniejąca rasa
- Gender: enum ('male', 'female')
- Status: enum ('available', 'adopted')
- Weight: opcjonalny, liczba dodatnia
- Age: opcjonalny, format tekstowy

#### Breeds

- Name: wymagany, unikalny
- Size: wymagany, enum ('small', 'medium', 'large')
- Coat type: wymagany, enum ('short', 'medium', 'long', 'wire', 'curly', 'hairless')
- Shedding level: wymagany, 1-5

### Logika biznesowa

1. Zarządzanie statusem psa

   - Automatyczna aktualizacja statusu po adopcji
   - Walidacja zmian statusu

2. Wyszukiwanie AI

   - Przetwarzanie promptu użytkownika
   - Dopasowanie psów na podstawie cech
   - Sortowanie wyników według dopasowania

3. Zarządzanie zdjęciami

   - Automatyczne oznaczenie głównego zdjęcia
   - Walidacja formatów i rozmiarów plików

4. Bezpieczeństwo
   - Ograniczenie dostępu do funkcji zarządzania
   - Weryfikacja uprawnień do schroniska
   - Ochrona przed nadużyciami API
