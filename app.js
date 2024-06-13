#! /usr/bin/env node
import inquirer from "inquirer";
class BankAccount {
  accountNumber;
  accountBalance;
  constructor(account) {
    this.accountNumber = account;
    this.accountBalance = 100;
  }
  Credit(Amount) {
    if (Amount > 0) {
      this.accountBalance = this.accountBalance + Amount;
      console.log(
        "You account has been credit successfully. Current Balance : ",
        this.accountBalance
      );
    } else {
      console.log("Enter correct Amount");
    }
  }
  Debit(Amount) {
    if (Amount > 0 && Amount < this.accountBalance) {
      this.accountBalance -= Amount;
      console.log("Transaction Successfull");
      console.log("Current balance : ", this.accountBalance);
    } else {
      console.log("Insufficent balance");
    }
  }
  viewBalance() {
    console.log("Current balance : ", this.accountBalance);
  }
}
class Customer {
  firstName;
  lastName;
  gender;
  age;
  mobileNumber;
  constructor(fName, lName, gender, age, mobileNumber) {
    this.firstName = fName;
    this.lastName = lName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
  }
  displayInfo() {
    console.log(`Name: ${this.firstName} ${this.lastName}
Gender : ${this.gender}
Age : ${this.age},
Mobile: ${this.mobileNumber},
`);
  }
}
async function main() {
  console.log("-".repeat(70));
  console.log("WelCome to codeWith Fahad-WaRsi - OOP MYBANK");
  console.log("-".repeat(70));
  let myAnswer = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "Enter your First Name : ",
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter your Last Name",
    },
    {
      name: "gender",
      type: "input",
      message: "Enter your Gender : ",
    },
    {
      name: "age",
      type: "input",
      message: "Enter your Age : ",
    },
    {
      name: "mobileNumber",
      type: "number",
      message: "Enter your Mobile - Number : ",
    },
  ]);
  let myAccount = new BankAccount(12345);
  let myCustomer = new Customer(
    myAnswer.firstName,
    myAnswer.lastName,
    myAnswer.gender,
    myAnswer.age,
    myAnswer.mobileNumber
  );
  myCustomer.displayInfo();
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option :",
        choices: ["View Balance", "Withdraw", "Desposit", "Exit"],
      },
    ]);
    switch (choice.choice) {
      case "View Balance":
        myAccount.viewBalance();
        break;
      case "Withdraw":
        let creditAmount = await inquirer.prompt([
          {
            name: "amount",
            type: "number",
            message: "Enter an withdraw amount : ",
          },
        ]);
        myAccount.Debit(creditAmount.amount);
        break;
      case "Desposit":
        let debitAmount = await inquirer.prompt([
          {
            name: "amount",
            type: "number",
            message: "Enter an deposit ammount : ",
          },
        ]);
        myAccount.Credit(debitAmount.amount);
        break;
      case "Exit":
        console.log("Exiting....");
        process.exit();
        break;
    }
  }
}
//calling main function
main();
