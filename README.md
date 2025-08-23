# Vault Coin Site

A simple, fast React landing page for $VAULT built with Vite.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Configure

- In `src/App.jsx`, replace `CONTRACT_ADDRESS` with your real Solana token address.
- Update links for your DEX once live.

## Build

```bash
npm run build
```

## Deploy

### Netlify (recommended)
1. Push this folder to a GitHub repo.
2. On Netlify: **New site from Git** → pick the repo.
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel
1. Import the repo.
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
