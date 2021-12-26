pragma solidity 0.5.1;

contract MyToken{

	string public constant name = "EggsCoin";
	address admin;
	uint256 public totalTokens; //totalSupply is the standard name as specified in ERC20 standard

	mapping(address => uint256) userBalance;
	//maps from owner's address to map containing the address of the spender allowed and the money spender's allowed to spend by the owner.
	mapping(address => mapping(address => uint256)) approvedAllowance;


	constructor() public{
		totalTokens = 9999999;
		userBalance[msg.sender] = totalTokens;//allocating all the initial tokens to the admin
		admin = msg.sender;
	}

	event Transfer(
		address indexed from,
		address indexed to,
		uint256 value
	);

	event Approval(
		address indexed owner,
		address indexed pender,
		uint256 value 
	);

	//lookup the balance of the adress of the user 
	function balanceOf(address userAdress) public returns(uint256){
		return userBalance[userAdress];
	}

	function initialiseFunds(address to, uint256 value) public returns(bool){//Provides the funds at the beginning to the ICO Contract

		require(userBalance[admin] >= value);

		userBalance[admin] -= value;
		userBalance[to] += value;

		emit Transfer(admin, to, value);
		return true;

	}

	//transfers funds/coins from caller's account to the address given by the caller
	function transfer(address to, uint256 value) public returns(bool){

		require(userBalance[msg.sender] >= value);

		userBalance[msg.sender] -= value;
		userBalance[to] += value;

		emit Transfer(msg.sender, to, value);
		return true;
	}

	//allows contracts to transfer coins on owner's behalf
	function transferFrom(address from, address to, uint256 value) public returns(bool) {

		require(userBalance[from] >= value);
		require(approvedAllowance[from][msg.sender] >= value);

		userBalance[from] -= value;
		userBalance[to] += value;

		approvedAllowance[from][msg.sender] -= value;

		emit Transfer(from, to, value);

		return true;

	}

	function approve(address _spender, uint256 _value) public returns (bool){//_spender represents the adress of the account we are allowing to spend on our behalf

		emit Approval(msg.sender, _spender, _value);

		require(userBalance[msg.sender] >= _value);

		approvedAllowance[msg.sender][_spender] = _value;

		return true;
	}
}