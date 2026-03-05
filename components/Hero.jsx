import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export default function Hero() {
  const { isConnected } = useAccount();
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-base-blue/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-village-green/5 blur-3xl" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage:"radial-gradient(rgba(0,82,255,0.15) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-base-blue/30 bg-base-blue/10 mb-8">
          <span className="text-xs font-mono text-blue-400">⬡ Live on Base Mainnet · Chain ID 8453</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.04] tracking-tight mb-6">
          Build Your<br />
          <span className="bg-gradient-to-r from-blue-500 via-green-400 to-amber-400 bg-clip-text text-transparent">On-Chain Village</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Grow, build, and trade in a living blockchain village on Base. Every structure is an NFT, every action is on-chain.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {isConnected ? (
            <button onClick={() => router.push("/dashboard")} className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all">Enter Village →</button>
          ) : (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button onClick={openConnectModal} className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all">Start Building</button>
              )}
            </ConnectButton.Custom>
          )}
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button onClick={openConnectModal} className="px-8 py-4 rounded-xl border border-white/15 bg-white/5 text-slate-200 font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur">Connect Wallet</button>
            )}
          </ConnectButton.Custom>
        </div>
        {/* Stats */}
        <div className="flex gap-3 justify-center mt-12 flex-wrap">
          {[{l:"Network",v:"Base Mainnet",c:"text-blue-400"},{l:"Gas",v:"< $0.01",c:"text-green-400"},{l:"NFT Types",v:"8+",c:"text-purple-400"},{l:"Max Level",v:"5",c:"text-amber-400"}].map((s,i)=>(
            <div key={i} className="px-5 py-3 rounded-xl bg-white/[0.025] border border-white/[0.06] text-center min-w-[120px]">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">{s.l}</div>
              <div className={`text-sm font-bold mt-0.5 ${s.c}`}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
