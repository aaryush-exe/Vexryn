# Vexryn

> A futuristic VALORANT companion desktop UI prototype built with Tauri, React, and TypeScript.

Vexryn is a desktop application prototype inspired by VALORANT companion and tracker applications.

The project started as an attempt to build a modern Windows-based companion experience with a focus on a clean HUD-style interface, player information, match data, and statistics.

> **Project Status:** Archived / Prototype  
> This repository contains the frontend and desktop application prototype. Riot Games API integration and some planned functionality are not currently implemented.

---

## ✨ Features

- 🎮 VALORANT-userfriendly desktop interface
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
