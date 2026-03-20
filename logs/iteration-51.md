# Iteration 51 - pictureshare

**Timestamp:** Thu Mar 19 09:35:03 PM EDT 2026
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


Test Suites: 1 skipped, 8 passed, 8 of 9 total
Tests:       14 skipped, 127 passed, 141 total
Snapshots:   0 total
Time:        3.541 s
Ran all test suites.
[0m
All tests are passing. The error in the task description appears to be obsolete. However, the task mentions writing unit tests for utilities (code generation, image compression) and service wrappers.

Let me check what utilities exist that might need tests:
[0m✱ [0mGrep "(imageCompression|compressImage|codeGeneration|generateCode)"[90m in src · 3 matches[0m
[0m✱ [0mGlob "src/utils/**/*.ts"[90m 3 matches[0m
[0m✱ [0mGlob "src/**/*Util*.ts"[90m 0 matches[0m
I found the utilities that need tests: `codeGenerator.ts` and `imagePicker.ts` (which contains `compressImage`). Let me read these files to understand what they do and write unit tests for them.
[0m→ [0mRead src/utils/imagePicker.ts
[0m→ [0mRead src/utils/codeGenerator.ts
[0m→ [0mRead src/utils/index.ts
[0m→ [0mRead __tests__/codeGenerator.test.ts
[0m→ [0mRead __tests__/imagePicker.test.ts
Let me check the existing test files for these utilities:
Tests for both utilities already exist and are comprehensive. Let me run all tests to confirm everything passes:
[0m
[0m$ [0mnpm test 2>&1 | grep -E "(PASS|FAIL|Tests:)"
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
```
## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
--
```

**Decision:**
- **Is this a code/syntax error?** → Fix the code
- **Is this a missing/version dependency error?** → Update the version constraint
- **Is this an environment/setup error?** → Mark in README as prerequisite, exclude from CI, or skip

**Do the minimal fix to make the error go away, then commit.**

### Previous Attempt (Iteration 49):
**Files created/modified:**
```

```
--
## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
I'll analyze the failing test output and fix the code. Let me first read the failing test file to understand the issues.
[0m→ [0mRead __tests__/commentService.test.ts
```

**Guidance:** Continue from where we left off. Don't re-do work already done. Focus on the next incomplete piece.
```

## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
I'll continue by checking which service wrappers exist and need tests, then write comprehensive unit tests for them.
[0m✱ [0mGlob "src/services/*.ts"[90m 8 matches[0m
[0m✱ [0mGlob "__tests__/*.test.ts"[90m 9 matches[0m
Let me check the offlineQueue service to understand the error at line 230:
[0m→ [0mRead src/services/offlineQueue.ts
Let me check the commentService test file that was mentioned in the previous attempt:
[0m→ [0mRead __tests__/commentService.test.ts
[0m→ [0mRead __tests__/offlineQueue.test.ts
Let me read the offlineQueue test file to understand how it's being tested:
Let me run the full test suite to see the current status:
[0m
[0m$ [0mnpm test 2>&1 | tail -n 30
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


Test Suites: 1 skipped, 8 passed, 8 of 9 total
Tests:       14 skipped, 127 passed, 141 total
Snapshots:   0 total
Time:        3.551 s
Ran all test suites.
[0m
Let me check the package.json to see the test script and Jest configuration:
[0m→ [0mRead package.json
[0m✱ [0mGrep "console\.error"[90m in __tests__ · 0 matches[0m
Let me check if any test is expecting console.error not to be called:
Let me search for calls to initializeOfflineQueue in test files:
[0m✱ [0mGrep "initializeOfflineQueue"[90m in __tests__ · 4 matches[0m
Let me run the full test suite without filtering to see all output:
[0m
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
PASS __tests__/likeService.test.ts
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


Test Suites: 1 skipped, 8 passed, 8 of 9 total
Tests:       14 skipped, 127 passed, 141 total
Snapshots:   0 total
Time:        3.053 s
Ran all test suites.
[0m
[0m→ [0mRead __tests__/codeGenerator.test.ts
[0m→ [0mRead __tests__/imagePicker.test.ts
Let me examine the existing utility tests to see if they are truly comprehensive:
[0m→ [0mRead __tests__/firebase.test.ts
Let me also check firebase.test.ts briefly:
I notice that the firebase test suite is currently skipped with `describe.skip`. This is likely the incomplete piece - we need to enable these tests and ensure they pass. Let me unskip them:
[0m
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -78,9 +78,9 @@
   getItem: jest.fn(),
   setItem: jest.fn(),
 }));
 
-describe.skip('firebase', () => {
+describe('firebase', () => {
   const mockUser = {
     uid: 'user-123',
     email: 'test@example.com',
     displayName: 'Test User',

[0m
Now let's run the tests again to verify all suites pass (including firebase):
[0m$ [0mnpm test 2>&1 | tail -n 50
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
Tests:       3 failed, 2 skipped, 136 passed, 141 total
Snapshots:   0 total
Time:        3.07 s
Ran all test suites.
[0m
Now we have failures. Let's get the full test output to see what's failing:
[0m$ [0mnpm test 2>&1 | grep -E "(FAIL|✕|●)" | head -n 100
FAIL __tests__/firebase.test.ts
  ● Console
  ● firebase › getUserMapping › should return user if found
  ● firebase › signInAnonymouslyLocally › should sign in anonymously and return user
  ● firebase › signInWithGoogle › should successfully sign in with Google and return user
  ● Console
  ● Console
  ● Console
  ● Console
[0m
Let's run only the firebase tests with verbose output to see the errors:
[0m$ [0mnpx jest __tests__/firebase.test.ts --verbose 2>&1 | tail -n 100
> 171 |     console.error('Error signing in with Google:', error);
          |             ^
      172 |     throw error;
      173 |   }
      174 | }

      at error (src/services/firebase.ts:171:13)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

FAIL __tests__/firebase.test.ts
  firebase
    storeUserMapping
      ✓ should store user mapping in AsyncStorage (5 ms)
      ✓ should update existing mappings
    getUserMapping
      ✕ should return user if found (4 ms)
      ✓ should return null if user not found (1 ms)
      ✓ should return null if no data stored (1 ms)
    signInAnonymouslyLocally
      ✕ should sign in anonymously and return user (1 ms)
    onAuthStateChangedListener
      ✓ should call callback with user when auth state changes (1 ms)
      ✓ should call callback with null when user signs out
    signInWithGoogle
      ✕ should successfully sign in with Google and return user
      ✓ should throw error when user cancels Google sign-in (37 ms)
      ✓ should throw error when Google sign-in fails (3 ms)
      ✓ should throw error when no ID token received (1 ms)

  ● firebase › getUserMapping › should return user if found

    expect(received).toEqual(expected) // deep equality

    - Expected  - 0
    + Received  + 1

      Object {
        "displayName": "Test",
        "email": "test@example.com",
        "id": "user-123",
    +   "lastUpdated": "2026-03-20T01:39:34.313Z",
      }

      145 |       const result = await getUserMapping('user-123');
      146 |
    > 147 |       expect(result).toEqual({
          |                      ^
      148 |         id: 'user-123',
      149 |         email: 'test@example.com',
      150 |         displayName: 'Test',

      at Object.toEqual (__tests__/firebase.test.ts:147:22)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › signInAnonymouslyLocally › should sign in anonymously and return user

    expect(received).toHaveBeenCalledWith(...expected)

    Matcher error: received value must be a mock or spy function

    Received has type:  function
    Received has value: [Function storeUserMapping]

      183 |         photoURL: mockUser.photoURL,
      184 |       });
    > 185 |       expect(storeUserMapping).toHaveBeenCalledWith(result);
          |                                ^
      186 |     });
      187 |   });
      188 |

      at Object.toHaveBeenCalledWith (__tests__/firebase.test.ts:185:32)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › signInWithGoogle › should successfully sign in with Google and return user

    TypeError: _firebase.storeUserMapping.mockResolvedValue is not a function

      247 |
      248 |       // Mock storeUserMapping
    > 249 |       (storeUserMapping as jest.Mock).mockResolvedValue(undefined);
          |                                       ^
      250 |
      251 |       // Mock doc and setDoc
      252 |       const mockUserRef = { path: '' };

      at Object.mockResolvedValue (__tests__/firebase.test.ts:249:39)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
      at node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:7
      at Object.<anonymous> (node_modules/@babel/runtime/helpers/asyncToGenerator.js:14:12)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 9 passed, 12 total
Snapshots:   0 total
Time:        0.44 s, estimated 1 s
Ran all test suites matching /__tests__\/firebase.test.ts/i.
[0m
Let's read the firebase service to understand the actual behavior:
[0m→ [0mRead src/services/firebase.ts
[0m✱ [0mGrep "type User|interface User"[90m in src/types" · 0 matches[0m
Let's check the User type definition:
[0m✱ [0mGlob "src/**/*.ts"[90m 14 matches[0m
[0m→ [0mRead src/types/index.ts
Let's fix the firebase tests. I'll make the necessary changes step by step.

**Step 1: Change imports**
[0m
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -1,12 +1,6 @@
-import {
-  storeUserMapping,
-  getUserMapping,
-  signInAnonymouslyLocally,
-  signInWithGoogle,
-  onAuthStateChangedListener,
-  auth,
-} from '../src/services/firebase';
+import * as firebase from '../src/services/firebase';
+import { auth } from '../src/services/firebase';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import {
   signInAnonymously,
   onAuthStateChanged,

[0m
Now replace all occurrences of `storeUserMapping` with `firebase.storeUserMapping`:
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -84,9 +84,9 @@
 beforeEach(() => {
   jest.clearAllMocks();
 });
 
-describe('storeUserMapping', () => {
+describe('firebase.storeUserMapping', () => {
   it('should store user mapping in AsyncStorage', async () => {
     (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
     (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
@@ -96,9 +96,9 @@
       displayName: 'Test User',
       photoURL: 'https://example.com/photo.jpg',
     };
 
-    await storeUserMapping(user);
+    await firebase.storeUserMapping(user);
 
     expect(AsyncStorage.setItem).toHaveBeenCalledWith(
       'user_mapping',
       expect.stringContaining('user-123')
@@ -111,9 +111,9 @@
     });
     (AsyncStorage.getItem as jest.Mock).mockResolvedValue(existing);
     (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
-    await storeUserMapping({
+    await firebase.storeUserMapping({
       id: 'user-123',
       email: 'test@example.com',
     });
 
@@ -175,9 +175,9 @@
       email: mockUser.email,
       displayName: mockUser.displayName,
       photoURL: mockUser.photoURL,
     });
-    expect(storeUserMapping).toHaveBeenCalledWith(result);
+    expect(firebase.storeUserMapping).toHaveBeenCalledWith(result);
   });
 });
 
 describe('onAuthStateChangedListener', () => {
@@ -238,10 +238,10 @@
     // Set up mocks for this test
     (GoogleAuthProvider.credential as jest.Mock).mockReturnValue({});
     (signInWithCredential as jest.Mock).mockResolvedValue(mockUserCredential);
 
-    // Mock storeUserMapping
-    (storeUserMapping as jest.Mock).mockResolvedValue(undefined);
+    // Mock firebase.storeUserMapping
+    (firebase.storeUserMapping as jest.Mock).mockResolvedValue(undefined);
 
     // Mock doc and setDoc
     const mockUserRef = { path: '' };
     (doc as jest.Mock).mockReturnValue(mockUserRef);
@@ -262,9 +262,9 @@
       email: mockUserCredential.user.email,
       displayName: mockUserCredential.user.displayName,
       photoURL: mockUserCredential.user.photoURL,
     });
-    expect(storeUserMapping).toHaveBeenCalledWith(result);
+    expect(firebase.storeUserMapping).toHaveBeenCalledWith(result);
     expect(setDoc).toHaveBeenCalledWith(
       mockUserRef,
       expect.objectContaining({
         id: result.id,

[0m
Replace all `getUserMapping` with `firebase.getUserMapping`:
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -123,9 +123,9 @@
     );
   });
 });
 
-describe('getUserMapping', () => {
+describe('firebase.getUserMapping', () => {
   it('should return user if found', async () => {
     const userData = {
       'user-123': {
         id: 'user-123',
@@ -135,9 +135,9 @@
       },
     };
     (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(userData));
 
-    const result = await getUserMapping('user-123');
+    const result = await firebase.getUserMapping('user-123');
 
     expect(result).toEqual({
       id: 'user-123',
       email: 'test@example.com',
@@ -147,17 +147,17 @@
 
   it('should return null if user not found', async () => {
     (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify({}));
 
-    const result = await getUserMapping('unknown');
+    const result = await firebase.getUserMapping('unknown');
 
     expect(result).toBeNull();
   });
 
   it('should return null if no data stored', async () => {
     (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
 
-    const result = await getUserMapping('user-123');
+    const result = await firebase.getUserMapping('user-123');
 
     expect(result).toBeNull();
   });
 });

[0m
Replace all `signInAnonymouslyLocally` with `firebase.signInAnonymouslyLocally`:
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -161,15 +161,15 @@
     expect(result).toBeNull();
   });
 });
 
-describe('signInAnonymouslyLocally', () => {
+describe('firebase.signInAnonymouslyLocally', () => {
   it('should sign in anonymously and return user', async () => {
     const mockCredential = { user: mockUser };
     (signInAnonymously as jest.Mock).mockResolvedValue(mockCredential);
     (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
-    const result = await signInAnonymouslyLocally();
+    const result = await firebase.signInAnonymouslyLocally();
 
     expect(result).toEqual({
       id: mockUser.uid,
       email: mockUser.email,

[0m
Replace all `onAuthStateChangedListener` with `firebase.onAuthStateChangedListener`:
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -179,15 +179,15 @@
     expect(firebase.storeUserMapping).toHaveBeenCalledWith(result);
   });
 });
 
-describe('onAuthStateChangedListener', () => {
+describe('firebase.onAuthStateChangedListener', () => {
   it('should call callback with user when auth state changes', () => {
     const callback = jest.fn();
     const unsubscribe = jest.fn();
     (onAuthStateChanged as jest.Mock).mockReturnValue(unsubscribe);
 
-    const result = onAuthStateChangedListener(callback);
+    const result = firebase.onAuthStateChangedListener(callback);
 
     expect(result).toBe(unsubscribe);
     expect(onAuthStateChanged).toHaveBeenCalledWith(auth, expect.any(Function));
 
@@ -207,9 +207,9 @@
     const callback = jest.fn();
     const unsubscribe = jest.fn();
     (onAuthStateChanged as jest.Mock).mockReturnValue(unsubscribe);
 
-    onAuthStateChangedListener(callback);
+    firebase.onAuthStateChangedListener(callback);
 
     const listenerCallback = (onAuthStateChanged as jest.Mock).mock.calls[0][1];
     listenerCallback(null);
 

[0m
Replace all `signInWithGoogle` with `firebase.signInWithGoogle`:
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -216,9 +216,9 @@
       expect(callback).toHaveBeenCalledWith(null);
     });
   });
 
-  describe('signInWithGoogle', () => {
+  describe('firebase.signInWithGoogle', () => {
     beforeEach(() => {
       jest.clearAllMocks();
       (GoogleAuthProvider.credential as jest.Mock).mockClear();
       (signInWithCredential as jest.Mock).mockClear();
@@ -254,9 +254,9 @@
           params: { id_token: mockIdToken },
         }),
       }));
 
-      const result = await signInWithGoogle();
+      const result = await firebase.signInWithGoogle();
 
       expect(result).toEqual({
         id: mockUserCredential.user.uid,
         email: mockUserCredential.user.email,
@@ -279,24 +279,24 @@
       (AuthRequest as jest.Mock).mockImplementation(() => ({
         promptAsync: jest.fn().mockResolvedValue({ type: 'cancel' }),
       }));
 
-      await expect(signInWithGoogle()).rejects.toThrow('User cancelled Google sign-in');
+      await expect(firebase.signInWithGoogle()).rejects.toThrow('User cancelled Google sign-in');
     });
 
     it('should throw error when Google sign-in fails', async () => {
       (AuthRequest as jest.Mock).mockImplementation(() => ({
         promptAsync: jest.fn().mockResolvedValue({ type: 'dismiss' }),
       }));
 
-      await expect(signInWithGoogle()).rejects.toThrow('Google sign-in failed');
+      await expect(firebase.signInWithGoogle()).rejects.toThrow('Google sign-in failed');
     });
 
     it('should throw error when no ID token received', async () => {
       (AuthRequest as jest.Mock).mockImplementation(() => ({
         promptAsync: jest.fn().mockResolvedValue({ type: 'success', params: {} }),
       }));
 
-      await expect(signInWithGoogle()).rejects.toThrow('No ID token received from Google');
+      await expect(firebase.signInWithGoogle()).rejects.toThrow('No ID token received from Google');
     });
   });
 });

[0m
Now we need to adjust the test expectations to include lastUpdated and add spies for storeUserMapping. Let's first fix the getUserMapping expectation:
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -141,8 +141,9 @@
   expect(result).toEqual({
     id: 'user-123',
     email: 'test@example.com',
     displayName: 'Test',
+    lastUpdated: expect.any(String),
   });
 });
 
 it('should return null if user not found', async () => {

[0m
Now let's add spy in signInAnonymouslyLocally test. I need to insert `jest.spyOn(firebase, 'storeUserMapping');` before the call. Let's find and replace that block:
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -168,8 +168,9 @@
 const mockCredential = { user: mockUser };
 (signInAnonymously as jest.Mock).mockResolvedValue(mockCredential);
 (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
+jest.spyOn(firebase, 'storeUserMapping');
 const result = await firebase.signInAnonymouslyLocally();
 
 expect(result).toEqual({
   id: mockUser.uid,

[0m
Now add spy in signInWithGoogle test:
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -256,8 +256,9 @@
     params: { id_token: mockIdToken },
   }),
 }));
 
+jest.spyOn(firebase, 'storeUserMapping');
 const result = await firebase.signInWithGoogle();
 
 expect(result).toEqual({
   id: mockUserCredential.user.uid,

[0m
Now let's run the tests to see if all firebase tests pass:
[0m$ [0mnpm test 2>&1 | tail -n 50
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
Tests:       2 failed, 2 skipped, 137 passed, 141 total
Snapshots:   0 total
Time:        3.088 s
Ran all test suites.
[0m
Let's run just firebase tests to see the failures:
[0m$ [0mnpx jest __tests__/firebase.test.ts --verbose 2>&1 | tail -n 100
at Generator.next (<anonymous>)
        at asyncGeneratorStep (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
        at _next (/home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

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

FAIL __tests__/firebase.test.ts
  firebase
    firebase.storeUserMapping
      ✓ should store user mapping in AsyncStorage (4 ms)
      ✓ should update existing mappings (1 ms)
    firebase.getUserMapping
      ✓ should return user if found (1 ms)
      ✓ should return null if user not found (1 ms)
      ✓ should return null if no data stored
    firebase.signInAnonymouslyLocally
      ✕ should sign in anonymously and return user (3 ms)
    firebase.onAuthStateChangedListener
      ✓ should call callback with user when auth state changes (2 ms)
      ✓ should call callback with null when user signs out
    firebase.signInWithGoogle
      ✕ should successfully sign in with Google and return user (2 ms)
      ✓ should throw error when user cancels Google sign-in (41 ms)
      ✓ should throw error when Google sign-in fails (2 ms)
      ✓ should throw error when no ID token received (2 ms)

  ● firebase › firebase.signInAnonymouslyLocally › should sign in anonymously and return user

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: {"displayName": "Test User", "email": "test@example.com", "id": "user-123", "photoURL": "https://example.com/photo.jpg"}

    Number of calls: 0

      179 |         photoURL: mockUser.photoURL,
      180 |       });
    > 181 |       expect(firebase.storeUserMapping).toHaveBeenCalledWith(result);
          |                                         ^
      182 |     });
      183 |   });
      184 |

      at Object.toHaveBeenCalledWith (__tests__/firebase.test.ts:181:41)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

  ● firebase › firebase.signInWithGoogle › should successfully sign in with Google and return user

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: {"displayName": "Google User", "email": "google@example.com", "id": "google-user-123", "photoURL": "https://example.com/photo.jpg"}

    Number of calls: 0

      267 |         photoURL: mockUserCredential.user.photoURL,
      268 |       });
    > 269 |       expect(firebase.storeUserMapping).toHaveBeenCalledWith(result);
          |                                         ^
      270 |       expect(setDoc).toHaveBeenCalledWith(
      271 |         mockUserRef,
      272 |         expect.objectContaining({

      at Object.toHaveBeenCalledWith (__tests__/firebase.test.ts:269:41)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 10 passed, 12 total
Snapshots:   0 total
Time:        0.433 s, estimated 2 s
Ran all test suites matching /__tests__\/firebase.test.ts/i.
[0m
Let's fix the issues. The problem is that spying on `firebase.storeUserMapping` doesn't capture internal calls. We'll change the expectations to verify AsyncStorage.setItem calls instead.

First, remove the spy we added in signInAnonymouslyLocally test:
[0m✗ [0medit failed
[91m[1mError: [0mFound multiple matches for oldString. Provide more surrounding context to make the match unique.
Now let's delete the spy lines we added (both occurrences) using a global replace:
[0m
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -168,9 +168,8 @@
 const mockCredential = { user: mockUser };
 (signInAnonymously as jest.Mock).mockResolvedValue(mockCredential);
 (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
 
-jest.spyOn(firebase, 'storeUserMapping');
 const result = await firebase.signInAnonymouslyLocally();
 
 expect(result).toEqual({
   id: mockUser.uid,
@@ -256,9 +255,8 @@
     params: { id_token: mockIdToken },
   }),
 }));
 
-jest.spyOn(firebase, 'storeUserMapping');
 const result = await firebase.signInWithGoogle();
 
 expect(result).toEqual({
   id: mockUserCredential.user.uid,

[0m
Now replace the failing expectations with proper AsyncStorage checks:
[0m← [0mEdit __tests__/firebase.test.ts
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/__tests__/firebase.test.ts
@@ -176,9 +176,12 @@
       email: mockUser.email,
       displayName: mockUser.displayName,
       photoURL: mockUser.photoURL,
     });
-    expect(firebase.storeUserMapping).toHaveBeenCalledWith(result);
+    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
+      'user_mapping',
+      expect.stringContaining(result.id)
+    );
   });
 });
 
 describe('firebase.onAuthStateChangedListener', () => {
@@ -263,9 +266,12 @@
       email: mockUserCredential.user.email,
       displayName: mockUserCredential.user.displayName,
       photoURL: mockUserCredential.user.photoURL,
     });
-    expect(firebase.storeUserMapping).toHaveBeenCalledWith(result);
+    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
+      'user_mapping',
+      expect.stringContaining(result.id)
+    );
     expect(setDoc).toHaveBeenCalledWith(
       mockUserRef,
       expect.objectContaining({
         id: result.id,

[0m
Let's run the full test suite now:
[0m$ [0mnpm test 2>&1 | tail -n 30
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
Time:        3.165 s
Ran all test suites.
[0m
Let's get the actual failing test name by grepping:
[0m$ [0mnpm test 2>&1 | grep -A 2 "FAIL"
FAIL __tests__/firebase.test.ts
  ● Console
[0m
Let's see the detailed failure:
[0m$ [0mnpx jest __tests__/firebase.test.ts --verbose 2>&1 | grep -A 30 "FAIL"
FAIL __tests__/firebase.test.ts
  firebase
    firebase.storeUserMapping
      ✓ should store user mapping in AsyncStorage (4 ms)
      ✓ should update existing mappings
    firebase.getUserMapping
      ✓ should return user if found (1 ms)
      ✓ should return null if user not found (1 ms)
      ✓ should return null if no data stored (1 ms)
    firebase.signInAnonymouslyLocally
      ✓ should sign in anonymously and return user (1 ms)
    firebase.onAuthStateChangedListener
      ✓ should call callback with user when auth state changes (1 ms)
      ✓ should call callback with null when user signs out (1 ms)
    firebase.signInWithGoogle
      ✕ should successfully sign in with Google and return user (1 ms)
      ✓ should throw error when user cancels Google sign-in (39 ms)
      ✓ should throw error when Google sign-in fails (2 ms)
      ✓ should throw error when no ID token received (1 ms)

  ● firebase › firebase.signInWithGoogle › should successfully sign in with Google and return user

    TypeError: firebase.storeUserMapping.mockResolvedValue is not a function

      245 |
      246 |       // Mock firebase.storeUserMapping
    > 247 |       (firebase.storeUserMapping as jest.Mock).mockResolvedValue(undefined);
          |                                                ^
      248 |
      249 |       // Mock doc and setDoc
      250 |       const mockUserRef = { path: '' };
[0m
