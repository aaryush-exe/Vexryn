import { invoke } from "@tauri-apps/api/core";

export type VexrynStatus = {
  connected: boolean;
  message: string;
};

export type MatchReference = {
  matchId: string;
  gameStartMillis?: number;
};

export type MatchList = {
  puuid: string;
  history: MatchReference[];
};

export type MatchDetails = {
  matchId: string;
  map: string;
  gameMode: string;
  gameStartMillis?: number;
  gameLengthMillis?: number;
  players: Player[];
};

export type Player = {
  puuid: string;
  gameName?: string;
  tagLine?: string;
  teamId?: string;
  characterId?: string;
  stats?: PlayerStats;
};

export type PlayerStats = {
  kills: number;
  deaths: number;
  assists: number;
  score: number;
};

export type RiotAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export type RiotClientStatus = {
  riotClientRunning: boolean;
  valorantRunning: boolean;
};

export async function getBackendStatus() {
  return await invoke<VexrynStatus>("backend_status");
}

export async function getMatchHistory(region: string, puuid: string) {
  return await invoke<MatchList>("get_match_history", {
    region,
    puuid,
  });
}

export async function getMatch(region: string, matchId: string) {
  return await invoke<MatchDetails>("get_match", {
    region,
    matchId,
  });
}

export async function detectRiotStatus() {
  return await invoke<RiotClientStatus>("detect_riot_status");
}

export async function detectRiotAccount() {
  return await invoke<RiotAccount>("detect_riot_account");
}
