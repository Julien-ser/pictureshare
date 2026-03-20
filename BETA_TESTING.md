# PictureShare Closed Beta Testing Guide

This guide covers how to distribute PictureShare to beta testers using Expo Go and collect feedback on UX and performance.

## Prerequisites for Beta Distribution

- Expo CLI installed (`npm install -g expo-cli`)
- The app must be fully functional and tested locally
- Firebase project configured with production credentials (or emulators for testing)
- A feedback collection mechanism (seeFeedback section below)

## Distribution Methods

### Method 1: Expo Go (Quick & Easy - Recommended for Beta)

Expo Go allows testers to try the app without installing anything. This is perfect for rapid beta testing.

**For Development/Internal Testing:**

1. Start the development server:

   ```bash
   npm start
   ```

2. The app will open in Expo Go on your device when you scan the QR code with the Expo Go app (iOS/Android).

3. Share your local server URL with testers:
   - Ensure you're on the same network
   - Your development server URL appears in the terminal (e.g., `exp://192.168.x.x:19000`)
   - Testers scan this QR code in Expo Go

**Note:** This method requires the developer's machine to be running and accessible on the network. For external testers, use a tunneling service like `ngrok` or switch to EAS build (Method 2).

### Method 2: EAS Build (Standalone APK/IPA)

For broader distribution, build standalone binaries with EAS.

1. **Configure EAS build:**

   EAS is already configured via `package.json` and `app.json`. Ensure your app is ready for production.

2. **Build for Android:**

   ```bash
   npx eas build --platform android --profile preview
   ```

   Download the `.apk` and share with Android testers.

3. **Build for iOS:**

   ```bash
   npx eas build --platform ios --profile preview
   ```

   This produces an `.ipa` file that can be installed via TestFlight or ad-hoc distribution.

   Note: iOS distribution requires Apple Developer account.

### Method 3: Expo Application Services (EAS) Submit

For direct distribution to app stores, use `eas submit`. This is for Beta/Internal testing tracks:

- Apple TestFlight
- Google Play Internal Testing

**Configuration:**

- Set up EAS in your Expo account
- Configure `eas.json` with appropriate profiles
- Submit builds to store testing tracks

See [EAS Documentation](https://docs.expo.dev/build/introduction/) for details.

## Beta Tester Feedback Collection

### Built-in Feedback Mechanism

The app includes an in-app feedback system (if implemented) or testers can provide feedback via:

1. **GitHub Issues:** Create a feedback form or issue template in your repository.
2. **Email/Contact:** Provide a dedicated email address for beta feedback.
3. **In-App Feedback Screen:** (Optional) Add a "Send Feedback" button that opens email or web form.

Recommended feedback items:

- Overall UX impressions (easy to use, confusing parts)
- Performance (speed, crashes, battery usage)
- Bugs encountered (include steps to reproduce)
- Feature requests
- Device and OS version

### Analytics & Performance Monitoring

Integrate Firebase Analytics to collect usage data:

- Screen flows
- Event join success rate
- Photo upload success/failure
- Crashes via Crashlytics

Add to `src/services/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getCrashlytics, recordError } from 'firebase/crashlytics';

// Initialize analytics and crashlytics (only in production)
if (!__DEV__) {
  const analytics = getAnalytics(firebaseApp);
  const crashlytics = getCrashlytics(firebaseApp);
}
```

## Testing Checklist for Beta Testers

Provide this checklist to beta testers:

### Functionality Tests

- [ ] Can create a new event and generate QR code
- [ ] Can scan QR code and join event successfully
- [ ] Can upload photos from camera/gallery
- [ ] Photos appear in real-time feed for other participants
- [ ] Can like/unlike photos
- [ ] Can add comments to photos
- [ ] Can view participant list
- [ ] Can delete own photos (and others' if event creator)
- [ ] Offline mode: can cache photos and retry upload

### UX/UI Feedback

- [ ] Navigation is intuitive
- [ ] Buttons and controls are easy to tap
- [ ] Loading states are acceptable
- [ ] Error messages are clear
- [ ] Overall visual design is appealing

### Performance Feedback

- [ ] App startup time
- [ ] Photo upload speed
- [ ] Feed scrolling smoothness
- [ ] QR scanning accuracy and speed
- [ ] Battery consumption during extended use

## Monitoring During Beta

- Monitor Firebase Console for:
  - Crashlytics reports
  - Analytics event counts
  - Firestore/Storage usage
  - Authentication metrics

- Review GitHub Issues regularly
- Consider using Sentry or similar for error tracking

## Next Steps After Beta

1. Compile feedback and prioritize fixes
2. Address critical bugs
3. Implement high-priority UX improvements
4. Prepare for production release (Phase 6 final task)

## Support for Beta Testers

- Provide contact email: support@pictureshare.app (or your actual contact)
- Expected response time: 24-48 hours
- Beta duration: 2 weeks (adjust as needed)

## Version Info

- Current version: 1.0.0-beta.1
- Build number: 1
- Release date: TBD

---

**For developers:** Remember to update `app.json` versionCode (Android) and buildNumber (iOS) before each EAS build.
