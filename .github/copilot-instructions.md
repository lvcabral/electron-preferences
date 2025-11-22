# Electron Preferences - AI Agent Instructions

## Project Overview

This is a forked and enhanced Electron library providing a configurable preferences UI and key-value store. It consists of:

- **Main process class** (`index.js`): ElectronPreferences managing IPC, persistence, and BrowserWindow lifecycle
- **Preload script** (`preload.js`): Context bridge exposing safe IPC APIs to renderer via `contextBridge.exposeInMainWorld`
- **React renderer** (`src/app/`): Preferences UI built with React class components and function components with hooks
- **Build pipeline**: Webpack bundles React app into `build/` directory

Fork adds: custom SVG icon support, theme support (dark/light/purple), runtime section updates via `broadcastSections()`.

## Architecture & Data Flow

### Three-Process Communication Pattern

```
Main Process (index.js)
    ↕ IPC channels (getPreferences, setPreferences, etc.)
Preload Script (preload.js)
    ↕ contextBridge.exposeInMainWorld('api', {...})
Renderer Process (src/app/index.jsx)
```

**Critical IPC channels** (all in `index.js` lines 130-230):

- `getPreferences`/`setPreferences`: Sync preference read/write
- `getSections`/`sectionsUpdated`: Section definition serialized via `serialize-javascript` (handles functions like `hideFunction`)
- `preferencesUpdated`: Broadcast to all webContents when preferences change (line 330)
- `encrypt`/`decrypt`: Uses Electron's `safeStorage` for secret field encryption

### State Management

- **Main source of truth**: JSON file at `config.dataStore` (read/written via `load-json-file`/`write-json-file`)
- **Debounced saves**: `savePreferencesDebounced` in `src/app/index.jsx` (150ms default, configurable via `config.debounce`)
- **Defaults merging**: Constructor (lines 90-120) deep-merges defaults with loaded preferences
- **Broadcast on change**: `broadcast()` method (line 320) sends updates to ALL webContents, not just preferences window

## Component Patterns

### React Component Mix

- **Class components**: `src/app/index.jsx` (main App), `src/app/components/main/index.jsx`, `src/app/components/sidebar/index.jsx`
- **Function components with hooks**: Field components like `accelerator/index.jsx` use `React.useState`
- **No Redux/context**: Props drilling from App → Main → Group → Field components

### Field Component Contract

All field components in `src/app/components/main/components/group/components/fields/*/` follow:

```jsx
const FieldType = ({ field, value, onChange, preferences, allPreferences }) => {
  // field: { label, key, type, help, ...typeSpecificProps }
  // value: current value from preferences[sectionId][field.key]
  // onChange: (newValue) => triggers debounced save
  // allPreferences: full prefs object for hideFunction evaluation
};
```

**Available field types**: `text`, `number`, `dropdown`, `radio`, `checkbox`, `slider`, `file`, `directory`, `accelerator`, `color`, `list`, `map`, `button`, `message`, `secret`

### Conditional Visibility Pattern

**`hideFunction`** can be applied to sections, groups, or fields:

```javascript
hideFunction: (preferences) => !preferences.sectionsEnabler?.lists;
```

Wrapped by `HideableComponent` (`src/app/components/generic/hideable/index.jsx`) which evaluates hideFunction on every render.

### Custom Icons

Sidebar component (`src/app/components/sidebar/index.jsx` lines 23-29) detects custom SVG paths:

- Built-in: `icon: 'single-01'` → loads `svg/single-01.svg`
- Custom: `icon: '/path/to/icon.svg'` or `./icon.svg` → uses path directly
  Icon rendered via CSS mask for theme-aware coloring.

## Key Implementation Details

### Section Updates at Runtime

Call `preferences.broadcastSections()` after mutating `preferences.options.sections` to refresh the renderer without reopening:

```javascript
const section = preferences.options.sections.find((s) => s.id === 'mySection');
section.form.groups[0].fields[0].options = newOptions;
preferences.broadcastSections(); // triggers sectionsUpdated IPC
```

Renderer listens via `api.onSectionsUpdated()` in `componentDidMount` (line 68).

### Serialize-javascript Usage

`serialize-javascript` (not standard JSON) is used for sections because they contain functions (`hideFunction`). Preload deserializes with `eval()` (line 8-9) - acknowledged security trade-off for function serialization.

### Secret Field Encryption

- Frontend encrypts via `api.encrypt(secret)` → IPC → `safeStorage.encryptString()` → base64
- Stored as base64 string in preferences JSON
- Decrypt in main process: `preferences.decrypt(encryptedString)` (line 559)
- **Important**: `safeStorage` only available after `app.ready` event

### Debounce Pattern

Uses custom debounce utility (`src/app/utils/debounce.js`) instead of lodash to batch rapid preference changes:

```javascript
const savePreferencesDebounced = debounce(
  (preferences) => savePreferences(preferences),
  debounceDelay ?? 150
);
```

Set `config.debounce: 0` to disable (useful for testing).

## Development Workflow

### Build Commands

```bash
npm run build        # Production build to build/
npm run build:dev    # Development build (non-minified)
npm run example      # Run example app (requires build first)
npm run lint         # ESLint with auto-fix
```

### Testing Changes

1. Make changes to `src/` or `scss/`
2. Run `npm run build` (webpack bundles to `build/`)
3. Run `npm run example` to test in example app
4. Check `example/preferences.json` for stored preferences

### Adding New Field Types

1. Create component in `src/app/components/main/components/group/components/fields/<type>/`
2. Export from new `index.jsx` following field component contract
3. Import and add to field type switch in `src/app/components/main/components/group/components/fields/` (not shown in codebase, check existing fields)
4. Add SCSS styling in component's `style.scss`

### Custom Styling

- Base styles: `scss/style.scss`
- Component-specific: Each component has adjacent `style.scss` (e.g., `checkbox/style.scss`)
- User custom CSS: Passed via `config.css`, injected at runtime in `show()` method (line 460)

## Common Pitfalls

- **Don't mutate preferences directly in main process** - use `preferences.value(key, val)` to ensure save + broadcast
- **IPC listeners never cleaned up** - All `ipcMain.on()` in constructor persist for app lifetime
- **prefsWindow can be null or destroyed** - Always check `!this.prefsWindow || this.prefsWindow.isDestroyed()` before calling methods
- **Group IDs are stable per section** - Groups get `id: 'group-${section.id}-${groupIdx}'` (line 61). The ID is stable as long as the section ID and group order within that section remain constant. Sections can be reordered in the array without affecting group IDs. Used only for CSS class names (`key-group-*`), not for preference storage.
- **React 18 strict mode** - Example uses React 18 but with class components (no concurrent features)
- **Legacy options deprecated** - `css` and `dataStore` moved to `config` namespace (see deprecation warnings lines 35-50)

## File Organization

```
index.js                    # Main process ElectronPreferences class
preload.js                  # Context bridge IPC exposure
src/app/index.jsx           # React root with IPC setup
src/app/components/
  main/                     # Right panel rendering active section
  sidebar/                  # Left panel with section tabs
  generic/hideable/         # HOC for hideFunction evaluation
  main/components/group/components/fields/  # All field type implementations
scss/style.scss             # Base styling
build/                      # Webpack output (gitignored in npm package)
example/                    # Test application
```

## Testing Notes

**No test suite exists** - `npm test` returns placeholder error. Changes should be tested manually via `npm run example`.
