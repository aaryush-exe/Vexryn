use crate::models::{
    MatchDetails,
    MatchList,
    RiotAccount,
};

use reqwest::Client;

const AMERICAS_URL: &str = "https://americas.api.riotgames.com";
const EUROPE_URL: &str = "https://europe.api.riotgames.com";
const ASIA_URL: &str = "https://asia.api.riotgames.com";

pub struct RiotApi {
    client: Client,
    api_key: String,
}

impl RiotApi {
    pub fn new(api_key: String) -> Self {
        Self {
            client: Client::new(),
            api_key,
        }
    }

    pub async fn get_account(
        &self,
        region: &str,
    ) -> Result<RiotAccount, String> {
        let base_url = self.get_region_url(region);

        let url = format!(
            "{}/riot/account/v1/accounts/by-riot-id/",
            base_url
        );

        Err(format!(
            "Account lookup will be connected after Riot authentication. Endpoint base: {}",
            url
        ))
    }

    pub async fn get_match_list(
        &self,
        region: &str,
        puuid: &str,
    ) -> Result<MatchList, String> {
        let base_url = self.get_region_url(region);

        let url = format!(
            "{}/val/match/v1/matchlists/by-puuid/{}",
            base_url,
            puuid
        );

        let response = self
            .client
            .get(&url)
            .header("X-Riot-Token", &self.api_key)
            .send()
            .await
            .map_err(|error| {
                format!("Riot API request failed: {}", error)
            })?;

        if !response.status().is_success() {
            let status = response.status();

            let body = response
                .text()
                .await
                .unwrap_or_else(|_| String::from("Unknown error"));

            return Err(format!(
                "Riot API returned {}: {}",
                status,
                body
            ));
        }

        response
            .json::<MatchList>()
            .await
            .map_err(|error| {
                format!(
                    "Failed to parse Riot match list: {}",
                    error
                )
            })
    }

    pub async fn get_match(
        &self,
        region: &str,
        match_id: &str,
    ) -> Result<MatchDetails, String> {
        let base_url = self.get_region_url(region);

        let url = format!(
            "{}/val/match/v1/matches/{}",
            base_url,
            match_id
        );

        let response = self
            .client
            .get(&url)
            .header("X-Riot-Token", &self.api_key)
            .send()
            .await
            .map_err(|error| {
                format!("Riot API request failed: {}", error)
            })?;

        if !response.status().is_success() {
            let status = response.status();

            let body = response
                .text()
                .await
                .unwrap_or_else(|_| String::from("Unknown error"));

            return Err(format!(
                "Riot API returned {}: {}",
                status,
                body
            ));
        }

        response
            .json::<MatchDetails>()
            .await
            .map_err(|error| {
                format!(
                    "Failed to parse Riot match: {}",
                    error
                )
            })
    }

    fn get_region_url(&self, region: &str) -> &str {
        match region.to_lowercase().as_str() {
            "americas" => AMERICAS_URL,
            "europe" => EUROPE_URL,
            "asia" => ASIA_URL,
            _ => ASIA_URL,
        }
    }
}