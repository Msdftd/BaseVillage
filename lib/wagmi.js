import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";

// ══════════════════════════════════════════════════
// BaseVillage — Wagmi Config (BASE MAINNET)
// ══════════════════════════════════════════════════
// Chain: Base Mainnet (Chain ID 8453)
// RPC: https://mainnet.base.org
// Explorer: https://basescan.org
// ══════════════════════════════════════════════════

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  "YOUR_WALLETCONNECT_PROJECT_ID";

export const config = getDefaultConfig({
  appName: "BaseVillage",
  projectId,
  chains: [base], // Base Mainnet only
  ssr: true,
});

// ══════════════════════════════════════════════════
// Deployed Contract Addresses (Base Mainnet)
// ══════════════════════════════════════════════════
// Replace these after deploying via Remix IDE to Base Mainnet.

export const CONTRACTS = {
  VillageLandNFT:
    process.env.NEXT_PUBLIC_VILLAGE_LAND_NFT ||
    "0x0000000000000000000000000000000000000000",
  BuildingNFT:
    process.env.NEXT_PUBLIC_BUILDING_NFT ||
    "0x0000000000000000000000000000000000000000",
  VillageUpgrade:
    process.env.NEXT_PUBLIC_VILLAGE_UPGRADE ||
    "0x0000000000000000000000000000000000000000",
};

// ══════════════════════════════════════════════════
// Base Mainnet Network Details
// ══════════════════════════════════════════════════
export const BASE_CHAIN = {
  id: 8453,
  name: "Base",
  rpcUrl: "https://mainnet.base.org",
  blockExplorer: "https://basescan.org",
  chainIdHex: "0x2105",
};
