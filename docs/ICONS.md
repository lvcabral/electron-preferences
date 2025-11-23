# Icons Reference

Electron Preferences comes with 65 built-in SVG icons for use in preference sections. You can also use your own custom SVG files.

## Using Icons

### Built-in Icons

Specify a built-in icon by name in your section configuration:

```javascript
{
  id: 'about',
  label: 'About',
  icon: 'single-01', // Built-in icon name
  form: { /* ... */ }
}
```

### Custom SVG Icons

Use custom SVG files by providing a file path:

```javascript
{
  id: 'editor',
  label: 'Editor',
  icon: __dirname + '/assets/custom-icon.svg', // Absolute path
  form: { /* ... */ }
}
```

The library automatically detects custom icons when the value:
- Contains `.svg` in the path
- Starts with `./` (relative path)
- Starts with `/` (absolute path)

The path should be relative to your application's build output directory.

---

## Built-in Icon Gallery

<table>
<thead>
<tr>
<th>Name</th>
<th>Icon</th>
<th>Name</th>
<th>Icon</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>app-terminal</code></td>
<td><img src="../assets/svg/app-terminal.svg" height="40" width="40" /></td>
<td><code>archive-2</code></td>
<td><img src="../assets/svg/archive-2.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>archive-paper</code></td>
<td><img src="../assets/svg/archive-paper.svg" height="40" width="40" /></td>
<td><code>award-48</code></td>
<td><img src="../assets/svg/award-48.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>badge-13</code></td>
<td><img src="../assets/svg/badge-13.svg" height="40" width="40" /></td>
<td><code>bag-09</code></td>
<td><img src="../assets/svg/bag-09.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>barcode-qr</code></td>
<td><img src="../assets/svg/barcode-qr.svg" height="40" width="40" /></td>
<td><code>bear-2</code></td>
<td><img src="../assets/svg/bear-2.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>bell-53</code></td>
<td><img src="../assets/svg/bell-53.svg" height="40" width="40" /></td>
<td><code>bookmark-2</code></td>
<td><img src="../assets/svg/bookmark-2.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>briefcase-24</code></td>
<td><img src="../assets/svg/briefcase-24.svg" height="40" width="40" /></td>
<td><code>brightness-6</code></td>
<td><img src="../assets/svg/brightness-6.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>calendar-60</code></td>
<td><img src="../assets/svg/calendar-60.svg" height="40" width="40" /></td>
<td><code>camera-20</code></td>
<td><img src="../assets/svg/camera-20.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>cart-simple</code></td>
<td><img src="../assets/svg/cart-simple.svg" height="40" width="40" /></td>
<td><code>chat-46</code></td>
<td><img src="../assets/svg/chat-46.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>check-circle-07</code></td>
<td><img src="../assets/svg/check-circle-07.svg" height="40" width="40" /></td>
<td><code>closed-caption</code></td>
<td><img src="../assets/svg/closed-caption.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>cloud-26</code></td>
<td><img src="../assets/svg/cloud-26.svg" height="40" width="40" /></td>
<td><code>compass-05</code></td>
<td><img src="../assets/svg/compass-05.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>dashboard-level</code></td>
<td><img src="../assets/svg/dashboard-level.svg" height="40" width="40" /></td>
<td><code>diamond</code></td>
<td><img src="../assets/svg/diamond.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>edit-78</code></td>
<td><img src="../assets/svg/edit-78.svg" height="40" width="40" /></td>
<td><code>email-84</code></td>
<td><img src="../assets/svg/email-84.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>eye-19</code></td>
<td><img src="../assets/svg/eye-19.svg" height="40" width="40" /></td>
<td><code>favourite-31</code></td>
<td><img src="../assets/svg/favourite-31.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>flag-points-32</code></td>
<td><img src="../assets/svg/flag-points-32.svg" height="40" width="40" /></td>
<td><code>flash-21</code></td>
<td><img src="../assets/svg/flash-21.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>folder-15</code></td>
<td><img src="../assets/svg/folder-15.svg" height="40" width="40" /></td>
<td><code>gift-2</code></td>
<td><img src="../assets/svg/gift-2.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>grid-45</code></td>
<td><img src="../assets/svg/grid-45.svg" height="40" width="40" /></td>
<td><code>handout</code></td>
<td><img src="../assets/svg/handout.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>heart-2</code></td>
<td><img src="../assets/svg/heart-2.svg" height="40" width="40" /></td>
<td><code>home-52</code></td>
<td><img src="../assets/svg/home-52.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>image</code></td>
<td><img src="../assets/svg/image.svg" height="40" width="40" /></td>
<td><code>key-25</code></td>
<td><img src="../assets/svg/key-25.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>layers-3</code></td>
<td><img src="../assets/svg/layers-3.svg" height="40" width="40" /></td>
<td><code>like-2</code></td>
<td><img src="../assets/svg/like-2.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>link-72</code></td>
<td><img src="../assets/svg/link-72.svg" height="40" width="40" /></td>
<td><code>lock</code></td>
<td><img src="../assets/svg/lock.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>lock-open</code></td>
<td><img src="../assets/svg/lock-open.svg" height="40" width="40" /></td>
<td><code>multiple-11</code></td>
<td><img src="../assets/svg/multiple-11.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>notes</code></td>
<td><img src="../assets/svg/notes.svg" height="40" width="40" /></td>
<td><code>pencil</code></td>
<td><img src="../assets/svg/pencil.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>phone-2</code></td>
<td><img src="../assets/svg/phone-2.svg" height="40" width="40" /></td>
<td><code>preferences</code></td>
<td><img src="../assets/svg/preferences.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>send-2</code></td>
<td><img src="../assets/svg/send-2.svg" height="40" width="40" /></td>
<td><code>settings-gear-63</code></td>
<td><img src="../assets/svg/settings-gear-63.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>single-01</code></td>
<td><img src="../assets/svg/single-01.svg" height="40" width="40" /></td>
<td><code>single-folded-content</code></td>
<td><img src="../assets/svg/single-folded-content.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>skull-2</code></td>
<td><img src="../assets/svg/skull-2.svg" height="40" width="40" /></td>
<td><code>spaceship</code></td>
<td><img src="../assets/svg/spaceship.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>speaker</code></td>
<td><img src="../assets/svg/speaker.svg" height="40" width="40" /></td>
<td><code>square-download</code></td>
<td><img src="../assets/svg/square-download.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>square-upload</code></td>
<td><img src="../assets/svg/square-upload.svg" height="40" width="40" /></td>
<td><code>support-16</code></td>
<td><img src="../assets/svg/support-16.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>trash-simple</code></td>
<td><img src="../assets/svg/trash-simple.svg" height="40" width="40" /></td>
<td><code>turtle</code></td>
<td><img src="../assets/svg/turtle.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>tv-screen</code></td>
<td><img src="../assets/svg/tv-screen.svg" height="40" width="40" /></td>
<td><code>vector</code></td>
<td><img src="../assets/svg/vector.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>video-66</code></td>
<td><img src="../assets/svg/video-66.svg" height="40" width="40" /></td>
<td><code>wallet-43</code></td>
<td><img src="../assets/svg/wallet-43.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>widget</code></td>
<td><img src="../assets/svg/widget.svg" height="40" width="40" /></td>
<td><code>world</code></td>
<td><img src="../assets/svg/world.svg" height="40" width="40" /></td>
</tr>
<tr>
<td><code>zoom-2</code></td>
<td><img src="../assets/svg/zoom-2.svg" height="40" width="40" /></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
