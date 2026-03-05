import { BUILDINGS } from "../lib/buildings";

export default function Inventory({ txLog }) {
  return (
    <div className="px-3">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px] font-mono mb-3">Your NFTs ({txLog.length})</div>
      {txLog.length === 0 ? <div className="text-center py-8 text-slate-500 text-sm">No NFTs yet. Start building!</div>
      : txLog.map((tx,i) => {
        const b = BUILDINGS[tx.type];
        return (
          <div key={i} className="p-2.5 rounded-lg border border-white/5 mb-1.5 bg-white/[0.015] flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{background:`${b?.color}15`}}>{b?.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold">{b?.name} NFT</div>
              <div className="text-[9px] text-slate-500 font-mono truncate">{tx.hash}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-village-green font-semibold">+{tx.points}</span>
              <div className="text-[9px] text-slate-500">{tx.time}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
