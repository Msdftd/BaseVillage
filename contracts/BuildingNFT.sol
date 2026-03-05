// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title BuildingNFT — BaseVillage (Base Mainnet)
/// @notice 8 building types. Each building = NFT on Base.

contract BuildingNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    enum BuildingType { House, Farm, Market, Tree, Windmill, Statue, Animal, Well }

    struct Building {
        BuildingType buildingType;
        uint8 gridX;
        uint8 gridY;
        uint8 level;
        uint256 builtAt;
        address builder;
    }

    mapping(uint256 => Building) public buildings;
    mapping(address => uint256[]) public userBuildings;
    mapping(address => mapping(uint8 => mapping(uint8 => bool))) public gridOccupied;
    mapping(BuildingType => uint256) public buildCost;
    mapping(address => uint256) public villagePoints;

    event BuildingCreated(address indexed builder, uint256 indexed tokenId, BuildingType buildingType, uint8 gridX, uint8 gridY);
    event PointsEarned(address indexed user, uint256 points, uint256 totalPoints);

    constructor() ERC721("BaseVillage Building", "BVBUILD") Ownable(msg.sender) {
        buildCost[BuildingType.House]    = 0.001 ether;
        buildCost[BuildingType.Farm]     = 0.0015 ether;
        buildCost[BuildingType.Market]   = 0.002 ether;
        buildCost[BuildingType.Tree]     = 0.0005 ether;
        buildCost[BuildingType.Windmill] = 0.0025 ether;
        buildCost[BuildingType.Statue]   = 0.003 ether;
        buildCost[BuildingType.Animal]   = 0.001 ether;
        buildCost[BuildingType.Well]     = 0.0012 ether;
    }

    function buildHouse(uint8 x, uint8 y) external payable { _build(BuildingType.House, x, y); }
    function buildFarm(uint8 x, uint8 y) external payable { _build(BuildingType.Farm, x, y); }
    function buildMarket(uint8 x, uint8 y) external payable { _build(BuildingType.Market, x, y); }
    function plantTree(uint8 x, uint8 y) external payable { _build(BuildingType.Tree, x, y); }
    function buildWindmill(uint8 x, uint8 y) external payable { _build(BuildingType.Windmill, x, y); }
    function buildStatue(uint8 x, uint8 y) external payable { _build(BuildingType.Statue, x, y); }
    function addAnimal(uint8 x, uint8 y) external payable { _build(BuildingType.Animal, x, y); }
    function buildWell(uint8 x, uint8 y) external payable { _build(BuildingType.Well, x, y); }

    function _build(BuildingType _type, uint8 _x, uint8 _y) internal {
        require(_x < 8 && _y < 8, "Out of bounds");
        require(!gridOccupied[msg.sender][_x][_y], "Cell occupied");
        require(msg.value >= buildCost[_type], "Insufficient payment");

        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _safeMint(msg.sender, id);
        gridOccupied[msg.sender][_x][_y] = true;

        buildings[id] = Building(_type, _x, _y, 1, block.timestamp, msg.sender);
        userBuildings[msg.sender].push(id);

        uint256 pts = _getPoints(_type);
        villagePoints[msg.sender] += pts;

        emit BuildingCreated(msg.sender, id, _type, _x, _y);
        emit PointsEarned(msg.sender, pts, villagePoints[msg.sender]);

        if (msg.value > buildCost[_type]) payable(msg.sender).transfer(msg.value - buildCost[_type]);
    }

    function _getPoints(BuildingType _t) internal pure returns (uint256) {
        if (_t == BuildingType.House) return 100;
        if (_t == BuildingType.Farm) return 150;
        if (_t == BuildingType.Market) return 200;
        if (_t == BuildingType.Tree) return 50;
        if (_t == BuildingType.Windmill) return 250;
        if (_t == BuildingType.Statue) return 300;
        if (_t == BuildingType.Animal) return 80;
        if (_t == BuildingType.Well) return 120;
        return 0;
    }

    function getUserBuildings(address user) external view returns (uint256[] memory) { return userBuildings[user]; }
    function getBuildingData(uint256 tokenId) external view returns (Building memory) { require(_ownerOf(tokenId) != address(0)); return buildings[tokenId]; }
    function getBuildingCount(address user) external view returns (uint256) { return userBuildings[user].length; }
    function isCellOccupied(address user, uint8 x, uint8 y) external view returns (bool) { return gridOccupied[user][x][y]; }
    function getVillagePoints(address user) external view returns (uint256) { return villagePoints[user]; }

    function setBuildCost(BuildingType _type, uint256 _cost) external onlyOwner { buildCost[_type] = _cost; }
    function withdraw() external onlyOwner { payable(owner()).transfer(address(this).balance); }

    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) { return super._update(to, tokenId, auth); }
    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) { super._increaseBalance(account, value); }
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) { return super.tokenURI(tokenId); }
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, ERC721URIStorage) returns (bool) { return super.supportsInterface(interfaceId); }
}
