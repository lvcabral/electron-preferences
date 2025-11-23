# API Reference

Complete API documentation for Electron Preferences.

## Table of Contents

- [Constructor](#constructor)
- [Configuration Options](#configuration-options)
- [Methods](#methods)
- [Events](#events)
- [Renderer Process API](#renderer-process-api)

---

## Constructor

```javascript
const preferences = new ElectronPreferences(options);
```

Creates a new preferences instance with the specified configuration.

---

## Configuration Options

### `config`

Configuration object containing various settings.

#### `config.dataStore` _(required)_

- **Type:** `string`
- **Description:** Path to the JSON file where preferences will be stored
- **Example:**
  ```javascript
  config: {
    dataStore: path.join(app.getPath('userData'), 'preferences.json')
  }
  ```

#### `config.debounce` _(optional)_

- **Type:** `number`
- **Default:** `0` (disabled)
- **Description:** Debounce delay in milliseconds for saving preferences. Set to `0` to disable debouncing.
- **Example:**
  ```javascript
  config: {
    debounce: 150 // Wait 150ms after last change before saving
  }
  ```

#### `config.css` _(optional)_

- **Type:** `string`
- **Description:** Path to a custom CSS file for styling the preferences window (relative to app path)
- **Example:**
  ```javascript
  config: {
    css: 'preferences-theme.css'
  }
  ```

---

### `defaults` _(optional)_

- **Type:** `object`
- **Description:** Default values for preferences. Organized by section and field key.
- **Example:**
  ```javascript
  defaults: {
    about: {
      firstName: 'John',
      lastName: 'Doe'
    },
    editor: {
      fontSize: 14,
      theme: 'dark'
    }
  }
  ```

---

### `sections` _(required)_

- **Type:** `array`
- **Description:** Array of section definitions that define the structure and layout of the preferences window
- **Structure:**
  ```javascript
  sections: [
    {
      id: 'about',              // Unique section identifier
      label: 'About You',       // Display label
      icon: 'single-01',        // Icon name or path
      hideFunction: (prefs) => false, // Optional visibility function
      form: {
        groups: [               // Array of field groups
          {
            label: 'Personal Info', // Optional group label
            hideFunction: (prefs) => false, // Optional visibility
            fields: [           // Array of field definitions
              // See FIELD_TYPES.md for field properties
            ]
          }
        ]
      }
    }
  ]
  ```

---

### `browserWindowOverrides` _(optional)_

- **Type:** `object`
- **Description:** Overrides for Electron BrowserWindow options
- **Default values:**
  ```javascript
  {
    width: 800,
    height: 600,
    resizable: true,
    maximizable: true,
    title: 'Preferences'
  }
  ```
- **Example:**
  ```javascript
  browserWindowOverrides: {
    title: 'My App Preferences',
    width: 1000,
    height: 800,
    maxWidth: 1200,
    maxHeight: 1000
  }
  ```

---

### `menuBar` _(optional)_

- **Type:** `Menu`
- **Description:** Electron Menu object to display in the preferences window
- **Example:**
  ```javascript
  const { Menu } = require('electron');
  
  menuBar: Menu.buildFromTemplate([
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    }
  ])
  ```

---

### `webPreferences` _(optional)_

- **Type:** `object`
- **Description:** Web preferences for the BrowserWindow
- **Example:**
  ```javascript
  webPreferences: {
    webSecurity: true,
    contextIsolation: true
  }
  ```

---

### `debug` _(optional)_

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Opens DevTools when the preferences window is shown
- **Example:**
  ```javascript
  const preferences = new ElectronPreferences({
    debug: true, // DevTools will open automatically
    // ...
  });
  ```

---

## Methods

### `show([sectionId])`

Opens the preferences window. Optionally navigates to a specific section.

**Parameters:**
- `sectionId` _(optional)_: ID of the section to display

**Returns:** `void`

**Examples:**
```javascript
// Show preferences window
preferences.show();

// Show specific section
preferences.show('about');
```

---

### `value(key, [value])`

Get or set a preference value.

**Parameters:**
- `key` _(required)_: Preference key in format `section.field`
- `value` _(optional)_: Value to set. If omitted, returns current value.

**Returns:** Current value (when getting) or `void` (when setting)

**Examples:**
```javascript
// Get value
const name = preferences.value('about.firstName');

// Set value
preferences.value('about.firstName', 'Jane');

// Nested values
preferences.value('editor.theme.mode', 'dark');
```

---

### `broadcastSections()`

Notifies the renderer process to refresh section definitions. Use this after modifying `preferences.options.sections` at runtime.

**Returns:** `void`

**Example:**
```javascript
// Update dropdown options dynamically
const section = preferences.options.sections.find(s => s.id === 'devices');
const ipField = section.form.groups[0].fields.find(f => f.key === 'ip');
ipField.options = getDiscoveredDevices();

// Notify renderer to refresh
preferences.broadcastSections();
```

---

### `decrypt(encryptedString)`

Decrypts a value stored with the `secret` field type.

**Parameters:**
- `encryptedString` _(required)_: Base64-encoded encrypted string

**Returns:** Decrypted string

**Example:**
```javascript
const encrypted = preferences.value('account.apiKey');
const apiKey = preferences.decrypt(encrypted);
```

**Note:** Only available after Electron's `app.ready` event on some operating systems.

---

## Events

### `save`

Emitted when preferences are saved.

**Callback Parameters:**
- `preferences` _(object)_: Complete preferences object

**Example:**
```javascript
preferences.on('save', (prefs) => {
  console.log('Preferences saved:', prefs);
  // React to preference changes
});
```

---

### `click`

Emitted when a `button` field is clicked.

**Callback Parameters:**
- `key` _(string)_: The field key of the clicked button

**Example:**
```javascript
// Button field definition:
{
  label: 'Reset Settings',
  key: 'resetButton',
  type: 'button',
  buttonLabel: 'Reset'
}

// Handle button click:
preferences.on('click', (key) => {
  if (key === 'resetButton') {
    // Handle reset logic
    app.relaunch();
    app.exit();
  }
});
```

---

## Renderer Process API

Access preferences from the renderer process using IPC.

### Get Preferences

```javascript
const { ipcRenderer } = require('electron');

// Synchronous
const preferences = ipcRenderer.sendSync('getPreferences');
console.log(preferences);
```

---

### Set Preferences

```javascript
const { ipcRenderer } = require('electron');

// Update preferences
ipcRenderer.sendSync('setPreferences', {
  about: {
    firstName: 'Jane',
    lastName: 'Smith'
  }
});
```

---

### Show Preferences Window

```javascript
const { ipcRenderer } = require('electron');

// Show preferences
ipcRenderer.send('showPreferences');

// Show specific section
ipcRenderer.send('showPreferences', 'about');
```

---

### Listen to Updates

```javascript
const { ipcRenderer } = require('electron');

// Listen for preference changes
ipcRenderer.on('preferencesUpdated', (event, preferences) => {
  console.log('Preferences updated:', preferences);
  // Update UI based on new preferences
});
```

---

## Advanced Usage

### Conditional Visibility

Sections, groups, and fields support a `hideFunction` property that controls visibility:

```javascript
{
  id: 'advanced',
  label: 'Advanced',
  icon: 'settings-gear-63',
  hideFunction: (preferences) => {
    // Hide if advanced mode is not enabled
    return !preferences.general?.advancedMode;
  },
  form: { /* ... */ }
}
```

The function receives the current preferences object and should return `true` to hide the element.

---

### Dynamic Section Updates

Update section definitions at runtime without reopening the preferences window:

```javascript
// Add new option to dropdown
const section = preferences.options.sections.find(s => s.id === 'network');
const serverField = section.form.groups[0].fields.find(f => f.key === 'server');
serverField.options.push({ label: 'New Server', value: 'new-server' });

// Broadcast changes
preferences.broadcastSections();
```

The preferences window will immediately reflect the updated options.

---

## Deprecation Notices

### Legacy Options

The following options are deprecated and will be removed in a future version:

- `css` _(use `config.css` instead)_
- `dataStore` _(use `config.dataStore` instead)_

Example migration:

```javascript
// Old (deprecated)
const preferences = new ElectronPreferences({
  css: 'theme.css',
  dataStore: 'preferences.json'
});

// New (recommended)
const preferences = new ElectronPreferences({
  config: {
    css: 'theme.css',
    dataStore: 'preferences.json'
  }
});
```
