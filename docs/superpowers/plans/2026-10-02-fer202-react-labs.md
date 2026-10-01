# FER202 React Labs 1–3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, document, test, and deploy three standalone React labs at one GitHub Pages site.

**Architecture:** The repository is an npm-workspaces monorepo containing three independent Vite applications. Each lab owns its data and components so it can run alone; a root Node script builds the three apps into one Pages artifact, while a static portal links to each lab.

**Tech Stack:** React 19.3.0, React DOM 19.3.0, Vite 8.3.2, React Bootstrap 2.10.10, Bootstrap 5.3.8, Vitest 5.0.3, Testing Library, jsdom 29.0.1, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-02-fer202-react-labs-design.md`

## Global Constraints

- Keep `lab1`, `lab2`, and `lab3` independently runnable with their own `package.json`, `index.html`, Vite config, source, tests, and Vietnamese README.
- Use exactly 16 orchid records with fields `id`, `name`, `rating`, `isSpecial`, `image`, `color`, `origin`, and `category` in each `src/data/ListOfOrchids.js`.
- Lab 1 must use container/presentation components and `Array.map()`.
- Lab 2 must use `useState` and React Bootstrap Modal.
- Lab 3 must provide `AuthContext`, `AuthProvider`, `useAuth`, login/logout, light/dark theme, and `useEffect`-based `localStorage` synchronization.
- Do not add React Router, a state library, a backend, an API, or real authentication.
- Use accessible labels, visible focus states, semantic cards, responsive layout, image fallback, and `prefers-reduced-motion`.
- Production Pages paths are `/fer202-react-labs/lab1/`, `/fer202-react-labs/lab2/`, and `/fer202-react-labs/lab3/`.
- Follow red-green-refactor for each user-visible behavior and commit after every task passes its focused checks.

## File Map

- Root orchestration: `package.json`, `package-lock.json`, `.gitignore`, `scripts/build-all.mjs`.
- Portal and deployment: `site/index.html`, `site/styles.css`, `.github/workflows/deploy.yml`.
- Lab 1: `lab1/index.html`, `lab1/package.json`, `lab1/vite.config.js`, `lab1/src/**`, `lab1/public/orchid-placeholder.svg`, `lab1/README.md`.
- Lab 2: the same standalone structure plus `lab2/src/components/OrchidModal.jsx`.
- Lab 3: the same standalone structure plus `lab3/src/context/AuthContext.js`, `lab3/src/context/AuthProvider.jsx`, `lab3/src/hooks/useAuth.js`, and `lab3/src/components/AppNavbar.jsx`.
- Learning documentation: root `README.md` and one `README.md` inside each lab.

---

### Task 1: Create the npm workspace and shared project conventions

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `lab1/package.json`
- Create: `lab1/index.html`
- Create: `lab1/vite.config.js`
- Create: `lab1/src/test/setup.js`
- Create: `lab2/package.json`
- Create: `lab2/index.html`
- Create: `lab2/vite.config.js`
- Create: `lab2/src/test/setup.js`
- Create: `lab3/package.json`
- Create: `lab3/index.html`
- Create: `lab3/vite.config.js`
- Create: `lab3/src/test/setup.js`
- Generate: `package-lock.json`

**Interfaces:**
- Produces root commands `npm test`, `npm run build`, `npm run dev:lab1`, `npm run dev:lab2`, and `npm run dev:lab3`.
- Each workspace produces `dev`, `build`, and `test` scripts consumed by later tasks and CI.

- [ ] **Step 1: Add root workspace configuration**

Create root `package.json`:

```json
{
  "name": "fer202-react-labs",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "workspaces": ["lab1", "lab2", "lab3"],
  "scripts": {
    "dev:lab1": "npm run dev --workspace=@fer202/lab1",
    "dev:lab2": "npm run dev --workspace=@fer202/lab2",
    "dev:lab3": "npm run dev --workspace=@fer202/lab3",
    "test": "npm run test --workspaces --if-present",
    "build": "node scripts/build-all.mjs"
  },
  "devDependencies": {
    "jsdom": "29.0.1"
  }
}
```

Create `.gitignore` with `node_modules/`, `dist/`, `coverage/`, `.DS_Store`, and `*.local`.

- [ ] **Step 2: Add one standalone package manifest per lab**

Use this dependency baseline in all three packages:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "19.3.0",
    "react-dom": "19.3.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "7.0.1",
    "@testing-library/react": "16.3.3",
    "@testing-library/user-event": "14.6.7",
    "@vitejs/plugin-react": "6.1.1",
    "jsdom": "29.0.1",
    "vite": "8.3.2",
    "vitest": "5.0.3"
  }
}
```

Set package names to `@fer202/lab1`, `@fer202/lab2`, and `@fer202/lab3`; set `version` to `1.0.0`, `private` to `true`, and `type` to `module` in each manifest. Add `bootstrap: 5.3.8` and `react-bootstrap: 2.10.10` to Lab 2 and Lab 3 dependencies.

- [ ] **Step 3: Add Vite and test entry configuration**

Create the same `vite.config.js` in each lab:

```js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
});
```

Create each `src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest';
```

Create each `index.html` with `<div id="root"></div>` and `<script type="module" src="/src/main.jsx"></script>`. Use titles `FER202 Lab 1`, `FER202 Lab 2`, and `FER202 Lab 3`.

- [ ] **Step 4: Install and verify workspace resolution**

Run:

```powershell
npm install
npm ls --workspaces --depth=0
```

Expected: one lockfile at the repository root and all three workspace names listed without dependency errors.

- [ ] **Step 5: Commit workspace setup**

```powershell
git add .gitignore package.json package-lock.json lab1/package.json lab1/index.html lab1/vite.config.js lab1/src/test/setup.js lab2/package.json lab2/index.html lab2/vite.config.js lab2/src/test/setup.js lab3/package.json lab3/index.html lab3/vite.config.js lab3/src/test/setup.js
git commit -m "chore: set up FER202 lab workspaces"
```

---

### Task 2: Implement Lab 1 with container and presentation components

**Files:**
- Create: `lab1/src/App.test.jsx`
- Create: `lab1/src/main.jsx`
- Create: `lab1/src/App.jsx`
- Create: `lab1/src/data/ListOfOrchids.js`
- Create: `lab1/src/components/OrchidsContainer.jsx`
- Create: `lab1/src/components/OrchidsPresentation.jsx`
- Create: `lab1/src/components/OrchidCard.jsx`
- Create: `lab1/src/styles.css`
- Create: `lab1/public/orchid-placeholder.svg`

**Interfaces:**
- `OrchidsContainer()` imports `orchids` and passes them as `{ orchids }`.
- `OrchidsPresentation({ orchids })` maps each record to `OrchidCard`.
- `OrchidCard({ orchid })` renders one semantic `<article>` and has no state.

- [ ] **Step 1: Write the failing Lab 1 rendering test**

Create `lab1/src/App.test.jsx`:

```jsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Lab 1 orchid gallery', () => {
  it('renders all 16 orchids from the data module', () => {
    render(<App />);

    expect(screen.getAllByRole('article')).toHaveLength(16);
    expect(screen.getByRole('heading', { name: 'Taichung Beauty' })).toBeInTheDocument();
    expect(screen.getByText('Taiwan')).toBeInTheDocument();
    expect(screen.getAllByText('Special collection')).toHaveLength(8);
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm run test --workspace=@fer202/lab1`

Expected: FAIL because `lab1/src/App.jsx` does not exist.

- [ ] **Step 3: Add the exact 16-record orchid dataset**

Create `lab1/src/data/ListOfOrchids.js` exporting `orchids`. Use `https://loremflickr.com/960/720/orchid?lock=<id>` for each image and these records:

| id | name | rating | special | color | origin | category |
|---:|---|---:|:---:|---|---|---|
| 1 | Taichung Beauty | 5 | yes | Pink | Taiwan | Cattleya |
| 2 | Moon Orchid | 5 | yes | White | Indonesia | Phalaenopsis |
| 3 | Lady's Slipper | 4 | yes | Purple | Vietnam | Paphiopedilum |
| 4 | Dancing Lady | 4 | no | Yellow | Brazil | Oncidium |
| 5 | Noble Dendrobium | 4 | no | White | China | Dendrobium |
| 6 | Boat Orchid | 5 | yes | Green | India | Cymbidium |
| 7 | Vanda Blue Magic | 5 | yes | Blue | Thailand | Vanda |
| 8 | Miltonia Sunset | 4 | no | Orange | Brazil | Miltonia |
| 9 | Vanilla Orchid | 4 | no | Cream | Mexico | Vanilla |
| 10 | Jewel Orchid | 5 | yes | Burgundy | Malaysia | Ludisia |
| 11 | Brassia Spider | 4 | no | Yellow | Peru | Brassia |
| 12 | Epidendrum Flame | 4 | no | Red | Colombia | Epidendrum |
| 13 | Zygopetalum Advance | 5 | yes | Purple | Brazil | Zygopetalum |
| 14 | Masdevallia Veitchiana | 5 | yes | Orange | Peru | Masdevallia |
| 15 | Catasetum Pileatum | 4 | no | Green | Venezuela | Catasetum |
| 16 | Bletilla Striata | 4 | no | Pink | Japan | Bletilla |

- [ ] **Step 4: Add the minimal component flow**

Implement `OrchidsContainer.jsx`:

```jsx
import { orchids } from '../data/ListOfOrchids';
import OrchidsPresentation from './OrchidsPresentation';

export default function OrchidsContainer() {
  return <OrchidsPresentation orchids={orchids} />;
}
```

Implement `OrchidsPresentation.jsx`:

```jsx
import OrchidCard from './OrchidCard';

export default function OrchidsPresentation({ orchids }) {
  return <div className="orchid-grid">{orchids.map((orchid) => <OrchidCard key={orchid.id} orchid={orchid} />)}</div>;
}
```

Implement `OrchidCard.jsx` with an `<article className="orchid-card">`, an image with descriptive alt text, a conditional `Special collection` badge, heading, origin, category, color, and an accessible rating string such as `Rating: 5 out of 5`. Its `onError` must replace the source once with `${import.meta.env.BASE_URL}orchid-placeholder.svg`.

Implement `App.jsx` with a botanical hero, a visible `Lab 1 · React Components` eyebrow, a heading explaining the collection, a short container/presentation explanation, and `<OrchidsContainer />`. Implement `main.jsx` with `createRoot` and `StrictMode`.

- [ ] **Step 5: Add the visual system and fallback asset**

In `styles.css`, define tokens `--paper: #f4f0e8`, `--ink: #17352b`, `--leaf: #1f6b4f`, `--leaf-dark: #124535`, `--orchid: #cf5f8f`, and `--line: #d8d0c3`. Use a responsive grid `repeat(auto-fit, minmax(min(100%, 250px), 1fr))`, image aspect ratio `4 / 3`, rounded cards, visible `:focus-visible`, and reduced-motion media query. Create a small local SVG flower placeholder using the same palette.

- [ ] **Step 6: Run tests and build to verify GREEN**

```powershell
npm run test --workspace=@fer202/lab1
npm run build --workspace=@fer202/lab1
```

Expected: one passing test and a successful `lab1/dist` build.

- [ ] **Step 7: Commit Lab 1**

```powershell
git add lab1
git commit -m "feat: implement React components lab"
```

---

### Task 3: Implement Lab 2 modal behavior with useState

**Files:**
- Create from Lab 1: `lab2/src/main.jsx`, `lab2/src/App.jsx`, `lab2/src/data/ListOfOrchids.js`, `lab2/src/components/OrchidsContainer.jsx`, `lab2/src/components/OrchidsPresentation.jsx`, `lab2/src/components/OrchidCard.jsx`, `lab2/src/styles.css`, `lab2/public/orchid-placeholder.svg`
- Create: `lab2/src/App.test.jsx`
- Create: `lab2/src/components/OrchidModal.jsx`
- Modify: `lab2/src/main.jsx`
- Modify: `lab2/src/App.jsx`
- Modify: `lab2/src/components/OrchidsContainer.jsx`
- Modify: `lab2/src/components/OrchidsPresentation.jsx`
- Modify: `lab2/src/components/OrchidCard.jsx`
- Modify: `lab2/src/styles.css`

**Interfaces:**
- `OrchidsPresentation({ orchids, onViewDetails })` passes the selected record upward.
- `OrchidCard({ orchid, onViewDetails })` calls `onViewDetails(orchid)`.
- `OrchidModal({ orchid, onClose })` uses `show={Boolean(orchid)}` and never owns duplicate visibility state.

- [ ] **Step 1: Copy the stable Lab 1 baseline**

```powershell
Copy-Item -Recurse -Force lab1/src/* lab2/src/
New-Item -ItemType Directory -Force lab2/public | Out-Null
Copy-Item -Force lab1/public/orchid-placeholder.svg lab2/public/orchid-placeholder.svg
```

Update Lab 2 headings from `Lab 1 · React Components` to `Lab 2 · useState`, but do not add modal behavior yet.

- [ ] **Step 2: Replace the Lab 1 test with a failing interaction test**

Create `lab2/src/App.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Lab 2 orchid details', () => {
  it('opens and closes the selected orchid modal', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'View details for Taichung Beauty' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'Taichung Beauty' })).toBeInTheDocument();
    expect(within(dialog).getByText('Cattleya')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close orchid details' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run the test and verify RED**

Run: `npm run test --workspace=@fer202/lab2`

Expected: FAIL because the `View details for Taichung Beauty` button does not exist.

- [ ] **Step 4: Add selection state and event flow**

Replace `OrchidsContainer` with:

```jsx
import { useState } from 'react';
import { orchids } from '../data/ListOfOrchids';
import OrchidModal from './OrchidModal';
import OrchidsPresentation from './OrchidsPresentation';

export default function OrchidsContainer() {
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  return (
    <>
      <OrchidsPresentation orchids={orchids} onViewDetails={setSelectedOrchid} />
      <OrchidModal orchid={selectedOrchid} onClose={() => setSelectedOrchid(null)} />
    </>
  );
}
```

Pass `onViewDetails` through the presentation component. Add a card button with `aria-label={\`View details for ${orchid.name}\`}` and `onClick={() => onViewDetails(orchid)}`.

- [ ] **Step 5: Implement the React Bootstrap modal**

Create `OrchidModal.jsx` using `Modal`, `Badge`, and `Button` from `react-bootstrap`. Use `show={Boolean(orchid)}`, `onHide={onClose}`, `centered`, and return the selected image, name, origin, category, color, rating, and special status. The footer button must use `aria-label="Close orchid details"`.

Import `bootstrap/dist/css/bootstrap.min.css` before the local stylesheet in `main.jsx`. Add only the local overrides needed for the botanical palette, modal image, and button contrast.

- [ ] **Step 6: Run tests and build to verify GREEN**

```powershell
npm run test --workspace=@fer202/lab2
npm run build --workspace=@fer202/lab2
```

Expected: the modal interaction test passes and `lab2/dist` builds successfully.

- [ ] **Step 7: Commit Lab 2**

```powershell
git add lab2
git commit -m "feat: add useState orchid detail modal"
```

---

### Task 4: Implement Lab 3 authentication context, persistence, and theme

**Files:**
- Create from Lab 2: `lab3/src/main.jsx`, `lab3/src/App.jsx`, `lab3/src/data/ListOfOrchids.js`, `lab3/src/components/OrchidsContainer.jsx`, `lab3/src/components/OrchidsPresentation.jsx`, `lab3/src/components/OrchidCard.jsx`, `lab3/src/components/OrchidModal.jsx`, `lab3/src/styles.css`, `lab3/public/orchid-placeholder.svg`
- Create: `lab3/src/App.test.jsx`
- Create: `lab3/src/context/AuthContext.js`
- Create: `lab3/src/context/AuthProvider.jsx`
- Create: `lab3/src/hooks/useAuth.js`
- Create: `lab3/src/components/AppNavbar.jsx`
- Modify: `lab3/src/main.jsx`
- Modify: `lab3/src/App.jsx`
- Modify: `lab3/src/styles.css`

**Interfaces:**
- `AuthContext` defaults to `null`.
- `AuthProvider({ children })` provides `{ user, login, logout, theme, toggleTheme }`.
- `useAuth()` returns that object and throws when called outside `AuthProvider`.
- Storage keys are exactly `fer202-lab3-user` and `fer202-lab3-theme`.
- `AppNavbar()` is the only component that directly invokes login, logout, and theme actions.

- [ ] **Step 1: Copy the stable Lab 2 baseline**

```powershell
Copy-Item -Recurse -Force lab2/src/* lab3/src/
New-Item -ItemType Directory -Force lab3/public | Out-Null
Copy-Item -Force lab2/public/orchid-placeholder.svg lab3/public/orchid-placeholder.svg
```

Update the hero eyebrow to `Lab 3 · Context & Effect Hooks`; do not add context UI yet.

- [ ] **Step 2: Write failing authentication and theme tests**

Create `lab3/src/App.test.jsx`:

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import AuthProvider from './context/AuthProvider';

function renderApp() {
  return render(<AuthProvider><App /></AuthProvider>);
}

describe('Lab 3 global state', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it('logs Aaron in and out while synchronizing localStorage', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Log in as Aaron' }));
    expect(screen.getByText('Welcome, Aaron')).toBeInTheDocument();
    await waitFor(() => expect(JSON.parse(localStorage.getItem('fer202-lab3-user'))).toEqual({ username: 'Aaron' }));

    await user.click(screen.getByRole('button', { name: 'Log out' }));
    expect(screen.getByRole('button', { name: 'Log in as Aaron' })).toBeInTheDocument();
    await waitFor(() => expect(localStorage.getItem('fer202-lab3-user')).toBeNull());
  });

  it('toggles and persists the application theme', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('fer202-lab3-theme')).toBe('dark');
  });

  it('restores valid user and theme values on startup', () => {
    localStorage.setItem('fer202-lab3-user', JSON.stringify({ username: 'Aaron' }));
    localStorage.setItem('fer202-lab3-theme', 'dark');

    renderApp();

    expect(screen.getByText('Welcome, Aaron')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
```

- [ ] **Step 3: Run the tests and verify RED**

Run: `npm run test --workspace=@fer202/lab3`

Expected: FAIL because `context/AuthProvider.jsx` does not exist.

- [ ] **Step 4: Create context and guarded custom hook**

Create `context/AuthContext.js`:

```js
import { createContext } from 'react';

const AuthContext = createContext(null);

export default AuthContext;
```

Create `hooks/useAuth.js`:

```js
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
```

- [ ] **Step 5: Implement provider state and effects**

Create `context/AuthProvider.jsx` with constants for both storage keys. Use lazy state initializers:

```jsx
function readStoredUser() {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user?.username === 'Aaron' ? user : null;
  } catch {
    return null;
  }
}

function readStoredTheme() {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}
```

Initialize `user` with `readStoredUser` and `theme` with `readStoredTheme`. Implement `login` as `setUser({ username: 'Aaron' })`, `logout` as `setUser(null)`, and `toggleTheme` as a functional state update. Use one effect to set/remove the user key and one effect to set the theme key plus `document.documentElement.dataset.theme = theme`. Provide the five public values through `AuthContext.Provider`.

- [ ] **Step 6: Add the consuming navbar and provider boundary**

Create `AppNavbar.jsx` with brand text `Orchid Atlas`; logged-out copy and button `Log in as Aaron`; logged-in copy `Welcome, Aaron` and button labelled `Log out`; and a theme button labelled `Switch to dark theme` or `Switch to light theme` for the next state.

Wrap `<App />` with `<AuthProvider>` in `main.jsx`. Render `<AppNavbar />` before the hero in `App.jsx`. Keep the Lab 2 orchid modal unchanged to demonstrate cumulative learning.

- [ ] **Step 7: Add full-app theme styling**

Refactor fixed Lab 2 colors into CSS variables on `:root`; add `:root[data-theme='dark']` overrides for page, surface, text, border, muted text, and modal colors. Apply `color-scheme: dark` in dark mode, preserve contrast for Bootstrap buttons, and transition only background, color, and border-color. Disable transitions under `prefers-reduced-motion`.

- [ ] **Step 8: Run tests and build to verify GREEN**

```powershell
npm run test --workspace=@fer202/lab3
npm run build --workspace=@fer202/lab3
```

Expected: three global-state tests pass and `lab3/dist` builds successfully.

- [ ] **Step 9: Commit Lab 3**

```powershell
git add lab3
git commit -m "feat: add context auth persistence and theme"
```

---

### Task 5: Write the Vietnamese learning documentation and portal

**Files:**
- Modify: `README.md`
- Create: `lab1/README.md`
- Create: `lab2/README.md`
- Create: `lab3/README.md`
- Create: `site/index.html`
- Create: `site/styles.css`

**Interfaces:**
- Root README links to the repository, live portal, three live lab URLs, and each local lab README.
- Portal links use relative paths `./lab1/`, `./lab2/`, and `./lab3/` so they work under the repository Pages base path.

- [ ] **Step 1: Write the Lab 1 guide**

Document in Vietnamese:

1. Mục tiêu: render 16 orchids from a JavaScript module.
2. Requirement mapping: `ListOfOrchids.js`, `map()`, container/presentation, eight fields, attractive responsive UI.
3. Concept explanations: component, props, one-way data flow, list rendering, `key`, conditional rendering, semantic HTML.
4. Flow: `App → OrchidsContainer → OrchidsPresentation → OrchidCard`.
5. File-by-file table naming every Lab 1 source file.
6. Annotated excerpts for the container prop handoff and `map()` call.
7. Commands: `npm install`, `npm run dev`, `npm test`, `npm run build`.
8. Review questions: why `key` is needed, why presentation does not import data, and when to extract a card component.

- [ ] **Step 2: Write the Lab 2 guide**

Explain that Lab 2 extends Lab 1. Cover `useState(null)`, event callbacks from child to parent, derived modal visibility with `Boolean(selectedOrchid)`, React Bootstrap component composition, and why one state variable is enough. Include the flow `button → callback → setSelectedOrchid → re-render → modal`, file table, commands, common mistakes, and three review questions.

- [ ] **Step 3: Write the Lab 3 guide**

Explain `createContext`, provider boundaries, `useContext`, the guarded `useAuth` custom hook, lazy state initialization, dependency arrays, two storage effects, fake authentication limitations, and CSS-variable theming. Include login/logout and theme flow diagrams in text, storage keys, file table, commands, common mistakes, security disclaimer, and review questions.

- [ ] **Step 4: Replace the root README**

Add project purpose and source assignment summary; live URLs for portal and all labs; a comparison table for Lab 1 components/props, Lab 2 state/events/modal, and Lab 3 context/effects/custom hook/persistence; repository tree; root and per-lab commands; deployment explanation; and a note that authentication is intentionally simulated.

- [ ] **Step 5: Create the static portal**

Create an accessible Vietnamese portal with a compact hero, three asymmetrical lab cards, skill tags, direct `Mở Lab` links, and repository link. Use the botanical palette without JavaScript. In `site/styles.css`, use a two-column editorial layout on desktop, one column below 760px, visible focus states, and reduced-motion handling.

- [ ] **Step 6: Validate documentation completeness**

Run:

```powershell
rg -n "Mục tiêu|Kiến thức|Luồng|Cấu trúc|npm run dev|Câu hỏi" lab1/README.md lab2/README.md lab3/README.md
rg -n "lab1/|lab2/|lab3/" README.md site/index.html
```

Expected: every lab guide contains all learning sections and both root artifacts contain all three links.

- [ ] **Step 7: Commit documentation and portal**

```powershell
git add README.md lab1/README.md lab2/README.md lab3/README.md site
git commit -m "docs: add Vietnamese lab guides and portal"
```

---

### Task 6: Build all apps, deploy GitHub Pages, and verify production

**Files:**
- Create: `scripts/build-all.mjs`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- `npm run build` creates `dist/index.html`, `dist/styles.css`, and complete `dist/lab1`, `dist/lab2`, `dist/lab3` sites.
- GitHub Actions publishes only root `dist` through the official Pages artifact flow.

- [ ] **Step 1: Add the deterministic aggregate build script**

Create `scripts/build-all.mjs`:

```js
import { execFileSync } from 'node:child_process';
import { cp, mkdir, rm } from 'node:fs/promises';

const labs = ['lab1', 'lab2', 'lab3'];
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('site/index.html', 'dist/index.html');
await cp('site/styles.css', 'dist/styles.css');

for (const lab of labs) {
  execFileSync(
    npm,
    ['run', 'build', '--workspace', `@fer202/${lab}`, '--', '--base', `/fer202-react-labs/${lab}/`],
    { stdio: 'inherit' }
  );
  await cp(`${lab}/dist`, `dist/${lab}`, { recursive: true });
}
```

- [ ] **Step 2: Run the complete local verification suite**

```powershell
npm test
npm run build
Test-Path dist/index.html
Test-Path dist/lab1/index.html
Test-Path dist/lab2/index.html
Test-Path dist/lab3/index.html
git diff --check
```

Expected: all tests pass, all four path checks return `True`, all builds succeed, and Git reports no whitespace errors.

- [ ] **Step 3: Add the Pages workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Commit deployment files and push**

```powershell
git add scripts/build-all.mjs .github/workflows/deploy.yml
git commit -m "ci: deploy labs to GitHub Pages"
git push origin main
```

- [ ] **Step 5: Enable workflow-based Pages and watch deployment**

```powershell
gh api repos/longbtran-dev/fer202-react-labs/pages 2>$null
if ($LASTEXITCODE -ne 0) {
  gh api --method POST repos/longbtran-dev/fer202-react-labs/pages -f build_type=workflow
} else {
  gh api --method PUT repos/longbtran-dev/fer202-react-labs/pages -f build_type=workflow
}
$runId = gh run list --workflow "Deploy GitHub Pages" --limit 1 --json databaseId --jq '.[0].databaseId'
gh run watch $runId --exit-status
```

Expected: the workflow finishes with conclusion `success` and reports the Pages environment URL.

- [ ] **Step 6: Verify all live routes and core interactions**

Open these exact production routes with browser automation and confirm each returns a rendered page rather than a GitHub 404:

- `https://longbtran-dev.github.io/fer202-react-labs/`
- `https://longbtran-dev.github.io/fer202-react-labs/lab1/`
- `https://longbtran-dev.github.io/fer202-react-labs/lab2/`
- `https://longbtran-dev.github.io/fer202-react-labs/lab3/`

Test desktop and mobile widths. Verify the portal links; 16 Lab 1 cards; Lab 2 modal open/close; Lab 3 login/logout, theme, and reload persistence; no horizontal overflow; and no browser console errors.

- [ ] **Step 7: Record final deployment metadata**

Run `git status --short`, `git log -6 --oneline`, and `gh repo view --json url,homepageUrl`. Confirm the working tree is clean, all task commits are visible, and set the repository homepage to the live portal if the returned `homepageUrl` is empty.
