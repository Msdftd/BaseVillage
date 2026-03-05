// ══════════════════════════════════════════════════
// BuildingNFT ABI (Base Mainnet)
// ══════════════════════════════════════════════════
// After deploying on Base Mainnet via Remix, copy the full ABI
// from compilation output and replace this file.

export const BuildingNFTABI = [
  { inputs:[{name:"x",type:"uint8"},{name:"y",type:"uint8"}], name:"buildHouse",    outputs:[], stateMutability:"payable", type:"function" },
  { inputs:[{name:"x",type:"uint8"},{name:"y",type:"uint8"}], name:"plantTree",     outputs:[], stateMutability:"payable", type:"function" },
  { inputs:[{name:"x",type:"uint8"},{name:"y",type:"uint8"}], name:"buildFarm",     outputs:[], stateMutability:"payable", type:"function" },
  { inputs:[{name:"x",type:"uint8"},{name:"y",type:"uint8"}], name:"buildMarket",   outputs:[], stateMutability:"payable", type:"function" },
  { inputs:[{name:"x",type:"uint8"},{name:"y",type:"uint8"}], name:"buildWindmill", outputs:[], stateMutability:"payable", type:"function" },
  { inputs:[{name:"x",type:"uint8"},{name:"y",type:"uint8"}], name:"buildStatue",   outputs:[], stateMutability:"payable", type:"function" },
  { inputs:[{name:"x",type:"uint8"},{name:"y",type:"uint8"}], name:"addAnimal",     outputs:[], stateMutability:"payable", type:"function" },
  { inputs:[{name:"x",type:"uint8"},{name:"y",type:"uint8"}], name:"buildWell",     outputs:[], stateMutability:"payable", type:"function" },
  { inputs:[{name:"user",type:"address"}], name:"getUserBuildings", outputs:[{name:"",type:"uint256[]"}], stateMutability:"view", type:"function" },
  { inputs:[{name:"tokenId",type:"uint256"}], name:"getBuildingData", outputs:[{components:[{name:"buildingType",type:"uint8"},{name:"gridX",type:"uint8"},{name:"gridY",type:"uint8"},{name:"level",type:"uint8"},{name:"builtAt",type:"uint256"},{name:"builder",type:"address"}],name:"",type:"tuple"}], stateMutability:"view", type:"function" },
  { inputs:[{name:"user",type:"address"}], name:"getVillagePoints", outputs:[{name:"",type:"uint256"}], stateMutability:"view", type:"function" },
  { inputs:[{name:"user",type:"address"}], name:"getBuildingCount", outputs:[{name:"",type:"uint256"}], stateMutability:"view", type:"function" },
  { inputs:[{name:"user",type:"address"},{name:"x",type:"uint8"},{name:"y",type:"uint8"}], name:"isCellOccupied", outputs:[{name:"",type:"bool"}], stateMutability:"view", type:"function" },
];

export const VillageLandABI = [
  { inputs:[{name:"_villageName",type:"string"}], name:"claimLand", outputs:[], stateMutability:"nonpayable", type:"function" },
  { inputs:[{name:"",type:"address"}], name:"hasClaimed", outputs:[{name:"",type:"bool"}], stateMutability:"view", type:"function" },
  { inputs:[{name:"owner",type:"address"}], name:"getLandByOwner", outputs:[{name:"",type:"uint256"}], stateMutability:"view", type:"function" },
];

export const VillageUpgradeABI = [
  { inputs:[{name:"tokenId",type:"uint256"}], name:"upgradeBuilding", outputs:[], stateMutability:"payable", type:"function" },
  { inputs:[{name:"tokenId",type:"uint256"}], name:"getBuildingLevel", outputs:[{name:"",type:"uint8"}], stateMutability:"view", type:"function" },
  { inputs:[{name:"fromLevel",type:"uint8"}], name:"getUpgradeCost", outputs:[{name:"",type:"uint256"}], stateMutability:"view", type:"function" },
];
