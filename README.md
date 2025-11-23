# Electron Preferences

> A simple, powerful preference management system for Electron applications with a built-in GUI

[![npm version](https://badge.fury.io/js/@lvcabral%2Felectron-preferences.svg)](https://www.npmjs.com/package/@lvcabral/electron-preferences)

<img src="misc/demo.png" alt="Electron Preferences Demo" />

## Overview

Electron Preferences provides developers with a complete preference management solution:

- **Key/Value Store** - Simple API for reading and writing preferences
- **Built-in GUI** - Customizable preferences window with React components
- **15+ Field Types** - Text, numbers, dropdowns, sliders, color pickers, file selectors, and more
- **Flexible Layout** - Side-by-side fields, custom widths, conditional visibility
- **Theme Support** - Automatic dark/light mode support
- **65+ Icons** - Built-in icon set plus custom SVG support
- **Encrypted Storage** - Secure storage for sensitive data using Electron's `safeStorage`

### Fork Information

This is an enhanced fork of [electron-preferences](https://github.com/tkambler/electron-preferences) with additional features:

- ✨ **New `map` field type** for key-value pairs
- 🎨 **Enhanced theme support** (dark/light/custom)
- 🔄 **Runtime section updates** without reopening window
- 🎯 **Flexible field layouts** with custom widths
- 🖼️ **Custom SVG icon support**
- 📦 **Additional built-in icons**

Originally enhanced for the [BrightScript Simulator project](https://github.com/lvcabral/brs-desktop).


<img src="misc/demo.gif" alt="Electron Preferences Animation" />

---

## Quick Start

### Installation

```bash
npm install @lvcabral/electron-preferences
```

### Basic Usage

```javascript
const { app } = require('electron');
const path = require('path');
const ElectronPreferences = require('@lvcabral/electron-preferences');

const preferences = new ElectronPreferences({
  config: {
    dataStore: path.join(app.getPath('userData'), 'preferences.json')
  },
  defaults: {
    general: {
      name: 'John Doe',
      theme: 'dark'
    }
  },
  sections: [
    {
      id: 'general',
      label: 'General',
      icon: 'settings-gear-63',
      form: {
        groups: [
          {
            label: 'User Settings',
            fields: [
              {
                label: 'Name',
                key: 'name',
                type: 'text',
                help: 'Your display name'
              },
              {
                label: 'Theme',
                key: 'theme',
                type: 'radio',
                options: [
                  { label: 'Light', value: 'light' },
                  { label: 'Dark', value: 'dark' }
                ]
              }
            ]
          }
        ]
      }
    }
  ]
});

// Show preferences window
preferences.show();

// Get/set values
const name = preferences.value('general.name');
preferences.value('general.theme', 'dark');

// Listen to changes
preferences.on('save', (prefs) => {
  console.log('Preferences updated:', prefs);
});
```

---

## Documentation

Comprehensive documentation is organized into focused guides:

### 📚 Core Documentation

- **[API Reference](docs/API.md)** - Complete API documentation including constructor options, methods, and events
- **[Field Types](docs/FIELD_TYPES.md)** - All 15 field types with properties and examples
- **[Examples](docs/EXAMPLES.md)** - Complete examples and common patterns
- **[Icons Gallery](docs/ICONS.md)** - All 65 built-in icons and custom icon usage

### 🚀 Key Features

#### Field Types

15 built-in field types for every need:

| Type | Description |
|------|-------------|
| `text`, `number` | Text and numeric inputs |
| `dropdown`, `radio`, `checkbox` | Selection controls |
| `slider`, `color` | Visual pickers |
| `file`, `directory` | File system selection |
| `accelerator` | Keyboard shortcut input |
| `list`, `map` | Dynamic collections |
| `button`, `message` | Actions and info displays |
| `secret` | Encrypted storage |

[→ See all field types with examples](docs/FIELD_TYPES.md)

#### Flexible Layouts

Create custom layouts with side-by-side fields:

```javascript
fields: [
  {
    label: 'First Name',
    key: 'firstName',
    type: 'text',
    style: { width: '50%' }  // Side-by-side
  },
  {
    label: 'Last Name',
    key: 'lastName',
    type: 'text',
    style: { width: '50%' }
  }
]
```

#### Conditional Visibility

Show/hide sections, groups, or fields dynamically:

```javascript
{
  label: 'Advanced Settings',
  hideFunction: (prefs) => !prefs.general?.showAdvanced,
  fields: [/* ... */]
}
```

#### Runtime Updates

Update UI without closing the preferences window:

```javascript
const section = preferences.options.sections.find(s => s.id === 'devices');
section.form.groups[0].fields[0].options = getNewOptions();
preferences.broadcastSections(); // Updates UI immediately
```

---

## Demo Application

Run the included example to see all features:

```bash
git clone https://github.com/lvcabral/electron-preferences.git
cd electron-preferences
npm install --legacy-peer-deps
npm run build
npm run example
```

The example demonstrates all field types, conditional visibility, custom styling, and more.

---

## Development

```bash
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # Run ESLint
npm run example      # Run example app
```

---

## Browser Window Customization

Customize the preferences window appearance:

```javascript
browserWindowOverrides: {
  title: 'My App Settings',
  width: 1000,
  height: 800,
  resizable: true,
  maximizable: false
}
```

[→ See complete configuration options](docs/API.md#browserwindowoverrides-optional)

---

## Renderer Process Integration

Access preferences from renderer processes:

```javascript
const { ipcRenderer } = require('electron');

// Get preferences
const prefs = ipcRenderer.sendSync('getPreferences');

// Show preferences window
ipcRenderer.send('showPreferences');

// Listen for updates
ipcRenderer.on('preferencesUpdated', (event, prefs) => {
  console.log('Updated:', prefs);
});
```

[→ See complete renderer API](docs/API.md#renderer-process-api)

---

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

## License

MIT License - see LICENSE file for details

---

## Links

- **[GitHub Repository](https://github.com/lvcabral/electron-preferences)**
- **[npm Package](https://www.npmjs.com/package/@lvcabral/electron-preferences)**
- **[Original Project](https://github.com/tkambler/electron-preferences)**

