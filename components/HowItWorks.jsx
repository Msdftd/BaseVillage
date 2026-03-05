const STEPS = [
  { n:"01", icon:"🔗", title:"Connect Wallet", desc:"Link MetaMask or Coinbase Wallet on Base Mainnet" },
  { n:"02", icon:"🗺️", title:"Claim Land",     desc:"Get your free 8×8 starter village plot NFT" },
  { n:"03", icon:"🏗️", title:"Build Village",  desc:"Place structures on your land — each mints an NFT" },
  { n:"04", icon:"⭐", title:"Earn & Compete",  desc:"Get points, collect rare NFTs, top the leaderboard" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-8 bg-base-blue/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-village-green uppercase tracking-[3px] font-mono">How It Works</span>
          <h2 className="text-4xl font-extrabold mt-3 tracking-tight">Four Steps to Your Village</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s,i) => (
            <div key={i} className="relative text-center p-8 rounded-2xl bg-[#060B18]/70 border border-white/5">
              <div className="text-[44px] mb-2">{s.icon}</div>
              <div className="absolute top-4 right-5 text-5xl font-black text-base-blue/[0.07]">{s.n}</div>
              <h3 className="text-[17px] font-bold mb-2">{s.title}</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
