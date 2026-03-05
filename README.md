# 🏘️ BaseVillage — Build Your On-Chain Village

A gamified Web3 mini-app on **Base Mainnet** (Chain ID 8453). Every building is an NFT, every action is on-chain.

---

## 📁 Folder Structure

```
basevillage/
├── abi/contracts.js           # Contract ABIs
├── components/
│   ├── BuildMenu.jsx          # Structure selection (8 types)
│   ├── Features.jsx           # Landing — features section
│   ├── Hero.jsx               # Landing — hero section
│   ├── HowItWorks.jsx         # Landing — steps section
│   ├── Inventory.jsx          # NFT inventory panel
│   ├── Leaderboard.jsx        # Rankings panel
│   ├── Navbar.jsx             # Navigation + wallet button
│   ├── Roadmap.jsx            # Roadmap section
│   ├── TransactionLog.jsx     # Tx modal + floating log
│   └── VillageGrid.jsx        # Interactive 8×8 village map
├── contracts/
│   ├── VillageLandNFT.sol     # Land parcel NFT
│   ├── BuildingNFT.sol        # Building NFT (8 types)
│   └── VillageUpgrade.sol     # Upgrade system (Lv.1→5)
├── hooks/useVillage.js        # Wagmi hooks for contracts
├── lib/
│   ├── buildings.js           # Building definitions
│   └── wagmi.js               # Wagmi config (Base Mainnet)
├── pages/
│   ├── _app.jsx               # Providers wrapper
│   ├── index.jsx              # Landing page
│   └── dashboard.jsx          # App dashboard
├── styles/globals.css         # Global styles
└── .env.example               # Environment template
```

---

## 🚀 Setup & Run

```bash
# 1. Install
cd basevillage
npm install

# 2. Configure
cp .env.example .env.local
# Add your WalletConnect Project ID in .env.local

# 3. Run
npm run dev
# Open http://localhost:3000
```

---

## 📜 Deploy Contracts to Base Mainnet

### Prerequisites
- Real ETH on Base Mainnet (bridge from Ethereum via bridge.base.org)
- MetaMask configured for Base Mainnet

### MetaMask — Add Base Mainnet

| Field           | Value                    |
| --------------- | ------------------------ |
| Network Name    | Base                     |
| RPC URL         | https://mainnet.base.org |
| Chain ID        | 8453                     |
| Currency Symbol | ETH                      |
| Block Explorer  | https://basescan.org     |

### Deploy via Remix IDE

1. Open [remix.ethereum.org](https://remix.ethereum.org)
2. Create files → paste contract code from `/contracts/`
3. Compiler: Solidity `0.8.20`, optimization ON (200 runs)
4. Environment: **Injected Provider** (MetaMask on Base Mainnet)

**Deploy order:**

| # | Contract           | Address                                      |
|---|--------------------|----------------------------------------------|
| 1 | VillageLandNFT     | `0xd47B80a7b7d2BA20638149D3ddaDa38a4c9918e2` |
| 2 | BuildingNFT        | `0x989350C2933d0c5C287A1A3B2795E6146Fcb0F27` |
| 3 | VillageUpgrade     | `0x6413249437Ec0dB7BA056e11E836c0698D5a5794` |

Contracts are **LIVE** on Base Mainnet. View on BaseScan:
- [VillageLandNFT](https://basescan.org/address/0xd47B80a7b7d2BA20638149D3ddaDa38a4c9918e2)
- [BuildingNFT](https://basescan.org/address/0x989350C2933d0c5C287A1A3B2795E6146Fcb0F27)
- [VillageUpgrade](https://basescan.org/address/0x6413249437Ec0dB7BA056e11E836c0698D5a5794)

Contracts are already connected. Just add your WalletConnect ID to `.env.local` and run.

---

## 🔗 Transaction Functions

| Function           | Contract       | Cost       | Action                    |
|--------------------|----------------|------------|---------------------------|
| `buildHouse(x,y)`  | BuildingNFT    | 0.001 ETH  | Mint house NFT            |
| `buildFarm(x,y)`   | BuildingNFT    | 0.0015 ETH | Mint farm NFT             |
| `buildMarket(x,y)` | BuildingNFT    | 0.002 ETH  | Mint market NFT           |
| `plantTree(x,y)`   | BuildingNFT    | 0.0005 ETH | Mint tree NFT             |
| `buildWindmill(x,y)`| BuildingNFT   | 0.0025 ETH | Mint windmill NFT         |
| `buildStatue(x,y)` | BuildingNFT    | 0.003 ETH  | Mint statue NFT           |
| `addAnimal(x,y)`   | BuildingNFT    | 0.001 ETH  | Mint animal NFT           |
| `buildWell(x,y)`   | BuildingNFT    | 0.0012 ETH | Mint well NFT             |
| `upgradeBuilding()` | VillageUpgrade| 0.001+ ETH | Upgrade level (1→5)       |
| `claimLand(name)`  | VillageLandNFT | Free       | Claim starter land        |

---

## 🌐 Deploy Frontend to Vercel

```bash
git init && git add . && git commit -m "BaseVillage v1.0"
git remote add origin https://github.com/YOUR_USER/basevillage.git
git push -u origin main
```

1. Go to [vercel.com](https://vercel.com) → Import repo
2. Add environment variables
3. Deploy

---

## 🛠️ Tech Stack

| Layer          | Technology                              |
|----------------|-----------------------------------------|
| Frontend       | Next.js 14 + React 18 + TailwindCSS     |
| Web3           | Wagmi v2 + RainbowKit v2 + Viem         |
| Contracts      | Solidity 0.8.20 + OpenZeppelin          |
| Blockchain     | **Base Mainnet** (Chain ID 8453)         |
| Deployment     | Vercel (frontend) + Remix IDE (contracts)|

---

Built with 💙 for the Base ecosystem.
