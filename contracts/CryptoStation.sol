pragma solidity ^0.4.18;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract CryptoStation is ERC721Token {
    
    uint256 internal nextTokenId = 0;

    constructor() public ERC721Token("CryptoStation", "CST") {}
    
    function mint(address mintedBy) external {
        uint256 tokenId = nextTokenId;
        nextTokenId = tokenId.add(1);
        super._mint(mintedBy, tokenId);
    }

    function setTokenURI(uint256 _tokenId, string data) external {
        super._setTokenURI(_tokenId, data);
    }

    function burn(uint256 _tokenId, address owner) external {
        super._burn(owner, _tokenId);
    }
}