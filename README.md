# AI Invoice Extractor — Frontend

React TypeScript frontend for the AI Invoice Extractor pipeline.
Built with Vite, zero external UI libraries, and custom SVG icons.

---

## Project Structure

```
ai-invoice-frontend/
├── src/
│   ├── App.tsx                  Top-level controller and screen router
│   ├── api.ts                   All backend API calls in one place
│   ├── types.ts                 TypeScript interfaces matching backend schemas
│   ├── tokens.ts                Design tokens: colors, fonts
│   ├── icons.tsx                Custom hand-drawn SVG icons
│   ├── components/
│   │   ├── Nav.tsx              Sticky navigation bar
│   │   ├── ConfidenceBadge.tsx  Confidence score bar
│   │   └── StatusPill.tsx       Success / partial / failed badge
│   └── screens/
│       ├── UploadScreen.tsx     File upload with drag and drop
│       ├── ProcessingScreen.tsx Animated pipeline step tracker
│       └── ResultsScreen.tsx    Extraction results with JSON viewer
├── index.html
├── vite.config.ts               Dev proxy routes /upload, /export to :8000
├── tsconfig.json
└── .env.example
```

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

The app runs at http://localhost:3000

The Vite proxy forwards API calls to http://localhost:8000 automatically.
Make sure the backend is running before uploading real files.

### 3. Run with mock data (no backend needed)

The app ships with a mock result in App.tsx that activates automatically
when the backend API block is commented out. This lets you test the full
UI flow without starting the Python server.

---

## Connecting to the Backend

Open src/App.tsx and find the comment block labelled:

```
── Real API path ──
```

Uncomment that block and remove the mock block directly below it.
The app will then call the FastAPI backend for real extraction.

---

## Production Build

```bash
npm run build
```

The output lands in the dist/ folder and can be deployed to Vercel,
Netlify, or any static host.

Set the VITE_API_URL environment variable to your live backend URL
before building for production.

---

## Design

Color palette sourced from aykeni.com:

| Token       | Hex       | Usage                          |
|-------------|-----------|--------------------------------|
| black       | #111111   | Primary text and buttons       |
| white       | #FFFFFF   | Card backgrounds               |
| warmGray    | #F4F2EE   | Page background                |
| green       | #1DB954   | CTAs and success states        |
| cyan        | #67E8F9   | Heading highlight              |
| brown       | #5C1F00   | Totals card gradient start     |

All icons are custom inline SVG. No Heroicons, Lucide, or FontAwesome.
