import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { BUILDINGS, GRID_SIZE } from "../lib/buildings";
import { BASE_CHAIN } from "../lib/wagmi";
import { useBuildStructure } from "../hooks/useVillage";
import VillageGrid from "../components/VillageGrid";
import BuildMenu from "../components/BuildMenu";
import Inventory from "../components/Inventory";
import Leaderboard from "../components/Leaderboard";
import { TransactionModal, TransactionLog } from "../components/TransactionLog";

export default function Dashboard() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balData } = useBalance({ address });

  const [grid, setGrid] = useState(() => Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null)));
  const [sel, setSel] = useState(null);
  const [points, setPoints] = useState(0);
  const [txLog, setTxLog] = useState([]);
  const [tab, setTab] = useState("build");
  const [showTxModal, setShowTxModal] = useState(false);
  const [currentBuildType, setCurrentBuildType] = useState(null);
  const [notif, setNotif] = useState(null);

  const { build, isPending, isSuccess, hash, error } = useBuildStructure();
  const bCount = grid.flat().filter(Boolean).length;
  const short = address ? `${address.slice(0,6)}...${address.slice(-4)}` : "";
  const bal = balData ? parseFloat(balData.formatted).toFixed(4) : "0.0000";

  useEffect(() => { if (!isConnected) router.push("/"); }, [isConnected, router]);

  const showNotif = (msg, type="success") => { setNotif({msg,type}); setTimeout(()=>setNotif(null), 3000); };

  const handleBuild = useCallback(async (r, c) => {
    if (!sel || grid[r][c] || showTxModal) return;
    const building = BUILDINGS[sel];
    setCurrentBuildType(sel);
    setShowTxModal(true);

    try {
      // ═══ REAL TX: Uncomment below after deploying contracts ═══
      // build(sel, c, r);

      // ═══ DEMO MODE: Simulates transaction ═══
      await new Promise(res => setTimeout(res, 2000));
      const fakeHash = "0x" + Array.from({length:64}, ()=>Math.floor(Math.random()*16).toString(16)).join("");

      const g = grid.map(row => [...row]);
      g[r][c] = sel;
      setGrid(g);
      setPoints(p => p + building.points);

      const shortHash = fakeHash.slice(0,10) + "..." + fakeHash.slice(-6);
      setTxLog(prev => [{
        type:sel, time:new Date().toLocaleTimeString(),
        hash:shortHash, fullHash:fakeHash, r, c, points:building.points
      }, ...prev.slice(0,49)]);

      setShowTxModal(false);
      setCurrentBuildType(null);
      showNotif(`${building.emoji} ${building.name} built! +${building.points} pts`);
    } catch (err) {
      setShowTxModal(false);
      setCurrentBuildType(null);
      showNotif(err.message || "Transaction failed", "error");
    }
  }, [sel, grid, showTxModal]);

  if (!isConnected) return null;

  return (
    <>
      <Head><title>Village Dashboard — BaseVillage</title></Head>
      <div className="min-h-screen bg-[#060B18] text-slate-200">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 px-6 h-[52px] flex items-center justify-between border-b border-white/[0.05] bg-[#060B18]/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-sm shadow-md shadow-blue-500/20">🏘️</div>
            <span className="font-extrabold text-base">BaseVillage</span>
            <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-base-blue/10 text-blue-400 border border-base-blue/20">Mainnet</span>
          </div>
          <div className="flex gap-5 items-center text-[13px]">
            <span>🏗️ <b>{bCount}</b></span>
            <span>⭐ <b>{points.toLocaleString()}</b></span>
            <span>🔥 <b>1</b></span>
            <span>🎨 <b>{txLog.length}</b></span>
            <div className="px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-[11px] font-mono text-green-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>{short}
            </div>
            <span className="text-[11px] text-slate-500 font-mono">{bal} ETH</span>
            <button onClick={()=>disconnect()} className="px-3 py-1 rounded-lg border border-white/8 text-slate-500 text-[11px] hover:bg-white/5 transition-colors">Disconnect</button>
          </div>
        </div>

        <div className="flex" style={{ height:"calc(100vh - 52px)" }}>
          {/* Sidebar */}
          <div className="w-[290px] border-r border-white/[0.05] bg-[#060B18]/40 overflow-y-auto py-3">
            <div className="flex gap-1 px-3 mb-4">
              {[{id:"build",l:"Build"},{id:"inventory",l:"NFTs"},{id:"rank",l:"Rank"}].map(t=>(
                <button key={t.id} onClick={()=>setTab(t.id)}
                  className={`flex-1 py-2 rounded-lg border-none text-xs font-semibold cursor-pointer transition-all ${tab===t.id?"bg-base-blue/15 text-blue-400":"text-slate-500 hover:text-slate-300"}`}>{t.l}</button>
              ))}
            </div>
            {tab==="build" && <BuildMenu selectedBuilding={sel} onSelect={setSel} />}
            {tab==="inventory" && <Inventory txLog={txLog} />}
            {tab==="rank" && <Leaderboard userPoints={points} userBuildings={bCount} walletAddress={short} />}
          </div>

          {/* Grid Area */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage:"radial-gradient(rgba(0,82,255,0.04) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
            <VillageGrid grid={grid} selectedBuilding={sel} onCellClick={handleBuild} isBuilding={showTxModal} />
            <TransactionLog txLog={txLog} />

            {/* Notification */}
            {notif && (
              <div className="anim-up absolute top-5 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl text-[13px] font-semibold z-50 backdrop-blur-xl"
                style={{ background:notif.type==="error"?"rgba(239,68,68,0.15)":"rgba(34,197,94,0.12)", border:`1px solid ${notif.type==="error"?"rgba(239,68,68,0.3)":"rgba(34,197,94,0.25)"}`, color:notif.type==="error"?"#EF4444":"#22C55E" }}>
                {notif.msg}
              </div>
            )}
          </div>
        </div>

        {showTxModal && currentBuildType && <TransactionModal buildingType={currentBuildType} txHash={hash} />}
      </div>
    </>
  );
}
