mod commands;
mod models;
mod riot_api;
mod riot_client;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(
            tauri::generate_handler![
                commands::backend_status,
                commands::get_account,
                commands::get_match_history,
                commands::get_match,
                commands::detect_riot_status,
                commands::detect_riot_account,
            ]
        )
        .run(tauri::generate_context!())
        .expect("error while running Vexryn");
}
