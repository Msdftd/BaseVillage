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
          <a href="https://warpcast.com/~/apps/base-village.vercel.app" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#8B5CF6] text-white font-bold text-lg shadow-lg shadow-purple-500/25 hover:-translate-y-0.5 transition-all no-underline">
            <svg width="22" height="22" viewBox="0 0 1000 1000" fill="white"><path d="M257.778 155.556H742.222V844.444H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.444H257.778V155.556Z"/><path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.444H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z"/><path d="M871.111 253.333H693.333V746.667C681.06 746.667 671.111 756.616 671.111 768.889V795.556H666.667C654.394 795.556 644.444 805.505 644.444 817.778V844.444H893.333V817.778C893.333 805.505 883.384 795.556 871.111 795.556H866.667V768.889C866.667 756.616 856.717 746.667 844.444 746.667V351.111H868.889L897.778 253.333H871.111Z"/></svg>
            Play on Farcaster
          </a>
          {isConnected ? (
            <button onClick={() => router.push("/dashboard")}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0052FF] text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all">
              <svg width="20" height="20" viewBox="0 0 111 111" fill="white"><path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H0C2.35281 87.8625 26.0432 110.034 54.921 110.034Z"/></svg>
              Play on Base
            </button>
          ) : (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button onClick={openConnectModal}
                  className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0052FF] text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all">
                  <svg width="20" height="20" viewBox="0 0 111 111" fill="white"><path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H0C2.35281 87.8625 26.0432 110.034 54.921 110.034Z"/></svg>
                  Play on Base
                </button>
              )}
            </ConnectButton.Custom>
          )}
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
