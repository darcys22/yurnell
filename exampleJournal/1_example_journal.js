var MyJournal = Yurnell.newJournal();

module.exports = function(deployer) {
  MyJournal.description = "my first description"

  MyJournal.date = "30 june 2019"

  lineitem = Yurnell.newLineItem();
  lineitem.particulars = "something particular";
  lineitem.amount = 10.0;
  lineitem.account = "Income";
  MyJournal.add(lineitem);

  MyJournal.add(Yurnell.newLineItem(options : {
    particulars: "something particular",
    amount: 20,
    account: "Cash"
  }));

  //console.log(MyJournal.date.toString())
  //console.log(MyJournal.length)
  //console.log(MyJournal.balance().toFormat())
  //console.log(MyJournal.Get(1))
  console.log(MyJournal.valid())

  // deployment steps
  deployer.deploy(MyJournal);
};

