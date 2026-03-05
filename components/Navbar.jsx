import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Navbar() {
  const { isConnected } = useAccount();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 h-[60px] flex items-center justify-between bg-[#060B18]/85 backdrop-blur-xl border-b border-white/[0.05]">
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-base shadow-lg shadow-blue-500/20">🏘️</div>
        <span className="font-extrabold text-[17px] tracking-tight text-slate-100">BaseVillage</span>
        <span className="ml-1 text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-base-blue/10 text-blue-400 border border-base-blue/20">Base Mainnet</span>
      </Link>
      <div className="flex gap-6 items-center">
        <div className="hidden md:flex gap-5">
          {["Features","How It Works","Roadmap"].map(t => (
            <a key={t} href={`/#${t.toLowerCase().replace(/ /g,"-")}`} className="text-slate-400 text-[13px] font-medium hover:text-slate-100 transition-colors no-underline">{t}</a>
          ))}
          {isConnected && <Link href="/dashboard" className="text-blue-400 text-[13px] font-semibold hover:text-blue-300 no-underline">Dashboard</Link>}
        </div>
        <ConnectButton chainStatus="icon" showBalance={false} accountStatus="address" />
      </div>
    </nav>
  );
}
