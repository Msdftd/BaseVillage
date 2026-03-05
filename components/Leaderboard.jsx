export default function Leaderboard({ userPoints, userBuildings, walletAddress }) {
  const lb = [
    { name:"village.eth", score:14200, builds:48 },
    { name:"builder.base", score:11800, builds:38 },
    { name:"onchain.dev", score:9400, builds:31 },
    { name:"nft.farmer", score:7200, builds:25 },
    { name:walletAddress||"You", score:userPoints, builds:userBuildings, isYou:true },
  ].sort((a,b) => b.score - a.score);
  const medals = ["bg-amber-500","bg-slate-400","bg-amber-700"];
  return (
    <div className="px-3">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px] font-mono mb-3">Global Rankings</div>
      {lb.map((p,i) => (
        <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-lg mb-1 ${p.isYou?"bg-base-blue/10 border border-base-blue/15":"border border-transparent"}`}>
          <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold ${i<3?`${medals[i]} text-black`:"bg-white/5 text-slate-500"}`}>{i+1}</div>
          <div className="flex-1 min-w-0">
            <div className={`text-xs font-semibold truncate ${p.isYou?"text-blue-400":"text-slate-200"}`}>{p.name}{p.isYou?" ⭐":""}</div>
            <div className="text-[10px] text-slate-500">{p.builds} buildings</div>
          </div>
          <div className="text-xs font-bold font-mono">{p.score.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
