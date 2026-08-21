# Itihaas — Retelling of the Lore

A static, no-build web app for discovering and listening to place-tied stories across India.
Built as a concept prototype for IIM Bangalore.

## What's here

- `index.html` — the app shell
- `css/style.css` — all styling (warm, illustrated, phone-frame presentation on desktop, full-screen on mobile)
- `js/data.js` — the 50 stories (title, location, narration text, category, and which languages have real audio)
- `js/app.js` — all app logic: discover feed, search, category filters, the detail sheet, and playback
- `audio/` — 36 real narrated recordings (mp3, converted from the original wav uploads to keep the repo light)

No build step, no dependencies, no server required. It's plain HTML/CSS/JS.

## Hosting it on GitHub Pages

1. Push this folder as the root of a repository (or into a `docs/` folder — either works).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` (or your default branch) and `/ (root)`.
4. Save. GitHub will give you a URL like `https://<username>.github.io/<repo>/` within a minute or two.

The `.nojekyll` file is included so GitHub Pages serves the files as-is, without running them through Jekyll.

## How audio and languages work

Each story in `js/data.js` has an `audio` object, e.g.:

```js
audio: { kn: "audio/begur_fort_kn.mp3", ta: "audio/begur_fort_ta.mp3", te: "audio/begur_fort_te.mp3" }
```

Only 13 of the 50 stories have real recordings right now, in Kannada, Tamil, and/or Telugu, not all
three for every story since not every recording was ready. The app is honest about this:

- Every card shows which languages it's actually recorded in (`KN` / `TA` / `TE` badges).
- If you pick a language a story hasn't been recorded in yet, the app says so explicitly
  ("Not recorded in Tamil yet") and falls back to reading the English narration aloud with the
  browser's own speech synthesis, rather than silently pretending the language exists.

### Adding more recordings

To add audio for a story:

1. Drop the file into `audio/` (mp3 keeps the repo small; wav works too, just larger).
2. Find the story's entry in `js/data.js` by its `id` (e.g. `"02-lalbagh-botanical-garden"`).
3. Add or extend its `audio` field with the new language code and file path.

Language codes used: `kn` (Kannada), `ta` (Tamil), `te` (Telugu). English has no recordings by
design — it's always the speech-synthesis fallback.

### Adding a new story entirely

Copy an existing entry in `js/data.js` and fill in `title`, `area`, `city`, `state`, `category`
(one of Historic / Religious / Institutions / Food / Business / Wildlife / Pilgrimage), `art`
(one of fort / garden / institution / temple / food / business / forest / tiger / stone — picks
the illustrated art style when there's no photo), `coords`, `who` / `how` / `fact` (the three
narration beats), `narrator`, and `photo` + `creditUrl` if you have a real, correctly licensed photo.

## What's not done yet

- 37 of 50 stories still have no real audio in any language (English TTS only).
- Only 15 of 50 have real location photography (the rest use illustrated placeholders); see the
  in-app "About" tab and prior notes for which is which.
- The Share tab is a working demo, submissions are session-only and not actually sent anywhere.

## Credits

Photography sourced from Wikimedia Commons under CC BY-SA licenses; each photo's credit link is
shown in the app's detail view. Illustrations are original SVG.
