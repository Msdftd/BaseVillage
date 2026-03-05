import { BUILDINGS, RARITY_COLORS } from "../lib/buildings";

export default function BuildMenu({ selectedBuilding, onSelect }) {
  return (
    <div className="px-3">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px] font-mono mb-3">Select Structure</div>
      {Object.entries(BUILDINGS).map(([key, b]) => {
        const isSel = selectedBuilding === key;
        return (
          <button key={key} onClick={() => onSelect(key)}
            className="flex items-center gap-2.5 w-full p-2.5 rounded-lg mb-1.5 text-left transition-all duration-150 hover:bg-white/[0.03]"
            style={{ border:isSel?`1px solid ${b.color}40`:"1px solid rgba(255,255,255,0.04)", background:isSel?`${b.color}10`:"transparent" }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background:`${b.color}15` }}>{b.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-100">{b.name}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-slate-500 font-mono">{b.cost} ETH</span>
                <span className="text-[10px] text-slate-600">+{b.points}pts</span>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold" style={{ background:`${RARITY_COLORS[b.rarity]}15`, color:RARITY_COLORS[b.rarity] }}>{b.rarity}</span>
          </button>
        );
      })}
      {selectedBuilding && (
        <div className="mt-3 p-3 rounded-lg bg-base-blue/[0.05] border border-base-blue/[0.12] text-xs text-slate-400 leading-relaxed">
          💡 Click an empty cell to place <b className="text-slate-200">{BUILDINGS[selectedBuilding].name}</b>. This mints an NFT on <b className="text-blue-400">Base Mainnet</b>.
        </div>
      )}
    </div>
  );
}
