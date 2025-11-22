# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.9.4] - 2024-11-22

### Added

- Added new `map` field type for managing key-value string pairs
  - Inline delete buttons that appear on hover for each entry
  - Support for custom labels via `keyLabel`, `valueLabel`, and `addButtonLabel` properties
  - Empty state message when no entries exist
  - Full dark mode support with smooth transitions

### Fixed

- Fixed index-dependent group IDs that would change when sections were reordered
  - Group IDs now use stable identifiers based on section ID: `group-{sectionId}-{groupIdx}`
  - Sections can now be safely inserted anywhere in the array without affecting existing group IDs
  - Maintains backward compatibility with CSS class names

## [2.9.3] - 2024-11-22

### Fixed

- Fixed theme change not updating the preference window

## [2.9.2] - 2024-11-21

### Added

- Added support for custom SVG icons via file path

### Changed

- Updated README with complete list of builtin icons
- Improved custom SVG icon example in README

### Removed

- Removed 3 Roku specific SVG icons: `roku-box`, `roku-logo`, `roku-remote`

## [2.9.0] - 2025-11-15

### Added

- Added support for dynamically change the content of a preference window.

## [2.8.70] - 2025-07-08

### Added

- Added support for themes
- Added 7 new builtin icons: `app-terminal`, `closed-caption`, `speaker`, `tv-screen`, `roku-box`, `roku-logo`, `roku-remote`

## [2.6.0] - 2022-03-29

### Fixed

- Reset scroll when switching between tabs (#158)
- Set defaults for new preferences added in a group after app has started (#141)
- Include files to be exposed in npm build (#119)
- Correct `menuBar` option in README (#130)
- Updated dependencies
- Improve README.md

### Added

- Button component. Will trigger an event on the `preferences.click` when clicked. (#99)
- Expose `close` function on preference object to close the preference window if opened (#130)
- Expose `closePreferences` function on the ipcRenderer to close the preference window if opened (#130)

## [2.5.0] - 2021-09-18

### Fixed

- Accessibility issues: contrast, navigation with keyboard, labels (#76)
- Always enable electron contextIsolation (#122)

### Added

- Preferences option `debug: true` which opens the devTools by default (#124)
- Expose `browserWindowOverrides` on the preference object (#112)

### Changed

- Checkbox type supports a single boolean value

## [2.4.1] - 2021-07-13

### Fixed

- Focus the preference window when triggering .show() when window was already created
- Allow the Accelerator value to be cleared via a single backspace or delete keydown
- Checkbox crashing on invalid values
- First click on a checkbox is ignored

## [2.4.0] - 2021-07-10

### Added

- File select component
- Support multiple selection of files and folders via the 'multiSelections' option

### Changed

- Read/write settings file atomically
- Debounced saving settings file to 200ms (prevent overwriting disk)
- Add custom css stylesheet using the `css` options

## [2.3.2] - 2021-05-25

### Fixed

- Unable to pass complex objects (e.g. another BrowserWindow) to the preference options because of IPC serialization

## [2.3.1] - 2021-05-04

### Fixed

- Accidentally overwriting webpreferences

## [2.3.0] - 2021-04-30

### Added

- Orderable List component
- 'step' property to slider input
- hover state to sidebar items

### Changed

- Update to electron v12
- Enable context isolation
- Disable remote module
- Build with webpack

### Removed

- Grunt dependency for building

## [2.2.0] - 2021-03-14

### Added

- Dark theme! 🌗
- Help information for the color component
- Brightness icon

### Changed

- UI of the settings menu
- New icons
- Clicking on the path of a directory will also open the select folder dialog

## [2.1.1] - 2021-03-11

### Fixed

- Fix issue with different radio groups/checkboxes interfering with each other

## [2.1.0] - 2021-02-04

### Added

- Adding a new preference will set a default value
- Ability to override the preferences window's title

### Changed

- enableRemoteModule set to true

### Removed

- remove functions from the preference options object

## [2.0.0] - 2020-09-21

### Added

- Start of the changelog
- ...
