// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title VillageUpgrade — BaseVillage (Base Mainnet)

interface IBuildingNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract VillageUpgrade is Ownable {
    IBuildingNFT public buildingNFT;
    uint8 public constant MAX_LEVEL = 5;
    mapping(uint8 => uint256) public upgradeCost;
    mapping(uint256 => uint8) public buildingLevels;

    event BuildingUpgraded(address indexed owner, uint256 indexed tokenId, uint8 fromLevel, uint8 toLevel, uint256 cost);

    constructor(address _buildingNFT) Ownable(msg.sender) {
        buildingNFT = IBuildingNFT(_buildingNFT);
        upgradeCost[1] = 0.001 ether;
        upgradeCost[2] = 0.002 ether;
        upgradeCost[3] = 0.004 ether;
        upgradeCost[4] = 0.008 ether;
    }

    function upgradeBuilding(uint256 tokenId) external payable {
        require(buildingNFT.ownerOf(tokenId) == msg.sender, "Not owner");
        uint8 cur = buildingLevels[tokenId];
        if (cur == 0) cur = 1;
        require(cur < MAX_LEVEL, "Max level");
        require(msg.value >= upgradeCost[cur], "Insufficient payment");

        buildingLevels[tokenId] = cur + 1;
        emit BuildingUpgraded(msg.sender, tokenId, cur, cur + 1, upgradeCost[cur]);

        if (msg.value > upgradeCost[cur]) payable(msg.sender).transfer(msg.value - upgradeCost[cur]);
    }

    function getBuildingLevel(uint256 tokenId) external view returns (uint8) {
        uint8 l = buildingLevels[tokenId];
        return l == 0 ? 1 : l;
    }

    function getUpgradeCost(uint8 fromLevel) external view returns (uint256) { return upgradeCost[fromLevel]; }
    function setUpgradeCost(uint8 level, uint256 cost) external onlyOwner { upgradeCost[level] = cost; }
    function setBuildingNFT(address _b) external onlyOwner { buildingNFT = IBuildingNFT(_b); }
    function withdraw() external onlyOwner { payable(owner()).transfer(address(this).balance); }
}
