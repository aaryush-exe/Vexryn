# Vexryn

> A futuristic VALORANT companion desktop UI prototype built with Tauri, React, and TypeScript.

Vexryn is a desktop application prototype inspired by VALORANT companion and tracker applications.

The project started as an attempt to build a modern Windows-based companion experience with a focus on a clean HUD-style interface, player information, match data, and statistics.

> **Project Status:** Archived / Prototype  
> This repository contains the frontend and desktop application prototype. Riot Games API integration and some planned functionality are not currently implemented.

---

## ✨ Features

- 🎮 VALORANT-inspired desktop interface
- 🖥️ Windows desktop application using Tauri
- ⚡ React + TypeScript frontend
- 🎨 Futuristic dark HUD-style UI
- 📊 Dashboard layout for player and match information
- 🏆 Rank and agent visualization
- 📜 Match History interface
- 📈 Statistics interface
- ⚙️ Settings interface
- 🧩 Rust backend through Tauri
- 🔧 Modular frontend structure

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite

### Desktop

- Tauri 2
- Rust

### Package Manager

- pnpm

---

## 📁 Project Structure

```text
Vexryn/
├── src/
│   ├── assets/
│   ├── components/
│   ├── lib/
│   ├── App.tsx
│   └── ...
│
├── src-tauri/
│   ├── src/
│   ├── gen/
│   ├── Cargo.toml
│   └── tauri.conf.json
│
├── public/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md

🚀 Running Locally
Prerequisites
Make sure you have the following installed:
- Node.js
- pnpm
- Rust
- Tauri prerequisites for Windows
Clone the repository:
git clone https://github.com/aaryush-exe/Vexryn.git
cd Vexryn

Install dependencies:
pnpm install

Run the Tauri desktop application:
pnpm tauri dev

To run only the frontend development server:
pnpm dev

🎯 Project Goals
The original goal of Vexryn was to create a lightweight desktop companion for VALORANT with features such as:
- Riot Client detection
- VALORANT process detection
- Agent Select detection
- Lobby player information
- Rank information
- Match history
- Player statistics
- Party information
- A dedicated futuristic desktop interface
The project evolved primarily around the UI/UX and desktop application prototype.
⚠️ Current Limitations
Vexryn is currently a prototype and should not be considered a finished VALORANT tracker.
Some planned functionality depends on external game data and Riot Games services. Those integrations are not currently included in this repository.
The project is therefore maintained primarily as a UI/desktop application prototype and learning project.
🔒 Privacy & Security
Do not add:
- Riot API keys
- Access tokens
- .env files containing secrets
- Personal credentials
- Generated build artifacts
The repository intentionally excludes generated directories such as:
node_modules/
dist/
.vite/
src-tauri/target/

📌 Project Status
Archived Prototype
Development of the original concept has been paused due to changes around the external services and requirements involved in building a Riot/VALORANT companion application.
The repository remains available as a demonstration of the application's UI, architecture, and development process.
👨‍💻 Author
Aaryush Raj
Built as a personal project while learning desktop application development with:
- React
- TypeScript
- Tauri
- Rust
⚖️ Disclaimer
Vexryn is an independent fan-made project and is not affiliated with or endorsed by Riot Games.
VALORANT and Riot Games are trademarks of Riot Games, Inc.
This project does not distribute or modify VALORANT game files.
⭐ About
Vexryn started as an experiment in building a modern desktop companion experience for VALORANT and evolved into a UI/desktop application prototype.
The project is kept public as a record of the work and as part of the author's development portfolio.

### One small recommendation

I'd **not** put things like:

> "Fully functional VALORANT tracker"  
> "Real-time Riot API integration"  
> "Works with Riot Client"

in the README unless those things actually work in the current repository.

For a portfolio project, being transparent that it's an **archived prototype** actually makes the repo look more credible rather than trying to oversell it.
