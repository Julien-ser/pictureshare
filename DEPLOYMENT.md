# PictureShare Deployment Guide

This guide covers deploying PictureShare to Apple TestFlight and Google Play Internal testing using Expo Application Services (EAS).

## Prerequisites

- Expo account (sign up at https://expo.dev)
- Apple Developer Program membership ($99/year)
- Google Play Console account ($25 one-time)
- Firebase project with Crashlytics enabled
- Node.js 18+ and npm installed

## Table of Contents

1. [EAS Setup](#eas-setup)
2. [App Store Credentials Configuration](#app-store-credentials-configuration)
3. [Firebase Crashlytics Setup](#firebase-crashlytics-setup)
4. [Building for Production](#building-for-production)
5. [Submitting to TestFlight](#submitting-to-testflight)
6. [Submitting to Google Play Internal](#submitting-to-google-play-internal)
7. [Monitoring and Analytics](#monitoring-and-analytics)
8. [Troubleshooting](#troubleshooting)

---

## EAS Setup

### 1. Install and login to EAS

```bash
npm install -g eas-cli
eas login
```

### 2. Configure project for EAS

The project is already configured with `eas.json`. No additional setup needed unless you want to customize profiles.

### 3. Update app metadata

Update `app.json` with production-ready metadata:

```json
{
  "expo": {
    "name": "PictureShare",
    "slug": "pictureshare",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.pictureshare.app",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.pictureshare.app",
      "versionCode": 1
    }
  }
}
```

---

## App Store Credentials Configuration

### iOS: Apple Developer Setup

1. **Create an App Store Connect app record**:
   - Log in to App Store Connect (https://appstoreconnect.apple.com)
   - Go to "My Apps" → "+" → "New App"
   - Platform: iOS
   - Name: PictureShare
   - Primary Language: English
   - Bundle ID: `com.pictureshare.app` (must match `app.json`)
   - SKU: `pictureshare-001`
   - User Access: Full Access

2. **Create API key for EAS** (recommended):
   - In App Store Connect, go to "Users and Access" → "Keys"
   - Click "+" to generate a new API key
   - Name: `EAS Submit Key`
   - Role: Admin
   - Download the `.p8` file (save it securely!)
   - Note: Key ID and Issuer ID will be shown

3. **Configure EAS credentials**:

   ```bash
   # Run credentials wizard (interactive)
   eas credentials
   ```

   - Select platform: `ios`
   - Choose method: `API Key` (recommended) or `Apple ID`
   - If using API Key:
     - Provide Key ID, Issuer ID, and the `.p8` file path
     - EAS will store these securely in its cloud

   Alternatively, you can manually create a credentials.json file (not recommended).

### Android: Google Play Console Setup

1. **Create a service account**:
   - Log in to Google Play Console (https://play.google.com/console)
   - Go to "Settings" → "Developer account" → "API access"
   - Click "Create service account" (opens Google Cloud Console)
   - Follow prompts to create a service account with "Service Account User" role
   - After creation, click "Grant access" and assign:
     - Role: `Release manager` (or `Admin`)
     - Scope: `All releases` + `View app information and download reports`

2. **Download service account key**:
   - In Google Cloud Console, go to "IAM & Admin" → "Service Accounts"
   - Find your service account → "Keys" tab → "Add Key" → JSON
   - Save the JSON file as `google-play-service-account.json` in your project root
   - **Important**: Add this file to `.gitignore` (never commit it!)

3. **Link your app to the service account**:
   - Back in Play Console, under "API access", click "Link to service account"
   - Select your service account and click "Invite user"
   - Accept the invitation from the service account email

---

## Firebase Crashlytics Setup

### 1. Enable Crashlytics in Firebase Console

1. Go to Firebase Console (https://console.firebase.google.com)
2. Select your project
3. In the left menu, go to "Crashlytics"
4. Click "Get started"
5. Follow the prompts to enable Crashlytics

### 2. Configure dSYM upload (iOS only)

For iOS, Crashlytics needs dSYM files to symbolicate crashes. Expo handles this automatically when you:

- Build with EAS: `eas build --platform ios`
- EAS automatically uploads dSYMs to Crashlytics during build

No additional configuration needed.

### 3. Verify Crashlytics integration

After building and installing the app:

1. Open the app on a physical device (simulators don't support Crashlytics)
2. Trigger a test crash by opening the developer menu and selecting "Trigger crash" (if available) or add a test button temporarily:
   ```typescript
   // Add to any screen for testing
   Button営業 "Test Crash" onPress={() => { throw new Error('Test crash'); }} />
   ```
3. Check Firebase Console → Crashlytics for the crash report (may take a few minutes)

---

## Building for Production

### Build for iOS (TestFlight)

```bash
# Build production iOS binary
eas build --platform ios --profile production

# This will:
# 1. Create an IPA file
# 2. Upload to App Store Connect automatically
# 3. Provide a link to view the build in App Store Connect
```

**Note**: First build may take 20-30 minutes. Subsequent builds are faster.

### Build for Android (Google Play Internal)

```bash
# Build production Android app bundle
eas build --platform android --profile production

# This will:
# 1. Create an AAB file
# 2. Upload to Google Play Console (if credentials configured)
# 3. Provide a link to the build
```

### Monitoring Build Progress

```bash
# View build status in real-time
eas build:list

# Check latest build details
eas build:details <build-id>
```

---

## Submitting to TestFlight

EAS can automatically submit builds to TestFlight when you use the `--auto-submit` flag:

```bash
# Build and submit to TestFlight in one command
eas build --platform ios --profile production --auto-submit
```

### Manual Submission (if needed)

1. After the build completes, EAS provides an App Store Connect link
2. Log in to App Store Connect
3. Go to the build under "TestFlight" tab
4. Select the build and click "Submit for Beta Review"
5. Add release notes describing what's new
6. Submit

**Beta Review**: Apple typically reviews TestFlight builds within 24 hours.

---

## Submitting to Google Play Internal

### Automatic submission

```bash
# Build and submit to Google Play Internal in one command
eas build --platform android --profile production --auto-submit
```

### Manual submission

1. After build completes, go to Google Play Console
2. Select your app
3. Go to "Testing" → "Internal testing"
4. Click "Create new release"
5. Select the uploaded AAB build
6. Add release notes
7. Rollout to internal testers

**Note**: Google Play internal testing doesn't require review - builds are available to testers within hours.

---

## Monitoring and Analytics

### Firebase Crashlytics Dashboard

1. Go to Firebase Console → Crashlytics
2. View crash statistics, affected users, and stack traces
3. Set up email alerts for new crash spikes:
   - Click "Settings" (gear icon)
   - Go to "Alert settings"
   - Configure notification thresholds

### Firebase Analytics

The app initializes Analytics automatically in production builds. Monitor:

- Event creation rate
- QR code scan success
- Photo upload success/failure
- User engagement metrics

View in Firebase Console → Analytics → Dashboard.

---

## Environment Configuration

### Production Environment Variables

Set these in `eas.json` under the production profile's `env`:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_ENV": "production",
        "EXPO_PUBLIC_FIREBASE_API_KEY": "...",
        "EXPO_PUBLIC_FIREBASE_PROJECT_ID": "..."
        // Add any other secrets via EAS secret management
      }
    }
  }
}
```

### Using EAS Secrets (recommended)

Store sensitive values securely:

```bash
# Add a secret
eas secret:create --name FIREBASE_API_KEY --value your-api-key

# Use in build profile (eas.json)
"env": {
  "EXPO_PUBLIC_FIREBASE_API_KEY": "@FIREBASE_API_KEY"
}
```

---

## Version Management

### Bumping version numbers

Update `app.json` before each release:

```json
{
  "expo": {
    "version": "1.0.1", // Increment for each release
    "ios": {
      "buildNumber": "2" // Increment for each iOS build
    },
    "android": {
      "versionCode": 2 // Increment for each Android build
    }
  }
}
```

Semantic versioning recommended: `MAJOR.MINOR.PATCH`.

### Creating git tags

```bash
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin --tags
```

---

## Continuous Deployment (Optional)

You can automate deployments using GitHub Actions by creating `.github/workflows/deploy.yml`. See the existing workflow files for patterns.

---

## Troubleshooting

### Build failures

- Check EAS build logs: `eas build:details <build-id>`
- Common issues:
  - Missing dependencies → run `npm install`
  - Incompatible Expo SDK version → update to SDK 50+
  - Insufficient credentials → verify `eas credentials`

### Submission errors

- iOS: "Invalid bundle identifier" → Ensure `app.json` bundle ID matches App Store Connect exactly
- Android: "Service account not authorized" → Re-check Play Console service account permissions

### Crashlytics not receiving crashes

- Crashes must occur on physical devices (not simulators)
- Ensure `@firebase/crashlytics` dependency is installed
- Verify Firebase config in `src/services/firebase.ts` is correct
- Check that app is built in production mode (development mode doesn't send crashes)

### TestFlight installation issues

- TestFlight app must be installed from App Store
- Build must be processed by Apple (takes 10-30 minutes after upload)
- Tester must be added in App Store Connect with their Apple ID email

---

## Support

- EAS Documentation: https://docs.expo.dev/build/
- Firebase Crashlytics: https://firebase.google.com/docs/crashlytics
- App Store Connect Help: https://help.apple.com/app-store-connect/
- Google Play Console Help: https://support.google.com/googleplay/

---

## Quick Reference Commands

```bash
# Login to Expo
eas login

# Check build status
eas build:list

# Build for TestFlight
eas build --platform ios --profile production --auto-submit

# Build for Google Play Internal
eas build --platform android --profile production --auto-submit

# Manage credentials
eas credentials

# Add EAS secret
eas secret:create --name SECRET_NAME --value secret-value

# View app store submissions
eas submit:list
```

---

**Last updated**: 2026-03-20  
**App Version**: 1.0.0  
**Target Stores**: Apple TestFlight, Google Play Internal Testing
