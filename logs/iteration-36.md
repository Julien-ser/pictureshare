# Iteration 36 - pictureshare

**Timestamp:** Thu Mar 19 08:30:52 PM EDT 2026
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

  ● offlineQueue › addToOfflineQueue › should add item to queue and cache image

    TypeError: _offlineQueue.getOfflineQueue.mockResolvedValue is not a function

      80 |   describe('addToOfflineQueue', () => {
      81 |     it('should add item to queue and cache image', async () => {
    > 82 |       (getOfflineQueue as jest.Mock).mockResolvedValue([]);
         |                                      ^
      83 |       (FileSystem.copyAsync as jest.Mock).mockResolvedValue({});
      84 |       (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      85 |

      at Object.mockResolvedValue (__tests__/offlineQueue.test.ts:82:38)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

  ● offlineQueue › addToOfflineQueue › should set retryCount to 0 for new item

    TypeError: _offlineQueue.getOfflineQueue.mockResolvedValue is not a function

      107 |
      108 |     it('should set retryCount to 0 for new item', async () => {
    > 109 |       (getOfflineQueue as jest.Mock).mockResolvedValue([]);
```

**Decision:**
- **Is this a code/syntax error?** → Fix the code
- **Is this a missing/version dependency error?** → Update the version constraint
- **Is this an environment/setup error?** → Mark in README as prerequisite, exclude from CI, or skip

**Do the minimal fix to make the error go away, then commit.**

### Previous Attempt (Iteration 35):
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
I need to examine the codebase to understand the build/test error and fix it. Let me start by exploring the project structure and finding the relevant code.
[0m→ [0mRead package.json
[0m
```

**Decision:**
- **Is this a code/syntax error?** → Fix the code
- **Is this a missing/version dependency error?** → Update the version constraint
- **Is this an environment/setup error?** → Mark in README as prerequisite, exclude from CI, or skip

**Do the minimal fix to make the error go away, then commit.**

### Previous Attempt (Iteration 33):
**Files created/modified:**
```
--
## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
I need to examine the codebase to understand the build/test error and fix it. Let me start by exploring the project structure and finding the relevant code.
[0m→ [0mRead package.json
```

**Guidance:** Continue from where we left off. Don't re-do work already done. Focus on the next incomplete piece.
```

## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
Looking at the error, there's an issue with mocking in the offlineQueue test file. The error shows that `getOfflineQueue.mockResolvedValue` is not a function, meaning the mock isn't properly set up. Let me examine the test file and fix it.
[0m→ [0mRead __tests__/offlineQueue.test.ts
Now I need to see the actual implementation to understand the structure:
[0m→ [0mRead src/services/offlineQueue.ts
I can see the issue. The test file tries to mock `getOfflineQueue`, `removeFromOfflineQueue`, and `processOfflineQueue` by casting them to `jest.Mock`, but these are actual functions from the module, not jest mock functions. We need to use `jest.spyOn` to mock them properly.

Let me fix the test file:
[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -8,8 +8,9 @@
   processOfflineQueue,
   initializeOfflineQueue,
   OfflineQueueItem,
 } from '../src/services/offlineQueue';
+import * as offlineQueueModule from '../src/services/offlineQueue';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import * as FileSystem from 'expo-file-system';
 import { uploadAndSavePhoto } from '../src/services/photoService';
 

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -50,8 +50,12 @@
   jest.clearAllMocks();
   (FileSystem.getInfoAsync as any).mockResolvedValue({ exists: false });
 });
 
+afterEach(() => {
+  jest.restoreAllMocks();
+});
+
 describe('getOfflineQueue', () => {
   it('should return empty array if no queue exists', async () => {
     (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
 

[0m
Now I'll replace all the mocking calls with proper `jest.spyOn` calls:
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -83,9 +83,9 @@
 });
 
 describe('addToOfflineQueue', () => {
   it('should add item to queue and cache image', async () => {
-    (getOfflineQueue as jest.Mock).mockResolvedValue([]);
+    jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue([]);
     (FileSystem.copyAsync as jest.Mock).mockResolvedValue({});
     (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
     const item = {

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -110,9 +110,9 @@
   );
 });
 
 it('should set retryCount to 0 for new item', async () => {
-  (getOfflineQueue as jest.Mock).mockResolvedValue([]);
+  jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue([]);
   (FileSystem.copyAsync as jest.Mock).mockResolvedValue({});
   (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
   await addToOfflineQueue({

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -132,9 +132,9 @@
 
 describe('removeFromOfflineQueue', () => {
   it('should remove item by ID', async () => {
     const queue = [mockQueueItem, { ...mockQueueItem, id: 'item-456' }];
-    (getOfflineQueue as jest.Mock).mockResolvedValue(queue);
+    jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue(queue);
     (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
     await removeFromOfflineQueue('item-123');
 

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -152,9 +152,11 @@
 });
 
 describe('getOfflineQueueCount', () => {
   it('should return number of items in queue', async () => {
-    (getOfflineQueue as jest.Mock).mockResolvedValue([mockQueueItem, mockQueueItem]);
+    jest
+      .spyOn(offlineQueueModule, 'getOfflineQueue')
+      .mockResolvedValue([mockQueueItem, mockQueueItem]);
 
     const count = await getOfflineQueueCount();
 
     expect(count).toBe(2);

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -183,9 +183,9 @@
 
 describe('processOfflineQueue', () => {
   it('should process all pending items when online', async () => {
     const queue = [mockQueueItem];
-    (getOfflineQueue as jest.Mock).mockResolvedValue(queue);
+    jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue(queue);
     (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: true });
     (uploadAndSavePhoto as jest.Mock).mockResolvedValue({
       id: 'photo-123',
       eventId: mockQueueItem.eventId,
@@ -195,9 +195,9 @@
       height: mockQueueItem.height,
       likeCount: 0,
       createdAt: new Date(),
     } as any);
-    (removeFromOfflineQueue as jest.Mock).mockResolvedValue(undefined);
+    jest.spyOn(offlineQueueModule, 'removeFromOfflineQueue').mockResolvedValue(undefined);
     (FileSystem.deleteAsync as jest.Mock).mockResolvedValue(undefined);
 
     await processOfflineQueue();
 

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -215,9 +215,9 @@
 });
 
 it('should skip items with max retries exceeded', async () => {
   const itemWithMaxRetries = { ...mockQueueItem, retryCount: 5 };
-  (getOfflineQueue as jest.Mock).mockResolvedValue([itemWithMaxRetries]);
+  jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue([itemWithMaxRetries]);
   (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: true });
 
   await processOfflineQueue();
 

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -225,9 +225,9 @@
 });
 
 it('should stop processing if offline', async () => {
   const queue = [mockQueueItem];
-  (getOfflineQueue as jest.Mock).mockResolvedValue(queue);
+  jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue(queue);
   (FileSystem.getInfoAsync as jest.Mock)
     .mockResolvedValueOnce({ exists: false }) // online check returns false
     .mockResolvedValueOnce({ exists: true }); // any subsequent calls
 

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -237,9 +237,9 @@
 });
 
 it('should handle upload errors and increment retry count', async () => {
   const queue = [mockQueueItem];
-  (getOfflineQueue as jest.Mock).mockResolvedValue(queue);
+  jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue(queue);
   (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: true });
   (uploadAndSavePhoto as jest.Mock).mockRejectedValue(new Error('Upload failed'));
 
   await processOfflineQueue();

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -250,9 +250,9 @@
 
 describe('initializeOfflineQueue', () => {
   it('should initialize directory and process any pending uploads', async () => {
     (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: false });
-    (processOfflineQueue as jest.Mock).mockResolvedValue(undefined);
+    jest.spyOn(offlineQueueModule, 'processOfflineQueue').mockResolvedValue(undefined);
 
     await initializeOfflineQueue();
 
     expect(FileSystem.makeDirectoryAsync).toHaveBeenCalledWith('/cache/pictureshare_offline/', {

[0m
[0m✱ [0mGrep "\(getOfflineQueue as jest\.Mock\)|\(removeFromOfflineQueue as jest\.Mock\)|\(processOfflineQueue as jest\.Mock\)"[90m in __tests__/offlineQueue.test.ts · 0 matches[0m
Let me verify that all the mocking issues are fixed:
Good! The mocking patterns have been fixed. Now let's run the tests to confirm they pass:
[0m
[0m$ [0mnpm test -- offlineQueue.test.ts
> pictureshare@1.0.0 test
> jest offlineQueue.test.ts

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
    Offline queue initialized

      at log (src/services/offlineQueue.ts:225:13)

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
    Offline queue initialized

      at log (src/services/offlineQueue.ts:225:13)

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

FAIL __tests__/offlineQueue.test.ts
  offlineQueue
    getOfflineQueue
      ✓ should return empty array if no queue exists (4 ms)
      ✓ should return parsed queue if exists (1 ms)
      ✓ should return empty array on error (37 ms)
    addToOfflineQueue
      ✓ should add item to queue and cache image (4 ms)
      ✓ should set retryCount to 0 for new item (2 ms)
    removeFromOfflineQueue
      ✕ should remove item by ID (8 ms)
    clearOfflineQueue
      ✓ should remove queue from storage (1 ms)
    getOfflineQueueCount
      ✕ should return number of items in queue (3 ms)
    isOnline
      ✓ should return true if network check succeeds (1 ms)
      ✓ should return false if network check fails (1 ms)
    processOfflineQueue
      ✕ should process all pending items when online (3 ms)
      ✓ should skip items with max retries exceeded (2 ms)
      ✓ should stop processing if offline (2 ms)
      ✕ should handle upload errors and increment retry count (4 ms)
    initializeOfflineQueue
      ✕ should initialize directory and process any pending uploads (4 ms)
      ✓ should handle initialization errors gracefully (3 ms)

  ● offlineQueue › removeFromOfflineQueue › should remove item by ID

    expect(received).toHaveLength(expected)

    Expected length: 1
    Received length: 0
    Received array:  []

      140 |
      141 |       const savedQueue = JSON.parse((AsyncStorage.setItem as jest.Mock).mock.calls[0][1]);
    > 142 |       expect(savedQueue).toHaveLength(1);
          |                          ^
      143 |       expect(savedQueue[0].id).toBe('item-456');
      144 |     });
      145 |   });

      at Object.toHaveLength (__tests__/offlineQueue.test.ts:142:26)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● offlineQueue › getOfflineQueueCount › should return number of items in queue

    expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 0

      160 |       const count = await getOfflineQueueCount();
      161 |
    > 162 |       expect(count).toBe(2);
          |                     ^
      163 |     });
      164 |   });
      165 |

      at Object.toBe (__tests__/offlineQueue.test.ts:162:21)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● offlineQueue › processOfflineQueue › should process all pending items when online

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: "event-123", "user-123", {"height": 800, "uri": "file://cached.jpg", "width": 1000}, "item-123"

    Number of calls: 0

      202 |       await processOfflineQueue();
      203 |
    > 204 |       expect(uploadAndSavePhoto).toHaveBeenCalledWith(
          |                                  ^
      205 |         mockQueueItem.eventId,
      206 |         mockQueueItem.uploaderId,
      207 |         {

      at Object.toHaveBeenCalledWith (__tests__/offlineQueue.test.ts:204:34)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● offlineQueue › processOfflineQueue › should handle upload errors and increment retry count

    expect(received).not.toHaveBeenCalled()

    Matcher error: received value must be a mock or spy function

    Received has type:  function
    Received has value: [Function removeFromOfflineQueue]

      245 |       await processOfflineQueue();
      246 |
    > 247 |       expect(removeFromOfflineQueue).not.toHaveBeenCalled();
          |                                          ^
      248 |     });
      249 |   });
      250 |

      at Object.toHaveBeenCalled (__tests__/offlineQueue.test.ts:247:42)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● offlineQueue › initializeOfflineQueue › should initialize directory and process any pending uploads

    expect(jest.fn()).toHaveBeenCalled()

    Expected number of calls: >= 1
    Received number of calls:    0

      259 |         intermediates: true,
      260 |       });
    > 261 |       expect(processOfflineQueue).toHaveBeenCalled();
          |                                   ^
      262 |     });
      263 |
      264 |     it('should handle initialization errors gracefully', async () => {

      at Object.toHaveBeenCalled (__tests__/offlineQueue.test.ts:261:35)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

Test Suites: 1 failed, 1 total
Tests:       5 failed, 11 passed, 16 total
Snapshots:   0 total
Time:        1.133 s
Ran all test suites matching /offlineQueue.test.ts/i.
[0m
Now I need to fix the test logic. The issue is that `jest.spyOn` on the module namespace doesn't affect internal calls within the same module. We need to mock the external dependencies (AsyncStorage) instead. Let's update the tests:
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -132,9 +132,9 @@
 
 describe('removeFromOfflineQueue', () => {
   it('should remove item by ID', async () => {
     const queue = [mockQueueItem, { ...mockQueueItem, id: 'item-456' }];
-    jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue(queue);
+    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(queue));
     (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
     await removeFromOfflineQueue('item-123');
 

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -150,18 +150,17 @@
     expect(AsyncStorage.removeItem).toHaveBeenCalledWith('pictureshare_offline_queue');
   });
 });
 
-describe('getOfflineQueueCount', () => {
-  it('should return number of items in queue', async () => {
-    jest
-      .spyOn(offlineQueueModule, 'getOfflineQueue')
-      .mockResolvedValue([mockQueueItem, mockQueueItem]);
+ describe('getOfflineQueueCount', () => {
+   it('should return number of items in queue', async () => {
+     (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([mockQueueItem, mockQueueItem]));
 
-    const count = await getOfflineQueueCount();
+     const count = await getOfflineQueueCount();
 
-    expect(count).toBe(2);
-  });
+     expect(count).toBe(2);
+   });
+ });
 });
 
 describe('isOnline', () => {
   it('should return true if network check succeeds', async () => {

[0m
[0m→ [0mRead __tests__/offlineQueue.test.ts[90m [limit=100, offset=150][0m
Let me check the file state:
[0m→ [0mRead __tests__/offlineQueue.test.ts
Let me read the whole file to fix the structure:
[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -150,17 +150,18 @@
     expect(AsyncStorage.removeItem).toHaveBeenCalledWith('pictureshare_offline_queue');
   });
 });
 
- describe('getOfflineQueueCount', () => {
-   it('should return number of items in queue', async () => {
-     (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([mockQueueItem, mockQueueItem]));
+describe('getOfflineQueueCount', () => {
+  it('should return number of items in queue', async () => {
+    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
+      JSON.stringify([mockQueueItem, mockQueueItem])
+    );
 
-     const count = await getOfflineQueueCount();
+    const count = await getOfflineQueueCount();
 
-     expect(count).toBe(2);
-   });
- });
+    expect(count).toBe(2);
+  });
 });
 
 describe('isOnline', () => {
   it('should return true if network check succeeds', async () => {

[0m
Now let's fix the `addToOfflineQueue` tests:
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -83,9 +83,9 @@
 });
 
 describe('addToOfflineQueue', () => {
   it('should add item to queue and cache image', async () => {
-    jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue([]);
+    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
     (FileSystem.copyAsync as jest.Mock).mockResolvedValue({});
     (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
     const item = {

[0m
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -110,9 +110,9 @@
   );
 });
 
 it('should set retryCount to 0 for new item', async () => {
-  jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue([]);
+  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
   (FileSystem.copyAsync as jest.Mock).mockResolvedValue({});
   (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
   await addToOfflineQueue({

[0m
Now fix the `processOfflineQueue` tests. Starting with the first one:
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -183,9 +183,9 @@
 
 describe('processOfflineQueue', () => {
   it('should process all pending items when online', async () => {
     const queue = [mockQueueItem];
-    jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue(queue);
+    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(queue));
     (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: true });
     (uploadAndSavePhoto as jest.Mock).mockResolvedValue({
       id: 'photo-123',
       eventId: mockQueueItem.eventId,
@@ -195,9 +195,8 @@
       height: mockQueueItem.height,
       likeCount: 0,
       createdAt: new Date(),
     } as any);
-    jest.spyOn(offlineQueueModule, 'removeFromOfflineQueue').mockResolvedValue(undefined);
     (FileSystem.deleteAsync as jest.Mock).mockResolvedValue(undefined);
 
     await processOfflineQueue();
 
@@ -210,9 +209,12 @@
         height: mockQueueItem.height,
       },
       mockQueueItem.id
     );
-    expect(removeFromOfflineQueue).toHaveBeenCalledWith(mockQueueItem.id);
+    // Verify that the queue was cleared (item removed)
+    const lastSetItemCall = (AsyncStorage.setItem as jest.Mock).mock.calls.slice(-1)[0];
+    const savedQueue = JSON.parse(lastSetItemCall[1]);
+    expect(savedQueue).toHaveLength(0);
   });
 
   it('should skip items with max retries exceeded', async () => {
     const itemWithMaxRetries = { ...mockQueueItem, retryCount: 5 };

[0m
Now fix the second test in processOfflineQueue (skip items with max retries):
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -217,9 +217,9 @@
 });
 
 it('should skip items with max retries exceeded', async () => {
   const itemWithMaxRetries = { ...mockQueueItem, retryCount: 5 };
-  jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue([itemWithMaxRetries]);
+  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([itemWithMaxRetries]));
   (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: true });
 
   await processOfflineQueue();
 

[0m
Now fix the third test in processOfflineQueue (stop processing if offline):
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -227,9 +227,9 @@
 });
 
 it('should stop processing if offline', async () => {
   const queue = [mockQueueItem];
-  jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue(queue);
+  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(queue));
   (FileSystem.getInfoAsync as jest.Mock)
     .mockResolvedValueOnce({ exists: false }) // online check returns false
     .mockResolvedValueOnce({ exists: true }); // any subsequent calls
 

[0m
Now fix the fourth test in processOfflineQueue (handle upload errors and increment retry count):
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -239,15 +239,20 @@
   });
 
   it('should handle upload errors and increment retry count', async () => {
     const queue = [mockQueueItem];
-    jest.spyOn(offlineQueueModule, 'getOfflineQueue').mockResolvedValue(queue);
+    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(queue));
     (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: true });
     (uploadAndSavePhoto as jest.Mock).mockRejectedValue(new Error('Upload failed'));
 
     await processOfflineQueue();
 
-    expect(removeFromOfflineQueue).not.toHaveBeenCalled();
+    // Verify that the item's retryCount was incremented and the item remains in the queue
+    const lastSetItemCall = (AsyncStorage.setItem as jest.Mock).mock.calls.slice(-1)[0];
+    const savedQueue = JSON.parse(lastSetItemCall[1]);
+    expect(savedQueue).toHaveLength(1);
+    expect(savedQueue[0].retryCount).toBe(1);
+    expect(savedQueue[0].id).toBe(mockQueueItem.id);
   });
 });
 
 describe('initializeOfflineQueue', () => {

[0m
Now fix the `initializeOfflineQueue` test:
[0m← [0mEdit __tests__/offlineQueue.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/offlineQueue.test.ts
@@ -257,16 +257,17 @@
 
 describe('initializeOfflineQueue', () => {
   it('should initialize directory and process any pending uploads', async () => {
     (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: false });
-    jest.spyOn(offlineQueueModule, 'processOfflineQueue').mockResolvedValue(undefined);
+    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));
 
     await initializeOfflineQueue();
 
     expect(FileSystem.makeDirectoryAsync).toHaveBeenCalledWith('/cache/pictureshare_offline/', {
       intermediates: true,
     });
-    expect(processOfflineQueue).toHaveBeenCalled();
+    // Verify that processOfflineQueue was called indirectly by checking getOfflineQueue was invoked
+    expect(AsyncStorage.getItem).toHaveBeenCalled();
   });
 
   it('should handle initialization errors gracefully', async () => {
     (FileSystem.getInfoAsync as jest.Mock).mockRejectedValue(new Error('Init error'));

[0m
Now let's run the tests again:
[0m$ [0mnpm test -- offlineQueue.test.ts
> pictureshare@1.0.0 test
> jest offlineQueue.test.ts

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
        at runNextTicks (node:internal/process/task_queues:65:5)
        at processTimers (node:internal/timers:520:9)
        at _runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:252:3)
        at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:126:9)
        at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
        at _runTestsForDescribeBlock (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:121:9)
        at run (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/run.js:71:3)
        at runAndTransformResultsToJestFormat (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
        at jestAdapter (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
        at runTestInternal (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:367:16)
        at runTest (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/jest-runner/build/runTest.js:444:34)

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

PASS __tests__/offlineQueue.test.ts
  offlineQueue
    getOfflineQueue
      ✓ should return empty array if no queue exists (4 ms)
      ✓ should return parsed queue if exists (1 ms)
      ✓ should return empty array on error (37 ms)
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
      ✓ should process all pending items when online (3 ms)
      ✓ should skip items with max retries exceeded (3 ms)
      ✓ should stop processing if offline (2 ms)
      ✓ should handle upload errors and increment retry count (2006 ms)
    initializeOfflineQueue
      ✓ should initialize directory and process any pending uploads (1 ms)
      ✓ should handle initialization errors gracefully (7 ms)

Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        3.139 s
Ran all test suites matching /offlineQueue.test.ts/i.
[0m
All tests pass! Let's commit the fix:
[0m$ [0mgit add __tests__/offlineQueue.test.ts && git commit -m "Fix offlineQueue tests: replace invalid mock casting with proper AsyncStorage mocking and adjust assertions"
[main e8936a9] Fix offlineQueue tests: replace invalid mock casting with proper AsyncStorage mocking and adjust assertions
 1 file changed, 28 insertions(+), 13 deletions(-)
[0m
The offlineQueue tests are now passing. The fix replaced the invalid `jest.Mock` casting with proper AsyncStorage mocking and adjusted assertions to verify behavior via side effects.

**Commit:** `e8936a9` - "Fix offlineQueue tests: replace invalid mock casting with proper AsyncStorage mocking and adjust assertions"
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

**Completed at:** Thu Mar 19 08:40:34 PM EDT 2026
