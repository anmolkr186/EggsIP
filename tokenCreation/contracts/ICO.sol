pragma solidity 0.5.1;

import "./MyToken.sol";

//reference for github open-source Math library used - https://github.com/abdk-consulting/abdk-libraries-solidity/blob/master/ABDKMath64x64.sol

//valueOfToken = 10000000000000000000 wei or 0.1 ether;

//msg.value -> contains the value of ether sent in by the sender

contract ICO {


	MyToken TokenManager;
	uint256 public valueOfToken;
	uint256 public tokenCountForSale = 99999;
	uint256 public tokensSold;
	uint256 public assignedTokens;


	constructor(MyToken _TokenManager, uint256 _valueOfToken) public{
		valueOfToken = _valueOfToken;
		TokenManager = _TokenManager;

		address ContractAddress = address(this);
		//Transfer the coins allocated for sale to this smartcontract
		TokenManager.initialiseFunds(ContractAddress, tokenCountForSale);

		assignedTokens = TokenManager.balanceOf(address(this));
	}

	function checkTokensWithContract() public returns(uint256){ //Checks the number of tokens left with the contract
		uint val = TokenManager.balanceOf(address(this));
		return val;
	}

	function buyCoin(uint256 numberOfCoinsBought) public payable returns(bool){ //


		require(TokenManager.balanceOf(address(this)) >= numberOfCoinsBought);

		require(TokenManager.transfer(msg.sender, numberOfCoinsBought));

		tokensSold += numberOfCoinsBought;

		return true;
	}

	function checkBalance(address user) public returns(uint256){

		return TokenManager.balanceOf(user);

	}

	function checkSenderBalance(address user) public returns(uint256){//Chceks the balance of the account which created this transaction
		TokenManager.balanceOf(msg.sender);
	}
	

}