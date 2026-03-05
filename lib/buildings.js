// ══════════════════════════════════════════════════
// BaseVillage — Building Definitions
// ══════════════════════════════════════════════════

export const BUILDINGS = {
  house:    { id:1, name:"House",    emoji:"🏠", cost:"0.0000001",  costWei:"100000000000",  points:100, color:"#3B82F6", fn:"buildHouse",    desc:"Residential building",  rarity:"Common" },
  farm:     { id:2, name:"Farm",     emoji:"🌾", cost:"0.00000015", costWei:"150000000000",  points:150, color:"#22C55E", fn:"buildFarm",     desc:"Food production",       rarity:"Common" },
  market:   { id:3, name:"Market",   emoji:"🏪", cost:"0.0000002",  costWei:"200000000000",  points:200, color:"#F59E0B", fn:"buildMarket",   desc:"Trading hub",           rarity:"Uncommon" },
  tree:     { id:4, name:"Tree",     emoji:"🌳", cost:"0.00000005", costWei:"50000000000",   points:50,  color:"#16A34A", fn:"plantTree",     desc:"Environment",           rarity:"Common" },
  windmill: { id:5, name:"Windmill", emoji:"🌀", cost:"0.00000025", costWei:"250000000000",  points:250, color:"#8B5CF6", fn:"buildWindmill", desc:"Energy production",     rarity:"Rare" },
  statue:   { id:6, name:"Statue",   emoji:"🗿", cost:"0.0000003",  costWei:"300000000000",  points:300, color:"#EC4899", fn:"buildStatue",   desc:"Decorative landmark",   rarity:"Rare" },
  animal:   { id:7, name:"Animal",   emoji:"🐄", cost:"0.0000001",  costWei:"100000000000",  points:80,  color:"#F97316", fn:"addAnimal",     desc:"Collectible creature",  rarity:"Uncommon" },
  well:     { id:8, name:"Well",     emoji:"⛲", cost:"0.00000012", costWei:"120000000000",  points:120, color:"#06B6D4", fn:"buildWell",     desc:"Water source",          rarity:"Common" },
};

export const GRID_SIZE = 8;

export const RARITY_COLORS = {
  Common: "#94A3B8",
  Uncommon: "#22C55E",
  Rare: "#8B5CF6",
  Epic: "#F59E0B",
  Legendary: "#EF4444",
};

// Function name to Solidity function selector mapping
export const FUNCTION_SELECTORS = {
  buildHouse:    "0x6a3c4430",
  plantTree:     "0x8a3f07e4",
  buildFarm:     "0x2d5e4a6b",
  buildMarket:   "0x3f8c91d2",
  buildWindmill: "0x5b7e2c1a",
  buildStatue:   "0x7d9f3e5c",
  addAnimal:     "0x4c6d2b8a",
  buildWell:     "0x9e1a5f3d",
};
