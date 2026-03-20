# Iteration 52 - pictureshare

**Timestamp:** Thu Mar 19 09:51:04 PM EDT 2026
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
--
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
```

**Decision:**
- **Is this a code/syntax error?** → Fix the code
- **Is this a missing/version dependency error?** → Update the version constraint
- **Is this an environment/setup error?** → Mark in README as prerequisite, exclude from CI, or skip

**Do the minimal fix to make the error go away, then commit.**

### Previous Attempt (Iteration 51):
**Files created/modified:**
```

```

**Last Output:**
```
## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
```

**Decision:**
- **Is this a code/syntax error?** → Fix the code
- **Is this a missing/version dependency error?** → Update the version constraint
- **Is this an environment/setup error?** → Mark in README as prerequisite, exclude from CI, or skip

**Do the minimal fix to make the error go away, then commit.**

### Previous Attempt (Iteration 50):
**Files created/modified:**
```

```

**Last Output:**
--
## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
I need to examine the test failure. Let me look at the relevant test file and service code to understand the issue.
[0m→ [0mRead src/services/offlineQueue.ts[90m [limit=20, offset=125][0m
```

**Guidance:** Continue from where we left off. Don't re-do work already done. Focus on the next incomplete piece.
```

## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
I'll examine the codebase to understand what utilities and services need tests, then write comprehensive unit tests for them.
[0m✱ [0mGlob "**/__tests__/**/*.test.ts"[90m 9 matches[0m
[0m✱ [0mGlob "**/*.ts"[90m 23 matches[0m
[0m→ [0mRead package.json
I'll analyze the codebase to understand the testing setup and identify what needs to be fixed. Let me start by examining the project structure and existing test files.
[0m✱ [0mGlob "src/**/*.ts"[90m 14 matches[0m
[0m→ [0mRead package.json
[0m
[0m$ [0mfind . -type f -name "*.test.*" -o -name "*.spec.*" | head -20
./node_modules/@jest/pattern/src/__tests__/TestPathPatterns.test.ts
./node_modules/@jest/pattern/src/__tests__/__snapshots__/TestPathPatterns.test.ts.snap
./node_modules/@expo/cli/build/src/start/server/type-generation/__typetests__/route.test.js
./node_modules/@expo/cli/build/src/start/server/type-generation/__typetests__/route.test.js.map
./node_modules/@sinonjs/commons/lib/class-name.test.js
./node_modules/@sinonjs/commons/lib/type-of.test.js
./node_modules/@sinonjs/commons/lib/every.test.js
./node_modules/@sinonjs/commons/lib/index.test.js
./node_modules/@sinonjs/commons/lib/order-by-first-call.test.js
./node_modules/@sinonjs/commons/lib/global.test.js
./node_modules/@sinonjs/commons/lib/deprecated.test.js
./node_modules/@sinonjs/commons/lib/function-name.test.js
./node_modules/@sinonjs/commons/lib/value-to-string.test.js
./node_modules/@sinonjs/commons/lib/called-in-order.test.js
./node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.test.js
./node_modules/@sinonjs/commons/lib/prototypes/index.test.js
./node_modules/@firebase/logger/dist/test/custom-logger.test.d.ts
./node_modules/@firebase/logger/dist/test/logger.test.d.ts
./node_modules/@firebase/logger/dist/esm/test/custom-logger.test.d.ts
./node_modules/@firebase/logger/dist/esm/test/logger.test.d.ts
[0m
[0m→ [0mRead __tests__/codeGenerator.test.ts
[0m→ [0mRead src/utils/codeGenerator.ts
[0m→ [0mRead __tests__/imagePicker.test.ts
[0m→ [0mRead src/utils/imagePicker.ts
Let me check for Jest configuration and look at the utilities that need testing:
[0m✱ [0mGlob "jest.config.*"[90m 1 match[0m
[0m→ [0mRead src/utils/codeGenerator.ts
[0m→ [0mRead src/services/offlineQueue.ts
[0m→ [0mRead src/utils/imagePicker.ts
[0m→ [0mRead jest.config.js
Now let me check the service wrapper tests and the offlineQueue service that was mentioned:
[0m→ [0mRead __tests__/firebase.test.ts
[0m→ [0mRead src/services/offlineQueue.ts
[0m→ [0mRead __tests__/offlineQueue.test.ts
[0m→ [0mRead src/services/firebase.ts
[0m
[0m$ [0mnpm test 2>&1 | head -100
> pictureshare@1.0.0 test
> jest

PASS __tests__/eventService.test.ts
FAIL __tests__/firebase.test.ts
  ● Console

    console.error
      Error signing in with Google: Error: User cancelled Google sign-in
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:137:15)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: Google sign-in failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:139:13)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: No ID token received from Google
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:146:13)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.signInWithGoogle › should successfully sign in with Google and return user

    TypeError: firebase.storeUserMapping.mockResolvedValue is not a function

      245 |
      246 |       // Mock firebase.storeUserMapping
    > 247 |       (firebase.storeUserMapping as jest.Mock).mockResolvedValue(undefined);
          |                                                ^
      248 |
      249 |       // Mock doc and setDoc
      250 |       const mockUserRef = { path: '' };

      at Object.mockResolvedValue (__tests__/firebase.test.ts:247:48)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

PASS __tests__/imagePicker.test.ts
  ● Console

    console.error
      Error compressing image: Error: Compression failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/imagePicker.test.ts:116:9)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
[0m
Now I can see the actual test failures. Let me examine the failing test files:
[0m→ [0mRead __tests__/firebase.test.ts
[0m→ [0mRead __tests__/imagePicker.test.ts
Let me check the remaining service test files to see if any are failing:
[0m→ [0mRead __tests__/photoService.test.ts
[0m→ [0mRead __tests__/likeService.test.ts
[0m→ [0mRead __tests__/eventService.test.ts
[0m→ [0mRead __tests__/participantService.test.ts
Let me read the firebase service to understand its structure:
[0m→ [0mRead src/services/firebase.ts
Let me run the tests to see what's actually failing and also check the Jest configuration:
[0m✱ [0mGlob "jest.config.*"[90m 1 match[0m
[0m✱ [0mGlob "babel.config.*"[90m 1 match[0m
[0m
[0m$ [0mnpm test 2>&1 | head -150
> pictureshare@1.0.0 test
> jest

PASS __tests__/eventService.test.ts
FAIL __tests__/firebase.test.ts
  ● Console

    console.error
      Error signing in with Google: Error: User cancelled Google sign-in
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:137:15)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: Google sign-in failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:139:13)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: No ID token received from Google
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:146:13)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.signInWithGoogle › should successfully sign in with Google and return user

    TypeError: firebase.storeUserMapping.mockResolvedValue is not a function

      245 |
      246 |       // Mock firebase.storeUserMapping
    > 247 |       (firebase.storeUserMapping as jest.Mock).mockResolvedValue(undefined);
          |                                                ^
      248 |
      249 |       // Mock doc and setDoc
      250 |       const mockUserRef = { path: '' };

      at Object.mockResolvedValue (__tests__/firebase.test.ts:247:48)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

PASS __tests__/photoService.test.ts
  ● Console

    console.error
      Error uploading photo to storage: Error: Upload failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:135:51)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:397:39
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:404:13)
          at Object.mockConstructor [as then] (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:108:19)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      83 |     return storagePath;
      84 |   } catch (error) {
    > 85 |     console.error('Error uploading photo to storage:', error);
         |             ^
      86 |     throw error;
      87 |   }
      88 | }

      at error (src/services/photoService.ts:85:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error deleting photo from storage: Error: Storage error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:196:53)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      129 |     await deleteObject(storageRef);
      130 |   } catch (error) {
    > 131 |     console.error('Error deleting photo from storage:', error);
          |             ^
      132 |     // Continue to delete metadata even if storage deletion fails
      133 |   }
      134 |

      at error (src/services/photoService.ts:131:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error in photos subscription: Error: Subscription error
[0m
Let me read the configuration files and see the complete test output:
[0m→ [0mRead jest.config.js
[0m→ [0mRead babel.config.js
[0m
[0m$ [0mnpm test 2>&1 | tail -100
console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.error
      Failed to upload offline item item-123: Error: Upload failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:245:59)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      205 |       }
      206 |     } catch (error) {
    > 207 |       console.error(`Failed to upload offline item ${item.id}:`, error);
          |               ^
      208 |       const errorMessage = error instanceof Error ? error.message : String(error);
      209 |       await updateItemRetry(item.id, errorMessage);
      210 |

      at error (src/services/offlineQueue.ts:207:15)
          at _loop.throw (<anonymous>)
      at _loop (src/services/offlineQueue.ts:159:27)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.log
      Will retry item-123 in 2000ms

      at log (src/services/offlineQueue.ts:213:15)
          at _loop.next (<anonymous>)

    console.log
      Offline queue initialized

      at log (src/services/offlineQueue.ts:225:13)

    console.error
      Error initializing offline queue: Error: Init error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:273:64)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      228 |     await processOfflineQueue();
      229 |   } catch (error) {
    > 230 |     console.error('Error initializing offline queue:', error);
          |             ^
      231 |   }
      232 | }
      233 |

      at error (src/services/offlineQueue.ts:230:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)


Test Suites: 1 failed, 8 passed, 9 total
Tests:       1 failed, 2 skipped, 138 passed, 141 total
Snapshots:   0 total
Time:        3.372 s
Ran all test suites.
[0m
Let me check what test files exist:
[0m
[0m$ [0mls -la __tests__/
total 116
drwxr-xr-x  2 julien julien  4096 Mar 19 20:52 .
drwxr-xr-x 10 julien julien  4096 Mar 19 19:41 ..
-rw-r--r--  1 julien julien  3379 Mar 19 20:23 codeGenerator.test.ts
-rw-r--r--  1 julien julien 11732 Mar 19 21:23 commentService.test.ts
-rw-r--r--  1 julien julien  7035 Mar 19 21:32 eventService.test.ts
-rw-r--r--  1 julien julien  9707 Mar 19 21:48 firebase.test.ts
-rw-r--r--  1 julien julien 13433 Mar 19 20:48 imagePicker.test.ts
-rw-r--r--  1 julien julien  9613 Mar 19 20:53 likeService.test.ts
-rw-r--r--  1 julien julien  9442 Mar 19 20:39 offlineQueue.test.ts
-rw-r--r--  1 julien julien  8212 Mar 19 20:46 participantService.test.ts
-rw-r--r--  1 julien julien 18360 Mar 19 21:07 photoService.test.ts
[0m
Perfect! Test files already exist for all required utilities and services. The only failing test is `firebase.test.ts`. Let me fix the specific error:
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -243,9 +243,11 @@
   (GoogleAuthProvider.credential as jest.Mock).mockReturnValue({});
   (signInWithCredential as jest.Mock).mockResolvedValue(mockUserCredential);
 
   // Mock firebase.storeUserMapping
-  (firebase.storeUserMapping as jest.Mock).mockResolvedValue(undefined);
+  const storeUserMappingSpy = jest
+    .spyOn(firebase, 'storeUserMapping')
+    .mockResolvedValue(undefined);
 
   // Mock doc and setDoc
   const mockUserRef = { path: '' };
   (doc as jest.Mock).mockReturnValue(mockUserRef);
@@ -266,12 +268,9 @@
     email: mockUserCredential.user.email,
     displayName: mockUserCredential.user.displayName,
     photoURL: mockUserCredential.user.photoURL,
   });
-  expect(AsyncStorage.setItem).toHaveBeenCalledWith(
-    'user_mapping',
-    expect.stringContaining(result.id)
-  );
+  expect(storeUserMappingSpy).toHaveBeenCalledWith(expect.objectContaining({ id: result.id }));
   expect(setDoc).toHaveBeenCalledWith(
     mockUserRef,
     expect.objectContaining({
       id: result.id,
@@ -279,8 +278,11 @@
       displayName: result.displayName,
       photoURL: result.photoURL,
     })
   );
+
+  // Clean up spy
+  storeUserMappingSpy.mockRestore();
 });
 
 it('should throw error when user cancels Google sign-in', async () => {
   (AuthRequest as jest.Mock).mockImplementation(() => ({

[0m
Now let's run the tests to verify the fix:
[0m✗ [0medit failed
[91m[1mError: [0mFile /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts has been modified since it was last read.
Last modification: 2026-03-20T01:52:19.234Z
Last read: 2026-03-20T01:51:24.322Z

Please read the file again before modifying it.
The test failure is clear. In `firebase.test.ts`, the mock for the firebase module only provides `db: {}`, but the test tries to use `firebase.storeUserMapping.mockResolvedValue()`. Since `storeUserMapping` is not mocked as a jest.fn(), it's the actual function and doesn't have mock methods.

Let me fix the firebase.test.ts mock to include all exported functions:
[0m→ [0mRead __tests__/firebase.test.ts
[0m$ [0mnpm test 2>&1
> pictureshare@1.0.0 test
> jest

PASS __tests__/eventService.test.ts
PASS __tests__/imagePicker.test.ts
  ● Console

    console.error
      Error compressing image: Error: Compression failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/imagePicker.test.ts:116:9)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      57 |     };
      58 |   } catch (error) {
    > 59 |     console.error('Error compressing image:', error);
         |             ^
      60 |     // Return original if compression fails
      61 |     return { uri: imageUri, width, height };
      62 |   }

      at Object.error (src/utils/imagePicker.ts:59:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error taking photo: Error: Camera error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/imagePicker.test.ts:271:70)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      136 |     return compressed;
      137 |   } catch (error) {
    > 138 |     console.error('Error taking photo:', error);
          |             ^
      139 |     Alert.alert('Camera Error', 'Failed to take photo. Please try again.');
      140 |     return null;
      141 |   }

      at Object.error (src/utils/imagePicker.ts:138:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error picking image: Error: Gallery error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/imagePicker.test.ts:336:9)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      173 |     return compressed;
      174 |   } catch (error) {
    > 175 |     console.error('Error picking image:', error);
          |             ^
      176 |     Alert.alert('Gallery Error', 'Failed to select photo. Please try again.');
      177 |     return null;
      178 |   }

      at Object.error (src/utils/imagePicker.ts:175:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

PASS __tests__/photoService.test.ts
  ● Console

    console.error
      Error uploading photo to storage: Error: Upload failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:135:51)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:397:39
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:404:13)
          at Object.mockConstructor [as then] (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:108:19)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      83 |     return storagePath;
      84 |   } catch (error) {
    > 85 |     console.error('Error uploading photo to storage:', error);
         |             ^
      86 |     throw error;
      87 |   }
      88 | }

      at error (src/services/photoService.ts:85:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error deleting photo from storage: Error: Storage error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:196:53)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      129 |     await deleteObject(storageRef);
      130 |   } catch (error) {
    > 131 |     console.error('Error deleting photo from storage:', error);
          |             ^
      132 |     // Continue to delete metadata even if storage deletion fails
      133 |   }
      134 |

      at error (src/services/photoService.ts:131:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error in photos subscription: Error: Subscription error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:371:21)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      228 |     },
      229 |     (error) => {
    > 230 |       console.error('Error in photos subscription:', error);
          |               ^
      231 |       onPhotosUpdate([]);
      232 |     }
      233 |   );

      at error (src/services/photoService.ts:230:15)
      at Object.errorCallback (__tests__/photoService.test.ts:371:7)

    console.error
      Error loading photos batch: Error: Query failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:417:48)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      285 |     return { photos, lastDoc };
      286 |   } catch (error) {
    > 287 |     console.error('Error loading photos batch:', error);
          |             ^
      288 |     throw error;
      289 |   }
      290 | }

      at error (src/services/photoService.ts:287:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error checking delete permission: Error: Database error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:503:47)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      338 |     return false;
      339 |   } catch (error) {
    > 340 |     console.error('Error checking delete permission:', error);
          |             ^
      341 |     return false;
      342 |   }
      343 | }

      at error (src/services/photoService.ts:340:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error checking delete permission: Error: Database error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:503:47)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      338 |     return false;
      339 |   } catch (error) {
    > 340 |     console.error('Error checking delete permission:', error);
          |             ^
      341 |     return false;
      342 |   }
      343 | }

      at error (src/services/photoService.ts:340:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

PASS __tests__/commentService.test.ts
PASS __tests__/codeGenerator.test.ts
PASS __tests__/likeService.test.ts
PASS __tests__/participantService.test.ts
  ● Console

    console.error
      Error fetching participants with stats: Error: Database error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/participantService.test.ts:140:47)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      78 |     return participantsWithStats;
      79 |   } catch (error) {
    > 80 |     console.error('Error fetching participants with stats:', error);
         |             ^
      81 |     return [];
      82 |   }
      83 | }

      at Object.error (src/services/participantService.ts:80:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

FAIL __tests__/firebase.test.ts
  ● Console

    console.error
      Error signing in with Google: Error: User cancelled Google sign-in
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:137:15)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: Google sign-in failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:139:13)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: No ID token received from Google
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:146:13)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.signInWithGoogle › should successfully sign in with Google and return user

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: ObjectContaining {"id": "google-user-123"}

    Number of calls: 0

      270 |         photoURL: mockUserCredential.user.photoURL,
      271 |       });
    > 272 |       expect(storeUserMappingSpy).toHaveBeenCalledWith(expect.objectContaining({ id: result.id }));
          |                                   ^
      273 |       expect(setDoc).toHaveBeenCalledWith(
      274 |         mockUserRef,
      275 |         expect.objectContaining({

      at Object.toHaveBeenCalledWith (__tests__/firebase.test.ts:272:35)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

PASS __tests__/offlineQueue.test.ts
  ● Console

    console.error
      Error reading offline queue: Error: Storage error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:77:61)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      59 |     return queueJson ? JSON.parse(queueJson) : [];
      60 |   } catch (error) {
    > 61 |     console.error('Error reading offline queue:', error);
         |             ^
      62 |     return [];
      63 |   }
      64 | }

      at error (src/services/offlineQueue.ts:61:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.log
      Successfully uploaded offline item item-123

      at log (src/services/offlineQueue.ts:195:15)
          at _loop.next (<anonymous>)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.warn
      Skipping item item-123 - max retries (5) exceeded

      161 |       // Check if we should retry based on retry count
      162 |       if (item.retryCount >= maxRetries) {
    > 163 |         console.warn(`Skipping item ${item.id} - max retries (${maxRetries}) exceeded`);
          |                 ^
      164 |         continue;
      165 |       }
      166 |

      at warn (src/services/offlineQueue.ts:163:17)
          at _loop.next (<anonymous>)
      at _loop (src/services/offlineQueue.ts:159:27)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.log
      Still offline, stopping queue processing

      at log (src/services/offlineQueue.ts:170:17)
          at _loop.next (<anonymous>)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.error
      Failed to upload offline item item-123: Error: Upload failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:245:59)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      205 |       }
      206 |     } catch (error) {
    > 207 |       console.error(`Failed to upload offline item ${item.id}:`, error);
          |               ^
      208 |       const errorMessage = error instanceof Error ? error.message : String(error);
      209 |       await updateItemRetry(item.id, errorMessage);
      210 |

      at error (src/services/offlineQueue.ts:207:15)
          at _loop.throw (<anonymous>)
      at _loop (src/services/offlineQueue.ts:159:27)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.log
      Will retry item-123 in 2000ms

      at log (src/services/offlineQueue.ts:213:15)
          at _loop.next (<anonymous>)

    console.log
      Offline queue initialized

      at log (src/services/offlineQueue.ts:225:13)

    console.error
      Error initializing offline queue: Error: Init error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:273:64)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      228 |     await processOfflineQueue();
      229 |   } catch (error) {
    > 230 |     console.error('Error initializing offline queue:', error);
          |             ^
      231 |   }
      232 | }
      233 |

      at error (src/services/offlineQueue.ts:230:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)


Test Suites: 1 failed, 8 passed, 9 total
Tests:       1 failed, 2 skipped, 138 passed, 141 total
Snapshots:   0 total
Time:        2.98 s, estimated 3 s
Ran all test suites.
[0m
Now I see the issue. The test imports `* as firebase from '../src/services/firebase'` but there is NO `jest.mock('../src/services/firebase', ...)` call. Without this mock, the actual module is imported and its functions are not jest.fn() mocks, causing the spy to fail.

Let me add the missing mock for the local firebase service:
[0m
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -72,8 +72,23 @@
   getItem: jest.fn(),
   setItem: jest.fn(),
 }));
 
+// Mock the local firebase service module
+jest.mock('../src/services/firebase', () => ({
+  auth: {},
+  db: {},
+  storage: {},
+  googleProvider: {},
+  WebBrowser: { maybeCompleteAuthSession: jest.fn() },
+  Google: { discovery: {} },
+  storeUserMapping: jest.fn(),
+  getUserMapping: jest.fn(),
+  signInAnonymouslyLocally: jest.fn(),
+  signInWithGoogle: jest.fn(),
+  onAuthStateChangedListener: jest.fn(),
+}));
+
 describe('firebase', () => {
   const mockUser = {
     uid: 'user-123',
     email: 'test@example.com',

[0m
Now let's run the tests again to verify the fix:
[0m$ [0mnpm test 2>&1
> pictureshare@1.0.0 test
> jest

PASS __tests__/eventService.test.ts
PASS __tests__/participantService.test.ts
  ● Console

    console.error
      Error fetching participants with stats: Error: Database error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/participantService.test.ts:140:47)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      78 |     return participantsWithStats;
      79 |   } catch (error) {
    > 80 |     console.error('Error fetching participants with stats:', error);
         |             ^
      81 |     return [];
      82 |   }
      83 | }

      at Object.error (src/services/participantService.ts:80:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

PASS __tests__/photoService.test.ts
  ● Console

    console.error
      Error uploading photo to storage: Error: Upload failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:135:51)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:397:39
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:404:13)
          at Object.mockConstructor [as then] (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:108:19)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      83 |     return storagePath;
      84 |   } catch (error) {
    > 85 |     console.error('Error uploading photo to storage:', error);
         |             ^
      86 |     throw error;
      87 |   }
      88 | }

      at error (src/services/photoService.ts:85:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error deleting photo from storage: Error: Storage error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:196:53)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      129 |     await deleteObject(storageRef);
      130 |   } catch (error) {
    > 131 |     console.error('Error deleting photo from storage:', error);
          |             ^
      132 |     // Continue to delete metadata even if storage deletion fails
      133 |   }
      134 |

      at error (src/services/photoService.ts:131:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error in photos subscription: Error: Subscription error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:371:21)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      228 |     },
      229 |     (error) => {
    > 230 |       console.error('Error in photos subscription:', error);
          |               ^
      231 |       onPhotosUpdate([]);
      232 |     }
      233 |   );

      at error (src/services/photoService.ts:230:15)
      at Object.errorCallback (__tests__/photoService.test.ts:371:7)

    console.error
      Error loading photos batch: Error: Query failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:417:48)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      285 |     return { photos, lastDoc };
      286 |   } catch (error) {
    > 287 |     console.error('Error loading photos batch:', error);
          |             ^
      288 |     throw error;
      289 |   }
      290 | }

      at error (src/services/photoService.ts:287:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error checking delete permission: Error: Database error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:503:47)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      338 |     return false;
      339 |   } catch (error) {
    > 340 |     console.error('Error checking delete permission:', error);
          |             ^
      341 |     return false;
      342 |   }
      343 | }

      at error (src/services/photoService.ts:340:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error checking delete permission: Error: Database error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:503:47)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      338 |     return false;
      339 |   } catch (error) {
    > 340 |     console.error('Error checking delete permission:', error);
          |             ^
      341 |     return false;
      342 |   }
      343 | }

      at error (src/services/photoService.ts:340:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

PASS __tests__/imagePicker.test.ts
  ● Console

    console.error
      Error compressing image: Error: Compression failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/imagePicker.test.ts:116:9)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      57 |     };
      58 |   } catch (error) {
    > 59 |     console.error('Error compressing image:', error);
         |             ^
      60 |     // Return original if compression fails
      61 |     return { uri: imageUri, width, height };
      62 |   }

      at Object.error (src/utils/imagePicker.ts:59:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error taking photo: Error: Camera error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/imagePicker.test.ts:271:70)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      136 |     return compressed;
      137 |   } catch (error) {
    > 138 |     console.error('Error taking photo:', error);
          |             ^
      139 |     Alert.alert('Camera Error', 'Failed to take photo. Please try again.');
      140 |     return null;
      141 |   }

      at Object.error (src/utils/imagePicker.ts:138:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error picking image: Error: Gallery error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/imagePicker.test.ts:336:9)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      173 |     return compressed;
      174 |   } catch (error) {
    > 175 |     console.error('Error picking image:', error);
          |             ^
      176 |     Alert.alert('Gallery Error', 'Failed to select photo. Please try again.');
      177 |     return null;
      178 |   }

      at Object.error (src/utils/imagePicker.ts:175:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

PASS __tests__/likeService.test.ts
PASS __tests__/codeGenerator.test.ts
PASS __tests__/commentService.test.ts
FAIL __tests__/firebase.test.ts
  ● firebase › firebase.storeUserMapping › should store user mapping in AsyncStorage

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: "user_mapping", StringContaining "user-123"

    Number of calls: 0

      115 |       await firebase.storeUserMapping(user);
      116 |
    > 117 |       expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          |                                    ^
      118 |         'user_mapping',
      119 |         expect.stringContaining('user-123')
      120 |       );

      at Object.toHaveBeenCalledWith (__tests__/firebase.test.ts:117:36)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.storeUserMapping › should update existing mappings

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: "user_mapping", StringContaining "existing-user"

    Number of calls: 0

      133 |       });
      134 |
    > 135 |       expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          |                                    ^
      136 |         'user_mapping',
      137 |         expect.stringContaining('existing-user')
      138 |       );

      at Object.toHaveBeenCalledWith (__tests__/firebase.test.ts:135:36)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.getUserMapping › should return user if found

    expect(received).toEqual(expected) // deep equality

    Expected: {"displayName": "Test", "email": "test@example.com", "id": "user-123", "lastUpdated": Any<String>}
    Received: undefined

      154 |       const result = await firebase.getUserMapping('user-123');
      155 |
    > 156 |       expect(result).toEqual({
          |                      ^
      157 |         id: 'user-123',
      158 |         email: 'test@example.com',
      159 |         displayName: 'Test',

      at Object.toEqual (__tests__/firebase.test.ts:156:22)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.getUserMapping › should return null if user not found

    expect(received).toBeNull()

    Received: undefined

      167 |       const result = await firebase.getUserMapping('unknown');
      168 |
    > 169 |       expect(result).toBeNull();
          |                      ^
      170 |     });
      171 |
      172 |     it('should return null if no data stored', async () => {

      at Object.toBeNull (__tests__/firebase.test.ts:169:22)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.getUserMapping › should return null if no data stored

    expect(received).toBeNull()

    Received: undefined

      175 |       const result = await firebase.getUserMapping('user-123');
      176 |
    > 177 |       expect(result).toBeNull();
          |                      ^
      178 |     });
      179 |   });
      180 |

      at Object.toBeNull (__tests__/firebase.test.ts:177:22)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.signInAnonymouslyLocally › should sign in anonymously and return user

    expect(received).toEqual(expected) // deep equality

    Expected: {"displayName": "Test User", "email": "test@example.com", "id": "user-123", "photoURL": "https://example.com/photo.jpg"}
    Received: undefined

      187 |       const result = await firebase.signInAnonymouslyLocally();
      188 |
    > 189 |       expect(result).toEqual({
          |                      ^
      190 |         id: mockUser.uid,
      191 |         email: mockUser.email,
      192 |         displayName: mockUser.displayName,

      at Object.toEqual (__tests__/firebase.test.ts:189:22)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.onAuthStateChangedListener › should call callback with user when auth state changes

    expect(received).toBe(expected) // Object.is equality

    Expected: [Function mockConstructor]
    Received: undefined

      208 |       const result = firebase.onAuthStateChangedListener(callback);
      209 |
    > 210 |       expect(result).toBe(unsubscribe);
          |                      ^
      211 |       expect(onAuthStateChanged).toHaveBeenCalledWith(auth, expect.any(Function));
      212 |
      213 |       // Simulate auth state change

      at Object.toBe (__tests__/firebase.test.ts:210:22)

  ● firebase › firebase.onAuthStateChangedListener › should call callback with null when user signs out

    TypeError: Cannot read properties of undefined (reading '1')

      230 |       firebase.onAuthStateChangedListener(callback);
      231 |
    > 232 |       const listenerCallback = (onAuthStateChanged as jest.Mock).mock.calls[0][1];
          |                                                                               ^
      233 |       listenerCallback(null);
      234 |
      235 |       expect(callback).toHaveBeenCalledWith(null);

      at Object.<anonymous> (__tests__/firebase.test.ts:232:79)

  ● firebase › firebase.signInWithGoogle › should successfully sign in with Google and return user

    expect(received).toEqual(expected) // deep equality

    Expected: {"displayName": "Google User", "email": "google@example.com", "id": "google-user-123", "photoURL": "https://example.com/photo.jpg"}
    Received: undefined

      279 |       const result = await firebase.signInWithGoogle();
      280 |
    > 281 |       expect(result).toEqual({
          |                      ^
      282 |         id: mockUserCredential.user.uid,
      283 |         email: mockUserCredential.user.email,
      284 |         displayName: mockUserCredential.user.displayName,

      at Object.toEqual (__tests__/firebase.test.ts:281:22)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.signInWithGoogle › should throw error when user cancels Google sign-in

    expect(received).rejects.toThrow()

    Matcher error: received value must be a promise or a function returning a promise

    Received has value: undefined

      305 |       }));
      306 |
    > 307 |       await expect(firebase.signInWithGoogle()).rejects.toThrow('User cancelled Google sign-in');
          |                                                         ^
      308 |     });
      309 |
      310 |     it('should throw error when Google sign-in fails', async () => {

      at Object.toThrow (node_modules/expect/build/index.js:204:13)
      at Object.toThrow (__tests__/firebase.test.ts:307:57)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

  ● firebase › firebase.signInWithGoogle › should throw error when Google sign-in fails

    expect(received).rejects.toThrow()

    Matcher error: received value must be a promise or a function returning a promise

    Received has value: undefined

      313 |       }));
      314 |
    > 315 |       await expect(firebase.signInWithGoogle()).rejects.toThrow('Google sign-in failed');
          |                                                         ^
      316 |     });
      317 |
      318 |     it('should throw error when no ID token received', async () => {

      at Object.toThrow (node_modules/expect/build/index.js:204:13)
      at Object.toThrow (__tests__/firebase.test.ts:315:57)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

  ● firebase › firebase.signInWithGoogle › should throw error when no ID token received

    expect(received).rejects.toThrow()

    Matcher error: received value must be a promise or a function returning a promise

    Received has value: undefined

      321 |       }));
      322 |
    > 323 |       await expect(firebase.signInWithGoogle()).rejects.toThrow('No ID token received from Google');
          |                                                         ^
      324 |     });
      325 |   });
      326 | });

      at Object.toThrow (node_modules/expect/build/index.js:204:13)
      at Object.toThrow (__tests__/firebase.test.ts:323:57)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

PASS __tests__/offlineQueue.test.ts
  ● Console

    console.error
      Error reading offline queue: Error: Storage error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:77:61)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      59 |     return queueJson ? JSON.parse(queueJson) : [];
      60 |   } catch (error) {
    > 61 |     console.error('Error reading offline queue:', error);
         |             ^
      62 |     return [];
      63 |   }
      64 | }

      at error (src/services/offlineQueue.ts:61:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.log
      Successfully uploaded offline item item-123

      at log (src/services/offlineQueue.ts:195:15)
          at _loop.next (<anonymous>)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.warn
      Skipping item item-123 - max retries (5) exceeded

      161 |       // Check if we should retry based on retry count
      162 |       if (item.retryCount >= maxRetries) {
    > 163 |         console.warn(`Skipping item ${item.id} - max retries (${maxRetries}) exceeded`);
          |                 ^
      164 |         continue;
      165 |       }
      166 |

      at warn (src/services/offlineQueue.ts:163:17)
          at _loop.next (<anonymous>)
      at _loop (src/services/offlineQueue.ts:159:27)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.log
      Still offline, stopping queue processing

      at log (src/services/offlineQueue.ts:170:17)
          at _loop.next (<anonymous>)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.error
      Failed to upload offline item item-123: Error: Upload failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:245:59)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      205 |       }
      206 |     } catch (error) {
    > 207 |       console.error(`Failed to upload offline item ${item.id}:`, error);
          |               ^
      208 |       const errorMessage = error instanceof Error ? error.message : String(error);
      209 |       await updateItemRetry(item.id, errorMessage);
      210 |

      at error (src/services/offlineQueue.ts:207:15)
          at _loop.throw (<anonymous>)
      at _loop (src/services/offlineQueue.ts:159:27)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.log
      Will retry item-123 in 2000ms

      at log (src/services/offlineQueue.ts:213:15)
          at _loop.next (<anonymous>)

    console.log
      Offline queue initialized

      at log (src/services/offlineQueue.ts:225:13)

    console.error
      Error initializing offline queue: Error: Init error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:273:64)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)

...2778 bytes truncated...

The tool call succeeded but the output was truncated. Full output saved to: /home/julien/.local/share/opencode/tool-output/tool_d08f203a2001iAX4meVohj509F
Use the Task tool to have explore agent process this file with Grep and Read (with offset/limit). Do NOT read the full file yourself - delegate to save context.
[0m
[0m✗ [0medit failed
[91m[1mError: [0mFile /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts has been modified since it was last read.
Last modification: 2026-03-20T01:52:40.585Z
Last read: 2026-03-20T01:52:19.266Z

Please read the file again before modifying it.
The test still fails because `storeUserMapping` is in the same module and uses lexical scoping, so spying on the export doesn't affect the internal reference. The simplest fix is to **not mock `storeUserMapping` at all** and instead verify the `AsyncStorage.setItem` call as originally intended, since `storeUserMapping` is a real function that calls AsyncStorage.

Let me revert my change and implement the correct minimal fix:
The Grep output will show me if that pattern exists. If it does, I need to replace it with a proper jest.spyOn. If it doesn't, then the issue is something else - maybe the mock functions I added need proper implementations.

Given the current failing tests for `storeUserMapping` and `getUserMapping`, those tests expect the real implementation to run, but my mock replaced them with empty jest.fn(). So I need to remove the mock for the firebase service module entirely. The original error was a test bug (direct cast), not a missing mock. Let's check if the direct cast pattern exists; if not, I'll revert my edit.

Let me check the Grep results.
[0m✱ [0mGrep "storeUserMapping as jest.Mock"[90m in __tests__/firebase.test.ts · 0 matches[0m
[0m→ [0mRead __tests__/firebase.test.ts[90m [limit=80, offset=220][0m
Let me re-read the file to see its current state:
[0m
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -257,13 +257,8 @@
   // Set up mocks for this test
   (GoogleAuthProvider.credential as jest.Mock).mockReturnValue({});
   (signInWithCredential as jest.Mock).mockResolvedValue(mockUserCredential);
 
-  // Mock firebase.storeUserMapping
-  const storeUserMappingSpy = jest
-    .spyOn(firebase, 'storeUserMapping')
-    .mockResolvedValue(undefined);
-
   // Mock doc and setDoc
   const mockUserRef = { path: '' };
   (doc as jest.Mock).mockReturnValue(mockUserRef);
   (setDoc as jest.Mock).mockResolvedValue(undefined);
@@ -283,9 +278,13 @@
     email: mockUserCredential.user.email,
     displayName: mockUserCredential.user.displayName,
     photoURL: mockUserCredential.user.photoURL,
   });
-  expect(storeUserMappingSpy).toHaveBeenCalledWith(expect.objectContaining({ id: result.id }));
+  // storeUserMapping calls AsyncStorage.setItem - verify that
+  expect(AsyncStorage.setItem).toHaveBeenCalledWith(
+    'user_mapping',
+    expect.stringContaining(result.id)
+  );
   expect(setDoc).toHaveBeenCalledWith(
     mockUserRef,
     expect.objectContaining({
       id: result.id,
@@ -293,11 +292,8 @@
       displayName: result.displayName,
       photoURL: result.photoURL,
     })
   );
-
-  // Clean up spy
-  storeUserMappingSpy.mockRestore();
 });
 
 it('should throw error when user cancels Google sign-in', async () => {
   (AuthRequest as jest.Mock).mockImplementation(() => ({

[0m
Now run tests again:
[0m$ [0mnpm test 2>&1 | tail -30
at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      228 |     await processOfflineQueue();
      229 |   } catch (error) {
    > 230 |     console.error('Error initializing offline queue:', error);
          |             ^
      231 |   }
      232 | }
      233 |

      at error (src/services/offlineQueue.ts:230:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)


Test Suites: 1 failed, 8 passed, 9 total
Tests:       12 failed, 2 skipped, 127 passed, 141 total
Snapshots:   0 total
Time:        3.055 s
Ran all test suites.
[0m
Let me get a clearer summary:
[0m$ [0mnpm test 2>&1 | grep -E "(PASS|FAIL|✓|✗)" | head -30
PASS __tests__/eventService.test.ts
FAIL __tests__/firebase.test.ts
PASS __tests__/likeService.test.ts
PASS __tests__/photoService.test.ts
PASS __tests__/imagePicker.test.ts
PASS __tests__/codeGenerator.test.ts
PASS __tests__/participantService.test.ts
PASS __tests__/commentService.test.ts
PASS __tests__/offlineQueue.test.ts
[0m
[0m$ [0mnpm test -- __tests__/firebase.test.ts 2>&1 | tail -60
306 |     it('should throw error when Google sign-in fails', async () => {

      at Object.toThrow (node_modules/expect/build/index.js:204:13)
      at Object.toThrow (__tests__/firebase.test.ts:303:57)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

  ● firebase › firebase.signInWithGoogle › should throw error when Google sign-in fails

    expect(received).rejects.toThrow()

    Matcher error: received value must be a promise or a function returning a promise

    Received has value: undefined

      309 |       }));
      310 |
    > 311 |       await expect(firebase.signInWithGoogle()).rejects.toThrow('Google sign-in failed');
          |                                                         ^
      312 |     });
      313 |
      314 |     it('should throw error when no ID token received', async () => {

      at Object.toThrow (node_modules/expect/build/index.js:204:13)
      at Object.toThrow (__tests__/firebase.test.ts:311:57)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

  ● firebase › firebase.signInWithGoogle › should throw error when no ID token received

    expect(received).rejects.toThrow()

    Matcher error: received value must be a promise or a function returning a promise

    Received has value: undefined

      317 |       }));
      318 |
    > 319 |       await expect(firebase.signInWithGoogle()).rejects.toThrow('No ID token received from Google');
          |                                                         ^
      320 |     });
      321 |   });
      322 | });

      at Object.toThrow (node_modules/expect/build/index.js:204:13)
      at Object.toThrow (__tests__/firebase.test.ts:319:57)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

Test Suites: 1 failed, 1 total
Tests:       12 failed, 12 total
Snapshots:   0 total
Time:        0.421 s, estimated 1 s
Ran all test suites matching /__tests__\/firebase.test.ts/i.
[0m
[0m→ [0mRead __tests__/firebase.test.ts[90m [limit=100, offset=239][0m
Let me check the entire test file for syntax issues:
[0m→ [0mRead __tests__/firebase.test.ts
The grep didn't find the pattern, meaning the direct cast may not exist. The current failures are because I mocked the firebase service module, breaking tests that need real implementation. Let me revert my mock addition and keep the original structure. I'll use git to restore the file to its original state:
[0m
[0m$ [0mgit checkout -- __tests__/firebase.test.ts
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

**Completed at:** Thu Mar 19 09:57:23 PM EDT 2026
Let me read the specific lines to see the exact pattern to fix:
[0m→ [0mRead __tests__/firebase.test.ts[90m [limit=15, offset=244][0m
Now I see the exact problem. Line 247 has:

```
       (firebase.storeUserMapping as jest.Mock).mockResolvedValue(undefined);
```

This incorrectly tries to cast the actual function to a Jest mock. It should use `jest.spyOn` to create a spy. Additionally, the test later calls `storeUserMappingSpy.mockRestore()`, but there's no variable defined. This needs to be assigned to `storeUserMappingSpy`.

Let me fix this single line:
[0m
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -243,9 +243,11 @@
 (GoogleAuthProvider.credential as jest.Mock).mockReturnValue({});
 (signInWithCredential as jest.Mock).mockResolvedValue(mockUserCredential);
 
 // Mock firebase.storeUserMapping
-(firebase.storeUserMapping as jest.Mock).mockResolvedValue(undefined);
+const storeUserMappingSpy = jest
+  .spyOn(firebase, 'storeUserMapping')
+  .mockResolvedValue(undefined);
 
 // Mock doc and setDoc
 const mockUserRef = { path: '' };
 (doc as jest.Mock).mockReturnValue(mockUserRef);

[0m
Now let's run the tests to verify everything passes:
[0m$ [0mnpm test 2>&1
> pictureshare@1.0.0 test
> jest

PASS __tests__/eventService.test.ts
PASS __tests__/photoService.test.ts
  ● Console

    console.error
      Error uploading photo to storage: Error: Upload failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:135:51)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:397:39
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:404:13)
          at Object.mockConstructor [as then] (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-mock/build/index.js:108:19)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      83 |     return storagePath;
      84 |   } catch (error) {
    > 85 |     console.error('Error uploading photo to storage:', error);
         |             ^
      86 |     throw error;
      87 |   }
      88 | }

      at error (src/services/photoService.ts:85:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error deleting photo from storage: Error: Storage error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:196:53)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      129 |     await deleteObject(storageRef);
      130 |   } catch (error) {
    > 131 |     console.error('Error deleting photo from storage:', error);
          |             ^
      132 |     // Continue to delete metadata even if storage deletion fails
      133 |   }
      134 |

      at error (src/services/photoService.ts:131:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error in photos subscription: Error: Subscription error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:371:21)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      228 |     },
      229 |     (error) => {
    > 230 |       console.error('Error in photos subscription:', error);
          |               ^
      231 |       onPhotosUpdate([]);
      232 |     }
      233 |   );

      at error (src/services/photoService.ts:230:15)
      at Object.errorCallback (__tests__/photoService.test.ts:371:7)

    console.error
      Error loading photos batch: Error: Query failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:417:48)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      285 |     return { photos, lastDoc };
      286 |   } catch (error) {
    > 287 |     console.error('Error loading photos batch:', error);
          |             ^
      288 |     throw error;
      289 |   }
      290 | }

      at error (src/services/photoService.ts:287:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error checking delete permission: Error: Database error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:503:47)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      338 |     return false;
      339 |   } catch (error) {
    > 340 |     console.error('Error checking delete permission:', error);
          |             ^
      341 |     return false;
      342 |   }
      343 | }

      at error (src/services/photoService.ts:340:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error checking delete permission: Error: Database error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/photoService.test.ts:503:47)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      338 |     return false;
      339 |   } catch (error) {
    > 340 |     console.error('Error checking delete permission:', error);
          |             ^
      341 |     return false;
      342 |   }
      343 | }

      at error (src/services/photoService.ts:340:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

PASS __tests__/imagePicker.test.ts
  ● Console

    console.error
      Error compressing image: Error: Compression failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/imagePicker.test.ts:116:9)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      57 |     };
      58 |   } catch (error) {
    > 59 |     console.error('Error compressing image:', error);
         |             ^
      60 |     // Return original if compression fails
      61 |     return { uri: imageUri, width, height };
      62 |   }

      at Object.error (src/utils/imagePicker.ts:59:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error taking photo: Error: Camera error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/imagePicker.test.ts:271:70)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      136 |     return compressed;
      137 |   } catch (error) {
    > 138 |     console.error('Error taking photo:', error);
          |             ^
      139 |     Alert.alert('Camera Error', 'Failed to take photo. Please try again.');
      140 |     return null;
      141 |   }

      at Object.error (src/utils/imagePicker.ts:138:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.error
      Error picking image: Error: Gallery error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/imagePicker.test.ts:336:9)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      173 |     return compressed;
      174 |   } catch (error) {
    > 175 |     console.error('Error picking image:', error);
          |             ^
      176 |     Alert.alert('Gallery Error', 'Failed to select photo. Please try again.');
      177 |     return null;
      178 |   }

      at Object.error (src/utils/imagePicker.ts:175:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

PASS __tests__/likeService.test.ts
PASS __tests__/participantService.test.ts
  ● Console

    console.error
      Error fetching participants with stats: Error: Database error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/participantService.test.ts:140:47)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      78 |     return participantsWithStats;
      79 |   } catch (error) {
    > 80 |     console.error('Error fetching participants with stats:', error);
         |             ^
      81 |     return [];
      82 |   }
      83 | }

      at Object.error (src/services/participantService.ts:80:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

PASS __tests__/codeGenerator.test.ts
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

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: Google sign-in failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:139:13)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.error
      Error signing in with Google: Error: No ID token received from Google
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/src/services/firebase.ts:146:13)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)

      169 |     return appUser;
      170 |   } catch (error) {
    > 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at Object.error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

PASS __tests__/offlineQueue.test.ts
  ● Console

    console.error
      Error reading offline queue: Error: Storage error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:77:61)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      59 |     return queueJson ? JSON.parse(queueJson) : [];
      60 |   } catch (error) {
    > 61 |     console.error('Error reading offline queue:', error);
         |             ^
      62 |     return [];
      63 |   }
      64 | }

      at error (src/services/offlineQueue.ts:61:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.log
      Successfully uploaded offline item item-123

      at log (src/services/offlineQueue.ts:195:15)
          at _loop.next (<anonymous>)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.warn
      Skipping item item-123 - max retries (5) exceeded

      161 |       // Check if we should retry based on retry count
      162 |       if (item.retryCount >= maxRetries) {
    > 163 |         console.warn(`Skipping item ${item.id} - max retries (${maxRetries}) exceeded`);
          |                 ^
      164 |         continue;
      165 |       }
      166 |

      at warn (src/services/offlineQueue.ts:163:17)
          at _loop.next (<anonymous>)
      at _loop (src/services/offlineQueue.ts:159:27)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.log
      Still offline, stopping queue processing

      at log (src/services/offlineQueue.ts:170:17)
          at _loop.next (<anonymous>)

    console.log
      Processing 1 offline upload(s)

      at log (src/services/offlineQueue.ts:154:11)

    console.error
      Failed to upload offline item item-123: Error: Upload failed
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:245:59)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:105:5)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      205 |       }
      206 |     } catch (error) {
    > 207 |       console.error(`Failed to upload offline item ${item.id}:`, error);
          |               ^
      208 |       const errorMessage = error instanceof Error ? error.message : String(error);
      209 |       await updateItemRetry(item.id, errorMessage);
      210 |

      at error (src/services/offlineQueue.ts:207:15)
          at _loop.throw (<anonymous>)
      at _loop (src/services/offlineQueue.ts:159:27)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)

    console.log
      Will retry item-123 in 2000ms

      at log (src/services/offlineQueue.ts:213:15)
          at _loop.next (<anonymous>)

    console.log
      Offline queue initialized

      at log (src/services/offlineQueue.ts:225:13)

    console.error
      Error initializing offline queue: Error: Init error
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts:273:64)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
          at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
          at /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
          at new Promise (<anonymous>)
          at Object.<anonymous> (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)
          at Promise.then.completed (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/utils.js:231:10)
          at _callCircusTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:316:40)
          at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
          at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
          at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
          at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
          at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
          at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)
          at Object.worker (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/testWorker.js:106:12)

      228 |     await processOfflineQueue();
      229 |   } catch (error) {
    > 230 |     console.error('Error initializing offline queue:', error);
          |             ^
      231 |   }
      232 | }
      233 |

      at error (src/services/offlineQueue.ts:230:13)
          at Generator.throw (<anonymous>)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:20:9)


Test Suites: 9 passed, 9 total
Tests:       2 skipped, 139 passed, 141 total
Snapshots:   0 total
Time:        3.204 s
Ran all test suites.
[0m
All tests now pass:

```
Test Suites: 9 passed, 9 total
Tests:       2 skipped, 139 passed, 141 total
```

Fixed the failing `firebase.test.ts` by replacing the invalid cast `(firebase.storeUserMapping as jest.Mock).mockResolvedValue(undefined)` with proper `jest.spyOn` and assigning the spy to `storeUserMappingSpy` for cleanup.

Changes committed to repository.
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

**Completed at:** Thu Mar 19 10:00:01 PM EDT 2026
