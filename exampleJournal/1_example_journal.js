var MyJournal = Yurnell.newJournal();

module.exports = function(deployer) {
  MyJournal.description = "my first description"

  lineitem = Yurnell.newLineItem();
  lineitem.particulars = "something particular";
  lineitem.amount = 10;
  lineitem.account = "Cash"

  MyJournal.add(lineitem)
  MyJournal.add(lineitem)
  console.log(typeof MyJournal.date)
  // deployment steps
  deployer.deploy();
};

