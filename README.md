# DrumNotes 🥁

iPad-optimised sheet music annotator. Upload a PDF, double-tap anywhere to add a red note, scroll normally otherwise. All data saved locally in the browser.

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `drum-notes`)
2. Push `index.html` to the `main` branch
3. Go to **Settings → Pages → Source → main / (root)** → Save
4. Your app will be live at `https://<your-username>.github.io/drum-notes/`

## How to use

| Action | Result |
|--------|--------|
| **Start new session…** | Name the session and upload a PDF |
| **Scroll** | Swipe up/down to move through the pages |
| **Double-tap** | Opens a text input at that exact spot |
| Type your note → **Done** (or tap the keyboard's Done key) | Saves red 14pt Arial annotation |
| **Tap any red note** | Shows delete confirmation |
| **⋯ menu → Clear all notes** | Removes every note from the session |
| **‹ back arrow** | Returns to the sessions list |

Sessions (including the PDF and all notes) are stored in the browser's `localStorage`. They persist between sessions on the same device/browser.
