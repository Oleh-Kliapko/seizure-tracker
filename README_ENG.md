# 🧠 SeizureTracker

> 🇬🇧 **English** | 🇺🇦 [Українська](./README.md)

---

A mobile app for tracking epileptic seizures, medications, and daily health metrics. Helps patients and caregivers maintain a detailed medical diary and generate PDF reports for their doctor.

### ✨ Features

**📋 Seizure Diary**

- Log date, time, duration, type, and severity of each seizure
- Video capture with cloud upload
- Internal and external triggers
- Seizure calendar with severity filters
- Time-of-day distribution chart

**💊 Medications**

- Register medications with dosage and schedule
- Daily medication intake tracking

**📊 Daily Tracking**

- Heart rate, blood pressure, temperature
- Mood (1–5), notes

**📄 PDF Reports**

- Auto-generate reports for any date range
- QR codes linking to seizure videos
- Email delivery

**👤 Profile**

- Personal and medical data (blood type, Rh factor, etc.)
- Guardian contacts

**🔐 Security**

- Email/password and Google Sign-In
- Email verification on registration
- Firestore security rules (data accessible only by its owner)

**🎨 UI**

- Light / dark theme
- Tablet support

---

### 🛠 Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Framework  | React Native + Expo (SDK 54)   |
| Navigation | Expo Router v6 (file-based)    |
| Database   | Firebase Firestore             |
| Auth       | Firebase Auth (Email + Google) |
| Media      | Cloudinary (video, photos)     |
| PDF        | expo-print + expo-sharing      |
| Backend    | Node.js + Express (Render)     |
| Language   | TypeScript                     |

---

### ⚙️ Environment Setup

#### Prerequisites

- Node.js 18+
- Xcode 15+ (for iOS)
- [EAS CLI](https://docs.expo.dev/eas/): `npm install -g eas-cli`
- [Expo](https://expo.dev) account
- Firebase project with Auth and Firestore enabled
- Cloudinary account

> ⚠️ **Expo Go is not supported** — the app uses native modules (`@react-native-google-signin`, `@react-native-firebase`). A Dev Client build is required.

---

#### 1. Clone and install

```bash
git clone https://github.com/Oleh-Kliapko/seizure-tracker.git
cd seizure-tracker
npm install
```

#### 2. Environment variables

Create a `.env` file in the project root:

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

#### 3. Firebase configuration

1. Firebase Console → Project Settings → Your apps → iOS → download `GoogleService-Info.plist`
2. Place it in the project root
3. Deploy Firestore rules:

```bash
npx firebase-tools deploy --only firestore:rules
```

#### 4. Google Sign-In (iOS)

The `iosUrlScheme` is already set in `app.json`. Make sure `GoogleService-Info.plist` contains a `REVERSED_CLIENT_ID` matching that URL scheme.

---

### 🚀 Running the app

#### Option A — Local build (no EAS account required)

```bash
# iOS Simulator
npx expo run:ios

# iOS physical device
npx expo run:ios --device
```

After the first `run:ios`, the build is cached locally. Subsequent starts:

```bash
npx expo start --dev-client
```

#### Option B — EAS Build (cloud build)

```bash
# Build for simulator
eas build --profile development --platform ios

# After installing the .app on the simulator
npx expo start --dev-client
```

---

### 🖥 Backend

The backend is deployed on [Render](https://render.com). For local development:

```bash
cd backend
npm install
cp .env.example .env   # fill in Cloudinary + SMTP variables
npm run dev
```

Endpoints:

- `GET  /health` — health check
- `POST /api/videos/delete` — delete video from Cloudinary
- `POST /api/images/delete` — delete photo from Cloudinary
- `POST /api/emails/send-report` — send PDF report by email

---

### 📁 Project Structure

```
seizure-tracker/
├── app/                    # Screens (Expo Router)
│   ├── (auth)/             # Login, register, email verification
│   └── (tabs)/             # Main tabs
│       ├── index.tsx       # Dashboard
│       ├── tracking.tsx    # Daily tracking
│       ├── history.tsx     # Seizure history
│       └── settings/       # Profile settings
├── components/             # UI components
├── hooks/                  # Hooks (business logic)
├── services/               # Firestore, Cloudinary
├── models/                 # TypeScript types
├── constants/              # Themes, constants
├── utils/                  # Utilities (error parsing, reports)
├── backend/                # Node.js backend
└── docs/                   # GitHub Pages (FAQ, Terms, Privacy)
```

---

### 📄 Legal

Hosted on GitHub Pages:

- [FAQ](https://oleh-kliapko.github.io/seizure-tracker/faq)
- [Terms of Use](https://oleh-kliapko.github.io/seizure-tracker/terms)
- [Privacy Policy](https://oleh-kliapko.github.io/seizure-tracker/privacy)
