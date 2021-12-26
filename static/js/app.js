var web3provider = null
var contract = null;
var tokenContract = null;
var icoContract = null;
var tokenPrice = 0;
var baseAccount = "0x6ECd767d537e8c455A1957BeB7Ea9084aED6C1F7";




//Reference for the function code - https://trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask
//this function is responsible for connecting to metamask using web3 connection
function initializeWeb3(){

	

	if (typeof(web3) !== 'undefined'){
		web3provider = web3.currentProvider;
		web3 = new Web3(web3provider);  
		console.log("Connected to Metamask");
	}else{
		//Use Ganache if metamask injected web3 instance not detected
		web3provider = new web3.providers.Httprovider('http://127.0.0.1:8545');
		web3 = new Web3(web3provider);
	}

	console.log("CoinBase Account");
	console.log(baseAccount);

	console.log("Finished execution");
	console.log(web3provider)
	console.log("Calling Contract Initialisation");

	initialiseContracts();
	
}

function initialiseContracts(){

	var j = null;

	console.log("Initialising Contract")

	var ico = null;
	var json = $.getJSON( "Mytoken" )
    .done(function( response ) {
        json = response;
        console.log( "json variable ready" );
    }).done(function(){
    	console.log("In Done Part");
    	console.log(json);
    	tokenContract = TruffleContract(json);
      tokenContract.setProvider(web3provider);
    }).done(function(){
    	$.getJSON("ico").done(function(response){
    		ico = response;
    	}).done(function(){
    		console.log("In ICO loading done part");
    		console.log(ico);
    		icoContract = TruffleContract(ico);
    		icoContract.setProvider(web3provider);
    	}).done(function(){
    		check();
    		CheckCoinsSold();
    		tokenPricefunc();
    	})
    });
    


 
	
} 


function buyTokens(){

		var tokenRequested = $('#egg-amount').val();

		console.log("Val");
		console.log(tokenRequested);

		console.log("Tokens requested is: ");
		console.log(tokenRequested);
		//Reference for the deployed function code - https://github.com/trufflesuite/truffle/tree/master/packages/contract#readme
		icoContract.deployed().then(function(instance){
			return instance.buyCoin(tokenRequested, {
        from: baseAccount,
        value: tokenRequested * 10000000000000,
        gas: 6721975,
  			gasPrice: 20000000000
      });
		}).then(function(result){
			console.log("Testing if tokens bought");
			console.log(result);
		});
	
}

function check(){
	var temp = 0;

	icoContract.deployed().then(function(instance){
		return instance.assignedTokens().then(function(v){
			temp = v;
		}).then(function(){
			console.log("Checking the admin balance");
			console.log(temp.toNumber());
		})
	});
	
}

function CheckUserBalance(){ // returns the number of tokens owned by the user

	var countTokensOwned = 0;

	icoContract.deployed().then(function(instance){
		return instance.checkSenderBalance().then(function(value){
			countTokensOwned = value;
		});
	})

}

function CheckCoinsSold(){

	var coinsSold = 0;

	icoContract.deployed().then(function(instance){
		return instance.tokenCountForSale() - instance.tokensSold();
	}).then(function(value){
		coinsSold = value;
	});

	console.log("Checking Coins Sold");
	console.log(coinsSold);
}

function tokenPricefunc(){

	icoContract.deployed().then(function(instance){
		return instance.valueOfToken().then(function(price){
			tokenPrice = web3.utils.fromWei(price, 'ether');
			console.log(price);
			console.log(price.toNumber());
		}).then(function(){
			console.log("Checking Token Price");
			console.log(tokenPrice);
		});
	});

	
}

// document.getElementById('buy-token').addEventListener("click", buyTokens)

$(function() {
  $(window).on('load', function() {
    initializeWeb3();
  })
});


