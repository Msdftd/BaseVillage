import { BUILDINGS } from "../lib/buildings";

export function TransactionModal({ buildingType, txHash }) {
  const b = BUILDINGS[buildingType];
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="anim-up bg-[#0F1629] rounded-2xl border border-base-blue/20 p-9 text-center max-w-sm w-[90%]">
        <div className="tx-spinner mx-auto mb-4" />
        <div className="text-4xl mb-2">{b?.emoji}</div>
        <h3 className="text-xl font-bold mb-2">Building {b?.name}...</h3>
        <p className="text-slate-400 text-sm mb-1">Minting NFT on Base Mainnet</p>
        <p className="text-slate-500 text-[11px] font-mono mb-2">Cost: {b?.cost} ETH + gas</p>
        {txHash ? (
          <a href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-[11px] font-mono hover:underline">View on BaseScan →</a>
        ) : (
          <p className="text-slate-500 text-[11px] font-mono" style={{animation:"pulse 1.5s infinite"}}>Confirm in your wallet...</p>
        )}
      </div>
    </div>
  );
}

export function TransactionLog({ txLog }) {
  if (!txLog.length) return null;
  return (
    <div className="glass absolute bottom-4 right-4 w-[270px] max-h-52 overflow-y-auto rounded-xl p-3">
      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[2px] font-mono mb-2">Recent Transactions</div>
      {txLog.slice(0,5).map((tx,i) => {
        const b = BUILDINGS[tx.type];
        return (
          <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/[0.03] last:border-0">
            <span className="text-[15px]">{b?.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px]">Built {b?.name}</div>
              <div className="text-[9px] text-slate-500 font-mono">
                <a href={`https://basescan.org/tx/${tx.fullHash||"#"}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 no-underline hover:text-blue-400">{tx.hash}</a> · {tx.time}
              </div>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-village-green" />
          </div>
        );
      })}
    </div>
  );
}
