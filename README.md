# PictureShare

Mobile app for seamless event photo sharing. Scan a QR code, join an event, and instantly share photos with your group in real-time.

## Features

- **QR Code Event Joining** - Scan and join events instantly
- **Real-Time Photo Feed** - See photos as they're uploaded
- **Image Compression** - Optimized uploads without quality loss
- **Offline-First** - Works without internet, syncs when back online
- **Group Interactions** - Like and comment on photos
- **Participant List** - View all event participants with avatars and photo counts
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

**Phase 6: Testing, Polish & Launch** - In Progress

- [x] Write unit tests for utilities (code generation, image compression) and service wrappers using Jest (144 tests passing)
- [x] Create integration tests with Firebase Emulators: test event join flow, upload, and real-time feed
- [ ] Perform closed beta: distribute via Expo Go, collect feedback on UX and performance
- [ ] Deploy to app stores: configure EAS build, submit to Apple TestFlight and Google Play Internal; monitor Firebase Crashlytics

## Integration Tests

Integration tests use Firebase Emulators to test the full stack. To run them:

1. **Start Firebase Emulators** (in a separate terminal):

   ```bash
   npx firebase-tools emulators:start
   ```

   Or if you have firebase-tools installed globally:

   ```bash
   firebase emulators:start
   ```

   This starts local emulators on ports:
   - Auth: localhost:9099
   - Firestore: localhost:8080
   - Storage: localhost:9199

2. **Run integration tests**:

   ```bash
   RUN_INTEGRATION_TESTS=true npm test
   ```

   The integration tests cover:
   - Event join flow (creation, retrieval, joining)
   - Photo upload and metadata persistence
   - Real-time feed subscription and updates

   Note: Keep the emulators running while tests execute.

3. **Stop emulators**: Press `Ctrl+C` in the emulator terminal.

**Phase 5: Group Permissions & Interactions** - Completed

- [x] Enable deletion: only photo owner or event creator can delete; remove from Storage and Firestore
- [x] Add likes: create `likes` subcollection under each photo; toggle like on press; update aggregated like count
- [x] Create lightweight comments: allow short text on photos; store in `comments` subcollection; real-time updates
- [x] Show participant list per event with avatars (from Google Auth) and photo count; differentiate current user

**Phase 4: Real-Time Feed & Sync** - Completed

- [x] Subscribe to Firestore `photos` collection query `where eventId == current` with real-time listener; render in FlatList
- [x] Implement optimistic UI: add photo to feed immediately after upload, mark pending, finalize on server confirmation
- [x] Build infinite scroll pagination using Firestore cursor; load 20 initial photos, fetch more on scroll
- [x] Add offline-first behavior: cache photos locally with `expo-file-system`; retry failed uploads when back online

See [TASKS.md](./TASKS.md) for full roadmap.

## Authentication

The app supports:

- **Anonymous Authentication** - Quick sign-in without personal data
- **Google Sign-In** - Fallback option using OAuth

User data is stored locally on the device using AsyncStorage for offline-first experience.

## Firebase Configuration

Before running, update `src/services/firebase.ts` with your Firebase project credentials:

```typescript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

The app automatically connects to Firebase emulators when running in development mode (`__DEV__`).

## Contributing

This is an autonomous agent-driven project. See agent instructions in `prompt.txt`.
