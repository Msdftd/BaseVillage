import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { BuildingNFTABI, VillageLandABI, VillageUpgradeABI } from "../abi/contracts";
import { CONTRACTS } from "../lib/wagmi";
import { BUILDINGS } from "../lib/buildings";

// ── Build Structure ──
export function useBuildStructure() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const FUNC_MAP = {
    house:"buildHouse", farm:"buildFarm", market:"buildMarket", tree:"plantTree",
    windmill:"buildWindmill", statue:"buildStatue", animal:"addAnimal", well:"buildWell",
  };

  const build = (type, x, y) => {
    const fn = FUNC_MAP[type];
    const cost = BUILDINGS[type].cost;
    if (!fn) return;
    writeContract({
      address: CONTRACTS.BuildingNFT,
      abi: BuildingNFTABI,
      functionName: fn,
      args: [x, y],
      value: parseEther(cost),
    });
  };

  return { build, isPending: isPending || isConfirming, isSuccess, hash, error };
}

// ── Upgrade Building ──
export function useUpgradeBuilding() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const costs = { 1:"0.001", 2:"0.002", 3:"0.004", 4:"0.008" };
  const upgrade = (tokenId, level) => {
    writeContract({
      address: CONTRACTS.VillageUpgrade,
      abi: VillageUpgradeABI,
      functionName: "upgradeBuilding",
      args: [BigInt(tokenId)],
      value: parseEther(costs[level] || "0.001"),
    });
  };

  return { upgrade, isPending: isPending || isConfirming, isSuccess, hash, error };
}

// ── Claim Land ──
export function useClaimLand() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const claim = (name) => {
    writeContract({
      address: CONTRACTS.VillageLandNFT,
      abi: VillageLandABI,
      functionName: "claimLand",
      args: [name],
    });
  };

  return { claim, isPending: isPending || isConfirming, isSuccess, hash, error };
}

// ── Read Hooks ──
export function useVillagePoints(addr) {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACTS.BuildingNFT, abi: BuildingNFTABI,
    functionName: "getVillagePoints", args: addr ? [addr] : undefined, enabled: !!addr,
  });
  return { points: data ? Number(data) : 0, isLoading, refetch };
}

export function useBuildingCount(addr) {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACTS.BuildingNFT, abi: BuildingNFTABI,
    functionName: "getBuildingCount", args: addr ? [addr] : undefined, enabled: !!addr,
  });
  return { count: data ? Number(data) : 0, isLoading, refetch };
}
