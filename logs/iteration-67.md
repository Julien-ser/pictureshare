# Iteration 67 - pictureshare

**Timestamp:** Thu Mar 19 11:19:23 PM EDT 2026
**Task:** Write unit tests for utilities (code generation, image compression) and service wrappers using Jest

## Prompt Sent

```
### Current Task: Write unit tests for utilities (code generation, image compression) and service wrappers using Jest

### Build/Test Error - Fix Code Only

**Context:** The build or test command failed. Your job is to fix it.

**CRITICAL RULES:**
- Do NOT install system tools, download large files, or set up external environments
- Only modify code, config files, and dependency versions
- If error requires external setup → document in README, skip from CI

**Error from last attempt:**
```
 /**
  * Subscribes to like count changes for a photo in real-time

[0m
[0m→ [0mRead package.json
[0m✗ [0medit failed
[91m[1mError: [0mFile /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/likeService.ts has been modified since it was last read.
Last modification: 2026-03-20T03:14:36.305Z
Last read: 2026-03-20T03:13:16.667Z

Please read the file again before modifying it.
Let me try a different approach - explicitly typing the `onSnapshot` callbacks as receiving `QueryDocumentSnapshot` since the errors mention that type:
[0m
[0m$ [0mgit add -u && git commit -m "fix: resolve TypeScript LSP errors in service files"
[main 6c47b29] fix: resolve TypeScript LSP errors in service files
 3 files changed, 6 insertions(+), 6 deletions(-)
[0m
Fixed all TypeScript LSP errors in service files and committed the changes.
```

## TASKS.md After Iteration

```markdown
# pictureshare

**Mission:** App for event photo sharing
All participants scan a written code and pictures they sent will be accessible to all in da group n vice versa

## Phase 1: Planning & Setup

- [x] Choose tech stack: React Native (Expo), Firebase (Auth/Firestore/Storage), react-native-camera, qrcode library; document in ADR
- [x] Initialize Expo project with TypeScript, configure ESLint/Prettier, and set up folder structure: components/, screens/, services/, utils/
- [x] Create low-fidelity wireframes for: Event Join (QR scanner), Photo Feed, Upload Interface, Profile Screen
--
## Phase 4: Real-Time Feed & Sync

- [x] Subscribe to Firestore `photos` collection query `where eventId == current` with real-time listener; render in FlatList
- [x] Implement optimistic UI: add photo to feed immediately after upload, mark pending, finalize on server confirmation
- [x] Build infinite scroll pagination using Firestore cursor; load 20 initial photos, fetch more on scroll
- [x] Add offline-first behavior: cache photos locally with `expo-file-system`; retry failed uploads when back online
```

**Decision:**
- **Is this a code/syntax error?** → Fix the code
- **Is this a missing/version dependency error?** → Update the version constraint
- **Is this an environment/setup error?** → Mark in README as prerequisite, exclude from CI, or skip

**Do the minimal fix to make the error go away, then commit.**

### Previous Attempt (Iteration 66):
**Files created/modified:**
```

```

**Last Output:**
```
## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
Looking at the error, there's a test failure in `__tests__/offlineQueue.test.ts:273` where an "Error: Init error" is being thrown. Let me examine the test and the offline queue implementation to understand the issue.
[0m→ [0mRead __tests__/offlineQueue.test.ts
[0m→ [0mRead src/services/offlineQueue.ts
Now let me examine the offlineQueue implementation to see how it handles initialization errors:
```

## TASKS.md After Iteration

```markdown
# pictureshare

**Mission:** App for event photo sharing
All participants scan a written code and pictures they sent will be accessible to all in da group n vice versa

## Phase 1: Planning & Setup
--
## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
Looking at the error, there's a test failure in `__tests__/offlineQueue.test.ts:273` with "Error: Init error". Let me examine the test and implementation to understand and fix the issue.
[0m→ [0mRead __tests__/offlineQueue.test.ts
```

**Guidance:** Continue from where we left off. Don't re-do work already done. Focus on the next incomplete piece.
```

## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
I need to examine the test failure in `__tests__/offlineQueue.test.ts:273` and the `offlineQueue.ts` implementation to understand and fix the "Error: Init error".
[0m→ [0mRead src/services/offlineQueue.ts
[0m→ [0mRead __tests__/offlineQueue.test.ts
Let me check the test file more carefully - line 273 in the test file is `intermediates: true,` which is part of the `makeDirectoryAsync` expectation. The error "Error: Init error" suggests that `FileSystem.getInfoAsync` is rejecting but the test expects the error to be caught and handled gracefully. However, looking at the test on lines 279-285, it specifically tests that initialization errors are handled without throwing.

Let me run the tests to see the actual failure:
[0m
[0m$ [0mnpm test -- offlineQueue.test.ts
> pictureshare@1.0.0 test
> jest offlineQueue.test.ts

  console.log
    Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:164:11)

  console.log
    Successfully uploaded offline item item-123

      at log (src/services/offlineQueue.ts:205:15)
          at _loop.next (<anonymous>)

  console.log
    Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:164:11)

  console.warn
    Skipping item item-123 - max retries (5) exceeded

      171 |       // Check if we should retry based on retry count
      172 |       if (item.retryCount >= maxRetries) {
    > 173 |         console.warn(`Skipping item ${item.id} - max retries (${maxRetries}) exceeded`);
          |                 ^
      174 |         continue;
      175 |       }
      176 |

      at warn (src/services/offlineQueue.ts:173:17)
          at _loop.next (<anonymous>)
      at _loop (src/services/offlineQueue.ts:169:27)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  console.log
    Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:164:11)

  console.log
    Still offline, stopping queue processing

      at log (src/services/offlineQueue.ts:180:17)
          at _loop.next (<anonymous>)

  console.log
    Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:164:11)

  console.log
    Will retry item-123 in 2000ms

      at log (src/services/offlineQueue.ts:223:15)
          at _loop.next (<anonymous>)

  console.log
    Offline queue initialized

      at log (src/services/offlineQueue.ts:235:13)

PASS __tests__/offlineQueue.test.ts
  offlineQueue
    getOfflineQueue
      ✓ should return empty array if no queue exists (4 ms)
      ✓ should return parsed queue if exists (1 ms)
      ✓ should return empty array on error (1 ms)
    addToOfflineQueue
      ✓ should add item to queue and cache image (2 ms)
      ✓ should set retryCount to 0 for new item (1 ms)
    removeFromOfflineQueue
      ✓ should remove item by ID (1 ms)
    clearOfflineQueue
      ✓ should remove queue from storage (1 ms)
    getOfflineQueueCount
      ✓ should return number of items in queue (1 ms)
    isOnline
      ✓ should return true if network check succeeds (1 ms)
      ✓ should return false if network check fails
    processOfflineQueue
      ✓ should process all pending items when online (31 ms)
      ✓ should skip items with max retries exceeded (6 ms)
      ✓ should stop processing if offline (2 ms)
      ✓ should handle upload errors and increment retry count (2005 ms)
    initializeOfflineQueue
      ✓ should initialize directory and process any pending uploads (7 ms)
      ✓ should handle initialization errors gracefully (1 ms)

Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        2.426 s, estimated 3 s
Ran all test suites matching /offlineQueue.test.ts/i.
[0m
Good! The offlineQueue tests are now passing. The error has been resolved. Now I need to check if there are other tests that need to be written for utilities (code generation, image compression) and service wrappers as mentioned in the task.

Let me explore the codebase to find utilities and service wrappers that need tests:
[0m✱ [0mGlob "src/utils/**/*.{ts,tsx}"[90m 3 matches[0m
[0m✱ [0mGlob "src/services/**/*.{ts,tsx}"[90m 8 matches[0m
[0m✱ [0mGlob "__tests__/**/*.{ts,tsx}"[90m 10 matches[0m
I can see that test files already exist for the utilities (`codeGenerator.test.ts`, `imagePicker.test.ts`) and most service wrappers. Let me check if there are any missing tests or if the tests are incomplete. Let me examine the utilities to see what needs testing:
[0m→ [0mRead src/utils/codeGenerator.ts
[0m→ [0mRead src/utils/imagePicker.ts
[0m→ [0mRead src/utils/index.ts
Good! Now I can see that:

1. `codeGenerator.ts` - contains `generateEventCode()` and `isValidEventCode()`
2. `imagePicker.ts` - contains `compressImage()` (image compression), `requestMediaPermissions()`, `takePhoto()`, `pickFromGallery()`, etc.

Both have existing test files. Let me check if those tests are complete or if they need to be improved/written:
[0m→ [0mRead __tests__/codeGenerator.test.ts
[0m→ [0mRead __tests__/imagePicker.test.ts
Both test files look comprehensive and well-written. Now let me run all tests to verify everything is passing:
[0m
[0m$ [0mnpm test 2>&1 | head -100
> pictureshare@1.0.0 test
> jest

FAIL __tests__/likeService.test.ts
  ● likeService › toggleLike › should unlike if already liked

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: "test-photo-123", "user-123"

    Number of calls: 0

      176 |
      177 |       expect(result).toBe(false);
    > 178 |       expect(likeService.unlikePhoto).toHaveBeenCalledWith(mockPhotoId, mockUserId);
          |                                       ^
      179 |     });
      180 |
      181 |     it('should like if not already liked', async () => {

      at Object.toHaveBeenCalledWith (__tests__/likeService.test.ts:178:39)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● likeService › toggleLike › should like if not already liked

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      185 |       const result = await likeService.toggleLike(mockPhotoId, mockUserId);
      186 |
    > 187 |       expect(result).toBe(true);
          |                      ^
      188 |       expect(likeService.likePhoto).toHaveBeenCalledWith(mockPhotoId, mockUserId);
      189 |     });
      190 |   });

      at Object.toBe (__tests__/likeService.test.ts:187:22)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● likeService › subscribeToUserLike › should subscribe to like document and call callback with existence status

    TypeError: doc.data is not a function

      164 |     likeRef,
      165 |     (doc) => {
    > 166 |       onUserLikedUpdate(!!doc.data());
          |                               ^
      167 |     },
      168 |     (error) => {
      169 |       console.error('Error in user like subscription:', error);

      at data (src/services/likeService.ts:166:31)
      at Object.callback (__tests__/likeService.test.ts:303:7)

PASS __tests__/eventService.test.ts
PASS __tests__/commentService.test.ts
PASS __tests__/firebase.test.ts
  ● Console

    console.error
      Error signing in with Google: Error: User cancelled Google sign-in
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:137:15)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      170 |   } catch (error) {
      171 |     try {
    > 172 |       console.error('Error signing in with Google:', error);
          |               ^
      173 |     } catch (e) {
      174 |       // ignore logging errors
      175 |     }

      at Object.error (src/services/firebase.ts:172:15)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: Google sign-in failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:139:13)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      170 |   } catch (error) {
      171 |     try {
    > 172 |       console.error('Error signing in with Google:', error);
          |               ^
      173 |     } catch (e) {
      174 |       // ignore logging errors
      175 |     }
[0m
[0m→ [0mRead src/services/likeService.ts
[0m→ [0mRead __tests__/likeService.test.ts
I see there are failing tests in `likeService.test.ts`. Let me examine these failing tests and the service implementation to fix them:
[0m
[0m# [0mTodos
[ ] Fix subscribeToUserLike test mock to include data() method
[ ] Rewrite toggleLike tests to mock Firebase calls instead of spying on internal functions
[ ] Run all tests to verify fixes
[0m
Now I see the issues causing test failures in `likeService.test.ts`:

1. **`subscribeToUserLike`** test: The mock snapshot doesn't have a `data()` method, but the code calls `doc.data()`. Need to add a `data` method to the mock.

2. **`toggleLike`** tests: The spies on internal functions (`hasUserLiked`, `unlikePhoto`, `likePhoto`) don't work because `toggleLike` uses the original module-scoped functions, not the spied versions. Need to rewrite these tests to mock the underlying Firebase calls instead of spying on internal functions.

Let me create a todo and fix these:
Now fix the `subscribeToUserLike` test by adding a proper `data()` method to the mock snapshot:
[0m← [0mEdit __tests__/likeService.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
@@ -299,9 +299,9 @@
     expect(unsubscribe).toBe(mockUnsubscribe);
 
     // Simulate snapshot callback - like exists
     const callback = (onSnapshot as jest.Mock).mock.calls[0][1];
-    callback({ exists: true });
+    callback({ exists: true, data: () => ({ userId: mockUserId }) });
 
     expect(mockOnUpdate).toHaveBeenCalledWith(true);
   });
 });

[0m
Now I'll rewrite the `toggleLike` tests to use proper Firebase mocking:
[0m← [0mEdit __tests__/likeService.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
@@ -168,25 +168,82 @@
 });
 
 describe('toggleLike', () => {
   it('should unlike if already liked', async () => {
-    jest.spyOn(likeService, 'hasUserLiked').mockResolvedValue(true);
-    jest.spyOn(likeService, 'unlikePhoto').mockResolvedValue(undefined);
+    const mockLikeRef = { path: 'photos/test-photo-123/likes/user-123' };
+    const mockPhotoRef = { path: 'photos/test-photo-123' };
+    const mockPhotoDoc = {
+      exists: true,
+      data: () => ({ likeCount: 5 }),
+    };
+    const mockTransaction = {
+      get: jest.fn().mockResolvedValue(mockPhotoDoc),
+      update: jest.fn(),
+    };
 
+    (collection as jest.Mock)
+      .mockReturnValueOnce({}) // hasUserLiked collection
+      .mockReturnValueOnce({}); // unlikePhoto collection
+
+    (doc as jest.Mock)
+      .mockReturnValueOnce(mockLikeRef) // hasUserLiked likeRef
+      .mockReturnValueOnce(mockLikeRef) // unlikePhoto likeRef
+      .mockReturnValueOnce(mockPhotoRef); // unlikePhoto photoRef
+
+    (getDoc as jest.Mock)
+      .mockResolvedValueOnce({ exists: true, data: () => ({}) }) // hasUserLiked getDoc
+      .mockResolvedValueOnce({ exists: true, data: () => ({}) }); // unlikePhoto existence check
+
+    (runTransaction as jest.Mock).mockImplementation(async (db, operation) => {
+      await operation(mockTransaction);
+    });
+
     const result = await likeService.toggleLike(mockPhotoId, mockUserId);
 
     expect(result).toBe(false);
-    expect(likeService.unlikePhoto).toHaveBeenCalledWith(mockPhotoId, mockUserId);
+    expect(deleteDoc).toHaveBeenCalledWith(mockLikeRef);
+    expect(mockTransaction.update).toHaveBeenCalledWith(mockPhotoRef, {
+      likeCount: 4,
+    });
   });
 
   it('should like if not already liked', async () => {
-    jest.spyOn(likeService, 'hasUserLiked').mockResolvedValue(false);
-    jest.spyOn(likeService, 'likePhoto').mockResolvedValue(undefined);
+    const mockLikeRef = { path: 'photos/test-photo-123/likes/user-123' };
+    const mockPhotoRef = { path: 'photos/test-photo-123' };
+    const mockPhotoDoc = {
+      exists: true,
+      data: () => ({ likeCount: 0 }),
+    };
+    const mockTransaction = {
+      get: jest.fn().mockResolvedValue(mockPhotoDoc),
+      update: jest.fn(),
+    };
 
+    (collection as jest.Mock)
+      .mockReturnValueOnce({}) // hasUserLiked collection
+      .mockReturnValueOnce({}); // likePhoto collection
+
+    (doc as jest.Mock)
+      .mockReturnValueOnce(mockLikeRef) // hasUserLiked likeRef
+      .mockReturnValueOnce(mockLikeRef) // likePhoto likeRef
+      .mockReturnValueOnce(mockPhotoRef); // likePhoto photoRef
+
+    (getDoc as jest.Mock).mockResolvedValueOnce({ exists: false, data: () => null }); // hasUserLiked getDoc
+
+    (runTransaction as jest.Mock).mockImplementation(async (db, operation) => {
+      await operation(mockTransaction);
+    });
+
     const result = await likeService.toggleLike(mockPhotoId, mockUserId);
 
     expect(result).toBe(true);
-    expect(likeService.likePhoto).toHaveBeenCalledWith(mockPhotoId, mockUserId);
+    expect(setDoc).toHaveBeenCalledWith(mockLikeRef, {
+      userId: mockUserId,
+      createdAt: expect.any(Object),
+    });
+    expect(mockTransaction.update).toHaveBeenCalledWith(mockPhotoRef, {
+      likeCount: { value: 1 },
+    });
   });
 });
 
 describe('getLikeCount', () => {

[0m
[0m# [0mTodos
[x] Fix subscribeToUserLike test mock to include data() method
[x] Rewrite toggleLike tests to mock Firebase calls instead of spying on internal functions
[ ] Run all tests to verify fixes
[0m
Now let's run all tests to verify the fixes:
[0m$ [0mnpm test 2>&1 | tail -50
console.warn
      Skipping item item-123 - max retries (5) exceeded

      171 |       // Check if we should retry based on retry count
      172 |       if (item.retryCount >= maxRetries) {
    > 173 |         console.warn(`Skipping item ${item.id} - max retries (${maxRetries}) exceeded`);
          |                 ^
      174 |         continue;
      175 |       }
      176 |

      at warn (src/services/offlineQueue.ts:173:17)
          at _loop.next (<anonymous>)
      at _loop (src/services/offlineQueue.ts:169:27)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:164:11)

    console.log
      Still offline, stopping queue processing

      at log (src/services/offlineQueue.ts:180:17)
          at _loop.next (<anonymous>)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:164:11)

    console.log
      Will retry item-123 in 2000ms

      at log (src/services/offlineQueue.ts:223:15)
          at _loop.next (<anonymous>)

    console.log
      Offline queue initialized

      at log (src/services/offlineQueue.ts:235:13)


Test Suites: 10 passed, 10 total
Tests:       144 passed, 144 total
Snapshots:   0 total
Time:        2.982 s, estimated 3 s
Ran all test suites.
[0m
All tests now pass (144 passed). I've fixed the failing tests in `likeService.test.ts`:

1. Fixed `subscribeToUserLike` test by adding `data()` method to the mock snapshot
2. Rewrote `toggleLike` tests to mock Firebase calls directly instead of spying on internal functions

The utilities (code generation, image compression) and service wrappers already have comprehensive test coverage. No further changes needed.
```

## TASKS.md After Iteration

```markdown
# pictureshare

**Mission:** App for event photo sharing
All participants scan a written code and pictures they sent will be accessible to all in da group n vice versa

## Phase 1: Planning & Setup

- [x] Choose tech stack: React Native (Expo), Firebase (Auth/Firestore/Storage), react-native-camera, qrcode library; document in ADR
- [x] Initialize Expo project with TypeScript, configure ESLint/Prettier, and set up folder structure: components/, screens/, services/, utils/
- [x] Create low-fidelity wireframes for: Event Join (QR scanner), Photo Feed, Upload Interface, Profile Screen
- [x] Set up Firebase project with security rules baseline, initialize local emulators for development

## Phase 2: Authentication & Event Code System

- [x] Implement Firebase Anonymous Auth + Google Sign-In as fallback; store user mapping locally
- [x] Build event creation screen: generates 6-digit alphanumeric code, optional time/visibility settings
- [x] Integrate `react-native-qrcode-svg` to display event QR code for sharing; encode deep link with event ID
- [x] Develop QR scanner screen using `expo-camera`; validate code against Firestore and join user to event document's participants array

## Phase 3: Photo Capture, Compression & Upload

- [x] Build camera/gallery picker with `expo-image-picker`; request permissions and handle denials with explanatory UI
- [x] Add image compression pipeline: use `expo-image-manipulator` to resize to ≤1920px, compress to 80% quality
- [x] Implement upload service: upload compressed image to Firebase Storage path `/events/{eventId}/photos/{photoId}.jpg`
- [x] Save photo metadata to Firestore collection `photos` with fields: eventId, uploaderId, storagePath, createdAt, thumbnailPath

## Phase 4: Real-Time Feed & Sync

- [x] Subscribe to Firestore `photos` collection query `where eventId == current` with real-time listener; render in FlatList
- [x] Implement optimistic UI: add photo to feed immediately after upload, mark pending, finalize on server confirmation
- [x] Build infinite scroll pagination using Firestore cursor; load 20 initial photos, fetch more on scroll
- [x] Add offline-first behavior: cache photos locally with `expo-file-system`; retry failed uploads when back online

## Phase 5: Group Permissions & Interactions

- [x] Enable deletion: only photo owner or event creator can delete; remove from Storage and Firestore
- [x] Add likes: create `likes` subcollection under each photo; toggle like on press; update aggregated like count
- [x] Create lightweight comments: allow short text on photos; store in `comments` subcollection; real-time updates
- [x] Show participant list per event with avatars (from Google Auth) and photo count; differentiate current user

## Phase 6: Testing, Polish & Launch

- [ ] Write unit tests for utilities (code generation, image compression) and service wrappers using Jest
- [ ] Create integration tests with Firebase Emulators: test event join flow, upload, and real-time feed
- [ ] Perform closed beta: distribute via Expo Go, collect feedback on UX and performance
- [ ] Deploy to app stores: configure EAS build, submit to Apple TestFlight and Google Play Internal; monitor Firebase Crashlytics
      </parameter>
      <parameter=filePath>
      /home/julien/Desktop/Free-Wiggum-opencode/pictureshare_TASKS.md
      </parameter>
      </function>
      </tool_call>
```

**Completed at:** Thu Mar 19 11:24:15 PM EDT 2026
