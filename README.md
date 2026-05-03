# 🧠 SeizureTracker

> 🇺🇦 **Українська** | 🇬🇧 [English](./README_ENG.md)

---

Мобільний додаток для відстеження епілептичних нападів, ліків та щоденного стану здоров'я. Допомагає пацієнтам та їх опікунам вести детальний медичний щоденник і формувати PDF-звіти для лікаря.

### ✨ Можливості

**📋 Щоденник нападів**

- Фіксація дати, часу, тривалості, типу та тяжкості нападу
- Відеофіксація нападу з завантаженням у хмару
- Внутрішні та зовнішні тригери
- Календар нападів з фільтрами по тяжкості
- Діаграма розподілу нападів по часу доби

**💊 Ліки**

- Реєстрація препаратів з дозуванням та розкладом
- Щоденне відмічання прийому ліків

**📊 Щоденний трекінг**

- Пульс, артеріальний тиск, температура
- Настрій (1–5), нотатки

**📄 PDF-звіти**

- Автоматична генерація звіту за обраний період
- QR-коди для відеозаписів
- Відправка звіту на email

**👤 Профіль**

- Особисті та медичні дані (група крові, резус-фактор, тощо)
- Контакти опікунів

**🔐 Безпека**

- Email/пароль та Google Sign-In
- Верифікація email при реєстрації
- Правила безпеки Firestore (дані доступні виключно їх власнику)

**🎨 Інтерфейс**

- Світла / темна тема
- Підтримка планшетів

---

### 🛠 Технологічний стек

| Шар         | Технологія                     |
| ----------- | ------------------------------ |
| Фреймворк   | React Native + Expo (SDK 54)   |
| Навігація   | Expo Router v6 (file-based)    |
| База даних  | Firebase Firestore             |
| Авторизація | Firebase Auth (Email + Google) |
| Медіа       | Cloudinary (відео, фото)       |
| PDF         | expo-print + expo-sharing      |
| Бекенд      | Node.js + Express (Render)     |
| Мова        | TypeScript                     |

---

### ⚙️ Налаштування середовища

#### Передумови

- Node.js 18+
- Xcode 15+ (для iOS)
- [EAS CLI](https://docs.expo.dev/eas/): `npm install -g eas-cli`
- Акаунт [Expo](https://expo.dev)
- Firebase проект з увімкненим Auth та Firestore
- Акаунт Cloudinary

> ⚠️ **Expo Go не підтримується** — додаток використовує нативні модулі (`@react-native-google-signin`, `@react-native-firebase`). Потрібен Dev Client.

---

#### 1. Клонування та залежності

```bash
git clone https://github.com/Oleh-Kliapko/seizure-tracker.git
cd seizure-tracker
npm install
```

#### 2. Змінні середовища

Створіть файл `.env` у корені проекту:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
EXPO_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

#### 3. Firebase конфігурація

1. У Firebase Console → Project Settings → Your apps → iOS → завантажте `GoogleService-Info.plist`
2. Покладіть файл у корінь проекту
3. Розгорніть правила Firestore:

```bash
npx firebase-tools deploy --only firestore:rules
```

#### 4. Google Sign-In (iOS)

В `app.json` вже вказано `iosUrlScheme`. Переконайтесь що в `GoogleService-Info.plist` є `REVERSED_CLIENT_ID`, який збігається з URL-схемою.

---

### 🚀 Запуск

#### Варіант А — локальна збірка (без EAS акаунту)

```bash
# iOS симулятор
npx expo run:ios

# iOS реальний пристрій
npx expo run:ios --device
```

Після першого `run:ios` збірка збережеться локально. Подальші запуски:

```bash
npx expo start --dev-client
```

#### Варіант Б — EAS Build (хмарна збірка)

```bash
# Збірка для симулятора
eas build --profile development --platform ios

# Після встановлення .app на симулятор
npx expo start --dev-client
```

---

### 🖥 Бекенд

Бекенд розгорнутий на [Render](https://render.com). Для локальної розробки:

```bash
cd backend
npm install
cp .env.example .env   # заповніть змінні Cloudinary + SMTP
npm run dev
```

Ендпоінти:

- `GET  /health` — перевірка доступності
- `POST /api/videos/delete` — видалення відео з Cloudinary
- `POST /api/images/delete` — видалення фото з Cloudinary
- `POST /api/emails/send-report` — відправка PDF-звіту на email

---

### 📁 Структура проекту

```
seizure-tracker/
├── app/                    # Екрани (Expo Router)
│   ├── (auth)/             # Логін, реєстрація, верифікація email
│   └── (tabs)/             # Головні вкладки
│       ├── index.tsx       # Дашборд
│       ├── tracking.tsx    # Щоденний трекінг
│       ├── history.tsx     # Історія нападів
│       └── settings/       # Налаштування профілю
├── components/             # UI компоненти
├── hooks/                  # Хуки (бізнес-логіка)
├── services/               # Firestore, Cloudinary
├── models/                 # TypeScript типи
├── constants/              # Теми, константи
├── utils/                  # Утиліти (парсинг помилок, звіти)
├── backend/                # Node.js бекенд
└── docs/                   # GitHub Pages (FAQ, Terms, Privacy)
```

---

### 📄 Правові документи

Розміщені на GitHub Pages:

- [FAQ](https://oleh-kliapko.github.io/seizure-tracker/faq)
- [Угода користувача](https://oleh-kliapko.github.io/seizure-tracker/terms)
- [Обробка персональних даних](https://oleh-kliapko.github.io/seizure-tracker/privacy)
