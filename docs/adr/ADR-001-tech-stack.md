# ADR-001: Tech Stack Selection

## Status

Accepted

## Context

We need to build a cross-platform mobile application for event photo sharing with the following key requirements:

- QR code scanning for event joining
- Real-time photo feed synchronization
- Image capture and upload
- Group permissions and interactions (likes, comments)
- Offline-first capabilities
- Fast iterative development

## Decision

We will use the following tech stack:

### Frontend Framework
- **React Native** with **Expo** for cross-platform mobile development
  - Provides managed workflow, OTA updates, and easy app store distribution
  - Single codebase for iOS and Android
  - Access to device APIs without native code

### Backend & Database
- **Firebase** as Backend-as-a-Service:
  - **Firebase Authentication** - Anonymous auth with Google Sign-In fallback
  - **Cloud Firestore** - NoSQL document database for events, photos, likes, comments
  - **Firebase Storage** - Object storage for compressed photos
  - **Firebase Emulators** - Local development and testing

### Key Libraries
- `expo-camera` - QR code scanning and camera access
- `expo-image-picker` - Photo selection from gallery
- `expo-image-manipulator` - Image compression (≤1920px, 80% quality)
- `expo-file-system` - Local file caching and offline storage
- `react-native-qrcode-svg` - QR code generation for event sharing
- `expo-status-bar` - Native status bar handling

### Development Tools
- **TypeScript** - Type safety and better developer experience
- **ESLint** + **Prettier** - Code quality and consistent formatting
- **Jest** - Unit testing framework
- **Firebase Emulator Suite** - Local testing of Firestore, Auth, and Storage

## Consequences

### Positive
- Rapid development with Expo's managed workflow
- Cross-platform iOS/Android from single codebase
- Firebase provides real-time sync out-of-the-box
- Built-in offline persistence via Firestore
- Easy scaling and no server maintenance
- Large ecosystem of Expo libraries for device features
- Fast iteration with Expo Go during development

### Negative
- Vendor lock-in with Firebase
- Costs may increase with scale (though free tier sufficient for beta)
- Expo's managed workflow may limit certain native customizations
- Firebase Emulator Suite can be resource-intensive

### Risks
- Firebase pricing model requires monitoring as user base grows
- Expo SDK updates may introduce breaking changes (mitigated by pinning versions)
- Image upload costs in Firebase Storage need budgeting

## Alternatives Considered

- **React Native CLI** - More control but requires native development setup
- **Supabase** - Open-source Firebase alternative but smaller ecosystem
- **Custom Node.js backend** - More control but requires server maintenance
- **Flutter** - Excellent performance but team's React expertise favors React Native
