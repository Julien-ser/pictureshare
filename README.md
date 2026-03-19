# PictureShare

Mobile app for seamless event photo sharing. Scan a QR code, join an event, and instantly share photos with your group in real-time.

## Features

- **QR Code Event Joining** - Scan and join events instantly
- **Real-Time Photo Feed** - See photos as they're uploaded
- **Image Compression** - Optimized uploads without quality loss
- **Offline-First** - Works without internet, syncs when back online
- **Group Interactions** - Like and comment on photos
- **Cross-Platform** - Works on iOS and Android

## Tech Stack

- **React Native** (Expo) - Cross-platform mobile framework
- **Firebase** - Backend (Auth, Firestore, Storage)
- **TypeScript** - Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Firebase CLI: `npm install -g firebase-tools`
- iOS Simulator (Xcode) or Android Studio

### Installation

1. Clone and install dependencies:

   ```bash
   npm install
   ```

2. Set up Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Anonymous + Google), Firestore, and Storage
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Place them in their respective platform directories

3. Start the Firebase emulators (optional but recommended for development):

   ```bash
   firebase emulators:start
   ```

   This starts local emulators for Firestore, Storage, and Auth on ports:
   - Firestore: http://localhost:8080
   - Storage: http://localhost:9199
   - Auth: http://localhost:9099
   - Emulator UI: http://localhost:4000

   The app will automatically connect to emulators when they're running.

4. Start the development server:

   ```bash
   npm start
   ```

5. Run on device/simulator:
   - Scan QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator, `a` for Android emulator

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # App screens
├── services/       # Firebase and API services
├── utils/          # Helper functions
└── types/          # TypeScript type definitions
```

## Development Workflow

1. Create feature branch from `main`
2. Make changes and add tests
3. Run linting: `npm run lint`
4. Run tests: `npm test`
5. Commit and push
6. Open pull request

## Current Phase

**Phase 1: Planning & Setup** - In Progress

- [x] Tech stack documented in ADR
- [x] Expo project initialization
- [x] Wireframes (EventJoinScreen, PhotoFeedScreen, UploadInterface, ProfileScreen)
- [ ] Firebase emulator setup

See [TASKS.md](./TASKS.md) for full roadmap.

## Contributing

This is an autonomous agent-driven project. See agent instructions in `prompt.txt`.
