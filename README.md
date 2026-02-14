# Mystify - Spotify Clone

A web application that replicates the Spotify login page, dashboard UI, and includes basic music playback functionality.

## Features

- **Login Page**: Spotify-like authentication UI (Use credentials: `user` / `user123`).
- **Dashboard**:
  - Sidebar with navigation and playlists.
  - Main area displaying songs.
  - Fully responsive grid layout.
- **Music Player**:
  - Play, Pause, Resume functionality.
  - Song progress bar (visual only for now).
  - Displays current song metadata.
  - Auto-play next song not implemented but song selection works.
- **Backend**:
  - Node.js & Express server.
  - Serves mock song data and handles authentication.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, React Router, Axios, React Icons, CSS Modules (inline styles used for simplicity).
- **Backend**: Node.js, Express, CORS.

## Setup Instructions

### Prerequisites
- Node.js installed.

### 1. Backend Setup

Open a terminal and navigate to the `server` directory:

```bash
cd server
npm install
npm run dev
```

The server runs on `http://localhost:3001`.

### 2. Frontend Setup

Open a new terminal and navigate to the `client` directory:

```bash
cd client
npm install
npm run dev
```

The client will typically run on `http://localhost:5173`.

## Usage

1. Open the frontend URL in your browser.
2. Log in with `user` / `user123` or `admin` / `password123`.
3. Click on a song card to play music.
4. Use the player bar at the bottom to Pause/Resume.

