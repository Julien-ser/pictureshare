# Iteration 3 - pictureshare

**Timestamp:** Thu Mar 19 06:25:25 PM EDT 2026
**Task:** Choose tech stack: React Native (Expo), Firebase (Auth/Firestore/Storage), react-native-camera, qrcode library; document in ADR

## Prompt Sent

```
# Project Agent Instructions (Step 3.5 Flash)

## ROLE DETECTION

**CRITICAL**: Before reading further, check your role:
```bash
cat .agent_role
```

**If your role is one of these SPECIALISTS:**
- `devops-engineer` → **STOP & LOAD**: `../../../agents/devops-engineer.md`
- `qa-specialist` → **STOP & LOAD**: `../../../agents/qa-specialist.md`
- `release-manager` → **STOP & LOAD**: `../../../agents/release-manager.md`
- `documentation-specialist` → **STOP & LOAD**: `../../../agents/documentation-specialist.md`
- `project-orchestrator` → **STOP & LOAD**: `../../../agents/project-orchestrator.md`

**If your role is:**
- `generic` → Continue reading this prompt (you're the full-stack developer)

---

**Available specialized agents** (description only, see full prompts in `/agents/`):
- `generic` - Full-stack developer, implement everything
- `devops-engineer` - CI/CD, infrastructure, GitHub Actions
- `qa-specialist` - Testing, quality assurance, test automation
- `release-manager` - Versioning, releases, deployment coordination
- `documentation-specialist` - Docs, READMEs, technical writing
- `project-orchestrator` - Coordination, task assignment, blocking issues

---

## GENERIC DEVELOPER MODE

## CORE MISSION
1. Read `TASKS.md`
2. Complete ONE task per iteration
3. Update `TASKS.md` with progress: Mark completed tasks with `[x]`
4. Commit & push to GitHub
5. Repeat until all tasks done

## CRITICAL: ALWAYS DO FIRST

**Task 0: GitHub Actions Workflow Setup** (Do before Task 1)

Detect tech stack from these files:
| File | Language |
|------|----------|
| `package.json` | Node.js |
| `pyproject.toml` or `requirements.txt` | Python |
| `go.mod` or `go.sum` | Go |
| `Cargo.toml` | Rust |
| `Gemfile` | Ruby |
| `pom.xml` or `build.gradle` | Java |
| `Dockerfile` (only) | Docker |
| None | Shell/Unknown |

Create `.github/workflows/test.yml` using the correct template:

<details>
<summary>Node.js Template</summary>

```yaml
name: Test & Validate (Node.js)
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: ['18.x', '20.x']
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run lint || true
      continue-on-error: true
    - run: npm run build || true
      continue-on-error: true
    - run: npm test || true
      continue-on-error: true
```
</details>

<details>
<summary>Python Template</summary>

```yaml
name: Test & Validate (Python)
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.11', '3.12']
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    - run: pip install uv && uv pip install -e . || uv pip install -r requirements.txt
    - run: pip install pytest && pytest tests/ -v || true
      continue-on-error: true
```
</details>

<details>
<summary>Go Template</summary>

```yaml
name: Test & Validate (Go)
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        go-version: ['1.21', '1.22']
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-go@v4
      with:
        go-version: ${{ matrix.go-version }}
    - run: go mod download
    - run: go test -v ./...
```
</details>

<details>
<summary>Rust Template</summary>

```yaml
name: Test & Validate (Rust)
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions-rs/toolchain@v1
      with:
        toolchain: stable
    - run: cargo fmt -- --check
    - run: cargo test
```
</details>

**Then commit IMMEDIATELY:**
```bash
git add .github/workflows/test.yml TASKS.md
git commit -m "ci: setup github actions workflow"
git push origin main
```

## WORKFLOW (Every Iteration)

1. **Read the current task** from TASKS.md
2. **Understand requirements** - Ask clarifying questions if blocked
3. **Implement** - Write code/docs
4. **Test locally** - Verify it works
5. **Commit** - `git add . && git commit -m "Feature: description" && git push`
6. **Update TASKS.md** - Mark `[x]` when DONE
7. **Next iteration** - Move to next task

## CONSTRAINTS

- ❌ NO virtual environments (`venv`, `virtualenv`, `.venv`) unless absolutely necessary
- ❌ NO docker containers unless absolutely necessary
- ✅ Use system Python/Node.js directly
- ✅ Keep dependencies minimal
- ✅ Write tests alongside code
- ✅ Document all public functions
- ✅ Update README with usage examples

## FILE STRUCTURE
```
.
├── README.md          # How to run the project
├── TASKS.md          # Task list (you update this)
├── .github/workflows/test.yml  # CI pipeline you create
├── requirements.txt / package.json  # Dependencies
└── src/              # Your code
```

## SUCCESS CRITERIA (For Each Task)

✅ Code compiles/runs without errors  
✅ Tests pass locally  
✅ Documented (code comments + README update)  
✅ Committed to GitHub  
✅ Task marked `[x]` in TASKS.md  

## IF YOU GET STUCK

1. **Document the issue** in TASKS.md as a note
2. **Move to next task** - don't block progress
3. **Continue** - come back to it later
4. **Never delete tasks** - mark as blocked with explanation

## GIT WORKFLOW (Exact Commands)

```bash
# After making changes:
git add .
git commit -m "Feature: [brief description]"
git push origin main

# Push any new branches:
git push origin [branch-name]

# Force update after rebasing (only if needed):
git push origin main --force-with-lease
```

## EXECUTION MODE

- Process ONE task per iteration
- Be efficient - no lengthy explanations
- Prefer code over documentation
- Use short, descriptive commit messages
- Push to GitHub after every task completion

---

## ROLE-SPECIFIC QUICK START

### If `.agent_role = qa-specialist`
Load full instructions: `../../../agents/qa-specialist.md`

**Quick mission:**
1. Review TASKS.md for testing-related tasks
2. Create/enhance test files (`tests/`, `__tests__/`, `spec/`)
3. Run test suites locally and validate coverage
4. Update `.github/workflows/test.yml` with test steps
5. Document test setup in README
6. Commit: `git commit -m "test: [what tests you added]"`

### If `.agent_role = devops-engineer`
Load full instructions: `../../../agents/devops-engineer.md`

**Quick mission:**
1. Review TASKS.md for CI/CD and infra tasks
2. Create/enhance `.github/workflows/test.yml` and `deploy-*.yml`
3. Set up GitHub environments if needed
4. Test workflows locally with `act` tool (optional)
5. Document deployment process in README
6. Commit: `git commit -m "ci: [workflow changes]"`

### If `.agent_role = release-manager`
Load full instructions: `../../../agents/release-manager.md`

**Quick mission:**
1. Review TASKS.md for version/release tasks
2. Update version numbers in files (`package.json`, `setup.py`, etc.)
3. Create/update CHANGELOG or release notes
4. Tag releases: `git tag -a v1.0.0 -m "Release 1.0.0"`
5. Push tags: `git push origin --tags`
6. Commit: `git commit -m "chore: bump version to v1.0.0"`

### If `.agent_role = documentation-specialist`
Load full instructions: `../../../agents/documentation-specialist.md`

**Quick mission:**
1. Review TASKS.md for docs-related tasks
2. Update/expand README.md with usage examples
3. Add API/function documentation (docstrings)
4. Create/update CONTRIBUTING.md, SETUP.md, TROUBLESHOOTING.md
5. Validate all code examples work
6. Commit: `git commit -m "docs: [what documentation you added]"`

### If `.agent_role = project-orchestrator`
Load full instructions: `../../../agents/project-orchestrator.md`

**Quick mission:**
1. Review TASKS.md and identify blockers/dependencies
2. Plan which tasks can run in parallel
3. Assign work to specialists (update `.agent_role` as needed)
4. Track progress and update status
5. Escalate blockers and risks
6. Commit: `git commit -m "chore: priority update - [what changed]"`

---

## CALLING SPECIALIZED AGENTS

If a task needs a specialist you can't handle alone, update `.agent_role`:

```bash
# Switch to a specialist for specific work
echo "devops-engineer" > .agent_role
git add .agent_role
git commit -m "ops: switch to devops-engineer for CI/CD setup"
git push origin main
```

After switching, the next iteration will load that agent's expertise.

**Common task-to-agent mappings:**
- Implementing feature → Stay as `generic`
- Need tests? → Switch to `qa-specialist`
- Ready to release? → Switch to `release-manager`
- Need better docs? → Switch to `documentation-specialist`
- Complex multi-part work? → Switch to `project-orchestrator`
- Setting up CI/CD? → Switch to `devops-engineer`

Switch back to `generic` when the specialist work is done.

---

**Now start: Check `.agent_role` and read TASKS.md**

---

### ⚠️ CRITICAL TOKEN CONSTRAINTS:
- Iteration: 3 / 64k Token Budget
- Attempt: 2 (previous attempts may have partial progress)
- **Mandate:** Operate efficiently. Use partial edits, not full file rewrites when possible.
- **Output:** Be concise and action-oriented.
### Previous Attempt (Iteration 2):
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
[93m[1m! [0mpermission requested: external_directory (/home/julien/Desktop/Free-Wiggum-opencode/*); auto-rejecting
I'll start by checking the current state of the project and then complete the first task: choosing tech stack and documenting it in an ADR.
[0m✗ [0mread failed
[91m[1mError: [0mThe user rejected permission to use this specific tool call.
[0m
[0m$ [0mls -la
total 56
drwxr-xr-x  5 julien julien 4096 Mar 19 18:25 .
drwxr-xr-x 29 julien julien 4096 Mar 19 18:24 ..
-rw-r--r--  1 julien julien    8 Mar 19 18:25 .agent_role
drwxr-xr-x  7 julien julien 4096 Mar 19 18:25 .git
drwxr-xr-x  3 julien julien 4096 Mar 19 18:24 .github
-rw-r--r--  1 julien julien    4 Mar 19 18:24 .gitignore
drwxr-xr-x  2 julien julien 4096 Mar 19 18:25 logs
-rw-r--r--  1 julien julien 9218 Mar 19 18:24 prompt.txt
```

**Guidance:** Continue from where we left off. Don't re-do work already done. Focus on the next incomplete piece.


## CURRENT PROJECT STATE (Iteration 3)

```
# pictureshare
**Mission:** App for event photo sharing
All participants scan a written code and pictures they sent will be accessible to all in da group n vice versa

## Phase 1: Planning & Setup
- [ ] Choose tech stack: React Native (Expo), Firebase (Auth/Firestore/Storage), react-native-camera, qrcode library; document in ADR
- [ ] Initialize Expo project with TypeScript, configure ESLint/Prettier, and set up folder structure: components/, screens/, services/, utils/
- [ ] Create low-fidelity wireframes for: Event Join (QR scanner), Photo Feed, Upload Interface, Profile Screen
- [ ] Set up Firebase project with security rules baseline, initialize local emulators for development

## Phase 2: Authentication & Event Code System
- [ ] Implement Firebase Anonymous Auth + Google Sign-In as fallback; store user mapping locally
- [ ] Build event creation screen: generates 6-digit alphanumeric code, optional time/visibility settings
- [ ] Integrate `react-native-qrcode-svg` to display event QR code for sharing; encode deep link with event ID
- [ ] Develop QR scanner screen using `expo-camera`; validate code against Firestore and join user to event document's participants array

## Phase 3: Photo Capture, Compression & Upload
- [ ] Build camera/gallery picker with `expo-image-picker`; request permissions and handle denials with explanatory UI
- [ ] Add image compression pipeline: use `expo-image-manipulator` to resize to ≤1920px, compress to 80% quality
- [ ] Implement upload service: upload compressed image to Firebase Storage path `/events/{eventId}/photos/{photoId}.jpg`
- [ ] Save photo metadata to Firestore collection `photos` with fields: eventId, uploaderId, storagePath, createdAt, thumbnailPath

## Phase 4: Real-Time Feed & Sync
- [ ] Subscribe to Firestore `photos` collection query `where eventId == current` with real-time listener; render in FlatList
- [ ] Implement optimistic UI: add photo to feed immediately after upload, mark pending, finalize on server confirmation
- [ ] Build infinite scroll pagination using Firestore cursor; load 20 initial photos, fetch more on scroll
- [ ] Add offline-first behavior: cache photos locally with `expo-file-system`; retry failed uploads when back online

## Phase 5: Group Permissions & Interactions
- [ ] Enable deletion: only photo owner or event creator can delete; remove from Storage and Firestore
- [ ] Add likes: create `likes` subcollection under each photo; toggle like on press; update aggregated like count
- [ ] Create lightweight comments: allow short text on photos; store in `comments` subcollection; real-time updates
- [ ] Show participant list per event with avatars (from Google Auth) and photo count; differentiate current user

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

## NEXT TASK TO COMPLETE:
Choose tech stack: React Native (Expo), Firebase (Auth/Firestore/Storage), react-native-camera, qrcode library; document in ADR

**Instructions:** Complete this task. Mark [x] in TASKS.md when done. Create, modify, or delete files as needed. Execute commands as needed. Also update README.md to match this project (name, setup instructions, current progress). No permission needed—just act.
```

## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
I'll check the current project state and complete the first task: choosing tech stack and documenting in an ADR.
[0m→ [0mRead TASKS.md
[0m→ [0mRead README.md
[0m✱ [0mGlob "**/*.md"[90m 6 matches[0m
[0m⚙ [0minvalid Invalid Tool
Let me check if there's an ADR directory or existing ADRs:
[0m✱ [0mGlob "**/ADR*.md"[90m 0 matches[0m
[0m✱ [0mGlob "**/adr*.md"[90m 0 matches[0m
[0m
[0m$ [0mmkdir -p /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/docs/adr
No ADRs exist yet. I'll create an ADR directory and document the tech stack decision:
[0m
[0m← [0mWrite docs/adr/ADR-001-tech-stack.md
Wrote file successfully.
[0m
Now I'll create the ADR documenting the tech stack decision:
Now I'll update the README.md to reflect this specific project:
[0m← [0mEdit README.md
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/README.md
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/README.md
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/README.md
@@ -1,29 +1,83 @@
-# Project Template
+# PictureShare
 
-This is a template for new projects created via `wiggum_master.sh create`.
+Mobile app for seamless event photo sharing. Scan a QR code, join an event, and instantly share photos with your group in real-time.
 
-Each project:
-- Lives in `projects/<project-name>/`
-- Has its own GitHub repository
-- Runs its own autonomous OpenCode agent loop
-- Tracks progress in TASKS.md
+## Features
 
-## Setup
+- **QR Code Event Joining** - Scan and join events instantly
+- **Real-Time Photo Feed** - See photos as they're uploaded
+- **Image Compression** - Optimized uploads without quality loss
+- **Offline-First** - Works without internet, syncs when back online
+- **Group Interactions** - Like and comment on photos
+- **Cross-Platform** - Works on iOS and Android
 
-1. Create: `bash wiggum_master.sh create "my-project" "Description"`
-2. View: `cat projects/my-project/README.md`
-3. Initialize: `cd projects/my-project && opencode /init --yes`
-4. Run: `cd projects/my-project && bash wiggum.sh`
+## Tech Stack
 
-## Files
+- **React Native** (Expo) - Cross-platform mobile framework
+- **Firebase** - Backend (Auth, Firestore, Storage)
+- **TypeScript** - Type-safe development
 
-- **README.md** - Project documentation
-- **TASKS.md** - Development task list
-- **prompt.txt** - Agent instructions (project-specific)
-- **AGENTS.md** - Project context (auto-generated)
-- **src/** - Source code directory
-- **tests/** - Test files
+## Getting Started
 
-## Customization
+### Prerequisites
 
-Update TASKS.md with your project goals, then let the agent handle it!
+- Node.js 18+
+- Expo CLI: `npm install -g expo-cli`
+- iOS Simulator (Xcode) or Android Studio
+
+### Installation
+
+1. Clone and install dependencies:
+   ```bash
+   npm install
+   ```
+
+2. Set up Firebase:
+   - Create a Firebase project
+   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
+   - Place them in their respective platform directories
+   - Enable Authentication (Anonymous + Google), Firestore, and Storage
+
+3. Start the development server:
+   ```bash
+   npm start
+   ```
+
+4. Run on device/simulator:
+   - Scan QR code with Expo Go app (iOS/Android)
+   - Or press `i` for iOS simulator, `a` for Android emulator
+
+## Project Structure
+
+```
+src/
+├── components/     # Reusable UI components
+├── screens/        # App screens
+├── services/       # Firebase and API services
+├── utils/          # Helper functions
+└── types/          # TypeScript type definitions
+```
+
+## Development Workflow
+
+1. Create feature branch from `main`
+2. Make changes and add tests
+3. Run linting: `npm run lint`
+4. Run tests: `npm test`
+5. Commit and push
+6. Open pull request
+
+## Current Phase
+
+**Phase 1: Planning & Setup** - In Progress
+
+- [x] Tech stack documented in ADR
+- [ ] Expo project initialization
+- [ ] Wireframes
+- [ ] Firebase emulator setup
+
+See [TASKS.md](./TASKS.md) for full roadmap.
+
+## Contributing
+
+This is an autonomous agent-driven project. See agent instructions in `prompt.txt`.

[0m
[0m← [0mEdit TASKS.md
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/TASKS.md
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/TASKS.md
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/TASKS.md
@@ -2,9 +2,9 @@
 **Mission:** App for event photo sharing
 All participants scan a written code and pictures they sent will be accessible to all in da group n vice versa
 
 ## Phase 1: Planning & Setup
-- [ ] Choose tech stack: React Native (Expo), Firebase (Auth/Firestore/Storage), react-native-camera, qrcode library; document in ADR
+- [x] Choose tech stack: React Native (Expo), Firebase (Auth/Firestore/Storage), react-native-camera, qrcode library; document in ADR
 - [ ] Initialize Expo project with TypeScript, configure ESLint/Prettier, and set up folder structure: components/, screens/, services/, utils/
 - [ ] Create low-fidelity wireframes for: Event Join (QR scanner), Photo Feed, Upload Interface, Profile Screen
 - [ ] Set up Firebase project with security rules baseline, initialize local emulators for development
 

[0m
Now I'll mark the first task as completed in TASKS.md:
Wait - I need to complete **Task 0** first (GitHub Actions workflow setup) before Task 1 can be considered done. Let me create the GitHub Actions workflow file:
[0m$ [0mmkdir -p /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/.github/workflows
[0m✗ [0mwrite failed
[91m[1mError: [0mYou must read file /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/.github/workflows/test.yml before overwriting it. Use the Read tool first
Now I'll create the GitHub Actions workflow file with the Node.js template:
Let me check if the workflow directory was created properly and read an existing file to satisfy the requirement:
[0m
[0m$ [0mls -la /home/julien/Desktop/Free-Wiggum-opencode/projects/pictureshare/.github/workflows/
total 40
drwxr-xr-x 2 julien julien 4096 Mar 19 18:24 .
drwxr-xr-x 3 julien julien 4096 Mar 19 18:24 ..
-rw-r--r-- 1 julien julien 6143 Mar 19 18:24 deploy-production.yml
-rw-r--r-- 1 julien julien 4295 Mar 19 18:24 deploy-staging.yml
-rw-r--r-- 1 julien julien 3218 Mar 19 18:24 report-ci-errors.yml
-rw-r--r-- 1 julien julien 3227 Mar 19 18:24 test.yml
-rw-r--r-- 1 julien julien 6783 Mar 19 18:24 wiggum-system-check.yml
[0m
Good, the workflow files already exist. Task 0 was already done. Now let me check git status and commit my changes for Task 1:
[0m$ [0mgit status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md
	modified:   TASKS.md
	modified:   logs/iteration-1.md
	modified:   logs/worker-session-20260319-182452.log
	modified:   logs/worker-session-20260319-182513.log

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	docs/
	logs/iteration-3.md

no changes added to commit (use "git add" and/or "git commit -a")
[0m
Now I'll commit and push the changes:
[0m$ [0mgit add docs/ README.md TASKS.md && git commit -m "Feature: document tech stack in ADR-001 and update project README"
[main 4b3a49b] Feature: document tech stack in ADR-001 and update project README
 3 files changed, 152 insertions(+), 22 deletions(-)
 create mode 100644 docs/adr/ADR-001-tech-stack.md
[0m
Now push to GitHub:
[0m$ [0mgit push origin main
To https://github.com/Julien-ser/pictureshare.git
   efe9e12..4b3a49b  main -> main
[0m
Task 1 complete: ADR-001 created, README updated, committed to GitHub.
```

## TASKS.md After Iteration

```markdown
# pictureshare
**Mission:** App for event photo sharing
All participants scan a written code and pictures they sent will be accessible to all in da group n vice versa

## Phase 1: Planning & Setup
- [x] Choose tech stack: React Native (Expo), Firebase (Auth/Firestore/Storage), react-native-camera, qrcode library; document in ADR
- [ ] Initialize Expo project with TypeScript, configure ESLint/Prettier, and set up folder structure: components/, screens/, services/, utils/
- [ ] Create low-fidelity wireframes for: Event Join (QR scanner), Photo Feed, Upload Interface, Profile Screen
- [ ] Set up Firebase project with security rules baseline, initialize local emulators for development

## Phase 2: Authentication & Event Code System
- [ ] Implement Firebase Anonymous Auth + Google Sign-In as fallback; store user mapping locally
- [ ] Build event creation screen: generates 6-digit alphanumeric code, optional time/visibility settings
- [ ] Integrate `react-native-qrcode-svg` to display event QR code for sharing; encode deep link with event ID
- [ ] Develop QR scanner screen using `expo-camera`; validate code against Firestore and join user to event document's participants array

## Phase 3: Photo Capture, Compression & Upload
- [ ] Build camera/gallery picker with `expo-image-picker`; request permissions and handle denials with explanatory UI
- [ ] Add image compression pipeline: use `expo-image-manipulator` to resize to ≤1920px, compress to 80% quality
- [ ] Implement upload service: upload compressed image to Firebase Storage path `/events/{eventId}/photos/{photoId}.jpg`
- [ ] Save photo metadata to Firestore collection `photos` with fields: eventId, uploaderId, storagePath, createdAt, thumbnailPath

## Phase 4: Real-Time Feed & Sync
- [ ] Subscribe to Firestore `photos` collection query `where eventId == current` with real-time listener; render in FlatList
- [ ] Implement optimistic UI: add photo to feed immediately after upload, mark pending, finalize on server confirmation
- [ ] Build infinite scroll pagination using Firestore cursor; load 20 initial photos, fetch more on scroll
- [ ] Add offline-first behavior: cache photos locally with `expo-file-system`; retry failed uploads when back online

## Phase 5: Group Permissions & Interactions
- [ ] Enable deletion: only photo owner or event creator can delete; remove from Storage and Firestore
- [ ] Add likes: create `likes` subcollection under each photo; toggle like on press; update aggregated like count
- [ ] Create lightweight comments: allow short text on photos; store in `comments` subcollection; real-time updates
- [ ] Show participant list per event with avatars (from Google Auth) and photo count; differentiate current user

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

**Completed at:** Thu Mar 19 06:27:31 PM EDT 2026
