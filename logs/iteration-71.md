# Iteration 71 - pictureshare

**Timestamp:** Thu Mar 19 11:16:08 PM EDT 2026
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
     likeRef,
     (doc) => {
-      onUserLikedUpdate(doc.exists);
+      onUserLikedUpdate(!!doc.data());
     },
     (error) => {
       console.error('Error in user like subscription:', error);
diff --git a/src/services/photoService.ts b/src/services/photoService.ts
index 0971752..5e1a1b1 100644
--- a/src/services/photoService.ts
+++ b/src/services/photoService.ts
@@ -313,11 +313,14 @@ export async function canDeletePhoto(
     const photoRef = doc(db, PHOTOS_COLLECTION, photoId);
     const photoDoc = await getDoc(photoRef);
 
-    if (!photoDoc.exists) {
+    if (!photoDoc.data()) {
       return false;
     }
 
-    const photoData = photoDoc.data();
+    const photoData = photoDoc.data()!;
--
       if (eventData.createdBy === userId) {
         return true;
       }
[0m
The changes look correct. Let's commit with a clear message:
[0m$ [0mgit add src/services/ && git commit -m "fix: resolve TypeScript errors by replacing .exists checks with .data() checks

- Fixed LSP errors in eventService, commentService, photoService, likeService
- Replaced document.exists checks with data() existence checks
- Fixed likeRef.get() to use getDoc() for proper modular SDK usage"
[main 7bc2155] fix: resolve TypeScript errors by replacing .exists checks with .data() checks
 4 files changed, 25 insertions(+), 19 deletions(-)
[0m
Let's run a final verification:
[0m$ [0mnpx tsc --noEmit && echo "Type check passed"
Type check passed
[0m
```

**Decision:**
- **Is this a code/syntax error?** → Fix the code
- **Is this a missing/version dependency error?** → Update the version constraint
- **Is this an environment/setup error?** → Mark in README as prerequisite, exclude from CI, or skip

**Do the minimal fix to make the error go away, then commit.**

### Previous Attempt (Iteration 70):
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
Looking at the error, there's a test failure in `__tests__/offlineQueue.test.ts:273` where an "Error: Init error" is being thrown. Let me examine the test and the offline queue implementation to understand the issue.
[0m→ [0mRead __tests__/offlineQueue.test.ts
```

**Guidance:** Continue from where we left off. Don't re-do work already done. Focus on the next incomplete piece.
```

## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
[0m→ [0mRead package.json
[0m✱ [0mGlob "__tests__/**/*.test.ts"[90m 10 matches[0m
[0m✱ [0mGlob "src/**/*.ts"[90m 14 matches[0m
I need to continue writing unit tests for utilities and service wrappers. Let me explore the codebase to understand what utilities and service wrappers exist and what testing infrastructure is in place.
[0m→ [0mRead src/utils/codeGenerator.ts
[0m→ [0mRead src/utils/imagePicker.ts
[0m→ [0mRead __tests__/codeGenerator.test.ts
[0m→ [0mRead __tests__/imagePicker.test.ts
Now let me check the service files to see if there are any missing tests or if we need to add tests for service wrappers specifically:
[0m→ [0mRead src/services/participantService.ts
[0m→ [0mRead src/services/firebase.ts
[0m→ [0mRead __tests__/firebase.test.ts
[0m→ [0mRead __tests__/participantService.test.ts
[0m→ [0mRead __tests__/eventService.test.ts
[0m→ [0mRead __tests__/photoService.test.ts
[0m→ [0mRead src/services/eventService.ts[90m [limit=100][0m
Let me check the other service test files to understand the testing patterns:
All the tests appear to exist and are comprehensive. Let me run the tests to verify they pass:
[0m
[0m$ [0mnpm test 2>&1 | head -100
> pictureshare@1.0.0 test
> jest

PASS __tests__/integration.test.ts
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

      at Object.error (src/services/firebase.ts:172:15)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: No ID token received from Google
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:146:13)
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

      at Object.error (src/services/firebase.ts:172:15)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: No ID token received from Google
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:146:13)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      170 |   } catch (error) {
      171 |     try {
    > 172 |       console.error('Error signing in with Google:', error);
          |               ^
[0m
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


Test Suites: 3 failed, 7 passed, 10 total
Tests:       13 failed, 131 passed, 144 total
Snapshots:   0 total
Time:        3.081 s
Ran all test suites.
[0m
[0m$ [0mnpm test -- --verbose 2>&1 | grep -A 20 "FAIL\|Expected\|Received\|● " | head -200
FAIL __tests__/eventService.test.ts
  eventService
    createEvent
      ✓ should create event with unique code (10 ms)
      ✓ should set isPublic to true by default (1 ms)
      ✓ should set custom maxDuration if provided (1 ms)
      ✓ should set isPublic to false when specified
    getEventByCode
      ✓ should return event if found (2 ms)
      ✓ should return null if event not found
    joinEvent
      ✓ should add user to participants if not already a member (1 ms)
      ✓ should not add duplicate participant (1 ms)
      ✕ should not add if event does not exist (1 ms)
      isCodeUnique
        ✓ should return true when code does not exist (1 ms)
        ✓ should return false when code already exists (1 ms)

  ● eventService › joinEvent › should not add if event does not exist

    TypeError: eventDoc.data is not a function

      86 |   // For simplicity, we'll get the doc, update locally and save
      87 |   const eventDoc = await getDoc(eventRef);
    > 88 |   const data = eventDoc.data();
         |                         ^
      89 |   if (data) {
      90 |     const event = data as Event;
      91 |     if (!event.participants.includes(userId)) {

      at data (src/services/eventService.ts:88:25)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

FAIL __tests__/commentService.test.ts
  commentService
    generateCommentId
      ✓ should generate a unique comment ID (10 ms)
    addComment
      ✓ should create comment document and increment photo commentCount (5 ms)
      ✓ should throw error if photo does not exist (18 ms)
    deleteComment
      ✓ should delete comment and decrement photo commentCount (2 ms)
      ✓ should throw error if comment does not exist (2 ms)
      ✓ should throw error if user is not comment owner (1 ms)
      ✓ should not decrement below zero (2 ms)
    getCommentCount
      ✓ should return commentCount from photo document (1 ms)
      ✓ should return 0 if photo does not exist (1 ms)
      ✓ should return 0 if commentCount not set (1 ms)
    subscribeToCommentCount
      ✓ should subscribe to photo document and call callback with commentCount (2 ms)
      ✕ should call callback with 0 if photo does not exist
    subscribeToComments
      ✓ should subscribe to comments collection and call callback with comments array (1 ms)
--
  ● commentService › subscribeToCommentCount › should call callback with 0 if photo does not exist

    TypeError: snap.data is not a function

      130 |     photoRef,
      131 |     (snap: DocumentSnapshot) => {
    > 132 |       const data = snap.data();
          |                         ^
      133 |       if (data) {
      134 |         const commentCount = data.commentCount || 0;
      135 |         onCommentCountUpdate(commentCount);

      at data (src/services/commentService.ts:132:25)
      at Object.callback (__tests__/commentService.test.ts:297:7)

  console.log
    Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:164:11)

  console.log
--
FAIL __tests__/likeService.test.ts
  likeService
    generateLikeId
      ✓ should return userId as like ID (8 ms)
    likePhoto
      ✓ should create like document and increment photo likeCount (4 ms)
      ✕ should throw error if photo does not exist (45 ms)
    unlikePhoto
      ✕ should delete like document and decrement photo likeCount (1 ms)
      ✕ should not throw if like does not exist (1 ms)
      ✕ should not decrement below zero (1 ms)
    toggleLike
      ✕ should unlike if already liked (1 ms)
      ✕ should like if not already liked (1 ms)
    getLikeCount
      ✓ should return likeCount from photo document (2 ms)
      ✕ should return 0 if photo does not exist
      ✓ should return 0 if likeCount not set
    hasUserLiked
      ✕ should return true if like document exists (1 ms)
      ✕ should return false if like document does not exist
--
  ● likeService › likePhoto › should throw error if photo does not exist

    expect(received).rejects.toThrow(expected)

    Expected substring: "Photo not found"
    Received message:   "photoDoc.data is not a function"

          41 |   await runTransaction(db, async (transaction) => {
          42 |     const photoDoc = await transaction.get(photoRef);
        > 43 |     const data = photoDoc.data();
             |                           ^
          44 |     if (!data) {
          45 |       throw new Error('Photo not found');
          46 |     }

      at data (src/services/likeService.ts:43:27)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at Object.toThrow (node_modules/expect/build/index.js:218:22)
      at Object.toThrow (__tests__/likeService.test.ts:96:76)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

  ● likeService › unlikePhoto › should delete like document and decrement photo likeCount

    TypeError: likeDoc.data is not a function

      60 |   // Check if like exists before deleting
      61 |   const likeDoc = await getDoc(likeRef);
    > 62 |   if (!likeDoc.data()) {
         |                ^
      63 |     return; // Already unliked
      64 |   }
      65 |

      at Object.data (src/services/likeService.ts:62:16)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● likeService › unlikePhoto › should not throw if like does not exist

    expect(received).resolves.not.toThrow()

    Received promise rejected instead of resolved
    Rejected to value: [TypeError: likeDoc.data is not a function]

      134 |       (getDoc as jest.Mock).mockResolvedValue({ exists: false });
      135 |
    > 136 |       await expect(likeService.unlikePhoto(mockPhotoId, mockUserId)).resolves.not.toThrow();
          |             ^
      137 |
      138 |       expect(deleteDoc).not.toHaveBeenCalled();
      139 |     });

      at expect (node_modules/expect/build/index.js:113:15)
      at Object.expect (__tests__/likeService.test.ts:136:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

  ● likeService › unlikePhoto › should not decrement below zero

    TypeError: likeDoc.data is not a function

      60 |   // Check if like exists before deleting
      61 |   const likeDoc = await getDoc(likeRef);
    > 62 |   if (!likeDoc.data()) {
         |                ^
      63 |     return; // Already unliked
      64 |   }
      65 |

      at Object.data (src/services/likeService.ts:62:16)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● likeService › toggleLike › should unlike if already liked

    TypeError: likeDoc.data is not a function

      119 |   const likeRef = doc(collection(db, 'photos', photoId, LIKES_SUBCOLLECTION), userId);
      120 |   const likeDoc = await getDoc(likeRef);
    > 121 |   return !!likeDoc.data();
          |                    ^
      122 | }
      123 |
      124 | /**

      at data (src/services/likeService.ts:121:20)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● likeService › toggleLike › should like if not already liked

    TypeError: likeDoc.data is not a function

      119 |   const likeRef = doc(collection(db, 'photos', photoId, LIKES_SUBCOLLECTION), userId);
[0m
[0m# [0mTodos
[ ] Fix eventService.test.ts mock for joinEvent test
[ ] Fix commentService.test.ts mock for subscribeToCommentCount test
[ ] Fix likeService.test.ts mocks for all failing tests
[ ] Find and fix the 2 other failing test suites
[ ] Run tests again to verify all pass
[0m
The tests are failing because the service code was recently changed to use `doc.data()` instead of `doc.exists`, but the test mocks still use the old pattern. I need to fix the test mocks to include a `data()` method. Let me identify all failing tests and fix them:
Let me examine the failing test files in detail:
[0m→ [0mRead __tests__/commentService.test.ts[90m [limit=50, offset=270][0m
[0m→ [0mRead __tests__/eventService.test.ts[90m [limit=20, offset=200][0m
[0m→ [0mRead __tests__/likeService.test.ts[90m [limit=100, offset=1][0m
[0m→ [0mRead src/services/likeService.ts
[0m→ [0mRead __tests__/likeService.test.ts[90m [offset=100][0m
Let me read the likeService.ts to understand what's expected:
[0m
[0m# [0mTodos
[ ] Fix eventService.test.ts mock for joinEvent test
[ ] Fix commentService.test.ts mock for subscribeToCommentCount test
[ ] Fix likeService.test.ts mocks for all failing tests
[ ] Run tests again to verify all pass
[0m
Now I understand the issue. The tests are mocking document snapshots with `{ exists: false/true }` but the service code now uses `.data()` method. I need to add `data()` methods to all the mocks. Let me fix them systematically:
[0m← [0mEdit __tests__/eventService.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/eventService.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/eventService.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/eventService.test.ts
@@ -201,9 +201,9 @@
 
 it('should not add if event does not exist', async () => {
   const mockEventId = 'event-123';
   (doc as jest.Mock).mockReturnValue({});
-  (getDoc as jest.Mock).mockResolvedValue({ exists: false });
+  (getDoc as jest.Mock).mockResolvedValue({ data: () => null });
 
   await joinEvent(mockEventId, mockUserId);
 
   expect(setDoc).not.toHaveBeenCalled();

[0m
[0m← [0mEdit __tests__/commentService.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/commentService.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/commentService.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/commentService.test.ts
@@ -293,9 +293,9 @@
 
     subscribeToCommentCount(mockPhotoId, mockOnUpdate);
 
     const callback = (onSnapshot as jest.Mock).mock.calls[0][1];
-    callback({ exists: false });
+    callback({ data: () => null });
 
     expect(mockOnUpdate).toHaveBeenCalledWith(0);
   });
 });

[0m
Now let me fix likeService.test.ts. I'll update all the failing mocks:
[0m← [0mEdit __tests__/likeService.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
@@ -80,9 +80,9 @@
 it('should throw error if photo does not exist', async () => {
   const mockLikeRef = { path: '' };
   const mockPhotoRef = { path: '' };
   const mockTransaction = {
-    get: jest.fn().mockResolvedValue({ exists: false }),
+    get: jest.fn().mockResolvedValue({ exists: false, data: () => null }),
     update: jest.fn(),
   };
 
   (doc as jest.Mock).mockReturnValueOnce(mockLikeRef).mockReturnValueOnce(mockPhotoRef);

[0m
[0m← [0mEdit __tests__/likeService.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/likeService.test.ts
@@ -114,9 +114,9 @@
 
     (collection as jest.Mock).mockReturnValueOnce({});
     (doc as jest.Mock).mockReturnValueOnce(mockLikeRef).mockReturnValueOnce(mockPhotoRef);
 
-    (getDoc as jest.Mock).mockResolvedValue({ exists: true });
+    (getDoc as jest.Mock).mockResolvedValue({ exists: true, data: () => ({}) });
 
     (runTransaction as jest.Mock).mockImplementation(async (db, operation) => {
       await operation(mockTransaction);
     });
@@ -152,9 +152,9 @@
 
     (collection as jest.Mock).mockReturnValueOnce({});
     (doc as jest.Mock).mockReturnValueOnce(mockLikeRef).mockReturnValueOnce(mockPhotoRef);
 
-    (getDoc as jest.Mock).mockResolvedValue({ exists: true });
+    (getDoc as jest.Mock).mockResolvedValue({ exists: true, data: () => ({}) });
 
     (runTransaction as jest.Mock).mockImplementation(async (db, operation) => {
       await operation(mockTransaction);
     });
@@ -229,9 +229,9 @@
 
 describe('hasUserLiked', () => {
   it('should return true if like document exists', async () => {
     (doc as jest.Mock).mockReturnValueOnce({});
-    (getDoc as jest.Mock).mockResolvedValue({ exists: true });
+    (getDoc as jest.Mock).mockResolvedValue({ exists: true, data: () => ({}) });
 
     const result = await likeService.hasUserLiked(mockPhotoId, mockUserId);
 
     expect(result).toBe(true);

[0m
[0m→ [0mRead __tests__/likeService.test.ts[90m [limit=40, offset=100][0m
Let me be more precise. I'll fix each occurrence individually to avoid unintended changes:
