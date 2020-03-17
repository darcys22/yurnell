const instance = await MyContract.deployed();
var journal = require("@yurnell/journel");

var MyJournal = journal({
  abi: ...,
  unlinked_binary: ...,
  address: ..., // optional
  // many more
})
MyJournal.setProvider(provider);

let balance = await instance.getBalance(accounts[0])

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyJournal);
};

