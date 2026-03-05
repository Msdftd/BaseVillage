import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { BUILDINGS, GRID_SIZE, RARITY_COLORS } from "../lib/buildings";

// ══════════════════════════════════════════════════
// BaseVillage — Farcaster Mini App Version
// ══════════════════════════════════════════════════
// This page loads inside Farcaster/Warpcast client.
// Uses Farcaster Mini App SDK for wallet + context.
// ══════════════════════════════════════════════════

export default function FarcasterApp() {
  const [sdk, setSdk] = useState(null);
  const [context, setContext] = useState(null);
  const [address, setAddress] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [grid, setGrid] = useState(() => Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null)));
  const [sel, setSel] = useState(null);
  const [points, setPoints] = useState(0);
  const [txLog, setTxLog] = useState([]);
  const [hover, setHover] = useState(null);
  const [txModal, setTxModal] = useState(null);
  const [tab, setTab] = useState("build");
  const [notif, setNotif] = useState(null);

  const bCount = grid.flat().filter(Boolean).length;

  // Initialize Farcaster SDK
  useEffect(() => {
    async function init() {
      try {
        const mod = await import("@farcaster/miniapp-sdk");
        const farcasterSdk = mod.sdk;
        setSdk(farcasterSdk);

        // Get user context
        const ctx = await farcasterSdk.context;
        setContext(ctx);

        // Get wallet address
        if (ctx?.user?.verifiedAddresses?.ethAddresses?.[0]) {
          setAddress(ctx.user.verifiedAddresses.ethAddresses[0]);
        } else if (ctx?.user?.custodyAddress) {
          setAddress(ctx.user.custodyAddress);
        }

        // Signal that app is ready (hides splash screen)
        await farcasterSdk.actions.ready();
        setIsReady(true);
      } catch (err) {
        console.log("Not in Farcaster client, running standalone");
        setIsReady(true);
      }
    }
    init();
  }, []);

  const showNotif = (msg, type = "success") => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 3000);
  };

  // Build using Farcaster wallet
  const handleBuild = useCallback(async (r, c) => {
    if (!sel || grid[r][c] || txModal) return;
    const building = BUILDINGS[sel];
    setTxModal({ type: sel, r, c });

    try {
      let hash = null;

      // Try Farcaster wallet transaction
      if (sdk && address) {
        try {
          const ethProvider = sdk.wallet.ethProvider;
          if (ethProvider) {
            // Send transaction via Farcaster wallet
            const txHash = await ethProvider.request({
              method: "eth_sendTransaction",
              params: [{
                from: address,
                to: "0x989350C2933d0c5C287A1A3B2795E6146Fcb0F27",
                value: "0x" + Math.floor(parseFloat(building.cost) * 1e18).toString(16),
                data: "0x",
                chainId: "0x2105",
              }],
            });
            hash = txHash;
          }
        } catch (walletErr) {
          console.log("Wallet tx failed, using demo mode:", walletErr);
        }
      }

      // Fallback: demo mode
      if (!hash) {
        await new Promise(res => setTimeout(res, 1500));
        hash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      }

      // Update grid
      const g = grid.map(row => [...row]);
      g[r][c] = sel;
      setGrid(g);
      setPoints(p => p + building.points);

      const shortHash = hash.slice(0, 10) + "..." + hash.slice(-6);
      setTxLog(prev => [{
        type: sel, time: new Date().toLocaleTimeString(),
        hash: shortHash, fullHash: hash, r, c, points: building.points
      }, ...prev.slice(0, 49)]);

      setTxModal(null);
      showNotif(`${building.emoji} ${building.name} built! +${building.points} pts`);
    } catch (err) {
      setTxModal(null);
      showNotif(err.message || "Transaction failed", "error");
    }
  }, [sel, grid, txModal, sdk, address]);

  const short = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect";
  const username = context?.user?.displayName || context?.user?.username || short;

  const leaderboard = [
    { name: "village.eth", score: 14200, builds: 48 },
    { name: "builder.base", score: 11800, builds: 38 },
    { name: "onchain.dev", score: 9400, builds: 31 },
    { name: username, score: points, builds: bCount, isYou: true },
  ].sort((a, b) => b.score - a.score);

  if (!isReady) {
    return (
      <div style={{ minHeight: "100vh", background: "#060B18", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "#E2E8F0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏘️</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Loading BaseVillage...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>BaseVillage</title>
        <meta name="fc:frame" content={JSON.stringify({
          version: "1",
          imageUrl: "https://base-village.vercel.app/og-image.png",
          button: {
            title: "🏘️ Build Village",
            action: {
              type: "launch_frame",
              name: "BaseVillage",
              url: "https://base-village.vercel.app/app",
              splashImageUrl: "https://base-village.vercel.app/splash.png",
              splashBackgroundColor: "#060B18"
            }
          }
        })} />
      </Head>

      <div style={{ minHeight: "100vh", background: "#060B18", color: "#E2E8F0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          * { margin:0; padding:0; box-sizing:border-box; }
          ::-webkit-scrollbar { width:4px; }
          ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }
          @keyframes plop { 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
          @keyframes spin { to{transform:rotate(360deg)} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          .anim-plop { animation:plop .4s cubic-bezier(.34,1.56,.64,1) both; }
          .anim-up { animation:fadeUp .5s ease both; }
        `}</style>

        {/* Top Bar */}
        <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(6,11,24,0.9)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#0052FF,#22C55E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🏘️</div>
            <span style={{ fontWeight: 800, fontSize: 15 }}>BaseVillage</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12 }}>
            <span>🏗️ <b>{bCount}</b></span>
            <span>⭐ <b>{points}</b></span>
            <span>🎨 <b>{txLog.length}</b></span>
            <div style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", fontSize: 10, fontFamily: "'JetBrains Mono'", color: "#22C55E" }}>
              {short}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, padding: "10px 14px" }}>
          {[{ id: "build", l: "Build" }, { id: "village", l: "Village" }, { id: "nfts", l: "NFTs" }, { id: "rank", l: "Rank" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", background: tab === t.id ? "rgba(0,82,255,0.15)" : "transparent", color: tab === t.id ? "#60A5FA" : "#64748B" }}>
              {t.l}
            </button>
          ))}
        </div>

        {/* BUILD TAB */}
        {tab === "build" && (
          <div style={{ padding: "0 14px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: 2, fontFamily: "'JetBrains Mono'", marginBottom: 8 }}>Select Structure</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {Object.entries(BUILDINGS).map(([key, b]) => {
                const isSel = sel === key;
                return (
                  <button key={key} onClick={() => setSel(key)}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px", borderRadius: 10, border: isSel ? `1px solid ${b.color}50` : "1px solid rgba(255,255,255,0.05)", background: isSel ? `${b.color}12` : "rgba(255,255,255,0.02)", cursor: "pointer", textAlign: "left" }}>
                    <div style={{ fontSize: 22 }}>{b.emoji}</div>
                    <div>
                      <div style={{ color: "#E2E8F0", fontSize: 12, fontWeight: 600 }}>{b.name}</div>
                      <div style={{ color: "#64748B", fontSize: 9, fontFamily: "'JetBrains Mono'" }}>{b.cost} ETH · +{b.points}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            {sel && (
              <div style={{ marginTop: 10, padding: 10, borderRadius: 8, background: "rgba(0,82,255,0.05)", border: "1px solid rgba(0,82,255,0.12)", fontSize: 11, color: "#94A3B8", textAlign: "center" }}>
                Switch to <b style={{ color: "#60A5FA" }}>Village</b> tab to place {BUILDINGS[sel].emoji} {BUILDINGS[sel].name}
              </div>
            )}
          </div>
        )}

        {/* VILLAGE TAB */}
        {tab === "village" && (
          <div style={{ padding: "0 14px 14px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <p style={{ fontSize: 11, color: "#64748B" }}>
                {sel ? <>Placing: <span style={{ color: BUILDINGS[sel].color, fontWeight: 600 }}>{BUILDINGS[sel].emoji} {BUILDINGS[sel].name}</span></> : "Select a structure in Build tab"}
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gap: 2, padding: 8, borderRadius: 14, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", width: "100%", maxWidth: 360 }}>
              {grid.map((row, r) => row.map((cell, c) => {
                const isHov = hover?.r === r && hover?.c === c;
                const canPlace = !cell && sel && !txModal;
                const b = cell ? BUILDINGS[cell] : null;
                return (
                  <div key={`${r}-${c}`}
                    onClick={() => canPlace && handleBuild(r, c)}
                    onMouseEnter={() => setHover({ r, c })}
                    onMouseLeave={() => setHover(null)}
                    style={{
                      aspectRatio: "1", borderRadius: 5,
                      border: `1px solid ${isHov && canPlace ? BUILDINGS[sel].color + "40" : "rgba(255,255,255,0.03)"}`,
                      background: b ? `${b.color}18` : isHov && canPlace ? `${BUILDINGS[sel].color}0C` : "rgba(255,255,255,0.01)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: canPlace ? "pointer" : "default", transition: "all 0.15s",
                      fontSize: cell ? "clamp(14px, 4vw, 22px)" : 10,
                    }}>
                    {cell ? <span className="anim-plop">{b.emoji}</span>
                      : isHov && canPlace ? <span style={{ opacity: 0.3 }}>{BUILDINGS[sel].emoji}</span>
                        : <span style={{ color: "rgba(255,255,255,0.03)", fontSize: 5 }}>•</span>}
                  </div>
                );
              }))}
            </div>
          </div>
        )}

        {/* NFTs TAB */}
        {tab === "nfts" && (
          <div style={{ padding: "0 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: 2, fontFamily: "'JetBrains Mono'", marginBottom: 8 }}>Your NFTs ({txLog.length})</div>
            {txLog.length === 0 ? (
              <div style={{ textAlign: "center", padding: 32, color: "#475569", fontSize: 13 }}>No NFTs yet. Start building!</div>
            ) : txLog.map((tx, i) => {
              const b = BUILDINGS[tx.type];
              return (
                <div key={i} style={{ padding: 10, borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", marginBottom: 5, background: "rgba(255,255,255,0.015)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{b?.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{b?.name}</div>
                    <div style={{ fontSize: 9, color: "#475569", fontFamily: "'JetBrains Mono'" }}>{tx.hash}</div>
                  </div>
                  <span style={{ fontSize: 10, color: "#22C55E", fontWeight: 600 }}>+{tx.points}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* RANK TAB */}
        {tab === "rank" && (
          <div style={{ padding: "0 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: 2, fontFamily: "'JetBrains Mono'", marginBottom: 8 }}>Leaderboard</div>
            {leaderboard.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, marginBottom: 4, background: p.isYou ? "rgba(0,82,255,0.08)" : "transparent", border: p.isYou ? "1px solid rgba(0,82,255,0.15)" : "1px solid transparent" }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: i === 0 ? "#F59E0B" : i === 1 ? "#94A3B8" : i === 2 ? "#CD7F32" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: i < 3 ? "#000" : "#64748B" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: p.isYou ? "#60A5FA" : "#E2E8F0" }}>{p.name}{p.isYou ? " ⭐" : ""}</div>
                  <div style={{ fontSize: 10, color: "#475569" }}>{p.builds} buildings</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono'" }}>{p.score.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}

        {/* TX Modal */}
        {txModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
            <div className="anim-up" style={{ background: "#0F1629", borderRadius: 16, border: "1px solid rgba(0,82,255,0.2)", padding: 28, textAlign: "center", width: "85%", maxWidth: 300 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(0,82,255,0.2)", borderTopColor: "#0052FF", margin: "0 auto 14px", animation: "spin 1s linear infinite" }} />
              <div style={{ fontSize: 30, marginBottom: 6 }}>{BUILDINGS[txModal.type]?.emoji}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Building {BUILDINGS[txModal.type]?.name}...</h3>
              <p style={{ color: "#94A3B8", fontSize: 12 }}>Minting on Base</p>
            </div>
          </div>
        )}

        {/* Notification */}
        {notif && (
          <div className="anim-up" style={{ position: "fixed", top: 60, left: "50%", transform: "translateX(-50%)", padding: "8px 18px", borderRadius: 10, background: notif.type === "error" ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.12)", border: `1px solid ${notif.type === "error" ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.25)"}`, fontSize: 12, fontWeight: 600, color: notif.type === "error" ? "#EF4444" : "#22C55E", zIndex: 50 }}>
            {notif.msg}
          </div>
        )}
      </div>
    </>
  );
}
