const PHASES = [
  { title:"Phase 1", sub:"MVP Launch",    color:"border-t-blue-500",   text:"text-blue-400",   dot:"bg-blue-500",   items:["Village builder","Wallet connect","8 building types","Points system"] },
  { title:"Phase 2", sub:"Marketplace",   color:"border-t-green-500",  text:"text-green-400",  dot:"bg-green-500",  items:["NFT trading","Listings & bids","Price history","Escrow system"] },
  { title:"Phase 3", sub:"Social",        color:"border-t-purple-500", text:"text-purple-400", dot:"bg-purple-500", items:["Village visits","Leaderboards","Referral rewards","Social reactions"] },
  { title:"Phase 4", sub:"Governance",    color:"border-t-amber-500",  text:"text-amber-400",  dot:"bg-amber-500",  items:["DAO voting","Seasonal events","Mobile app","Cross-chain"] },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 px-8 bg-base-blue/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-village-amber uppercase tracking-[3px] font-mono">Roadmap</span>
          <h2 className="text-4xl font-extrabold mt-3 tracking-tight">The Journey Ahead</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {PHASES.map((p,i) => (
            <div key={i} className={`p-7 rounded-xl bg-white/[0.015] border border-white/5 border-t-[3px] ${p.color}`}>
              <div className={`text-[11px] font-bold ${p.text} font-mono mb-1`}>{p.title}</div>
              <h3 className="text-lg font-bold mb-4">{p.sub}</h3>
              {p.items.map((item,j) => (
                <div key={j} className="flex items-center gap-2 mb-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${p.dot} shrink-0`} />
                  <span className="text-[13px] text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
