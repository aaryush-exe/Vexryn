# Vexryn

> A futuristic VALORANT companion desktop UI prototype built with Tauri, React, and TypeScript.

Vexryn is a Windows desktop application prototype inspired by VALORANT companion and tracker applications.

The project was created with the idea of building a modern desktop companion experience focused on player information, match data, statistics, and a clean futuristic HUD-style interface.

> **Project Status:** Archived / Prototype  
> Vexryn is currently a UI and desktop application prototype. Some planned functionality and external service integrations are not implemented.

---

## ✨ Features

- 🎮 VALORANT-inspired desktop interface
- 🖥️ Windows desktop application
- ⚡ React + TypeScript frontend
- 🦀 Tauri + Rust backend
- 🎨 Futuristic dark HUD-style UI
- 📊 Dashboard interface
- 🏆 Rank visualization
- 🎭 Agent visualization
- 📜 Match History interface
- 📈 Statistics interface
- ⚙️ Settings interface
- 🧩 Modular application structure

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
```
🚀 Getting Started

Prerequisites

Make sure you have the following installed:
- Node.js
- pnpm
- Rust
- Tauri prerequisites for Windows
Clone the repository
```bash
git clone https://github.com/aaryush-exe/Vexryn.git
cd Vexryn
```

Install dependencies
```bash
pnpm install
```

Run the desktop application
```bash
pnpm tauri dev
```

Run the frontend only
```bash
pnpm dev
```

🎯 Project Goals

The original goal of Vexryn was to experiment with building a lightweight desktop companion for VALORANT.
Planned functionality included:
- Riot Client detection
- VALORANT process detection
- Agent Select detection
- Lobby player information
- Rank information
- Match history
- Player statistics
- Party information
- A dedicated futuristic desktop interface
The project primarily evolved around the UI/UX and desktop application prototype.

⚠️ Current Status

Vexryn is currently an archived prototype rather than a finished VALORANT tracker.
Some planned functionality depends on external game data and Riot Games services. Those integrations are not currently included as a complete production-ready system.
The repository is kept public as a demonstration of the UI, architecture, and development work behind the project.

🔒 Security

Do not commit:
- Riot API keys
- Access tokens
- .env files containing secrets
- Personal credentials
- Generated build artifacts
The repository excludes generated directories such as:
- node_modules/
- dist/
- .vite/
- src-tauri/target/

📌 Why Vexryn?

Vexryn was created as an experiment in building a modern Windows desktop companion experience for VALORANT.
The project provided hands-on experience with:
- React application development
- TypeScript
- Tauri
- Rust
- Desktop application architecture
- UI/UX design
- Git and GitHub
- Windows development

👨‍💻 Author
Aaryush Raj - B. Tech CSE (2ⁿᵈ Year)

Built as a personal project while exploring desktop application development with React, TypeScript, Tauri, and Rust.

⚖️ Disclaimer

Vexryn is an independent fan-made project and is not affiliated with, endorsed by, or sponsored by Riot Games.
VALORANT and Riot Games are trademarks of Riot Games, Inc.
This project does not distribute or modify VALORANT game files.
⭐ About
Vexryn started as an experiment in building a modern desktop companion experience for VALORANT and evolved into a UI/desktop application prototype.
The project is kept public as a record of the development process and as part of the author's portfolio.
