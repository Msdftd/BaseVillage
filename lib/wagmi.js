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
    "0xd47B80a7b7d2BA20638149D3ddaDa38a4c9918e2",
  BuildingNFT:
    process.env.NEXT_PUBLIC_BUILDING_NFT ||
    "0x989350C2933d0c5C287A1A3B2795E6146Fcb0F27",
  VillageUpgrade:
    process.env.NEXT_PUBLIC_VILLAGE_UPGRADE ||
    "0x6413249437Ec0dB7BA056e11E836c0698D5a5794",
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
