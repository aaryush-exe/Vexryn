import { useEffect, useState } from "react";
import "./App.css";
import {
  RiotAccount,
  RiotClientStatus,
  detectRiotAccount,
  detectRiotStatus,
} from "./lib/tauri";

type Page =
  | "Dashboard"
  | "Friends"
  | "Live Match"
  | "Player Search"
  | "Match History"
  | "Settings";

type Match = {
  result: "WIN" | "LOSS";
  map: string;
  agent: string;
  score: string;
  kd: string;
  rating: string;
};

const matches: Match[] = [
  {
    result: "WIN",
    map: "Ascent",
    agent: "Jett",
    score: "13 - 8",
    kd: "21 / 14 / 5",
    rating: "1.28",
  },
  {
    result: "LOSS",
    map: "Haven",
    agent: "Omen",
    score: "10 - 13",
    kd: "16 / 18 / 7",
    rating: "0.96",
  },
  {
    result: "WIN",
    map: "Bind",
    agent: "Raze",
    score: "13 - 10",
    kd: "24 / 16 / 4",
    rating: "1.31",
  },
];

const assets = import.meta.glob("./assets*.{png,jpg,jpeg,svg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function getAsset(folder: string, name: string, fallbackNames: string[] = []) {
  const candidates = [name, ...fallbackNames];

  for (const candidate of candidates) {
    const normalized = candidate
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/-/g, "_");

    const found = Object.entries(assets).find(([path]) => {
      const cleanPath = path.toLowerCase();

      return (
        cleanPath.includes(`/assets/${folder.toLowerCase()}/`) &&
        (cleanPath.endsWith(`/${normalized}.png`) ||
          cleanPath.endsWith(`/${normalized}.svg`) ||
          cleanPath.endsWith(`/${normalized}.webp`) ||
          cleanPath.endsWith(`/${normalized}.jpg`) ||
          cleanPath.endsWith(`/${normalized}.jpeg`))
      );
    });

    if (found) return found[1];
  }

  return null;
}


async function autoDetectAccount() {
  const status = await detectRiotStatus();
  console.log(
    "Riot Client running:",
    status.riotClientRunning,
    "| VALORANT running:",
    status.valorantRunning,
  );

  if (!status.riotClientRunning && !status.valorantRunning) {
    return null;
  }

  const account = await detectRiotAccount();
  console.log("Auto-connected:", account.gameName + "#" + account.tagLine);
  return account;
}

function App() {
  const [activePage, setActivePage] = useState<Page>("Dashboard");
  const [riotAccount, setRiotAccount] = useState<RiotAccount | null>(null);
  const [riotStatus, setRiotStatus] = useState<RiotClientStatus | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    autoDetectAccount()
      .then((account) => {
        if (account) {
          setRiotAccount(account);
        }

        detectRiotStatus()
          .then(setRiotStatus)
          .catch(() => {});
      })
      .catch((error) => {
        console.log("Auto-detect skipped:", error);
        detectRiotStatus()
          .then(setRiotStatus)
          .catch(() => {});
      });
  }, []);

  
  async function handleConnect() {
    setIsDetecting(true);
    try {
      const account = await autoDetectAccount();
      if (account) {
        setRiotAccount(account);
      }
      const status = await detectRiotStatus();
      setRiotStatus(status);
    } catch (error) {
      console.error("Detection failed:", error);
    } finally {
      setIsDetecting(false);
    }
  }

  const isConnected = riotAccount !== null;

  const riotProcessRunning =
    riotStatus?.riotClientRunning || riotStatus?.valorantRunning || false;

  const valorantLogo = getAsset("branding", "valorant", ["valorant_logo"]);

  const riotLogo = getAsset("branding", "riot", [
    "riot_logo",
    "riotgames",
    "riot_games",
  ]);

  const vexrynLogo = getAsset("branding", "vexryn", ["vexryn_logo"]);

  const rankIcon = getAsset("ranks", "ascendant_2", [
    "ascendant-2",
    "ascendant2",
    "ascendant ii",
    "ascendantii",
  ]);

  const navigationItems: {
    page: Page;
    icon: string;
    label: string;
  }[] = [
    {
      page: "Dashboard",
      icon: "⌂",
      label: "Dashboard",
    },
    {
      page: "Friends",
      icon: "♧",
      label: "Friends",
    },
    {
      page: "Live Match",
      icon: "◉",
      label: "Live Match",
    },
    {
      page: "Player Search",
      icon: "⌕",
      label: "Player Search",
    },
    {
      page: "Match History",
      icon: "◷",
      label: "Match History",
    },
  ];

  return (
    <div className="app">
      <div className="ambient-grid" />
      <div className="scanline" />

      {}

      <aside className="sidebar">
        <div className="sidebar-glow" />

        {}

        <div className="brand">
          <div className="brand-mark">
            {vexrynLogo ? <img src={vexrynLogo} alt="Vexryn" /> : "V"}
          </div>

          <div className="brand-copy">
            <div className="brand-name">VEXRYN</div>

            <div className="brand-version">
              V1.0 <span>•</span> COMPANION
            </div>
          </div>
        </div>

        {}

        <div className="sidebar-section-label">NAVIGATION</div>

        {}

        <nav className="navigation">
          {navigationItems.map((item) => (
            <button
              key={item.page}
              className={`nav-item ${activePage === item.page ? "active" : ""}`}
              onClick={() => setActivePage(item.page)}
            >
              <span className="nav-icon">{item.icon}</span>

              <span className="nav-text">{item.label}</span>

              {activePage === item.page && <span className="nav-indicator" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        {}

        <div className="sidebar-status">
          <div className="sidebar-status-top">
            <span className="status-pulse" />
            SYSTEM ONLINE
          </div>

          <div className="sidebar-status-line">
            VEXRYN CORE <span>01.0.0</span>
          </div>
        </div>

        {}

        <div className="sidebar-section-label bottom-label">SYSTEM</div>

        <button
          className={`nav-item settings-button ${
            activePage === "Settings" ? "active" : ""
          }`}
          onClick={() => setActivePage("Settings")}
        >
          <span className="nav-icon">⚙</span>

          <span className="nav-text">Settings</span>

          {activePage === "Settings" && <span className="nav-indicator" />}
        </button>

        {}

        <div className="sidebar-brands">
          {valorantLogo && <img src={valorantLogo} alt="VALORANT" />}

          {riotLogo && <img src={riotLogo} alt="Riot Games" />}
        </div>
      </aside>

      {}

      <main className="main-content">
        {}

        <header className="topbar">
          <div>
            <div className="page-label">{activePage.toUpperCase()}</div>

            <h1>
              {activePage === "Dashboard" ? "Welcome to Vexryn" : activePage}
            </h1>
          </div>

          <div className="topbar-right">
            <div className="build-status">BUILD 01</div>

            <div
              className={`connection-status ${isConnected ? "connected" : ""}`}
            >
              <span className={`status-dot ${isConnected ? "online" : ""}`} />

              {isConnected
                ? riotAccount!.gameName + "#" + riotAccount!.tagLine
                : riotProcessRunning
                  ? "RIOT DETECTED"
                  : "RIOT NOT CONNECTED"}
            </div>
          </div>
        </header>

        {}

        {activePage === "Dashboard" && (
          <>
            {}

            <section className="hero">
              <div className="hero-grid" />

              <div className="hero-corner corner-tl" />
              <div className="hero-corner corner-tr" />
              <div className="hero-corner corner-bl" />
              <div className="hero-corner corner-br" />

              <div className="hero-content">
                <div className="eyebrow">
                  <span className="eyebrow-line" />
                  VALORANT COMPANION
                </div>

                <h2>
                  Your matches.
                  <br />
                  <span>Under control.</span>
                </h2>

                <p>
                  Track your VALORANT performance, match history, rank, agents,
                  and statistics through a clean, focused experience built for
                  competitive players.
                </p>

                {isConnected ? (
                  <div className="connect-button connected-state">
                    <span className="connect-plus">✓</span>

                    {"Connected as " +
                      riotAccount!.gameName +
                      "#" +
                      riotAccount!.tagLine}
                  </div>
                ) : (
                  <button
                    className="connect-button"
                    onClick={handleConnect}
                    disabled={isDetecting}
                  >
                    <span className="connect-plus">+</span>

                    {isDetecting
                      ? "Detecting Riot Client..."
                      : "Connect Riot Account"}

                    <span className="button-arrow">→</span>
                  </button>
                )}
              </div>

              {}

              <div className="hero-visual">
                <div className="visual-label visual-label-top">VEXRYN CORE</div>

                <div className="visual-line line-one" />
                <div className="visual-line line-two" />

                <div className="hero-orb">
                  <div className="orb-ring ring-one" />
                  <div className="orb-ring ring-two" />
                  <div className="orb-ring ring-three" />

                  <div className="orb-cross horizontal" />
                  <div className="orb-cross vertical" />

                  <div className="orb-core">
                    {vexrynLogo ? <img src={vexrynLogo} alt="Vexryn" /> : "V"}
                  </div>
                </div>

                <div className="visual-data data-one">
                  <span>01</span>
                  PLAYER
                </div>

                <div className="visual-data data-two">
                  <span>∞</span>
                  TRACK
                </div>

                <div className="visual-label visual-label-bottom">
                  SYSTEM READY
                </div>
              </div>
            </section>

            {}

            <section
              className={"account-banner" + (isConnected ? " connected" : "")}
            >
              <div className="account-icon">
                {isConnected ? <span>✓</span> : <span>?</span>}
              </div>

              <div className="account-info">
                <div className="card-label">RIOT ACCOUNT</div>

                {isConnected ? (
                  <>
                    <h3>
                      {riotAccount!.gameName + "#" + riotAccount!.tagLine}
                    </h3>
                    <p>Account auto-detected from Riot Client local files.</p>
                  </>
                ) : (
                  <>
                    <h3>No account connected</h3>
                    <p>
                      Connect your Riot account to unlock personalized data.
                    </p>
                  </>
                )}
              </div>

              <div
                className={"account-state" + (isConnected ? " connected" : "")}
              >
                <span />

                {isConnected
                  ? "CONNECTED"
                  : riotProcessRunning
                    ? "RIOT DETECTED"
                    : "NOT CONNECTED"}
              </div>
            </section>

            {}

            <section className="section-heading">
              <div>
                <div className="card-label">PERFORMANCE</div>

                <h2>Your performance</h2>
              </div>

              <span className="mock-label">
                {isConnected ? "LIVE DATA" : "PREVIEW DATA"}
              </span>
            </section>

            {}

            <section className="stats-grid">
              {}

              <div className="info-card rank-card">
                <div className="card-top">
                  <span className="card-label">CURRENT RANK</span>

                  <span className="card-index">01</span>
                </div>

                <div className="rank-content">
                  <div className="rank-image-wrap">
                    {rankIcon ? (
                      <img src={rankIcon} alt="Ascendant II" />
                    ) : (
                      <div className="asset-placeholder">A2</div>
                    )}
                  </div>

                  <div className="rank-details">
                    <strong>ASCENDANT II</strong>

                    <div className="rr-row">
                      <span>72 RR</span>

                      <span>+18</span>
                    </div>

                    <div className="rr-bar">
                      <div
                        style={{
                          width: "72%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {}

              <div className="info-card">
                <div className="card-top">
                  <span className="card-label">WIN RATE</span>

                  <span className="metric-symbol">%</span>
                </div>

                <strong className="large-number">
                  54.2<span>%</span>
                </strong>

                <div className="metric-bottom">
                  <span className="trend-positive">↗ 4.8%</span>

                  <small>Recent matches</small>
                </div>
              </div>

              {}

              <div className="info-card">
                <div className="card-top">
                  <span className="card-label">K / D</span>

                  <span className="metric-symbol">◈</span>
                </div>

                <strong className="large-number">1.18</strong>

                <div className="metric-bottom">
                  <span className="trend-positive">+0.12</span>

                  <small>Last 20 matches</small>
                </div>
              </div>
            </section>

            {}

            <section className="section-heading matches-heading">
              <div>
                <div className="card-label">MATCHES</div>

                <h2>Recent matches</h2>
              </div>

              <button
                className="text-button"
                onClick={() => setActivePage("Match History")}
              >
                VIEW ALL
                <span>→</span>
              </button>
            </section>

            {}

            <div className="matches-card">
              <div className="matches-header">
                <span>RESULT</span>

                <span>MATCH</span>

                <span>SCORE</span>

                <span>K / D / A</span>

                <span>RATING</span>
              </div>

              {matches.map((match, index) => {
                const mapIcon = getAsset("maps", match.map.toLowerCase(), [
                  match.map.toLowerCase() + "_map",
                  match.map.toLowerCase() + "_icon",
                ]);

                const agentIcon = getAsset(
                  "agents",
                  match.agent.toLowerCase(),
                  [
                    match.agent.toLowerCase() + "_icon",
                    match.agent.toLowerCase() + "_portrait",
                  ],
                );

                return (
                  <div className="match-row" key={match.map + "-" + index}>
                    {}

                    <div
                      className={
                        "match-result " +
                        (match.result === "WIN" ? "win" : "loss")
                      }
                    >
                      <span className="result-icon">
                        {match.result === "WIN" ? "✓" : "×"}
                      </span>

                      {match.result}
                    </div>

                    {}

                    <div className="match-identity">
                      <div className="map-icon">
                        {mapIcon ? (
                          <img src={mapIcon} alt={match.map} />
                        ) : (
                          <span>◈</span>
                        )}
                      </div>

                      <div className="match-map">
                        <strong>{match.map}</strong>

                        <span>Competitive</span>
                      </div>

                      <div className="agent-icon">
                        {agentIcon ? (
                          <img src={agentIcon} alt={match.agent} />
                        ) : (
                          <span>◇</span>
                        )}
                      </div>

                      <span className="agent-name">{match.agent}</span>
                    </div>

                    {}

                    <div className="match-score">{match.score}</div>

                    {}

                    <div className="match-kd">
                      <strong>{match.kd}</strong>

                      <span>K / D / A</span>
                    </div>

                    {}

                    <div className="match-rating">
                      <strong>{match.rating}</strong>

                      <span>Rating</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {}

            <div className="dashboard-footer">
              <span>VEXRYN</span>

              <span>
                {isConnected
                  ? "AUTO-DETECTED ACCOUNT"
                  : "PREVIEW BUILD · DATA IS MOCKED"}
              </span>
            </div>
          </>
        )}

        {}

        {activePage === "Friends" && (
          <section className="page-placeholder">
            <div className="placeholder-decoration">
              <div />
              <div />
              <div />
            </div>

            <div className="placeholder-icon">♧</div>

            <div className="eyebrow">FRIENDS</div>

            <h2>Your friends will appear here.</h2>

            <p>
              Track your friends, see who's online, check their current rank,
              and quickly join their VALORANT sessions.
            </p>
          </section>
        )}

        {}

        {activePage === "Live Match" && (
          <section className="page-placeholder">
            <div className="placeholder-decoration">
              <div />
              <div />
              <div />
            </div>

            <div className="placeholder-icon">◉</div>

            <div className="eyebrow">LIVE MATCH</div>

            <h2>Live match tracking.</h2>

            <p>
              Real-time match information, scoreboard data, round history,
              economy, performance, and combat statistics will appear here.
            </p>
          </section>
        )}

        {}

        {activePage === "Player Search" && (
          <section className="page-placeholder">
            <div className="placeholder-decoration">
              <div />
              <div />
              <div />
            </div>

            <div className="placeholder-icon">⌕</div>

            <div className="eyebrow">PLAYER SEARCH</div>

            <h2>Find any VALORANT player.</h2>

            <p>
              Search players by Riot ID and explore their rank, match history,
              agents, performance, and competitive statistics.
            </p>

            <div className="search-preview">
              <span>RIOT ID</span>

              <div className="search-preview-input">
                Search player...
                <strong>→</strong>
              </div>
            </div>
          </section>
        )}

        {}

        {activePage === "Match History" && (
          <section className="page-placeholder">
            <div className="placeholder-decoration">
              <div />
              <div />
              <div />
            </div>

            <div className="placeholder-icon">◷</div>

            <div className="eyebrow">MATCH HISTORY</div>

            <h2>Your matches will appear here.</h2>

            <p>
              Once Vexryn is connected to your Riot account, your recent
              VALORANT matches will be displayed here.
            </p>
          </section>
        )}

        {}

        {activePage === "Settings" && (
          <section className="page-placeholder">
            <div className="placeholder-decoration">
              <div />
              <div />
              <div />
            </div>

            <div className="placeholder-icon">⚙</div>

            <div className="eyebrow">SETTINGS</div>

            <h2>Configure your Vexryn experience.</h2>

            <p>
              Application preferences, Riot account connection, appearance,
              notifications, privacy, and other system settings will be
              available here.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
