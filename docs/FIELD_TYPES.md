# Field Types Reference

This document provides detailed information about all available field types in Electron Preferences.

## Available Field Types

| Type | Description |
|------|-------------|
| `text` | Single-line text input |
| `number` | Numeric input field |
| `dropdown` | Select dropdown menu |
| `radio` | Radio button group |
| `checkbox` | Checkbox options |
| `slider` | Range slider control |
| `file` | File picker dialog |
| `directory` | Directory picker dialog |
| `accelerator` | Keyboard shortcut input |
| `color` | Color picker (hex, rgb, or hsl) |
| `list` | Ordered list with CRUD operations |
| `map` | Key-value pair management |
| `button` | IPC button for custom actions |
| `message` | Read-only HTML content display |
| `secret` | Encrypted value storage |

---

## Common Field Properties

All field types support these base properties:

### `key` _(required)_
- **Type:** `string`
- **Description:** Unique identifier for the preference. Accessed as `<section_id>.<field_key>`

### `type` _(required)_
- **Type:** `string`
- **Description:** Field type from the table above

### `label` _(optional)_
- **Type:** `string`
- **Description:** Display label for the field

### `help` _(optional)_
- **Type:** `string`
- **Description:** Help text displayed below the field

### `style` _(optional)_
- **Type:** `object`
- **Description:** CSS styles to apply to the field wrapper. Useful for controlling width and enabling side-by-side layouts
- **Example:**
  ```javascript
  style: { width: '50%' } // Field takes 50% of row width
  ```

### `hideFunction` _(optional)_
- **Type:** `function`
- **Description:** Function that receives current preferences and returns boolean to show/hide field
- **Example:**
  ```javascript
  hideFunction: (preferences) => !preferences.section?.enableFeature
  ```

---

## Field Type Details

### `text`

Standard text input field.

**Additional Properties:**
- `inputType` _(optional)_: HTML input type (e.g., 'email', 'url', 'tel')

**Example:**
```javascript
{
  label: 'First Name',
  key: 'firstName',
  type: 'text',
  help: 'Enter your first name'
}
```

---

### `number`

Numeric input field with spinners.

**Example:**
```javascript
{
  label: 'Age',
  key: 'age',
  type: 'number'
}
```

---

### `dropdown`

Select dropdown menu.

**Additional Properties:**
- `options` _(required)_: Array of `{label, value}` objects

**Example:**
```javascript
{
  label: 'Country',
  key: 'country',
  type: 'dropdown',
  options: [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Mexico', value: 'mx' }
  ]
}
```

---

### `radio`

Radio button group for single selection.

**Additional Properties:**
- `options` _(required)_: Array of `{label, value}` objects

**Example:**
```javascript
{
  label: 'Theme',
  key: 'theme',
  type: 'radio',
  options: [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Auto', value: 'auto' }
  ]
}
```

---

### `checkbox`

Checkbox options for multiple selections.

**Additional Properties:**
- `options` _(required)_: Array of `{label, value}` objects

**Example:**
```javascript
{
  label: 'Enabled Features',
  key: 'features',
  type: 'checkbox',
  options: [
    { label: 'Auto Save', value: 'autoSave' },
    { label: 'Spell Check', value: 'spellCheck' },
    { label: 'Line Numbers', value: 'lineNumbers' }
  ]
}
```

---

### `slider`

Range slider control.

**Additional Properties:**
- `min` _(required)_: Minimum value
- `max` _(required)_: Maximum value
- `step` _(optional)_: Step increment (default: 1)

**Example:**
```javascript
{
  label: 'Font Size',
  key: 'fontSize',
  type: 'slider',
  min: 10,
  max: 24,
  step: 2
}
```

---

### `file`

File picker with multi-selection support.

**Additional Properties:**
- `buttonLabel` _(optional)_: Custom button text
- `filters` _(optional)_: Array of file type filters
- `multiSelections` _(optional)_: Allow multiple file selection
- `showHiddenFiles` _(optional)_: Show hidden files in dialog
- `noResolveAliases` _(optional)_: (macOS) Disable alias resolution
- `treatPackageAsDirectory` _(optional)_: (macOS) Treat .app folders as directories
- `dontAddToRecent` _(optional)_: Don't add to recent documents

**Example:**
```javascript
{
  label: 'Select Images',
  key: 'images',
  type: 'file',
  buttonLabel: 'Choose Images',
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'All Files', extensions: ['*'] }
  ],
  multiSelections: true
}
```

---

### `directory`

Directory picker dialog.

**Additional Properties:**
- Same as `file` type (except filters)

**Example:**
```javascript
{
  label: 'Project Folder',
  key: 'projectFolder',
  type: 'directory',
  help: 'Select your project root directory'
}
```

---

### `accelerator`

Keyboard shortcut input field.

**Additional Properties:**
- `allowOnlyModifier` _(optional)_: Allow modifier-only shortcuts (e.g., just 'Alt')
- `modifierRequired` _(optional)_: Require at least one modifier key

**Example:**
```javascript
{
  label: 'Quick Save Shortcut',
  key: 'quickSave',
  type: 'accelerator',
  modifierRequired: true,
  help: 'Press keys to set shortcut'
}
```

---

### `color`

Color picker with multiple format support.

**Additional Properties:**
- `format` _(optional)_: Output format - 'hex', 'rgb', or 'hsl' (default: 'hex')

**Example:**
```javascript
{
  label: 'Accent Color',
  key: 'accentColor',
  type: 'color',
  format: 'hex',
  help: 'Choose your preferred accent color'
}
```

---

### `list`

Ordered list with add/delete/reorder functionality.

**Additional Properties:**
- `size` _(optional)_: Number of visible items
- `addItemLabel` _(optional)_: Custom "Add" button text
- `addItemValidator` _(optional)_: Regex pattern (as string) to validate new items
- `orderable` _(optional)_: Enable drag-to-reorder functionality
- `min` _(optional)_: Minimum number of items
- `max` _(optional)_: Maximum number of items
- `modalCloseTimeoutMS` _(optional)_: Dialog close delay in ms (default: 100)

**Example:**
```javascript
{
  label: 'Favorite Foods',
  key: 'foods',
  type: 'list',
  size: 10,
  orderable: true,
  addItemLabel: 'Add Food',
  addItemValidator: /^[A-Za-z ]+$/.toString(),
  min: 1,
  max: 10
}
```

---

### `map`

Key-value pair management with add/delete functionality.

**Additional Properties:**
- `keyLabel` _(optional)_: Label for key input (default: 'Key')
- `valueLabel` _(optional)_: Label for value input (default: 'Value')
- `addButtonLabel` _(optional)_: Label for add button (default: 'Add')

**Stored Value:** Object with key-value pairs `{key: value}`

**Example:**
```javascript
{
  label: 'Environment Variables',
  key: 'envVars',
  type: 'map',
  keyLabel: 'Variable Name',
  valueLabel: 'Value',
  addButtonLabel: 'Add Variable',
  help: 'Define environment variables'
}
```

---

### `button`

IPC button for triggering actions in the main process.

**Additional Properties:**
- `buttonLabel` _(optional)_: Button text
- `hideLabel` _(optional)_: Hide the field label

**Usage:**
```javascript
// In preferences definition:
{
  label: 'Reset Application',
  key: 'resetButton',
  type: 'button',
  buttonLabel: 'Reset Now',
  help: 'This will reset all settings'
}

// In main process:
preferences.on('click', (key) => {
  if (key === 'resetButton') {
    // Handle reset action
  }
});
```

---

### `message`

Read-only HTML content display.

**Additional Properties:**
- `heading` _(optional)_: Message heading
- `content` _(required)_: HTML content to display

**Example:**
```javascript
{
  heading: 'Important Notice',
  content: '<p>This is an <strong>important</strong> message.</p>',
  type: 'message'
}
```

---

### `secret`

Encrypted secret storage using Electron's `safeStorage` API.

**Additional Properties:**
- `modalCloseTimeoutMS` _(optional)_: Dialog close delay in ms (default: 100)

**Important Notes:**
- Values are encrypted using Electron's `safeStorage`
- Encrypted value is stored as base64 string
- Decrypt using `preferences.decrypt(encryptedString)`
- `safeStorage` only available after `app.ready` event on some systems

**Example:**
```javascript
// In preferences definition:
{
  label: 'API Key',
  key: 'apiKey',
  type: 'secret',
  help: 'Your secret API key'
}

// In main process:
const encryptedKey = preferences.value('account.apiKey');
const decryptedKey = preferences.decrypt(encryptedKey);
```

---

## Layout: Side-by-Side Fields

Fields can be displayed side-by-side by setting their `style.width` property. When multiple fields fit within a row, they automatically wrap with spacing:

```javascript
fields: [
  {
    label: 'First Name',
    key: 'firstName',
    type: 'text',
    style: { width: '50%' }
  },
  {
    label: 'Last Name',
    key: 'lastName',
    type: 'text',
    style: { width: '50%' }
  }
]
```

This creates a two-column layout with both fields on the same row.
