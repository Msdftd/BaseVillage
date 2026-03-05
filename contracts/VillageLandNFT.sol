// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title VillageLandNFT — BaseVillage (Base Mainnet)
/// @notice Land parcel NFT. Each user claims one 8x8 grid.

contract VillageLandNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint8 public constant GRID_WIDTH = 8;
    uint8 public constant GRID_HEIGHT = 8;

    mapping(address => bool) public hasClaimed;
    mapping(uint256 => LandData) public landData;

    struct LandData {
        address owner;
        uint256 claimedAt;
        uint8 gridWidth;
        uint8 gridHeight;
        string villageName;
    }

    event LandClaimed(address indexed user, uint256 indexed tokenId, string villageName);

    constructor() ERC721("BaseVillage Land", "BVLAND") Ownable(msg.sender) {}

    function claimLand(string calldata _villageName) external {
        require(!hasClaimed[msg.sender], "Already claimed land");
        require(bytes(_villageName).length > 0 && bytes(_villageName).length <= 32, "Invalid name");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        hasClaimed[msg.sender] = true;
        landData[newTokenId] = LandData(msg.sender, block.timestamp, GRID_WIDTH, GRID_HEIGHT, _villageName);
        emit LandClaimed(msg.sender, newTokenId, _villageName);
    }

    function getLandData(uint256 tokenId) external view returns (LandData memory) {
        require(_ownerOf(tokenId) != address(0), "Land does not exist");
        return landData[tokenId];
    }

    function getLandByOwner(address owner) external view returns (uint256) {
        require(hasClaimed[owner], "No land claimed");
        return tokenOfOwnerByIndex(owner, 0);
    }

    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) { return super._update(to, tokenId, auth); }
    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) { super._increaseBalance(account, value); }
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) { return super.tokenURI(tokenId); }
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, ERC721URIStorage) returns (bool) { return super.supportsInterface(interfaceId); }
}
