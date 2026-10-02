use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct RiotAccount {
    pub puuid: String,
    pub game_name: String,
    pub tag_line: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct MatchList {
    pub puuid: String,
    pub history: Vec<MatchReference>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct MatchReference {
    pub match_id: String,
    pub game_start_millis: Option<i64>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct MatchDetails {
    pub match_id: String,
    pub map: String,
    pub game_mode: String,
    pub game_start_millis: Option<i64>,
    pub game_length_millis: Option<i64>,
    pub players: Vec<Player>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Player {
    pub puuid: String,
    pub game_name: Option<String>,
    pub tag_line: Option<String>,
    pub team_id: Option<String>,
    pub character_id: Option<String>,
    pub stats: Option<PlayerStats>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PlayerStats {
    pub kills: i32,
    pub deaths: i32,
    pub assists: i32,
    pub score: i32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct VexrynStatus {
    pub connected: bool,
    pub message: String,
}
#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct RiotClientStatus {
    pub riot_client_running: bool,
    pub valorant_running: bool,
}
