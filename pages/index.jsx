import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Roadmap from "../components/Roadmap";
import { BUILDINGS, RARITY_COLORS } from "../lib/buildings";

export default function Home() {
  return (
    <>
      <Head>
        <title>BaseVillage — Build Your On-Chain Village on Base</title>
        <meta name="description" content="Build, grow, and trade in a living blockchain village on Base Mainnet. Every structure is an NFT." />
        <meta name="base:app_id" content="69a97a3e223099cde83059d6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-[#060B18] text-slate-200">
        <Navbar />
        <div className="pt-[60px]">
          <Hero />
          <Features />
          <HowItWorks />

          {/* Buildings Showcase */}
          <section className="py-24 px-8 max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[11px] font-bold text-village-pink uppercase tracking-[3px] font-mono">NFT Buildings</span>
              <h2 className="text-4xl font-extrabold mt-3 tracking-tight">Village Structures</h2>
              <p className="text-slate-500 mt-2 text-[15px]">Every building is an ERC-721 NFT minted on Base Mainnet</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {Object.values(BUILDINGS).map((b,i) => (
                <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center hover:border-white/15 transition-all group">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{b.emoji}</div>
                  <div className="text-[13px] font-bold">{b.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">{b.cost} ETH</div>
                  <div className="text-[9px] font-semibold mt-1" style={{color:RARITY_COLORS[b.rarity]}}>{b.rarity}</div>
                </div>
              ))}
            </div>
          </section>

          <Roadmap />

          {/* CTA + Footer */}
          <section className="py-20 px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Ready to Build Your Village?</h2>
            <p className="text-slate-400 mb-7">Join BaseVillage on Base Mainnet — real NFTs, real ownership.</p>
            <div className="mt-16 pt-8 border-t border-white/5 text-slate-600 text-xs flex justify-center gap-4 flex-wrap">
              <span>BaseVillage © 2026</span><span>·</span>
              <span>Base Mainnet (Chain ID 8453)</span><span>·</span>
              <span>All buildings are NFTs</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
