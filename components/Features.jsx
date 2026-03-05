const FEATURES = [
  { icon:"⛏️", title:"Build & Expand", desc:"Construct houses, farms, markets, windmills as on-chain NFTs on Base Mainnet." },
  { icon:"🎨", title:"Decorate", desc:"Add trees, statues, animals, and wells for cosmetic village upgrades." },
  { icon:"📈", title:"Upgrade", desc:"Level up buildings (1→5) for premium visuals and bonus reward multipliers." },
  { icon:"🏆", title:"Compete", desc:"Climb global leaderboards and earn seasonal achievement badges." },
  { icon:"🔄", title:"Trade NFTs", desc:"Buy and sell village building NFTs in the peer-to-peer marketplace." },
  { icon:"👥", title:"Visit Villages", desc:"Explore other players' villages and leave social reactions." },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-8 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <span className="text-[11px] font-bold text-base-blue uppercase tracking-[3px] font-mono">Features</span>
        <h2 className="text-4xl font-extrabold mt-3 tracking-tight">Everything You Need to Build</h2>
        <p className="text-slate-500 mt-2 text-[15px]">Powerful tools for your village, minimal gas on Base</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {FEATURES.map((f,i) => (
          <div key={i} className="group p-7 rounded-xl border border-white/5 bg-white/[0.015] hover:bg-base-blue/[0.04] hover:border-base-blue/20 hover:-translate-y-1 transition-all duration-300">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
            <h3 className="text-[17px] font-bold mb-2">{f.title}</h3>
            <p className="text-[13.5px] text-slate-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
