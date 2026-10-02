use crate::models::{
    MatchDetails,
    MatchList,
    RiotAccount,
    RiotClientStatus,
    VexrynStatus,
};

use crate::riot_api::RiotApi;
use crate::riot_client;

use std::env;

#[tauri::command]
pub fn backend_status() -> VexrynStatus {
    VexrynStatus {
        connected: true,
        message: "Vexryn backend is online.".to_string(),
    }
}

#[tauri::command]
pub async fn get_match_history(
    region: String,
    puuid: String,
) -> Result<MatchList, String> {
    let api_key = env::var("VEXRYN_RIOT_API_KEY")
        .map_err(|_| {
            "VEXRYN_RIOT_API_KEY environment variable is not set."
                .to_string()
        })?;

    let api = RiotApi::new(api_key);

    api.get_match_list(
        &region,
        &puuid,
    )
    .await
}

#[tauri::command]
pub async fn get_match(
    region: String,
    match_id: String,
) -> Result<MatchDetails, String> {
    let api_key = env::var("VEXRYN_RIOT_API_KEY")
        .map_err(|_| {
            "VEXRYN_RIOT_API_KEY environment variable is not set."
                .to_string()
        })?;

    let api = RiotApi::new(api_key);

    api.get_match(
        &region,
        &match_id,
    )
    .await
}

#[tauri::command]
pub async fn get_account(
    region: String,
) -> Result<RiotAccount, String> {
    let api_key = env::var("VEXRYN_RIOT_API_KEY")
        .map_err(|_| {
            "VEXRYN_RIOT_API_KEY environment variable is not set."
                .to_string()
        })?;

    let api = RiotApi::new(api_key);

    api.get_account(&region).await
}

/// Check whether the Riot Client and VALORANT processes
/// are currently running on this machine.
#[tauri::command]
pub fn detect_riot_status() -> RiotClientStatus {
    RiotClientStatus {
        riot_client_running: riot_client::is_riot_client_running(),
        valorant_running: riot_client::is_valorant_running(),
    }
}

/// Auto-detect and connect to the Riot account by reading
/// local files written by the Riot Client. Requires
/// Riot Client or VALORANT to be running.
#[tauri::command]
pub fn detect_riot_account() -> Result<RiotAccount, String> {
    riot_client::detect_account()
}