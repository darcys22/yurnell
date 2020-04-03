var MyJournal = Yurnell.newJournal();

module.exports = function(deployer) {
  MyJournal.description = "my first description"

  MyJournal.date = "30 june 2019"

  lineitem = Yurnell.newLineItem();
  lineitem.particulars = "something particular";
  lineitem.amount = -10;
  lineitem.account = "Income";
  MyJournal.add(lineitem);

  MyJournal.add(Yurnell.newLineItem({
    particulars: "something particular",
    amount: 10,
    account: "Cash"
  }));

  console.log(MyJournal.date.toString())
  console.log(MyJournal.length)
  console.log(MyJournal.valid)
  // deployment steps
  deployer.deploy();
};

