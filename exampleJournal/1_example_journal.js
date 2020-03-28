//var MyContract = artifacts.require("MyContract");
var MyJournal = Yurnell.newJournal();

module.exports = function(deployer) {
  console.log(MyJournal);
  // deployment steps
  deployer.deploy();
};

