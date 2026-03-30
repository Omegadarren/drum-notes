# BandNotes 🎸

**V3.63** — iPad-optimised shared sheet music viewer and annotator for bands.  
Each band member opens the same app, joins a shared group, and sees the same setlists — with their own personal annotations saved per song.

---

## Table of Contents

1. [Deploy to GitHub Pages](#1-deploy-to-github-pages)
2. [Install as a Full-Screen App](#2-install-as-a-full-screen-app)
3. [Start Screen](#3-start-screen)
4. [Band Groups](#4-band-groups)
5. [Group Detail — Setlists](#5-group-detail--setlists)
6. [Song Library](#6-song-library)
7. [PDF Viewer](#7-pdf-viewer)
8. [Annotations](#8-annotations)
9. [Metronome](#9-metronome)
10. [Shared Notes](#10-shared-notes)
11. [Played Songs Tracker](#11-played-songs-tracker)
12. [Print & PDF Export](#12-print--pdf-export)
13. [Offline Support](#13-offline-support)
14. [Local Sessions](#14-local-sessions)
15. [Light / Dark Mode](#15-light--dark-mode)

---

## 1. Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `drum-notes`)
2. Push `index.html`, `cors.json`, and this `README.md` to the `main` branch
3. Go to **Settings → Pages → Source → main / (root)** → Save
4. Your app will be live at `https://<your-username>.github.io/drum-notes/`

> A Firebase project is required for band group features (Firestore + Storage). The Firebase config is embedded in `index.html`.

---

## 2. Install as a Full-Screen App

BandNotes works best as a home-screen app on an iPad or tablet.

**iOS / iPadOS:**
1. Open the app URL in Safari
2. Tap the **Share** icon → **Add to Home Screen**
3. Tap **Add** — the app will open full-screen, without browser chrome

**Android:**
1. Open in Chrome
2. Tap the three-dot menu → **Add to Home Screen**

The app will prompt you with these steps if you tap the fullscreen (⛶) button and the browser cannot go full-screen natively.

---

## 3. Start Screen

The first screen you see when opening the app.

### Profile Bar (top row)

| Element | Action |
|---------|--------|
| **Playing as [name]** | Tap to open the profile modal and set your display name. Your name is used to attribute shared annotations. Saved to `localStorage`. |
| **☀️ / ☾** | Toggle between light and dark mode |
| **↺** | Refresh the page |
| **⛶** | Enter full-screen (or show Add to Home Screen instructions) |

### Main Content

- **BandNotes** title and version badge
- **Band Groups** button — opens the Band Groups screen
- **User Manual** button — opens this README in a new tab
- **Recent sessions** list — your personal local PDF sessions (see [Local Sessions](#14-local-sessions))

---

## 4. Band Groups

A Band Group is a shared space where all band members can see the same setlists and song library.

### Joining / Creating

| Action | How |
|--------|-----|
| **Create a group** | Tap **Band Groups → ➕ Create Group**, enter a band name. You become the admin. |
| **Join a group** | Tap **Band Groups → 🔗 Join Group**, enter the invite code (e.g. `DRUMS7`), or paste it from the clipboard. |

Once you're in a group, it appears in the **Your Groups** list. Tap a group to open its detail screen.

### Admin vs Member

- The person who creates the group is the **admin**. Everyone else is a **member**.
- Admins have additional controls (marked below).

---

## 5. Group Detail — Setlists

The group detail screen lists all setlists in the group.

### Header Buttons

| Button | Who sees it | What it does |
|--------|-------------|--------------|
| **🎤 Played** | Everyone | Opens the [Played Songs](#11-played-songs-tracker) modal |
| **📁** | Everyone | Configure a default download folder for PDF exports |
| **✚ Setlist** | Admin only | Create a new setlist |
| **⚙** | Admin only | Opens the settings dropdown |

### ⚙ Settings Dropdown (Admin)

| Item | Action |
|------|--------|
| **Invite Code** | Displays the group's invite code with a **Copy** button |
| **Song Library** | Opens the [Song Library](#6-song-library) screen |
| **Rename Group** | Renames the group for all members |
| **Delete Group** | Permanently deletes the group, all setlists, all songs from Storage, and all cached data |

### ⚙ Settings Dropdown (Member)

| Item | Action |
|------|--------|
| **Song Library** | Opens the Song Library (read-only view) |
| **Leave Group** | Removes you from the group |

### Setlist Context Menu (⋯ per setlist)

Long-press or tap the **⋯** on any setlist row to see:

| Option | Description |
|--------|-------------|
| **Open** | Opens the setlist in the PDF viewer |
| **Edit** | (Admin) Add, remove, or reorder songs in the setlist |
| **Mark as Performed** | Records today's date as a performance date |
| **Archive** | Hides the setlist from the main list (can be restored) |
| **Duplicate** | Creates a copy with a new name |
| **Delete** | (Admin) Permanently removes the setlist |

---

## 6. Song Library

The Song Library is the master list of all PDF songs available to the group. Only admins can upload or delete songs; all members can view the list and see each song's setlist history.

### Uploading Songs (Admin)

1. Tap **⬆ Add Song**
2. Select one or more PDF files
3. Edit song names if needed (pre-filled from the filename)
4. Tap **Upload All →**

### Song Actions (⋯ per song)

| Option | Who | Description |
|--------|-----|-------------|
| **Rename** | Admin | Rename the song across all setlists |
| **History** | Everyone | Shows every setlist this song appears in |
| **Delete** | Admin | Removes the song from Storage and all setlists |

### Alpha Filter Bar

Tap any letter at the top of the Song Library to jump to songs starting with that letter.

---

## 7. PDF Viewer

Opening a setlist (or a local session) loads the PDF viewer.

### Navigation

| Element | Description |
|---------|-------------|
| **◀ ▶** slide buttons | Move between songs in the setlist (one song at a time) |
| **1 / 5** counter | Shows current song position in the setlist |
| **Jump to ▾** | Dropdown list of all songs — tap one to jump directly to it |
| **Scroll chip** | Shows the current interaction mode — tap to toggle between **Scroll** and **Press** |

> **Scroll mode** (default): standard swipe scrolling. Double-tap for annotations.  
> **Press mode**: every tap/hold creates an annotation immediately, useful during a performance when accidental scrolls should be avoided.

### Viewer Header (⋯ Menu)

| Item | Action |
|------|--------|
| **👥 Share notes** | Publish or import annotations shared with the group |
| **✎ Note style** | Change annotation font size and colour |
| **✏️ Edit setlist** | (Admin) Reorder songs live in the viewer |
| **🖨️ Print** | Print the current song with annotations via the browser |
| **📄 Print to PDF** | Export the annotated song as a downloadable PDF |
| **🗑 Clear all notes** | Delete every annotation on the current song |

### Fullscreen

Tap **⛶** in the viewer header to enter full-screen mode.

---

## 8. Annotations

Annotations are personal notes overlaid on the sheet music. They are stored locally per device (in `localStorage`) and are never automatically shared.

### Adding a Note

1. **Double-tap** anywhere on the page
2. A text input appears at that location
3. Type your note and tap **Done** (or the keyboard's return key)
4. A coloured dot with your text is pinned to that spot

### Editing / Deleting a Note

- **Tap any existing note** to open a popover with options: **Edit**, **Copy**, **Delete**

### Note Style

Open **⋯ → ✎ Note style** to change:

| Setting | Options |
|---------|---------|
| Font size | Tap **−** / **+** to decrease or increase (shown as pt value) |
| Note colour | Grid of colour swatches — tap to select |

Changes apply to newly created notes and to the dot indicator on existing notes.

---

## 9. Metronome

Tap the **BPM button** (e.g. `120`) in the viewer header to open the metronome popover.

| Control | Description |
|---------|-------------|
| **− / ＋** | Decrease / increase BPM by 1 |
| **BPM input** | Tap the number to type a BPM directly (20–300) |
| **▶ Start / ■ Stop** | Start or stop the metronome |
| **Off / Click / Beep / Wood** | Sound mode — Off = visual flash only; Click, Beep, Wood = audio tones |
| **♩ 1/4 / ♪ 1/8** | Subdivision — quarter note or eighth note subdivisions |

A pulsing dot on the metronome button flashes on the beat when the metronome is running.

---

## 10. Shared Notes

Shared notes let one band member publish annotations that others can import.

### Publishing

1. Open **⋯ → 👥 Share notes** in the viewer
2. Your current annotations for this song are uploaded to Firestore under the group
3. A **👥 Shared** chip appears in the viewer header when shared notes exist for this song

### Importing

1. Tap **👥 Shared** chip (or go via **⋯ → 👥 Share notes**)
2. The modal shows annotations from all group members
3. Tap **Import to my notes ↓** to merge them into your personal set

---

## 11. Played Songs Tracker

Tracks which songs have been performed, with dates. Tap **🎤 Played** in the group detail header or song library header to open the modal.

### Views

| View | Description |
|------|-------------|
| **By Setlist** (default) | Shows each setlist that has been marked as performed, with the date, and lists the songs in it |
| **By Song** | Shows each song alphabetically with every setlist/date it was performed |

Toggle between views with the **By Setlist / By Song** button in the modal header.

### Offline

Played Songs data is cached in IndexedDB. The modal works even when you have no network connection.

---

## 12. Print & PDF Export

From the viewer's **⋯** menu:

| Option | Description |
|--------|-------------|
| **🖨️ Print** | Sends the current page (with annotations rendered) to the browser's print dialog |
| **📄 Print to PDF** | Generates a PDF via jsPDF containing the sheet music with annotations burned in, and downloads it. If a default download folder has been configured (📁 button), the file is saved there automatically. |

Annotations are rendered onto the canvas before export, so they appear in the printed output.

---

## 13. Offline Support

BandNotes caches data in **IndexedDB** (`bandnotes_cache`) so the app keeps working with no internet connection.

| What is cached | Detail |
|---------------|--------|
| **PDF files** | Each song PDF is cached after first load (`pdfs` store, keyed by `groupId/songId`) |
| **Setlist metadata** | Song lists, names, and order are cached after first load (`setlists` store) |
| **Played Songs** | Performance history is cached so the 🎤 modal works offline |
| **Settings** | App settings persisted across sessions |

### Behaviour

- If the network is unavailable, cached PDFs and setlist data are used automatically
- A **Cancel** button appears on the loading overlay when fetching setlists — tap it to abort a slow or stalled load and fall back to cached data
- An offline banner appears at the top of the screen when connectivity is detected as lost

---

## 14. Local Sessions

In addition to band groups, BandNotes supports **personal local sessions** — single-PDF sessions stored entirely on your device with no cloud component.

- From the start screen, tap **Start new session…**
- Give the session a name and upload a PDF from your device
- The PDF and all annotations are stored in `localStorage`
- Useful for practising individual parts without needing a group

Old backups (sessions over 30 days old) trigger a modal asking whether to keep, snooze, or delete them.

---

## 15. Light / Dark Mode

Tap the **☀️** (light) or **☾** (dark) button in the profile bar to toggle the colour theme. The preference is saved to `localStorage` and restored on every visit.

---

## Data Storage Summary

| Data | Storage | Persists |
|------|---------|----------|
| Profile name | `localStorage` | Per device/browser |
| Theme preference | `localStorage` | Per device/browser |
| Local sessions (PDF + notes) | `localStorage` | Per device/browser |
| Personal annotations (group songs) | `localStorage` | Per device/browser |
| Note style preferences | `localStorage` | Per device/browser |
| Cached PDFs | IndexedDB | Per device/browser |
| Cached setlist metadata | IndexedDB | Per device/browser |
| Groups, setlists, song library | Firebase Firestore | Cloud — all devices |
| Song PDF files | Firebase Storage | Cloud — all devices |
| Shared annotations | Firebase Firestore | Cloud — all devices |
| Played Songs records | Firebase Firestore + IndexedDB cache | Cloud + offline cache |
