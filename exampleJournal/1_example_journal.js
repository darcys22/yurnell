//var MyContract = artifacts.require("MyContract");
var MyJournal = Yurnell.newJournal();

module.exports = function(deployer) {
  MyJournal.test()
  // deployment steps
  deployer.deploy();
};

