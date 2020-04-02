//var MyContract = artifacts.require("MyContract");
var MyJournal = Yurnell.newJournal();

module.exports = function(deployer) {
  MyJournal.test()
  MyJournal.description = "my first description"
  console.log(MyJournal.description)
  // deployment steps
  deployer.deploy();
};

