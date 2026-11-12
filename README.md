# White Caves — Mobile Application (iOS & Android) 📱

Cross-platform mobile application for **White Caves Real Estate LLC**, built with **React Native** and **Expo**.

---

## 🏛️ Architecture Overview

- **Core Framework**: React Native (`0.76.x`)
- **App Platform**: Expo SDK 52 (Managed Workflow)
- **Routing**: Expo Router v4 (File-based navigation)
- **Styling**: React Native StyleSheet with White Caves Luxury Theme
- **Icons**: `lucide-react-native`
- **Backend Bridge**: Directly consumes `White-Caves-Server` via Cloudflare Tunnel or production API

---

## 📂 Project Structure

```text
White-Caves-Mobile/
├── app/                  # File-based navigation screens (Expo Router)
│   ├── _layout.tsx       # Root layout & navigation container
│   └── index.tsx         # Executive mobile launchpad screen
├── assets/               # App icons, splash screens, logos
├── app.json              # Expo application configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies & scripts
└── .env.example          # Environment variables template
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Set your backend API URL (e.g., your Cloudflare Tunnel address):
```env
EXPO_PUBLIC_API_URL=https://api.whitecaves.ae
```

### 3. Start Development Server
```bash
npm run start
```

### 4. Run on Your Device
- **Physical Phone**: Install the free **Expo Go** app from the App Store (iOS) or Google Play Store (Android), and scan the QR code displayed in your terminal.
- **Android Emulator**: Press `a` in the terminal.
- **iOS Simulator** (Mac only): Press `i` in the terminal.
- **Web Preview**: Press `w` in the terminal.

---

## 🔒 Security
- All sensitive API keys and secrets are excluded from Git tracking via `.gitignore`.
