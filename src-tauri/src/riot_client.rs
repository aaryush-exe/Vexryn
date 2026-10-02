use crate::models::RiotAccount;
use std::fs;
use std::path::PathBuf;

/// Process names to look for when checking if Riot Client or VALORANT are running.
const RIOT_CLIENT_PROCESS: &str = "RiotClientServices.exe";
const VALORANT_PROCESS: &str = "VALORANT.exe";

/// Well-known Riot install directories on Windows.
fn riot_install_dirs() -> Vec<PathBuf> {
    let mut dirs = Vec::new();

    // %LOCALAPPDATA%\Riot Games
    if let Ok(local_app) = std::env::var("LOCALAPPDATA") {
        dirs.push(PathBuf::from(local_app).join("Riot Games"));
    }

    // %PROGRAMFILES%\Riot Games
    if let Ok(program_files) = std::env::var("PROGRAMFILES") {
        dirs.push(PathBuf::from(program_files).join("Riot Games"));
    }

    // %PROGRAMFILES(X86)%\Riot Games
    if let Ok(program_files_x86) = std::env::var("PROGRAMFILES(X86)") {
        dirs.push(PathBuf::from(program_files_x86).join("Riot Games"));
    }

    // Common custom install locations
    for drive in &["C:", "D:", "E:", "F:"] {
        dirs.push(PathBuf::from(format!("{}\\Riot Games", drive)));
    }

    dirs
}

/// Check if the Riot Client process is currently running.
pub fn is_riot_client_running() -> bool {
    is_process_running(RIOT_CLIENT_PROCESS)
}

/// Check if VALORANT is currently running.
pub fn is_valorant_running() -> bool {
    is_process_running(VALORANT_PROCESS)
}

/// Check if any Riot-related process is running.
pub fn is_any_riot_process_running() -> bool {
    is_riot_client_running() || is_valorant_running()
}

fn is_process_running(process_name: &str) -> bool {
    use std::process::Command;

    // Use PowerShell's Get-Process for reliable detection
    let result = Command::new("powershell.exe")
        .args([
            "-NoProfile",
            "-NonInteractive",
            "-Command",
            &format!(
                "Get-Process -Name '{}' -ErrorAction SilentlyContinue | Select-Object -First 1 | ForEach-Object {{ $_.Id }}",
                process_name.trim_end_matches(".exe")
            ),
        ])
        .output();

    match result {
        Ok(output) => {
            let stdout = String::from_utf8_lossy(&output.stdout);
            !stdout.trim().is_empty()
        }
        Err(_) => false,
    }
}

/// Read the Riot Client lockfile if it exists.
///
/// Lockfile format: `<PID>:<Port>:<Password>:<Protocol>:<Path>\RiotClientServices.exe`
fn read_lockfile() -> Option<RiotLockfile> {
    for dir in riot_install_dirs() {
        let riot_client_dir = dir.join("Riot Client");
        let lockfile_path = riot_client_dir.join("lockfile");

        if lockfile_path.exists() {
            if let Ok(content) = fs::read_to_string(&lockfile_path) {
                let parts: Vec<&str> = content.split(':').collect();
                if parts.len() >= 5 {
                    return Some(RiotLockfile {
                        pid: parts[0].parse::<u32>().ok(),
                        port: parts[1].parse::<u16>().ok(),
                        password: parts[2].to_string(),
                        protocol: parts[3].to_string(),
                    });
                }
            }
        }
    }
    None
}

/// Attempt to read the account from Riot's local settings file.
///
/// The settings file is typically located at:
/// `<RiotInstall>\Riot Client\Data\RiotGamesPrivateSettings.yaml`
pub fn detect_account() -> Result<RiotAccount, String> {
    // First check: is the Riot Client even running?
    if !is_any_riot_process_running() {
        return Err(
            "No Riot Client or VALORANT process detected. \
             Please start VALORANT first."
                .to_string(),
        );
    }

    // Check the lockfile exists
    let lockfile = read_lockfile().ok_or_else(|| {
        "Riot Client lockfile not found. \
         Is the Riot Client fully started?"
            .to_string()
    })?;

    if lockfile.port.is_none() {
        return Err(
            "Riot Client lockfile is malformed or empty."
                .to_string(),
        );
    }

    // Read the private settings YAML
    for dir in riot_install_dirs() {
        let riot_client_dir = dir.join("Riot Client");
        let settings_path = riot_client_dir
            .join("Data")
            .join("RiotGamesPrivateSettings.yaml");

        if settings_path.exists() {
            if let Ok(content) =
                fs::read_to_string(&settings_path)
            {
                if let Some(account) =
                    parse_account_from_yaml(&content)
                {
                    return Ok(account);
                }
            }
        }
    }

    Err(
        "Could not find Riot account credentials in local \
         files. Is your account logged in?"
            .to_string(),
    )
}

/// Parse account info from the RiotGamesPrivateSettings.yaml content.
///
/// We avoid adding a YAML dependency and instead extract the
/// specific fields we need using simple string parsing. The file
/// structure is stable across Riot Client versions.
fn parse_account_from_yaml(content: &str) -> Option<RiotAccount> {
    // Look for the 'account' section and extract fields.
    // Typical structure:
    //   account:
    //     puuid: "..."
    //     gameName: "..."
    //     tagLine: "..."

    let puuid = extract_yaml_value(content, "puuid")?;
    let game_name = extract_yaml_value(content, "gameName")?;
    let tag_line = extract_yaml_value(content, "tagLine")?;

    if puuid.is_empty() || game_name.is_empty() {
        return None;
    }

    Some(RiotAccount {
        puuid,
        game_name,
        tag_line,
    })
}

/// Extract a string value from a simple YAML structure.
/// Looks for lines like `  key: "value"` or `  key: value`.
fn extract_yaml_value(
    content: &str,
    key: &str,
) -> Option<String> {
    for line in content.lines() {
        let trimmed = line.trim();
        if trimmed.starts_with(&format!("{}:", key)) {
            let value_part =
                trimmed[key.len() + 1..].trim();
            // Strip surrounding quotes
            let value = value_part
                .trim_matches('"')
                .trim_matches('\'');
            if !value.is_empty() {
                return Some(value.to_string());
            }
        }
    }
    None
}

/// Information parsed from the Riot Client lockfile.
#[derive(Debug)]
#[allow(dead_code)]
struct RiotLockfile {
    pid: Option<u32>,
    port: Option<u16>,
    password: String,
    protocol: String,
}
