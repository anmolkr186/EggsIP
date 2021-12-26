const tokenDeployment = artifacts.require("./MyToken.sol"); // This variable stores a contract abstraction (abstraction of the smart contract)

const ICODeployment = artifacts.require("./ICO.sol");


// module.exports = function(deployer){
//   deployer.deploy(tokenDeployment);
// }

module.exports = function (deployer) { 
    deployer.deploy(tokenDeployment).then(  //any other arguments added here will be passed to the constructor of the smart contract
      function() {

        return deployer.deploy(ICODeployment, tokenDeployment.address, 1000000000000)
  });
};
