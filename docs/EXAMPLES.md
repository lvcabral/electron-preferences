# Examples

Complete examples demonstrating various features of Electron Preferences.

## Basic Setup

### Minimal Configuration

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
      name: 'John Doe'
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
            label: 'User Information',
            fields: [
              {
                label: 'Name',
                key: 'name',
                type: 'text',
                help: 'Enter your full name'
              }
            ]
          }
        ]
      }
    }
  ]
});

// Show preferences
preferences.show();
```

---

## Complete Example

This example demonstrates most features of Electron Preferences:

```javascript
const electron = require('electron');
const { app, Menu } = electron;
const path = require('path');
const os = require('os');
const ElectronPreferences = require('@lvcabral/electron-preferences');

const preferences = new ElectronPreferences({
  // Enable debug mode (opens DevTools)
  debug: false,
  
  // Configuration
  config: {
    // Where preferences are saved
    dataStore: path.join(app.getPath('userData'), 'preferences.json'),
    
    // Custom CSS file (optional)
    css: 'custom-styles.css',
    
    // Debounce save events (ms)
    debounce: 150
  },
  
  // Default values
  defaults: {
    about: {
      firstName: 'John',
      lastName: 'Doe',
      enableGender: false,
      gender: 'unspecified'
    },
    editor: {
      fontSize: 14,
      theme: 'dark',
      lineNumbers: true,
      wordWrap: true
    },
    files: {
      projectFolder: path.join(os.homedir(), 'Projects'),
      recentFiles: []
    }
  },
  
  // Custom BrowserWindow options
  browserWindowOverrides: {
    title: 'My App Preferences',
    width: 900,
    height: 700,
    resizable: true,
    maximizable: false
  },
  
  // Optional menu bar
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
  ]),
  
  // Web preferences
  webPreferences: {
    webSecurity: true,
    contextIsolation: true
  },
  
  // Sections define the layout
  sections: [
    {
      id: 'about',
      label: 'About You',
      icon: 'single-01',
      form: {
        groups: [
          {
            label: 'Personal Information',
            fields: [
              {
                label: 'First Name',
                key: 'firstName',
                type: 'text',
                help: 'Your first name',
                style: { width: '50%' }
              },
              {
                label: 'Last Name',
                key: 'lastName',
                type: 'text',
                help: 'Your last name',
                style: { width: '50%' }
              },
              {
                label: 'Enable Gender Field',
                key: 'enableGender',
                type: 'radio',
                options: [
                  { label: 'No', value: false },
                  { label: 'Yes', value: true }
                ]
              },
              {
                label: 'Gender',
                key: 'gender',
                type: 'dropdown',
                options: [
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Unspecified', value: 'unspecified' }
                ],
                // Conditional visibility
                hideFunction: (preferences) => !preferences.about?.enableGender
              }
            ]
          }
        ]
      }
    },
    
    {
      id: 'editor',
      label: 'Editor',
      icon: 'edit-78',
      form: {
        groups: [
          {
            label: 'Appearance',
            fields: [
              {
                label: 'Theme',
                key: 'theme',
                type: 'radio',
                options: [
                  { label: 'Light', value: 'light' },
                  { label: 'Dark', value: 'dark' },
                  { label: 'Auto', value: 'auto' }
                ],
                help: 'Choose your preferred theme'
              },
              {
                label: 'Font Size',
                key: 'fontSize',
                type: 'slider',
                min: 10,
                max: 24,
                help: 'Editor font size'
              },
              {
                label: 'Accent Color',
                key: 'accentColor',
                type: 'color',
                format: 'hex',
                help: 'Choose an accent color'
              }
            ]
          },
          {
            label: 'Editor Features',
            fields: [
              {
                label: 'Features',
                key: 'features',
                type: 'checkbox',
                options: [
                  { label: 'Line Numbers', value: 'lineNumbers' },
                  { label: 'Word Wrap', value: 'wordWrap' },
                  { label: 'Auto Save', value: 'autoSave' },
                  { label: 'Mini Map', value: 'miniMap' }
                ]
              }
            ]
          }
        ]
      }
    },
    
    {
      id: 'files',
      label: 'Files & Folders',
      icon: 'folder-15',
      form: {
        groups: [
          {
            label: 'Locations',
            fields: [
              {
                label: 'Project Folder',
                key: 'projectFolder',
                type: 'directory',
                help: 'Default location for new projects',
                multiSelections: false,
                dontAddToRecent: true
              },
              {
                label: 'Recent Files',
                key: 'recentFiles',
                type: 'file',
                help: 'Select files to add to recents',
                multiSelections: true,
                filters: [
                  { name: 'All Files', extensions: ['*'] }
                ]
              }
            ]
          },
          {
            label: 'File Types',
            fields: [
              {
                label: 'Supported Formats',
                key: 'formats',
                type: 'list',
                help: 'List of supported file formats',
                addItemLabel: 'Add Format',
                orderable: true,
                min: 1,
                max: 10
              }
            ]
          }
        ]
      }
    },
    
    {
      id: 'shortcuts',
      label: 'Keyboard Shortcuts',
      icon: 'key-25',
      form: {
        groups: [
          {
            label: 'Editor Shortcuts',
            fields: [
              {
                label: 'Quick Save',
                key: 'quickSave',
                type: 'accelerator',
                help: 'Keyboard shortcut for quick save',
                modifierRequired: true
              },
              {
                label: 'Find',
                key: 'find',
                type: 'accelerator',
                help: 'Keyboard shortcut for find',
                modifierRequired: true
              }
            ]
          }
        ]
      }
    },
    
    {
      id: 'environment',
      label: 'Environment',
      icon: 'app-terminal',
      form: {
        groups: [
          {
            label: 'Variables',
            fields: [
              {
                label: 'Environment Variables',
                key: 'envVars',
                type: 'map',
                keyLabel: 'Variable Name',
                valueLabel: 'Value',
                addButtonLabel: 'Add Variable',
                help: 'Key-value pairs for environment variables'
              }
            ]
          }
        ]
      }
    },
    
    {
      id: 'account',
      label: 'Account',
      icon: 'lock',
      form: {
        groups: [
          {
            label: 'Credentials',
            fields: [
              {
                label: 'Username',
                key: 'username',
                type: 'text',
                help: 'Your account username'
              },
              {
                label: 'API Key',
                key: 'apiKey',
                type: 'secret',
                help: 'Your secret API key (encrypted)'
              }
            ]
          },
          {
            label: 'Actions',
            fields: [
              {
                heading: 'Reset Warning',
                content: '<p><strong>Warning:</strong> Resetting will clear all preferences!</p>',
                type: 'message'
              },
              {
                label: 'Reset Preferences',
                key: 'resetButton',
                type: 'button',
                buttonLabel: 'Reset All Settings',
                help: 'Click to reset all preferences to defaults'
              }
            ]
          }
        ]
      }
    }
  ]
});

// Event listeners
preferences.on('save', (preferences) => {
  console.log('Preferences saved:', preferences);
});

preferences.on('click', (key) => {
  if (key === 'resetButton') {
    // Handle reset button click
    const response = dialog.showMessageBoxSync({
      type: 'question',
      buttons: ['Cancel', 'Reset'],
      defaultId: 0,
      title: 'Reset Preferences',
      message: 'Are you sure you want to reset all preferences?'
    });
    
    if (response === 1) {
      // Reset logic here
      app.relaunch();
      app.exit();
    }
  }
});

module.exports = preferences;
```

---

## Field Layout Examples

### Side-by-Side Fields

```javascript
fields: [
  {
    label: 'First Name',
    key: 'firstName',
    type: 'text',
    style: { width: '50%' }  // Takes 50% of row
  },
  {
    label: 'Last Name',
    key: 'lastName',
    type: 'text',
    style: { width: '50%' }  // Takes remaining 50%
  }
]
```

### Three-Column Layout

```javascript
fields: [
  {
    label: 'Day',
    key: 'day',
    type: 'number',
    style: { width: '33%' }
  },
  {
    label: 'Month',
    key: 'month',
    type: 'number',
    style: { width: '33%' }
  },
  {
    label: 'Year',
    key: 'year',
    type: 'number',
    style: { width: '33%' }
  }
]
```

### Mixed Width Layout

```javascript
fields: [
  {
    label: 'City',
    key: 'city',
    type: 'text',
    style: { width: '70%' }
  },
  {
    label: 'State',
    key: 'state',
    type: 'dropdown',
    options: [/* states */],
    style: { width: '30%' }
  }
]
```

---

## Dynamic Section Updates

Update preferences UI at runtime without reopening the window:

```javascript
// Function to discover network devices
function getDiscoveredDevices() {
  // Your device discovery logic
  return [
    { label: 'Device 1 (192.168.1.100)', value: '192.168.1.100' },
    { label: 'Device 2 (192.168.1.101)', value: '192.168.1.101' }
  ];
}

// Update dropdown options
const networkSection = preferences.options.sections.find(s => s.id === 'network');
const deviceField = networkSection.form.groups[0].fields.find(f => f.key === 'device');
deviceField.options = getDiscoveredDevices();

// Broadcast changes to renderer
preferences.broadcastSections();
```

---

## Working with Encrypted Secrets

```javascript
// In your sections definition:
{
  label: 'API Key',
  key: 'apiKey',
  type: 'secret'
}

// In main process:
// Get encrypted value
const encrypted = preferences.value('account.apiKey');

// Decrypt when needed
const apiKey = preferences.decrypt(encrypted);

// Use the decrypted key
makeAPICall(apiKey);
```

---

## Renderer Process Integration

### Get Preferences in Renderer

```javascript
// renderer.js
const { ipcRenderer } = require('electron');

// Get current preferences
const prefs = ipcRenderer.sendSync('getPreferences');
console.log('Current theme:', prefs.editor.theme);

// Listen for changes
ipcRenderer.on('preferencesUpdated', (event, prefs) => {
  // Update UI based on new preferences
  applyTheme(prefs.editor.theme);
  updateFontSize(prefs.editor.fontSize);
});
```

### Update Preferences from Renderer

```javascript
// renderer.js
const { ipcRenderer } = require('electron');

// Update a preference
ipcRenderer.sendSync('setPreferences', {
  editor: {
    theme: 'dark'
  }
});
```

### Show Preferences from Menu

```javascript
// main.js
const { Menu } = require('electron');

const menu = Menu.buildFromTemplate([
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Preferences',
        accelerator: 'CmdOrCtrl+,',
        click: () => {
          preferences.show();
        }
      }
    ]
  }
]);

Menu.setApplicationMenu(menu);
```

---

## Conditional Visibility

### Hide Section Based on Preference

```javascript
{
  id: 'advanced',
  label: 'Advanced',
  icon: 'settings-gear-63',
  hideFunction: (preferences) => {
    return !preferences.general?.showAdvanced;
  },
  form: { /* ... */ }
}
```

### Hide Group Based on Multiple Conditions

```javascript
{
  label: 'Pro Features',
  hideFunction: (preferences) => {
    return !preferences.account?.isPro || !preferences.account?.verified;
  },
  fields: [ /* ... */ ]
}
```

### Hide Field Based on Another Field

```javascript
{
  label: 'Custom Server',
  key: 'customServer',
  type: 'text',
  hideFunction: (preferences) => {
    return preferences.network?.serverType !== 'custom';
  }
}
```

---

## See Also

- [Field Types Documentation](FIELD_TYPES.md) - Complete field type reference
- [API Documentation](API.md) - Full API reference
- [Icons Gallery](ICONS.md) - Available icons
